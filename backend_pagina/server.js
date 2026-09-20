'use strict';

const express = require('express');
const cors = require('cors');
const { MongoClient, ServerApiVersion } = require('mongodb');

const FIELD_LIMITS = Object.freeze({ name: 120, email: 254, company: 160, message: 5000, telegram: 100, discord: 100 });
const DEFAULT_ORIGINS = ['http://localhost:5500', 'http://127.0.0.1:5500', 'http://localhost:3000', 'http://127.0.0.1:3000'];
const splitList = value => String(value || '').split(',').map(item => item.trim()).filter(Boolean);

function readConfig(env = process.env) {
  const allowedOrigins = splitList(env.CONTACT_ALLOWED_ORIGINS);
  for (const origin of allowedOrigins) {
    const url = new URL(origin);
    if (!['http:', 'https:'].includes(url.protocol) || url.origin !== origin) {
      throw new Error('CONTACT_ALLOWED_ORIGINS must contain exact HTTP(S) origins.');
    }
  }
  return {
    port: Number(env.PORT || 3000),
    host: env.HOST || '127.0.0.1',
    mongoUri: env.MONGODB_URI || 'mongodb://localhost:27017',
    databaseName: env.DATABASE_NAME || 'base_de_datos_game',
    allowedOrigins: allowedOrigins.length ? allowedOrigins : DEFAULT_ORIGINS,
    trustProxy: splitList(env.TRUSTED_PROXIES),
    recaptchaSecret: env.RECAPTCHA_SECRET || '',
    recaptchaSiteKey: env.RECAPTCHA_SITE_KEY || '',
    recaptchaHostnames: splitList(env.RECAPTCHA_HOSTNAMES),
    rateLimit: 5,
    rateWindowMs: 15 * 60 * 1000,
    rateMaxEntries: 10000,
  };
}

// No timer or unbounded IP cache. New clients fail closed when the cache is full.
function createRateLimiter({ limit = 5, windowMs = 900000, maxEntries = 10000, now = Date.now } = {}) {
  const clients = new Map();
  let nextSweep = 0;
  const middleware = (req, res, next) => {
    const timestamp = now();
    if (timestamp >= nextSweep) {
      for (const [key, record] of clients) if (record.expires <= timestamp) clients.delete(key);
      nextSweep = timestamp + Math.min(windowMs, 60000);
    }
    const key = req.ip || req.socket.remoteAddress || 'unknown';
    let record = clients.get(key);
    if (record && record.expires <= timestamp) {
      clients.delete(key);
      record = undefined;
    }
    if (!record && clients.size >= maxEntries) {
      res.set('Retry-After', '60');
      return res.status(429).json({ error: 'Contact service is busy. Please try again later.' });
    }
    if (!record) {
      record = { count: 0, expires: timestamp + windowMs };
      clients.set(key, record);
    }
    if (record.count >= limit) {
      res.set('Retry-After', String(Math.max(1, Math.ceil((record.expires - timestamp) / 1000))));
      return res.status(429).json({ error: 'Too many requests. Please try again later.' });
    }
    record.count += 1;
    next();
  };
  middleware.clear = () => clients.clear();
  middleware.size = () => clients.size;
  return middleware;
}

function validateContact(body) {
  if (!body || typeof body !== 'object' || Array.isArray(body)) return { error: 'A JSON object is required.' };
  const contact = {};
  for (const [field, maxLength] of Object.entries(FIELD_LIMITS)) {
    const required = !['telegram', 'discord'].includes(field);
    const value = body[field] === undefined && !required ? '' : body[field];
    if (typeof value !== 'string' || value.length > maxLength || /[\u0000-\u0008\u000b\u000c\u000e-\u001f\u007f]/u.test(value)) {
      return { error: 'Invalid ' + field + '. Maximum length is ' + maxLength + ' characters.' };
    }
    contact[field] = value.trim();
    if (required && !contact[field]) return { error: field + ' is required.' };
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/u.test(contact.email)) return { error: 'Invalid email format.' };
  const website = body.website === undefined ? '' : body.website;
  const token = body['g-recaptcha-response'] === undefined ? '' : body['g-recaptcha-response'];
  if (typeof website !== 'string' || website.length > 200 || website.trim()) return { error: 'Unable to accept this submission.' };
  if (typeof token !== 'string' || token.length > 4096 || token === 'canvas-captcha-verified') return { error: 'Invalid verification token.' };
  return { contact, token };
}

async function verifyRecaptcha(token, remoteIp, config, fetchImpl = fetch) {
  if (!token || token === 'canvas-captcha-verified' || !config.recaptchaSecret) return false;
  try {
    const body = new URLSearchParams({ secret: config.recaptchaSecret, response: token });
    if (remoteIp) body.set('remoteip', remoteIp);
    const response = await fetchImpl('https://www.google.com/recaptcha/api/siteverify', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body,
      signal: AbortSignal.timeout(5000),
      redirect: 'error',
    });
    if (!response.ok) return false;
    const result = await response.json();
    if (result.success !== true || typeof result.hostname !== 'string') return false;
    const hostnames = config.recaptchaHostnames.length ? config.recaptchaHostnames : config.allowedOrigins.map(origin => new URL(origin).hostname);
    return hostnames.includes(result.hostname);
  } catch {
    return false;
  }
}

function createApp({ config = readConfig(), getDb = () => null, fetchImpl = fetch, logger = console } = {}) {
  const app = express();
  app.disable('x-powered-by');
  app.set('query parser', 'simple');
  app.set('trust proxy', config.trustProxy.length ? config.trustProxy : false);
  app.use((req, res, next) => {
    res.set({
      'Cache-Control': 'no-store',
      'X-Content-Type-Options': 'nosniff',
      'X-Frame-Options': 'DENY',
      'Referrer-Policy': 'no-referrer',
      'Content-Security-Policy': "default-src 'none'; frame-ancestors 'none'; base-uri 'none'",
      'Permissions-Policy': 'camera=(), microphone=(), geolocation=()',
    });
    const origin = req.get('Origin');
    if (origin && !config.allowedOrigins.includes(origin)) return res.status(403).json({ error: 'Origin not allowed.' });
    next();
  });
  app.use(cors({ origin: config.allowedOrigins, methods: ['GET', 'POST'], allowedHeaders: ['Content-Type'], maxAge: 600 }));

  app.get('/ping', (req, res) => res.json({ ok: true }));
  app.get('/api/contact/config', (req, res) => {
    if (config.recaptchaSecret && !config.recaptchaSiteKey) return res.status(503).json({ error: 'Contact verification is not configured.' });
    res.json({ recaptchaRequired: Boolean(config.recaptchaSecret), recaptchaSiteKey: config.recaptchaSecret ? config.recaptchaSiteKey : null });
  });

  const limiter = createRateLimiter({ limit: config.rateLimit, windowMs: config.rateWindowMs, maxEntries: config.rateMaxEntries });
  app.locals.dispose = () => limiter.clear();
  app.post('/api/contact', limiter, (req, res, next) => {
    if (!req.is('application/json')) return res.status(415).json({ error: 'Content-Type must be application/json.' });
    next();
  }, express.json({ limit: '16kb', strict: true, inflate: false }), async (req, res) => {
    const validation = validateContact(req.body);
    if (validation.error) return res.status(400).json({ error: validation.error });
    const db = getDb();
    if (!db || (config.recaptchaSecret && !config.recaptchaSiteKey)) return res.status(503).json({ error: 'Contact service is temporarily unavailable.' });
    if (config.recaptchaSecret && !(await verifyRecaptcha(validation.token, req.ip, config, fetchImpl))) {
      return res.status(400).json({ error: 'Verification failed. Please try again.' });
    }
    if (req.socket.destroyed || res.destroyed) return;
    try {
      // One bounded document per request; legacy contacts/history are left intact.
      await db.collection('contact_submissions').insertOne({ ...validation.contact, created_at: new Date() }, { timeoutMS: 5000 });
      return res.json({ ok: true, message: 'Your message has been received.' });
    } catch (error) {
      // Never log user data, tokens, connection strings or raw database errors.
      logger.error('Contact persistence failed.', { code: Number.isInteger(error.code) ? error.code : 'database-error' });
      return res.status(503).json({ error: 'Unable to save your message. Please try again later.' });
    }
  });

  app.get('/health', async (req, res) => {
    try {
      const db = getDb();
      if (!db) throw new Error('Unavailable');
      await db.command({ ping: 1 }, { timeoutMS: 2000 });
      res.json({ status: 'OK' });
    } catch {
      res.status(503).json({ status: 'UNAVAILABLE' });
    }
  });

  // Contact records are intentionally not exposed through an unauthenticated API.
  app.use((req, res) => res.status(404).json({ error: 'Endpoint not found.' }));
  app.use((error, req, res, next) => {
    if (res.headersSent) return next(error);
    const status = error.type === 'entity.too.large' ? 413 : error.type === 'encoding.unsupported' ? 415 : error.status === 400 ? 400 : 500;
    const message = status === 413 ? 'Request is too large.' : status === 415 ? 'Compressed requests are not supported.' : status === 400 ? 'Invalid JSON request.' : 'Internal server error.';
    res.status(status).json({ error: message });
  });
  return app;
}

async function startServer(config = readConfig()) {
  const client = new MongoClient(config.mongoUri, {
    serverApi: { version: ServerApiVersion.v1, strict: true, deprecationErrors: true },
    maxPoolSize: 10,
    maxIdleTimeMS: 30000,
    serverSelectionTimeoutMS: 5000,
    connectTimeoutMS: 5000,
    socketTimeoutMS: 10000,
    waitQueueTimeoutMS: 5000,
  });
  let db;
  try {
    await client.connect();
    db = client.db(config.databaseName);
    await db.collection('contact_submissions').createIndex({ created_at: -1 });
  } catch {
    await client.close();
    throw new Error('MongoDB connection failed. Contact server was not started.');
  }
  const app = createApp({ config, getDb: () => db });
  let server;
  try {
    server = await new Promise((resolve, reject) => {
      const listener = app.listen(config.port, config.host, () => resolve(listener));
      listener.once('error', reject);
    });
  } catch (error) {
    await client.close();
    throw error;
  }
  server.requestTimeout = 15000;
  server.headersTimeout = 10000;
  server.keepAliveTimeout = 5000;
  server.maxRequestsPerSocket = 100;
  server.maxConnections = 1000;
  let closing;
  const close = () => {
    if (closing) return closing;
    closing = (async () => {
      const timer = setTimeout(() => server.closeAllConnections(), 10000);
      timer.unref();
      try { await new Promise((resolve, reject) => server.close(error => error ? reject(error) : resolve())); }
      finally {
        clearTimeout(timer);
        app.locals.dispose();
        db = null;
        await client.close();
      }
    })();
    return closing;
  };
  console.log('Contact server listening on ' + config.host + ':' + server.address().port);
  return { app, server, close };
}

if (require.main === module) {
  require('dotenv').config({ quiet: true });
  startServer().then(({ close }) => {
    const shutdown = () => close().catch(() => { console.error('Shutdown failed.'); process.exitCode = 1; });
    process.once('SIGINT', shutdown);
    process.once('SIGTERM', shutdown);
  }).catch(() => {
    console.error('Contact server failed to start. Check database and server configuration.');
    process.exitCode = 1;
  });
}

module.exports = { createApp, readConfig, createRateLimiter, validateContact, verifyRecaptcha, startServer, FIELD_LIMITS };


'use strict';

const test = require('node:test');
const assert = require('node:assert/strict');
const { createApp, readConfig, createRateLimiter, verifyRecaptcha } = require('./server');

const valid = { name: 'Test User', email: 'user@example.test', company: 'Test', message: 'Hello', website: '' };

async function fixture(t, overrides = {}) {
  const writes = [];
  const db = { collection(name) { assert.equal(name, 'contact_submissions'); return { async insertOne(document, options) { writes.push(document); assert.equal(options.timeoutMS, 5000); } }; }, async command() {} };
  const config = { ...readConfig({}), rateLimit: 100, ...overrides.config };
  const app = createApp({ config, getDb: () => db, logger: { error() {} }, ...overrides, config });
  const server = await new Promise(resolve => { const listener = app.listen(0, '127.0.0.1', () => resolve(listener)); });
  t.after(async () => { app.locals.dispose(); server.closeAllConnections(); await new Promise(resolve => server.close(resolve)); });
  const request = (path, options = {}) => fetch('http://127.0.0.1:' + server.address().port + path, { ...options, signal: AbortSignal.timeout(3000) });
  const post = (body, headers = {}) => request('/api/contact', { method: 'POST', headers: { 'Content-Type': 'application/json', ...headers }, body: JSON.stringify(body) });
  return { writes, request, post };
}

test('accepts bounded string fields, strips unknown fields and does not expose identifiers or IPs', async t => {
  const { post, writes } = await fixture(t);
  const response = await post({ ...valid, name: '  Test User  ', unknown: { $where: 'evil' } });
  assert.equal(response.status, 200);
  assert.deepEqual(await response.json(), { ok: true, message: 'Your message has been received.' });
  assert.equal(writes.length, 1);
  assert.equal(writes[0].name, 'Test User');
  assert.equal(writes[0].unknown, undefined);
  assert.equal(writes[0].ip, undefined);
  assert.ok(writes[0].created_at instanceof Date);
  assert.equal(response.headers.get('x-powered-by'), null);
  assert.equal(response.headers.get('x-content-type-options'), 'nosniff');
});

test('rejects MongoDB operator objects, invalid types, overlong fields and honeypot', async t => {
  const { post, writes } = await fixture(t);
  for (const payload of [
    { ...valid, email: { $ne: '' } }, { ...valid, name: [] }, { ...valid, message: 'a'.repeat(5001) },
    { ...valid, telegram: null }, { ...valid, website: 'spam' }, { ...valid, name: '\u0000bad' },
    { ...valid, 'g-recaptcha-response': 'canvas-captcha-verified' }, [],
  ]) assert.equal((await post(payload)).status, 400);
  assert.equal(writes.length, 0);
});

test('malformed, oversized, compressed and wrong media requests return controlled client errors', async t => {
  const { request, post, writes } = await fixture(t);
  assert.equal((await request('/api/contact', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: '{' })).status, 400);
  assert.equal((await post({ ...valid, message: 'a'.repeat(18000) })).status, 413);
  assert.equal((await request('/api/contact', { method: 'POST', headers: { 'Content-Type': 'text/plain' }, body: 'hello' })).status, 415);
  assert.equal((await post(valid, { 'Content-Encoding': 'gzip' })).status, 415);
  assert.equal(writes.length, 0);
});

test('blocks foreign origins before writes and permits explicitly configured origins', async t => {
  const { post, writes } = await fixture(t);
  assert.equal((await post(valid, { Origin: 'https://attacker.example' })).status, 403);
  const response = await post(valid, { Origin: 'http://localhost:5500' });
  assert.equal(response.status, 200);
  assert.equal(response.headers.get('access-control-allow-origin'), 'http://localhost:5500');
  assert.equal(writes.length, 1);
});

test('contact records are never publicly listed and CAPTCHA config never includes secret', async t => {
  const { request } = await fixture(t, { config: { recaptchaSecret: 'server-secret', recaptchaSiteKey: 'public-key' } });
  assert.equal((await request('/api/contacts')).status, 404);
  assert.deepEqual(await (await request('/api/contact/config')).json(), { recaptchaRequired: true, recaptchaSiteKey: 'public-key' });
});

test('incomplete CAPTCHA configuration and unavailable database fail closed', async t => {
  const first = await fixture(t, { config: { recaptchaSecret: 'server-secret', recaptchaSiteKey: '' } });
  assert.equal((await first.request('/api/contact/config')).status, 503);
  assert.equal((await first.post(valid)).status, 503);
  const second = await fixture(t, { getDb: () => null });
  assert.equal((await second.post(valid)).status, 503);
  assert.equal((await second.request('/health')).status, 503);
});

test('configured CAPTCHA rejects bypass and failed verification, accepts verified hostname', async t => {
  let calls = 0;
  const { post, writes } = await fixture(t, {
    config: { recaptchaSecret: 'server-secret', recaptchaSiteKey: 'public-key', recaptchaHostnames: ['localhost'] },
    fetchImpl: async (url, options) => {
      calls += 1;
      assert.equal(url, 'https://www.google.com/recaptcha/api/siteverify');
      assert.ok(options.signal instanceof AbortSignal);
      assert.equal(options.body.get('secret'), 'server-secret');
      return { ok: true, json: async () => ({ success: true, hostname: options.body.get('response') === 'valid-token' ? 'localhost' : 'attacker.example' }) };
    },
  });
  assert.equal((await post({ ...valid, 'g-recaptcha-response': 'canvas-captcha-verified' })).status, 400);
  assert.equal((await post(valid)).status, 400);
  assert.equal(calls, 0);
  assert.equal((await post({ ...valid, 'g-recaptcha-response': 'wrong-host' })).status, 400);
  assert.equal((await post({ ...valid, 'g-recaptcha-response': 'valid-token' })).status, 200);
  assert.equal(writes.length, 1);
});

test('CAPTCHA timeout and upstream failure do not leak details', async () => {
  const config = { ...readConfig({}), recaptchaSecret: 'server-secret' };
  assert.equal(await verifyRecaptcha('token', '127.0.0.1', config, async () => { throw new Error('sensitive'); }), false);
  assert.equal(await verifyRecaptcha('token', '127.0.0.1', config, async () => ({ ok: false })), false);
});

test('rate limit cannot be bypassed with an untrusted X-Forwarded-For header', async t => {
  const { post, writes } = await fixture(t, { config: { rateLimit: 2 } });
  assert.equal((await post(valid)).status, 200);
  assert.equal((await post(valid, { 'X-Forwarded-For': '10.0.0.1' })).status, 200);
  const blocked = await post(valid, { 'X-Forwarded-For': '10.0.0.2' });
  assert.equal(blocked.status, 429);
  assert.ok(Number(blocked.headers.get('retry-after')) > 0);
  assert.equal(writes.length, 2);
});

test('rate limiter memory is bounded, expires and disposes without timers', () => {
  let clock = 100;
  const limiter = createRateLimiter({ limit: 2, windowMs: 10, maxEntries: 2, now: () => clock });
  const res = { statusCode: 200, set() {}, status(status) { this.statusCode = status; return this; }, json() {} };
  const call = ip => { res.statusCode = 200; limiter({ ip }, res, () => {}); return res.statusCode; };
  assert.equal(call('one'), 200);
  assert.equal(call('two'), 200);
  assert.equal(call('three'), 429);
  assert.equal(limiter.size(), 2);
  clock = 111;
  assert.equal(call('three'), 200);
  assert.equal(limiter.size(), 1);
  limiter.clear();
  assert.equal(limiter.size(), 0);
});

test('database failures return no exception details or client data', async t => {
  const { post } = await fixture(t, { getDb: () => ({ collection: () => ({ insertOne: async () => { throw new Error('mongodb://SECRET'); } }) }) });
  const response = await post(valid);
  assert.equal(response.status, 503);
  assert.doesNotMatch(await response.text(), /SECRET|mongodb/);
});

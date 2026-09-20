'use strict';
// Exercise the real handlers without starting the original server, loading .env,
// importing the keystore, connecting MongoDB or submitting blockchain operations.
const { test } = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const crypto = require('node:crypto');
const acorn = require('../bin/node_modules/acorn');
const filename = process.env.GF_SERVER_FILE || path.join(require('node:os').homedir(), 'Desktop', 'server2.js');
const source = fs.readFileSync(filename, 'utf8');
const ast = acorn.parse(source, { ecmaVersion: 'latest', sourceType: 'script' });
const quiet = { log() {}, warn() {}, error() {} };
const address = '0x' + 'a'.repeat(40);
function declaration(name) {
  const node = ast.body.find(node => node.type === 'FunctionDeclaration' && node.id.name === name || node.type === 'VariableDeclaration' && node.declarations.some(item => item.id.name === name));
  assert.ok(node, name); return source.slice(node.start, node.end);
}
function route(method, url) {
  const call = ast.body.find(node => node.type === 'ExpressionStatement' && node.expression.type === 'CallExpression' && node.expression.callee.type === 'MemberExpression' && node.expression.callee.object.name === 'app' && node.expression.callee.property.name === method && node.expression.arguments[0]?.value === url)?.expression;
  assert.ok(call, `${method} ${url}`);
  return { handler: source.slice(call.arguments.at(-1).start, call.arguments.at(-1).end), middlewares: call.arguments.slice(1, -1).map(item => item.name) };
}
function environment(extra = {}) {
  const db = { owner: { playerName: 'Alice' }, query: null, deleted: null, saved: null, limit: null, rows: [{ category: 'items', playerName: 'Alice' }] };
  class Log { constructor(data) { this.data = data; } async save() { db.saved = this.data; } }
  Log.find = query => { db.query = query; return { sort() { return this; }, limit(value) { db.limit = value; return this; }, async lean() { return db.rows.slice(); } }; };
  Log.deleteOne = async query => { db.deleted = query; };
  const env = vm.createContext({ URL, Buffer, crypto, console: quiet, NODE_ENV: 'development', allowedOrigins: ['https://game.example.test'], COOKIE_SAMESITE: 'lax', COOKIE_DOMAIN: undefined, TransactionLog: Log,
    PlayerAuth: { findOne(query) { db.ownerQuery = query; return { select() { return this; }, lean() { return this; }, async exec() { return db.owner; } }; } }, ...extra });
  for (const name of ['isAllowedBrowserOrigin', 'requireSecureTransport', 'setCookieOptions', 'verifyCSRFToken', 'csrfProtection', 'transactionLogOwner', 'validateTransactionLog']) vm.runInContext(declaration(name), env);
  return { env, db };
}
function response() { return { statusCode: 200, data: null, status(code) { this.statusCode = code; return this; }, json(value) { this.data = value; return this; }, set() { return this; } }; }
function request(extra = {}) { return { user: { address }, query: {}, params: {}, body: {}, headers: {}, cookies: {}, method: 'POST', path: '/api/transactions', ...extra }; }
test('Origins reject hostname-substring tricks and WebSocket connections share the policy', () => {
  const { env } = environment();
  for (const origin of ['http://localhost:4173', 'http://127.0.0.1:5501', 'https://game.example.test', undefined]) assert.equal(env.isAllowedBrowserOrigin(origin), true);
  for (const origin of ['https://localhost.evil.test', 'https://evil.test/?localhost', 'https://127.0.0.1.evil.test', 'null', 'http://user@localhost', 'http://localhost/path', 'javascript:localhost', 'https://game.example.test.evil.test']) assert.equal(env.isAllowedBrowserOrigin(origin), false, origin);
  assert.match(source, /allowRequest:.*isAllowedBrowserOrigin\(req.headers.origin\)/);
  env.NODE_ENV = 'production'; assert.equal(env.isAllowedBrowserOrigin('http://localhost:4173'), false);
});
test('CSRF fails closed in development and local cookies are host-only', () => {
  const { env } = environment(); const res = response(); let called = 0;
  env.csrfProtection(request(), res, () => called++); assert.equal(called, 0); assert.equal(res.statusCode, 403);
  const token = 'a'.repeat(64);
  env.csrfProtection(request({ headers: { 'x-csrf-token': token }, cookies: { 'csrf-token': token } }), response(), () => called++);
  assert.equal(called, 1); assert.equal(env.setCookieOptions(600).domain, undefined); assert.equal(env.setCookieOptions(600).httpOnly, true);
});
test('Production HTTPS cannot be bypassed with raw forwarded headers or an attacker Host', () => {
  const { env } = environment(); env.NODE_ENV = 'production';
  let called = 0; const res = response();
  env.requireSecureTransport(request({ secure: false, headers: { 'x-forwarded-proto': 'https', host: 'evil.test' } }), res, () => called++);
  assert.equal(res.statusCode, 426); assert.equal(called, 0);
  env.requireSecureTransport(request({ secure: true }), response(), () => called++); assert.equal(called, 1);
});
test('Transaction reads derive ownership from the authenticated address and cap history', async () => {
  const { env, db } = environment(); const handler = vm.runInContext('(' + route('get', '/api/transactions').handler + ')', env);
  const denied = response(); await handler(request({ query: { playerName: 'Bob' } }), denied);
  assert.equal(denied.statusCode, 403); assert.equal(db.query, null);
  const accepted = response(); await handler(request({ query: { playerName: 'Alice' } }), accepted);
  assert.equal(accepted.statusCode, 200); assert.equal(db.query.playerName, 'Alice'); assert.equal(db.ownerQuery.address, address); assert.equal(db.limit, 200);
  const injection = response(); await handler(request({ query: { playerName: { $ne: null } } }), injection); assert.equal(injection.statusCode, 403);
});
test('Transaction writes whitelist fields, reject impersonation and require CSRF middleware', async () => {
  const { env, db } = environment(); const definition = route('post', '/api/transactions');
  assert.ok(definition.middlewares.includes('csrfProtection')); assert.ok(definition.middlewares.includes('apiLimiter'));
  const handler = vm.runInContext('(' + definition.handler + ')', env);
  const base = { id: '123-test', category: 'items', playerName: 'Alice', quantity: 1, hash: '0x' + 'b'.repeat(64), status: 'confirmed', hiddenData: { idx: 1 } };
  for (const fields of [{ playerName: 'Bob' }, { address: '0x' + 'c'.repeat(40) }, { quantity: Infinity }, { quantity: -1 }, { category: '__proto__' }, { hiddenData: { huge: 'x'.repeat(17000) } }, { name: 'x'.repeat(201) }]) {
    const res = response(); await handler(request({ body: { ...base, ...fields } }), res); assert.equal(res.statusCode, 400); assert.equal(db.saved, null);
  }
  const res = response(); await handler(request({ body: { ...base, admin: true, createdAt: '1990-01-01' } }), res);
  assert.equal(res.statusCode, 200); assert.equal(db.saved.address, address); assert.equal(db.saved.admin, undefined); assert.equal(db.saved.createdAt, undefined);
});
test('Transaction deletion always filters by owner, not an id supplied by another player', async () => {
  const { env, db } = environment(); const definition = route('delete', '/api/transactions/:id');
  assert.ok(definition.middlewares.includes('csrfProtection'));
  const handler = vm.runInContext('(' + definition.handler + ')', env);
  await handler(request({ params: { id: 'other-players-id' } }), response());
  assert.equal(db.deleted.id, 'other-players-id'); assert.equal(db.deleted.playerName, 'Alice');
  db.deleted = null; const res = response(); await handler(request({ params: { id: '../invalid' } }), res); assert.equal(res.statusCode, 400); assert.equal(db.deleted, null);
});
test('Admin cookie authentication rejects refresh tokens and protects mutation methods with CSRF', async () => {
  let decoded = { type: 'refresh', address }; let nextCalls = 0;
  const { env } = environment({ JWT_SECRET: 'test-only', jwt: { verify: () => decoded }, isAdminAddress: async () => true });
  vm.runInContext(declaration('adminAuth'), env); const admin = vm.runInContext('adminAuth', env);
  const req = request({ cookies: { session: 'dummy' }, path: '/api/admin/weather' });
  const refreshResponse = response(); await admin(req, refreshResponse, () => nextCalls++); assert.equal(refreshResponse.statusCode, 403); assert.equal(nextCalls, 0);
  decoded = { type: 'access', address }; const missingCsrf = response(); await admin(req, missingCsrf, () => nextCalls++); assert.equal(missingCsrf.statusCode, 403); assert.equal(nextCalls, 0);
  req.headers['x-csrf-token'] = req.cookies['csrf-token'] = 'a'.repeat(64); await admin(req, response(), () => nextCalls++); assert.equal(nextCalls, 1);
});
test('Relay history rejects negative, unlimited or excessive pagination before any query', async () => {
  const { env } = environment(); const handler = vm.runInContext('(' + route('get', '/api/relay/transactions/history').handler + ')', env);
  for (const query of [{ limit: '0' }, { limit: '10000000' }, { page: '-1' }, { page: '10001' }, { limit: 'NaN' }]) {
    const res = response(); await handler(request({ query }), res); assert.equal(res.statusCode, 400);
  }
});
test('SIGINT and SIGTERM reuse the bounded socket-aware shutdown', () => {
  assert.match(source, /process.on\('SIGTERM', \(\) => cerrarOrdenadamente\('SIGTERM', 0\)\)/);
  assert.match(source, /process.on\('SIGINT', \(\) => cerrarOrdenadamente\('SIGINT', 0\)\)/);
  assert.doesNotMatch(source, /console\.log\([^\n]*(?:req\.headers\.cookie|req\.cookies|\$\{token\}|nonce\.substring|nonceFromToken\.substring)/);
});

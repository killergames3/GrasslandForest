'use strict';
// Local preview only. Private code, secrets, backups and directory listings are never served.
const http = require('node:http');
const fs = require('node:fs');
const path = require('node:path');
const root = path.resolve(__dirname, '..');
const types = { '.html': 'text/html; charset=utf-8', '.css': 'text/css; charset=utf-8', '.js': 'text/javascript; charset=utf-8', '.svg': 'image/svg+xml', '.webp': 'image/webp', '.png': 'image/png', '.jpg': 'image/jpeg', '.jpeg': 'image/jpeg', '.json': 'application/json', '.woff2': 'font/woff2', '.ttf': 'font/ttf', '.mp3': 'audio/mpeg', '.ogg': 'audio/ogg', '.wav': 'audio/wav', '.mp4': 'video/mp4' };
function publicPath(value) {
  let decoded;
  try { decoded = decodeURIComponent(value.split('?')[0]); } catch { return null; }
  if (decoded === '/') decoded = '/index.html';
  if (decoded.includes('\\') || decoded.includes('\0') || decoded.split('/').some(part => part.startsWith('.') || part.includes(':'))) return null;
  const relative = decoded.replace(/^\//, '');
  const roots = ['index.html', 'terms-service.html', 'privacy-policy.html', 'Disclaimer.html'];
  const allowed = roots.includes(relative) || /^(assets|image|fonts|video)\//.test(relative) || /^Grassland_Forest_Game\/(index\.html|assets\/)/.test(relative) || /^bin\/(vendor\/|Game\/|Maps\/|fonts\/|recortadas\/|lib\/|Scenes\/|gf-wallet-sdk\/|[^/]+\.(?:js|css|html|png|json)$)/.test(relative);
  if (!allowed || /(?:^|\/)(?:node_modules|tools|temp_old|_backup|XDPRUEBA)(?:\/|$)/i.test(relative) || /(?:^|\/)(?:_(?:prueba|test)|package(?:-lock)?\.json$|obfuscator-config\.json$|marketplace-routes\.js$)/i.test(relative) || !types[path.extname(relative).toLowerCase()]) return null;
  const absolute = path.resolve(root, relative);
  return absolute.startsWith(root + path.sep) ? absolute : null;
}
function createPreviewServer() {
  return http.createServer((req, res) => {
    res.setHeader('X-Content-Type-Options', 'nosniff');
    res.setHeader('Referrer-Policy', 'strict-origin-when-cross-origin');
    res.setHeader('X-Frame-Options', 'SAMEORIGIN');
    res.setHeader('Permissions-Policy', 'camera=(), microphone=(), geolocation=()');
    res.setHeader('Cache-Control', 'no-cache');
    if (!['GET', 'HEAD'].includes(req.method)) { res.writeHead(405, { Allow: 'GET, HEAD' }); res.end(); return; }
    if (req.url.startsWith('/api/contact')) { res.writeHead(503, { 'Content-Type': 'application/json' }); res.end(JSON.stringify({ error: 'Preview only; configure the contact API for message delivery.' })); return; }
    const file = publicPath(req.url);
    if (!file) { res.writeHead(404); res.end('Not found'); return; }
    fs.stat(file, (error, stat) => {
      if (error || !stat.isFile()) { res.writeHead(404); res.end('Not found'); return; }
      res.setHeader('Content-Type', types[path.extname(file).toLowerCase()]);
      res.setHeader('Content-Length', stat.size);
      if (path.extname(file) === '.html') {
        const html = fs.readFileSync(file, 'utf8');
        const csp = html.match(/http-equiv="Content-Security-Policy"\s+content="([^"]+)"/i)?.[1];
        res.setHeader('Content-Security-Policy', (csp ? csp.replace(/\s+/g, ' ') : "object-src 'none'; base-uri 'self'") + "; frame-ancestors 'self'");
      }
      if (req.method === 'HEAD') { res.end(); return; }
      const stream = fs.createReadStream(file);
      stream.on('error', () => res.destroy());
      res.on('close', () => stream.destroy());
      stream.pipe(res);
    });
  });
}
if (require.main === module) {
  const server = createPreviewServer();
  const port = Number(process.env.GF_PREVIEW_PORT || 4173);
  server.listen(port, '127.0.0.1', () => console.log(`Local preview: http://127.0.0.1:${server.address().port}`));
  const close = () => { server.close(); server.closeAllConnections(); };
  process.once('SIGINT', close); process.once('SIGTERM', close);
}
module.exports = { createPreviewServer, publicPath };

'use strict';
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const { chromium } = require(require.resolve('playwright', { paths: [process.env.GF_TEST_NODE_MODULES || process.cwd()] }));
const { createPreviewServer } = require('./preview-server.cjs');
const root = path.resolve(__dirname, '..');
async function main() {
  const server = createPreviewServer();
  await new Promise(resolve => server.listen(0, '127.0.0.1', resolve));
  const base = `http://127.0.0.1:${server.address().port}`;
  let browser;
  const checks = [];
  try {
    browser = await chromium.launch({ channel: 'msedge', headless: true });
    const context = await browser.newContext({ viewport: { width: 1440, height: 1000 }, reducedMotion: 'reduce' });
    const page = await context.newPage();
    const errors = [], external = [];
    page.on('pageerror', error => errors.push(error.message));
    page.on('console', message => { if (message.type() === 'error' && /Content Security Policy|Refused to|integrity/.test(message.text())) errors.push(message.text()); });
    await context.route('**/*', route => {
      if (!route.request().url().startsWith(base)) { external.push(route.request().url()); return route.abort(); }
      return route.continue();
    });
    await page.goto(base, { waitUntil: 'networkidle' });
    const metrics = await page.evaluate(() => ({
      resources: performance.getEntriesByType('resource').map(entry => ({ name: new URL(entry.name).pathname, bytes: entry.encodedBodySize })),
      domNodes: document.querySelectorAll('*').length,
      initialHero: new URL(document.querySelector('.hero-art').currentSrc).pathname
    }));
    assert.equal(await page.locator('html').getAttribute('lang'), 'en');
    const demoLinks = await page.locator('a').evaluateAll(anchors => anchors.filter(a => /\b(?:play (?:the )?demo|the demo|find your path)/i.test(a.textContent)).map(a => a.href));
    assert.ok(demoLinks.length >= 4);
    assert.ok(demoLinks.every(url => url === 'https://app.grasslandforest.com/'), JSON.stringify(demoLinks));
    assert.equal(await page.locator('a[href*="Grassland_Forest_Game"]').count(), 0);
    assert.equal(await page.locator('.hero-logo').getAttribute('src'), 'assets/grassland-forest-logo.webp');
    assert.equal(external.length, 0, 'The landing must not contact third parties before interaction');
    assert.equal(await page.locator('script:not([src])').count(), 0);
    assert.equal(await page.locator('[onclick], [onload], [onerror]').count(), 0);
    const legal = ['terms-service.html', 'privacy-policy.html', 'Disclaimer.html'];
    for (const filename of legal) {
      const response = await page.request.get(`${base}/${filename}`);
      assert.equal(response.status(), 200);
      assert.equal(response.headers()['x-content-type-options'], 'nosniff');
      assert.match(response.headers()['content-security-policy'], /frame-ancestors/);
      const rendered = await response.text();
      assert.match(rendered, /<html lang="en">/);
      assert.match(rendered, /Effective Date: September 10, 2026/);
      assert.doesNotMatch(rendered, /<script|style="|onerror=/i);
      // Every clause must match the supplied current English document.
      const original = fs.readFileSync(path.join('C:/Users/pc/Pictures', filename), 'utf8')
        .replace(/<head>[\s\S]*?<\/head>/i, '').replace(/\sstyle="[^"]*"/g, '');
      const legalText = await page.evaluate(({ original, rendered }) => {
        const parser = new DOMParser();
        const normalize = element => element.textContent.replace(/\s+/g, ' ').trim();
        return {
          original: normalize(parser.parseFromString(original, 'text/html').querySelector('.policy-container, .tos-container, .disclaimer-container')),
          rendered: normalize(parser.parseFromString(rendered, 'text/html').querySelector('main'))
        };
      }, { original, rendered });
      assert.equal(legalText.rendered, legalText.original, filename + ' must preserve the original English clauses');
    }
    for (const filename of ['/backend_pagina/.env', '/backend_pagina/server.js', '/bin/package-lock.json', '/bin/tools/engine-lifecycle.test.cjs', '/bin/temp_old/GameScene.js', '/.git/config']) {
      assert.equal((await page.request.get(base + filename)).status(), 404, filename);
    }
    checks.push('No third-party requests on load; strict CSP; legal links; private files blocked');
    checks.push('English landing; every demo CTA points to app.grasslandforest.com; supplied logo; exact current English legal clauses');
    await page.emulateMedia({ reducedMotion: 'no-preference' });
    await page.locator('#motion-toggle').click();
    assert.equal(await page.locator('#motion-toggle').getAttribute('aria-pressed'), 'true');
    assert.equal(await page.locator('.forest-motes i').first().evaluate(el => getComputedStyle(el).animationPlayState), 'paused');
    await page.locator('#motion-toggle').click();
    assert.equal(await page.locator('#motion-toggle').getAttribute('aria-pressed'), 'false');
    await page.locator('#aventura').scrollIntoViewIfNeeded();
    await page.waitForFunction(() => document.querySelector('.hero').classList.contains('scene-paused'));
    await page.emulateMedia({ reducedMotion: 'reduce' });
    await page.waitForFunction(() => document.getElementById('motion-toggle').disabled);
    assert.equal(await page.locator('#motion-toggle').isDisabled(), true);
    assert.equal(await page.locator('.forest-motes').isVisible(), false);
    checks.push('Motion pause/resume works; offscreen animation pauses; system reduced-motion is respected');
    await page.locator('#gallery-next').click();
    assert.equal(await page.locator('#world-slide-2').isVisible(), true);
    await page.locator('[data-slide="1"]').press('ArrowRight');
    assert.equal(await page.locator('#world-slide-3').isVisible(), true);
    await page.locator('[data-slide="0"]').click();
    await page.locator('summary').first().click();
    assert.equal(await page.locator('details').first().getAttribute('open'), '');
    await page.locator('summary').first().click();
    await page.locator('.trailer-trigger').click();
    assert.equal(await page.locator('#trailer-dialog').evaluate(element => element.open), true);
    assert.equal(await page.locator('#trailer-player iframe').count(), 1);
    await page.keyboard.press('Escape');
    await page.waitForFunction(() => document.querySelectorAll('#trailer-player iframe').length === 0);
    checks.push('Gallery mouse/keyboard; native FAQ; trailer opens and releases iframe on Escape');
    // Simulated contact responses: no email, DB or remote CAPTCHA calls.
    await page.route('**/api/contact/config', route => route.fulfill({ json: { recaptchaRequired: false, recaptchaSiteKey: null } }));
    let sent = 0;
    await page.route('**/api/contact', async route => {
      sent++;
      const data = route.request().postDataJSON();
      assert.equal(data.name, 'Prueba local');
      assert.equal(data.website, '');
      await route.fulfill({ json: { ok: true } });
    });
    await page.locator('[name="name"]').fill('Prueba local');
    await page.locator('[name="email"]').fill('qa@example.test');
    await page.locator('[name="company"]').fill('Personal');
    await page.locator('[name="message"]').fill('Prueba simulada: este mensaje nunca se envía.');
    await page.locator('[name="privacy"]').check();
    await page.locator('.contact-submit').click();
    await page.waitForFunction(() => document.getElementById('contact-status').classList.contains('success'));
    assert.equal(sent, 1);
    await page.unroute('**/api/contact');
    await page.route('**/api/contact', route => route.fulfill({ status: 503, json: { error: 'unavailable' } }));
    await page.locator('[name="name"]').fill('Prueba local');
    await page.locator('[name="email"]').fill('qa@example.test');
    await page.locator('[name="company"]').fill('Personal');
    await page.locator('[name="message"]').fill('Texto que se debe conservar');
    await page.locator('[name="privacy"]').check();
    await page.locator('.contact-submit').click();
    await page.waitForFunction(() => document.getElementById('contact-status').classList.contains('error'));
    assert.equal(await page.locator('[name="message"]').inputValue(), 'Texto que se debe conservar');
    checks.push('Contact validates consent, submits once, displays success, preserves input on failure');
    await page.reload({ waitUntil: 'networkidle' });
    await page.evaluate(() => window.scrollTo(0, 0));
    await page.waitForFunction(() => document.querySelector('.hero-art').complete);
    fs.mkdirSync(path.join(root, 'artifacts'), { recursive: true });
    // Full-page screenshots do not trigger offscreen lazy images themselves.
    for (const selector of ['#universo', '#web3', '#equipo']) {
      await page.locator(selector).scrollIntoViewIfNeeded();
      await page.locator(selector + ' img:visible').evaluateAll(images => Promise.all(images.map(image => image.decode())));
    }
    await page.evaluate(() => window.scrollTo(0, 0));
    await page.screenshot({ path: path.join(root, 'artifacts/desktop-hero.png') });
    await page.screenshot({ path: path.join(root, 'artifacts/landing-desktop.png'), fullPage: true });
    for (const width of [1440, 1024, 768, 390, 320]) {
      await page.setViewportSize({ width, height: 900 });
      const dimensions = await page.evaluate(() => ({ scroll: document.documentElement.scrollWidth, view: innerWidth }));
      assert.ok(dimensions.scroll <= dimensions.view, `Horizontal overflow at ${width}: ${JSON.stringify(dimensions)}`);
      if (width === 390) {
        await page.locator('.menu-toggle').click();
        assert.equal(await page.locator('#main-nav').isVisible(), true);
        await page.keyboard.press('Escape');
        assert.equal(await page.locator('#main-nav').isVisible(), false);
        await page.screenshot({ path: path.join(root, 'artifacts/mobile-hero.png') });
        await page.screenshot({ path: path.join(root, 'artifacts/landing-mobile.png'), fullPage: true });
      }
    }
    checks.push('No overflow at 320, 390, 768, 1024 and 1440 px; mobile menu and reduced motion');
    assert.deepEqual(errors, [], 'Browser exceptions and CSP violations');
    const plain = await browser.newContext({ javaScriptEnabled: false, viewport: { width: 390, height: 844 } });
    const nojs = await plain.newPage();
    await nojs.goto(base);
    assert.equal(await nojs.locator('h1').isVisible(), true);
    assert.equal(await nojs.locator('#main-nav').isVisible(), true);
    await nojs.locator('summary').first().click();
    assert.equal(await nojs.locator('details').first().getAttribute('open'), '');
    await plain.close();
    checks.push('Content, navigation, legal links and FAQ remain usable without JavaScript');
    const mobileContext = await browser.newContext({ viewport: { width: 390, height: 844 }, reducedMotion: 'reduce' });
    const mobile = await mobileContext.newPage();
    const mobileExternal = [];
    await mobileContext.route('**/*', route => {
      if (!route.request().url().startsWith(base)) { mobileExternal.push(route.request().url()); return route.abort(); }
      return route.continue();
    });
    await mobile.goto(base, { waitUntil: 'networkidle' });
    metrics.mobileHero = await mobile.locator('.hero-art').evaluate(el => new URL(el.currentSrc).pathname);
    assert.equal(metrics.mobileHero, '/assets/forest-world-960.webp');
    assert.deepEqual(mobileExternal, []);
    metrics.mobileResourceBytes = await mobile.evaluate(() => performance.getEntriesByType('resource').reduce((sum, entry) => sum + entry.encodedBodySize, 0));
    await mobileContext.close();
    checks.push('Cold mobile load uses the smaller 960px hero asset and makes no external requests');
    const legalPage = await context.newPage();
    legalPage.on('pageerror', error => errors.push(error.message));
    legalPage.on('console', message => { if (message.type() === 'error' && /Content Security Policy|Refused to/.test(message.text())) errors.push(message.text()); });
    for (const filename of legal) {
      await legalPage.goto(base + '/' + filename, { waitUntil: 'networkidle' });
      for (const width of [1440, 320]) {
        await legalPage.setViewportSize({ width, height: 900 });
        const overflow = await legalPage.evaluate(() => document.documentElement.scrollWidth > innerWidth);
        assert.equal(overflow, false, filename + ' must fit at ' + width);
        if (filename === 'privacy-policy.html') await legalPage.screenshot({ path: path.join(root, 'artifacts/legal-' + (width === 320 ? 'mobile' : 'desktop') + '.png') });
      }
      assert.equal(await legalPage.locator('[aria-current="page"]').getAttribute('href'), filename);
    }
    await legalPage.close();
    assert.deepEqual(errors, [], 'Legal pages must not produce browser errors or CSP violations');
    checks.push('All legal pages render in English without overflow at 320 and 1440 px');
    // Execute the actual browser vendor bundles with a small offline Phaser scene.
    await page.route('**/vendor-smoke', route => route.fulfill({ contentType: 'text/html', body: '<!doctype html><html><body>' + ['phaser.min.js', 'socket.io.min.js', 'ethers.umd.min.js', 'rexvirtualjoystickplugin.min.js'].map(name => `<script src="/bin/vendor/${name}"></script>`).join('') + '</body></html>' }));
    await page.goto(base + '/vendor-smoke', { waitUntil: 'networkidle' });
    const vendors = await page.evaluate(async () => {
      const socket = io('http://127.0.0.1:1', { autoConnect: false });
      socket.disconnect();
      const result = { phaser: Phaser.VERSION, ethers: ethers.version, io: typeof io, address: ethers.getAddress('0x0000000000000000000000000000000000000001') };
      await new Promise((resolve, reject) => {
        const deadline = setTimeout(() => reject(new Error('Phaser boot timeout')), 5000);
        const game = new Phaser.Game({ type: Phaser.CANVAS, width: 64, height: 64, banner: false, audio: { noAudio: true }, plugins: { global: [{ key: 'rexVirtualJoystick', plugin: rexvirtualjoystickplugin, start: true }] }, scene: { create() { const joystick = this.plugins.get('rexVirtualJoystick').add(this, { x: 30, y: 30, radius: 10 }); joystick.destroy(); game.events.once('destroy', () => { clearTimeout(deadline); resolve(); }); game.destroy(true); } } });
      });
      return result;
    });
    assert.equal(vendors.phaser, '3.90.0'); assert.equal(vendors.ethers, '6.17.0'); assert.equal(vendors.io, 'function');
    checks.push('Actual Phaser/joystick boot and destruction; ethers and rebuilt Socket.IO browser API');
    fs.writeFileSync(path.join(root, 'artifacts/site-verification.json'), JSON.stringify({ checks, metrics, vendors, browserErrors: errors }, null, 2));
    console.log(JSON.stringify({ checks, metrics, vendors }, null, 2));
  } finally { await browser?.close(); await new Promise(resolve => server.close(resolve)); server.closeAllConnections(); }
}
main().catch(error => { console.error(error); process.exitCode = 1; });

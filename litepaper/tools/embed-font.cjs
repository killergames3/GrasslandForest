'use strict';
// Keep the documents usable when opened directly with file:// in Chromium.
const fs=require('node:fs'),path=require('node:path');const root=path.resolve(__dirname,'..');
const cssFile=path.join(root,'litepaper.css');const css=fs.readFileSync(cssFile,'utf8');
const font=fs.readFileSync(path.join(root,'assets/pixel.woff2')).toString('base64');
const out=css.replace(/url\('(?:assets\/pixel\.woff2|data:font\/woff2;base64,[^']+)'\)/,`url('data:font/woff2;base64,${font}')`);
fs.writeFileSync(cssFile,out);console.log('Local pixel font embedded for offline reading.');

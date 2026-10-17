'use strict';
const fs = require('node:fs');
const path = require('node:path');
const crypto = require('node:crypto');
const root = path.resolve(__dirname, '../../bin');
const out = path.resolve(__dirname, '../research');
const languages = { es: 'https://artsgames.gitbook.io/grassland-forest', en: 'https://artsgames.gitbook.io/grassland-forest-english' };
async function get(url) {
  const r = await fetch(url, {signal: AbortSignal.timeout(45000)});
  if (!r.ok) throw new Error(`${r.status}: ${url}`);
  return r.text();
}
function files(dir) {
  return fs.readdirSync(dir, {withFileTypes:true}).flatMap(x => x.isDirectory() ? files(path.join(dir,x.name)) : [path.join(dir,x.name)]);
}
async function main() {
  const protectedFiles = [...fs.readdirSync(root).filter(x => /\.(?:js|css|html|json)$/.test(x)).map(x => path.join(root,x)), ...files(path.join(root,'Scenes'))];
  fs.writeFileSync(path.join(out, 'game-baseline.json'), JSON.stringify(protectedFiles.map(file => ({file,hash:crypto.createHash('sha256').update(fs.readFileSync(file)).digest('hex')})), null, 2));
  for (const [lang, base] of Object.entries(languages)) {
    const index = await get(base+'/llms.txt');
    fs.writeFileSync(path.join(out,`${lang}-index.txt`), index);
    const urls = [...new Set([...index.matchAll(/\((https:\/\/[^)]+)\)/g)].map(x=>x[1]).filter(x=>x.startsWith(base)))];
    const pages = [];
    for(let i=0;i<urls.length;i+=4) {
      const batch=await Promise.all(urls.slice(i,i+4).map(async url => {
        const markdown = await get(url.replace(/\.md$/,'')+'.md');
        return {url, markdown};
      }));
      pages.push(...batch);
    }
    fs.writeFileSync(path.join(out,`${lang}-pages.json`),JSON.stringify(pages,null,2));
    fs.writeFileSync(path.join(out,`${lang}-all.md`),pages.map(x=>`\n\nSOURCE: ${x.url}\n\n${x.markdown}`).join(''));
    console.log(lang, 'read pages:', pages.length, 'characters:', pages.reduce((n,p)=>n+p.markdown.length,0));
    console.log(index);
  }
}
main().catch(e=>{console.error(e);process.exitCode=1;});

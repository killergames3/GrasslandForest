'use strict';
const fs=require('node:fs'),path=require('node:path');
const {pathToFileURL}=require('node:url');const assert=require('node:assert/strict');
const {chromium}=require('C:/Users/pc/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright');
const root=path.resolve(__dirname,'..'),out=path.join(root,'research');
async function main(){
 fs.mkdirSync(out,{recursive:true});
 const browser=await chromium.launch({executablePath:'C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe',headless:true});
 const results=[],issues=[],requests=[];
 try{
  for(const lang of ['es','en']){
   const file=path.join(root,lang==='es'?'litepaper_español.html':'litepaper_ingles.html');
   const page=await browser.newPage({viewport:{width:1440,height:1000}});
   page.on('pageerror',e=>issues.push(e.message));page.on('console',m=>{if(m.type()==='error')issues.push(m.text());});
   page.on('request',r=>{if(/^https?:/.test(r.url()))requests.push(r.url());});
   await page.goto(pathToFileURL(file).href,{waitUntil:'load'});await page.evaluate(()=>document.fonts.ready);
   await page.screenshot({path:path.join(out,`preview-${lang}-desktop.png`)});
   const audit=await page.evaluate(async()=>{
    for(const img of document.querySelectorAll('img[src]')){img.loading='eager';await img.decode().catch(()=>{});}
    const ids=[...document.querySelectorAll('[id]')].map(e=>e.id);
    const dead=[...document.querySelectorAll('a[href^="#"]')].filter(a=>!document.getElementById(decodeURIComponent(a.hash.slice(1)))).map(a=>a.hash);
    const chapterIds=[...document.querySelectorAll('.chapter')].map(e=>e.id);
    const tocIds=[...document.querySelectorAll('.toc a[href^="#"]')].map(a=>decodeURIComponent(a.hash.slice(1)));
    const normalize=s=>s.normalize('NFD').replace(/[\u0300-\u036f]/g,'');
    const retiredNames=normalize(document.documentElement.outerHTML).match(/\b(?:lunas?|umbrias?)\b/gi)||[];
    const currentCapture=/^guide-(?:world|wild-forest|farming|woodcutting|surface-mining|fishing-(?:shore|game)|skills|mine-(?:stairs|mage|sword|serpent|mobile-powers))\.png$/;
    const staleCaptureCaptions=[...document.querySelectorAll('.figure')].filter(f=>{
     const src=f.querySelector('img')?.getAttribute('src')||'';
     return currentCapture.test(src.split('/').at(-1))&&/version(?:es)? anterior(?:es)?|previous version|earlier version|old screenshot|old version|captura antigua|captura de referencia|reference screenshot/i.test(normalize(f.querySelector('figcaption')?.textContent||''));
    }).map(f=>({src:f.querySelector('img').getAttribute('src'),caption:f.querySelector('figcaption')?.textContent}));
    return {language:document.documentElement.lang,chapters:chapterIds.length,chapterIds,tocIds,retiredNames,staleCaptureCaptions,images:document.querySelectorAll('.figure img').length,brokenImages:[...document.querySelectorAll('img[src]')].filter(i=>!i.naturalWidth).map(i=>i.src),duplicateIds:ids.filter((id,i)=>ids.indexOf(id)!==i),deadAnchors:dead,words:document.querySelector('.article').innerText.split(/\s+/).length,links:[...document.querySelectorAll('a[href],link[href],script[src],img[src]')].map(e=>e.getAttribute('href')||e.getAttribute('src')),overflow:document.documentElement.scrollWidth>innerWidth+1};
   });
   assert.equal(audit.language,lang);assert.ok(audit.chapters>=20);assert.deepEqual(audit.tocIds,audit.chapterIds,'Contents must match every chapter in order');assert.ok(audit.chapterIds.includes('roadmap'),'Roadmap chapter is required');assert.ok(audit.images>=25);assert.deepEqual(audit.retiredNames,[],'Retired names remain in the document');assert.deepEqual(audit.staleCaptureCaptions,[],'Updated captures retain an old-version caption');assert.deepEqual(audit.brokenImages,[]);assert.deepEqual(audit.duplicateIds,[]);assert.deepEqual(audit.deadAnchors,[]);assert.equal(audit.overflow,false);
   if(results.length)assert.deepEqual(audit.chapterIds,results[0].chapterIds,'Both editions must contain the same chapters');
   for(const href of audit.links){if(!href||/^(?:https?:|#)/.test(href))continue;const target=path.resolve(root,decodeURIComponent(href.split(/[?#]/)[0]));assert.ok(target.startsWith(root+path.sep),'Link must stay in litepaper: '+href);assert.ok(fs.existsSync(target),'Missing linked file: '+href);}
   await page.locator('#chapter-search').fill('pesca');assert.ok(await page.locator('.toc li:not([hidden])').count()>0);await page.locator('#chapter-search').fill('zzzz-unmatched');assert.equal(await page.locator('.toc li:not([hidden])').count(),0);await page.locator('#chapter-search').fill('');assert.equal(await page.locator('.toc li:not([hidden])').count(),audit.chapters);
   await page.locator('[data-zoom]').first().click();assert.equal(await page.locator('#image-dialog').evaluate(d=>d.open),true);await page.keyboard.press('Escape');assert.equal(await page.locator('#image-dialog').evaluate(d=>d.open),false);
   for(const id of ['interfaz','cultivar','recursos','pescar','progreso','combate','arena','comunidad','litvm','roadmap']){if(!audit.chapterIds.includes(id))continue;await page.locator('#'+id).scrollIntoViewIfNeeded();await page.waitForTimeout(150);await page.screenshot({path:path.join(out,`preview-${lang}-${id}.png`)});}
   const layouts=[];
   for(const width of [820,390,320]){
    await page.setViewportSize({width,height:844});await page.evaluate(()=>scrollTo(0,0));await page.waitForTimeout(200);
    const overflow=await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth+1);assert.equal(overflow,false,`${lang} ${width}px overflow`);layouts.push({width,overflow});
    if(width<=800){await page.locator('.menu-toggle').click();assert.equal(await page.locator('#document-nav').isVisible(),true);await page.locator('.toc a[href="#pescar"]').click();assert.equal(await page.locator('#document-nav').isVisible(),false);}
    await page.evaluate(()=>scrollTo(0,0));await page.screenshot({path:path.join(out,`preview-${lang}-${width}.png`)});
   }
   await page.emulateMedia({media:'print'});await page.screenshot({path:path.join(out,`preview-${lang}-print.png`)});await page.emulateMedia({media:'screen',reducedMotion:'reduce'});
   await page.setViewportSize({width:1440,height:1000});
   await page.locator('.language a[lang="'+(lang==='es'?'en':'es')+'"]').click();await page.waitForLoadState('load');assert.equal(await page.locator('html').getAttribute('lang'),lang==='es'?'en':'es');
   results.push({...audit,links:audit.links.length,layouts});await page.close();
  }
  assert.deepEqual(issues,[]);assert.deepEqual(requests,[],'Documents must load without external network requests');
  const report={date:'2026-10-16',results,issues,externalRequests:requests};
  fs.writeFileSync(path.join(out,'verification.json'),JSON.stringify(report,null,2));console.log(JSON.stringify(report,null,2));
 }finally{await browser.close();}
}
main().catch(e=>{console.error(e.stack);process.exitCode=1;});

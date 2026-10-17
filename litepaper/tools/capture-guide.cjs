'use strict';
// Capture the existing game in an isolated fixture. All outputs stay in litepaper.
// The game, mock, and backend source files are only read; no real RPC is contacted.
const fs = require('node:fs'), path = require('node:path'), Module = require('node:module');
const project = path.resolve(__dirname, '../..');
const original = path.join(project, 'bin/tools/inventory-browser-verification.cjs');
let code = fs.readFileSync(original, 'utf8');
const cut = code.indexOf('    const initial = await sample');
if (cut < 0) throw Error('Fixture entry point changed');
code = code.slice(0, cut);
code = code.replace("dist = path.join(root, 'GrasslandBuild/dist')", "dist = path.resolve(root, '../litepaper/assets')");
code = code.replace("const worldQA = process.argv.includes('--world') || mapsSmoke", 'const worldQA = true');
code = code.replace("fs.readFileSync(path.join(root, '_prueba_offline.html'), 'utf8').replace('<head>',", "fs.readFileSync(path.join(root, 'index.html'), 'utf8').replace(/<meta http-equiv=\"Content-Security-Policy\"[\\s\\S]*?\\/>/, '').replace('<head>',");
code = code.replace("'<head><script>window.__inventoryNativeFetch", "'<head><script src=\"./_prueba_offline_mock.js\"></script><script>window.__inventoryNativeFetch");
code = code.replace("'<head><script src=\"./_prueba_offline_mock.js\"></script><script>window.__inventoryNativeFetch=window.fetch.bind(window);</script>'", "'<head><script>window.__inventoryNativeFetch=window.fetch.bind(window);</script><script src=\"./_prueba_offline_mock.js\"></script>'");
code = code.replace('if(worldQA) html =', 'if(false) html =');
code += String.raw`
    await ready('GameScene');
    await page.waitForTimeout(2200);
    await page.evaluate(()=>{if(window.GFClima)GFClima.probar('claro');});
    const capture = async name => { await page.waitForTimeout(350); await page.screenshot({path:path.join(dist,name+'.png')}); console.log('Captured',name); };
    if(process.argv.includes('--buy')) {
      await page.setViewportSize({width:1280,height:1120});
      await page.evaluate(()=>initTienda(game.scene.getScene('GameScene')).open());
      await page.locator('[data-id="Semillax"], [data-item-id="Semillax"]').first().click();
      await page.locator('#interact-button-pc').click();await capture('guide-purchase-confirm');
      await page.locator('#close-pc-modal').click();
      await page.setViewportSize({width:390,height:844});
      await page.locator('[data-id="Semillax"], [data-item-id="Semillax"]').first().click();await capture('guide-store-mobile');
      return;
    }
    if(process.argv.includes('--panels')||process.argv.includes('--building')) {
      if(!process.argv.includes('--building')) {
      await page.locator('#inv-shortcut-btn').click();await capture('guide-inventory');await page.keyboard.press('KeyI');
      await page.evaluate(()=>game.scene.getScene('GameScene').openFurnacePanel());await capture('guide-furnace');await page.locator('#furnace-close').click();
      await page.locator('#nft-btn').click();await capture('guide-nft');await page.locator('#nft-close').click();
      }
      await page.evaluate(()=>GFLands.ir(game.scene.getScene('GameScene')));await ready('LandsScene');await page.waitForTimeout(2700);await page.locator('#lc-toggle').click();await capture('guide-build');
      return;
    }
    if(!process.argv.includes('--extra')&&!process.argv.includes('--chat')) {
    await capture('guide-world');
    await page.evaluate(()=>game.scene.getScene('GameScene').openSkillsPanel());
    await page.waitForFunction(()=>document.querySelectorAll('#gf-character-upgrades button').length===8);
    await capture('guide-skills');
    await page.evaluate(()=>game.scene.getScene('GameScene').closeSkillsPanel());
    await page.evaluate(()=>{const s=game.scene.getScene('GameScene'); const shop=initTienda(s);shop.open();});
    await page.waitForTimeout(500);
    await capture('guide-store');
    const itemButton=page.locator('[data-id="Semillax"], [data-item-id="Semillax"]').first();
    if(await itemButton.count()) { await itemButton.click(); await capture('guide-buy'); }
    await page.evaluate(()=>{initTienda(game.scene.getScene('GameScene')).close();});
    await page.evaluate(()=>GFLands.ir(game.scene.getScene('GameScene')));
    await ready('LandsScene');await page.waitForTimeout(2600);await capture('guide-lands');
    await page.evaluate(()=>GFLands.volver(game.scene.getScene('LandsScene')));await ready('GameScene');
    await page.evaluate(()=>game.scene.getScene('GameScene').openBattleHub());await capture('guide-battle-menu');
    await page.locator('#battleHubPracticeBtn').click();
    await page.waitForFunction(()=>{const s=game.scene.getScene('BattleScene');return s&&s.sys.isActive()&&s.estado==='combate';},{timeout:45000});
    await capture('guide-battle');
    await page.setViewportSize({width:844,height:390});
    const cdp=await page.context().newCDPSession(page);await cdp.send('Emulation.setTouchEmulationEnabled',{enabled:true,maxTouchPoints:5});
    await capture('guide-battle-mobile');
    await page.locator('#bzSalir').click();await page.waitForTimeout(300);await page.locator('#bzSalir').click();
    await ready('GameScene');await cdp.send('Emulation.setTouchEmulationEnabled',{enabled:false});await cdp.detach();await page.setViewportSize({width:1280,height:800});
    }
    await page.route('https://translate.googleapis.com/**',r=>{const u=new URL(r.request().url()),es=u.searchParams.get('tl')==='es';return r.fulfill({contentType:'application/json',body:JSON.stringify([[[es?'Nos vemos junto al río.':'Meet me by the river.',null,null,null]],null,es?'en':'es'])});});
    await page.evaluate(()=>{const s=game.scene.getScene('GameScene');document.getElementById('open-chat-btn').click();GFTraductor.ponerModo('es');s.appendMessage({playerName:'RiverFriend',text:'Meet me by the river.',ts:Date.now()});});
    await page.waitForFunction(()=>document.querySelector('.gft-trad')?.textContent.includes('Nos vemos'));
    await capture('guide-chat-es');
    await page.locator('#chat-panel').screenshot({path:path.join(dist,'guide-chat-detail-es.png')});
    await page.evaluate(()=>{const s=game.scene.getScene('GameScene');document.getElementById('chat-messages').replaceChildren();GFTraductor.ponerModo('en');s.appendMessage({playerName:'RiverFriend',text:'Nos vemos junto al río.',ts:Date.now()});});
    await page.waitForFunction(()=>[...document.querySelectorAll('.gft-trad')].some(x=>x.textContent.includes('Meet me')));
    await capture('guide-chat-en');
    await page.locator('#chat-panel').screenshot({path:path.join(dist,'guide-chat-detail-en.png')});
    if(process.argv.includes('--chat'))return;
    await page.evaluate(()=>{document.getElementById('open-chat-btn').click();});
    await page.evaluate(()=>GFMascota.abrirMenu());await capture('guide-pet');
    await page.evaluate(()=>GFMascota.cerrarMenu());
    if(process.argv.includes('--extra')){await page.evaluate(()=>GFLands.ir(game.scene.getScene('GameScene')));await ready('LandsScene');await page.waitForTimeout(2700);await capture('guide-lands');await page.evaluate(()=>GFLands.volver(game.scene.getScene('LandsScene')));await ready('GameScene');await page.waitForTimeout(2700);}
    const fishingPosition=await page.evaluate(()=>{
      const s=game.scene.getScene('GameScene'),a=s.__gfPescaAgua,tile=a.tileSize||16;
      const water=(x,y)=>a.m[Math.floor(y/tile)*a.w+Math.floor(x/tile)]||0;
      let shore,best=Infinity;
      for(let row=6;row<a.h-6;row++)for(let col=3;col<a.w-10;col++){
        const i=row*a.w+col;if(a.m[i]||a.m[i-1]!==2)continue;
        const x=col*tile+tile/2+16,foot=row*tile+tile/2,y=foot-45;
        let dry=true;for(let dy=-80;dy<=12&&dry;dy+=8)for(let dx=-22;dx<=100;dx+=8)if(water(x+dx,foot+dy)){dry=false;break;}
        if(!dry||s._chocaConEscenario(x-15,y+25,30,15)||s._chocaConEscenario(x+52,y+4,36,32))continue;
        const d=Math.hypot(x-2097,foot-2359);if(d<best){best=d;shore={x,y,foot};}
      }
      if(!shore)throw Error('No clear, dry fishing shore for character and pet');
      const {x,y}=shore;s.stopMouseMovement();s.player.setPosition(x,y);s.player.body.reset(x,y);s.previousPosition={x,y};s.prevPlayerX=x;s.prevPlayerY=y;s.lastDirection='left';s.player.anims.stop();s.player.setTexture('player_left_1');
      const d=s.dog;d.x=d.targetX=d.prevX=d.prevTargetX=x+70;d.y=d.targetY=d.prevY=d.prevTargetY=y+20;d.smoothOffsetX=70;d.smoothOffsetY=20;d.sprite.setPosition(d.x,d.y);
      return {...shore,characterFeetWater:water(x,y+45),petFeetWater:water(d.x,d.y+22)};
    });
    console.log('Validated fishing shore',JSON.stringify(fishingPosition));await page.waitForTimeout(2400);
    await page.waitForFunction(()=>GFPesca.estado(game.scene.getScene('GameScene')).puede);
    await capture('guide-fishing-shore');
    await page.keyboard.down('KeyF');await page.waitForTimeout(850);await page.keyboard.up('KeyF');
    await page.waitForFunction(()=>GFPesca.estado(game.scene.getScene('GameScene')).fase==='pica');
    await page.keyboard.press('KeyF');await page.waitForTimeout(200);await capture('guide-fishing-game');
    console.log('Fixture runtime messages:',errors.slice(0,5));
  } catch(e) { console.log('Fixture errors', errors, messages.slice(-12)); const pages=browser.contexts()[0]?.pages();if(pages?.length){console.log(await pages[0].evaluate(()=>({game:!!window.game,scenes:window.game?.scene?.getScenes(true).map(s=>({key:s.sys.settings.key,player:!!s.player,inventory:s._inventarioCargado})),body:document.body.innerText.slice(-600)})));await pages[0].screenshot({path:path.join(dist,'capture-debug.png')});}throw e;
  } finally { await browser.close(); server.closeAllConnections(); await new Promise(r=>server.close(r)); }
}
main().catch(e=>{console.error(e.stack);process.exitCode=1;});
`;
const mod = new Module(original, module); mod.filename=original;mod.paths=Module._nodeModulePaths(path.dirname(original));mod._compile(code, original);

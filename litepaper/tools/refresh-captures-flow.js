    await ready('GameScene');
    await page.waitForTimeout(2400);
    await page.evaluate(()=>{GFClima?.probar('claro');});
    const capture=async name=>{await page.waitForTimeout(400);await page.screenshot({path:path.join(dist,name+'.png')});console.log('Captured',name);};
    const diagnose=async key=>page.evaluate(key=>{
      const s=game.scene.getScene(key),p=s.player,d=s.dog;
      return {key,player:{x:p.x,y:p.y,originY:p.originY,w:p.displayWidth,h:p.displayHeight,texture:p.texture.key},pet:d?{x:d.x,y:d.y,texture:d.sprite?.texture.key}:null,
        plots:s.plotImages?[...s.plotImages.entries()].slice(0,12).map(([id,v])=>({id,x:v.x,y:v.y,w:v.displayWidth,h:v.displayHeight})):[],
        sprites:s.children.list.filter(v=>v.texture?.key&&v.x&&v.y).map(v=>({key:v.texture.key,x:v.x,y:v.y,w:v.displayWidth,h:v.displayHeight})).slice(0,250),
        keys:Object.keys(s).filter(k=>/gf|dog|collision|plot|layer|agua/i.test(k))};
    },key);
    await capture('guide-world');
    fs.writeFileSync(path.resolve(dist,'../research/current-capture-state.json'),JSON.stringify(await diagnose('GameScene'),null,2));
    await page.evaluate(()=>game.scene.getScene('GameScene').openSkillsPanel());
    await page.waitForFunction(()=>document.querySelectorAll('#gf-character-upgrades button').length===8);
    await capture('guide-skills');
    await page.evaluate(()=>game.scene.getScene('GameScene').closeSkillsPanel());
    if(process.argv.includes('--inspect'))return;
    await page.evaluate(()=>{
      window.__capturePlace=(s,x,foot,dir='right')=>{
        const y=foot-45,h=s.sys.settings.key==='GameScene'?15:26;
        const offset=dir==='left'?70:-70;
        if(s._chocaConEscenario?.(x-15,y+25,30,h)||s._chocaConEscenario?.(x+offset-22,y+5,44,36))throw Error('Blocked standing position '+x+','+foot);
        s.stopMouseMovement?.();s.player.setVelocity?.(0,0);s.player.setPosition(x,y);s.player.body?.reset(x,y);
        s.previousPosition={x,y};s.prevPlayerX=x;s.prevPlayerY=y;s.lastDirection=dir;s.player.anims.stop();s.player.setTexture('player_'+dir+'_1');
        if(s.dog){const d=s.dog;d.x=d.targetX=d.prevX=d.prevTargetX=x+offset;d.y=d.targetY=d.prevY=d.prevTargetY=y+20;d.smoothOffsetX=offset;d.smoothOffsetY=20;d.sprite?.setPosition(d.x,d.y);}
        s.cameras.main.centerOn(x,y);
        return {x,y,foot,dir};
      };
      window.__captureSelect=(s,id)=>{
        s.STATE.selectedItem=null;s.STATE.ghostSlots={inv:{},quick:{}};s.selectedQuickIndex=null;s.endDrag?.();
        let index=s.STATE.quickSlots.findIndex(it=>it?.id===id);
        if(index<0){const i=s.STATE.slots.findIndex(it=>it?.id===id);if(i<0)throw Error('Missing item '+id);const old=s.STATE.quickSlots[0];s.STATE.quickSlots[0]=s.STATE.slots[i];s.STATE.slots[i]=old;index=0;}
        s.renderAllSlots?.();const it=s.STATE.quickSlots[index];s.STATE.selectedItem={...it,originType:'quick',originIndex:index,isGhost:false};s.highlightQuickSlot(index);
      };
      window.__captureApproach=(s,keys)=>{
        const tall=Object.keys(s).filter(k=>/^sprite_/.test(k)).map(k=>s[k]).filter(v=>v?.getBounds&&v.displayHeight>85);
        const clear=(x,y)=>{
          if(x-110<0||x+35>s.map.widthInPixels||y-60<0||y+55>s.map.heightInPixels)return false;
          if((s.__gfFauna?.animales||[]).some(a=>a.spr&&Math.hypot(a.spr.x-x,a.spr.y-y)<200))return false;
          if(s._chocaConEscenario(x-15,y+25,30,15)||s._chocaConEscenario(x-92,y+5,44,36))return false;
          const boxes=[new Phaser.Geom.Rectangle(x-27,y-55,54,106),new Phaser.Geom.Rectangle(x-105,y-24,70,74)];
          return tall.every(v=>boxes.every(b=>!Phaser.Geom.Intersects.RectangleToRectangle(v.getBounds(),b)));
        };
        for(const key of keys){const spr=s[key];if(!spr?.getBounds)continue;const b=spr.getBounds();
          for(const [dx,dy] of [[115,70],[150,25],[-115,75],[80,110],[0,125]]){
            const x=b.centerX+dx,foot=b.bottom+dy,y=foot-45;if(clear(x,y))return {key,x,foot};
          }
        }throw Error('No unobstructed resource approach');
      };
    });
    if(!process.argv.includes('--wild')&&!process.argv.includes('--mine')){
      if(!process.argv.includes('--fishing')){
      await page.evaluate(()=>{const s=game.scene.getScene('GameScene');__capturePlace(s,1055,3310,'right');__captureSelect(s,'Semillax');const free=[...s.plotImages.keys()].filter(id=>!s.cropData.has(id));s.handlePlotClick(free[0],s.input.activePointer);s.handlePlotClick(free[1],s.input.activePointer);});
      await page.waitForTimeout(1800);await capture('guide-farming');
      console.log('Farming',JSON.stringify((await diagnose('GameScene')).player));
      await page.evaluate(()=>{const s=game.scene.getScene('GameScene');[...s.pendingPlantings.keys()].forEach(id=>s.unstageSeed(id));});
      const tree=await page.evaluate(()=>{const s=game.scene.getScene('GameScene'),keys=Object.keys(s).filter(k=>/^sprite_pinos\d+$/.test(k)).sort((a,b)=>Math.hypot(s[a].x-2097,s[a].y-2359)-Math.hypot(s[b].x-2097,s[b].y-2359)),chosen=__captureApproach(s,keys);__capturePlace(s,chosen.x,chosen.foot,'right');__captureSelect(s,'hacha_de_madera');return chosen;});
      console.log('Tree approach',JSON.stringify(tree));await page.waitForTimeout(1500);
      await page.evaluate(key=>{const s=game.scene.getScene('GameScene');s[key].emit('pointerdown',{event:{target:s.sys.canvas},x:720,y:450,worldX:s[key].x,worldY:s[key].y});},tree.key);
      await page.waitForTimeout(450);await capture('guide-woodcutting');
      const ore=await page.evaluate(()=>{const s=game.scene.getScene('GameScene'),keys=Object.keys(s).filter(k=>/^sprite_minar_piedra/.test(k)),chosen=__captureApproach(s,keys);__capturePlace(s,chosen.x,chosen.foot,'right');__captureSelect(s,'pico_de_piedra');return chosen;});
      console.log('Ore approach',JSON.stringify(ore));await page.waitForTimeout(1500);
      await page.evaluate(key=>{const s=game.scene.getScene('GameScene');s[key].emit('pointerdown',{event:{target:s.sys.canvas},x:720,y:450,worldX:s[key].x,worldY:s[key].y});},ore.key);
      await page.waitForTimeout(450);await capture('guide-surface-mining');
      await page.evaluate(()=>GFMascota.abrirMenu());await capture('guide-pet');await page.evaluate(()=>GFMascota.cerrarMenu());
      }
      const shore=await page.evaluate(()=>{
        const s=game.scene.getScene('GameScene'),a=s.__gfPescaAgua,tile=a.tileSize||16;
        const water=(x,y)=>a.m[Math.floor(y/tile)*a.w+Math.floor(x/tile)]||0;
        const counts={cells:0,near:0,full:0,dry:0,free:0},candidates=[];
        let shore,best=Infinity;
        for(const side of [1,-1])for(let row=6;row<a.h-6;row++)for(let col=3;col<a.w-10;col++){
          const i=row*a.w+col;if(a.m[i])continue;
          counts.cells++;
          const x=col*tile+tile/2,foot=row*tile+tile/2,y=foot-45;
          if(!water(x+side*32,foot)&&!water(x+side*40,foot))continue;
          counts.near++;
          if(![56,72,88,104,120,136,152].some(dx=>water(x+side*dx,foot)===2))continue;
          counts.full++;
          let dry=true;for(let dy=-5;dy<=5&&dry;dy+=5)for(const dx of [-16,-8,0,8,16,-48,-56,-64,-72,-80,-88])if(water(x+side*dx,foot+dy)){dry=false;break;}
          if(!dry)continue;counts.dry++;
          const petX=x-side*70;
          if(candidates.length<20)candidates.push({x,foot,side,blocked:s._chocaConEscenario(x-15,y+25,30,15),dogBlocked:s._chocaConEscenario(petX-22,y+5,44,36)});
          if(s._chocaConEscenario(x-15,y+25,30,15)||s._chocaConEscenario(petX-22,y+5,44,36))continue;counts.free++;
          const d=Math.hypot(x-2097,foot-2359);if(d<best){best=d;shore={x,foot,dir:side===1?'right':'left'};}
        }
        if(!shore)return {error:'No dry shore',counts,candidates,tile,w:a.w,h:a.h,waterCounts:[...a.m].reduce((acc,v)=>(acc[v]=(acc[v]||0)+1,acc),{})};__capturePlace(s,shore.x,shore.foot,shore.dir);
        __captureSelect(s,'cana_pescar');
        return {...shore,characterFeetWater:water(s.player.x,s.player.y+45),petFeetWater:water(s.dog.x,s.dog.y+22)};
      });
      fs.writeFileSync(path.resolve(dist,'../research/fishing-placement.json'),JSON.stringify(shore,null,2));
      if(shore.error)throw Error(JSON.stringify(shore));
      console.log('Dry fishing shore',JSON.stringify(shore));await page.waitForTimeout(2000);
      await page.waitForFunction(()=>GFPesca.estado(game.scene.getScene('GameScene')).puede);
      await capture('guide-fishing-shore');
      await page.keyboard.down('KeyF');await page.waitForTimeout(850);await page.keyboard.up('KeyF');
      await page.waitForFunction(()=>GFPesca.estado(game.scene.getScene('GameScene')).fase==='esperando');
      await page.screenshot({path:path.join(dist,'guide-fishing-shore.png')});
      await page.waitForFunction(()=>GFPesca.estado(game.scene.getScene('GameScene')).fase==='pica');
      await page.keyboard.press('KeyF');await page.waitForTimeout(200);await capture('guide-fishing-game');
      if(process.argv.includes('--town')||process.argv.includes('--fishing'))return;
    }
    if(!process.argv.includes('--mine')){
      await page.evaluate(()=>game.scene.getScene('GameScene').entrarEnSalvaje());await ready('SalvajeScene');await page.waitForTimeout(2200);
      fs.writeFileSync(path.resolve(dist,'../research/wild-capture-state.json'),JSON.stringify(await diagnose('SalvajeScene'),null,2));
      const wildPosition=await page.evaluate(()=>{
        const s=game.scene.getScene('SalvajeScene'),trees=s._arboles.map(v=>v.spr).filter(Boolean);
        for(const x of [2700,2800,2920,3100,3350,3700,4200])for(const foot of [2253,2220,2190,2280]){
          const y=foot-45;
          if(s._chocaConEscenario(x-15,y+25,30,26)||s._chocaConEscenario(x+48,y+5,44,36))continue;
          const boxes=[new Phaser.Geom.Rectangle(x-28,y-55,56,108),new Phaser.Geom.Rectangle(x+35,y-20,70,70)];
          if(trees.some(v=>boxes.some(b=>Phaser.Geom.Intersects.RectangleToRectangle(v.getBounds(),b))))continue;
          return __capturePlace(s,x,foot,'left');
        }throw Error('No clear forest standing position');
      });console.log('Forest position',JSON.stringify(wildPosition));
      await page.waitForTimeout(1500);
      await capture('guide-wild-forest');
      if(process.argv.includes('--wild'))return;
      await page.evaluate(()=>game.scene.getScene('SalvajeScene')._volverAlPueblo());await ready('GameScene');
    }
    await page.evaluate(()=>game.scene.getScene('GameScene').entrarEnLaMina());await ready('MinaScene');await page.waitForTimeout(2500);
    await capture('guide-mine-stairs');
    await page.waitForFunction(()=>game.scene.getScene('MinaScene').__gfEspectros?.mobs.length===4);
    const mineState=await page.evaluate(()=>{const s=game.scene.getScene('MinaScene');return{mobs:s.__gfEspectros.mobs.map(m=>({id:m.id,x:m.x,y:m.y,mage:m.mage,texture:m.sprite.texture.key,w:m.sprite.displayWidth,h:m.sprite.displayHeight})),serpent:s.__gfSerpiente?.s?{x:s.__gfSerpiente.s.x,y:s.__gfSerpiente.s.y}:null};});
    console.log('Mine enemies',JSON.stringify(mineState));fs.writeFileSync(path.resolve(dist,'../research/mine-capture-state.json'),JSON.stringify(mineState,null,2));
    const magePosition=await page.evaluate(()=>{
      const s=game.scene.getScene('MinaScene'),m=s.__gfEspectros.mobs[2];
      for(const r of [190,230,150,270])for(const side of [-1,1]){
        const x=m.x+side*r,foot=m.y,y=foot-45,petX=x+side*70;
        if(s._chocaConEscenario(x-15,y+25,30,26)||s._chocaConEscenario(petX-22,y+5,44,36))continue;
        const p=__capturePlace(s,x,foot,side<0?'right':'left');GFEspada.equipar('espada_madera');return p;
      }throw Error('No clear mage approach');
    });console.log('Mage position',JSON.stringify(magePosition));
    await page.waitForTimeout(700);await capture('guide-mine-mage');
    await page.evaluate(()=>GFEspada.usarPoder(game.scene.getScene('MinaScene'),'b'));
    await page.waitForTimeout(100);await page.screenshot({path:path.join(dist,'guide-mine-sword.png')});console.log('Captured guide-mine-sword');
    await page.setViewportSize({width:844,height:390});
    const mobileSession=await page.context().newCDPSession(page);await mobileSession.send('Emulation.setTouchEmulationEnabled',{enabled:true,maxTouchPoints:5});
    await capture('guide-mine-mobile-powers');
    await mobileSession.send('Emulation.setTouchEmulationEnabled',{enabled:false});await mobileSession.detach();await page.setViewportSize({width:1440,height:900});
    await page.waitForFunction(()=>!!game.scene.getScene('MinaScene').__gfSerpiente?.s);
    const serpentPosition=await page.evaluate(()=>{
      const s=game.scene.getScene('MinaScene'),m=s.__gfSerpiente.s;
      for(const r of [240,300,180,360])for(const side of [-1,1])for(const dy of [0,70,-70]){
        const x=m.x+side*r,foot=m.y+dy,y=foot-45,petX=x+side*70;
        if(s._chocaConEscenario(x-15,y+25,30,26)||s._chocaConEscenario(petX-22,y+5,44,36))continue;
        return __capturePlace(s,x,foot,side<0?'right':'left');
      }throw Error('No clear serpent approach');
    });console.log('Serpent position',JSON.stringify(serpentPosition));
    await page.waitForTimeout(800);await capture('guide-mine-serpent');
    fs.writeFileSync(path.resolve(dist,'../research/capture-runtime.json'),JSON.stringify({date:'2026-10-16',source:'bin/index.html',viewport:{width:1440,height:900},errors,messages},null,2));

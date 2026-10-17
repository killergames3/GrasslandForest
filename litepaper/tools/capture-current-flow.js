    await ready('GameScene');await page.waitForTimeout(2000);
    await page.evaluate(()=>{if(window.GFClima)GFClima.probar('claro');});
    const capture=async name=>{await page.waitForTimeout(600);await page.screenshot({path:path.join(dist,name+'.png')});console.log('Captured',name);};
    const inspect=async key=>page.evaluate(key=>{
      const s=game.scene.getScene(key), p=s.player, d=s.dog;
      return {key,keys:Object.keys(s).filter(k=>/dog|pet|collision|plot|sprite|nav|layer|agua/i.test(k)),player:{x:p.x,y:p.y,originY:p.originY,width:p.width,height:p.height,body:p.body?.getBounds({}),texture:p.texture.key},dog:d?{x:d.x,y:d.y,originY:d.originY,texture:d.texture?.key}:null,layers:s.map?.layers.map(l=>({name:l.name,w:l.width,h:l.height})),objects:s.map?.objects.map(l=>({name:l.name,objects:l.objects.slice(0,5)})),plots:s.plotImages?[...s.plotImages.entries()].slice(0,8).map(([id,v])=>({id,x:v.x,y:v.y,w:v.displayWidth,h:v.displayHeight})):[],sprites:s.children.list.filter(v=>v.texture?.key&&v.x&&v.y).map(v=>({key:v.texture.key,x:v.x,y:v.y,w:v.displayWidth,h:v.displayHeight,data:v.data?.values})).slice(0,200),water:s.__gfPescaAgua?{w:s.__gfPescaAgua.w,h:s.__gfPescaAgua.h,tileSize:s.__gfPescaAgua.tileSize}:null};
    },key);
    const state=await inspect('GameScene');const research=path.resolve(root,'../litepaper/research');fs.mkdirSync(research,{recursive:true});fs.writeFileSync(path.join(research,'current-state.json'),JSON.stringify(state,null,2));console.log(JSON.stringify({player:state.player,dog:state.dog,plots:state.plots,layers:state.layers,keys:state.keys.slice(0,40)}));
    await capture('guide-world');
    await page.evaluate(()=>{
      window.__litepaperPlace=(s,x,footY,dir='right')=>{
        let y=footY-45;s.stopMouseMovement?.();
        if(s._chocaConEscenario?.(x-15,y+25,30,s.sys.settings.key==='GameScene'?15:26)){
          const h=s._huecoLibreCerca(x,y,s.sys.settings.key==='GameScene'?15:26);
          if(!h)throw Error('No free standing position');x=h.x;y=h.y;
        }
        s.player.setPosition(x,y);s.player.body?.reset(x,y);s.previousPosition={x,y};s.prevPlayerX=x;s.prevPlayerY=y;
        s.lastDirection=dir;s.player.anims.stop();s.player.setTexture('player_'+dir+'_1');
        s._pegarPerroAlJugador?.();
        if(s.dog){const d=s.dog,offset=dir==='left'?70:-70;d.x=d.targetX=d.prevX=d.prevTargetX=x+offset;d.y=d.targetY=d.prevY=d.prevTargetY=y+20;d.smoothOffsetX=offset;d.smoothOffsetY=20;d.sprite?.setPosition(d.x,d.y);}
      };
      window.__litepaperSelect=(s,id)=>{
        s.STATE.selectedItem=null;s.STATE.ghostSlots={inv:{},quick:{}};s.selectedQuickIndex=null;s.endDrag?.();
        let index=s.STATE.quickSlots.findIndex(it=>it?.id===id);
        if(index<0){const i=s.STATE.slots.findIndex(it=>it?.id===id);if(i<0)throw Error('Missing item '+id);const old=s.STATE.quickSlots[0];s.STATE.quickSlots[0]=s.STATE.slots[i];s.STATE.slots[i]=old;index=0;}
        s.renderAllSlots?.();const it=s.STATE.quickSlots[index];
        s.STATE.selectedItem={...it,originType:'quick',originIndex:index,isGhost:false};s.highlightQuickSlot(index);
      };
      window.__litepaperApproach=(s,keys)=>{
        const tall=Object.keys(s).filter(k=>/^sprite_/.test(k)).map(k=>s[k]).filter(v=>v?.getBounds&&v.displayHeight>85);
        const clear=(x,y)=>{
          if(x-110<0||x+35>s.map.widthInPixels||y-60<0||y+55>s.map.heightInPixels)return false;
          if((s.__gfFauna?.animales||[]).some(a=>a.spr&&Math.hypot(a.spr.x-x,a.spr.y-(y+25))<230))return false;
          if(s._chocaConEscenario(x-15,y+25,30,15)||s._chocaConEscenario(x-90,y+4,40,32))return false;
          const boxes=[new Phaser.Geom.Rectangle(x-27,y-55,54,106),new Phaser.Geom.Rectangle(x-105,y-24,70,74)];
          return tall.every(v=>boxes.every(b=>!Phaser.Geom.Intersects.RectangleToRectangle(v.getBounds(),b)));
        };
        for(const key of keys){const spr=s[key];if(!spr?.getBounds)continue;const b=spr.getBounds();
          for(const [dx,dy] of [[0,125],[-90,125],[90,125],[-145,35],[145,35],[-190,75],[190,75]]){
            const x=b.centerX+dx,foot=b.bottom+dy,y=foot-45;if(clear(x,y))return {key,x,foot};
          }
        }throw Error('No unobstructed view for player and pet');
      };
    });
    await page.evaluate(()=>{const s=game.scene.getScene('GameScene'), ps=[...s.plotImages.values()];__litepaperPlace(s,1055,Math.max(...ps.map(v=>v.y+v.displayHeight/2))+110,'right');__litepaperSelect(s,'Semillax');const free=[...s.plotImages.keys()].filter(id=>!s.cropData.has(id));s.handlePlotClick(free[0],s.input.activePointer);s.handlePlotClick(free[1],s.input.activePointer);});
    await page.waitForTimeout(2200);await capture('guide-farming');
    await page.evaluate(()=>{const s=game.scene.getScene('GameScene');[...s.pendingPlantings.keys()].forEach(id=>s.unstageSeed(id));});
    const tree=await page.evaluate(()=>{const s=game.scene.getScene('GameScene'),keys=Object.keys(s).filter(k=>/^sprite_pinos\d+$/.test(k)).sort((a,b)=>Math.hypot(s[a].x-2097,s[a].y-2359)-Math.hypot(s[b].x-2097,s[b].y-2359)),chosen=__litepaperApproach(s,keys);__litepaperPlace(s,chosen.x,chosen.foot,'right');__litepaperSelect(s,'hacha_de_madera');return chosen;});
    console.log('Tree approach',JSON.stringify(tree));await page.waitForTimeout(2300);
    await page.evaluate(key=>{const s=game.scene.getScene('GameScene');s[key].emit('pointerdown',{event:{target:s.sys.canvas},x:600,y:350,worldX:s[key].x,worldY:s[key].y});},tree.key);
    await page.waitForTimeout(1200);await capture('guide-woodcutting');
    const ore=await page.evaluate(()=>{const s=game.scene.getScene('GameScene'),keys=Object.keys(s).filter(k=>/^sprite_minar_piedra/.test(k)),chosen=__litepaperApproach(s,keys);__litepaperPlace(s,chosen.x,chosen.foot,'right');__litepaperSelect(s,'pico_de_piedra');return chosen;});
    console.log('Ore approach',JSON.stringify(ore));await page.waitForTimeout(2300);
    await page.evaluate(key=>{const s=game.scene.getScene('GameScene');s[key].emit('pointerdown',{event:{target:s.sys.canvas},x:600,y:350,worldX:s[key].x,worldY:s[key].y});},ore.key);
    await page.waitForTimeout(1000);await capture('guide-surface-mining');

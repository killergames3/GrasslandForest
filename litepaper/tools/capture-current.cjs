'use strict';
// Read-only game source; all screenshots and diagnostics stay in litepaper.
const fs=require('node:fs'),path=require('node:path'),Module=require('node:module');
const project=path.resolve(__dirname,'../..'), original=path.join(project,'bin/tools/inventory-browser-verification.cjs');
let code=fs.readFileSync(original,'utf8');
const cut=code.indexOf('    const initial = await sample');
if(cut<0)throw Error('Fixture entry point changed');
code=code.slice(0,cut);
code=code.replace("dist = path.join(root, 'GrasslandBuild/dist')","dist = path.resolve(root, '../litepaper/assets')");
code=code.replace("const worldQA = process.argv.includes('--world') || mapsSmoke",'const worldQA = true');
code=code.replace("fs.readFileSync(path.join(root, '_prueba_offline.html'), 'utf8').replace('<head>',","fs.readFileSync(path.join(root, 'index.html'), 'utf8').replace(/<meta http-equiv=\"Content-Security-Policy\"[\\s\\S]*?\\/>/, '').replace('<head>',");
code=code.replace("'<head><script>window.__inventoryNativeFetch=window.fetch.bind(window);</script>'","'<head><script>window.__inventoryNativeFetch=window.fetch.bind(window);</script><script src=\"./_prueba_offline_mock.js\"></script>'");
code=code.replace('if(worldQA) html =','if(false) html =');
code+=fs.readFileSync(path.join(__dirname,'capture-current-flow.js'),'utf8');
code+=String.raw`
  } catch(e) { console.error(e.stack); const p=browser.contexts()[0]?.pages()[0];if(p)await p.screenshot({path:path.join(dist,'current-debug.png')}).catch(()=>{}); throw e;
  } finally { await browser.close();server.closeAllConnections();await new Promise(r=>server.close(r)); }
}
main().catch(e=>{console.error(e.stack);process.exitCode=1;});
`;
const mod=new Module(original,module);mod.filename=original;mod.paths=Module._nodeModulePaths(path.dirname(original));mod._compile(code,original);

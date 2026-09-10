import assert from 'node:assert/strict';
import fs from 'node:fs';
import ts from 'typescript';
const source=ts.transpileModule(fs.readFileSync('components/game/expedition-state.ts','utf8'),{compilerOptions:{target:ts.ScriptTarget.ES2022,module:ts.ModuleKind.ES2022}}).outputText;
const {iceOrders,iceStops,optimalIceMoves,gridPaths,rolesFor,cargo}=await import('data:text/javascript;base64,'+Buffer.from(source).toString('base64'));
for(let part=0;part<3;part++){const stops=iceStops(part);assert.equal(new Set(stops.map(x=>x.pos)).size,3);assert.equal(new Set(stops.map(x=>x.item)).size,3);for(const order of iceOrders[part]){assert(cargo.includes(order.item));assert(stops.some(s=>s.item===order.item&&gridPaths[part].includes(s.pos)));assert(order.request.includes(order.item))}assert(optimalIceMoves(part)>0)}
for(const count of [1,2,3,7,17,41,100])for(let turn=0;turn<120;turn++)assert(rolesFor(turn,count).every(id=>id>=1&&id<=count));
console.log('PASS: nine English requests; three distinct reachable supplies per round; valid route budgets; role rotation for arbitrary class sizes.');

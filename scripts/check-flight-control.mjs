import assert from 'node:assert/strict';
import fs from 'node:fs';
import ts from 'typescript';
const source=ts.transpileModule(fs.readFileSync('components/game/flight-control.ts','utf8'),{compilerOptions:{target:ts.ScriptTarget.ES2022,module:ts.ModuleKind.ES2022}}).outputText;
const {advanceFlight,flightTarget}=await import('data:text/javascript;base64,'+Buffer.from(source).toString('base64'));
for(const target of [{x:88,y:20},{x:12,y:80},{x:-100,y:200}]){
 let pos={x:22,y:48};
 for(let i=0;i<300;i++){const next=advanceFlight(pos,target,1/60);assert(Math.hypot(next.x-pos.x,next.y-pos.y)<=65/60+.0001,'No teleport on mouse movement');assert(next.x>=9&&next.x<=91&&next.y>=18&&next.y<=84);pos=next}
 assert.deepEqual(pos,flightTarget(target.x,target.y));
}
assert.deepEqual(advanceFlight({x:22,y:48},{x:88,y:80},0),{x:22,y:48},'Pause must freeze motion');
assert(advanceFlight({x:22,y:48},{x:80,y:48},.05).x>22,'Horizontal steering must work');
console.log('Mouse flight: smooth steering, all directions, bounds and pause passed.');

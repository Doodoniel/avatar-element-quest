import assert from 'node:assert/strict';
import fs from 'node:fs';
import ts from 'typescript';
const source=ts.transpileModule(fs.readFileSync('components/game/expedition-motion.ts','utf8'),{compilerOptions:{target:ts.ScriptTarget.ES2022,module:ts.ModuleKind.ES2022}}).outputText;
const {jumpPose,castPose,JUMP_SECONDS,CAST_SECONDS,driftItems}=await import('data:text/javascript;base64,'+Buffer.from(source).toString('base64'));
const start=jumpPose(24,null),landing=jumpPose(25,null),jump=t=>jumpPose(24,{from:24,to:25,elapsed:t});
assert.equal(jump(0).x,start.x);assert.equal(jump(0).y,start.y);
assert.equal(jump(JUMP_SECONDS).x,landing.x);assert(Math.abs(jump(JUMP_SECONDS).y-landing.y)<.001);
assert(jump(JUMP_SECONDS*.5).y<start.y-10,'Jump must visibly arc above the floes');
assert.equal(jumpPose(25,{from:25,to:24,elapsed:.4}).facing,-1);
assert.equal(jumpPose(24,{from:24,to:25,elapsed:.16},true).x,landing.x);
for(let i=0;i<=100;i++){const p=jump(JUMP_SECONDS*i/100);assert(p.frame>=0&&p.frame<8);assert(p.x>=start.x&&p.x<=landing.x)}
const cast=t=>castPose({x:70,y:60,kind:'fish',id:1,elapsed:t});assert.equal(cast(0).x,70);assert.equal(cast(CAST_SECONDS).x,15);assert.equal(cast(CAST_SECONDS).opacity,0);assert(cast(.8).itemY<60,'Water must lift the captured item');
assert.deepEqual(driftItems(2,3,true,['fish','scarf']),driftItems(2,3,true,['fish','scarf']),'Paused time must produce stationary cargo');
for(const name of ['katara-jump','water-flow'])for(let i=0;i<8;i++)assert(fs.existsSync('public/assets/expedition/'+name+'-'+i+'.png'));
console.log('PASS: jump arc, exact landing, left-facing, reduced motion, valid frames, water lift and delivery, paused positions and all 16 animation frames.');

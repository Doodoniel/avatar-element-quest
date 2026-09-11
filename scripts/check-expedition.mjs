import assert from 'node:assert/strict';
import fs from 'node:fs';
import ts from 'typescript';
const source=ts.transpileModule(fs.readFileSync('components/game/expedition-state.ts','utf8'),{compilerOptions:{target:ts.ScriptTarget.ES2022,module:ts.ModuleKind.ES2022}}).outputText;
const {gridPaths,canMove,rolesFor,flightObjects,targetFor,cargo,missions,totalExpeditionRounds}=await import('data:text/javascript;base64,'+Buffer.from(source).toString('base64'));
assert.equal(missions.length,3);assert.equal(totalExpeditionRounds,9);
for(const path of gridPaths){
 const visit=bridge=>{const seen=new Set([24]),q=[24];while(q.length){const n=q.shift();for(const b of path)if(!seen.has(b)&&canMove(n,b,path,bridge)){seen.add(b);q.push(b)}}return seen};
 assert(visit(true).has(31),'Supplies must be reachable');
 assert(!visit(false).has(31),'Bridge must be necessary');
 for(const a of path)for(const b of path)assert.equal(canMove(a,b,path,true),canMove(b,a,path,true),'Return route must work');
}
for(const n of [6,8,12,16,24,30,36]){const players=new Set();for(let r=0;r<Math.max(totalExpeditionRounds,Math.ceil(n/3));r++)for(const id of rolesFor(r,n))players.add(id);assert.equal(players.size,n,'Every child must get a role')}
for(let r=6;r<9;r++)assert(flightObjects(r).filter(o=>o.kind===targetFor(r)).length>=3,'A flight must have enough correct cargo');
for(const file of [...cargo,'floe','cloud','iceberg'])assert(fs.existsSync('public/assets/expedition/'+file+'.png'));
console.log('PASS: all three routes require the bridge and allow return; every player receives a role; each flight has enough cargo; art exists.');

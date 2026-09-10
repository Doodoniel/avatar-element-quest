import assert from 'node:assert/strict';
import fs from 'node:fs';
import ts from 'typescript';
const source=ts.transpileModule(fs.readFileSync('components/game/rescue-state.ts','utf8'),{compilerOptions:{target:ts.ScriptTarget.ES2022,module:ts.ModuleKind.ES2022}}).outputText;
const {rescueReducer:r,initialRescue,flightWords,homePoint,clampPoint}=await import('data:text/javascript;base64,'+Buffer.from(source).toString('base64'));
let s={...initialRescue};assert.equal(r(s,{type:'deliver'}),s);s=r(s,{type:'start'});assert.equal(r(s,{type:'greet'}),s);s=r(s,{type:'find'});s=r(s,{type:'greet'});
s=r(s,{type:'element',element:'fire'});assert.equal(s.waterChosen,false);assert.equal(r(s,{type:'bend'}),s);s=r(s,{type:'element',element:'water'});s=r(s,{type:'bend'});assert.equal(s.phase,'lift');s=r(s,{type:'lifted'});s=r(s,{type:'board'});assert.equal(s.phase,'fly');
function flyTo(p){s=r(s,{type:'target',point:p});for(let i=0;i<120;i++)s=r(s,{type:'tick',seconds:.08});}
flyTo(flightWords[2]);assert.equal(s.words,0,'Later words must not bypass sentence order');flyTo(homePoint);assert.equal(s.phase,'fly','Delivery requires a complete sentence');for(const word of flightWords)flyTo(word);assert.equal(s.words,3);flyTo(homePoint);assert.equal(s.phase,'deliver');s=r(s,{type:'deliver'});assert.equal(s.phase,'complete');assert.equal(r(s,{type:'tick',seconds:1}),s);assert.deepEqual(r(s,{type:'restart'}),initialRescue);assert.deepEqual(clampPoint({x:-50,y:200}),{x:8,y:82});
console.log('PASS: speech/action gates, wrong-element retry, water rescue, frame-independent travel, ordered word collection, delivery gate, ending and replay.');

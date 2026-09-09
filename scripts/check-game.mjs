import assert from 'node:assert/strict';
import fs from 'node:fs';
import ts from 'typescript';
const compile=p=>'data:text/javascript;base64,'+Buffer.from(ts.transpileModule(fs.readFileSync(p,'utf8'),{compilerOptions:{target:ts.ScriptTarget.ES2022,module:ts.ModuleKind.ES2022}}).outputText).toString('base64');
const dataUrl=compile('data/content.ts');
const {quizzes,characters,nations,words}=await import(dataUrl);
const stateSource=ts.transpileModule(fs.readFileSync('components/game/quiz-state.ts','utf8'),{compilerOptions:{target:ts.ScriptTarget.ES2022,module:ts.ModuleKind.ES2022}}).outputText.replaceAll('@/data/content',dataUrl);
const {freshQuiz,awardAnswer,restoreQuiz}=await import('data:text/javascript;base64,'+Buffer.from(stateSource).toString('base64'));
for(const level of ['explorer','challenger']){
 const bank=quizzes[level];assert.equal(bank.length,12);assert.equal(new Set(bank.map(q=>q.id)).size,12);
 let state=freshQuiz();
 for(const q of bank){assert.ok(q.answer>=0&&q.answer<q.options.length);assert.equal(new Set(q.options).size,q.options.length);state=awardAnswer(state,level,q.id,q.answer);const duplicate=awardAnswer(state,level,q.id,q.answer);assert.equal(duplicate,state,'Duplicate answer must not award points');if(q.image)assert.ok(fs.existsSync('public/assets/'+q.image+'.png'))}
 assert.equal(Object.keys(state.answered).length,12);assert.equal(state.scores[0]+state.scores[1],2400);assert.equal(state.turn,0);
 assert.deepEqual(restoreQuiz(JSON.stringify(state),level),state,'Reload must retain exact score and turn');
 const wrong=awardAnswer(freshQuiz(),level,bank[0].id,(bank[0].answer+1)%bank[0].options.length);assert.equal(wrong.scores[0],0);assert.equal(wrong.turn,1);
 assert.deepEqual(awardAnswer(freshQuiz(),level,bank[0].id,999),freshQuiz());
 assert.deepEqual(restoreQuiz('{broken',level),freshQuiz());
 assert.deepEqual(restoreQuiz(JSON.stringify(state),level==='explorer'?'challenger':'explorer'),freshQuiz(),'Levels must remain independent');
}
for(const c of characters)assert.ok(fs.existsSync('public/assets/'+c.id+'.png'));
for(const n of nations)assert.ok(fs.existsSync('public/assets/'+n.id+'.png'));
for(const w of words)assert.ok(fs.existsSync('public/assets/'+w.asset));
console.log('PASS: both question banks, scoring, duplicate prevention, turn rotation, invalid answers, reload recovery, separate levels and all referenced assets.');

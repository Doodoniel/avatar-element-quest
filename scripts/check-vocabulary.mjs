import assert from 'node:assert/strict';
import fs from 'node:fs';
import ts from 'typescript';
const transpile=file=>ts.transpileModule(fs.readFileSync(file,'utf8'),{compilerOptions:{target:ts.ScriptTarget.ES2022,module:ts.ModuleKind.ES2022}}).outputText;
const url=source=>'data:text/javascript;base64,'+Buffer.from(source).toString('base64');
const content=url(transpile('data/content.ts'));
const {vocabularyPacks}=await import(url(transpile('data/vocabulary.ts').replace("'./content'",JSON.stringify(content))));
for(const packs of Object.values(vocabularyPacks))for(const pack of packs){
 assert(pack.cards.length>=4&&pack.cards.length<=8);
 assert.equal(new Set(pack.cards.map(c=>c.word)).size,pack.cards.length);
 for(const card of pack.cards)assert(fs.existsSync('public/assets/'+card.asset),card.asset);
}
const {words,characters}=await import(content);
assert.notEqual(words.find(c=>c.word==='water').asset,words.find(c=>c.word==='village').asset);
const {heroProfiles}=await import(url(transpile('data/hero-profiles.ts')));
for(const hero of characters){assert.equal(heroProfiles[hero.id].lines.length,3);assert(heroProfiles[hero.id].question);assert.notDeepEqual(heroProfiles[hero.id].lines,hero.simple)}
console.log('PASS: manageable word packs, distinct water/village art, all assets and seven differentiated hero profiles.');

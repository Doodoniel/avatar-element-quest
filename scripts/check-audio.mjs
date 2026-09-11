import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import vm from 'node:vm';
import ts from 'typescript';

const source=ts.transpileModule(readFileSync('components/game/useGameAudio.ts','utf8'),{compilerOptions:{module:ts.ModuleKind.CommonJS,target:ts.ScriptTarget.ES2020}}).outputText;
function setup({muted=false,paused=false}={}){
 const effects=[],listeners=new Map(),contexts=[];
 const param=()=>({value:0,setValueAtTime(){},exponentialRampToValueAtTime(){},linearRampToValueAtTime(){},cancelScheduledValues(){},setTargetAtTime(){}});
 class Context{
  state='running';currentTime=1;sampleRate=1000;destination={};started=0;
  constructor(){contexts.push(this)}
  createGain(){return {gain:param(),connect(){},disconnect(){}}}
  createOscillator(){return {frequency:param(),connect(){},disconnect(){},start:()=>this.started++,stop(){}}}
  createBiquadFilter(){return {frequency:param(),Q:{value:0},connect(){},disconnect(){}}}
  createBuffer(_channels,size){return {getChannelData:()=>new Float32Array(size)}}
  createBufferSource(){return {connect(){},disconnect(){},start:()=>this.started++}}
  resume(){this.state='running';return Promise.resolve()}
  suspend(){this.state='suspended';return Promise.resolve()}
  close(){this.state='closed';return Promise.resolve()}
 }
 const events={addEventListener:(k,f)=>listeners.set(k,f),removeEventListener:k=>listeners.delete(k)};
 const window={...events,speechSynthesis:{speaking:false}},document={...events,hidden:false};
 const exports={};
 vm.runInNewContext(source,{exports,require:()=>({useCallback:f=>f,useRef:current=>({current}),useState:value=>[value,()=>{}],useEffect:f=>effects.push(f)}),window,document,localStorage:{getItem:()=>muted?'off':null,setItem(){}},AudioContext:Context,setInterval,clearInterval});
 const audio=exports.useGameAudio(paused,false),cleanup=effects.map(f=>f());
 return {audio,contexts,window,document,listeners,dispose:()=>cleanup.forEach(f=>f?.())};
}
const t=setup();t.audio.play('jump');assert.equal(t.contexts.length,0,'Do not create audio before a gesture');
t.listeners.get('pointerdown')();const ctx=t.contexts[0];
for(const sound of ['jump','land','water','ice','collect','bump','success','wind']){const before=ctx.started;t.audio.play(sound);assert(ctx.started>before,sound+' produces sound');ctx.currentTime+=2}
const before=ctx.started;t.window.speechSynthesis.speaking=true;t.audio.play('jump');assert.equal(ctx.started,before,'Speech takes priority');t.window.speechSynthesis.speaking=false;
t.audio.toggle();t.audio.play('water');assert.equal(ctx.started,before,'Mute stops new effects immediately');
t.dispose();assert.equal(ctx.state,'closed');assert.equal(t.listeners.size,0);
const muted=setup({muted:true});muted.listeners.get('pointerdown')();assert.equal(muted.contexts.length,0,'Saved mute is respected');muted.dispose();
const paused=setup({paused:true});paused.listeners.get('pointerdown')();paused.audio.play('jump');assert.equal(paused.contexts[0].started,0,'No effects while paused');paused.dispose();
console.log('PASS: eight effects, gesture unlock, saved mute, speech priority, pause and cleanup.');

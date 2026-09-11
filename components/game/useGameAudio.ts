'use client';
import {useCallback,useEffect,useRef,useState} from 'react';

export type GameSound='jump'|'land'|'water'|'ice'|'collect'|'bump'|'success'|'wind';
// Local synthesis: no downloads, audio services, or automatic speech.
export function useGameAudio(paused:boolean,flying:boolean){
 const [enabled,setEnabled]=useState(true);
 const context=useRef<AudioContext|null>(null), master=useRef<GainNode|null>(null);
 const allowed=useRef(true),blocked=useRef(paused),last=useRef<Record<string,number>>({});
 blocked.current=paused;
 const play=useCallback((kind:GameSound)=>{
  const ctx=context.current,out=master.current;
  if(!allowed.current||blocked.current||document.hidden||!ctx||ctx.state!=='running'||!out)return;
  if(window.speechSynthesis?.speaking)return;
  const now=ctx.currentTime;
  if(now-(last.current[kind]??-10)<.09)return;
  last.current[kind]=now;
  function tone(freq:number,end:number,delay:number,duration:number,volume=.13){
   const o=ctx!.createOscillator(),g=ctx!.createGain(),t=now+delay;
   o.type='sine';o.frequency.setValueAtTime(freq,t);o.frequency.exponentialRampToValueAtTime(end,t+duration);
   g.gain.setValueAtTime(.0001,t);g.gain.exponentialRampToValueAtTime(volume,t+.015);g.gain.exponentialRampToValueAtTime(.0001,t+duration);
   o.connect(g);g.connect(out!);o.start(t);o.stop(t+duration+.02);o.onended=()=>{o.disconnect();g.disconnect()};
  }
  function noise(duration:number,frequency:number,volume:number){
   const buffer=ctx!.createBuffer(1,Math.ceil(ctx!.sampleRate*duration),ctx!.sampleRate),data=buffer.getChannelData(0);
   for(let i=0;i<data.length;i++)data[i]=Math.random()*2-1;
   const s=ctx!.createBufferSource(),filter=ctx!.createBiquadFilter(),g=ctx!.createGain();s.buffer=buffer;
   filter.type='bandpass';filter.frequency.setValueAtTime(frequency,now);filter.frequency.exponentialRampToValueAtTime(frequency*.45,now+duration);filter.Q.value=.65;
   g.gain.setValueAtTime(.0001,now);g.gain.linearRampToValueAtTime(volume,now+duration*.2);g.gain.exponentialRampToValueAtTime(.0001,now+duration);
   s.connect(filter);filter.connect(g);g.connect(out!);s.start();s.onended=()=>{s.disconnect();filter.disconnect();g.disconnect()};
  }
  if(kind==='jump'){tone(230,640,0,.22,.15);noise(.18,1500,.12)}
  if(kind==='land'){noise(.16,800,.27);tone(160,75,0,.14,.14)}
  if(kind==='water'){noise(1.25,1600,.24);[0,.14,.33,.55,.8].forEach((d,i)=>tone(380+i*90,650+i*65,d,.13,.07))}
  if(kind==='ice'){noise(.22,3200,.2);tone(1500,1050,0,.3,.07)}
  if(kind==='collect'){tone(660,660,0,.16);tone(880,880,.12,.23)}
  if(kind==='bump'){noise(.22,350,.22);tone(120,65,0,.19,.1)}
  if(kind==='success')[523,659,784,1046].forEach((f,i)=>tone(f,f,i*.12,.32,.12));
  if(kind==='wind')noise(1.4,600,.085);
 },[]);
 useEffect(()=>{
  try{allowed.current=localStorage.getItem('avatar-effects')!=='off';setEnabled(allowed.current)}catch{}
  function unlock(){
   if(!allowed.current)return;
   try{
    if(!context.current){const ctx=new AudioContext();context.current=ctx;const gain=ctx.createGain();gain.gain.value=.4;gain.connect(ctx.destination);master.current=gain}
    if(context.current.state==='suspended')void context.current.resume().catch(()=>{});
   }catch{}
  }
  function visibility(){if(document.hidden)void context.current?.suspend().catch(()=>{});else unlock()}
  window.addEventListener('pointerdown',unlock,true);window.addEventListener('keydown',unlock,true);document.addEventListener('visibilitychange',visibility);
  return()=>{window.removeEventListener('pointerdown',unlock,true);window.removeEventListener('keydown',unlock,true);document.removeEventListener('visibilitychange',visibility);void context.current?.close().catch(()=>{});context.current=null;master.current=null};
 },[]);
 useEffect(()=>{
  const ctx=context.current,g=master.current;if(ctx&&g){g.gain.cancelScheduledValues(ctx.currentTime);g.gain.setTargetAtTime(enabled&&!paused ? .4 : 0,ctx.currentTime,.025)}
 },[enabled,paused]);
 useEffect(()=>{if(!enabled||paused||!flying)return;play('wind');const id=setInterval(()=>play('wind'),2300);return()=>clearInterval(id)},[enabled,paused,flying,play]);
 function toggle(){const next=!enabled;allowed.current=next;setEnabled(next);try{localStorage.setItem('avatar-effects',next?'on':'off')}catch{};if(next){try{if(!context.current){context.current=new AudioContext();master.current=context.current.createGain();master.current.gain.value=.4;master.current.connect(context.current.destination)}void context.current.resume().catch(()=>{})}catch{}}}
 return {enabled,toggle,play};
}

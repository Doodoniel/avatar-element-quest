'use client';
import {useEffect,useRef} from 'react';
import {appaPoseFrames,appaBobFrames,appaCycle} from './appa-animation';
export default function AppaSprite({paused=false,tilt=0,alt='Appa flying'}:{paused?:boolean;tilt?:number;alt?:string}){
 const body=useRef<HTMLSpanElement>(null),animations=useRef<Animation[]>([]),isPaused=useRef(paused);
 isPaused.current=paused;
 useEffect(()=>{
  const element=body.current;if(!element)return;
  let disposed=false;
  const images=Array.from(element.querySelectorAll('img'));
  // Keep decoded poses mounted instead of switching image sources every frame.
  Promise.all(images.map(image=>image.decode().catch(()=>{}))).then(()=>{
   if(disposed)return;
   const loops=[element.animate(appaBobFrames,appaCycle),...images.map((image,i)=>image.animate(appaPoseFrames(i),appaCycle))];
   animations.current=loops;
   for(const loop of loops){loop.currentTime=0;if(isPaused.current)loop.pause()}
  });
  return()=>{disposed=true;animations.current.forEach(loop=>loop.cancel());animations.current=[]};
 },[]);
 useEffect(()=>{for(const loop of animations.current)if(paused)loop.pause();else loop.play()},[paused]);
 return <span role="img" aria-label={alt} style={{display:'block',position:'relative',width:'100%',height:'100%',pointerEvents:'none',transform:`rotate(${Math.max(-12,Math.min(12,tilt))}deg)`}}>
  <span ref={body} style={{display:'block',position:'absolute',inset:0,transformOrigin:'55% 48%'}}>
   {[0,1,2,3].map(i=><img key={i} src={'/assets/rescue/appa-'+i+'.png'} alt="" draggable={false} style={{position:'absolute',inset:0,width:'100%',height:'100%',objectFit:'contain',opacity:i===0?1:0}}/>)}
  </span>
 </span>;
}

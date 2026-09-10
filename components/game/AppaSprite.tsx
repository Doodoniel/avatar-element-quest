'use client';
import {useEffect} from 'react';
const poses=[0,1,2,2,1,3];
export default function AppaSprite({time,tilt=0,alt='Appa flying'}:{time:number;tilt?:number;alt?:string}){
 useEffect(()=>{for(let i=0;i<4;i++){const image=new Image();image.src='/assets/rescue/appa-'+i+'.png'}},[]);
 return <img src={'/assets/rescue/appa-'+poses[Math.floor(time*6)%poses.length]+'.png'} alt={alt} draggable={false} style={{animation:'none',width:'100%',height:'100%',objectFit:'contain',transform:`translateY(${Math.sin(time*Math.PI*2)*7}px) rotate(${Math.max(-12,Math.min(12,tilt))+Math.sin(time*Math.PI*2)*2}deg)`,transformOrigin:'55% 48%',pointerEvents:'none'}}/>;
}

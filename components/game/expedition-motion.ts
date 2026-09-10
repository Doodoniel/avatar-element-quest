export type Jump={from:number;to:number;elapsed:number};
export type WaterCast={elapsed:number;x:number;y:number;kind:string|null;id:number};
export const JUMP_SECONDS=.88;
export const CAST_SECONDS=1.65;
export function jumpPose(pos:number,jump:Jump|null,reduced=false){
 const t=jump?Math.min(1,jump.elapsed/(reduced?.16:JUMP_SECONDS)):0;
 const travel=Math.max(0,Math.min(1,(t-.18)/.62));
 const ease=travel*travel*(3-2*travel),from=jump?.from??pos,to=jump?.to??pos;
 const x=((from%8+.5)+(to%8-from%8)*ease)*12.5;
 const y=((Math.floor(from/8)+.7)+(Math.floor(to/8)-Math.floor(from/8))*ease)*25;
 return {x,y:y-(reduced?0:Math.sin(travel*Math.PI)*17),frame:jump?Math.min(7,Math.floor(t*8)):0,facing:to%8<from%8?-1:1,air:Math.sin(travel*Math.PI)};
}
export function driftItems(time:number,round:number,easy:boolean,cargo:readonly string[]){return Array.from({length:7},(_,i)=>({id:i,x:34+((time*(easy?8:12)+i*9)%58),y:49+Math.sin(time*.7+i*2)*4,kind:cargo[(i+round)%cargo.length]}))}
export function castPose(cast:WaterCast){
 const t=Math.min(1,cast.elapsed/CAST_SECONDS),transfer=Math.max(0,Math.min(1,(t-.35)/.45));
 const x=cast.x+(15-cast.x)*transfer;
 const sourceY=cast.y+7+(73-cast.y-7)*transfer;
 const frame=Math.min(7,Math.floor(t*8));
 const crest=[.18,.43,.70,.92,.92,.92,.76,.32][frame];
 return {x,sourceY,itemY:sourceY-crest*26,frame,opacity:t>.9?(1-t)*10:1};
}

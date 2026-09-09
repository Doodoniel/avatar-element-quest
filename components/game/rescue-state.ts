export type RescuePhase='intro'|'meet'|'water'|'lift'|'board'|'fly'|'deliver'|'complete';
export type Point={x:number;y:number};
export const flightWords=[{text:'He',x:29,y:32},{text:'can',x:52,y:54},{text:'fly.',x:75,y:27}] as const;
export const homePoint={x:88,y:48};
export const startPoint={x:12,y:54};
export function moveTowards(from:Point,to:Point,distance:number):Point{const dx=to.x-from.x,dy=to.y-from.y,len=Math.hypot(dx,dy);if(len<=distance)return {...to};return {x:from.x+dx/len*distance,y:from.y+dy/len*distance}}
export function clampPoint(p:Point):Point{return {x:Math.max(8,Math.min(90,p.x)),y:Math.max(20,Math.min(66,p.y))}}
export function touches(a:Point,b:Point){return Math.hypot(a.x-b.x,a.y-b.y)<7}
export type RescueState={phase:RescuePhase;found:boolean;waterChosen:boolean;words:number;position:Point;target:Point|null;hint:string};
export const initialRescue:RescueState={phase:'intro',found:false,waterChosen:false,words:0,position:startPoint,target:null,hint:''};
export type RescueAction={type:'start'}|{type:'find'}|{type:'greet'}|{type:'element';element:string}|{type:'bend'}|{type:'lifted'}|{type:'board'}|{type:'target';point:Point}|{type:'tick';seconds:number}|{type:'deliver'}|{type:'restart'};
export function rescueReducer(s:RescueState,a:RescueAction):RescueState{
 switch(a.type){
 case 'restart':return {...initialRescue,position:{...startPoint}};
 case 'start':return s.phase==='intro'?{...s,phase:'meet'}:s;
 case 'find':return s.phase==='meet'?{...s,found:true}:s;
 case 'greet':return s.phase==='meet'&&s.found?{...s,phase:'water'}:s;
 case 'element':return s.phase==='water'?{...s,waterChosen:a.element==='water',hint:a.element==='water'?'Water! Katara is ready.':'Katara needs water. Try the blue drop.'}:s;
 case 'bend':return s.phase==='water'&&s.waterChosen?{...s,phase:'lift',hint:''}:s;
 case 'lifted':return s.phase==='lift'?{...s,phase:'board'}:s;
 case 'board':return s.phase==='board'?{...s,phase:'fly',hint:'',position:{...startPoint},target:null}:s;
 case 'target':return s.phase==='fly'?{...s,target:clampPoint(a.point),hint:''}:s;
 case 'tick':{
  if(s.phase!=='fly'||!s.target)return s;
  const position=moveTowards(s.position,s.target,Math.min(Math.max(a.seconds,0),.08)*23);
  let words=s.words;let hint=s.hint;
  if(words<flightWords.length&&touches(position,flightWords[words])){words++;hint=words===3?'He can fly! Take the supplies home.':`You found “${flightWords[words-1].text}”. Find “${flightWords[words].text}” next.`}
  if(words===3&&touches(position,homePoint))return {...s,position,words,phase:'deliver',target:null,hint:''};
  return {...s,position,words,hint,target:touches(position,s.target)&&Math.hypot(position.x-s.target.x,position.y-s.target.y)<.3?null:s.target};
 }
 case 'deliver':return s.phase==='deliver'?{...s,phase:'complete'}:s;
 default:return s;
 }
}

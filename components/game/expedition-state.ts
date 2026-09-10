export const cargo = ['fish','scarf','blanket','boots','book'] as const;
export const missions = [
 {name:'The ice crossing',subtitle:'Plan a path. Bring the supplies back.',verb:'Find',phrase:'Go left. Go right. Go up. Go down.'},
 {name:'Catch the current',subtitle:'Aim the water. Rescue the right supplies.',verb:'Catch',phrase:'Katara can bend water. Catch it!'},
 {name:'Ride the northern wind',subtitle:'Fly through the pass. Watch the clouds.',verb:'Collect',phrase:'Appa can fly. Go up! Go down!'},
 {name:'A village needs you',subtitle:'Listen to your neighbours. Deliver with care.',verb:'Deliver',phrase:'Here you are! You have got a blanket.'},
] as const;
export function targetFor(round:number){return cargo[(round*2+Math.floor(round/3))%cargo.length]}
export function rolesFor(round:number,pupils:number){return [0,1,2].map(i=>(round*3+i)%pupils+1)}
export const gridPaths = [
 [24,25,17,9,10,11,19,27,28,29,21,13,14,15,23,31],
 [24,16,8,9,10,18,26,27,28,20,12,4,5,6,14,22,30,31],
 [24,25,26,18,10,2,3,4,12,20,28,29,21,13,14,15,23,31],
];
export function adjacent(a:number,b:number){return Math.abs(a%8-b%8)+Math.abs(Math.floor(a/8)-Math.floor(b/8))===1}
export function canMove(a:number,b:number,path:number[],bridge:boolean){return adjacent(a,b)&&path.includes(b)&&(bridge||b!==path[path.length-2])}
export function flightObjects(round:number){return Array.from({length:24},(_,i)=>({id:i,x:100+i*34,y:18+((i*31+round*17)%60),kind:i%3===0?'cloud':cargo[(i+round)%5]}))}

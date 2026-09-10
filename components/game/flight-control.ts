export type FlightPoint={x:number;y:number};
export const flightBounds={left:9,right:91,top:18,bottom:84};
export function flightTarget(x:number,y:number):FlightPoint{return {x:Math.max(flightBounds.left,Math.min(flightBounds.right,x)),y:Math.max(flightBounds.top,Math.min(flightBounds.bottom,y))}}
export function advanceFlight(from:FlightPoint,to:FlightPoint,dt:number){
 const target=flightTarget(to.x,to.y),dx=target.x-from.x,dy=target.y-from.y,distance=Math.hypot(dx,dy),step=Math.min(distance,Math.max(0,Math.min(dt,.05))*65);
 return distance?{x:from.x+dx/distance*step,y:from.y+dy/distance*step}:{...from};
}

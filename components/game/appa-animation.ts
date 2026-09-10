const poses=[0,1,2,2,1,3,0];
export const appaCycle:KeyframeAnimationOptions={duration:1200,iterations:Infinity};
export function appaPoseFrames(pose:number):Keyframe[]{return poses.map((frame,i)=>({opacity:frame===pose?1:0,offset:i/6,easing:'steps(1, end)'}))}
export const appaBobFrames:Keyframe[]=[
 {transform:'translateY(0px) rotate(0deg)',offset:0,easing:'ease-in-out'},
 {transform:'translateY(-8px) rotate(-2deg)',offset:.25,easing:'ease-in-out'},
 {transform:'translateY(0px) rotate(0deg)',offset:.5,easing:'ease-in-out'},
 {transform:'translateY(8px) rotate(2deg)',offset:.75,easing:'ease-in-out'},
 {transform:'translateY(0px) rotate(0deg)',offset:1},
];

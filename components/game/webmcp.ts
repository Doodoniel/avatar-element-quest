type Context={registerTool:(tool:unknown,options:{signal:AbortSignal})=>void|Promise<void>};
export function registerGameTools(change:(level:'explorer'|'challenger')=>void){
 const context=(document as Document&{modelContext?:Context}).modelContext;if(!context?.registerTool)return;
 const lifecycle=new AbortController();
 const tool={name:'set_learning_level',description:'Change the English learning level shown in the current activity. Each quiz level keeps its own local progress.',inputSchema:{type:'object',properties:{level:{type:'string',enum:['explorer','challenger']}},required:['level'],additionalProperties:false},annotations:{readOnlyHint:false,untrustedContentHint:false},async execute(input:unknown){if(!input||typeof input!=='object'||!('level' in input)||!['explorer','challenger'].includes(String(input.level)))throw new Error('Choose explorer or challenger.');const level=(input as {level:'explorer'|'challenger'}).level;change(level);await new Promise<void>(resolve=>requestAnimationFrame(()=>resolve()));return {level}}};
 try{Promise.resolve(context.registerTool(tool,{signal:lifecycle.signal})).catch(()=>{})}catch{}
 return ()=>lifecycle.abort();
}

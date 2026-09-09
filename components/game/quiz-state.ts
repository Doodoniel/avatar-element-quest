import {quizzes,type Level} from '@/data/content';
export type QuizState={answered:Record<string,{choice:number;team:number}>;scores:[number,number];turn:number};
export function freshQuiz():QuizState{return {answered:{},scores:[0,0],turn:0}}
export function awardAnswer(state:QuizState,level:Level,id:string,choice:number):QuizState{
 const index=quizzes[level].findIndex(q=>q.id===id);const question=quizzes[level][index];if(!question||!Number.isInteger(choice)||choice<0||choice>=question.options.length||state.answered[id])return state;
 const scores:[number,number]=[...state.scores];if(choice===question.answer)scores[state.turn]+=((index%3)+1)*100;
 return {answered:{...state.answered,[id]:{choice,team:state.turn}},scores,turn:state.turn===0?1:0};
}
export function restoreQuiz(raw:string|null,level:Level):QuizState{try{const value=JSON.parse(raw||'null');if(!value||typeof value.answered!=='object'||Array.isArray(value.answered))return freshQuiz();let state=freshQuiz();for(const [id,a] of Object.entries(value.answered)){if(!a||typeof a!=='object'||!('choice' in a)||typeof a.choice!=='number')return freshQuiz();state=awardAnswer(state,level,id,a.choice)}return state}catch{return freshQuiz()}}

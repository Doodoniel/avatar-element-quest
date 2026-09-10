'use client';
import {useState} from 'react';
import type {Level} from '@/data/content';
import {Speak} from './shared';
const tasks={
 explorer:[
  {image:'katara',title:'Meet Katara',prompt:'Tell your partner her name.',support:'Her name is…',model:'Her name is Katara.'},
  {image:'appa',title:'What can he do?',prompt:'Ask your partner about Appa.',support:'Can he…? Yes, he can.',model:'Can he fly? Yes, he can.'},
  {image:'aang',title:'Spot a detail',prompt:'Say one thing Aang has got.',support:'He has got…',model:'He has got a blue arrow.'},
  {image:'zuko',title:'Where is he from?',prompt:'Ask and answer with a partner.',support:'Where is he from? He is from…',model:'He is from the Fire Nation.'},
  {image:'sokka',title:'Can he bend water?',prompt:'Answer. Then ask about Katara.',support:'No, he cannot. Can she…?',model:'No, he cannot. Katara can bend water.'},
  {image:'water',title:'Choose your hero',prompt:'Name your favourite hero. Say one thing they can do.',support:'I like… He / She can…',model:'I like Katara. She can bend water.'},
 ],
 challenger:[
  {image:'aang',title:'Three clues',prompt:'Choose a hero secretly. Give three clues. Your partner guesses.',support:'This person has got… comes from… can…',model:'This person has got a blue arrow. He is from the Air Nomads. He can bend air.'},
  {image:'water',title:'Tell the story',prompt:'Retell three events from the episode. Your partner adds a detail.',support:'First… Then… Finally…',model:'First, Katara and Sokka go fishing. Then, they find Aang. Later, Katara and Aang explore the old ship.'},
  {image:'sokka',title:'Same or different?',prompt:'Compare Katara and Sokka. Give one similarity and one difference.',support:'They both… Katara can…, but Sokka…',model:'They both live in the Southern Water Tribe. Katara can bend water, but Sokka cannot.'},
  {image:'aang',title:'Fix the message',prompt:'“Aang already knows about the war.” Correct this and explain.',support:'That is not right. He… We know this because…',model:'Aang does not know about the war. Katara tells him about it in the old ship.'},
  {image:'iroh',title:'Choose a teammate',prompt:'Who would you choose to help you? Give a reason. Ask your partner.',support:'I would choose… because… What about you?',model:'I would choose Iroh because he is an experienced teacher.'},
  {image:'katara',title:'Help a friend',prompt:'One person needs supplies. The other asks a question and offers help. Swap roles.',support:'I need… Which…? Can you bring…? Here you are.',model:'I am cold. Can you bring me a blanket? A red blanket? Yes, please. Here you are.'},
 ]
};
export default function TalkQuest({level}:{level:Level}){
 const [round,setRound]=useState(0),[help,setHelp]=useState(level==='explorer'),[model,setModel]=useState(false);const task=tasks[level][round];
 return <section className="talk-quest panel"><img src={'/assets/'+task.image+'.png'} alt="Story picture"/><div><small>{round+1} / {tasks[level].length}</small><h2>{task.title}</h2><p>{task.prompt}</p>{help&&<p className="talk-support">{task.support}</p>}{model&&<p className="talk-model">One possible answer: {task.model}</p>}<div className="button-row"><Speak text={task.prompt}/><button className="soft-button" onClick={()=>setHelp(!help)}>{help?'Hide help':'Sentence help'}</button><button className="soft-button" onClick={()=>setModel(!model)}>{model?'Hide example':'Show example'}</button></div><button className="gold-button" onClick={()=>{setRound((round+1)%tasks[level].length);setModel(false)}}>Swap roles · Next →</button></div></section>;
}

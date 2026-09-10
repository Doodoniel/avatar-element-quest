'use client';
import {useState} from 'react';
import {characters,type Level} from '@/data/content';
import {Speak} from './shared';
const homes=['Air Nomads','Southern Water Tribe','Fire Nation','Earth Kingdom'];
const heroIds=['katara','aang','zuko','sokka','iroh','gran-gran'];
export default function WorldPractice({level}:{level:Level}){
 const [round,setRound]=useState(0),[choice,setChoice]=useState(''),[reveal,setReveal]=useState(false);
 const hero=characters.find(c=>c.id===heroIds[round])!,correct=choice===hero.nation;
 const options=level==='explorer'?homes.filter(h=>h===hero.nation||h===homes[(homes.indexOf(hero.nation)+1)%homes.length]):homes;
 return <div className="world-practice home-game"><img className="home-hero" src={'/assets/'+hero.id+'.png'} alt={hero.name}/><div className="home-question"><small>{round+1} / {heroIds.length}</small><h2>Where is {hero.name} from?</h2><Speak text={'Where is '+hero.name+' from?'}/><div className="answer-options">{options.map(home=><button key={home} disabled={correct} onClick={()=>setChoice(home)}>{home}</button>)}</div>
 <div className="home-feedback" role="status">{choice&&!correct?'Look at the map and try again.':correct?hero.say:''}</div>
 {correct&&<><p className="spoken-task">{level==='explorer'?'Ask your partner: “Where is he / she from?”':'Tell your partner one more fact about this character.'}</p><button className="text-button" onClick={()=>setReveal(!reveal)}>{reveal?'Hide model':'Sentence help'}</button>{reveal&&<p>{hero.simple[2]}</p>}<button className="gold-button" onClick={()=>{setRound((round+1)%heroIds.length);setChoice('');setReveal(false)}}>{round===heroIds.length-1?'Play again':'Next character'} →</button></>}
 </div></div>;
}

'use client';
import {useState} from 'react';
import type {Level} from '@/data/content';
import {vocabularyPacks} from '@/data/vocabulary';
import {Speak} from './shared';
export default function Words({level}:{level:Level}){
 const [pack,setPack]=useState(0),[index,setIndex]=useState(0),[flipped,setFlipped]=useState(false),[mode,setMode]=useState('learn'),[feedback,setFeedback]=useState('');
 const packs=vocabularyPacks[level],list=packs[pack].cards,w=list[index];
 const options=[w,...list.filter(card=>card.word!==w.word).slice(index%Math.max(1,list.length-3)).concat(list).filter(card=>card.word!==w.word).filter((card,i,all)=>all.findIndex(x=>x.word===card.word)===i).slice(0,level==='explorer'?1:2)].sort((a,b)=>a.word.localeCompare(b.word));
 function clear(){setFlipped(false);setFeedback('')}
 return <><div className="vocabulary-toolbar"><div className="view-switch" aria-label="Word packs">{packs.map((p,i)=><button key={p.id} aria-pressed={pack===i} onClick={()=>{setPack(i);setIndex(0);clear()}}>{p.name}</button>)}</div><div className="view-switch" aria-label="Word activity">{['learn','match','use'].map(v=><button key={v} aria-pressed={mode===v} onClick={()=>{setMode(v);clear()}}>{v==='use'?'Use it':v==='learn'?'Learn':'Match'}</button>)}</div></div>
 <div className="vocab-layout"><div className="vocab-card"><img src={'/assets/'+w.asset} alt={mode==='learn'&&!flipped?'Picture clue':w.word}/>{mode==='learn'?<button className="vocab-flip" onClick={()=>setFlipped(!flipped)} aria-label={flipped?'Turn card back':'Reveal word'}><small>{index+1} / {list.length}</small><h2>{flipped?w.word:'What is it?'}</h2><p>{flipped?w.meaning:'Click to reveal'}</p></button>:<div className="vocab-flip"><small>{index+1} / {list.length}</small><h2>{mode==='match'?w.meaning:w.word}</h2></div>}</div>
 <div className="vocab-practice">{mode==='learn'?<><p className="large-sentence">{flipped?w.example:'Look. Guess. Reveal.'}</p>{flipped&&<Speak text={w.word+'. '+w.example}/>}</>:mode==='match'?<><Speak text={level==='explorer'?w.word:w.meaning}/><div className="answer-options">{options.map(o=><button key={o.word} onClick={()=>setFeedback(o.word===w.word?'Yes! '+w.example:'Try again. Listen and look at the picture.')}>{o.word}</button>)}</div><p role="status" className="vocab-result">{feedback}</p></>:<div className="vocab-use"><p>{level==='challenger'?(w.task||'Use “'+w.word+'” to tell your partner something about the episode.'):'Say a sentence with “'+w.word+'”.'}</p><button className="soft-button" onClick={()=>setFlipped(!flipped)}>{flipped?'Hide example':'Show an example'}</button>{flipped&&<><p>{w.example}</p><Speak text={w.example}/></>}</div>}<button className="gold-button" onClick={()=>{setIndex((index+1)%list.length);clear()}}>Next word →</button></div></div>
 <div className="word-dots">{list.map((card,i)=><button key={card.word} className={i===index?'selected':''} aria-label={'Go to card '+(i+1)} onClick={()=>{setIndex(i);clear()}}>{i+1}</button>)}</div></>;
}

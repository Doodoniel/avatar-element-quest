'use client';
import {useState} from 'react';
import {characters,type Level} from '@/data/content';
import {heroProfiles} from '@/data/hero-profiles';
import {Speak} from './shared';
export default function Heroes({level}:{level:Level}){
 const [selected,setSelected]=useState('aang'),[hide,setHide]=useState(false),[think,setThink]=useState(false),[help,setHelp]=useState(false);
 const c=characters.find(hero=>hero.id===selected)!,profile=heroProfiles[c.id],advanced=level==='challenger';
 const prompt=advanced?profile.question:'What can '+c.name+' do?';
 return <><div className={'hero-workbench '+(advanced?'advanced-hero':'')}>
  <div className={'portrait-panel '+c.element}><img className="location-backdrop" src={'/assets/'+c.element+'.png'} alt=""/><img className="portrait" src={'/assets/'+c.id+'.png'} alt={c.name}/><span className="portrait-label">{c.name}</span></div>
  <div className="hero-details"><p className="eyebrow">{c.nation}</p><h2>{think?'Think & talk':c.name}</h2>
   {think?<div className="hero-discuss"><p>{prompt}</p>{help&&<p className="talk-support">{advanced?profile.hint:'He / She can…'}</p>}<button className="soft-button" onClick={()=>setHelp(!help)}>{help?'Hide help':'Sentence help'}</button></div>:
    hide?<div className="speech-lines"><p>{advanced?'Describe this character in your own words.':'His / Her name is…'}</p><p>{advanced?'Include a skill, a personality trait and a reason.':'He / She has got…'}</p>{!advanced&&<p>He / She can…</p>}</div>:
    <><div className="speech-lines">{(advanced?profile.lines:c.simple).map(line=><p key={line}>{line}</p>)}</div>{advanced?<p className="hero-keywords">{profile.words}</p>:<div className="origin"><span>Where is {['katara','gran-gran'].includes(c.id)?'she':'he'} from?</span><p>{c.id==='appa'?'Appa is a flying bison from the world of the Air Nomads.':c.say}</p></div>}</>}
   <div className="button-row"><Speak text={think?prompt:hide?'Describe '+c.name+'.':(advanced?profile.lines:c.simple).join(' ')}/><button className="soft-button" onClick={()=>{setThink(false);setHide(!hide)}}>{hide?'Show description':'Hide & remember'}</button><button className="soft-button" onClick={()=>{setThink(!think);setHelp(false)}}>{think?'Read description':'Think & talk'}</button></div>
  </div>
 </div><div className="character-strip">{characters.map(hero=><button key={hero.id} className={selected===hero.id?'selected':''} aria-pressed={selected===hero.id} onClick={()=>{setSelected(hero.id);setHide(false);setThink(false);setHelp(false)}}><img src={'/assets/'+hero.id+'.png'} alt=""/><span>{hero.name}</span></button>)}</div></>;
}

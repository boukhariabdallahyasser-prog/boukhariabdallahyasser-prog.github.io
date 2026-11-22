import { useState,type CSSProperties } from 'react';
import { motion,AnimatePresence,useReducedMotion } from 'motion/react';
import {groups,type StackItem} from '../data/stack';
function Mark({item}:{item:StackItem}){
 if(item.mark==='react')return <svg viewBox="-12 -12 24 24" aria-hidden="true"><circle r="2" fill="currentColor"/>{[0,60,120].map(r=><ellipse key={r} rx="10" ry="4.1" transform={'rotate('+r+')'} fill="none" stroke="currentColor" strokeWidth="1.2"/>)}</svg>;
 if(item.mark==='figma')return <svg viewBox="0 0 24 24" aria-hidden="true"><path fill="#f24e1e" d="M8 2h4v7H8a3.5 3.5 0 0 1 0-7"/><path fill="#ff7262" d="M12 2h4a3.5 3.5 0 0 1 0 7h-4"/><path fill="#a259ff" d="M8 9h4v7H8a3.5 3.5 0 0 1 0-7"/><circle fill="#1abcfe" cx="15.5" cy="12.5" r="3.5"/><path fill="#0acf83" d="M8 16h4v3.5A3.5 3.5 0 1 1 8 16"/></svg>;
 if(item.mark==='node')return <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 2 21 7v10l-9 5-9-5V7Z" fill="none" stroke="currentColor" strokeWidth="1.6"/><path d="M9 8v7c0 2-2 2-3 1m10-7c-3-2-5 1-2 3s0 5-3 3" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/></svg>;
 if(item.mark==='vite'||item.mark==='supabase')return <svg viewBox="0 0 24 24" aria-hidden="true"><path d={item.mark==='vite'?'M2 5 12 22 22 5 12 8Z M14 2 8 13h5l-2 7 7-11h-5z':'M13 1 2 14h9v9L22 10h-9Z'} fill="currentColor"/></svg>;
 if(item.mark==='git')return <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 1 23 12 12 23 1 12Z" fill="currentColor"/><path d="M7 6l9 9M12 11v7" stroke="#141b24" strokeWidth="1.7"/><g fill="#141b24"><circle cx="8" cy="7" r="2"/><circle cx="16" cy="15" r="2"/><circle cx="12" cy="18" r="2"/></g></svg>;
 if(item.mark==='three')return <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M3 2 22 8 9 22Z M3 2 9 22 13 5 22 8 6 12 16 15Z" fill="none" stroke="currentColor" strokeWidth="1.2"/></svg>;
 if(item.mark==='cloud')return <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M6 18a4 4 0 0 1-1-8 7 7 0 0 1 13-1 5 5 0 0 1 0 9Z" fill="none" stroke="currentColor" strokeWidth="1.6"/></svg>;
 return <b className="tech-letters">{item.mark}</b>
}
export default function Stack(){
 const [tab,setTab]=useState(0);const reduce=useReducedMotion();const items=groups[tab].items;const [paused,setPaused]=useState(false);const showcase=groups.flatMap(g=>g.items).filter(i=>['React','JavaScript','TypeScript','Node.js','Vite','Figma','Three.js','GitHub','Supabase','Cloudflare','C++','Motion'].includes(i.name));
 return <section className="b-section b-stack-section" id="skills"><div className="b-shell">
 <div className="b-section-title"><span>03 / TECH STACK</span><h2>Tools of the <em>trade.</em></h2><p>Programming, design, infrastructure and the technology behind this experience.</p></div>
 <div className="tech-showcase"><div className="tech-showcase-toolbar"><span className="mono">TECHNOLOGY IN MOTION</span><button type="button" aria-pressed={paused} onClick={()=>setPaused(p=>!p)}>{paused?'Play':'Pause'} <span aria-hidden="true">{paused?'▶':'Ⅱ'}</span></button></div><div className={'tech-rail'+(paused||reduce?' paused':'')} tabIndex={0} aria-label="Featured technologies; scroll horizontally"><div className="tech-track">{[0,1].map(copy=><div className="tech-sequence" key={copy} aria-hidden={copy===1?true:undefined}>{showcase.map(item=><div className="tech-showcase-item" key={item.name} style={{'--tech-color':item.color} as CSSProperties}><span className="tech-showcase-icon"><Mark item={item}/></span><span>{item.name}</span></div>)}</div>)}</div></div></div>
 <div className="b-stack-tabs" role="group" aria-label="Technology categories">{groups.map((g,i)=><button key={g.name} type="button" aria-pressed={i===tab} onClick={()=>setTab(i)}>{g.name}</button>)}</div>
 <AnimatePresence mode="wait" initial={false}><motion.div key={groups[tab].name} className="b-stack-grid expanded-stack" initial={reduce?false:{opacity:0,y:12}} animate={{opacity:1,y:0}} exit={reduce?{opacity:1}:{opacity:0,y:-8}} transition={{duration:reduce?0:.23}}>
 {items.map((item,i)=><motion.div key={item.name} className="b-stack-item tech-tile" style={{'--tech-color':item.color} as CSSProperties} initial={reduce?false:{opacity:0,y:12}} animate={{opacity:1,y:0}} transition={{duration:reduce?0:.3,delay:reduce?0:i*.035}} whileHover={reduce?undefined:{y:-4}}><span className="tech-icon" aria-hidden="true"><Mark item={item}/></span><div><b>{item.name}</b><small>{item.note}</small></div><span className="tech-status" data-status={item.status}>{item.status}</span></motion.div>)}
 </motion.div></AnimatePresence>
 <p className="stack-legend">Core = listed skills or academic foundations · Exploring = current learning · Project = technology documented in Bac-pedia · Site = technology used on this portfolio.</p>
 </div></section>
}

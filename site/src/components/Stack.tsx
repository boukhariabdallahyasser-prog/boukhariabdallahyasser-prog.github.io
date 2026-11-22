import { useRef,useState,type CSSProperties } from 'react';
import { motion,useReducedMotion } from 'motion/react';
import { ChevronLeft,ChevronRight,Pause,Play } from 'lucide-react';
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
const all=groups.flatMap(g=>g.items);
const rows=[all.filter((_,i)=>i%2===0),all.filter((_,i)=>i%2!==0)];
function Rail({items,index,paused}:{items:StackItem[];index:number;paused:boolean}){
 const rail=useRef<HTMLDivElement>(null);
 function shift(direction:number){const el=rail.current;if(el)el.scrollBy({left:direction*Math.min(el.clientWidth*.75,440),behavior:matchMedia('(prefers-reduced-motion: reduce)').matches?'instant':'smooth'})}
 return <div className={'sliding-tech-row row-'+index}>
  {paused&&<button className="tech-arrow left" type="button" aria-label={'Scroll technology row '+(index+1)+' left'} onClick={()=>shift(-1)}><ChevronLeft size={19}/></button>}
  <div ref={rail} className={'tech-rail v11-rail'+(paused?' paused':'')} tabIndex={0} aria-label={'Technology slide row '+(index+1)}>
   <div className="tech-track v11-track">{[0,1].map(copy=><div className="tech-sequence" key={copy} aria-hidden={copy===1?true:undefined}>{items.map(item=><div className="sliding-tech-item" key={item.name} style={{'--tech-color':item.color} as CSSProperties} title={item.note+' · '+item.status}><span className="sliding-tech-mark"><Mark item={item}/></span><span>{item.name}</span></div>)}</div>)}</div>
  </div>
  {paused&&<button className="tech-arrow right" type="button" aria-label={'Scroll technology row '+(index+1)+' right'} onClick={()=>shift(1)}><ChevronRight size={19}/></button>}
 </div>
}
export default function Stack(){
 const reduce=useReducedMotion();const [paused,setPaused]=useState(false);const stopped=paused||!!reduce;
 return <section className="b-section b-stack-section sliding-stack-section" id="skills"><div className="b-shell">
 <motion.div className="b-section-title" initial={reduce?false:{opacity:0,y:18}} whileInView={{opacity:1,y:0}} viewport={{once:true,amount:.3}} transition={{duration:.5}}><span>03 / TECH STACK</span><h2>Powered by <em>technology.</em></h2><p>Languages, tools, frameworks and the technologies behind my projects.</p></motion.div>
 <div className="stack-slider-toolbar"><span className="mono">TECHNOLOGY / {all.length} TOOLS &amp; SKILLS</span>{!reduce&&<button className="stack-play" type="button" aria-pressed={paused} onClick={()=>setPaused(p=>!p)}>{paused?<Play size={14}/>:<Pause size={14}/>} {paused?'Play slides':'Pause slides'}</button>}</div>
 </div><div className="tech-slides">{rows.map((items,index)=><Rail key={index} items={items} index={index} paused={stopped}/>)}</div>
 <div className="b-shell"><p className="stack-subnote">A mix of academic foundations, current learning, project technologies and tools powering this portfolio.</p></div></section>
}

import {motion,useReducedMotion} from 'motion/react';
import type {PointerEvent} from 'react';
const items=[{number:'01',title:'Web development',body:'Responsive interfaces, interactive web applications and thoughtful frontend architecture.',icon:'code',label:'BUILD / INTERFACE'},{number:'02',title:'Product & UI design',body:'Making complex workflows understandable through intuitive interfaces and visual direction.',icon:'design',label:'DESIGN / EXPERIENCE'},{number:'03',title:'Systems thinking',body:'Exploring algorithms, software architecture and the infrastructure behind digital products.',icon:'system',label:'ENGINEER / STRUCTURE'}];
export default function Capabilities(){
 const reduced=useReducedMotion();
 function tilt(e:PointerEvent<HTMLElement>){if(reduced||e.pointerType!=='mouse')return;const t=e.currentTarget,b=t.getBoundingClientRect();const x=(e.clientX-b.left)/b.width,y=(e.clientY-b.top)/b.height;t.style.setProperty('--rx',((.5-y)*9)+'deg');t.style.setProperty('--ry',((x-.5)*11)+'deg');t.style.setProperty('--mx',x*100+'%');t.style.setProperty('--my',y*100+'%');}
 function reset(e:PointerEvent<HTMLElement>){e.currentTarget.style.setProperty('--rx','0deg');e.currentTarget.style.setProperty('--ry','0deg')}
 return <section id="capabilities" className="b-section capabilities-v9"><div className="b-shell"><div className="b-section-title"><span>01 / WHAT I EXPLORE</span><h2>Ideas, built<br/><em>into reality.</em></h2><p>Three disciplines. One curiosity for how digital experiences work.</p></div>
 <div className="b-capabilities">{items.map((i,index)=><motion.article key={i.number} initial={reduced?false:{opacity:0,y:24}} whileInView={{opacity:1,y:0}} viewport={{once:true,amount:.25}} transition={{duration:.6,delay:reduced?0:index*.1}} className="cap-v9-shell"><div className="cap-v9" onPointerMove={tilt} onPointerLeave={reset}>
 <div className="cap-v9-head"><span>{i.number} /</span><span>{i.label}</span></div>
 <div className={'cap-visual cap-'+i.icon} aria-hidden="true"><div className="cap-grid"/><div className="cap-figure">
 {i.icon==='code'?<div className="code-window"><div className="code-window-top"><i/><i/><i/></div><div className="code-glyph">&lt;/&gt;</div><div className="code-lines"><i/><i/><i/></div></div>:i.icon==='design'?<div className="design-figure"><div className="design-back"/><div className="design-front"><i/><i/><i/></div><div className="design-orb"/></div>:<div className="system-cube"><div/><div/><div/><div/><div/><div/></div>}
 </div><div className="cap-base"/></div><div className="cap-v9-copy"><h3>{i.title}</h3><p>{i.body}</p></div></div></motion.article>)}</div></div></section>
}

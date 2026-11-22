import { useEffect,useRef,useState } from 'react';
import { motion, useReducedMotion } from 'motion/react';
import { projects, type Project } from '../data/projects';
export default function SelectedWork(){
 const [selected,setSelected]=useState<Project|null>(null);const dialog=useRef<HTMLDialogElement>(null);const trigger=useRef<HTMLButtonElement|null>(null);
 const reduce=useReducedMotion();
 useEffect(()=>{const d=dialog.current;if(!d)return;if(selected&&!d.open){d.showModal();d.scrollTop=0}else if(!selected&&d.open)d.close()},[selected]);
 function close(){setSelected(null);requestAnimationFrame(()=>trigger.current?.focus())}
 return <section id="work" className="b-section work-section"><div className="b-shell">
 <motion.div className="b-section-title" initial={reduce?false:{opacity:0,y:22}} whileInView={{opacity:1,y:0}} viewport={{once:true,amount:.45}} transition={{duration:.55}}><span>03 / PROJECTS</span><h2>Selected <em>work.</em></h2><p>Explore a project to discover the story, design and technology behind it.</p></motion.div>
 <div className="project-gallery">{projects.map((project,i)=><motion.article key={project.id} initial={reduce?false:{opacity:0,y:35}} whileInView={{opacity:1,y:0}} viewport={{once:true,amount:.22}} transition={{duration:.6,delay:reduce?0:i*.12}} className="project-tile">
 <button className="project-cover-button" onClick={e=>{trigger.current=e.currentTarget;setSelected(project)}} aria-label={'Open '+project.name+' project details'} onPointerMove={e=>{if(reduce||e.pointerType!=='mouse')return;const el=e.currentTarget,r=el.getBoundingClientRect();el.style.setProperty('--px',((e.clientX-r.left)/r.width*100)+'%');el.style.setProperty('--py',((e.clientY-r.top)/r.height*100)+'%')}}>
 <img src={project.image} alt={project.alt} width="1200" height="750" loading="lazy"/><span className="project-card-gloss"/><span className="project-open-label"><span>View project</span><b aria-hidden="true">↗</b></span>
 </button><div className="project-card-caption"><div><h3>{project.name}</h3><p>{project.category}</p></div><button onClick={e=>{trigger.current=e.currentTarget;setSelected(project)}} className="project-caption-open" aria-label={'View '+project.name+' details'}>↗</button></div>
 </motion.article>)}</div>
 </div>
 <dialog className="project-dialog" ref={dialog} aria-labelledby="project-title" onCancel={e=>{e.preventDefault();close()}} onClick={e=>{if(e.target===dialog.current)close()}}>
 {selected&&<motion.article className="project-detail" initial={reduce?false:{opacity:0,y:20,scale:.98}} animate={{opacity:1,y:0,scale:1}} transition={{duration:reduce?0:.28}}>
 <div className="project-detail-top"><span className="mono">YZR / PROJECT DETAILS</span><button className="project-close" onClick={close} aria-label="Close project details" autoFocus>×</button></div>
 <img className="project-detail-image" src={selected.image} alt={selected.alt} width="1200" height="750"/><div className="project-detail-body"><span className="mono accent">{selected.category}</span><h2 id="project-title">{selected.name}</h2><p className="project-detail-summary">{selected.summary}</p>
 <div className="project-detail-sections">{selected.sections.map(s=><section key={s.title}><h3>{s.title}</h3><p>{s.body}</p></section>)}</div>
 {selected.stack.length>0&&<div className="project-detail-stack"><h3>Technology</h3><div>{selected.stack.map(t=><span key={t}>{t}</span>)}</div></div>}
 {selected.link&&<a className="b-primary" href={selected.link} target="_blank" rel="noreferrer">View GitHub repository <span>↗</span></a>}<p className="project-art-note">Cover image: original conceptual artwork.</p></div></motion.article>}
 </dialog></section>
}

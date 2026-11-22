import { useState } from 'react';
import { motion, useReducedMotion } from 'motion/react';
import { nodes, getNode, type NodeId } from '../data/network';
const relationships: Record<NodeId, readonly NodeId[]> = {
 engineering:['development','projects','learning'],development:['engineering','projects','design'],
 projects:['engineering','development','design'],design:['projects','development'],learning:['engineering','experience'],experience:['learning','projects']
};
const keywords:Record<NodeId,string>={engineering:'Architecture / algorithms / systems',development:'JavaScript / C++ / web',projects:'SHIFAA / Bac-pedia',design:'Figma / graphic / interface',learning:'React / cloud / system design',experience:'ENSIA / Huawei ICT'};
export default function Network(){
 const [selected,setSelected]=useState<NodeId>('projects');
 const [hover,setHover]=useState<NodeId|null>(null);
 const active=hover??selected;
 const n=getNode(active);
 const reduced=useReducedMotion();
 return <div className="graph atlas-network">
   <div className="graph-head mono"><span>SPIDER / Interactive atlas</span><span className="muted">Select a connection</span></div>
   <svg viewBox="0 0 660 330" role="group" aria-label="Interactive map of portfolio sections">
     <defs><pattern id="atlas-grid" width="26" height="26" patternUnits="userSpaceOnUse"><path d="M26 0H0V26" fill="none" stroke="#343a38" strokeWidth=".6"/></pattern></defs>
     <rect x="12" y="7" width="636" height="316" fill="url(#atlas-grid)" opacity=".5"/>
     {[66,108,150,190].map((r,i)=><ellipse key={r} className="orbit" cx="330" cy="165" rx={r*1.28} ry={r*.68} opacity={1-i*.12}/>)}
     <path className="edge secondary" d="M155 72 490 72 565 166 490 256 155 256 95 166Z M155 72 490 256 M490 72 155 256 M95 166H565"/>
     <path d="M330 10V320 M22 165H638" className="edge secondary" opacity=".55"/>
     {nodes.map(v=><path key={v.id} className="edge" d={'M330 165 '+v.x+' '+v.y}/>)}
     {relationships[active].map(id=>{const v=getNode(id);return <motion.path key={active+id} className="edge related" d={'M'+n.x+' '+n.y+' '+v.x+' '+v.y} initial={reduced?false:{pathLength:0}} animate={{pathLength:1}} transition={{duration:reduced?0:.45}}/>})}
     <motion.path key={active} className="edge on" d={'M330 165 '+n.x+' '+n.y} initial={reduced?false:{pathLength:0}} animate={{pathLength:1}} transition={{duration:reduced?0:.3}}/>
     <path className="core-frame" d="M330 117 378 165 330 213 282 165Z"/><circle cx="330" cy="165" r="30" className="center"/><text x="330" y="171" textAnchor="middle" className="center-label">ABY</text>
     {nodes.map(v=><g key={v.id} role="button" tabIndex={0} aria-label={v.label} aria-pressed={selected===v.id} className={'vertex'+(active===v.id?' on':relationships[active].includes(v.id)?' connected':'')} transform={'translate('+v.x+' '+v.y+')'} onPointerEnter={e=>{if(e.pointerType==='mouse')setHover(v.id)}} onPointerLeave={()=>setHover(null)} onFocus={()=>setHover(v.id)} onBlur={()=>setHover(null)} onClick={()=>{setSelected(v.id);setHover(null)}} onKeyDown={e=>{if(e.key==='Enter'||e.key===' '){e.preventDefault();setSelected(v.id);setHover(null)}}}>
       <circle r="24" className="hit"/><circle r="17" className="node-halo"/><circle r="10" className="ring"/><circle r="3" className="dot"/>
       <text textAnchor="middle" y={v.y>200?32:-25}>{v.label.toUpperCase()}</text><text className="num" textAnchor="middle" y={v.y>200?-25:29}>{v.number}</text>
     </g>)}
   </svg>
   <div className="atlas-inspector"><div><span className="mono accent">{n.number} / {n.label}</span><p aria-live="polite">{n.description}</p><small>{keywords[active]}</small></div><a className="mono" href={n.href} aria-label={'Explore '+n.label}>Explore ↗</a></div>
   <div className="network-links" aria-label="Select a network node">{nodes.map(v=><button key={v.id} type="button" aria-pressed={selected===v.id} onClick={()=>{setSelected(v.id);setHover(null)}}>{v.label}</button>)}</div>
 </div>;
}

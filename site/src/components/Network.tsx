import { useState } from 'react';
import { motion, useReducedMotion } from 'motion/react';
import { nodes, getNode, type NodeId } from '../data/network';
export default function Network() {
  const [selected, setSelected] = useState<NodeId>('projects');
  const [preview, setPreview] = useState<NodeId | null>(null);
  const active = preview ?? selected;
  const node = getNode(active);
  const reduced = useReducedMotion();
  return (
    <div className="graph">
      <div className="graph-head mono muted"><span>Fig. 01 — Interconnected thinking</span><span>Interactive index</span></div>
      <svg viewBox="0 0 660 330" role="group" aria-label="Interactive map of six portfolio sections">
        <ellipse className="orbit" cx="330" cy="165" rx="230" ry="123"/><ellipse className="orbit" cx="330" cy="165" rx="124" ry="70"/>
        <path className="edge secondary" d="M155 72 490 72 565 166 490 256 155 256 95 166Z M155 72 490 256 M490 72 155 256 M95 166H565"/>
        {nodes.map(n => <path key={n.id} className="edge" d={'M330 165 '+n.x+' '+n.y}/>)}
        <motion.path key={active} className="edge on" d={'M330 165 '+node.x+' '+node.y} initial={reduced?false:{pathLength:0}} animate={{pathLength:1}} transition={{duration:reduced?0:0.38,ease:'easeOut'}}/>
        <circle cx="330" cy="165" r="43" fill="none" stroke="#c9f36a" strokeOpacity=".4" strokeDasharray="2 6"/>
        <circle className="center" cx="330" cy="165" r="30"/><text x="330" y="171" textAnchor="middle" className="center-label">ABY</text>
        {nodes.map(n => <g key={n.id} className={'vertex'+(active===n.id?' on':'')} role="button" tabIndex={0} aria-label={n.label} aria-pressed={selected===n.id} transform={'translate('+n.x+' '+n.y+')'} onPointerEnter={e=>{if(e.pointerType==='mouse')setPreview(n.id)}} onPointerLeave={()=>setPreview(null)} onFocus={()=>setPreview(n.id)} onBlur={()=>setPreview(null)} onClick={()=>{setSelected(n.id);setPreview(null)}} onKeyDown={e=>{if(e.key==='Enter'||e.key===' '){e.preventDefault();setSelected(n.id);setPreview(null)}}}>
          <circle className="hit" r="24"/><circle className="ring" r="13"/><circle className="dot" r="3"/><text textAnchor="middle" y={n.y>200?29:-23}>{n.label.toUpperCase()}</text><text className="num" textAnchor="middle" y={n.y>200?-21:28}>{n.number}</text>
        </g>)}
      </svg>
      <div className="graph-bottom"><p aria-live="polite">{node.number} / {node.label} — {node.description}</p><a className="mono" href={node.href}>Explore ↗</a></div>
      <div className="network-links" aria-label="Network section shortcuts">{nodes.map(n=><a key={n.id} href={n.href}>{n.label}</a>)}</div>
    </div>
  );
}

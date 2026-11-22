import {useEffect,useRef,useState} from 'react';
import Logo from './Logo';
const DURATION=3200;
export default function Entrance({open,onEnter}:{open:boolean;onEnter:()=>void}){
 const finish=useRef(onEnter);finish.current=onEnter;
 const [leaving,setLeaving]=useState(false);
 useEffect(()=>{
  if(!open)return;
  setLeaving(false);
  const reduced=matchMedia('(prefers-reduced-motion: reduce)').matches;
  const fade=window.setTimeout(()=>setLeaving(true),reduced?150:DURATION-600);
  const done=window.setTimeout(()=>finish.current(),reduced?280:DURATION);
  const key=(e:KeyboardEvent)=>{if(e.key==='Escape')finish.current()};
  window.addEventListener('keydown',key);
  return()=>{clearTimeout(fade);clearTimeout(done);window.removeEventListener('keydown',key)};
 },[open]);
 if(!open)return null;
 return <div role="dialog" aria-modal="true" aria-labelledby="entry-title" className={'yzr-entrance auto-entrance cinematic-intro'+(leaving?' entry-leaving':'')}>
  <div className="intro-frame" aria-hidden="true"><i/><i/><i/><i/></div>
  <div className="intro-index" aria-hidden="true">YZR® &nbsp; / &nbsp; DIGITAL EXPERIENCE <span>01 — 26</span></div>
  <div className="intro-center">
   <div className="intro-halo" aria-hidden="true"/>
   <div className="intro-logo-object" aria-hidden="true"><div className="intro-logo-depth">{Array.from({length:7},(_,i)=><img key={i} src="/yzr-logo.svg" alt="" style={{transform:'translateZ('+(-i*1.2)+'px)'}}/>)}</div><Logo className="intro-logo-face"/></div>
   <div className="intro-wordmark"><span>A DIGITAL EXPERIENCE BY</span><h1 id="entry-title">Abdallah Boukhari Yasser</h1></div>
   <div className="intro-line" aria-hidden="true"><i/></div>
  </div>
  <div className="intro-bottom" aria-hidden="true"><span>ALGERIA / ENSIA</span><span>INITIALIZING<span className="intro-dots">...</span></span></div>
 </div>
}

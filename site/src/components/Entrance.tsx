import {useEffect,useRef,useState,lazy,Suspense} from 'react';
import Logo from './Logo';
const LogoScene=lazy(()=>import('./LogoScene'));
const DURATION=2700;
export default function Entrance({open,onEnter}:{open:boolean;onEnter:()=>void}){
 const ref=useRef<HTMLDialogElement>(null);const finish=useRef(onEnter);finish.current=onEnter;
 const [leaving,setLeaving]=useState(false);
 useEffect(()=>{
  const d=ref.current;if(!d)return;
  if(!open){if(d.open)d.close();return;}
  setLeaving(false);if(!d.open)d.showModal();
  const reduced=matchMedia('(prefers-reduced-motion: reduce)').matches;
  const fade=window.setTimeout(()=>setLeaving(true),reduced?250:DURATION-480);
  const done=window.setTimeout(()=>finish.current(),reduced?400:DURATION);
  return()=>{clearTimeout(fade);clearTimeout(done)};
 },[open]);
 return <dialog className={'yzr-entrance auto-entrance'+(leaving?' entry-leaving':'')} ref={ref} aria-labelledby="entry-title" onCancel={e=>{e.preventDefault();finish.current()}}>
 {open&&<div className="entry-inner"><div className="entry-grid" aria-hidden="true"/><div className="entry-top"><Logo/><span>YZR / PERSONAL PORTFOLIO</span></div>
 <div className="entry-center"><div className="entry-scene"><Suspense fallback={<Logo className="entry-logo-fallback"/>}><LogoScene/></Suspense></div>
 <span className="entry-pretitle">A DIGITAL EXPERIENCE BY</span><h1 id="entry-title">Abdallah Boukhari Yasser</h1><p>Code. Design. Curiosity.</p><div className="entry-auto-progress" aria-hidden="true"><i/></div></div><div className="entry-bottom"><span>YZR / ALGERIA</span><span>INITIALIZING EXPERIENCE</span></div></div>}
 </dialog>
}

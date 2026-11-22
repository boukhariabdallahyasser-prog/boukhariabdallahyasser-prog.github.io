import { useEffect,useRef,lazy,Suspense } from 'react';
import Logo from './Logo';
const LogoScene=lazy(()=>import('./LogoScene'));
export default function Entrance({open,onEnter}:{open:boolean;onEnter:(sound:boolean)=>void}){
 const ref=useRef<HTMLDialogElement>(null);
 useEffect(()=>{if(open&&ref.current&&!ref.current.open)ref.current.showModal();else if(!open&&ref.current?.open)ref.current.close()},[open]);
 return <dialog className="yzr-entrance" ref={ref} aria-labelledby="entry-title" onCancel={e=>{e.preventDefault();onEnter(false)}}>
 {open&&<div className="entry-inner"><div className="entry-grid" aria-hidden="true"/><div className="entry-top"><Logo/><span>PERSONAL PORTFOLIO / VOL. 01</span></div>
 <div className="entry-center"><div className="entry-scene"><Suspense fallback={<Logo className="entry-logo-fallback"/>}><LogoScene/></Suspense></div>
 <span className="entry-pretitle">A DIGITAL EXPERIENCE BY</span><h1 id="entry-title">Abdallah Boukhari Yasser</h1><p>Code. Design. Curiosity.</p><div className="entry-actions"><button type="button" className="entry-enter" onClick={()=>onEnter(true)} autoFocus>Enter with sound <span>↗</span></button><button type="button" className="entry-silent" onClick={()=>onEnter(false)}>Enter silently →</button></div></div><div className="entry-bottom"><span>YZR / ALGERIA</span><span>HEADPHONES OPTIONAL</span></div></div>}
 </dialog>
}

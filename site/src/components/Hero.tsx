import {lazy,Suspense,useEffect,useState} from 'react';
import {motion,useReducedMotion,useScroll,useTransform} from 'motion/react';
const Orb=lazy(()=>import('./Orb'));
const welcome=["Hello. I'm YZR.","Explore my universe.","Ask me about my work."];
export default function Hero({onGuide,speaking}:{onGuide:()=>void;speaking:boolean}){
 const [greeting,setGreeting]=useState(0);const reduce=useReducedMotion();const {scrollY}=useScroll();const depth=useTransform(scrollY,[0,650],[0,85]);const fade=useTransform(scrollY,[0,650],[1,.3]);
 useEffect(()=>{if(matchMedia('(prefers-reduced-motion: reduce)').matches)return;const id=setInterval(()=>setGreeting(i=>(i+1)%welcome.length),5200);return()=>clearInterval(id)},[]);
 return <section className="b-hero hero-v12" aria-label="Introduction">
 <div className="b-hero-grid" aria-hidden="true"/><div className="hero-aura" aria-hidden="true"/><div className="hero-horizon" aria-hidden="true"/>
 <div className="hero-v12-layout">
  <div className="b-hero-copy"><p className="b-kicker"><i/> ABDALLAH BOUKHARI YASSER</p><h1><span className="headline-line">Engineering ideas.</span><span className="headline-line headline-secondary">Designing<br/>experiences.</span></h1><p>Software engineering student at ENSIA.<br/>Building at the intersection of code and design.</p><div className="b-hero-actions"><a className="b-primary" href="#work">Explore my work <span>↗</span></a><button className="b-secondary" onClick={onGuide}>Meet YZR <span>✳</span></button></div></div>
  <div className="hero-object-stage"><motion.div className="b-orb-parallax" style={reduce?undefined:{y:depth,opacity:fade}}><div className="b-orb-wrap"><div className="orb-ground-glow" aria-hidden="true"/><Suspense fallback={<div className="b-orb-fallback"><i/><i/></div>}><Orb speaking={speaking}/></Suspense><button className="b-orb-trigger" onClick={onGuide} aria-label="Talk to the YZR 3D orb"/></div></motion.div>
   <button className="b-welcome orb-invitation" onClick={onGuide}><span className="b-mini-orb" aria-hidden="true"><i/><i/></span><span key={greeting}>{welcome[greeting]}</span><span aria-hidden="true">↗</span></button><span className="orb-hint">MOVE YOUR CURSOR / TAP TO INTERACT</span>
  </div>
 </div>
 <div className="hero-coordinate left" aria-hidden="true">ALGERIA / ENSIA<br/>CODE — DESIGN</div><div className="hero-coordinate right" aria-hidden="true">REAL-TIME 3D<br/>YZR / 001</div><a href="#capabilities" className="b-scroll"><span>Scroll to explore</span><span>↓</span></a>
 </section>
}

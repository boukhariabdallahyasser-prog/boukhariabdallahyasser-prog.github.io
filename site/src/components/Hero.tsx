import { lazy,Suspense,useEffect,useState } from 'react';
import { motion,useReducedMotion,useScroll,useTransform } from 'motion/react';
const Orb=lazy(()=>import('./Orb'));
const welcome=["Welcome. I'm your portfolio guide.","Welcome to Abdallah's digital space.","Explore code, design and digital experiences."];
export default function Hero({onGuide,speaking}:{onGuide:()=>void;speaking:boolean}){
 const [greeting,setGreeting]=useState(0);const reduce=useReducedMotion();const {scrollY}=useScroll();const depth=useTransform(scrollY,[0,600],[0,70]);const fade=useTransform(scrollY,[0,620],[1,.38]);
 useEffect(()=>{if(matchMedia('(prefers-reduced-motion: reduce)').matches)return;const id=setInterval(()=>setGreeting(i=>(i+1)%welcome.length),6200);return()=>clearInterval(id)},[]);
 return <section className="b-hero" aria-label="Introduction">
  <div className="b-hero-grid" aria-hidden="true"/><div className="hero-aura" aria-hidden="true"/>
  <div className="b-welcome"><span className="b-mini-orb" aria-hidden="true"><i/><i/></span><span key={greeting}>{welcome[greeting]}</span></div>
  <motion.div className="b-orb-parallax" style={reduce?undefined:{y:depth,opacity:fade}}><div className="b-orb-wrap"><div className="orb-ground-glow" aria-hidden="true"/><Suspense fallback={<div className="b-orb-fallback"><i/><i/></div>}><Orb speaking={speaking}/></Suspense><button className="b-orb-trigger" onClick={onGuide} aria-label="Talk to the YZR 3D orb"/></div></motion.div>
  <div className="b-hero-copy"><p className="b-kicker">ABDALLAH BOUKHARI YASSER <span>·</span> ENSIA / ALGERIA</p><h1><span className="headline-line">Engineering ideas.</span><span className="headline-line headline-secondary">Designing experiences.</span></h1><p>Software engineering student exploring the intersection of code, design and meaningful digital products.</p><div className="b-hero-actions"><a className="b-primary" href="#work">Explore my work <span>↗</span></a><button className="b-secondary" onClick={onGuide}>Talk to YZR <span>✳</span></button></div></div>
  <div className="hero-coordinate left" aria-hidden="true">YZR / 001<br/>DIGITAL STUDIO</div><div className="hero-coordinate right" aria-hidden="true">3D / INTERACTIVE<br/>MOVE YOUR CURSOR</div><a href="#capabilities" className="b-scroll"><span>Explore the experience</span><span>↓</span></a>
 </section>
}

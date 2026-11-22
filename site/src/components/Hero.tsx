import { lazy,Suspense,useEffect,useState } from 'react';
const Orb=lazy(()=>import('./Orb'));
const welcome=["Welcome. I'm your portfolio guide.","Welcome to Abdallah's digital space.","Explore code, design and digital experiences."];
export default function Hero({onGuide,speaking}:{onGuide:()=>void;speaking:boolean}){
 const [greeting,setGreeting]=useState(0);
 useEffect(()=>{if(matchMedia('(prefers-reduced-motion: reduce)').matches)return;const id=setInterval(()=>setGreeting(i=>(i+1)%welcome.length),6200);return()=>clearInterval(id)},[]);
 return <section className="b-hero" aria-label="Introduction">
  <div className="b-hero-grid" aria-hidden="true"/>
  <div className="b-welcome"><span className="b-mini-orb" aria-hidden="true"><i/><i/></span><span key={greeting}>{welcome[greeting]}</span></div>
  <div className="b-orb-wrap"><Suspense fallback={<div className="b-orb-fallback"><i/><i/></div>}><Orb speaking={speaking}/></Suspense><button className="b-orb-trigger" onClick={onGuide} aria-label="Meet the guide portfolio guide"/></div>
  <div className="b-hero-copy"><p className="b-kicker">ABDALLAH BOUKHARI YASSER <span>·</span> ENSIA / ALGERIA</p><h1>Engineering ideas.<br/><span>Designing experiences.</span></h1><p>Software engineering student exploring the intersection of code, design and meaningful digital products.</p><div className="b-hero-actions"><a className="b-primary" href="#work">Explore my work <span>↗</span></a><button className="b-secondary" onClick={onGuide}>Talk to YZR <span>✳</span></button></div></div>
  <a href="#capabilities" className="b-scroll"><span>Explore the experience</span><span>↓</span></a>
 </section>
}

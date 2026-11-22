import {useEffect} from 'react';
import gsap from 'gsap';
import {ScrollTrigger} from 'gsap/ScrollTrigger';
gsap.registerPlugin(ScrollTrigger);
export default function CinematicMotion(){
 useEffect(()=>{
 const mm=gsap.matchMedia();
 mm.add('(prefers-reduced-motion: no-preference)',()=>{
  const hero=document.querySelector('.b-hero');
  if(!hero)return;
  const intro=gsap.timeline({defaults:{ease:'power3.out'}});
  intro.fromTo('.hero-coordinate',{opacity:0,x:10},{opacity:1,x:0,duration:.8,stagger:.14},.3)
       .fromTo('.b-hero-actions > *',{opacity:0,y:12},{opacity:1,y:0,duration:.55,stagger:.12,clearProps:'opacity,transform'},.6);
  gsap.to('.b-hero-grid',{backgroundPosition:'0px 90px',ease:'none',scrollTrigger:{trigger:hero,start:'top top',end:'bottom top',scrub:1}});
  gsap.utils.toArray<HTMLElement>('.b-section-title').forEach(el=>{
    const label=el.querySelector(':scope > span');if(!label)return;
    gsap.fromTo(label,{letterSpacing:'.25em',opacity:.25},{letterSpacing:'.10em',opacity:1,duration:.65,ease:'power2.out',scrollTrigger:{trigger:el,start:'top 87%',once:true},clearProps:'letterSpacing,opacity'});
  });
  gsap.fromTo('.b-hero .hero-aura',{scale:.7,opacity:.15},{scale:1,opacity:1,duration:1.8,ease:'power3.out'});
 });
 return()=>mm.revert();
 },[]);
 return null;
}

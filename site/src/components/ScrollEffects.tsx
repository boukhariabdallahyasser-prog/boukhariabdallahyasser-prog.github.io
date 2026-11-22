import { useEffect } from 'react';
import { motion,useScroll,useSpring,useReducedMotion } from 'motion/react';
export default function ScrollEffects(){
 const {scrollYProgress}=useScroll();const progress=useSpring(scrollYProgress,{stiffness:130,damping:32,mass:.3});const reduce=useReducedMotion();
 useEffect(()=>{
 if(reduce||typeof IntersectionObserver==='undefined')return;
 const items=[...document.querySelectorAll<HTMLElement>('.b-section-title:not(.work-section .b-section-title),.b-capability,.b-bio-mark,.b-bio>div:last-child,.b-contact .b-shell')];
 const ob=new IntersectionObserver(entries=>entries.forEach(entry=>{if(entry.isIntersecting){entry.target.classList.add('yzr-in-view');ob.unobserve(entry.target)}}),{threshold:.12});
 items.forEach((el,i)=>{if(el.getBoundingClientRect().top>innerHeight*.8){el.classList.add('yzr-reveal');el.style.setProperty('--reveal-delay',((i%3)*65)+'ms');ob.observe(el)}});
 return()=>{ob.disconnect();items.forEach(el=>{el.classList.remove('yzr-reveal','yzr-in-view');el.style.removeProperty('--reveal-delay')})};
 },[reduce]);
 return <motion.div className="yzr-scroll-progress" style={{scaleX:reduce?scrollYProgress:progress}} aria-hidden="true"/>;
}

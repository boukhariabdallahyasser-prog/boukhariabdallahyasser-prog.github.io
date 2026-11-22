import { useState,useRef,useEffect } from 'react';
import Hero from './components/Hero';
import Capabilities from './components/Capabilities';
import Stack from './components/Stack';
import SelectedWork from './components/SelectedWork';
import Logo from './components/Logo';
import Entrance from './components/Entrance';
import Contact from './components/Contact';
import PortfolioGuide from './components/PortfolioGuide';
export default function App(){
 const [open,setOpen]=useState(false),[sound,setSound]=useState(false),[speaking,setSpeaking]=useState(false);
 const [entered,setEntered]=useState(()=>{try{return sessionStorage.getItem('yzr-entered')==='1'}catch{return false}});
 const audio=useRef<AudioContext|null>(null),timer=useRef<ReturnType<typeof setTimeout>|null>(null);
 function tone(force=false){if(!sound&&!force)return;try{const ctx=audio.current??new AudioContext();audio.current=ctx;void ctx.resume().catch(()=>{});const osc=ctx.createOscillator(),gain=ctx.createGain();osc.type='sine';osc.frequency.setValueAtTime(520,ctx.currentTime);osc.frequency.exponentialRampToValueAtTime(740,ctx.currentTime+.12);gain.gain.setValueAtTime(.001,ctx.currentTime);gain.gain.exponentialRampToValueAtTime(.06,ctx.currentTime+.015);gain.gain.exponentialRampToValueAtTime(.001,ctx.currentTime+.2);osc.connect(gain);gain.connect(ctx.destination);osc.start();osc.stop(ctx.currentTime+.21);}catch{/* optional audio */}}
 function enter(withSound:boolean){setSound(withSound);setEntered(true);try{sessionStorage.setItem('yzr-entered','1')}catch{/* storage optional */}if(withSound){tone(true);try{const ctx=audio.current;if(ctx){[196,293.66,392,587.33].forEach((freq,i)=>{const o=ctx.createOscillator(),g=ctx.createGain();const t=ctx.currentTime+.08+i*.105;o.type='sine';o.frequency.value=freq;g.gain.setValueAtTime(.001,t);g.gain.exponentialRampToValueAtTime(.035,t+.055);g.gain.exponentialRampToValueAtTime(.001,t+.65);o.connect(g);g.connect(ctx.destination);o.start(t);o.stop(t+.67)})}}catch{/* optional audio */}}}
 function speak(){tone();setSpeaking(true);if(timer.current)clearTimeout(timer.current);timer.current=setTimeout(()=>setSpeaking(false),1600)}
 function showGuide(){setOpen(true);speak()}
 useEffect(()=>()=>{if(timer.current)clearTimeout(timer.current);void audio.current?.close()},[]);
 return <div className={'living-site'+(entered?' is-entered':' awaiting-entry')}><a className="skip" href="#main">Skip to content</a>
 <header className="b-header"><div className="b-nav"><a className="b-mark" href="#main" aria-label="YZR portfolio home"><Logo className="nav-yzr-logo"/></a><nav aria-label="Main navigation"><a href="#work">Work</a><a href="#skills">Stack</a><a href="#about">About</a><a href="#contact">Contact</a></nav><button type="button" className="b-sound" aria-pressed={sound} onClick={()=>{if(!sound)tone(true);setSound(v=>!v)}}><svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M3 9v6h4l5 4V5L7 9H3Z" stroke="currentColor" strokeWidth="1.5"/>{sound?<path d="M15 8c3 2 3 6 0 8M18 5c5 4 5 10 0 14" stroke="currentColor" strokeWidth="1.5"/>:<path d="m16 9 5 6m0-6-5 6" stroke="currentColor" strokeWidth="1.5"/>}</svg><span>Sound {sound?'on':'off'}</span></button></div></header>
 <main id="main">{entered?<Hero onGuide={showGuide} speaking={speaking}/>:<div className="hero-placeholder"/>}<Capabilities/><Stack/><SelectedWork/>
 <section className="b-section b-about" id="about"><div className="b-shell"><div className="b-section-title"><span>04 / ABOUT ME</span><h2>Curiosity is my<br/><em>starting point.</em></h2></div><div className="b-bio"><div className="b-bio-mark"><Logo className="bio-yzr-logo"/><span>YZR / ALGERIA</span></div><div><h3>Hey, I'm Abdallah.</h3><p>I'm a second-year student at the National Higher School of Artificial Intelligence (ENSIA). I explore software engineering, product development, interface design and the connections that make complex systems work.</p><p>I'm also interested in graphic design, visual identity and video editing. I'm an accepted ENSIA participant in the Huawei ICT Competition 2026–2027.</p><a className="b-secondary" href="https://www.behance.net/boukharyasser01">My creative work ↗</a></div></div></div></section><Contact/></main>
 <footer className="b-footer"><span>© Abdallah Boukhari Yasser</span><span>YZR / Personal portfolio</span><a href="#main">Back to top ↑</a></footer>
 <button className="b-guide-launch" type="button" onClick={showGuide} aria-label="Open portfolio guide"><span className="b-mini-orb" aria-hidden="true"><i/><i/></span><span>Ask YZR</span></button><PortfolioGuide open={open} onClose={()=>setOpen(false)} onSpeak={speak}/><Entrance open={!entered} onEnter={enter}/>
 </div>
}

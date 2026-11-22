import { lazy, Suspense } from 'react';
import WorkstationFallback from './WorkstationFallback';
const Workstation = lazy(()=>import('./Workstation'));
function Contours(){
 return <svg className="hero-contours" viewBox="0 0 1600 900" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
 <defs><linearGradient id="contour-left"><stop stopColor="#6e54a7" stopOpacity=".48"/><stop offset="1" stopColor="#251a4d" stopOpacity=".12"/></linearGradient><linearGradient id="contour-right"><stop stopColor="#26164d" stopOpacity=".25"/><stop offset="1" stopColor="#8055dc" stopOpacity=".8"/></linearGradient></defs>
 {Array.from({length:35},(_,i)=><path key={'a'+i} d={'M '+(-190+i*14)+' -70 C '+(410+i*20)+' '+(140+i*6)+' '+(780-i*5)+' '+(-140+i*16)+' '+(890+i*4)+' 60 C '+(1060-i*14)+' '+(420+i*4)+' '+(560-i*8)+' '+(460-i*8)+' '+(440-i*6)+' '+(250+i*9)+' C '+(375-i*4)+' '+(65+i*8)+' '+(780-i*15)+' '+(375+i*3)+' '+(-70+i*6)+' '+(710+i*9)} stroke="url(#contour-left)" strokeWidth="1.35" fill="none"/>)}
 {Array.from({length:39},(_,i)=><path key={'b'+i} d={'M '+(1150+i*13)+' -90 C '+(1100+i*14)+' '+(90+i*4)+' '+(1370+i*8)+' '+(188-i*3)+' '+(1310+i*5)+' '+(247+i*4)+' C '+(1180-i*5)+' '+(322+i*4)+' '+(990+i*4)+' '+(335+i*9)+' '+(1010+i*11)+' '+(479+i*5)+' C '+(1040+i*10)+' '+(694+i*5)+' '+(1640+i*3)+' '+(450+i*8)+' '+(1550+i*13)+' '+(1060+i*5)} stroke="url(#contour-right)" strokeWidth="1.45" fill="none"/>)}
 </svg>;
}
export default function Hero(){
 return <section className="reference-hero" aria-label="Introduction"><Contours/>
  <div className="reference-copy"><div className="intro-pin" aria-hidden="true"/><h1>Hi, I'm <strong>Abdallah<br className="name-break"/> Boukhari Yasser</strong></h1><p>I build web applications, explore software engineering<br className="desktop-break"/> and design digital experiences.</p></div>
  <div className="workstation-frame"><Suspense fallback={<WorkstationFallback/>}><Workstation/></Suspense></div>
  <a className="scroll-mouse" href="#about" aria-label="Scroll to about"><span/></a>
 </section>;
}

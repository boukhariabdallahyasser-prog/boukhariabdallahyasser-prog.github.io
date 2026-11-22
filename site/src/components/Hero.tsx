import { lazy,Suspense } from 'react';
import ShapeFallback from './ShapeFallback';
const ShapeScene=lazy(()=>import('./ShapeScene'));
export default function Hero(){
 return <section className="green-hero" aria-label="Introduction">
 <div className="green-grid" aria-hidden="true"/>
 <div className="green-scene"><Suspense fallback={<ShapeFallback/>}><ShapeScene/></Suspense></div>
 <div className="green-intro"><h1><span>Hi, I'm</span> <strong>Abdallah Boukhari Yasser</strong></h1><p>Software Engineering Student &amp; Creative Web Developer</p></div>
 <a className="green-scroll" href="#about" aria-label="Scroll to about"><svg viewBox="0 0 32 20" aria-hidden="true"><path d="M2 4H30L16 16Z" fill="currentColor"/></svg></a>
 </section>;
}

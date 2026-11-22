import Network from './Network';
export default function Hero(){
 return <div className="wrap hero atlas-hero">
   <div className="hero-top mono"><span><i className="signal"/> Independent portfolio / Algeria</span><span>Systems, software &amp; design</span><span>01 — 07</span></div>
   <div className="identity"><div><span className="mono muted">A personal work in progress</span><h1>Abdallah<br/>Boukhari <em>Yasser.</em></h1></div><div className="identity-index"><span className="mono muted">INDEX / ABY</span><svg viewBox="0 0 100 100" aria-hidden="true"><path d="M6 6H94V94H6Z M6 6 94 94 M94 6 6 94 M50 6V94 M6 50H94" fill="none" stroke="currentColor" strokeWidth=".8"/><circle cx="50" cy="50" r="8" fill="currentColor"/></svg></div></div>
   <div className="hero-grid">
     <div className="intro"><div><span className="mono accent">01 / Introduction</span><h2>Everything is connected.</h2><p>I'm a second-year student at ENSIA, exploring the space between software engineering, product building and visual design.</p><p className="hero-manifesto">Ideas become systems.<br/>Systems become experiences.</p></div><a className="indexlink" href="#work"><span aria-hidden="true">↘</span> Selected work / 02</a></div>
     <Network/>
   </div>
   <div className="ticker mono"><span>National Higher School of Artificial Intelligence</span><span>Personal atlas / Vol. 01</span><a href="#about">Continue exploring ↓</a></div>
 </div>;
}

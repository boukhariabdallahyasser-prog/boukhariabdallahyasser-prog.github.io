import Network from './Network';
export default function Hero(){ return (
<div className="wrap hero">
<div className="hero-top mono muted"><span><span className="accent">●</span> Personal atlas / Algeria</span><span>Engineering × Design / 001</span></div>
<h1>Ideas become systems.<br />Systems become <em>experiences.</em></h1>
<div className="hero-grid">
<div className="intro"><div><span className="mono accent">01 / The person</span><h2>Abdallah<br />Boukhari Yasser.</h2><p>Second-year student at ENSIA. Exploring software engineering, digital products and the connections between technology and design.</p></div><a className="indexlink" href="#work"><span aria-hidden="true">↓</span> View selected work</a></div>
<Network />
</div><div className="ticker mono"><span>ENSIA / Computer science student</span><span>Web • Product • Systems</span><span>Scroll to explore ↓</span></div>
</div>
); }

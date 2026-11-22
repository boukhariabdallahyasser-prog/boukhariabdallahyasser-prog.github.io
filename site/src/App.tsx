import Hero from './components/Hero';
import Network from './components/Network';
import About from './components/About';
import SelectedWork from './components/SelectedWork';
import Skills from './components/Skills';
import Experience from './components/Experience';
import Creative from './components/Creative';
import Learning from './components/Learning';
import Contact from './components/Contact';
export default function App(){return (<>
<a className="skip" href="#main">Skip to content</a>
<header className="reference-header"><div className="reference-nav"><a className="reference-brand" href="#main" aria-label="Home"><svg viewBox="0 0 36 36" aria-hidden="true"><circle cx="18" cy="18" r="15" fill="none" stroke="currentColor" strokeWidth="1.6"/><path d="M10 11l5 5m0-5-5 5m11-5 5 5m0-5-5 5M10 22q8 10 16 0" fill="none" stroke="currentColor" strokeWidth="1.5"/></svg><span>Abdallah <b>— Portfolio</b></span></a><nav aria-label="Main"><a href="#about">About</a><a href="#work">Work</a><a href="#contact">Contact</a></nav></div></header>
<main id="main"><Hero/><About/><SelectedWork/><section className="content" id="network"><div className="wrap"><div className="sectionhead"><span className="mono accent">SPIDER / Network</span><h2>Everything is connected.</h2></div><Network/></div></section><Skills/><Experience/><Creative/><Learning/><Contact/></main>
<div className="wrap"><footer className="mono muted"><span>© Abdallah Boukhari Yasser</span><span>Designed around connections.</span><a href="#main">Back to top ↑</a></footer></div>
</>);}

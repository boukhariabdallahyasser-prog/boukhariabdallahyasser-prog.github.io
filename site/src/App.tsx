import Hero from './components/Hero';
import About from './components/About';
import SelectedWork from './components/SelectedWork';
import Skills from './components/Skills';
import Experience from './components/Experience';
import Creative from './components/Creative';
import Learning from './components/Learning';
import Contact from './components/Contact';
export default function App(){return (<>
<a className="skip" href="#main">Skip to content</a>
<header><div className="wrap nav"><a className="brand" href="#main" aria-label="Abdallah Boukhari Yasser home"><svg viewBox="0 0 36 36" fill="none" aria-hidden="true"><path d="M3 3 18 18 33 3M3 33 18 18 33 33M3 3V33M33 3V33" stroke="#c9f36a" strokeWidth="1.6"/><circle cx="18" cy="18" r="3.5" fill="#c9f36a"/></svg><span>ABY.<small>Independent portfolio</small></span></a><nav aria-label="Main"><a href="#about">About</a><a href="#work">Work</a><a href="#skills">Index</a><a href="#contact">Contact</a></nav><a className="nav-contact" href="https://github.com/boukhariabdallahyasser-prog">GitHub ↗</a></div></header>
<main id="main"><Hero/><About/><SelectedWork/><Skills/><Experience/><Creative/><Learning/><Contact/></main>
<div className="wrap"><footer className="mono muted"><span>© Abdallah Boukhari Yasser</span><span>Designed around connections.</span><a href="#main">Back to top ↑</a></footer></div>
</>);}

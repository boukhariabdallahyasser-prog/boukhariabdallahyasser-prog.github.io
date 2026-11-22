export default function ShapeFallback(){
 return <svg className="shape-fallback" viewBox="0 0 1400 800" preserveAspectRatio="xMidYMax meet" aria-hidden="true">
 <defs><linearGradient id="silver" x2=".7" y2="1"><stop stopColor="#c8cdcb"/><stop offset=".35" stopColor="#646c6a"/><stop offset=".8" stopColor="#bfc3c0"/><stop offset="1" stopColor="#3e4943"/></linearGradient><linearGradient id="glass" x2="1" y2="1"><stop stopColor="#81ffb8"/><stop offset=".45" stopColor="#124b2e" stopOpacity=".65"/><stop offset=".85" stopColor="#061e13"/><stop offset="1" stopColor="#5df49b"/></linearGradient><linearGradient id="ring" x2=".6" y2="1"><stop stopColor="#313632"/><stop offset=".65" stopColor="#111411"/><stop offset="1" stopColor="#030503"/></linearGradient></defs>
 <path d="M45 697H1355" stroke="#62f5a0" strokeOpacity=".22" strokeWidth="20"/><path d="M45 697H1355" stroke="#4dff96" strokeWidth="3"/>
 {[[182,625,-17],[375,622,37],[626,644,-4],[891,641,0],[1087,642,5],[1247,644,0]].map(([x,y,r],i)=><rect key={i} x="-49" y="-49" width="98" height="98" rx="13" transform={'translate('+x+' '+y+') rotate('+r+')'} fill="url(#silver)" stroke="#d4d9d5" strokeWidth="2"/>)}
 {[[170,545,4],[360,565,30],[510,647,0],[1020,190,-22],[1165,318,83],[1070,425,-15],[1270,252,90],[1115,-22,25]].map(([x,y,r],i)=><path key={i} d="M-58 48 Q-72 48 -63 31 L-10 -64 Q0 -82 10 -64 L63 31 Q72 48 58 48Z" transform={'translate('+x+' '+y+') rotate('+r+')'} fill="url(#glass)" stroke="#6bffae" strokeWidth="2"/>)}
 {[[275,633,18],[91,677,90],[950,581,68],[1182,674,90]].map(([x,y,r],i)=><ellipse key={i} cx="0" cy="0" rx="44" ry="63" transform={'translate('+x+' '+y+') rotate('+r+')'} fill="none" stroke="url(#ring)" strokeWidth="32"/>)}
 </svg>;
}

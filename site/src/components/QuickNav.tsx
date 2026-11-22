import {useEffect,useMemo,useRef,useState} from 'react';
import Fuse from 'fuse.js';
import {Search,ArrowUpRight,Command,Home,Code2,Layers,UserRound,Mail,MessageCircle,RotateCcw,X} from 'lucide-react';
const entries=[
 {name:'Home',note:'Return to the 3D hero',href:'#main',icon:Home,keywords:'intro orb sphere landing'},
 {name:'Projects',note:'SHIFAA and Bac-pedia 26',href:'#work',icon:Layers,keywords:'work portfolio healthcare education'},
 {name:'Technology stack',note:'Languages, design, infrastructure',href:'#skills',icon:Code2,keywords:'react javascript node three typescript'},
 {name:'About',note:'ENSIA, interests and background',href:'#about',icon:UserRound,keywords:'education experience huawei'},
 {name:'Contact',note:'Start a conversation',href:'#contact',icon:Mail,keywords:'linkedin email collaboration'},
 {name:'Ask YZR',note:'Open the portfolio guide',href:'guide',icon:MessageCircle,keywords:'chat assistant'},
 {name:'Replay introduction',note:'See the cinematic logo again',href:'replay',icon:RotateCcw,keywords:'entrance sound logo'}
];
export default function QuickNav({onGuide,onReplay}:{onGuide:()=>void;onReplay:()=>void}){
 const [open,setOpen]=useState(false),[query,setQuery]=useState(''),[active,setActive]=useState(0);const dialog=useRef<HTMLDialogElement>(null),input=useRef<HTMLInputElement>(null),button=useRef<HTMLButtonElement>(null);
 const fuse=useMemo(()=>new Fuse(entries,{keys:['name','note','keywords'],threshold:.4}),[]);
 const results=query.trim()?fuse.search(query.trim()).map(r=>r.item):entries;
 useEffect(()=>{const listener=(e:KeyboardEvent)=>{if((e.metaKey||e.ctrlKey)&&e.key.toLowerCase()==='k'){if(document.querySelector('dialog[open]:not(.quick-dialog)'))return;e.preventDefault();setOpen(v=>!v)}};window.addEventListener('keydown',listener);return()=>window.removeEventListener('keydown',listener)},[]);
 useEffect(()=>{const d=dialog.current;if(!d)return;if(open&&!d.open){setQuery('');setActive(0);d.showModal();input.current?.focus()}else if(!open&&d.open){d.close()}},[open]);
 function choose(href:string){dialog.current?.close();setOpen(false);if(href==='guide')onGuide();else if(href==='replay')onReplay();else{document.querySelector(href)?.scrollIntoView({behavior:matchMedia('(prefers-reduced-motion: reduce)').matches?'instant':'smooth'});history.replaceState(null,'',href)}}
 return <><button ref={button} type="button" className="quick-launch" aria-label="Search portfolio" onClick={()=>setOpen(true)}><Search size={17}/><span>Explore</span><kbd>⌘ K</kbd></button>
 <dialog ref={dialog} className="quick-dialog" aria-label="Search portfolio navigation" onCancel={()=>setOpen(false)} onClick={e=>{if(e.target===dialog.current)setOpen(false)}}>
 <div className="quick-input"><Search size={21}/><input ref={input} value={query} onChange={e=>{setQuery(e.target.value);setActive(0)}} placeholder="Find a project, skill or section…" aria-label="Search sections" onKeyDown={e=>{if(e.key==='ArrowDown'){e.preventDefault();setActive(a=>Math.min(a+1,results.length-1))}else if(e.key==='ArrowUp'){e.preventDefault();setActive(a=>Math.max(a-1,0))}else if(e.key==='Enter'&&results[active]){e.preventDefault();choose(results[active].href)}}}/><button type="button" onClick={()=>setOpen(false)} aria-label="Close search"><X size={18}/></button></div>
 <div className="quick-results">{results.map((r,i)=><button type="button" className={i===active?'quick-active':''} key={r.href} onMouseEnter={()=>setActive(i)} onClick={()=>choose(r.href)}><r.icon size={20}/><span><b>{r.name}</b><small>{r.note}</small></span><ArrowUpRight size={15}/></button>)}{!results.length&&<p>No matching sections.</p>}</div><div className="quick-footer"><span><Command size={13}/> K / quick navigation</span><span>↑ ↓ Enter / Esc</span></div>
 </dialog></>
}

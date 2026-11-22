import { useState,useRef,useEffect } from 'react';
const links={github:'https://github.com/boukhariabdallahyasser-prog',linkedin:'https://www.linkedin.com/in/boukhari-abdallah-yasser-b3240b379/',behance:'https://www.behance.net/boukharyasser01'};
type Message={role:'guide'|'visitor';text:string;link?:string; label?:string};
const questions=['What are your projects?','What skills do you have?','How can I contact you?'];
export function answer(q:string):Message{
 const s=q.toLowerCase();
 if(/contact|email|hire|collaborat|linkedin/.test(s))return {role:'guide',text:'You can reach Abdallah through LinkedIn to discuss a project or collaboration.',link:links.linkedin,label:'Open LinkedIn'};
 if(/bac|education/.test(s))return {role:'guide',text:'Bac-pedia 26 is an educational resource platform with student, contributor and admin experiences. Its repository documents Vite, JavaScript, Supabase and Cloudflare.',link:'https://github.com/boukhariabdallahyasser-prog/Bac-pedia26',label:'Explore repository'};
 if(/shifaa|health/.test(s))return {role:'guide',text:'SHIFAA explores connected healthcare workflows, from referrals to appointments and follow-ups.',link:'#work',label:'See project'};
 if(/project|work|portfolio|github/.test(s))return {role:'guide',text:'Two featured projects: SHIFAA, a healthcare coordination concept, and Bac-pedia 26, an education resource platform.',link:'#work',label:'Explore selected work'};
 if(/skill|tech|stack|react|program|code|language/.test(s))return {role:'guide',text:'Abdallah works with HTML, CSS, JavaScript and C++, studies algorithms and OOP, and is exploring React, system design and cloud computing.',link:'#skills',label:'Technical profile'};
 if(/design|figma|creative|behance/.test(s))return {role:'guide',text:'His creative interests include interface design, graphic design, visual identity and video editing.',link:links.behance,label:'Visit Behance'};
 if(/school|ensia|study|education|about|experience|huawei/.test(s))return {role:'guide',text:'Abdallah is a second-year ENSIA student in Algeria and an accepted participant in the Huawei ICT Competition 2026–2027.',link:'#about',label:'Read about Abdallah'};
 return {role:'guide',text:'I am a portfolio guide, not a general-purpose AI. Ask me about SHIFAA, Bac-pedia, skills, studies, design or contact.'};
}
export default function PortfolioGuide({open,onClose,onSpeak}:{open:boolean;onClose:()=>void;onSpeak:()=>void}){
 const [messages,setMessages]=useState<Message[]>([{role:'guide',text:"Hi! I'm YZR, Abdallah's portfolio guide. What would you like to explore?"}]);
 const [input,setInput]=useState('');const end=useRef<HTMLDivElement>(null);const dialog=useRef<HTMLDialogElement>(null);
 useEffect(()=>{const d=dialog.current;if(!d)return;if(open&&!d.open)d.showModal();else if(!open&&d.open)d.close()},[open]);
 useEffect(()=>{if(open)end.current?.scrollIntoView({block:'nearest'})},[messages,open]);
 function send(text:string){const q=text.trim();if(!q)return;setMessages(m=>[...m,{role:'visitor',text:q},answer(q)]);setInput('');onSpeak();}
 return <dialog ref={dialog} className="b-guide" onCancel={onClose} onClick={e=>{if(e.target===dialog.current)onClose()}}>
  <div className="b-guide-head"><span className="b-mini-orb" aria-hidden="true"><i/><i/></span><div><b>YZR</b><small>Portfolio guide · Local FAQ</small></div><button type="button" onClick={onClose} aria-label="Close guide">×</button></div>
  <div className="b-messages" role="log" aria-live="polite">{messages.map((m,i)=><div className={'b-msg '+m.role} key={i}><p>{m.text}</p>{m.link&&<a href={m.link} onClick={m.link.startsWith('#')?onClose:undefined}>{m.label} ↗</a>}</div>)}<div ref={end}/></div>
  <div className="b-questions">{questions.map(q=><button type="button" key={q} onClick={()=>send(q)}>{q}</button>)}</div>
  <form className="b-chat-form" onSubmit={e=>{e.preventDefault();send(input)}}><input autoFocus value={input} onChange={e=>setInput(e.target.value)} placeholder="Ask about the portfolio…" aria-label="Question" maxLength={300}/><button type="submit" disabled={!input.trim()} aria-label="Send question">↗</button></form>
 </dialog>;
}

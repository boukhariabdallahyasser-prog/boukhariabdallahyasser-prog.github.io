import {useEffect,useRef,useState} from 'react';
import {motion,useReducedMotion} from 'motion/react';
const linkedin='https://www.linkedin.com/in/boukhari-abdallah-yasser-b3240b379/';
export default function Contact(){
 const [open,setOpen]=useState(false),[copied,setCopied]=useState(false),[name,setName]=useState(''),[email,setEmail]=useState(''),[message,setMessage]=useState('');
 const dialog=useRef<HTMLDialogElement>(null);const reduce=useReducedMotion();
 const draft='Hi Abdallah,\n\n'+message.trim()+'\n\n'+name.trim()+(email.trim()?'\n'+email.trim():'');
 useEffect(()=>{const d=dialog.current;if(!d)return;if(open&&!d.open)d.showModal();else if(!open&&d.open)d.close()},[open]);
 return <section className="b-section b-contact" id="contact">
 <div className="b-shell contact-grid">
 <div className="contact-copy"><p className="b-kicker">05 / OPEN A CONNECTION</p><h2>Have something<br/>in <em>mind?</em></h2><p>Tell me what you are building. I'd like to hear about your idea, a collaboration, or a challenge worth solving.</p><button className="b-primary transmission-trigger" onClick={()=>{setCopied(false);setOpen(true)}}>Compose a message <span>↗</span></button><div className="b-socials"><a href="https://github.com/boukhariabdallahyasser-prog">GitHub ↗</a><a href={linkedin}>LinkedIn ↗</a><a href="https://www.behance.net/boukharyasser01">Behance ↗</a></div></div>
 <motion.div className="contact-object" initial={reduce?false:{opacity:0,scale:.9}} whileInView={{opacity:1,scale:1}} viewport={{once:true,amount:.3}} transition={{duration:.6}} aria-hidden="true"><div className="contact-orbit orbit-one"/><div className="contact-orbit orbit-two"/><div className="contact-orbit orbit-three"/><div className="contact-core"><i/><i/></div><div className="contact-signal"><b/> CHANNEL OPEN</div></motion.div>
 </div>
 <dialog ref={dialog} className="transmission-dialog" aria-labelledby="transmission-heading" onCancel={e=>{e.preventDefault();setOpen(false)}} onClick={e=>{if(e.target===dialog.current)setOpen(false)}}>
 <div className="transmission-top"><span className="b-mini-orb" aria-hidden="true"><i/><i/></span><div><strong>YZR / Transmission</strong><small>Compose a message for Abdallah</small></div><button type="button" onClick={()=>setOpen(false)} aria-label="Close contact composer">×</button></div>
 <form className="transmission-form" onSubmit={async e=>{e.preventDefault();try{await navigator.clipboard.writeText(draft);setCopied(true)}catch{setCopied(false);const area=document.getElementById('transmission-preview');if(area instanceof HTMLTextAreaElement){area.focus();area.select();}}}}>
 <h3 id="transmission-heading">Let's connect.</h3><p>Prepare your message here and send it through LinkedIn. Nothing is sent or stored by this website.</p>
 <label>Your name<input required value={name} onChange={e=>{setName(e.target.value);setCopied(false)}} autoComplete="name" maxLength={100} placeholder="Name"/></label>
 <label>Email (optional)<input type="email" value={email} onChange={e=>{setEmail(e.target.value);setCopied(false)}} autoComplete="email" maxLength={160} placeholder="you@example.com"/></label>
 <label>What's on your mind?<textarea required value={message} onChange={e=>{setMessage(e.target.value);setCopied(false)}} rows={4} maxLength={1500} placeholder="Tell me about your project…"/></label>
 <button type="submit" className="b-primary">{copied?'Message copied ✓':'Copy message ↗'}</button>
 <details className="transmission-preview"><summary>Preview / select message manually</summary><textarea id="transmission-preview" aria-label="Message preview" readOnly value={draft} rows={6}/></details>
 <p className="transmission-status" role="status">{copied?'Copied. Open LinkedIn and paste your message.':'LinkedIn is the delivery channel.'}</p><a className="b-secondary" href={linkedin} target="_blank" rel="noreferrer">Open LinkedIn ↗</a>
 </form></dialog>
 </section>
}

import { useState } from 'react';
const flow=[
 {name:'Referral',role:'Referring doctor',description:'Send a referral and preserve the relevant medical context for the next clinician.'},
 {name:'Appointment',role:'Patient & care team',description:'Coordinate the next visit and communicate the appointment details.'},
 {name:'Follow-up',role:'Treating clinician',description:'Keep follow-up tasks, notifications and medical files connected to the care journey.'}
];
export default function SelectedWork(){
 const [step,setStep]=useState(0);
 return <section id="work" className="content work-section"><div className="wrap">
 <div className="sectionhead"><span className="mono accent">02 / Selected work</span><div><h2>Making connections<br/>work in practice.</h2><p>Two projects at the intersection of software, services and real needs.</p></div></div>
 <article className="feature-project">
   <div className="feature-label mono"><span>01 / Product exploration</span><span>Health technology</span></div>
   <div className="shifaa-cover">
     <div className="cover-meta mono"><span>SHIFAA / Connected care</span><span>Service blueprint — Concept</span></div>
     <div className="cover-brand"><div><span className="health-mark" aria-hidden="true">✳</span><strong>shifaa<span>.</span></strong></div><span className="arabic" lang="ar" dir="rtl">شفاء</span></div>
     <div className="care-map">
       <div className="care-map-head"><span className="mono">A patient's journey</span><span className="mono">Select a stage</span></div>
       <div className="care-steps">{flow.map((f,i)=><button key={f.name} type="button" className={i===step?'active':''} aria-pressed={i===step} onClick={()=>setStep(i)}><span className="mono">0{i+1}</span><b>{f.name}</b><small>{f.role}</small></button>)}</div>
       <div className="care-detail" aria-live="polite"><span className="care-pulse" aria-hidden="true"/><p>{flow[step].description}</p></div>
     </div>
     <div className="cover-meta mono"><span>Doctor ↔ Patient ↔ Care team</span><span>Conceptual visualization, not a product screenshot</span></div>
   </div>
   <div className="feature-description"><div><span className="mono accent">SHIFAA</span><h3>Care doesn't end<br/>at the first visit.</h3></div><div><p>A student product-development project exploring how doctors and patients can stay connected through referrals, appointments, medical files, notifications and follow-ups.</p><details className="case"><summary>Read case study notes</summary><div className="casebody"><div><h4>The problem</h4><p>Care transitions involve multiple actors and scattered information.</p></div><div><h4>Proposed solution</h4><p>A coordinated workflow that keeps the next step and related context visible.</p></div><div><h4>Design considerations</h4><p>Distinct clinician and patient views, clear next actions and continuity of records.</p></div><div><h4>Project documentation</h4><p>Individual contributions, implementation details and outcome metrics have not been supplied.</p></div></div></details></div></div>
 </article>
 <article className="feature-project bac-project">
   <div className="feature-label mono"><span>02 / Web application</span><span>Education technology</span></div>
   <div className="bac-cover"><div className="bac-brand"><span className="mono">An educational resource platform</span><strong>Bac<span>—</span><br/>pedia.</strong><span className="mono">Student / contributor / curator</span></div><div className="bac-schema"><div className="mono">Platform architecture / Overview</div><div className="schema-layer"><span>Student</span><span>Contributor</span><span>Admin</span></div><div className="schema-line" aria-hidden="true"/><div className="schema-box">Vite multi-page frontend</div><div className="schema-line" aria-hidden="true"/><div className="schema-layer"><span>Supabase<br/>Auth + data</span><span>Cloudflare<br/>Worker</span></div><small>Conceptual overview based on project documentation.</small></div></div>
   <div className="feature-description"><div><span className="mono accent">BAC-PEDIA 26</span><h3>Learning resources,<br/>organized by role.</h3></div><div><p>A web platform for educational resources, with distinct student, contributor and administrator experiences. Its public repository documents learning materials, resource review, authentication and access control.</p><div className="project-tech mono">Vite · JavaScript · Supabase · Cloudflare</div><a className="textlink" href="https://github.com/boukhariabdallahyasser-prog/Bac-pedia26">Explore the source code ↗</a></div></div>
 </article>
 </div></section>
}

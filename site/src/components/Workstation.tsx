import { useEffect,useRef,useState } from 'react';
import * as T from 'three';
import WorkstationFallback from './WorkstationFallback';
export default function Workstation(){
 const host=useRef<HTMLDivElement>(null);
 const [ready,setReady]=useState(false);
 useEffect(()=>{
  const el=host.current;if(!el)return;
  let renderer:T.WebGLRenderer;
  try{renderer=new T.WebGLRenderer({antialias:true,alpha:true,powerPreference:'low-power'});}catch{return;}
  renderer.setPixelRatio(Math.min(window.devicePixelRatio,1.6));renderer.outputColorSpace=T.SRGBColorSpace;renderer.toneMapping=T.ACESFilmicToneMapping;renderer.toneMappingExposure=1.35;
  el.appendChild(renderer.domElement);
  const scene=new T.Scene();const camera=new T.PerspectiveCamera(35,1,.1,100);camera.position.set(0,4.6,12.4);camera.lookAt(0,1.25,0);
  scene.add(new T.HemisphereLight(0xc6d8ff,0x3d3046,2.1));
  const key=new T.DirectionalLight(0xe4e2ff,3.15);key.position.set(-4,7,6);scene.add(key);
  const rim=new T.DirectionalLight(0x7954ff,1.5);rim.position.set(5,3,-4);scene.add(rim);
  const desk=new T.Group();scene.add(desk);
  const mat=(color:number,metalness=.1,roughness=.55)=>new T.MeshStandardMaterial({color,metalness,roughness});
  const black=mat(0x101115,.4,.45), dark=mat(0x282a32,.45,.42), steel=mat(0x555860,.5,.4), keymat=mat(0x171923,.2,.7);
  function box(w:number,h:number,d:number,x:number,y:number,z:number,m:T.Material,parent:T.Object3D=desk){const mesh=new T.Mesh(new T.BoxGeometry(w,h,d),m);mesh.position.set(x,y,z);parent.add(mesh);return mesh;}
  function disc(radius:number,depth:number,x:number,y:number,z:number,m:T.Material,parent:T.Object3D=desk){const mesh=new T.Mesh(new T.CylinderGeometry(radius,radius,depth,40),m);mesh.rotation.x=Math.PI/2;mesh.position.set(x,y,z);parent.add(mesh);return mesh;}
  const tableCanvas=document.createElement('canvas');tableCanvas.width=512;tableCanvas.height=256;
  const tc=tableCanvas.getContext('2d');
  if(tc){tc.fillStyle='#55555c';tc.fillRect(0,0,512,256);for(let i=0;i<900;i++){const y=(i*73)%256;tc.strokeStyle=i%3===0?'#60616a22':'#24263115';tc.beginPath();tc.moveTo((i*13)%512,y);tc.lineTo((i*13)%512+30+(i*7)%96,y+(i%3));tc.stroke();}}
  const tableTex=new T.CanvasTexture(tableCanvas);tableTex.colorSpace=T.SRGBColorSpace;const tableMat=new T.MeshStandardMaterial({map:tableTex,roughness:.8,metalness:.12});
  box(11,.22,4.3,0,-.13,.45,tableMat);
  box(4.6,2.57,.22,-.65,2.05,-.72,black);box(4.44,2.40,.04,-.65,2.08,-.59,dark);
  const canvas=document.createElement('canvas');canvas.width=1024;canvas.height=576;const ctx=canvas.getContext('2d');
  if(ctx){ctx.fillStyle='#191d27';ctx.fillRect(0,0,1024,576);ctx.fillStyle='#292d3c';ctx.fillRect(0,0,1024,39);ctx.fillStyle='#202530';ctx.fillRect(0,39,218,537);ctx.font='18px monospace';ctx.fillStyle='#d3dae8';ctx.fillText('SPIDER  /  portfolio',20,27);ctx.fillStyle='#a8b1c5';ctx.fillText('EXPLORER',18,71);
   const tree=['site','  src','    components','      Hero.tsx','      Network.tsx','      Projects.tsx','    data','    App.tsx','    styles.css','  package.json','  vite.config.ts'];tree.forEach((s,i)=>{ctx.fillStyle=i===3?'#84c8ff':'#aeb8cb';ctx.fillText(s,18,105+i*33);});
   const lines=['import { useState } from "react";','','export default function Portfolio() {','  const [idea, setIdea] = useState(null);','','  return (','    <main>','      <Hero />','      <Projects />','      <About />','    </main>','  );','}','','// Everything is connected.'];
   lines.forEach((s,i)=>{ctx.fillStyle='#657187';ctx.fillText(String(i+1),238,76+i*30);ctx.fillStyle=['#c792ea','#afc8ea','#82aaff','#c3e88d'][i%4];ctx.fillText(s,280,76+i*30);});
   ctx.fillStyle='#7054bf';ctx.fillRect(0,553,1024,23);ctx.fillStyle='#fff';ctx.font='15px monospace';ctx.fillText('main  •  TypeScript React                                  UTF-8',16,569);
  }
  const screenTex=new T.CanvasTexture(canvas);screenTex.colorSpace=T.SRGBColorSpace;const screen=new T.Mesh(new T.PlaneGeometry(4.35,2.32),new T.MeshBasicMaterial({map:screenTex}));screen.position.set(-.65,2.08,-.558);desk.add(screen);
  box(.42,.66,.25,-.65,.49,-.7,dark);box(1.75,.12,.86,-.65,.10,-.51,steel);
  // Tower with a glass side and two RGB cooling fans.
  const tower=new T.Group();tower.position.set(3.75,0,-.10);tower.rotation.y=-.18;desk.add(tower);
  box(1.43,2.55,1.63,0,1.28,0,black,tower);box(1.33,2.42,.08,0,1.28,.85,dark,tower);
  box(.06,2.35,1.46,-.73,1.29,0,new T.MeshStandardMaterial({color:0x333949,transparent:true,opacity:.48,roughness:.24,metalness:.6}),tower);
  const fanGroups:T.Group[]=[];
  function fan(x:number,y:number,z:number,r:number,parent:T.Object3D){
    const group=new T.Group();group.position.set(x,y,z);parent.add(group);
    disc(r*.93,.06,0,0,0,black,group);
    for(let i=0;i<36;i++){const arc=new T.Mesh(new T.TorusGeometry(r,.035,8,6,Math.PI/18),new T.MeshBasicMaterial({color:new T.Color().setHSL((i/36+.68)%1,.85,.58)}));arc.rotation.z=i*Math.PI/18;arc.position.z=.05;group.add(arc);}
    const rotor=new T.Group();rotor.position.z=.08;group.add(rotor);fanGroups.push(rotor);
    for(let i=0;i<7;i++){const blade=box(r*.20,r*.60,.025,0,r*.34,0,steel,rotor);const angle=i*Math.PI*2/7;blade.position.x=-Math.sin(angle)*r*.34;blade.position.y=Math.cos(angle)*r*.34;blade.rotation.z=angle+.25;}
    disc(r*.25,.09,0,0,.12,dark,group);
  }
  fan(0,.78,.91,.48,tower);fan(0,1.86,.91,.48,tower);
  box(.48,.055,.025,0,.24,.91,new T.MeshBasicMaterial({color:0x56d3ef}),tower);
  for(let i=0;i<9;i++)box(1.05,.018,.037,0,2.565,-.5+i*.12,steel,tower);
  for(const x of [-3.25,1.92]){box(.51,.9,.5,x,.45,-.1,black);fan(x,.58,.18,.17,desk);disc(.077,.035,x,.23,.19,steel);}
  // RGB keyboard, mouse and mouse mat.
  box(3.25,.10,1.02,-.83,.08,1.41,black);box(3.16,.025,.94,-.83,.137,1.41,new T.MeshBasicMaterial({color:0x5e35ae}));
  for(let row=0;row<5;row++)for(let col=0;col<16;col++){const m=keymat;box(.166,.06,.138,-2.27+col*.19,.178,.99+row*.19,m);if(row===4)box(.166,.014,.035,-2.27+col*.19,.16,1.82,new T.MeshBasicMaterial({color:new T.Color().setHSL(col/16,.85,.46)}));}
  box(1.78,.025,1.28,1.83,.022,1.48,mat(0x252331));
  for(let i=0;i<4;i++){const l=box(1.25,.007,.017,1.83,.04,1.03+i*.30,new T.MeshBasicMaterial({color:0x8755dd}));l.rotation.y=i%2?.14:-.14;}
  const mouse=new T.Mesh(new T.SphereGeometry(1,32,16),black);mouse.scale.set(.23,.12,.39);mouse.position.set(1.84,.145,1.45);desk.add(mouse);
  box(.055,.04,.26,1.84,.24,1.45,new T.MeshBasicMaterial({color:0xa66bff}));
  const cable=new T.CatmullRomCurve3([new T.Vector3(-.65,.1,-.25),new T.Vector3(-2,.05,.4),new T.Vector3(-1.8,.05,.85),new T.Vector3(-1,.05,.86)]);desk.add(new T.Mesh(new T.TubeGeometry(cable,32,.018,6,false),black));
  const reduce=window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  let offset=0,target=0,frame=0,visible=true,last=performance.now();
  const resize=()=>{const w=el.clientWidth,h=el.clientHeight;if(!w||!h)return;renderer.setSize(w,h);camera.aspect=w/h;camera.position.z=camera.aspect<1.5?15.5:12.4;camera.updateProjectionMatrix();renderer.render(scene,camera);};
  const ro=new ResizeObserver(resize);ro.observe(el);resize();
  const io=new IntersectionObserver(([entry])=>{visible=entry.isIntersecting;});io.observe(el);
  const pointer=(e:PointerEvent)=>{if(!reduce&&e.pointerType==='mouse'){const rect=el.getBoundingClientRect();target=(e.clientX-rect.left)/rect.width*.22-.11;}};
  const leave=()=>{target=0;};el.addEventListener('pointermove',pointer);el.addEventListener('pointerleave',leave);
  function tick(now:number){frame=requestAnimationFrame(tick);const dt=Math.min((now-last)/1000,.05);last=now;if(!visible||reduce)return;offset+=(target-offset)*.07;desk.rotation.y=offset;fanGroups.forEach(g=>g.rotation.z+=dt*2.8);renderer.render(scene,camera);}
  frame=requestAnimationFrame(tick);setReady(true);
  return ()=>{cancelAnimationFrame(frame);ro.disconnect();io.disconnect();el.removeEventListener('pointermove',pointer);el.removeEventListener('pointerleave',leave);const materials=new Set<T.Material>();scene.traverse(obj=>{if(obj instanceof T.Mesh){obj.geometry.dispose();(Array.isArray(obj.material)?obj.material:[obj.material]).forEach(m=>materials.add(m));}});materials.forEach(m=>m.dispose());tableTex.dispose();screenTex.dispose();renderer.dispose();renderer.domElement.remove();};
 },[]);
 return <div className="station-scene">{!ready&&<WorkstationFallback/>}<div ref={host} className="station-canvas" aria-label="Interactive three-dimensional desktop computer illustration" role="img"/></div>;
}

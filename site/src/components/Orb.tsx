import { useEffect,useRef,useState } from 'react';
import * as T from 'three';
import { RoomEnvironment } from 'three/addons/environments/RoomEnvironment.js';
import { RoundedBoxGeometry } from 'three/addons/geometries/RoundedBoxGeometry.js';

export default function Orb({speaking=false}:{speaking?:boolean}){
 const host=useRef<HTMLDivElement>(null);
 const talk=useRef(speaking);talk.current=speaking;
 const [ready,setReady]=useState(false);
 useEffect(()=>{
  const el=host.current;if(!el)return;
  let renderer:T.WebGLRenderer;
  try{renderer=new T.WebGLRenderer({alpha:true,antialias:true,powerPreference:'low-power'});}catch{return;}
  renderer.setPixelRatio(Math.min(devicePixelRatio,1.8));renderer.outputColorSpace=T.SRGBColorSpace;renderer.toneMapping=T.ACESFilmicToneMapping;renderer.toneMappingExposure=1.3;
  el.appendChild(renderer.domElement);const scene=new T.Scene();
  const camera=new T.PerspectiveCamera(36,1,.1,50);camera.position.set(0,0,8.9);
  const envGen=new T.PMREMGenerator(renderer),room=new RoomEnvironment(),env=envGen.fromScene(room,.04);scene.environment=env.texture;scene.environmentIntensity=.85;room.dispose();
  const key=new T.DirectionalLight(0xe5f2ff,3);key.position.set(-3,4,5);scene.add(key);
  const rim=new T.DirectionalLight(0x55aaff,5);rim.position.set(2,-1,-3);scene.add(rim);
  const fill=new T.DirectionalLight(0x9ad8ff,1.4);fill.position.set(4,2,3);scene.add(fill);
  const orb=new T.Group();scene.add(orb);
  const framework=new T.Group();scene.add(framework);
  const ringMat=new T.MeshPhysicalMaterial({color:0x92c5ed,metalness:.9,roughness:.24,transparent:true,opacity:.82,emissive:0x123957,emissiveIntensity:.3});
  for(let i=0;i<2;i++){const orbitRing=new T.Mesh(new T.TorusGeometry(2.0+i*.22,.025,10,100),ringMat);orbitRing.rotation.set(.87+i*.68,.38+i*.88,.4);framework.add(orbitRing)}
  const facets=new T.Group();scene.add(facets);
  const facetMat=new T.MeshPhysicalMaterial({color:0x9ab7d1,metalness:.92,roughness:.23,clearcoat:1});
  const gemGeo=new T.IcosahedronGeometry(.18,0);
  for(let i=0;i<6;i++){const a=i*Math.PI/3;const gem=new T.Mesh(gemGeo,facetMat);gem.position.set(Math.cos(a)*2.27,Math.sin(a)*1.68,Math.sin(a*2)*.5);gem.rotation.set(i*.7,i*.3,i);facets.add(gem)}

  const shell=new T.MeshPhysicalMaterial({color:0x10141c,metalness:.88,roughness:.18,clearcoat:1,clearcoatRoughness:.12,envMapIntensity:1.2});
  orb.add(new T.Mesh(new T.SphereGeometry(1.55,80,56),shell));
  const seam=new T.Mesh(new T.TorusGeometry(1.55,.009,8,100),new T.MeshStandardMaterial({color:0x151e2c,metalness:.8,roughness:.25}));seam.rotation.x=Math.PI/2;orb.add(seam);
  const face=new T.Group();face.position.z=1.48;orb.add(face);
  const eyeMat=new T.MeshBasicMaterial({color:0x8eddff});
  const eyes=[-.31,.31].map(x=>{const e=new T.Mesh(new RoundedBoxGeometry(.17,.55,.05,5,.07),eyeMat);e.position.x=x;face.add(e);return e;});
  const haloCanvas=document.createElement('canvas');haloCanvas.width=128;haloCanvas.height=128;const ctx=haloCanvas.getContext('2d');
  if(ctx){const g=ctx.createRadialGradient(64,64,1,64,64,64);g.addColorStop(0,'rgba(99,196,255,.23)');g.addColorStop(.4,'rgba(62,165,255,.11)');g.addColorStop(1,'rgba(0,80,255,0)');ctx.fillStyle=g;ctx.fillRect(0,0,128,128);}
  const glowTex=new T.CanvasTexture(haloCanvas);
  for(const x of [-.31,.31]){const g=new T.Sprite(new T.SpriteMaterial({map:glowTex,transparent:true,depthWrite:false,blending:T.AdditiveBlending}));g.position.set(x,0,.06);g.scale.set(.95,1.15,1);face.add(g);}
  const reduced=matchMedia('(prefers-reduced-motion: reduce)').matches;let targetX=0,targetY=0,frame=0,visible=true;
  const resize=()=>{const w=el.clientWidth,h=el.clientHeight;if(!w||!h)return;renderer.setSize(w,h);camera.aspect=w/h;camera.position.z=camera.aspect<1?12.5:10.6;camera.updateProjectionMatrix();renderer.render(scene,camera)};
  const ro=new ResizeObserver(resize);ro.observe(el);resize();
  const io=new IntersectionObserver(([e])=>{visible=e.isIntersecting});io.observe(el);
  const move=(e:PointerEvent)=>{if(e.pointerType==='mouse'){targetX=(e.clientX/innerWidth-.5)*.55;targetY=(e.clientY/innerHeight-.5)*.38;}};
  const reset=()=>{targetX=targetY=0};window.addEventListener('pointermove',move);document.addEventListener('pointerleave',reset);
  const start=performance.now();
  function tick(now:number){frame=requestAnimationFrame(tick);if(!visible||reduced)return;const t=(now-start)/1000;orb.rotation.y+=(targetX-orb.rotation.y)*.045;orb.rotation.x+=(targetY-orb.rotation.x)*.045;orb.position.y=Math.sin(t*1.35)*.075;framework.rotation.y=t*.15;framework.rotation.z=Math.sin(t*.45)*.12;facets.rotation.z=t*.09;facets.children.forEach((o,i)=>{o.rotation.y=t*.32+i;});const blink=t%4.8;const scale=blink<.16?Math.max(.07,Math.abs(blink-.08)/.08):talk.current?.65+.35*Math.abs(Math.sin(t*11)):1;eyes.forEach(e=>e.scale.y=scale);renderer.render(scene,camera);}
  frame=requestAnimationFrame(tick);setReady(true);
  return ()=>{cancelAnimationFrame(frame);ro.disconnect();io.disconnect();window.removeEventListener('pointermove',move);document.removeEventListener('pointerleave',reset);const mats=new Set<T.Material>();scene.traverse(o=>{if(o instanceof T.Mesh){o.geometry.dispose();(Array.isArray(o.material)?o.material:[o.material]).forEach(m=>mats.add(m))}else if(o instanceof T.Sprite)mats.add(o.material)});mats.forEach(m=>m.dispose());glowTex.dispose();env.dispose();envGen.dispose();renderer.dispose();renderer.domElement.remove()};
 },[]);
 return <div className="b-orb-scene" aria-hidden="true">{!ready&&<div className="b-orb-fallback"><i/><i/></div>}<div ref={host} className="b-orb-canvas"/></div>;
}

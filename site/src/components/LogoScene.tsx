import { useEffect,useRef,useState } from 'react';
import * as T from 'three';
import { SVGLoader } from 'three/addons/loaders/SVGLoader.js';
import { RoomEnvironment } from 'three/addons/environments/RoomEnvironment.js';
import { logoSvg } from '../data/logo';
import Logo from './Logo';
export default function LogoScene(){
 const host=useRef<HTMLDivElement>(null);const [ready,setReady]=useState(false);
 useEffect(()=>{
 const el=host.current;if(!el)return;let r:T.WebGLRenderer;try{r=new T.WebGLRenderer({alpha:true,antialias:true,powerPreference:'low-power'})}catch{return}
 r.setPixelRatio(Math.min(devicePixelRatio,1.5));r.outputColorSpace=T.SRGBColorSpace;r.toneMapping=T.ACESFilmicToneMapping;r.toneMappingExposure=1.25;el.appendChild(r.domElement);
 const scene=new T.Scene(),camera=new T.PerspectiveCamera(35,1,.1,60);camera.position.set(0,0,10);
 const pmrem=new T.PMREMGenerator(r),room=new RoomEnvironment(),env=pmrem.fromScene(room,.05);scene.environment=env.texture;room.dispose();
 const light=new T.DirectionalLight(0xffffff,4);light.position.set(-3,4,5);scene.add(light);
 const blue=new T.DirectionalLight(0x69baff,5);blue.position.set(4,-2,2);scene.add(blue);
 const side=new T.DirectionalLight(0xffffff,3);side.position.set(1,1,-4);scene.add(side);
 const group=new T.Group();scene.add(group);const glyph=new T.Group();group.add(glyph);
 const silver=new T.MeshPhysicalMaterial({color:0xdce5ee,metalness:.98,roughness:.25,clearcoat:1,clearcoatRoughness:.2});
 const points=new SVGLoader().parse(logoSvg).paths;
 for(const path of points)for(const shape of SVGLoader.createShapes(path)){const geo=new T.ExtrudeGeometry(shape,{depth:5,bevelEnabled:true,bevelSize:.6,bevelThickness:1.3,bevelSegments:3,steps:1,curveSegments:5});geo.translate(-115,-74,-2.5);const mesh=new T.Mesh(geo,silver);glyph.add(mesh)}
 glyph.scale.set(.035,-.035,.035);
 const orbit=new T.Group();scene.add(orbit);
 const orbitMat=new T.MeshBasicMaterial({color:0x69baff,transparent:true,opacity:.32});
 for(let i=0;i<3;i++){const ring=new T.Mesh(new T.TorusGeometry(3.0+i*.34,.009,6,96),orbitMat);ring.rotation.set(.82+i*.21,.4+i*.55,i*.3);orbit.add(ring)}
 const reduced=matchMedia('(prefers-reduced-motion: reduce)').matches;let frame=0,tx=0,ty=0;
 const resize=()=>{const w=el.clientWidth,h=el.clientHeight;if(!w||!h)return;r.setSize(w,h);camera.aspect=w/h;camera.position.z=camera.aspect<1.3?12:10;camera.updateProjectionMatrix();r.render(scene,camera)};
 const observer=new ResizeObserver(resize);observer.observe(el);resize();
 const move=(e:PointerEvent)=>{tx=(e.clientX/innerWidth-.5)*.45;ty=(e.clientY/innerHeight-.5)*.28};window.addEventListener('pointermove',move);
 const start=performance.now();
 function tick(now:number){frame=requestAnimationFrame(tick);if(reduced)return;const t=(now-start)/1000;const reveal=Math.min(t/1.55,1);const ease=1-(1-reveal)**3;group.rotation.y=(1-ease)*1.2+Math.sin(t*.67)*.12+tx;group.rotation.x=Math.sin(t*.75)*.055+ty;group.scale.setScalar(.72+.28*ease);orbit.rotation.y=t*.18;orbit.rotation.z=t*.07;r.render(scene,camera)}
 frame=requestAnimationFrame(tick);setReady(true);
 return()=>{cancelAnimationFrame(frame);observer.disconnect();window.removeEventListener('pointermove',move);scene.traverse(o=>{if(o instanceof T.Mesh)o.geometry.dispose()});silver.dispose();orbitMat.dispose();env.dispose();pmrem.dispose();r.dispose();r.domElement.remove()};
 },[]);
 return <div className="entry-logo-stage">{!ready&&<Logo className="entry-logo-fallback"/>}<div className="entry-logo-canvas" ref={host} aria-hidden="true"/></div>
}

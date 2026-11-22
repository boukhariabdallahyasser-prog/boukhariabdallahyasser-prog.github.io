import { useEffect,useRef,useState } from 'react';
import * as T from 'three';
import { RoundedBoxGeometry } from 'three/addons/geometries/RoundedBoxGeometry.js';
import { RoomEnvironment } from 'three/addons/environments/RoomEnvironment.js';
import ShapeFallback from './ShapeFallback';
export default function ShapeScene(){
 const host=useRef<HTMLDivElement>(null);
 const [ready,setReady]=useState(false);
 useEffect(()=>{
 const el=host.current;if(!el)return;
 let renderer:T.WebGLRenderer;
 try{renderer=new T.WebGLRenderer({alpha:true,antialias:true,powerPreference:'high-performance'});}catch{return;}
 renderer.setPixelRatio(Math.min(devicePixelRatio,1.5));renderer.outputColorSpace=T.SRGBColorSpace;renderer.toneMapping=T.ACESFilmicToneMapping;renderer.toneMappingExposure=1.2;
 renderer.domElement.style.touchAction='pan-y';el.appendChild(renderer.domElement);
 const scene=new T.Scene();const camera=new T.OrthographicCamera(-9,9,5,-5,.1,100);camera.position.set(0,5.0,19);camera.lookAt(0,3.0,0);
 const pmrem=new T.PMREMGenerator(renderer);const room=new RoomEnvironment();const env=pmrem.fromScene(room,.04);scene.environment=env.texture;scene.environmentIntensity=.8;room.dispose();
 scene.add(new T.AmbientLight(0xffffff,.6));const light=new T.DirectionalLight(0xf2fff6,3.0);light.position.set(-5,9,7);scene.add(light);const rim=new T.DirectionalLight(0x42ff8a,4.3);rim.position.set(5,-.2,-3);scene.add(rim);const fill=new T.DirectionalLight(0x8bffbc,1.5);fill.position.set(-3,2,6);scene.add(fill);
 const silver=new T.MeshPhysicalMaterial({color:0xb8c2ba,metalness:.95,roughness:.26,clearcoat:1,clearcoatRoughness:.14});
 const green=new T.MeshPhysicalMaterial({color:0x37e77b,metalness:.07,roughness:.17,transmission:.58,thickness:.85,ior:1.5,clearcoat:1,envMapIntensity:1.15,emissive:0x0d4c27,emissiveIntensity:.30});
 const charcoal=new T.MeshStandardMaterial({color:0x121713,roughness:.84,metalness:.15});
 const triangle=new T.Shape();triangle.moveTo(-.68,-.39);triangle.lineTo(.68,-.39);triangle.lineTo(0,.79);triangle.closePath();
 const triGeo=new T.ExtrudeGeometry(triangle,{depth:.36,bevelEnabled:true,bevelSize:.13,bevelThickness:.12,bevelSegments:5,steps:1,curveSegments:12});triGeo.translate(0,-.08,-.18);
 const boxGeo=new RoundedBoxGeometry(1.36,1.36,1.15,5,.16);const ringGeo=new T.TorusGeometry(.58,.25,24,56);
 const ground=new T.Mesh(new T.PlaneGeometry(36,9),new T.MeshStandardMaterial({color:0x101b13,roughness:.8,metalness:.16,transparent:true,opacity:.75}));ground.rotation.x=-Math.PI/2;ground.position.set(0,-.04,0);scene.add(ground);
 const strip=new T.Mesh(new T.BoxGeometry(17,.045,.05),new T.MeshBasicMaterial({color:0x50ff8f}));strip.position.set(0,0,2.8);scene.add(strip);
 const group=new T.Group();scene.add(group);
 type ShapeType='triangle'|'box'|'ring';
 function shape(kind:ShapeType,x:number,y:number,z:number,rx:number,ry:number,rz:number,scale=1){const mesh=new T.Mesh(kind==='triangle'?triGeo:kind==='box'?boxGeo:ringGeo,kind==='triangle'?green:kind==='box'?silver:charcoal);mesh.position.set(x,y,z);mesh.rotation.set(rx,ry,rz);mesh.scale.setScalar(scale);group.add(mesh);return mesh;}
 shape('box',-7.3,.64,-.8,0,.13,.03);shape('box',-5.25,.82,1,.12,-.3,-.28,1.1);shape('box',-3.85,.9,.45,.2,.14,.7,1.14);shape('box',-1.3,.65,.5,.07,.22,-.07);shape('box',.12,.72,.4,.08,-.12,-.05);shape('box',3.4,.7,1.0,0,.08,.04);shape('box',5.1,.7,.7,.04,-.15,0);shape('box',6.9,.7,-.1,0,.21,0);shape('box',5.5,1.9,-.9,.3,-.25,-.2);
 shape('triangle',-6.5,1.22,-.1,.1,.4,.12,1.4);shape('triangle',-4.55,1.75,-.6,.19,-.4,.82,1.15);shape('triangle',-2.85,.63,.9,.03,.24,-.15,1.1);shape('triangle',-2.03,.55,2,.1,.3,.1,.95);shape('triangle',-7.0,.5,1.5,.2,.2,0,.9);
 shape('ring',-5.9,.81,1.75,.24,.45,.1,1.2);shape('ring',-7.4,.24,2.1,Math.PI/2,0,.2,1.2);shape('ring',3.4,1.55,-.35,.3,.1,1,1.25);shape('ring',4.45,2.2,-1.1,.15,1.25,.3,1.1);shape('ring',6.2,.26,2.1,Math.PI/2,.1,.2,1.3);
 const drops=[shape('triangle',4.45,7.4,0,.2,-.3,.45,1.18),shape('triangle',6.5,5.6,-.15,-.4,.3,-1.1,1.2),shape('triangle',4.1,5.9,.3,.35,-.8,.12,1.05),shape('triangle',4.7,3.8,.5,-.3,-.4,1.35,1.1),shape('triangle',7.4,4.3,0,.35,.8,-1.45,1.1),shape('triangle',6.15,9.3,-.6,.4,.1,.4,1.25)];
 const reduced=matchMedia('(prefers-reduced-motion: reduce)').matches;
 const initial=drops.map(m=>({y:m.position.y,x:m.position.x,rx:m.rotation.x,ry:m.rotation.y,rz:m.rotation.z}));
 let frame=0,visible=true,px=0,py=0;const start=performance.now();
 const resize=()=>{const w=el.clientWidth,h=el.clientHeight;if(!w||!h)return;renderer.setSize(w,h);const ratio=w/h;const viewWidth=ratio<1.2?17:18;const viewHeight=viewWidth/ratio;camera.left=-viewWidth/2;camera.right=viewWidth/2;camera.top=viewHeight/2;camera.bottom=-viewHeight/2;camera.position.set(0,5,19);camera.lookAt(0,ratio<1.2?4:3.45,0);camera.updateProjectionMatrix();renderer.render(scene,camera);};
 const ro=new ResizeObserver(resize);ro.observe(el);resize();const io=new IntersectionObserver(([e])=>{visible=e.isIntersecting});io.observe(el);
 const pointer=(e:PointerEvent)=>{const r=el.getBoundingClientRect();px=((e.clientX-r.left)/r.width-.5)*.8;py=((e.clientY-r.top)/r.height-.5)*.4;};const leave=()=>{px=py=0};el.addEventListener('pointermove',pointer);el.addEventListener('pointerleave',leave);
 const tick=(now:number)=>{frame=requestAnimationFrame(tick);if(!visible||reduced)return;const t=(now-start)*.001;drops.forEach((m,i)=>{const p=initial[i];m.position.y=p.y+Math.sin(t*.75+i*1.3)*.32;m.position.x=p.x+Math.sin(t*.6+i)*.18+px*.28;m.rotation.x=p.rx+Math.sin(t*.85+i)*.2;m.rotation.y=p.ry+t*.19*(i%2?1:-1);m.rotation.z=p.rz+Math.sin(t*.7+i)*.13;});group.rotation.y+=(px*.08-group.rotation.y)*.035;group.position.y+=(py*.06-group.position.y)*.035;renderer.render(scene,camera);};
 frame=requestAnimationFrame(tick);setReady(true);
 return ()=>{cancelAnimationFrame(frame);ro.disconnect();io.disconnect();el.removeEventListener('pointermove',pointer);el.removeEventListener('pointerleave',leave);const gs=new Set<T.BufferGeometry>(),ms=new Set<T.Material>();scene.traverse(o=>{if(o instanceof T.Mesh){gs.add(o.geometry);(Array.isArray(o.material)?o.material:[o.material]).forEach(m=>ms.add(m));}});gs.forEach(g=>g.dispose());ms.forEach(m=>m.dispose());env.dispose();pmrem.dispose();renderer.dispose();renderer.domElement.remove();};
 },[]);
 return <div className="shape-stage">{!ready&&<ShapeFallback/>}<div className="shape-canvas" ref={host} role="img" aria-label="Animated three-dimensional glass triangles, metallic cubes and dark rings"/></div>;
}

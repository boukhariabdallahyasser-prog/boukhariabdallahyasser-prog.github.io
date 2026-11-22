export type NodeId = 'engineering'|'development'|'projects'|'design'|'learning'|'experience';
export type NetworkNode = {id:NodeId; number:string; label:string; x:number; y:number; description:string; href:string};
export const nodes: readonly NetworkNode[] = [
{id:'engineering',number:'01',label:'Engineering',x:155,y:72,description:'Understand the structures behind software.',href:'#skills'},
{id:'development',number:'02',label:'Development',x:490,y:72,description:'Turn ideas into usable interfaces.',href:'#skills'},
{id:'projects',number:'03',label:'Projects',x:565,y:166,description:'Ideas made tangible through working products.',href:'#work'},
{id:'design',number:'04',label:'Design',x:490,y:256,description:'Visual thinking, identity and interfaces.',href:'#creative'},
{id:'learning',number:'05',label:'Learning',x:155,y:256,description:'Explore new tools and deeper concepts.',href:'#learning'},
{id:'experience',number:'06',label:'Experience',x:95,y:166,description:'Education and student activities.',href:'#experience'},
];
export function getNode(id:NodeId):NetworkNode {
  const node=nodes.find(n=>n.id===id);
  if(!node) throw new Error('Unknown network node: '+id);
  return node;
}

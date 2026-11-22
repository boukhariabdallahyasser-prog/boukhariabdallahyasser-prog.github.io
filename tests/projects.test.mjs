import test from 'node:test';
import assert from 'node:assert/strict';
import {existsSync,readFileSync} from 'node:fs';
import {projects} from '../site/src/data/projects.ts';
import {groups} from '../site/src/data/stack.ts';
test('projects have unique IDs, cover assets, alt text, and details',()=>{assert.equal(new Set(projects.map(p=>p.id)).size,projects.length);for(const p of projects){assert.ok(existsSync(new URL('../site/public'+p.image,import.meta.url)));assert.ok(p.alt&&p.summary&&p.sections.length>=3);}});
test('stack clearly identifies learning and portfolio technologies',()=>{const items=groups.flatMap(g=>g.items);assert.ok(items.length>=20);for(const n of ['React','TypeScript','Node.js','Three.js','Motion','Supabase'])assert.ok(items.some(p=>p.name===n),n);assert.equal(items.find(p=>p.name==='React').status,'Exploring');});
test('3D orb remains mounted in hero and the modal is user-triggered',()=>{const hero=readFileSync(new URL('../site/src/components/Hero.tsx',import.meta.url),'utf8');const gallery=readFileSync(new URL('../site/src/components/SelectedWork.tsx',import.meta.url),'utf8');assert.ok(hero.includes('<Orb speaking={speaking}'));assert.ok(gallery.includes('d.showModal()'));assert.ok(gallery.includes('setSelected(project)'));});

import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
const source=p=>readFileSync(new URL('../site/src/components/'+p+'.tsx',import.meta.url),'utf8');
test('contact explicitly uses clipboard and LinkedIn, not fake delivery',()=>{let s=source('Contact');assert.ok(s.includes('navigator.clipboard.writeText'));assert.ok(s.includes('Nothing is sent or stored'));assert.ok(s.includes('linkedin.com/in/'));});
test('the technology showcase includes a motion pause and reduced-motion support',()=>{let s=source('Stack');assert.ok(s.includes('setPaused'));assert.ok(s.includes('useReducedMotion'));assert.ok(s.includes('tech-track'));});
test('hero has retained 3D orb and added depth motion',()=>{let s=source('Hero');assert.ok(s.includes('<Orb speaking={speaking}'));assert.ok(s.includes('useTransform'));assert.ok(source('Orb').includes('ShaderMaterial'));});

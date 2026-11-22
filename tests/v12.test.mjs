import test from 'node:test';import assert from 'node:assert/strict';import {readFileSync} from 'node:fs';
const read=p=>readFileSync(new URL('../'+p,import.meta.url),'utf8');
test('lightweight auto intro has an independent completion timer and dimensional logo',()=>{const intro=read('site/src/components/Entrance.tsx');assert.ok(intro.includes('setTimeout'));assert.ok(intro.includes('translateZ'));assert.ok(!intro.includes('showModal'));assert.ok(!intro.includes("import('./LogoScene')"));});
test('the guide provides immediate FAQ responses and keeps actual project links',()=>{const guide=read('site/src/components/PortfolioGuide.tsx');assert.ok(guide.includes("answer(q)]"));assert.ok(!guide.includes('setTimeout'));assert.ok(guide.includes('Bac-pedia26'));});

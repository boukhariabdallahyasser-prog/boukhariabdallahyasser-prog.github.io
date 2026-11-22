import test from 'node:test';
import assert from 'node:assert/strict';
import { nodes, getNode } from '../site/src/data/network.ts';
import { readFileSync } from 'node:fs';
test('network has six distinct, labelled nodes',()=>{assert.equal(nodes.length,6);assert.equal(new Set(nodes.map(n=>n.id)).size,6);for(const n of nodes){assert.equal(getNode(n.id),n);assert.ok(n.label&&n.description)}});
test('all network section targets exist',()=>{const files=['About','SelectedWork','Skills','Experience','Creative','Learning','Contact'];const source=files.map(f=>readFileSync(new URL('../site/src/components/'+f+'.tsx',import.meta.url),'utf8')).join('');for(const n of nodes)assert.ok(source.includes('id="'+n.href.slice(1)+'"'),n.href)});

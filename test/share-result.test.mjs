import test from 'node:test';
import assert from 'node:assert/strict';
import {analyse} from '../dist/engine.mjs';
import {shareResult} from '../dist/share-result.mjs';
test('share model includes the selected win and board but never submitted text or evidence',()=>{
 const result=analyse('SECRET futures speculative participatory co-design reimagine');
 const share=shareResult(result,'row-0');
 assert.equal(share.name,'Possible Worlds');
 assert.equal(share.squares.length,25);
 assert.equal(share.squares.filter(s=>s.winning).length,5);
 assert.equal(share.squares[12].marked,true);
 assert.equal(JSON.stringify(share).includes('SECRET'),false);
 assert.equal(share.text,'Possible Worlds. My hopecore bingo on Carem Ipsum.');
});
test('cannot share an unearned prize',()=>{
 assert.throws(()=>shareResult(analyse(''),'row-0'),/completed/);
});

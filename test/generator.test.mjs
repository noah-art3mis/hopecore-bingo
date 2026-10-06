import {test} from 'node:test';
import assert from 'node:assert/strict';
import {generate} from '../dist/generator.mjs';

for (const register of ['academic','workshop','manifesto','exhibition']) {
  test(`${register} produces five distinct paragraphs and sentence openings even with constant randomness`,()=>{
    const text=generate({register,paragraphs:5,random:()=>0});
    const paragraphs=text.split('\n\n');
    assert.equal(paragraphs.length,5);
    assert.equal(new Set(paragraphs.map(p=>p.split(' ').slice(0,3).join(' '))).size,5);
    const sentences=text.match(/[^.!?]+[.!?]/g).map(s=>s.trim());
    assert.equal(new Set(sentences).size,sentences.length);
    assert.doesNotMatch(text,/undefined|\[object Object\]|\{\w+\}/);
  });
}

test('thematic selection changes subject matter and stays in the selected world',()=>{
  const ecology=generate({theme:'ecology',paragraphs:5,random:()=>0});
  const commons=generate({theme:'commons',paragraphs:5,random:()=>0});
  const futures=generate({theme:'futures',paragraphs:5,random:()=>0});
  assert.match(ecology,/soil|river|multispecies/);
  assert.doesNotMatch(ecology,/housing assembly|municipal budget/);
  assert.match(commons,/repair|commoning|commons/);
  assert.match(futures,/scenario|speculative|futures/);
  assert.notEqual(ecology,commons);
});

test('jargon dial adds expressive density without changing paragraph count',()=>{
  const base={theme:'ecology',paragraphs:2,random:()=>0};
  const low=generate({...base,density:'grounded'});
  const high=generate({...base,density:'cosmic'});
  assert.notEqual(low,high);
  assert.ok(high.split(/\s+/).length>low.split(/\s+/).length);
  assert.match(high,/entanglements|multispecies|relational/);
  assert.equal(high.split('\n\n').length,2);
});

test('seeded inputs reproduce output and invalid controls fail explicitly',()=>{
  assert.equal(generate({theme:'commons',random:()=>.2}),generate({theme:'commons',random:()=>.2}));
  for(const options of [{theme:'nope'},{density:'nope'},{paragraphs:1.5}]) assert.throws(()=>generate(options),RangeError);
});

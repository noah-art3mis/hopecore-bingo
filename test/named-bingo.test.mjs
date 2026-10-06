import {test} from 'node:test';
import assert from 'node:assert/strict';
import {analyse} from '../dist/engine.mjs';

const examples = [
  ['Possible Worlds','futures speculative participatory co-design reimagine'],
  ['Living Networks','fungi ecology more-than-human entangled relational'],
  ['Situated Care','embodied sensemaking grounded care'],
  ['Ancestral Commons','ancestral reclaim fabulation worlding collective'],
  ['Systemic Renewal','slowness systemic critical imaginaries transformation'],
  ['Deep Time','futures fungi embodied ancestral slowness'],
  ['Regenerative Inquiry','speculative ecology sensemaking reclaim systemic'],
  ['More-than-Human Assembly','participatory more-than-human fabulation critical'],
  ['Collective Worlding','co-design entangled grounded worlding imaginaries'],
  ['Cultures of Care','reimagine relational care collective transformation'],
  ['Ecological Horizons','futures ecology worlding transformation'],
  ['Patient Possibility','reimagine entangled reclaim slowness'],
];
for (const [name,text] of examples) {
  test(`${name} is earned only when its entire line is present`,()=>{
    assert.deepEqual(analyse(text).lines.map(line=>line.name),[name]);
    for (let i=0;i<text.split(' ').length;i++) {
      const partial=text.split(' ').filter((_,index)=>index!==i).join(' ');
      assert.deepEqual(analyse(partial).lines,[]);
    }
  });
}
test('intersecting named lines coexist and disappear when text is cleared',()=>{
  const result=analyse('futures speculative participatory co-design reimagine fungi embodied ancestral slowness');
  assert.deepEqual(result.lines.map(line=>line.name),['Possible Worlds','Deep Time']);
  assert.equal(result.matches.length,9);
  assert.deepEqual(analyse('').lines,[]);
});

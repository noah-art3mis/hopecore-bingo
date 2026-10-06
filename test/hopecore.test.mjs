import {test} from 'node:test';
import assert from 'node:assert/strict';
import {analyse, tropes, completedLines} from '../dist/engine.mjs';
import {generate} from '../dist/generator.mjs';

test('academic phrases mark distinct squares and retain original evidence', () => {
  const result = analyse('Speculative probes support participatory reflection on sociotechnical systems and desired futures.');
  for (const id of ['speculation', 'participation', 'systems', 'futures']) assert.ok(result.matches.some(m => m.id === id), id);
  assert.equal(result.matches.find(m => m.id === 'speculation').evidence[0].text, 'Speculative');
  for (const match of result.matches) for (const e of match.evidence) assert.equal(result.text.slice(e.start, e.end), e.text);
});

test('normalises punctuation, hyphens and word forms without substring false positives', () => {
  const result = analyse('MORE–THAN–HUMAN co-designers practise sensemaking and reimagining.');
  for (const id of ['nonhuman','codesign','sensemaking','reimagine']) assert.ok(result.matches.some(m => m.id === id), id);
  assert.equal(analyse('The careful mechanic repaired a futuristic motherboard.').matches.length, 0);
});

test('empty input has no matches and repeated words do not inflate square count', () => {
  assert.equal(analyse('').matches.length, 0);
  const result = analyse('Care care CARE.');
  assert.equal(result.matches.length, 1);
  assert.equal(result.matches[0].evidence.length, 3);
});

test('bingo recognises rows, columns and diagonals, with a free centre', () => {
  assert.deepEqual(completedLines([0,1,2,3,4]).map(line=>line.indices), [[0,1,2,3,4]]);
  assert.deepEqual(completedLines([0,5,10,15,20]).map(line=>line.indices), [[0,5,10,15,20]]);
  assert.deepEqual(completedLines([0,6,18,24]).map(line=>line.indices), [[0,6,12,18,24]]);
  assert.deepEqual(completedLines([4,8,16,20]).map(line=>line.indices), [[4,8,12,16,20]]);
  assert.equal(completedLines([]).length, 0);
});

test('generator returns requested paragraphs for both registers and uses the shared vocabulary', () => {
  for (const register of ['academic','workshop']) {
    const output = generate({register, paragraphs:3, random:()=>0.4});
    assert.equal(output.split('\n\n').length, 3);
    assert.ok(analyse(output).matches.length >= 5);
    assert.ok(!output.includes('undefined'));
  }
  assert.equal(tropes.length, 24);
});

test('generator validates controls and can vary its output', () => {
  assert.throws(()=>generate({paragraphs:0}), RangeError);
  assert.throws(()=>generate({paragraphs:8}), RangeError);
  assert.throws(()=>generate({register:'unknown'}), RangeError);
  assert.notEqual(generate({random:()=>0}), generate({random:()=>0.9}));
});

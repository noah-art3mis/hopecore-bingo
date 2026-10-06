import {themes, registers, cosmicAsides} from './generator-corpus.mjs';
export {themes, registers};
export const densities = {grounded:'Grounded',fluent:'Fluent hopecore',cosmic:'Fully composted'};

export function generate({register='academic',theme='mixed',density='fluent',paragraphs=2,random=Math.random}={}) {
  if (!Number.isInteger(paragraphs) || paragraphs<1 || paragraphs>5) throw new RangeError('Choose 1–5 paragraphs.');
  if (!Object.hasOwn(registers,register)) throw new RangeError('Choose a listed format.');
  if (theme!=='mixed' && !Object.hasOwn(themes,theme)) throw new RangeError('Choose a listed world.');
  if (!Object.hasOwn(densities,density)) throw new RangeError('Choose a listed jargon level.');
  // Sampling without replacement varies forms even with an unlucky sequence of random draws.
  const bags=new Map();
  const draw=values=>{
    if (!bags.get(values)?.length) bags.set(values,[...values]);
    const bag=bags.get(values);
    return bag.splice(Math.floor(random()*bag.length),1)[0];
  };
  const world=themes[theme==='mixed'?draw(Object.keys(themes)):theme];
  const setting=draw(world.settings);
  const term=values=>{
    const pair=draw(values);
    return pair[density==='grounded'?0:1];
  };
  return Array.from({length:paragraphs},()=>{
    const context={setting,subject:term(world.subjects),outcome:term(world.outcomes),method:term(world.methods),otherMethod:term(world.methods),tension:draw(world.tensions),object:draw(world.objects)};
    const sentences=registers[register].stages.map(stage=>draw(stage).replace(/\{(\w+)\}/g,(_,key)=>context[key]));
    if (density==='cosmic') sentences.splice(3,0,draw(cosmicAsides));
    return sentences.join(' ');
  }).join('\n\n');
}

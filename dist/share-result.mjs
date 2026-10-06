import {card} from './bingo-card.mjs';
export function shareResult(result,id) {
  const line=result.lines.find(item=>item.id===id);
  if (!line) throw new Error('Choose a completed bingo to share.');
  const marked=new Set(result.matches.map(item=>item.index));
  return {name:line.name,text:`${line.name}. My hopecore bingo on Carem Ipsum.`,squares:card.map((trope,index)=>({label:trope?.short??'Free space',marked:index===12||marked.has(index),winning:line.indices.includes(index)}))};
}

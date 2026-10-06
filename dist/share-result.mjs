import {card} from './bingo-card.mjs';
const siteUrl='https://carem-ipsum.onrender.com/';
export function shareResult(result,id) {
  const line=result.lines.find(item=>item.id===id);
  if (!line) throw new Error('Choose a completed bingo to share.');
  const marked=new Set(result.matches.map(item=>item.index));
  return {name:line.name,gradient:line.gradient,url:siteUrl,cta:'Find your bingo ↗',text:`I got ${line.name} on Carem Ipsum. Find your bingo → ${siteUrl}`,squares:card.map((trope,index)=>({label:trope?.short??'Free space',marked:index===12||marked.has(index),winning:line.indices.includes(index)}))};
}

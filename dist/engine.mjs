import {tropes} from './vocabulary.mjs';
export {tropes};

export function analyse(text) {
  const normalised = text.replace(/[‐‑‒–—−]/g, '-');
  const matches = tropes.flatMap((trope, index) => {
    const regex = new RegExp(`(?<![\\p{L}\\p{N}_])(?:${trope.pattern})(?![\\p{L}\\p{N}_])`, 'giu');
    const evidence = [...normalised.matchAll(regex)].map(match => ({
      start:match.index, end:match.index + match[0].length,
      text:text.slice(match.index, match.index + match[0].length),
    }));
    return evidence.length ? [{...trope, index:index < 12 ? index : index + 1, evidence}] : [];
  });
  return {text, matches, lines:completedLines(matches.map(match => match.index))};
}

export function completedLines(indices) {
  const marked = new Set([...indices, 12]);
  const lines = [];
  for (let i=0; i<5; i++) {
    lines.push(Array.from({length:5}, (_,j)=>i*5+j));
    lines.push(Array.from({length:5}, (_,j)=>j*5+i));
  }
  lines.push([0,6,12,18,24], [4,8,12,16,20]);
  return lines.filter(line => line.every(index => marked.has(index)));
}

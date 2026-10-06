import {tropes} from './vocabulary.mjs';
import {card,winningLines} from './bingo-card.mjs';
export {tropes,card,winningLines};

export function analyse(text) {
  const normalised = text.replace(/[‐‑‒–—−]/g, '-');
  const matches = tropes.flatMap(trope => {
    const regex = new RegExp(`(?<![\\p{L}\\p{N}_])(?:${trope.pattern})(?![\\p{L}\\p{N}_])`, 'giu');
    const evidence = [...normalised.matchAll(regex)].map(match => ({
      start:match.index, end:match.index + match[0].length,
      text:text.slice(match.index, match.index + match[0].length),
    }));
    return evidence.length ? [{...trope, index:card.findIndex(square=>square?.id===trope.id), evidence}] : [];
  });
  return {text, matches, lines:completedLines(matches.map(match => match.index))};
}

export function completedLines(indices) {
  const marked = new Set([...indices, 12]);
  return winningLines.filter(line => line.indices.every(index => marked.has(index)));
}

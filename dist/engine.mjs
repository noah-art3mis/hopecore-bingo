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

const subjects = ['collective imaginaries', 'more-than-human ecologies', 'embodied knowledge', 'ancestral futures', 'relational infrastructures', 'community narratives', 'mycelial networks', 'situated practices of care'];
const actions = ['reimagine', 'cultivate', 'reclaim', 'co-design', 'critically explore', 'weave together'];
const outcomes = ['regenerative possibilities', 'plural ways of worlding', 'grounded futures', 'ecologies of belonging', 'collective sensemaking', 'transformative relationships'];
const methods = ['speculative probes', 'participatory reflection', 'systems mapping', 'embodied storytelling', 'collaborative fabulation', 'slow practices of noticing'];

export function generate({register='academic', paragraphs=2, random=Math.random}={}) {
  if (!Number.isInteger(paragraphs) || paragraphs<1 || paragraphs>5) throw new RangeError('Choose 1–5 paragraphs.');
  if (!['academic','workshop'].includes(register)) throw new RangeError('Choose an academic or workshop register.');
  const pick = values => values[Math.floor(random()*values.length)];
  return Array.from({length:paragraphs}, () => {
    const subject = pick(subjects), action = pick(actions), outcome = pick(outcomes), method = pick(methods);
    if (register === 'academic') return `How might ${subject} help us ${action} ${outcome}? Drawing on ${method} and ${pick(methods)}, this paper situates ${pick(subjects)} within a wider sociotechnical ecology. We introduce a participatory framework for attending to the tensions between ${pick(subjects)} and ${pick(outcomes)}. Our findings invite a relational approach to transformation, opening space for futures that remain deliberately unfinished.`;
    return `Join us to ${action} ${outcome} through ${subject}. Together, we will slow down, practise ${method}, and make space for ${pick(subjects)}. Bring a story, an unfinished question, or a small object that holds a possible future. Through collective sensemaking and speculative fabulation, we will co-design a shared vocabulary for ${pick(outcomes)}. No prior experience of worlding is required.`;
  }).join('\n\n');
}

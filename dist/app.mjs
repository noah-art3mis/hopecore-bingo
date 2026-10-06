import {analyse,generate,tropes} from './engine.mjs';
import {example} from './vocabulary.mjs';
const $ = id => document.getElementById(id);
let mode='generate', result=analyse(''), selected=null, output='';
const card=[...tropes.slice(0,12),null,...tropes.slice(12)];

function inspect(index) {
  selected=index;
  const panel=$('evidence'); panel.replaceChildren();
  const trope=card[index];
  const title=document.createElement('p');
  const bold=document.createElement('b');
  bold.textContent=trope?.label ?? 'Free space: holding space';
  title.append(bold); panel.append(title);
  if (!trope) {panel.append('You were always already part of the bingo.');return;}
  const match=result.matches.find(item=>item.id===trope.id);
  if (match) {
    for (const e of match.evidence.slice(0,3)) {
      const quote=document.createElement('p');
      const start=Math.max(0,e.start-45), end=Math.min(result.text.length,e.end+65);
      const mark=document.createElement('mark');mark.textContent=e.text;
      quote.append((start?'…':'')+result.text.slice(start,e.start),mark,result.text.slice(e.end,end)+(end<result.text.length?'…':''));
      panel.append(quote);
    }
    if (match.evidence.length>3) panel.append(`And ${match.evidence.length-3} more mentions. `);
  } else panel.append('No matching language in this text. ');
  const link=document.createElement('a');link.href=trope.source;link.textContent='Explore the reference ↗';link.target='_blank';link.rel='noreferrer';panel.append(link);
}

function celebrate() {
  $('celebration').replaceChildren();
  if (matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  for (let i=0;i<36;i++) {
    const bit=document.createElement('i');bit.className='confetti';
    bit.style.left=`${Math.random()*100}%`;bit.style.animationDelay=`${Math.random()*.4}s`;
    bit.style.background=['#f4a6bc','#d5eb4b','#193b35','#aecbfa'][i%4];
    $('celebration').append(bit);
  }
  setTimeout(()=>$('celebration').replaceChildren(),2400);
}

function render(text, animate=true) {
  const hadBingo=result.lines.length>0;
  result=analyse(text);
  const matched=new Set(result.matches.map(item=>item.index));
  const winning=new Set(result.lines.flat());
  $('board').replaceChildren();
  card.forEach((trope,index)=>{
    const button=document.createElement('button');
    const hit=index===12||matched.has(index);
    button.className=`square${index===12?' free':hit?' matched':''}${winning.has(index)?' winning':''}`;
    button.style.setProperty('--order',index);
    button.setAttribute('aria-label',`${trope?.label ?? 'Free space'}: ${hit?'marked':'unmarked'}. Show evidence.`);
    const number=document.createElement('span');number.className='number';number.textContent=String(index+1).padStart(2,'0');
    const tick=document.createElement('span');tick.className='tick';tick.textContent=hit?'✓':'';tick.setAttribute('aria-hidden','true');
    button.append(number,tick,document.createTextNode(trope?.label ?? 'Holding space'));
    button.addEventListener('click',()=>inspect(index));$('board').append(button);
  });
  $('count').textContent=result.matches.length;
  $('bingo-status').textContent=result.lines.length?`BINGO! ${result.lines.length} complete ${result.lines.length===1?'line':'lines'}.`:result.matches.length?'The discourse is taking shape.':'The future is unmarked.';
  if (selected!==null) inspect(selected);
  if (animate && result.lines.length && !hadBingo) celebrate();
}

function setMode(next) {
  mode=next;
  for (const name of ['generate','check']) {
    const active=name===mode;
    $(`${name}-tab`).setAttribute('aria-selected',active);
    $(`${name}-tab`).tabIndex=active?0:-1;
    $(`${name}-panel`).hidden=!active;
  }
  $('notice').textContent='';
  render(mode==='generate'?output:$('input').value,false);
}
for (const name of ['generate','check']) {
  $(`${name}-tab`).addEventListener('click',()=>setMode(name));
  $(`${name}-tab`).addEventListener('keydown',event=>{
    if (['ArrowLeft','ArrowRight','Home','End'].includes(event.key)) {
      event.preventDefault();
      setMode(event.key==='Home'?'generate':event.key==='End'?'check':mode==='generate'?'check':'generate');
      $(`${mode}-tab`).focus();
    }
  });
}
function regenerate() {
  output=generate({register:$('register').value,paragraphs:Number($('paragraphs').value)});
  $('generated').replaceChildren(...output.split('\n\n').map(text=>{
    const p=document.createElement('p');p.textContent=text;return p;
  }));
  render(output);$('notice').textContent='A new possible text has emerged.';
}
$('generate').addEventListener('click',regenerate);
$('register').addEventListener('change',regenerate);
$('paragraphs').addEventListener('change',regenerate);
$('copy').addEventListener('click',async()=>{
  try {await navigator.clipboard.writeText(output);$('notice').textContent='Copied. Go forth and co-create.';}
  catch {$('notice').textContent='Copy was unavailable. Select the generated text and copy it manually.';}
});
let timer;
$('input').addEventListener('input',()=>{
  clearTimeout(timer);timer=setTimeout(()=>{if(mode==='check')render($('input').value);},180);
});
$('check').addEventListener('click',()=>{
  clearTimeout(timer);render($('input').value);
  $('notice').textContent=$('input').value.trim()?`${result.matches.length} of 24 tropes found. Select a square for evidence.`:'Paste some text to start checking.';
});
$('example').addEventListener('click',()=>{
  clearTimeout(timer);$('input').value=example;render(example);
  $('notice').textContent='Loaded: Systemic Futures, Wong et al. (2026). Source in the reference shelf.';
});
$('clear').addEventListener('click',()=>{clearTimeout(timer);$('input').value='';render('');$('notice').textContent='Cleared.';$('input').focus();});
$('about').addEventListener('click',()=>{
  const notes=$('field-notes');notes.hidden=!notes.hidden;$('about').setAttribute('aria-expanded',!notes.hidden);
  if (!notes.hidden) notes.scrollIntoView({behavior:matchMedia('(prefers-reduced-motion: reduce)').matches?'instant':'smooth'});
});
regenerate();$('notice').textContent='';

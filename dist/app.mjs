import {analyse,card,winningLines} from './engine.mjs';
import {generate,registers,themes,densities} from './generator.mjs';
import {example} from './vocabulary.mjs';
const $ = id => document.getElementById(id);
for (const [id, choices] of Object.entries({register:Object.entries(registers).map(([value,item])=>[value,item.label]),theme:[['mixed','Surprise me'],...Object.entries(themes).map(([value,item])=>[value,item.label])],density:Object.entries(densities)})) {
  for (const [value,label] of choices) {
    const option=document.createElement('option');option.value=value;option.textContent=label;$(id).append(option);
  }
}
$('density').value='fluent';
let mode='generate', result=analyse(''), selected=null, output='';

function inspect(index) {
  selected={kind:'square',index};
  highlightLine(null);
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

function highlightLine(id) {
  const line=result.lines.find(line=>line.id===id);
  for (const square of $('board').children) square.classList.toggle('line-member',Boolean(line?.indices.includes(Number(square.dataset.index))));
  for (const badge of $('earned-lines').children) badge.setAttribute('aria-pressed',badge.dataset.line===id);
}

function inspectLine(id) {
  const line=result.lines.find(line=>line.id===id);
  if (!line) {
    selected=null;highlightLine(null);
    $('evidence').textContent='Select a square to inspect its language.';
    return;
  }
  selected={kind:'line',id};highlightLine(id);
  const heading=document.createElement('p');
  const title=document.createElement('b');title.textContent=line.name;
  heading.append(title,document.createTextNode(` · ${line.position}`));
  const ingredients=document.createElement('div');ingredients.className='line-ingredients';
  for (const index of line.indices) {
    const button=document.createElement('button');button.className='ingredient';
    button.textContent=card[index]?.short ?? 'Free space';
    button.setAttribute('aria-label',`${card[index]?.label ?? 'Free space'}. Show evidence.`);
    button.addEventListener('click',()=>inspect(index));ingredients.append(button);
  }
  $('evidence').replaceChildren(heading,ingredients);
}

function renderLineNames(matched) {
  const badges=result.lines.map(line=>{
    const button=document.createElement('button');button.className='line-badge';
    button.textContent=line.name;button.dataset.line=line.id;
    button.setAttribute('aria-pressed','false');button.setAttribute('aria-controls','evidence');
    button.addEventListener('click',()=>{
      if (selected?.kind==='line' && selected.id===line.id) inspectLine(null);
      else inspectLine(line.id);
    });
    return button;
  });
  $('earned-lines').replaceChildren(...badges);
  $('earned-lines').hidden=!badges.length;
  $('line-guide-list').replaceChildren(...winningLines.map(line=>{
    const item=document.createElement('li');
    const heading=document.createElement('div');
    const name=document.createElement('b');name.textContent=line.name;
    const progress=document.createElement('span');
    const count=line.indices.filter(index=>index===12||matched.has(index)).length;
    progress.textContent=`${count}/5`;progress.setAttribute('aria-label',`${count} of 5 squares marked`);
    heading.append(name,progress);
    const position=document.createElement('span');position.className='line-position';position.textContent=line.position;
    const ingredients=document.createElement('p');ingredients.textContent=line.indices.map(index=>card[index]?.short ?? 'Free space').join(' · ');
    item.append(heading,position,ingredients);item.classList.toggle('earned',count===5);
    return item;
  }));
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
  const winning=new Set(result.lines.flatMap(line=>line.indices));
  $('board').replaceChildren();
  card.forEach((trope,index)=>{
    const button=document.createElement('button');
    const hit=index===12||matched.has(index);
    button.className=`square${index===12?' free':hit?' matched':''}${winning.has(index)?' winning':''}`;
    button.style.setProperty('--order',index);
    button.dataset.index=index;
    button.setAttribute('aria-label',`${trope?.label ?? 'Free space'}: ${hit?'marked':'unmarked'}. Show evidence.`);
    const number=document.createElement('span');number.className='number';number.textContent=String(index+1).padStart(2,'0');
    const tick=document.createElement('span');tick.className='tick';tick.textContent=hit?'✓':'';tick.setAttribute('aria-hidden','true');
    const label=document.createElement('span');label.className='full-label';label.textContent=trope?.label ?? 'Holding space';
    const short=document.createElement('span');short.className='short-label';short.textContent=trope?.short ?? 'Free space';
    short.setAttribute('aria-hidden','true');button.append(number,tick,label,short);
    button.addEventListener('click',()=>inspect(index));$('board').append(button);
  });
  $('count').textContent=result.matches.length;
  $('bingo-status').textContent=result.lines.length?`BINGO! ${result.lines.length} complete ${result.lines.length===1?'line':'lines'}.`:result.matches.length?'The discourse is taking shape.':'The future is unmarked.';
  renderLineNames(matched);
  if (selected?.kind==='square') inspect(selected.index);
  else if (selected?.kind==='line') inspectLine(selected.id);
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
  output=generate({register:$('register').value,paragraphs:Number($('paragraphs').value),theme:$('theme').value,density:$('density').value});
  $('generated').replaceChildren(...output.split('\n\n').map(text=>{
    const p=document.createElement('p');p.textContent=text;return p;
  }));
  render(output);$('notice').textContent='Generated.';
}
$('generate').addEventListener('click',regenerate);
for (const id of ['register','paragraphs','theme','density']) $(id).addEventListener('change',regenerate);
$('copy').addEventListener('click',async()=>{
  try {await navigator.clipboard.writeText(output);$('notice').textContent='Copied.';}
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
  $('notice').textContent='Loaded: Systemic Futures, Wong et al. (2026). ';
});
$('clear').addEventListener('click',()=>{clearTimeout(timer);$('input').value='';render('');$('notice').textContent='Cleared.';$('input').focus();});
regenerate();$('notice').textContent='';

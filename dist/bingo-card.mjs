import {tropes} from './vocabulary.mjs';

const rows = [
  {name:'Possible Worlds', gradient:['#fff9df','#f4b9c9','#f4aa72'], ids:['futures','speculation','participation','codesign','reimagine']},
  {name:'Living Networks', gradient:['#f4f6cc','#bde2a5','#82c8ba'], ids:['fungi','ecology','nonhuman','entangled','relational']},
  {name:'Situated Care', gradient:['#fff4e5','#f1c2c9','#c3b7e8'], ids:['embodied','sensemaking',null,'grounded','care']},
  {name:'Ancestral Commons', gradient:['#fff0ce','#e6c09d','#d1aaa7'], ids:['ancestral','reclaim','fabulation','worlding','collective']},
  {name:'Systemic Renewal', gradient:['#eff8dc','#cce796','#9bd4d3'], ids:['slowness','systems','critical','imaginaries','transformation']},
];
const columns=[
  {name:'Deep Time',gradient:['#f4eafa','#c8b9e7','#9ebacf']},
  {name:'Regenerative Inquiry',gradient:['#fff6bf','#dbe59c','#a4ceb1']},
  {name:'More-than-Human Assembly',gradient:['#e8f9ef','#a9ddd2','#acbcec']},
  {name:'Collective Worlding',gradient:['#fff0e5','#e8b9dc','#b8b9ed']},
  {name:'Cultures of Care',gradient:['#fff3e2','#f3c7ad','#eaaac0']},
];
export const card=rows.flatMap(row=>row.ids.map(id=>id===null?null:tropes.find(trope=>trope.id===id)));
export const winningLines=[
  ...rows.map((row,index)=>({id:`row-${index}`,name:row.name,gradient:row.gradient,position:`Row ${index+1}`,indices:Array.from({length:5},(_,column)=>index*5+column)})),
  ...columns.map((column,index)=>({id:`column-${index}`,...column,position:`Column ${'BINGO'[index]}`,indices:Array.from({length:5},(_,row)=>row*5+index)})),
  {id:'diagonal-down',name:'Ecological Horizons',gradient:['#f7f6cb','#bfe2cf','#97c5e5'],position:'Top left → bottom right',indices:[0,6,12,18,24]},
  {id:'diagonal-up',name:'Patient Possibility',gradient:['#fff6db','#e6cee8','#c3d5f1'],position:'Top right → bottom left',indices:[4,8,12,16,20]},
];

import {tropes} from './vocabulary.mjs';

const rows = [
  {name:'Possible Worlds', ids:['futures','speculation','participation','codesign','reimagine']},
  {name:'Living Networks', ids:['fungi','ecology','nonhuman','entangled','relational']},
  {name:'Situated Care', ids:['embodied','sensemaking',null,'grounded','care']},
  {name:'Ancestral Commons', ids:['ancestral','reclaim','fabulation','worlding','collective']},
  {name:'Systemic Renewal', ids:['slowness','systems','critical','imaginaries','transformation']},
];
const columnNames=['Deep Time','Regenerative Inquiry','More-than-Human Assembly','Collective Worlding','Cultures of Care'];
export const card=rows.flatMap(row=>row.ids.map(id=>id===null?null:tropes.find(trope=>trope.id===id)));
export const winningLines=[
  ...rows.map((row,index)=>({id:`row-${index}`,name:row.name,position:`Row ${index+1}`,indices:Array.from({length:5},(_,column)=>index*5+column)})),
  ...columnNames.map((name,index)=>({id:`column-${index}`,name,position:`Column ${'BINGO'[index]}`,indices:Array.from({length:5},(_,row)=>row*5+index)})),
  {id:'diagonal-down',name:'Ecological Horizons',position:'Top left → bottom right',indices:[0,6,12,18,24]},
  {id:'diagonal-up',name:'Patient Possibility',position:'Top right → bottom left',indices:[4,8,12,16,20]},
];

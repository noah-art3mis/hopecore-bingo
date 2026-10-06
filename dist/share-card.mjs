export function drawShareCard(canvas,model) {
  canvas.width=1080;canvas.height=1080;
  const ctx=canvas.getContext('2d');
  const glow=ctx.createRadialGradient(500,430,30,540,540,790);
  glow.addColorStop(0,'#fff9df');glow.addColorStop(.55,'#f4b9c9');glow.addColorStop(1,'#f0841f');
  ctx.fillStyle=glow;ctx.fillRect(0,0,1080,1080);
  ctx.fillStyle='#193b35';ctx.font='bold 32px sans-serif';ctx.fillText('carem ipsum',64,72);
  ctx.font='22px sans-serif';ctx.fillText('HOPECORE BINGO',64,128);
  ctx.font='bold 78px sans-serif';
  let y=220,line='';
  for(const word of model.name.split(' ')) {
    const next=line?`${line} ${word}`:word;
    if(ctx.measureText(next).width>950){ctx.fillText(line,64,y);y+=86;line=word;}else line=next;
  }
  ctx.fillText(line,64,y);
  model.squares.forEach((square,index)=>{
    const x=64+(index%5)*192,y=430+Math.floor(index/5)*108;
    ctx.fillStyle=square.winning?'#193b35':square.marked?'#d5eb4b':'#fff7e4';
    ctx.fillRect(x,y,182,98);ctx.fillStyle=square.winning?'#fff7e4':'#193b35';
    ctx.font='bold 20px sans-serif';
    let row='',offset=0;
    for(const word of square.label.split(' ')){
      const next=row?`${row} ${word}`:word;
      if(ctx.measureText(next).width>155){ctx.fillText(row,x+12,y+34+offset);offset+=25;row=word;}else row=next;
    }
    ctx.fillText(row,x+12,y+34+offset);
  });
  ctx.font='24px sans-serif';ctx.fillStyle='#193b35';ctx.fillText('Co-creating possible worlds.',64,1030);
}

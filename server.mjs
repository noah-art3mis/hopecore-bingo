import {createServer} from 'node:http';
import {readFile} from 'node:fs/promises';
const files=new Map([['/','index.html'],['/index.html','index.html'],['/style.css','style.css'],['/app.mjs','app.mjs'],['/engine.mjs','engine.mjs'],['/bingo-card.mjs','bingo-card.mjs'],['/generator.mjs','generator.mjs'],['/generator-corpus.mjs','generator-corpus.mjs'],['/vocabulary.mjs','vocabulary.mjs']]);
const types={html:'text/html',css:'text/css',mjs:'text/javascript'};
createServer(async(req,res)=>{
  const file=files.get(new URL(req.url,'http://localhost').pathname);
  if(!file){res.writeHead(404);res.end('Not found');return;}
  try {const body=await readFile(new URL(`dist/${file}`,import.meta.url));res.writeHead(200,{'Content-Type':`${types[file.split('.').pop()]}; charset=utf-8`});res.end(body);}
  catch {res.writeHead(500);res.end('Unable to read asset');}
}).listen(4178,'0.0.0.0',()=>console.log('Hopecore Bingo: http://localhost:4178'));

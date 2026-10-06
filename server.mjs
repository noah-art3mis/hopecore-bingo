import {createServer} from 'node:http';
import {readFile} from 'node:fs/promises';
const files=new Map([['/','index.html'],['/index.html','index.html'],['/style.css','style.css'],['/app.mjs','app.mjs'],['/engine.mjs','engine.mjs'],['/bingo-card.mjs','bingo-card.mjs'],['/generator.mjs','generator.mjs'],['/generator-corpus.mjs','generator-corpus.mjs'],['/vocabulary.mjs','vocabulary.mjs'],['/share-result.mjs','share-result.mjs'],['/share-card.mjs','share-card.mjs']]);
for(const file of ['assets/icon.svg','assets/favicon.png','assets/apple-touch-icon.png','assets/social-preview.png','robots.txt','sitemap.xml','404.html']) files.set(`/${file}`,file);
const types={html:'text/html',css:'text/css',mjs:'text/javascript',png:'image/png',svg:'image/svg+xml',txt:'text/plain',xml:'application/xml'};
const server=createServer(async(req,res)=>{
  const file=files.get(new URL(req.url,'http://localhost').pathname);
  try {const body=await readFile(new URL(`dist/${file??'404.html'}`,import.meta.url));res.writeHead(file?200:404,{'Content-Type':`${types[(file??'404.html').split('.').pop()]}; charset=utf-8`});res.end(body);}
  catch {res.writeHead(500);res.end('Unable to read asset');}
});
server.listen(Number(process.env.PORT??4178),'0.0.0.0',()=>console.log(`Hopecore Bingo: http://localhost:${server.address().port}`));

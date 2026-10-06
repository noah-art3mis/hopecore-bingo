import test from 'node:test';
import assert from 'node:assert/strict';
import {spawn} from 'node:child_process';
test('public assets have usable content types and unknown URLs return a real branded 404',async()=>{
 const server=spawn(process.execPath,['server.mjs'],{cwd:new URL('../',import.meta.url),env:{...process.env,PORT:'0'}});
 try {
  const base=await new Promise((resolve,reject)=>{
   const timeout=setTimeout(()=>reject(new Error('Preview server did not start')),5000);
   server.once('exit',code=>{clearTimeout(timeout);reject(new Error(`Server exited: ${code}`));});
   server.stdout.on('data',chunk=>{const match=chunk.toString().match(/http:\/\/localhost:\d+/);if(match){clearTimeout(timeout);resolve(match[0]);}});
  });
  const image=await fetch(`${base}/assets/social-preview.png`);assert.equal(image.status,200);assert.match(image.headers.get('content-type'),/^image\/png/);assert.deepEqual([...new Uint8Array(await image.arrayBuffer()).slice(0,8)],[137,80,78,71,13,10,26,10]);
  const missing=await fetch(`${base}/missing/deep/page`);assert.equal(missing.status,404);assert.match(missing.headers.get('content-type'),/^text\/html/);assert.match(await missing.text(),/Back to Carem Ipsum/);
  const robots=await fetch(`${base}/robots.txt`);assert.equal(robots.status,200);assert.match(robots.headers.get('content-type'),/^text\/plain/);
 } finally {server.kill();}
});

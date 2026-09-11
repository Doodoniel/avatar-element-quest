import http from 'node:http';
import {createReadStream} from 'node:fs';
import {stat} from 'node:fs/promises';
import {resolve,sep,extname} from 'node:path';
import {fileURLToPath} from 'node:url';
import {spawn} from 'node:child_process';

const root=resolve(fileURLToPath(new URL('./web/',import.meta.url)));
const base='/avatar-element-quest/';
const mime={'.html':'text/html; charset=utf-8','.js':'text/javascript; charset=utf-8','.css':'text/css; charset=utf-8','.png':'image/png','.svg':'image/svg+xml','.jpg':'image/jpeg','.woff2':'font/woff2'};
const server=http.createServer(async(req,res)=>{
 try{
  if(req.method!=='GET'&&req.method!=='HEAD'){res.writeHead(405);res.end();return}
  const pathname=decodeURIComponent(new URL(req.url,'http://localhost').pathname);
  if(pathname==='/'){res.writeHead(302,{Location:base});res.end();return}
  if(!pathname.startsWith(base)){res.writeHead(404);res.end('Not found');return}
  let file=resolve(root,pathname.slice(base.length));
  if(file!==root&&!file.startsWith(root+sep)){res.writeHead(403);res.end();return}
  let info=await stat(file);
  if(info.isDirectory()){file=resolve(file,'index.html');info=await stat(file)}
  res.writeHead(200,{'Content-Type':mime[extname(file)]||'application/octet-stream','Content-Length':info.size,'Cache-Control':'no-cache','X-Content-Type-Options':'nosniff'});
  if(req.method==='HEAD')res.end();else createReadStream(file).on('error',()=>res.destroy()).pipe(res);
 }catch{res.writeHead(404);res.end('Not found')}
});
server.on('error',error=>{console.error('Cannot start. Close the other game window and try again. Port 8877 must be free.');console.error(error.message);process.exitCode=1});
server.listen(8877,'127.0.0.1',()=>{
 const url='http://127.0.0.1:8877'+base;
 console.log('Avatar Element Quest\n'+url+'\nKeep this window open while playing. Close it to stop.');
 if(process.platform==='win32'&&!process.env.AVATAR_NO_OPEN)spawn('rundll32.exe',['url.dll,FileProtocolHandler',url],{windowsHide:true,stdio:'ignore'}).on('error',()=>console.log('Open the address above in your browser.'));
});

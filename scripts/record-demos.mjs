/**
 * Records ~30s scripted tours of each live project demo for /projects.
 *
 *   npm i -D playwright && npx playwright install chromium   (once; needs ffmpeg on PATH)
 *   node scripts/record-demos.mjs [slug ...]                 (no slugs = all tours)
 *
 * Writes out/<slug>.{mp4,webm,jpg}; copy them into public/videos/ and set
 * `video: "/videos/<slug>"` on the project in lib/site-data.ts.
 * Set CHROME_PATH to reuse an existing Chromium instead of Playwright's.
 */
import { chromium } from 'playwright';
import { execFileSync } from 'node:child_process';
import fs from 'node:fs';
const W=1280,H=800;
// Tour scripts: each step is [action, ...args]. Total ≈ 30s.
const tours = {
  engineeros: { url:'https://engineeros-delta.vercel.app/', steps:[
    ['hold',2500],['move',560,300],['scroll',2400,9000],['hold',1500],['scroll',2200,8000],['hold',1500],['top',4600],['hover','text=Create a workspace'],['hold',2500]]},
  'offerguard-ai': { url:'https://offerchecker-pi.vercel.app/', steps:[
    ['hold',2500],['scroll',1500,6000],['hold',1500],['goto','/how-it-works'],['hold',1500],['scroll',1800,8000],['hold',1500],['goto','/features'],['scroll',1400,5500],['hold',1500]]},
  learnai: { url:'https://intelligent-learning-assistant.vercel.app', steps:[
    ['hold',2500],['hover','text=Start learning'],['hold',1200],['hover','text=See how it works'],['hold',1200],['move',640,420],['scroll',1500,12000],['hold',2500],['top',1500],['hover','text=Start learning'],['hold',3000]]},
  'smartflow-ai': { url:'https://ps-1-eight.vercel.app', steps:[
    ['hold',2500],['scroll',3300,11000],['hold',1500],['goto','/platform'],['hold',1500],['scroll',1800,7000],['hold',2000]]},
  'sentinel-cli': { url:'https://sentinel-cli.vercel.app/', steps:[
    ['hold',3000],['scroll',3200,12000],['hold',1500],['top',3200],['click','nav >> text=Playground'],['hold',1500],['playground'],['hold',4000],['scroll',500,2500],['hold',1500]]},
  'archmind-ai': { url:'https://archmind-ai-topaz.vercel.app/', steps:[
    ['hold',3000],['move',900,500],['scroll',2200,8000],['hold',1500],['scroll',2000,7000],['hold',1500],['scroll',1400,5000],['hold',2500]]},
  'archmind-research-agent': { url:'https://internship-assessment-er3kjmh8nw5vvj8wgwxlmc.streamlit.app/', steps:[
    ['hold',4000],['research'],['hold',3000]]},
};
const CURSOR = `(()=>{const add=()=>{if(document.getElementById('__cur'))return;const c=document.createElement('div');c.id='__cur';
c.innerHTML='<svg width="22" height="22" viewBox="0 0 24 24"><path d="M4 2l16 9-7 2-3 7z" fill="#111" stroke="#fff" stroke-width="1.6" stroke-linejoin="round"/></svg>';
c.style.cssText='position:fixed;left:0;top:0;z-index:2147483647;pointer-events:none;transform:translate(640px,400px);transition:transform .08s linear;filter:drop-shadow(0 2px 3px rgba(0,0,0,.35))';
document.documentElement.appendChild(c);addEventListener('mousemove',e=>{c.style.transform='translate('+(e.clientX-3)+'px,'+(e.clientY-2)+'px)'},true);};
if(document.readyState==='loading')addEventListener('DOMContentLoaded',add);else add();})()`;
async function smoothScroll(p,dy,ms){ // wheel-driven so custom scroll containers / Lenis work too
  const n=Math.max(1,Math.round(ms/40)); const ease=t=>t<.5?2*t*t:1-Math.pow(-2*t+2,2)/2; let done=0;
  for(let i=1;i<=n;i++){const target=dy*ease(i/n); await p.mouse.wheel(0,target-done); done=target; await p.waitForTimeout(40);} }
async function glide(p,x,y){await p.mouse.move(x,y,{steps:25});}
const only = process.argv.slice(2);
const b = await chromium.launch(process.env.CHROME_PATH ? { executablePath: process.env.CHROME_PATH } : {});
for (const [slug,{url,steps}] of Object.entries(tours)) {
  if (only.length && !only.includes(slug)) continue;
  // warm cache so the recorded load is instant
  { const wp=await b.newPage(); await wp.goto(url,{waitUntil:'networkidle',timeout:60000}).catch(()=>{}); await wp.close(); }
  const t0=Date.now();
  const ctx = await b.newContext({viewport:{width:W,height:H},recordVideo:{dir:'raw',size:{width:W,height:H}},colorScheme:'light'});
  await ctx.addInitScript(CURSOR);
  const p = await ctx.newPage();
  await p.goto(url,{waitUntil:'networkidle',timeout:60000}).catch(()=>{});
  await p.waitForTimeout(1200);
  await p.mouse.move(W/2,H/2);
  const tStart=(Date.now()-t0)/1000;
  const origin=new URL(url).origin;
  for (const [a,...x] of steps) {
    try{
    if(a==='hold') await p.waitForTimeout(x[0]);
    else if(a==='move') await glide(p,x[0],x[1]);
    else if(a==='scroll') await smoothScroll(p,x[0],x[1]);
    else if(a==='top') await smoothScroll(p,-x[0],1500);
    else if(a==='hover'){const bb=await p.locator(x[0]).first().boundingBox(); if(bb) await glide(p,bb.x+bb.width/2,bb.y+bb.height/2);}
    else if(a==='click'){const l=p.locator(x[0]).first(); const bb=await l.boundingBox().catch(()=>null); if(bb){await glide(p,bb.x+bb.width/2,bb.y+bb.height/2); await p.waitForTimeout(300); await l.click(); await p.waitForTimeout(1500);} }
    else if(a==='goto'){ await p.goto(origin+x[0],{waitUntil:'networkidle',timeout:30000}).catch(()=>{}); await p.waitForTimeout(600); await p.mouse.move(W/2+40,H/2); }
    else if(a==='playground'){ const btn=p.locator('button:has-text("Scan"),button:has-text("Analyze"),button:has-text("Run")').first();
      const bb=await btn.boundingBox().catch(()=>null); if(bb){await glide(p,bb.x+bb.width/2,bb.y+bb.height/2); await p.waitForTimeout(400); await btn.click().catch(()=>{});} }
    else if(a==='research'){ const inp=p.locator('textarea, input[type=text]').first();
      const bb=await inp.boundingBox().catch(()=>null); if(bb){await glide(p,bb.x+60,bb.y+bb.height/2); await inp.click(); await p.keyboard.type('Impact of small language models on edge devices',{delay:55});
      await p.waitForTimeout(500); const go=p.locator('button').filter({hasText:/research|run|generate|start|submit/i}).first(); const gb=await go.boundingBox().catch(()=>null); if(gb){await glide(p,gb.x+gb.width/2,gb.y+gb.height/2); await go.click().catch(()=>{});}
      for(let i=0;i<8;i++){await p.waitForTimeout(1500); await smoothScroll(p,120,600);} } }
    }catch(e){console.log(slug,a,'fail',e.message.split('\n')[0]);}
  }
  const tEnd=(Date.now()-t0)/1000;
  const vpath=await p.video().path(); await ctx.close();
  fs.mkdirSync('out',{recursive:true});
  const dur=Math.min(30,tEnd-tStart).toFixed(2);
  execFileSync('ffmpeg',['-loglevel','error','-y','-ss',tStart.toFixed(2),'-i',vpath,'-t',dur,'-vf','fps=30,scale=1280:-2','-c:v','libx264','-preset','slow','-crf','27','-pix_fmt','yuv420p','-movflags','+faststart','-an',`out/${slug}.mp4`]);
  execFileSync('ffmpeg',['-loglevel','error','-y','-i',`out/${slug}.mp4`,'-vf','scale=1280:-2','-c:v','libvpx-vp9','-b:v','0','-crf','40','-row-mt','1','-an',`out/${slug}.webm`]);
  execFileSync('ffmpeg',['-loglevel','error','-y','-ss','1','-i',`out/${slug}.mp4`,'-frames:v','1','-q:v','4',`out/${slug}.jpg`]);
  console.log(slug,'done',dur+'s', (fs.statSync(`out/${slug}.mp4`).size/1024|0)+'KB mp4', (fs.statSync(`out/${slug}.webm`).size/1024|0)+'KB webm');
}
await b.close();

import assert from 'node:assert/strict';
import { readFileSync, existsSync } from 'node:fs';
import { join } from 'node:path';
import { approved, origin, pages, csp, inlineHashes, verifyPublic } from './site-contract.mjs';
const isDist=process.argv.includes('--dist');
const folder=isDist?'dist':'public';
verifyPublic(folder);
const headers=JSON.parse(readFileSync('vercel.json','utf8')).headers[0].headers;
assert.equal(headers.find(h=>h.key==='Content-Security-Policy')?.value,csp(),'Inline scripts changed: run npm run security:headers and review vercel.json before building.');
const documents=approved().map(p=>({...p,html:isDist?readFileSync(join('dist',p.route,'index.html'),'utf8'):p.html}));
const policy=headers.find(h=>h.key==='Content-Security-Policy').value;
for(const hash of inlineHashes(documents))assert.ok(policy.includes(hash),'Actual built inline script is not authorized by CSP: '+hash);
const attributes=tag=>Object.fromEntries([...tag.matchAll(/([\w:-]+)="([^"]*)"/g)].map(m=>[m[1],m[2]]));
const known=new Map(documents.map(p=>[p.route,p]));
const sitemap=readFileSync(join(folder,'sitemap.xml'),'utf8');
for(const {file,route,html} of documents){
 assert.equal((html.match(/<h1\b/g)||[]).length,1,file+' must have one H1');
 const ids=[...html.matchAll(/\bid="([^"]+)"/g)].map(m=>m[1]);
 assert.equal(new Set(ids).size,ids.length,file+' duplicate IDs');
 const tags=[...html.matchAll(/<(?:link|meta|a|img|script)\b[^>]*>/g)].map(m=>attributes(m[0]));
 assert.equal(tags.find(t=>t.rel==='canonical')?.href,origin+route,file+' canonical');
 assert.equal(tags.find(t=>t.property==='og:url')?.content,origin+route,file+' og:url');
 const englishRoute=route.replace(/^\/tr\//,'/');
 for(const lang of ['en','tr','x-default'])assert.equal(tags.find(t=>t.hreflang===lang)?.href,origin+(lang==='tr'?'/tr'+englishRoute:englishRoute),file+' hreflang '+lang);
 assert.ok(sitemap.includes('<loc>'+origin+route+'</loc>'),file+' missing sitemap URL');
 assert.ok(!/\/downloads\/|thesis-download/.test(html),file+' thesis download returned');
 assert.ok(!/fonts\.(?:googleapis|gstatic)\.com/.test(html),file+' external fonts returned');
 const cvLinks=tags.filter(t=>/^\/cv(?:-tr)?\.pdf$/.test(t.href||''));
 assert.ok(cvLinks.length>0,file+' missing CV link');
 assert.ok(cvLinks.every(t=>t.href===(route.startsWith('/tr/')?'/cv-tr.pdf':'/cv.pdf')),file+' wrong CV language');
 for(const tag of tags){
  const href=tag.src||tag.href;
  if(!href||href.startsWith('//')||/^[a-z][a-z\d+.-]*:/i.test(href))continue;
  const url=new URL(href,origin+route), targetRoute=url.pathname.endsWith('/')?url.pathname:url.pathname+'/';
  const target=known.get(targetRoute);
  if(target&&url.hash)assert.ok(target.html.includes('id="'+decodeURIComponent(url.hash.slice(1))+'"'),file+' missing anchor '+href);
  if(!target)assert.ok(existsSync(join(folder,url.pathname)),file+' missing asset '+href);
 }
}
assert.equal(documents.length,pages.length);
console.log(`PASS: ${documents.length} ${isDist?'built':'source'} pages, canonical/language metadata, links/assets, script CSP hashes and private-file exclusion.`);

import { readFileSync, writeFileSync, mkdirSync, copyFileSync, existsSync, unlinkSync, readdirSync, rmdirSync } from 'node:fs';
import { resolve, join } from 'node:path';
import { enabled } from '../src/features/careeros/index.mjs';
import './prepare-research-data.mjs';
const publicRoot=resolve('public');
const assets=join(publicRoot,'careeros-assets');
if(enabled){
 mkdirSync(assets,{recursive:true});
 for(const file of ['careeros.css','demo.png','demo-preview.webp','careeros-mark.svg'])copyFileSync(join('src/features/careeros/assets',file),join(assets,file));
}else{
 // Only remove module-owned files, preserving anything unexpected.
 for(const file of ['careeros.css','demo.png','demo-preview.webp','careeros-mark.svg']){const target=join(assets,file);if(existsSync(target))unlinkSync(target);}
 if(existsSync(assets)&&readdirSync(assets).length===0)rmdirSync(assets);
}
const sitemap=join(publicRoot,'sitemap.xml');
let xml=readFileSync(sitemap,'utf8').replace(/\s*<url>\s*<loc>https:\/\/ugurcemyildiz\.me\/(?:tr\/)?careeros\/<\/loc>\s*<\/url>/g,'');
if(enabled)xml=xml.replace('</urlset>','\n  <url><loc>https://ugurcemyildiz.me/careeros/</loc></url>\n  <url><loc>https://ugurcemyildiz.me/tr/careeros/</loc></url>\n</urlset>');
writeFileSync(sitemap,xml);
console.log('CareerOS '+(enabled?'enabled':'disabled')+': assets and sitemap prepared.');

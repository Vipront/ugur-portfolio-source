import { createHash } from 'node:crypto';
import { readdirSync, readFileSync, existsSync } from 'node:fs';
import { join } from 'node:path';

export const origin = 'https://ugurcemyildiz.me';
export const pages = [
  ['home.html', '/'], ['tr.html', '/tr/'],
  ['research--cancer-bioinformatics.html', '/research/cancer-bioinformatics/'],
  ['research--structure-based-drug-design.html', '/research/structure-based-drug-design/'],
  ['tr--research--cancer-bioinformatics.html', '/tr/research/cancer-bioinformatics/'],
  ['tr--research--structure-based-drug-design.html', '/tr/research/structure-based-drug-design/'],
];
export const approved = () => pages.map(([file, route]) => ({file, route, html:readFileSync(join('src/content/approved',file),'utf8')}));
export const inlineHashes = (documents=approved()) => [...new Set(documents.flatMap(({html})=>[...html.matchAll(/<script\b([^>]*)>([\s\S]*?)<\/script>/gi)].filter(m=>! /\bsrc\s*=/.test(m[1])&&m[2].trim()).map(m=>"'sha256-"+createHash('sha256').update(m[2].replace(/\r\n?/g,'\n')).digest('base64')+"'")))].sort();
export const csp = () => ["default-src 'self'", "script-src 'self' "+inlineHashes().join(' '), "style-src 'self' 'unsafe-inline'", "img-src 'self' data:", "font-src 'self'", "connect-src 'self'", "object-src 'none'", "base-uri 'none'", "frame-ancestors 'none'", "form-action 'none'", 'upgrade-insecure-requests'].join('; ');
export const walk = folder => readdirSync(folder,{withFileTypes:true}).flatMap(e=>e.isDirectory()?walk(join(folder,e.name)):[join(folder,e.name)]);
export function verifyPublic(folder) {
  if(!existsSync(folder))throw new Error('Missing output: '+folder);
  const bad=walk(folder).filter(p=>/\.(?:docx?|pem|key)$/i.test(p)||/(?:^|[\\/])\.env(?:\.|$)/.test(p));
  if(bad.length)throw new Error('Private document/credential file in publication output: '+bad.join(', '));
}

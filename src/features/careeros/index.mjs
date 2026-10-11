import { readFileSync } from 'node:fs';
export const enabled = JSON.parse(readFileSync('src/features/careeros/config.json', 'utf8')).enabled === true;
export const pages = enabled ? [['careeros.html', '/careeros/'], ['tr--careeros.html', '/tr/careeros/']] : [];
export const documents = () => pages.map(([file,route]) => ({file,route,html:readFileSync('src/features/careeros/documents/'+file,'utf8')}));

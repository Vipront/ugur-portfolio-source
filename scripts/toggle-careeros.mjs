import { writeFileSync } from 'node:fs';
const value=process.argv[2];
if(!['on','off'].includes(value))throw new Error('Use on or off');
writeFileSync(new URL('../src/features/careeros/config.json',import.meta.url),JSON.stringify({enabled:value==='on'},null,2)+'\n');
console.log('CareerOS '+(value==='on'?'enabled':'disabled')+'. Rebuild and deploy to update the live site.');

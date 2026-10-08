import { writeFileSync } from 'node:fs';
import { csp } from './site-contract.mjs';
const headers=[
 {key:'Content-Security-Policy',value:csp()},
 {key:'X-Content-Type-Options',value:'nosniff'},
 {key:'X-Frame-Options',value:'DENY'},
 {key:'Referrer-Policy',value:'strict-origin-when-cross-origin'},
 {key:'Permissions-Policy',value:'camera=(), microphone=(), geolocation=()'},
];
writeFileSync('vercel.json',JSON.stringify({headers:[{source:'/(.*)',headers}]},null,2)+'\n');
console.log('Updated security headers with the approved inline script hashes.');

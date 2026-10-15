import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {approved} from './site-contract.mjs';
import {enabled} from '../src/features/careeros/index.mjs';

test('Shared shell preserves language routes and moves evidence before biography',()=>{
 for(const {route,html} of approved()){
  assert.equal((html.match(/class="site-header portfolio-header"/g)||[]).length,1);
  const alternate=route.startsWith('/tr/')?route.slice(3):'/tr'+route;
  assert.ok(html.includes(`class="portfolio-language" href="${alternate}"`),route+' loses equivalent language route');
  if(route.includes('/careeros/'))assert.ok(html.includes('id="development"'),route+' missing development case study');
  if(['/','/tr/'].includes(route)){
   assert.ok(html.indexOf('id="projects"')<html.indexOf('id="experience"'));
   assert.ok(html.indexOf('id="experience"')<html.indexOf('id="about"'));
   assert.equal((html.match(/class="work-item(?: work-software)?"/g)||[]).length,enabled?3:2);
  }
 }
});

test('Research tables remain byte-for-byte intact and each page exposes an analysis record',()=>{
 for(const {file,route,html} of approved().filter(p=>p.route.includes('/research/'))){
  const raw=readFileSync('src/content/approved/'+file,'utf8');
  for(const table of raw.matchAll(/<table\b[\s\S]*?<\/table>/g))assert.ok(html.includes(table[0]),route+' changed a research table');
  assert.ok(html.includes('id="research-record"'),route+' missing record');
  assert.ok(html.includes('href="#research-record"'),route+' missing TOC record link');
 }
});

test('Download records state evidence gaps and match the published structure labels',()=>{
 const drug=JSON.parse(readFileSync('public/research-data/drug-design-record.json','utf8'));
 const cancer=JSON.parse(readFileSync('public/research-data/cancer-bioinformatics-record.json','utf8'));
 assert.deepEqual(drug.docking.centre_angstrom,[19.78,-6.85,68.11]);
 assert.deepEqual(drug.displayed_pose.labelled_residues.map(r=>r.names[0]),['ASN','TYR','TRP','CYS','TYR']);
 assert.ok(cancer.unavailable.includes('survival_cohort_sizes'));
 assert.ok(cancer.unavailable.includes('luad_hazard_ratio'));
 assert.equal(cancer.available_survival_figure.cohort,null);
 assert.equal(cancer.available_survival_figure.displayed_log_rank_p_value,0.42);
 const csv=readFileSync('public/research-data/docking-results.csv','utf8');
 assert.equal(csv.trim().split('\n').length,8);
 assert.equal((csv.match(/−11\.9/g)||[]).length,2);
});

test('GitHub profile, copy-email action, and certifications are integrated across shell and home pages',()=>{
 for(const {route,html} of approved()){
  assert.ok(html.includes('href="https://github.com/Vipront"'),route+' missing GitHub link in footer or page');
  assert.ok(!html.includes('id="mini-symbol"'),route+' still renders dead #mini-symbol element');
  assert.ok(!html.includes('id="mini-prop-label"'),route+' still renders dead #mini-prop-label element');
  for(const m of html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)){
   const data=JSON.parse(m[1]);
   const person=data['@graph']?.find(n=>n['@type']==='Person');
   if(person){
    assert.ok(person.sameAs.includes('https://github.com/Vipront'),route+' JSON-LD Person.sameAs missing GitHub');
   }
  }
  if(['/','/tr/'].includes(route)){
   assert.ok(html.includes('data-copy-email="yugurcem@gmail.com"'),route+' missing copy-email button in contact');
   assert.ok(html.includes('Bioinformatics Data Analysis')||html.includes('Biyoinformatik Veri Analizi'),route+' missing certifications in about section');
  }
 }
});

test('CSS and JS optimizations: no dead thesis-download rules, real monospace stack, accessible close button, and event-driven idle animation',()=>{
 const combinedCss=readFileSync('public/combined.css','utf8');
 const personalCss=readFileSync('public/personal.css','utf8');
 const combinedJs=readFileSync('public/combined.js','utf8');
 const portfolioJs=readFileSync('public/portfolio.js','utf8');
 const researchJs=readFileSync('public/research.js','utf8');

 assert.ok(!combinedCss.includes('thesis-download'),'combined.css still contains dead .thesis-download styles');
 assert.ok(!personalCss.includes('thesis-download'),'personal.css still contains dead .thesis-download styles');
 assert.ok(!combinedCss.includes('mini-ugur-poses.png'),'combined.css still references legacy mini-ugur-poses.png');
 assert.ok(personalCss.includes('ui-monospace'),'personal.css must use a real monospace stack for --font-mono');
 assert.ok(researchJs.includes('<span aria-hidden="true">×</span>'),'research.js must wrap decorative × in aria-hidden span');
 assert.ok(portfolioJs.includes('aria-pressed'),'portfolio.js must sync aria-pressed on #theme-toggle');
 assert.ok(portfolioJs.includes('theme-color'),'portfolio.js must sync meta[name="theme-color"]');
 assert.ok(portfolioJs.includes('data-copy-email'),'portfolio.js must support copy-email button');
 assert.ok(combinedJs.includes('idleTimer'),'combined.js must use an idle timer when walking finishes instead of 60fps rAF forever');
});

test('Turkish CV PDF removes personal phone number and fixes uppercase Turkish dotted-I headers',async ()=>{
 const {inflateSync}=await import('node:zlib');
 const raw=readFileSync('public/cv-tr.pdf');
 const streams=[];
 for(const m of raw.toString('latin1').matchAll(/<<(.*?)>>\r?\nstream\r?\n([\s\S]*?)\r?\nendstream/g)){
  if(m[1].includes('FlateDecode')){
   try{streams.push(inflateSync(Buffer.from(m[2],'latin1')).toString('latin1'));}catch{}
  }
 }
 const joined=streams.join('\n');
 assert.ok(!joined.includes('043D03F503EC000303F103F003ED'),'cv-tr.pdf still contains phone number glyph sequence');
 assert.ok(!joined.includes('(B)-95(I)-90(Y)-95(O)-91(L)-99(O)-91(J)-97(I)'),'cv-tr.pdf still contains dotless BIYOLOJI header');
 assert.ok(!joined.includes('(T)-72(E)-68(K)-64(N)-72(I)-65(K)'),'cv-tr.pdf still contains dotless TEKNIK header');
 assert.ok(!joined.includes('<0037>-71<003E>-68<0027>-67<002F>'),'cv-tr.pdf still contains dotless ILGI header');
});


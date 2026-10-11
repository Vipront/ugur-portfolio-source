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

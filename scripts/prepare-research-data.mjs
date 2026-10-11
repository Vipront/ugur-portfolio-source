import {readFileSync,writeFileSync,mkdirSync} from 'node:fs';
import {createHash} from 'node:crypto';

const dir='public/research-data';mkdirSync(dir,{recursive:true});
const source='src/content/approved/research--structure-based-drug-design.html';
const raw=readFileSync(source,'utf8');
const text=s=>s.replace(/<[^>]*>/g,'').replace(/&minus;/g,'−').replace(/&nbsp;/g,' ').replace(/&amp;/g,'&').trim();
const tables=[...raw.matchAll(/<table\b[^>]*>([\s\S]*?)<\/table>/g)];
const result=tables.find(t=>t[1].includes('Plerixafor'));
if(!result)throw new Error('Approved docking results table missing');
const rows=[...result[1].matchAll(/<tr\b[^>]*>([\s\S]*?)<\/tr>/g)].map(r=>[...r[1].matchAll(/<(?:td|th)\b[^>]*>([\s\S]*?)<\/(?:td|th)>/g)].map(c=>text(c[1])));
if(rows.length!==8||rows.some(r=>r.length!==8))throw new Error('Unexpected approved result table shape');
const csv=rows.map(r=>r.map(c=>'"'+c.replace(/"/g,'""')+'"').join(',')).join('\n')+'\n';
writeFileSync(dir+'/docking-results.csv',csv);
const pdb=readFileSync('public/structures/cxcr4-fluoro-deoxy-amentoflavone.pdb','utf8');
const atoms=pdb.split(/\r?\n/).filter(l=>/^ATOM  |^HETATM/.test(l));
const residues=[43,55,104,196,429].map(number=>({number,names:[...new Set(atoms.filter(l=>Number(l.slice(22,26))===number&&l.slice(17,20)!=='LIG').map(l=>l.slice(17,20).trim()))]}));
const drug={
 record_type:'Published-method transcription; not an independent rerun',
 source_page:'https://ugurcemyildiz.me/research/structure-based-drug-design/',
 receptor:{pdb_id:'3ODU',resolution_angstrom:2.5},
 docking:{software:'AutoDock Vina',version:'1.1.2',exhaustiveness:32,box_size_angstrom:[52,52,52],centre_angstrom:[19.78,-6.85,68.11]},
 preparation:{receptor:'Waters, co-crystallised antagonist and non-protein heteroatoms removed; polar hydrogens and Kollman charges added with AutoDock Tools.',ligands:'Designed with MolSoft ICM-Chemist; 3D coordinates and minimisation with NCI SMILES Translator; Gasteiger charges and rotatable bonds assigned with AutoDock Tools.'},
 predictions:['SwissADME','ProTox-II'],
 results_csv:'/research-data/docking-results.csv',
 displayed_pose:{path:'/structures/cxcr4-fluoro-deoxy-amentoflavone.pdb',description:'Prepared receptor and Fluoro-Deoxy-Amentoflavone Vina pose 1; hydrogens removed for web display.',sha256:createHash('sha256').update(pdb).digest('hex'),labelled_residues:residues},
 unavailable:['analysis_date','random_seed','full_ligand_inputs','original_vina_configuration_file','run_logs','independent_replication'],
 interpretation:'Docking and ADME/toxicity predictions do not establish biological activity or clinical safety.'
};
const cancer={
 record_type:'Published-method transcription; incomplete reproduction record',
 source_page:'https://ugurcemyildiz.me/research/cancer-bioinformatics/',
 sources:['TCGA Pan-Cancer Atlas','GTEx'],
 analyses:[
  {platform:'GEPIA2',cohorts:['BRCA','LUAD','COAD'],method:'One-way ANOVA',reported_thresholds:{log2_fold_change:1,p_value:0.01}},
  {platform:'cBioPortal',cohorts:['breast','lung','colorectal'],method:'Copy-number state, mutations and mRNA expression'},
  {platform:'Kaplan–Meier Plotter',cohorts:['BRCA','LUAD','READ'],endpoint:'Overall survival',threshold_selection:'Automatic',reported_luad_p_value:0.007},
  {platform:'TIMER2.0',method:'Spearman correlation between CXCR4 expression and inferred CD8+ T-cell infiltration'},
  {platform:'STRING',method:'Predicted functional association network'}
 ],
 expression_figure:{path:'/images/cancer-bioinformatics/gepia2-cxcr4-expression.jpg',sample_counts_read_from_labels:{BRCA:{tumour:1085,normal:291},LUAD:{tumour:483,normal:347},COAD:{tumour:275,normal:349}},note:'Counts transcribed from the published figure, not independently downloaded or verified against a dataset version.'},
 available_survival_figure:{path:'/images/cancer-bioinformatics/kaplan-meier-survival-curves.png',cohort:null,displayed_hr:1.39,displayed_95_percent_ci:[0.62,3.09],displayed_log_rank_p_value:0.42,note:'A single unlabelled-cohort plot; it does not visually verify the reported LUAD p = 0.007 result.'},
 unavailable:['analysis_dates','dataset_versions','survival_cohort_sizes','numerical_expression_cutoffs','luad_hazard_ratio','luad_confidence_interval','algorithm_specific_correlations','original_cohort_specific_survival_exports','exported_input_data'],
 interpretation:'Observational associations do not establish causality; the automatic survival threshold needs independent validation.'
};
for(const [name,value] of [['drug-design',drug],['cancer-bioinformatics',cancer]])writeFileSync(`${dir}/${name}-record.json`,JSON.stringify(value,null,2)+'\n');
console.log('Research records generated from approved method and results; unavailable evidence is explicit.');

import { content } from './content.mjs';
import { enabled } from '../features/careeros/index.mjs';

const esc = value => String(value).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const attrs = 'data-astro-cid-u2x246h4';
const section = (id,title,body) => `<section id="${id}" class="section border-top portfolio-section" aria-labelledby="${id}-heading"><h2 id="${id}-heading">${title}</h2>${body}</section>`;
const link = (href,label,cls='') => `<a href="${href}"${cls?` class="${cls}"`:''}>${label}</a>`;

function header(lang,route) {
 const t=content[lang],base=lang==='tr'?'/tr/':'/',cv=lang==='tr'?'/cv-tr.pdf':'/cv.pdf';
 const alternate=lang==='tr'?route.slice(3):'/tr'+route;
 const nav=(id,label)=>link(base+'#'+id,label);
 return `<header class="site-header portfolio-header" ${attrs}><div class="portfolio-header-inner">
 <a class="portfolio-brand" href="${base}" aria-label="Uğur Cem Yıldız — ${t.home}">Uğur Cem Yıldız<span aria-hidden="true">.</span></a>
 <nav class="portfolio-primary-nav" aria-label="${lang==='tr'?'Birincil navigasyon':'Primary navigation'}">${nav('projects',t.navWork)}${link(cv,'CV')}${nav('contact',t.navContact)}</nav>
 <details class="portfolio-menu"><summary>${lang==='tr'?'Menü':'More'}</summary><nav aria-label="${t.menu}">${nav('about',t.navAbout)}${nav('experience',t.navExperience)}${nav('skills',t.navSkills)}${enabled?link(base+'careeros/','CareerOS'):''}</nav></details>
 <div class="portfolio-preferences"><a class="portfolio-language" href="${alternate}" hreflang="${lang==='tr'?'en':'tr'}" lang="${lang==='tr'?'en':'tr'}" aria-label="${lang==='tr'?'EN: Switch to English':'TR: Türkçe sürüme geç'}">${lang==='tr'?'EN':'TR'}</a>
 <button type="button" id="theme-toggle" class="portfolio-theme" aria-label="${lang==='tr'?'Açık veya koyu temaya geç':'Switch light or dark theme'}"><svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="1.5"><circle cx="12" cy="12" r="4"/><path d="M12 2v2m0 16v2M2 12h2m16 0h2M5 5l1.5 1.5m11 11L19 19M5 19l1.5-1.5m11-11L19 5"/></svg></button></div></div></header>`;
}

function mini(lang) {
 const t=content[lang];
 return `<aside class="mini-column" aria-label="${t.mini}"><div class="mini-stage"><div class="mini-scene-title" id="mini-title"></div><div class="mini-art"><div id="mini-character" role="img" aria-label="${t.mini}"></div><div class="mini-prop" id="mini-prop"><span id="mini-symbol"></span><small id="mini-prop-label"></small></div><div class="mini-floor"></div></div><details class="mini-options"><summary>${t.tools}</summary><div class="mini-controls"><span id="mini-label"></span><button type="button" id="mini-replay">${lang==='tr'?'Baştan oynat':'Replay'}</button></div></details><div class="mini-progress" aria-hidden="true"><i id="mini-progress"></i></div></div></aside>`;
}

function footer(lang) {
 const t=content[lang],base=lang==='tr'?'/tr/':'/';
 return `<footer class="portfolio-footer"><a href="${base}">Uğur Cem Yıldız</a><span>${t.location}</span><a href="mailto:yugurcem@gmail.com">yugurcem@gmail.com</a></footer>`;
}

function studies(lang) {
 const t=content[lang],base=lang==='tr'?'/tr/':'/';
 const cards=t.studies.map((s,i)=>`<article class="work-item"><a class="work-figure" href="${base}research/${s.path}/" tabindex="-1" aria-hidden="true"><img src="${i===0?'/portfolio-assets/drug-design-preview.webp':s.image}" alt="" width="640" height="${i===0?638:374}" loading="lazy" decoding="async"></a><div class="work-copy"><span class="portfolio-eyebrow">${s.kind}</span><h3>${link(base+'research/'+s.path+'/',s.title)}</h3><p class="work-question">${s.question}</p><dl><dt>${t.contribution}</dt><dd>${s.contribution}</dd><dt>${t.result}</dt><dd>${s.result}</dd></dl><p class="work-limit">${s.limit}</p>${link(base+'research/'+s.path+'/',t.open+' →','portfolio-text-link')}</div></article>`).join('');
 const careeros=enabled?`<article class="work-item work-software" id="coding"><a class="work-figure careeros-brand-figure" href="${base}careeros/" tabindex="-1" aria-hidden="true"><img src="/careeros-assets/careeros-mark.svg" alt="" width="112" height="112" loading="lazy" decoding="async"></a><div class="work-copy"><span class="portfolio-eyebrow">${t.careerosKind}</span><h3>${link(base+'careeros/',t.careerosTitle)}</h3><p>${t.careerosCopy}</p><p class="work-stack">${t.careerosEvidence}</p><div class="work-links">${link(base+'careeros/',t.case+' →','portfolio-text-link')}${link('https://github.com/Vipront/careeros',t.code+' ↗','portfolio-text-link')}</div></div></article>`:'';
 return section('projects',t.work,`<p class="section-intro">${t.selectedIntro}</p><div class="work-list">${cards}${careeros}</div>`);
}

function homeMain(raw,lang) {
 const t=content[lang],base=lang==='tr'?'/tr/':'/',cv=lang==='tr'?'/cv-tr.pdf':'/cv.pdf';
 const contact=raw.match(/<section id="contact"[\s\S]*?<\/section>/)?.[0];
 if(!contact)throw new Error('Home contact section missing');
 const hero=`<section class="hero-section portfolio-hero" aria-labelledby="hero-name"><span class="portfolio-eyebrow">${t.eyebrow}</span><h1 id="hero-name" class="hero-headline">Uğur Cem Yıldız</h1><p class="portfolio-position">${t.lead}</p><p class="hero-lead">${t.intro}</p><ul class="portfolio-evidence">${t.evidence.map(e=>`<li>${e}</li>`).join('')}${enabled?'<li>CareerOS '+(lang==='tr'?'prototipi':'prototype')+'</li>':''}</ul><div class="hero-actions">${link('#projects',t.primary,'btn btn-primary')}${link(cv,t.cv,'btn btn-secondary')}${link('#contact',t.contact,'portfolio-text-link')}</div></section>`;
 const experience=section('experience',t.experience,`<p class="portfolio-section-lead">${t.experienceLead}</p><p>${t.experienceCopy}</p><dl class="method-list">${t.methods.map(([name,description])=>`<div><dt>${name}</dt><dd>${description}</dd></div>`).join('')}</dl>`);
 const about=section('about',t.about,`<p>${t.aboutCopy}</p><ol class="portfolio-education">${t.education.map(([degree,school,dates,gpa])=>`<li><h3>${degree}</h3><p>${school}</p><p class="education-meta">${dates} · ${gpa}</p></li>`).join('')}</ol><p class="education-meta">${t.languages} · ${t.location}</p>`);
 const skills=section('skills',t.skills,`<p class="section-intro">${t.skillsIntro}</p><div class="portfolio-skills">${t.skillGroups.map(g=>`<article><span class="portfolio-eyebrow">${g.context}</span><h3>${g.title}</h3><p>${g.items}</p>${link(g.link,g.label+' →','portfolio-text-link')}<details><summary>${g.more}</summary><p>${g.detail}</p></details></article>`).join('')}</div>`);
 return `<main id="main-content"><div class="combined-layout">${mini(lang)}<div class="combined-content">${hero}${studies(lang)}${experience}${about}${skills}${contact}</div></div></main>`;
}

function record(lang,drug) {
 const t=content[lang];
 const rows=drug ? [[lang==='tr'?'Reseptör':'Receptor','CXCR4 · 3ODU'],['AutoDock Vina','v1.1.2 · exhaustiveness 32'],[lang==='tr'?'Arama kutusu':'Search box','52 × 52 × 52 Å'],[lang==='tr'?'Merkez':'Centre','x 19.78 · y −6.85 · z 68.11']] : [[lang==='tr'?'Ekspresyon':'Expression','GEPIA2 · BRCA / LUAD / COAD'],[lang==='tr'?'Sağkalım':'Survival','Kaplan–Meier Plotter · BRCA / LUAD / READ'],[lang==='tr'?'Genomik değişimler':'Genomics','cBioPortal · TCGA Pan-Cancer Atlas'],[lang==='tr'?'İmmün infiltrasyon':'Immune infiltration','TIMER2.0 · Spearman '+(lang==='tr'?'korelasyonu':'correlation')]];
 return section('research-record',t.record,`<p>${t.recordIntro}</p><h3>${t.contribution}</h3><p>${drug?t.contributionDrug:t.contributionCancer}</p><dl class="method-list">${rows.map(([a,b])=>`<div><dt>${esc(a)}</dt><dd>${esc(b)}</dd></div>`).join('')}</dl><div class="record-links">${link('/research-data/'+(drug?'drug-design':'cancer-bioinformatics')+'-record.json',t.manifest,'portfolio-text-link')}${drug?link('/research-data/docking-results.csv',t.csv,'portfolio-text-link')+link('/structures/cxcr4-fluoro-deoxy-amentoflavone.pdb',t.structure,'portfolio-text-link'):''}</div><details class="evidence-gaps"><summary>${lang==='tr'?'Bu kaydın sınırları':'Limits of this record'}</summary><p>${drug?t.missingDrug:t.missingCancer}</p></details>`);
}

function caseStudy(lang) {
 const t=content[lang];
 return section('development',t.caseHeading,`<p class="section-intro">${t.caseIntro}</p><dl class="case-decisions">${t.caseItems.map(([a,b])=>`<div><dt>${a}</dt><dd>${b}</dd></div>`).join('')}</dl><p class="work-limit">${t.caseBoundary}</p>${link('https://github.com/Vipront/careeros',t.code+' ↗','portfolio-text-link')}`);
}

export function prepareDocument(raw,route) {
 const lang=route.startsWith('/tr/')?'tr':'en',isHome=['/','/tr/'].includes(route),isCase=route.includes('/careeros/');
 let head=raw.match(/<head>([\s\S]*?)<\/head>/)?.[1];
 let main=raw.match(/<main\b[^>]*>[\s\S]*?<\/main>/)?.[0];
 if(!head||!main)throw new Error('Invalid approved document for '+route);
 if(isHome)main=homeMain(raw,lang);
 else {
  main=main.replace(/<aside class="mini-column"[\s\S]*?<\/aside>/,mini(lang));
  if(isCase) main=main.replace(/(<section\b[^>]*\bid="workflow"[^>]*>)/,caseStudy(lang)+'$1');
  else {
   const drug=route.includes('structure-based-drug-design');
   main=main.replace(/(<section id="research-limitations")/,record(lang,drug)+'$1');
   main=main.replace(/(<nav class="research-toc"[^>]*>)([\s\S]*?)(<\/nav>)/,`$1$2<a href="#research-record">${lang==='tr'?'Analiz kaydı':'Analysis record'}</a>$3`);
  }
 }
 // Preserve reviewed anti-FOUC script byte-for-byte; replace the old inline click
 // listener in the header with one small external progressive-enhancement script.
 head=head.replace(/<link rel="icon" href="data:,">/,'<link rel="icon" href="/favicon-32x32.png" sizes="32x32">');
 head+='<link rel="stylesheet" href="/portfolio.css">';
 if(!enabled&&isHome)head=head.replace(/CareerOS/g,lang==='tr'?'kişisel projeler':'personal projects');
 const scripts=[...raw.matchAll(/<script\b[^>]*src="([^"]+)"[^>]*><\/script>/g)].map(m=>m[1]).filter(s=>!s.startsWith('/_vercel/'));
 const scriptTags=[...new Set([...scripts,'/portfolio.js'])].map(src=>`<script defer src="${src}"></script>`).join('');
 const pageType=isHome?'home':isCase?'case':'research';
 return `<!DOCTYPE html><html lang="${lang}" data-astro-cid-u2x246h4><head>${head}</head><body class="portfolio-page portfolio-${pageType}"><a href="#main-content" class="skip-link" ${attrs}>${lang==='tr'?'Ana içeriğe atla':'Skip to main content'}</a>${header(lang,route)}${main}${footer(lang)}${scriptTags}</body></html>`;
}

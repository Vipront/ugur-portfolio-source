// Native details menus work without JavaScript. These enhancements keep theme,
// keyboard dismissal and route-preserving language switching consistent.
(() => {
 const button=document.getElementById('theme-toggle');
 const syncThemeMeta=(theme)=>{
  button?.setAttribute('aria-pressed',theme==='dark'?'true':'false');
  const meta=document.querySelector('meta[name="theme-color"]');
  if(meta)meta.setAttribute('content',theme==='dark'?'#25231f':'#faf5eb');
 };
 syncThemeMeta(document.documentElement.dataset.theme==='dark'?'dark':'light');
 button?.addEventListener('click',()=>{
  const theme=document.documentElement.dataset.theme==='dark'?'light':'dark';
  document.documentElement.dataset.theme=theme;
  syncThemeMeta(theme);
  try{localStorage.setItem('theme',theme);}catch{}
 });
 document.querySelectorAll('[data-copy-email]').forEach(copyBtn=>{
  const icon=copyBtn.querySelector('span');
  const defaultIcon=icon?icon.textContent:copyBtn.textContent;
  copyBtn.addEventListener('click',async()=>{
   const email=copyBtn.getAttribute('data-copy-email')||'';
   if(!email||!navigator.clipboard)return;
   try{
    await navigator.clipboard.writeText(email);
    if(icon)icon.textContent='✓';else copyBtn.textContent='✓';
    setTimeout(()=>{if(icon)icon.textContent=defaultIcon;else copyBtn.textContent=defaultIcon;},1800);
   }catch{}
  });
 });
 const menu=document.querySelector('.portfolio-menu');
 document.addEventListener('keydown',event=>{
  if(event.key==='Escape'&&menu?.open){menu.open=false;menu.querySelector('summary').focus();}
 });
 document.addEventListener('click',event=>{if(menu?.open&&!menu.contains(event.target))menu.open=false;});
 menu?.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>{menu.open=false;}));
 const language=document.querySelector('.portfolio-language');
 if(language){
  const path=location.pathname;
  language.href=(path.startsWith('/tr/')?path.slice(3):'/tr'+path)+location.hash;
 }
})();

// Native details menus work without JavaScript. These enhancements keep theme,
// keyboard dismissal and route-preserving language switching consistent.
(() => {
 const button=document.getElementById('theme-toggle');
 button?.addEventListener('click',()=>{
  const theme=document.documentElement.dataset.theme==='dark'?'light':'dark';
  document.documentElement.dataset.theme=theme;
  try{localStorage.setItem('theme',theme);}catch{}
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

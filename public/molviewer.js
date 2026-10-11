// Interactive 3D docking pose viewer. 3Dmol.js is self-hosted and only fetched after the user asks for it.
(() => {
  const root = document.querySelector('[data-mol-viewer]');
  if (!root) return;
  const en = document.documentElement.lang === 'en';
  const t = en
    ? { loading: 'Loading 3D structure…', ready: '3D structure loaded. Drag to rotate, scroll or pinch to zoom.', failed: '3D viewer could not be loaded. The 2D interaction map above shows the same pose.', noGl: 'Your browser does not support WebGL, so the 3D viewer is unavailable.' }
    : { loading: '3D yapı yükleniyor…', ready: '3D yapı yüklendi. Döndürmek için sürükleyin, yakınlaştırmak için kaydırın veya iki parmakla sıkıştırın.', failed: '3D görüntüleyici yüklenemedi. Yukarıdaki 2D etkileşim haritası aynı pozu gösterir.', noGl: 'Tarayıcınız WebGL desteklemediği için 3D görüntüleyici kullanılamıyor.' };
  const start = root.querySelector('[data-mol-start]');
  const stage = root.querySelector('[data-mol-stage]');
  const status = root.querySelector('[data-mol-status]');
  const controls = root.querySelector('[data-mol-controls]');
  const residues = (root.dataset.residues || '').split(',').map(Number).filter(Boolean);
  const reduceMotion = matchMedia('(prefers-reduced-motion: reduce)').matches;
  let viewer = null;
  let spinning = false;

  const loadLibrary = () => window.$3Dmol ? Promise.resolve() : new Promise((resolve, reject) => {
    const s = document.createElement('script');
    s.src = '/vendor/3Dmol-min.js';
    s.onload = resolve; s.onerror = reject;
    document.head.append(s);
  });
  const isDark = () => document.documentElement.dataset.theme === 'dark';
  const cardColor = () => {
    const m = getComputedStyle(root).backgroundColor.match(/\d+/g);
    return m && m.length >= 3 ? '#' + m.slice(0, 3).map(n => Number(n).toString(16).padStart(2, '0')).join('') : null;
  };
  const palette = () => {
    const base = isDark()
      ? { bg: '#161b22', protein: '#8b949e', ligand: '#56d4bc', label: '#161b22', labelText: '#e6edf3' }
      : { bg: '#ffffff', protein: '#9aa0a6', ligand: '#15483f', label: '#ffffff', labelText: '#161719' };
    const bg = cardColor();
    return bg ? { ...base, bg, label: bg } : base;
  };

  function style() {
    const c = palette();
    viewer.setBackgroundColor(c.bg);
    viewer.setStyle({}, {});
    viewer.setStyle({ hetflag: false }, { cartoon: { color: c.protein, opacity: 0.55 } });
    viewer.setStyle({ resi: residues, hetflag: false }, { cartoon: { color: c.protein, opacity: 0.55 }, stick: { colorscheme: 'grayCarbon', radius: 0.16 } });
    viewer.setStyle({ resn: 'LIG' }, { stick: { colorscheme: { prop: 'elem', map: { C: c.ligand, O: '#d1453b', F: '#3fa34d', N: '#3b6fd1' } }, radius: 0.24 } });
    viewer.removeAllLabels();
    for (const resi of residues) {
      const atom = viewer.selectedAtoms({ resi, atom: 'CA', hetflag: false })[0];
      if (atom) viewer.addLabel(`${atom.resn}${resi}`, { position: atom, fontSize: 12, fontColor: c.labelText, backgroundColor: c.label, backgroundOpacity: 0.85, borderThickness: 0, inFront: true });
    }
    viewer.render();
  }
  const focusPocket = () => { viewer.zoomTo({ resn: 'LIG' }); viewer.zoom(0.7); viewer.render(); };

  async function init() {
    start.disabled = true;
    status.textContent = t.loading;
    try {
      const probe = document.createElement('canvas');
      if (!(probe.getContext('webgl2') || probe.getContext('webgl'))) throw Object.assign(new Error('nogl'), { noGl: true });
      const [, pdb] = await Promise.all([loadLibrary(), fetch(root.dataset.src).then(r => { if (!r.ok) throw new Error(r.status); return r.text(); })]);
      stage.hidden = false;
      viewer = window.$3Dmol.createViewer(stage, { antialias: true, backgroundColor: palette().bg });
      viewer.addModel(pdb, 'pdb');
      style();
      focusPocket();
      start.hidden = true;
      controls.hidden = false;
      status.textContent = t.ready;
      new MutationObserver(style).observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] });
      addEventListener('resize', () => viewer.resize());
    } catch (e) {
      status.textContent = e.noGl ? t.noGl : t.failed;
      stage.hidden = true;
      start.disabled = false;
    }
  }

  start.addEventListener('click', init);
  controls.addEventListener('click', e => {
    const action = e.target.closest('button')?.dataset.molAction;
    if (!viewer || !action) return;
    if (action === 'reset') { spinning = false; viewer.spin(false); focusPocket(); }
    if (action === 'whole') { viewer.zoomTo(); viewer.render(); }
    if (action === 'spin') { spinning = !spinning; viewer.spin(spinning ? 'y' : false); }
    controls.querySelector('[data-mol-action="spin"]')?.setAttribute('aria-pressed', String(spinning));
  });
  if (reduceMotion) controls.querySelector('[data-mol-action="spin"]')?.setAttribute('data-reduced', '');
})();

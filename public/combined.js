(() => {
  const english = document.documentElement.lang === 'en';
  const text = (tr, en) => english ? en : tr;

  // Synchronize CSS --header-height dynamically with ResizeObserver
  const header = document.querySelector('header, .site-header');
  function syncHeaderHeight() {
    if (header) {
      const h = header.getBoundingClientRect().height;
      if (h > 0) {
        document.documentElement.style.setProperty('--header-height', `${Math.round(h)}px`);
      }
    }
  }
  if (header && typeof ResizeObserver !== 'undefined') {
    new ResizeObserver(syncHeaderHeight).observe(header);
  }
  syncHeaderHeight();
  window.addEventListener('resize', syncHeaderHeight, { passive: true });

  const mini = document.getElementById('mini-character');
  const art = document.querySelector('.mini-art');
  const prop = document.getElementById('mini-prop');
  const label = document.getElementById('mini-label');
  const replay = document.getElementById('mini-replay');
  if (!mini || !art || !prop || !label || !replay) return;

  const entries = [...document.querySelectorAll('.combined-content section, .editorial-project-item, .edu-item, .skills-cluster-wrap, .project-header, .scientific-figure')];
  if (!entries.length) entries.push(...document.querySelectorAll('.combined-content h2'));

  const motionQuery = matchMedia('(prefers-reduced-motion: reduce)');
  let reduced = motionQuery.matches;

  let isUserPaused = false;
  try {
    if (sessionStorage.getItem('mini-paused') === 'true') {
      isUserPaused = true;
    }
  } catch (_) {}

  replay.textContent = text('Baştan oynat ↻', 'Replay ↻');

  let next = document.getElementById('mini-next');
  if (!next) {
    next = document.createElement('button');
    next.id = 'mini-next';
    next.type = 'button';
    replay.before(next);
  }
  next.textContent = text('Diğer hareket →', 'Next action →');

  let pauseBtn = document.getElementById('mini-pause');
  if (!pauseBtn) {
    pauseBtn = document.createElement('button');
    pauseBtn.id = 'mini-pause';
    pauseBtn.type = 'button';
    replay.before(pauseBtn);
  }
  pauseBtn.setAttribute('aria-pressed', isUserPaused ? 'true' : 'false');
  pauseBtn.textContent = isUserPaused ? text('Sürdür ▶', 'Resume ▶') : text('Duraklat ⏸', 'Pause ⏸');

  label.setAttribute('aria-live', 'off');
  art.dataset.paused = isUserPaused ? 'true' : 'false';

  const svg = (body) => `<svg viewBox="0 0 120 100" aria-hidden="true">${body}</svg>`;
  const diagrams = {
    welcome: svg('<path d="M25 75h70M40 70V30h40v40"/><path class="draw-line" d="m45 45 10 10 20-22"/>'),
    study: svg('<path d="M60 80V25q-22-14-44-2v52q22-12 44 5Zm0 0V25q22-14 44-2v52q-22-12-44 5Z"/><path class="draw-line" d="M27 35h22M27 45h22M72 35h20M72 45h20"/>'),
    lab: svg('<path d="M45 15h30M50 15v28L30 78q-7 12 7 12h46q14 0 7-12L70 43V15"/><path class="liquid" d="M42 64h36l13 23H29Z"/><circle class="bubble b1" cx="51" cy="73" r="3"/><circle class="bubble b2" cx="68" cy="80" r="4"/>'),
    molecule: svg('<path class="bonds" d="m60 48-30-20m30 20 32-20m-32 20 0 35m0-35-33 27m33-27 35 25"/><g class="atom"><circle cx="60" cy="48" r="11"/><circle cx="30" cy="28" r="7"/><circle cx="92" cy="28" r="7"/><circle cx="60" cy="83" r="7"/><circle cx="27" cy="75" r="7"/><circle cx="95" cy="73" r="7"/></g>'),
    chart: svg('<path d="M20 15v68h85"/><path class="chart-line one" d="M25 30h13v8h17v12h17v8h17v12h14"/><path class="chart-line two" d="M25 30h13v19h17v15h17v10h17v5h14"/><circle class="chart-dot" cx="72" cy="58" r="4"/>'),
    code: '<div class="mini-terminal"><div class="terminal-dots">● ● ●</div><span class="code-row">plan → build</span><span class="code-row">tools.run()</span><span class="code-row">test <b>✓</b></span><span class="terminal-cursor">▌</span></div>',
    mail: svg('<rect x="15" y="30" width="90" height="58" rx="6"/><path class="envelope-flap" d="m15 30 45 34 45-34"/><path class="paper" d="M35 40V14h50v26M45 23h30M45 31h22"/>'),
    skills: svg('<path d="M20 25h80M20 50h80M20 75h80"/><circle class="slider s1" cx="40" cy="25" r="7"/><circle class="slider s2" cx="80" cy="50" r="7"/><circle class="slider s3" cx="50" cy="75" r="7"/>')
  };

  const steps = {
    welcome: [['base', 7, 'Merhaba!', 'Hello!'], ['base', 4, 'Çalışmalarımı göstereyim.', 'Let me show you my work.']],
    study: [['base', 4, 'Biyoloji ve programlama', 'Biology & programming'], ['work', 2, 'Öğren, dene, geliştir', 'Learn, try, build']],
    lab: [['work', 0, 'Pipetleme · örnek hazırlığı', 'Pipetting · sample preparation'], ['work', 1, 'Mikroskopta inceleme', 'Microscopy'], ['work', 3, 'Sonuçları değerlendiriyorum', 'Reviewing results']],
    molecule: [['base', 5, 'CXCR4 · molekül tasarımı', 'CXCR4 · molecular design'], ['work', 2, 'Docking hesaplamaları', 'Docking calculations'], ['work', 3, 'Etkileşimleri karşılaştırıyorum', 'Comparing interactions']],
    chart: [['work', 2, 'Gen ekspresyonu analizi', 'Gene expression analysis'], ['work', 3, 'Sağkalım eğrilerini inceliyorum', 'Reading survival curves'], ['base', 4, 'İmmün infiltrasyon ilişkisi', 'Immune infiltration association']],
    code: [['work', 2, 'Bir agent iş akışı kuruyorum', 'Building an agent workflow'], ['work', 2, 'Araçları birbirine bağlıyorum', 'Connecting tools'], ['base', 4, 'Çalıştır, kontrol et, geliştir', 'Run, check, improve']],
    mail: [['work', 2, 'Mesajını okuyorum', 'Reading your message'], ['base', 4, 'Araştırma mı, yazılım mı?', 'Research or software?'], ['base', 7, 'Bana ulaşabilirsin.', 'Get in touch.']],
    skills: [['work', 0, 'Laboratuvar teknikleri', 'Laboratory techniques'], ['base', 5, 'Hesaplamalı araştırma', 'Computational research'], ['work', 2, 'Programlama ve veri', 'Programming & data']]
  };

  Object.assign(diagrams, {
    'question': diagrams.study,
    'drug-method': diagrams.molecule,
    'cancer-method': diagrams.code,
    'drug-findings': diagrams.molecule,
    'cancer-findings': diagrams.chart,
    'interpretation': diagrams.study,
    'sources': diagrams.study
  });

  Object.assign(steps, {
    'question': [['base', 4, 'Araştırma sorusunu kuruyorum', 'Defining the research question'], ['work', 3, 'Hipotezleri karşılaştırıyorum', 'Comparing hypotheses']],
    'drug-method': [['base', 5, 'Reseptör ve ligand hazırlığı', 'Receptor & ligand preparation'], ['work', 2, 'AutoDock Vina · docking', 'AutoDock Vina · docking'], ['work', 3, 'ADME ve toksisite tahminleri', 'ADME & toxicity predictions']],
    'cancer-method': [['work', 2, 'TCGA / GTEx · ekspresyon', 'TCGA / GTEx · expression'], ['work', 3, 'Kaplan–Meier · sağkalım', 'Kaplan–Meier · survival'], ['base', 4, 'TIMER2.0 / STRING · ilişkiler', 'TIMER2.0 / STRING · associations']],
    'drug-findings': [['work', 3, 'İki aday · aynı docking skoru', 'Two candidates · tied docking scores'], ['base', 5, 'Bağlanma ve toksisiteyi birlikte yorumluyorum', 'Interpreting binding & toxicity together']],
    'cancer-findings': [['work', 3, 'LUAD · p = 0.007', 'LUAD · p = 0.007'], ['base', 4, 'Dokuya göre değişen ilişkiler', 'Tissue-dependent associations']],
    'interpretation': [['work', 3, 'Tahminlerin sınırlarını inceliyorum', 'Reviewing the limits of predictions'], ['base', 4, 'Deneysel doğrulama gerekli', 'Experimental validation is needed']],
    'sources': [['work', 2, 'Yöntem kaynaklarını inceliyorum', 'Reviewing method references'], ['base', 4, 'Özgün tez ve kaynakça', 'Original thesis & references']]
  });

  let current = null, scene = 'welcome', started = 0, phase = -1, manualPhase = 0;
  let x = 0, target = 0, last = 0, walkUntil = 0, rafId = null, pauseStartTime = 0;
  let isVisible = true, isDocVisible = !document.hidden, isInactive = false;
  let lastTransform = '', lastSheet = '', lastFrame = -1, lastAction = '';

  const miniCol = document.querySelector('.mini-column');
  let cachedMetrics = [];
  function syncMiniHeight() {
    if (!miniCol) return;
    const value = `${Math.ceil(miniCol.getBoundingClientRect().height)}px`;
    if (document.documentElement.style.getPropertyValue('--mini-height') !== value) {
      document.documentElement.style.setProperty('--mini-height', value);
    }
  }

  function updateCachedMetrics() {
    const scrollY = window.scrollY || window.pageYOffset || 0;
    cachedMetrics = entries.map((el, i) => {
      const r = el.getBoundingClientRect();
      return { el, i, top: r.top + scrollY, bottom: r.bottom + scrollY, height: r.height };
    });
  }

  function chooseScene(el) {
    const s = (el.id + ' ' + el.textContent).toLowerCase();
    const researchPage = location.pathname.includes('/research/');
    const researchStep = el.dataset.researchStep || el.closest('[data-research-step]')?.dataset.researchStep;
    if (researchPage && researchStep) {
      const cancer = location.pathname.includes('cancer');
      if (researchStep === 'questions') return 'question';
      if (researchStep === 'methodology') return cancer ? 'cancer-method' : 'drug-method';
      if (researchStep === 'tools') return 'code';
      if (researchStep === 'findings') return cancer ? 'cancer-findings' : 'drug-findings';
      if (researchStep === 'limitations') return 'interpretation';
      if (researchStep === 'references') return 'sources';
    }
    if (el.classList.contains('hero-section')) return 'welcome';
    if (el.id === 'coding') return 'code';
    if (el.id === 'contact') return 'mail';
    if (el.id === 'experience') return 'lab';
    if (el.closest('#skills')) return 'skills';
    if (el.closest('#about')) return 'study';
    if (s.includes('kanser') || s.includes('cancer') || s.includes('sağkalım') || s.includes('survival') || s.includes('infiltr')) return 'chart';
    if (s.includes('amentoflav') || s.includes('docking') || s.includes('kenetlenme') || s.includes('ilaç') || s.includes('drug')) return 'molecule';
    if (researchPage) return location.pathname.includes('cancer') ? 'chart' : 'molecule';
    if (el.id === 'projects') return 'molecule';
    return 'study';
  }

  function setFrame(sheet, frame) {
    if (sheet === lastSheet && frame === lastFrame) return;
    const sheetChanged = sheet !== lastSheet;
    if (sheetChanged) {
      lastSheet = sheet;
      mini.style.backgroundImage = `url('/assets/${sheet === 'work' ? 'mini-ugur-work-loops.webp' : 'mini-ugur-poses.webp'}')`;
      mini.style.backgroundSize = sheet === 'work' ? '400% 400%' : '400% 200%';
    }
    if (sheetChanged || frame !== lastFrame) {
      lastFrame = frame;
      mini.style.backgroundPosition = `${(frame % 4) * 100 / 3}% ${Math.floor(frame / 4) * 100 / (sheet === 'work' ? 3 : 1)}%`;
    }
  }

  function applyAction(p) {
    const stepList = steps[scene] || steps.welcome;
    const action = stepList[p] || stepList[0];
    phase = p;
    const caption = action[english ? 3 : 2];
    if (label.textContent !== caption) label.textContent = caption;
    if (art.dataset.phase !== String(p)) art.dataset.phase = p;
    const accessibleLabel = text('Mini Uğur: ', 'Mini Uğur: ') + caption;
    if (mini.getAttribute('aria-label') !== accessibleLabel) mini.setAttribute('aria-label', accessibleLabel);
    const frame = action[0] === 'work' ? action[1] * 4 : action[1];
    setFrame(action[0], frame);
    const actStr = `${scene}-${p}`;
    if (actStr !== lastAction) {
      mini.dataset.action = actStr;
      lastAction = actStr;
    }
    if (reduced || isUserPaused) {
      const tStr = `translateX(${target}px) translateY(0px) rotate(0deg)`;
      if (tStr !== lastTransform) {
        mini.style.transform = tStr;
        lastTransform = tStr;
      }
    }
  }

  function renderStaticState() {
    target = -art.clientWidth * 0.14;
    x = target;
    applyAction(manualPhase >= 0 ? manualPhase : 0);
  }

  function change(el, time, index) {
    if (current === el) return;
    current = el;
    scene = chooseScene(el);
    started = time;
    pauseStartTime = (reduced || isUserPaused || isInactive) ? time : 0;
    phase = -1;
    manualPhase = 0;
    const heading = el.querySelector('h1,h2,h3')?.textContent || el.querySelector('.edu-degree')?.textContent || el.querySelector('img')?.alt || el.textContent;
    const titleEl = document.getElementById('mini-title');
    if (titleEl) titleEl.textContent = heading.trim().slice(0, 85);
    prop.innerHTML = diagrams[scene] || '';
    prop.classList.add('show');
    art.dataset.scene = scene;
    art.dataset.researchStep = el.dataset.researchStep || el.closest('[data-research-step]')?.dataset.researchStep || '';
    target = -art.clientWidth * 0.14;
    walkUntil = time + (reduced || isUserPaused ? 0 : 750);
    const prog = document.getElementById('mini-progress');
    if (prog) prog.style.width = ((index + 1) / entries.length * 100) + '%';
    if (reduced || isUserPaused) {
      applyAction(0);
    }
  }

  function checkScene() {
    if (!entries.length) return;
    if (!cachedMetrics.length) updateCachedMetrics();
    const stageBottom = miniCol ? miniCol.getBoundingClientRect().bottom : 0;
    const anchor = innerWidth <= 750
      ? stageBottom + Math.min(180, Math.max(60, (innerHeight - stageBottom) * 0.35))
      : innerHeight * 0.42;
    const currentY = (window.scrollY || window.pageYOffset || 0) + anchor;
    let selected = cachedMetrics[0]?.el || entries[0];
    let best = Infinity;
    let idx = 0;
    for (let k = 0; k < cachedMetrics.length; k++) {
      const m = cachedMetrics[k];
      if (m.height <= 0) continue;
      const contains = m.top <= currentY && m.bottom >= currentY;
      const d = contains ? 0 : Math.min(Math.abs(m.top - currentY), Math.abs(m.bottom - currentY));
      if (d <= best) {
        best = d;
        selected = m.el;
        idx = m.i;
      }
    }
    if (selected) change(selected, performance.now(), idx);
  }

  let sceneScheduled = false;
  function scheduleSceneCheck() {
    if (sceneScheduled) return;
    sceneScheduled = true;
    requestAnimationFrame(() => {
      sceneScheduled = false;
      checkScene();
    });
  }

  function onLayoutChange() {
    updateCachedMetrics();
    syncHeaderHeight();
    syncMiniHeight();
    target = -art.clientWidth * 0.14;
    if (reduced || isUserPaused) renderStaticState();
    scheduleSceneCheck();
  }

  window.addEventListener('scroll', scheduleSceneCheck, { passive: true });
  window.addEventListener('resize', onLayoutChange, { passive: true });
  window.addEventListener('load', onLayoutChange, { passive: true });
  if (document.fonts) document.fonts.ready.then(onLayoutChange);
  const contentParent = document.querySelector('.combined-content') || document.body;
  if (typeof ResizeObserver !== 'undefined' && contentParent) {
    new ResizeObserver(onLayoutChange).observe(contentParent);
  }
  if (typeof ResizeObserver !== 'undefined' && miniCol) {
    new ResizeObserver(onLayoutChange).observe(miniCol);
  }

  function stopAnimation() {
    if (rafId) {
      cancelAnimationFrame(rafId);
      rafId = null;
    }
    if (!pauseStartTime) {
      pauseStartTime = performance.now();
    }
  }

  function resumeAnimation() {
    if (reduced || isUserPaused || isInactive) {
      renderStaticState();
      return;
    }
    if (pauseStartTime > 0) {
      const elapsed = performance.now() - pauseStartTime;
      started += elapsed;
      walkUntil += elapsed;
      pauseStartTime = 0;
    }
    last = performance.now();
    if (!rafId) {
      rafId = requestAnimationFrame(animate);
    }
  }

  function updateInactive() {
    const inactive = !isDocVisible || !isVisible;
    if (inactive !== isInactive) {
      isInactive = inactive;
      art.dataset.inactive = isInactive ? 'true' : 'false';
      if (isInactive) {
        stopAnimation();
      } else {
        resumeAnimation();
      }
    }
  }

  if (typeof IntersectionObserver !== 'undefined') {
    const io = new IntersectionObserver((ents) => {
      isVisible = ents[0].isIntersecting;
      updateInactive();
    }, { threshold: 0.05 });
    io.observe(art);
  }

  document.addEventListener('visibilitychange', () => {
    isDocVisible = !document.hidden;
    updateInactive();
  });

  function onMotionChange(e) {
    reduced = e.matches;
    if (reduced) {
      manualPhase = Math.max(0, phase);
      stopAnimation();
      renderStaticState();
    } else {
      resumeAnimation();
    }
  }
  if (motionQuery.addEventListener) {
    motionQuery.addEventListener('change', onMotionChange);
  } else if (motionQuery.addListener) {
    motionQuery.addListener(onMotionChange);
  }

  function setPause(paused) {
    if (paused) manualPhase = Math.max(0, phase);
    isUserPaused = paused;
    art.dataset.paused = isUserPaused ? 'true' : 'false';
    pauseBtn.setAttribute('aria-pressed', isUserPaused ? 'true' : 'false');
    pauseBtn.textContent = isUserPaused ? text('Sürdür ▶', 'Resume ▶') : text('Duraklat ⏸', 'Pause ⏸');
    try {
      sessionStorage.setItem('mini-paused', isUserPaused ? 'true' : 'false');
    } catch (_) {}
    if (isUserPaused) {
      stopAnimation();
      renderStaticState();
    } else {
      resumeAnimation();
    }
  }

  pauseBtn.addEventListener('click', () => setPause(!isUserPaused));

  replay.addEventListener('click', () => {
    const now = performance.now();
    started = now;
    pauseStartTime = (reduced || isUserPaused || isInactive) ? now : 0;
    phase = 0;
    manualPhase = 0;
    x = target + 35;
    walkUntil = now + (reduced || isUserPaused ? 0 : 750);
    applyAction(0);
    if (!reduced && !isUserPaused && !isInactive) {
      if (!rafId) {
        last = now;
        rafId = requestAnimationFrame(animate);
      }
    }
  });

  next.addEventListener('click', () => {
    const stepList = steps[scene] || steps.welcome;
    manualPhase = (Math.max(0, phase) + 1) % stepList.length;
    phase = manualPhase;
    const now = performance.now();
    started = now - 750 - manualPhase * 4200;
    pauseStartTime = (reduced || isUserPaused || isInactive) ? now : 0;
    walkUntil = 0;
    applyAction(manualPhase);
    if (!reduced && !isUserPaused && !isInactive) {
      if (!rafId) {
        last = performance.now();
        rafId = requestAnimationFrame(animate);
      }
    }
  });

  function animate(time) {
    if (reduced || isUserPaused || isInactive) {
      rafId = null;
      renderStaticState();
      return;
    }
    const dt = Math.min(50, time - last);
    last = time;
    const age = Math.max(0, time - started - 750);
    const stepList = steps[scene] || steps.welcome;
    const p = Math.floor(age / 4200) % stepList.length;
    const action = stepList[p];
    if (phase !== p) {
      phase = p;
      label.textContent = action[english ? 3 : 2];
      art.dataset.phase = p;
      mini.setAttribute('aria-label', text('Mini Uğur: ', 'Mini Uğur: ') + label.textContent);
    }
    x = x + (target - x) * Math.min(1, dt * 0.008);
    const walking = time < walkUntil;
    const bob = walking ? -Math.abs(Math.sin(time * 0.012)) * 2 : Math.sin(time * 0.002) * 1.2;
    const tilt = !walking && action[0] === 'base' ? Math.sin(time * 0.0015) : 0;
    const tStr = `translateX(${x.toFixed(2)}px) translateY(${bob.toFixed(2)}px) rotate(${tilt.toFixed(2)}deg)`;
    if (tStr !== lastTransform) {
      mini.style.transform = tStr;
      lastTransform = tStr;
    }
    const frame = action[0] === 'work' ? action[1] * 4 + Math.floor(age / 260) % 4 : action[1];
    const sheet = walking ? 'base' : action[0];
    const frameNum = walking ? Math.floor(time / 150) % 4 : frame;
    setFrame(sheet, frameNum);
    const actStr = walking ? 'walking' : `${scene}-${p}`;
    if (actStr !== lastAction) {
      mini.dataset.action = actStr;
      lastAction = actStr;
    }
    rafId = requestAnimationFrame(animate);
  }

  updateCachedMetrics();
  updateInactive();
  checkScene();

  if (!reduced && !isUserPaused && !isInactive) {
    last = performance.now();
    rafId = requestAnimationFrame(animate);
  } else {
    renderStaticState();
  }
})();

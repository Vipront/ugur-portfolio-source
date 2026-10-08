(() => {
  const researchEnglish = document.documentElement.lang === 'en';
  const researchFigures = [...document.querySelectorAll('.scientific-figure')].filter(f => f.querySelector('img'));

  if (researchFigures.length > 0) {
    const viewer = document.createElement('dialog');
    viewer.className = 'research-viewer';
    viewer.setAttribute('aria-label', researchEnglish ? 'Research figure viewer' : 'Araştırma görseli');
    viewer.innerHTML = `<div class="viewer-bar"><button type="button" data-dir="-1" aria-label="${researchEnglish ? 'Previous figure' : 'Önceki görsel'}">←</button><span class="viewer-count"></span><button type="button" data-dir="1" aria-label="${researchEnglish ? 'Next figure' : 'Sonraki görsel'}">→</button><button type="button" class="viewer-close">${researchEnglish ? 'Close' : 'Kapat'} ×</button></div><img class="viewer-image" alt=""><p class="viewer-caption"></p>`;
    document.body.append(viewer);

    let figureIndex = 0;
    let returnFocus = null;

    function showFigure(i) {
      if (!researchFigures.length) return;
      figureIndex = (i + researchFigures.length) % researchFigures.length;
      const f = researchFigures[figureIndex];
      const img = f.querySelector('img');
      const vImg = viewer.querySelector('.viewer-image');
      const caption = viewer.querySelector('.viewer-caption');
      const count = viewer.querySelector('.viewer-count');
      if (img && vImg) {
        vImg.src = img.src;
        vImg.alt = img.alt || '';
      }
      if (caption) {
        caption.textContent = f.querySelector('figcaption')?.textContent || '';
      }
      if (count) {
        count.textContent = `${figureIndex + 1} / ${researchFigures.length}`;
      }
    }

    function openFigure(i, trigger) {
      returnFocus = trigger;
      showFigure(i);
      if (typeof viewer.showModal === 'function') {
        viewer.showModal();
      }
    }

    researchFigures.forEach((f, i) => {
      const b = document.createElement('button');
      b.type = 'button';
      b.className = 'figure-zoom';
      b.textContent = researchEnglish ? 'Enlarge figure ↗' : 'Görseli büyüt ↗';
      b.addEventListener('click', () => openFigure(i, b));
      f.append(b);
      const img = f.querySelector('img');
      if (img) {
        img.addEventListener('click', () => openFigure(i, b));
      }
    });

    viewer.querySelector('.viewer-close')?.addEventListener('click', () => viewer.close());
    viewer.querySelectorAll('[data-dir]').forEach(b => {
      b.addEventListener('click', () => showFigure(figureIndex + Number(b.dataset.dir)));
    });

    viewer.addEventListener('keydown', (e) => {
      if (e.key === 'ArrowRight') {
        e.preventDefault();
        showFigure(figureIndex + 1);
      }
      if (e.key === 'ArrowLeft') {
        e.preventDefault();
        showFigure(figureIndex - 1);
      }
    });

    viewer.addEventListener('close', () => returnFocus?.focus());
    viewer.addEventListener('click', (e) => {
      if (e.target === viewer) {
        const r = viewer.getBoundingClientRect();
        if (e.clientX < r.left || e.clientX > r.right || e.clientY < r.top || e.clientY > r.bottom) {
          viewer.close();
        }
      }
    });
  }

  const tocLinks = [...document.querySelectorAll('.research-toc a')];
  const miniArt = document.querySelector('.mini-art');

  if (tocLinks.length > 0) {
    const updateToc = () => {
      const step = miniArt ? (miniArt.dataset.researchStep || '') : '';
      tocLinks.forEach(a => {
        if (step && a.hash === `#research-${step}`) {
          a.setAttribute('aria-current', 'location');
        } else {
          a.removeAttribute('aria-current');
        }
      });
    };

    if (miniArt && typeof MutationObserver !== 'undefined') {
      new MutationObserver(updateToc).observe(miniArt, {
        attributes: true,
        attributeFilter: ['data-research-step']
      });
    }
    updateToc();
  }
})()

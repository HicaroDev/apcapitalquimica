(function () {
  'use strict';

  const CONFIG = {
    slideDir: 'slide',
    manifestFile: 'slide/manifest.json',
    defaultSlide: 'slide/slide-01.html'
  };

  let slides = [];
  let currentIndex = 0;
  const container = document.getElementById('slides-container');
  const sbNav = document.getElementById('sb-nav');
  const counter = document.getElementById('sb-counter');
  const prevBtn = document.getElementById('prev-btn');
  const nextBtn = document.getElementById('next-btn');
  const progressBar = document.getElementById('progress-bar');
  const loadingScreen = document.getElementById('loading-screen');

  function showSlide(index) {
    const total = slides.length;
    if (total === 0) return;

    index = Math.max(0, Math.min(total - 1, index));
    currentIndex = index;

    const prev = container.querySelector('.slide.active');
    if (prev) {
      prev.classList.remove('active');
      prev.classList.add('exit');
      setTimeout(() => prev.classList.remove('exit'), 400);
    }

    slides.forEach((el, i) => {
      if (i === currentIndex) {
        el.classList.add('active');
        el.classList.remove('exit');
      } else {
        el.classList.remove('active');
      }
    });

    updateUI();
  }

  function updateUI() {
    const total = slides.length;
    counter.textContent = `${currentIndex + 1} / ${total}`;

    prevBtn.disabled = currentIndex === 0;
    nextBtn.disabled = currentIndex === total - 1;

    const pct = total > 1 ? (currentIndex / (total - 1)) * 100 : 0;
    progressBar.style.width = pct + '%';

    document.querySelectorAll('.sb-item').forEach((item, i) => {
      item.classList.toggle('active', i === currentIndex);
    });

    if (slides[currentIndex]) {
      const title = slides[currentIndex].getAttribute('data-title') || `Slide ${currentIndex + 1}`;
      document.title = `Capital Química — ${title}`;
    }
  }

  function buildSidebar() {
    sbNav.innerHTML = '';
    slides.forEach((slide, i) => {
      const title = slide.getAttribute('data-title') || `Slide ${i + 1}`;
      const btn = document.createElement('button');
      btn.className = 'sb-item' + (i === 0 ? ' active' : '');
      btn.innerHTML = `<span class="sb-dot"></span>${title}`;
      btn.addEventListener('click', () => showSlide(i));
      sbNav.appendChild(btn);
    });
  }

  function navigate(delta) {
    const target = currentIndex + delta;
    if (target >= 0 && target < slides.length) {
      showSlide(target);
    }
  }

  function loadSlidesFromManifest(files) {
    if (!files || files.length === 0) {
      loadSingleSlide(CONFIG.defaultSlide);
      return;
    }

    let loaded = 0;
    const total = files.length;

    if (total === 0) {
      finishLoading();
      return;
    }

    files.forEach((file, index) => {
      fetch(file)
        .then(function (r) {
          if (!r.ok) throw new Error('Not found');
          return r.text();
        })
        .then(function (html) {
          insertSlide(html, index, file);
          loaded++;
          if (loaded === total) finishLoading();
        })
        .catch(function () {
          loaded++;
          if (loaded === total) finishLoading();
        });
    });
  }

  function insertSlide(html, index, file) {
    const section = document.createElement('section');
    section.className = 'slide';
    section.innerHTML = html;

    const titleMatch = html.match(/<h1[^>]*>([^<]+)<\/h1>/);
    if (titleMatch) section.setAttribute('data-title', titleMatch[1].trim());
    else section.setAttribute('data-title', `Slide ${index + 1}`);

    if (index === 0) section.classList.add('active');

    container.appendChild(section);
    slides.push(section);
  }

  function loadSingleSlide(file) {
    fetch(file)
      .then(function (r) {
        if (!r.ok) throw new Error('Not found');
        return r.text();
      })
      .then(function (html) {
        insertSlide(html, 0, file);
        finishLoading();
      })
      .catch(function () {
        createPlaceholderSlide();
        finishLoading();
      });
  }

  function createPlaceholderSlide() {
    const html = `<div class="badge">Guia Rápido</div>
<h1>Adicione seus <span>slides</span></h1>
<p class="desc" style="margin-bottom:24px">Coloque seus arquivos HTML de slide na pasta <code>slide/</code> e liste-os no <code>slide/manifest.json</code>.</p>
<div class="cards cards-2">
  <div class="card"><div class="cl">Formato</div><div class="ct">Fragmentos HTML</div><div class="cb">Cada slide é um arquivo .html com o conteúdo da seção.</div></div>
  <div class="card"><div class="cl">Manifesto</div><div class="ct">manifest.json</div><div class="cb">Liste os arquivos de slide na ordem desejada.</div></div>
</div>`;
    const section = document.createElement('section');
    section.className = 'slide active';
    section.setAttribute('data-title', 'Bem-vindo');
    section.innerHTML = html;
    container.appendChild(section);
    slides.push(section);
  }

  function finishLoading() {
    buildSidebar();
    updateUI();
    loadingScreen.classList.add('hide');
  }

  function init() {
    fetch(CONFIG.manifestFile)
      .then(function (r) {
        if (!r.ok) throw new Error('No manifest');
        return r.json();
      })
      .then(function (data) {
        loadSlidesFromManifest(data.files || data.slides || []);
      })
      .catch(function () {
        loadSingleSlide(CONFIG.defaultSlide);
      });
  }

  prevBtn.addEventListener('click', function () { navigate(-1); });
  nextBtn.addEventListener('click', function () { navigate(1); });

  document.addEventListener('keydown', function (e) {
    if (e.key === 'ArrowRight' || e.key === 'ArrowDown' || e.key === ' ') {
      e.preventDefault();
      navigate(1);
    } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
      e.preventDefault();
      navigate(-1);
    } else if (e.key === 'Home') {
      e.preventDefault();
      showSlide(0);
    } else if (e.key === 'End') {
      e.preventDefault();
      showSlide(slides.length - 1);
    } else if (e.key === 'f' || e.key === 'F') {
      if (!document.fullscreenElement) {
        document.documentElement.requestFullscreen();
      } else {
        document.exitFullscreen();
      }
    }
  });

  document.addEventListener('wheel', function (e) {
    if (e.deltaY > 0) navigate(1);
    else if (e.deltaY < 0) navigate(-1);
  }, { passive: true });

  let touchStartY = 0;
  document.addEventListener('touchstart', function (e) {
    touchStartY = e.changedTouches[0].screenY;
  }, { passive: true });

  document.addEventListener('touchend', function (e) {
    const diff = touchStartY - e.changedTouches[0].screenY;
    if (Math.abs(diff) > 50) {
      if (diff > 0) navigate(1);
      else navigate(-1);
    }
  }, { passive: true });

  init();
})();

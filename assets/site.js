/* Landing page: no frameworks, wallet access, tracking, or JavaScript animation loops. */
(() => {
  'use strict';
  document.documentElement.classList.add('js');
  const byId = id => document.getElementById(id);
  byId('current-year').textContent = String(new Date().getFullYear());

  const menu = document.querySelector('.menu-toggle');
  const nav = byId('main-nav');
  const closeMenu = () => {
    menu.setAttribute('aria-expanded', 'false');
    menu.setAttribute('aria-label', 'Open menu');
    nav.classList.remove('is-open');
  };
  menu.addEventListener('click', () => {
    const open = menu.getAttribute('aria-expanded') !== 'true';
    menu.setAttribute('aria-expanded', String(open));
    menu.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
    nav.classList.toggle('is-open', open);
  });
  nav.addEventListener('click', event => { if (event.target.closest('a')) closeMenu(); });
  document.addEventListener('keydown', event => {
    if (event.key === 'Escape' && menu.getAttribute('aria-expanded') === 'true') {
      closeMenu();
      menu.focus();
    }
  });
  document.addEventListener('click', event => {
    if (!event.target.closest('.site-header')) closeMenu();
  });

  // CSS owns animation. Pause it when hidden, offscreen or requested by the visitor.
  const motionButton = byId('motion-toggle');
  const motionPreference = window.matchMedia('(prefers-reduced-motion: reduce)');
  let motionPaused = false;
  function syncMotion() {
    const paused = motionPaused || motionPreference.matches;
    document.documentElement.classList.toggle('motion-paused', paused);
    motionButton.setAttribute('aria-pressed', String(paused));
    motionButton.textContent = motionPreference.matches ? 'Motion reduced' : paused ? '▶ Resume motion' : 'Ⅱ Pause motion';
    motionButton.disabled = motionPreference.matches;
  }
  motionButton.hidden = false;
  motionButton.addEventListener('click', () => { motionPaused = !motionPaused; syncMotion(); });
  motionPreference.addEventListener('change', syncMotion);
  syncMotion();
  const syncVisibility = () => document.documentElement.classList.toggle('page-inactive', document.hidden);
  document.addEventListener('visibilitychange', syncVisibility);
  window.addEventListener('pageshow', syncVisibility);
  const hero = byId('inicio');
  let heroObserver = null;
  if ('IntersectionObserver' in window) {
    heroObserver = new IntersectionObserver(entries => {
      hero.classList.toggle('scene-paused', !entries[0].isIntersecting);
    });
    heroObserver.observe(hero);
  }

  // Deliberately manual: no slideshow timer, auto movement, or hidden-tab work.
  const slides = [...document.querySelectorAll('.gallery-slide')];
  const choices = [...document.querySelectorAll('[data-slide]')];
  const slideNames = ['Farm', 'Discover', 'Explore'];
  let slideIndex = 0;
  function showSlide(index) {
    slideIndex = (index + slides.length) % slides.length;
    slides.forEach((slide, i) => { slide.hidden = i !== slideIndex; });
    choices.forEach((button, i) => button.setAttribute('aria-pressed', String(i === slideIndex)));
    byId('gallery-status').textContent = `Screenshot ${slideIndex + 1} of ${slides.length}: ${slideNames[slideIndex]}`;
  }
  choices.forEach((button, i) => button.addEventListener('click', () => showSlide(i)));
  byId('gallery-prev').addEventListener('click', () => showSlide(slideIndex - 1));
  byId('gallery-next').addEventListener('click', () => showSlide(slideIndex + 1));
  document.querySelector('.gallery').addEventListener('keydown', event => {
    if (event.key !== 'ArrowRight' && event.key !== 'ArrowLeft') return;
    event.preventDefault();
    showSlide(slideIndex + (event.key === 'ArrowRight' ? 1 : -1));
    choices[slideIndex].focus();
  });

  const dialog = byId('trailer-dialog');
  const player = byId('trailer-player');
  const trailerButton = document.querySelector('.trailer-trigger');
  trailerButton.addEventListener('click', () => {
    if (dialog.open) return;
    const frame = document.createElement('iframe');
    frame.src = 'https://www.youtube-nocookie.com/embed/99-lNGzBirc?autoplay=1&rel=0';
    frame.title = 'Grassland Forest trailer';
    frame.allow = 'autoplay; encrypted-media; picture-in-picture; fullscreen';
    frame.allowFullscreen = true;
    frame.referrerPolicy = 'strict-origin-when-cross-origin';
    player.replaceChildren(frame);
    dialog.showModal();
    document.body.classList.add('modal-open');
  });
  const stopTrailer = () => {
    player.replaceChildren();
    document.body.classList.remove('modal-open');
  };
  byId('close-trailer').addEventListener('click', () => dialog.close());
  dialog.addEventListener('close', stopTrailer);
  dialog.addEventListener('click', event => {
    if (event.target !== dialog) return;
    const box = dialog.getBoundingClientRect();
    if (event.clientX < box.left || event.clientX > box.right || event.clientY < box.top || event.clientY > box.bottom) dialog.close();
  });

  const form = byId('contact-form');
  const submit = form.querySelector('[type="submit"]');
  const status = byId('contact-status');
  const requests = new Set();
  let config = null;
  let configPromise = null;
  let submitting = false;
  let widget = null;
  let captchaToken = '';
  let captchaLoading = false;
  let captchaTimer = null;
  let captchaScript = null;
  submit.disabled = false;
  function report(message, state = '') {
    status.textContent = message;
    status.className = `form-status ${state}`;
  }
  async function requestJSON(url, options = {}) {
    const controller = new AbortController();
    requests.add(controller);
    const timer = setTimeout(() => controller.abort(), 12000);
    try {
      const response = await fetch(url, { ...options, credentials: 'same-origin', redirect: 'error', signal: controller.signal });
      if (!response.ok) {
        const error = new Error('request-failed');
        error.status = response.status;
        throw error;
      }
      if (!response.headers.get('content-type')?.includes('application/json')) throw new Error('invalid-response');
      return await response.json();
    } finally {
      clearTimeout(timer);
      requests.delete(controller);
    }
  }
  function getConfig() {
    if (config) return Promise.resolve(config);
    if (configPromise) return configPromise;
    configPromise = requestJSON('api/contact/config').then(data => {
      if (typeof data.recaptchaRequired !== 'boolean' || (data.recaptchaRequired && !/^[\w-]{20,100}$/.test(data.recaptchaSiteKey))) throw new Error('invalid-config');
      config = data;
      byId('contact-verification').hidden = !data.recaptchaRequired;
      return data;
    }).finally(() => { configPromise = null; });
    return configPromise;
  }
  form.addEventListener('focusin', () => {
    if (!config) getConfig().catch(() => { /* Submission presents the actionable error. */ });
  });
  const loadCaptcha = byId('load-captcha');
  const finishCaptchaLoad = () => {
    clearTimeout(captchaTimer);
    captchaTimer = null;
    captchaLoading = false;
    loadCaptcha.disabled = false;
  };
  loadCaptcha.addEventListener('click', () => {
    if (!config?.recaptchaRequired || captchaLoading || widget !== null) return;
    captchaLoading = true;
    loadCaptcha.disabled = true;
    const failed = () => {
      finishCaptchaLoad();
      captchaScript?.remove();
      captchaScript = null;
      delete window.gfContactCaptchaReady;
      report('Verification could not load. Try again or email us.', 'error');
    };
    window.gfContactCaptchaReady = () => {
      finishCaptchaLoad();
      try {
        widget = window.grecaptcha.render('recaptcha', {
          sitekey: config.recaptchaSiteKey,
          theme: 'dark',
          callback: token => { captchaToken = token; report('Verification complete. You can send your message now.'); },
          'expired-callback': () => { captchaToken = ''; report('Verification expired. Please complete it again.'); },
          'error-callback': () => { captchaToken = ''; report('Verification failed. Please try again or email us.', 'error'); }
        });
        loadCaptcha.hidden = true;
        report('Complete verification to send your message.');
      } catch { failed(); }
      delete window.gfContactCaptchaReady;
    };
    captchaScript = document.createElement('script');
    captchaScript.src = 'https://www.google.com/recaptcha/api.js?onload=gfContactCaptchaReady&render=explicit&hl=en';
    captchaScript.async = true;
    captchaScript.onerror = failed;
    captchaTimer = setTimeout(failed, 15000);
    document.head.appendChild(captchaScript);
  });
  form.addEventListener('submit', async event => {
    event.preventDefault();
    if (submitting || !form.reportValidity()) return;
    submitting = true;
    submit.disabled = true;
    form.setAttribute('aria-busy', 'true');
    report('Preparing your message…');
    try {
      const settings = await getConfig();
      if (settings.recaptchaRequired && !captchaToken) {
        report('Load and complete verification before sending.');
        (widget === null ? loadCaptcha : byId('contact-verification')).scrollIntoView({ block: 'center', behavior: 'instant' });
        if (widget === null) loadCaptcha.focus();
        return;
      }
      const fields = new FormData(form);
      const body = Object.fromEntries(['name', 'email', 'company', 'message', 'website'].map(name => [name, String(fields.get(name) || '').trim()]));
      body['g-recaptcha-response'] = captchaToken;
      const result = await requestJSON('api/contact', { method: 'POST', headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' }, body: JSON.stringify(body) });
      if (result.ok !== true && result.success !== true) throw new Error('invalid-response');
      form.reset();
      report('Message sent. Thank you for writing; we will reply by email.', 'success');
    } catch (error) {
      const message = error.status === 429 ? 'Too many attempts. Please wait a few minutes before trying again.' : error.status === 400 || error.status === 403 ? 'Your submission could not be verified. Check your details and complete verification again.' : 'The form is unavailable right now. Your message is still here; try later or email us.';
      report(message, 'error');
    } finally {
      if (widget !== null && window.grecaptcha) { window.grecaptcha.reset(widget); captchaToken = ''; }
      submitting = false;
      submit.disabled = false;
      form.removeAttribute('aria-busy');
    }
  });
  window.addEventListener('pagehide', event => {
    document.documentElement.classList.add('page-inactive');
    if (!event.persisted) {
      heroObserver?.disconnect();
      motionPreference.removeEventListener('change', syncMotion);
    }
    requests.forEach(controller => controller.abort());
    if (dialog.open) dialog.close();
    stopTrailer();
    if (captchaLoading) {
      finishCaptchaLoad();
      captchaScript?.remove();
      captchaScript = null;
      delete window.gfContactCaptchaReady;
    }
  });
})();

(() => {
  'use strict';
  document.documentElement.classList.add('js');
  const es = document.documentElement.lang === 'es';
  const nav = document.querySelector('.sidebar'), toggle = document.querySelector('.menu-toggle');
  const links = [...document.querySelectorAll('.toc a')];
  toggle.addEventListener('click', () => {const open=toggle.getAttribute('aria-expanded')!=='true'; toggle.setAttribute('aria-expanded', String(open));nav.classList.toggle('is-open',open);});
  nav.addEventListener('click', e => {if(e.target.closest('.toc a') && innerWidth<=800){nav.classList.remove('is-open');toggle.setAttribute('aria-expanded','false');}});
  const search = document.getElementById('chapter-search'), status=document.getElementById('search-status');
  const normalize=s=>s.normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLowerCase().trim();
  search.addEventListener('input', () => {const q=normalize(search.value);let count=0;links.forEach(a=>{const visible=!q || normalize(a.dataset.search+' '+a.textContent).includes(q);a.parentNode.hidden=!visible;if(visible)count++;});status.textContent=q?(count ? `${count} ${es?'capítulos encontrados':'chapters found'}`:(es?'Sin resultados. Prueba otra palabra.':'No results. Try another word.')):'';});
  document.querySelector('.print').addEventListener('click',()=>window.print());
  const sections=[...document.querySelectorAll('.chapter')];let scheduled=false;
  function update(){scheduled=false;const y=window.scrollY, height=document.documentElement.scrollHeight-innerHeight;document.querySelector('.reading-progress').style.transform=`scaleX(${height>0?Math.min(1,y/height):0})`;let current=sections[0];for(const s of sections){if(s.getBoundingClientRect().top<180)current=s;else break;}for(const a of links){const active=a.hash==='#'+current.id;a.classList.toggle('active',active);if(active)a.setAttribute('aria-current','location');else a.removeAttribute('aria-current');}}
  window.addEventListener('scroll',()=>{if(!scheduled){scheduled=true;requestAnimationFrame(update);}},{passive:true});window.addEventListener('resize',update);update();
  const dialog=document.getElementById('image-dialog'), image=dialog.querySelector('img'), caption=dialog.querySelector('p');let opener=null;
  for(const b of document.querySelectorAll('[data-zoom]'))b.addEventListener('click',()=>{if(!dialog.showModal)return;opener=b;const source=b.querySelector('img');image.src=source.src;image.alt=source.alt;caption.textContent=b.closest('figure').querySelector('figcaption').textContent;dialog.showModal();});
  dialog.querySelector('button').addEventListener('click',()=>dialog.close());
  dialog.addEventListener('click',e=>{if(e.target===dialog){const r=dialog.getBoundingClientRect();if(e.clientX<r.left||e.clientX>r.right||e.clientY<r.top||e.clientY>r.bottom)dialog.close();}});
  dialog.addEventListener('close',()=>{image.removeAttribute('src');opener?.focus({preventScroll:true});});
  document.addEventListener('keydown',e=>{if(e.key==='Escape'&&nav.classList.contains('is-open')){nav.classList.remove('is-open');toggle.setAttribute('aria-expanded','false');toggle.focus();}});
})();

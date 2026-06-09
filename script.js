/* =====================================================
   DAPUR IDA FARIDA — script.js
   ===================================================== */

/* ===== NAVBAR: transparent → solid on scroll ===== */
const navbar    = document.getElementById('navbar');
const SCROLL_TH = 60;
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > SCROLL_TH);
}, { passive: true });

/* ===== HERO: subtle ken-burns effect ===== */
window.addEventListener('load', () => {
  document.querySelector('.hero').classList.add('ready');
});

/* ===== HAMBURGER MENU ===== */
const hamburger = document.getElementById('hamburger');
const navMenu   = document.getElementById('navMenu');

hamburger.addEventListener('click', () => {
  const isOpen = navMenu.classList.toggle('open');
  hamburger.classList.toggle('active', isOpen);
  document.body.style.overflow = isOpen ? 'hidden' : '';
});

/* Close mobile menu when a link is clicked */
navMenu.querySelectorAll('a').forEach(a => {
  a.addEventListener('click', () => {
    navMenu.classList.remove('open');
    hamburger.classList.remove('active');
    document.body.style.overflow = '';
  });
});

/* ===== FADE-IN ON SCROLL ===== */
const fadeEls = document.querySelectorAll('[data-fade]');
if (fadeEls.length) {
  const io = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add('visible');
        io.unobserve(e.target);
      }
    });
  }, { threshold: 0.10, rootMargin: '0px 0px -40px 0px' });
  fadeEls.forEach(el => io.observe(el));
}

/* ===== GALLERY LIGHTBOX ===== */
const galleryItems = document.querySelectorAll('.gallery-item');
const lightbox     = document.getElementById('lightbox');
const lbImg        = document.getElementById('lbImg');
const lbClose      = document.getElementById('lbClose');
const lbPrev       = document.getElementById('lbPrev');
const lbNext       = document.getElementById('lbNext');

const srcs = [...galleryItems].map(item => item.dataset.src);
const alts = [...galleryItems].map(item => item.querySelector('img').alt);
let   idx  = 0;

function openLB(i) {
  idx = (i + srcs.length) % srcs.length;
  lbImg.src = srcs[idx];
  lbImg.alt = alts[idx];
  lightbox.classList.add('active');
  document.body.style.overflow = 'hidden';
}
function closeLB() {
  lightbox.classList.remove('active');
  document.body.style.overflow = '';
  lbImg.src = '';
}

galleryItems.forEach((item, i) => item.addEventListener('click', () => openLB(i)));
lbClose.addEventListener('click', closeLB);
lbPrev.addEventListener('click',  () => openLB(idx - 1));
lbNext.addEventListener('click',  () => openLB(idx + 1));
lightbox.addEventListener('click', e => { if (e.target === lightbox) closeLB(); });

document.addEventListener('keydown', e => {
  if (!lightbox.classList.contains('active')) return;
  if (e.key === 'Escape')     closeLB();
  if (e.key === 'ArrowLeft')  openLB(idx - 1);
  if (e.key === 'ArrowRight') openLB(idx + 1);
});

/* Swipe support for lightbox on mobile */
let touchStartX = 0;
lightbox.addEventListener('touchstart', e => { touchStartX = e.touches[0].clientX; }, { passive: true });
lightbox.addEventListener('touchend',   e => {
  const dx = e.changedTouches[0].clientX - touchStartX;
  if (Math.abs(dx) > 50) dx < 0 ? openLB(idx + 1) : openLB(idx - 1);
}, { passive: true });

/* ===== SMOOTH SCROLL (fallback for older browsers) ===== */
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    const target = document.querySelector(a.getAttribute('href'));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth' });
    }
  });
});

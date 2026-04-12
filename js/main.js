/* ============================================================
   OPESP — main.js
   Dark Tech Corporate — all features
   ============================================================ */

/* Preloader */
window.addEventListener('load', () => {
  const p = document.getElementById('preloader');
  if (p) {
    setTimeout(() => p.classList.add('hidden'), 300);
  }
});

/* Nav scroll state */
const nav = document.getElementById('nav');
if (nav) {
  const onScroll = () => {
    nav.classList.toggle('scrolled', window.scrollY > 40);
    const btn = document.getElementById('backToTop');
    if (btn) btn.classList.toggle('visible', window.scrollY > 300);
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
}

/* Hamburger / mobile drawer */
const hamburger = document.querySelector('.nav__hamburger');
const drawer    = document.querySelector('.nav__drawer');
const overlay   = document.querySelector('.nav__overlay');
const drawerClose = document.querySelector('.nav__drawer-close');

function openDrawer() {
  hamburger && hamburger.classList.add('open');
  hamburger && hamburger.setAttribute('aria-expanded', 'true');
  drawer  && drawer.classList.add('open');
  overlay && overlay.classList.add('open');
  document.body.style.overflow = 'hidden';
}
function closeDrawer() {
  hamburger && hamburger.classList.remove('open');
  hamburger && hamburger.setAttribute('aria-expanded', 'false');
  drawer  && drawer.classList.remove('open');
  overlay && overlay.classList.remove('open');
  document.body.style.overflow = '';
}
hamburger   && hamburger.addEventListener('click', openDrawer);
drawerClose && drawerClose.addEventListener('click', closeDrawer);
overlay     && overlay.addEventListener('click', closeDrawer);

/* Back to top */
const btt = document.getElementById('backToTop');
btt && btt.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));

/* Active nav link */
const currentPage = document.body.dataset.page || '';
document.querySelectorAll('.nav__link').forEach(link => {
  if (link.dataset.page === currentPage) link.classList.add('active');
});

/* Smooth scroll for anchor links */
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    const target = document.querySelector(a.getAttribute('href'));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth' });
    }
  });
});

/* Scroll animations — IntersectionObserver */
const fadeEls = document.querySelectorAll('.fade-in');
if (fadeEls.length) {
  const observer = new IntersectionObserver(entries => {
    entries.forEach(en => {
      if (en.isIntersecting) {
        en.target.classList.add('visible');
        observer.unobserve(en.target);
      }
    });
  }, { threshold: 0.12 });
  fadeEls.forEach(el => observer.observe(el));
}

/* Animated counters */
function animateCounter(el) {
  const target = parseInt(el.dataset.counter, 10);
  const suffix = el.dataset.suffix || '';
  const duration = 1800;
  const start = performance.now();
  const update = now => {
    const elapsed = now - start;
    const progress = Math.min(elapsed / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 3);
    el.textContent = Math.round(eased * target) + suffix;
    if (progress < 1) requestAnimationFrame(update);
  };
  requestAnimationFrame(update);
}
const counterEls = document.querySelectorAll('.stat-number[data-counter]');
if (counterEls.length) {
  const counterObserver = new IntersectionObserver(entries => {
    entries.forEach(en => {
      if (en.isIntersecting) {
        animateCounter(en.target);
        counterObserver.unobserve(en.target);
      }
    });
  }, { threshold: 0.5 });
  counterEls.forEach(el => counterObserver.observe(el));
}

/* Parallax hero */
const hero = document.querySelector('.hero--home');
if (hero) {
  window.addEventListener('scroll', () => {
    const y = window.scrollY;
    hero.style.setProperty('--hero-parallax', `${y * 0.4}px`);
  }, { passive: true });
  // Apply parallax via CSS variable on ::before (fallback via transform)
  const style = document.createElement('style');
  style.textContent = '.hero--home::before { transform: translateY(var(--hero-parallax, 0)); }';
  document.head.appendChild(style);
}

/* Member filter/search */
const searchInput = document.getElementById('memberSearch');
const filterBtns  = document.querySelectorAll('.filter-btn[data-filter]');
const memberCards = document.querySelectorAll('.member-card');

function filterMembers() {
  const query  = searchInput ? searchInput.value.toLowerCase() : '';
  const active = document.querySelector('.filter-btn.active');
  const filter = active ? active.dataset.filter : 'all';
  memberCards.forEach(card => {
    const name     = (card.querySelector('h4') || card).textContent.toLowerCase();
    const role     = card.dataset.role || '';
    const matchQ   = !query || name.includes(query);
    const matchF   = filter === 'all' || role === filter;
    card.classList.toggle('hidden', !(matchQ && matchF));
  });
}

filterBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    filterBtns.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    filterMembers();
  });
});
searchInput && searchInput.addEventListener('input', filterMembers);

/* Form feedback */
document.querySelectorAll('form[data-form]').forEach(form => {
  form.addEventListener('submit', e => {
    e.preventDefault();
    const btn = form.querySelector('[type="submit"]');
    const original = btn ? btn.textContent : '';
    if (btn) { btn.textContent = 'Enviado!'; btn.disabled = true; }
    setTimeout(() => {
      if (btn) { btn.textContent = original; btn.disabled = false; }
      form.reset();
    }, 3000);
  });
});

/* Page transitions */
document.querySelectorAll('a:not([href^="#"]):not([href^="mailto"]):not([href^="tel"]):not([target])').forEach(a => {
  a.addEventListener('click', e => {
    if (e.ctrlKey || e.metaKey || e.shiftKey || e.altKey) return;
    const href = a.getAttribute('href');
    if (!href || href.startsWith('http') || href.startsWith('//')) return;
    e.preventDefault();
    document.body.classList.add('page-exit');
    setTimeout(() => { window.location.href = href; }, 300);
  });
});

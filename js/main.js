/* ============================================================
   OPESP — Main JavaScript
   ============================================================ */

/* 1. Preloader */
window.addEventListener('load', () => {
  const preloader = document.getElementById('preloader');
  if (preloader) {
    preloader.style.opacity = '0';
    setTimeout(() => { preloader.style.display = 'none'; }, 500);
  }
  generateParticles();
  setActiveNavLink();
});

/* 2. Nav scroll state */
const nav = document.getElementById('nav');
if (nav) {
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      nav.classList.add('scrolled');
    } else {
      nav.classList.remove('scrolled');
    }
    handleBackToTop();
  });
}

/* 3. Mobile hamburger menu */
const hamburger = document.querySelector('.nav__hamburger');
const drawer    = document.querySelector('.nav__drawer');
const overlay   = document.querySelector('.nav__overlay');
const drawerClose = document.querySelector('.nav__drawer-close');

function openDrawer() {
  if (!drawer || !overlay) return;
  drawer.classList.add('open');
  overlay.classList.add('visible');
  if (hamburger) hamburger.setAttribute('aria-expanded', 'true');
  document.body.style.overflow = 'hidden';
}

function closeDrawer() {
  if (!drawer || !overlay) return;
  drawer.classList.remove('open');
  overlay.classList.remove('visible');
  if (hamburger) hamburger.setAttribute('aria-expanded', 'false');
  document.body.style.overflow = '';
}

if (hamburger) hamburger.addEventListener('click', openDrawer);
if (overlay)   overlay.addEventListener('click', closeDrawer);
if (drawerClose) drawerClose.addEventListener('click', closeDrawer);

if (drawer) {
  drawer.querySelectorAll('.nav__drawer-link').forEach(link => {
    link.addEventListener('click', (e) => {
      const href = link.getAttribute('href');
      if (href && !href.startsWith('#')) {
        e.preventDefault();
        closeDrawer();
        setTimeout(() => { window.location.href = href; }, 350);
      } else {
        closeDrawer();
      }
    });
  });
}

/* 4. Smooth scroll for internal # links */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', (e) => {
    const targetId = anchor.getAttribute('href').slice(1);
    if (!targetId) return;
    const target = document.getElementById(targetId);
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});

/* 5. Back to top button */
const backToTopBtn = document.getElementById('backToTop');

function handleBackToTop() {
  if (!backToTopBtn) return;
  if (window.scrollY > 300) {
    backToTopBtn.classList.add('visible');
  } else {
    backToTopBtn.classList.remove('visible');
  }
}

if (backToTopBtn) {
  backToTopBtn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

/* 6. Animated counters */
function animateCounter(el) {
  const target = parseInt(el.getAttribute('data-counter'), 10);
  const duration = 1800;
  const step = 16;
  const increment = target / (duration / step);
  let current = 0;

  const timer = setInterval(() => {
    current += increment;
    if (current >= target) {
      current = target;
      clearInterval(timer);
    }
    const suffix = el.getAttribute('data-suffix') || '';
    el.textContent = Math.floor(current) + suffix;
  }, step);
}

const counterObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting && !entry.target.dataset.animated) {
      entry.target.dataset.animated = 'true';
      animateCounter(entry.target);
    }
  });
}, { threshold: 0.5 });

document.querySelectorAll('[data-counter]').forEach(el => {
  counterObserver.observe(el);
});

/* 7. Scroll animations */
const fadeObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      fadeObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

document.querySelectorAll('.fade-in').forEach(el => {
  fadeObserver.observe(el);
});

/* 8. Members filter */
const filterBtns = document.querySelectorAll('[data-filter]');
const memberCards = document.querySelectorAll('.member-card');

filterBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    filterBtns.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');

    const filter = btn.getAttribute('data-filter');

    memberCards.forEach(card => {
      if (filter === 'all' || card.getAttribute('data-category') === filter) {
        card.style.display = '';
      } else {
        card.style.display = 'none';
      }
    });
  });
});

/* 9. Members search */
const memberSearch = document.getElementById('memberSearch');
if (memberSearch) {
  memberSearch.addEventListener('input', () => {
    const query = memberSearch.value.toLowerCase().trim();
    memberCards.forEach(card => {
      const name = card.querySelector('.member-card__name');
      if (!name) return;
      const text = name.textContent.toLowerCase();
      card.style.display = text.includes(query) ? '' : 'none';
    });
  });
}

/* 10. Form submission */
document.querySelectorAll('form').forEach(form => {
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    showToast('Mensagem enviada com sucesso! Entraremos em contato em breve.');
    form.reset();
  });
});

function showToast(message) {
  const existing = document.querySelector('.toast');
  if (existing) existing.remove();

  const toast = document.createElement('div');
  toast.className = 'toast';
  toast.innerHTML = `<i class="fas fa-check-circle" style="color:var(--gold);margin-right:10px;"></i>${message}`;
  document.body.appendChild(toast);

  setTimeout(() => {
    toast.classList.add('fade-out');
    setTimeout(() => toast.remove(), 350);
  }, 3500);
}

/* 11. Partners carousel */
(function initCarousel() {
  const carousel = document.querySelector('.partners-carousel');
  if (!carousel) return;

  const track = carousel.querySelector('.partners-carousel__track');
  if (!track) return;

  const items = Array.from(track.children);
  items.forEach(item => {
    const clone = item.cloneNode(true);
    track.appendChild(clone);
  });

  let scrollPos = 0;
  const speed = 0.5;

  setInterval(() => {
    scrollPos += speed;
    if (scrollPos >= track.scrollWidth / 2) {
      scrollPos = 0;
    }
    track.style.transform = `translateX(-${scrollPos}px)`;
  }, 16);
})();

/* 12. Page transition */
document.querySelectorAll('a[href]').forEach(link => {
  const href = link.getAttribute('href');
  if (!href || href.startsWith('#') || href.startsWith('mailto:') || href.startsWith('tel:') || href.startsWith('http') || link.closest('.nav__drawer')) {
    return;
  }
  link.addEventListener('click', (e) => {
    const isModified = e.ctrlKey || e.metaKey || e.shiftKey || e.altKey;
    if (isModified) return;

    const target = link.getAttribute('target');
    if (target === '_blank') return;

    e.preventDefault();
    document.body.classList.add('page-exit');
    setTimeout(() => {
      window.location.href = href;
    }, 300);
  });
});

/* 13. Parallax on hero */
const heroHome = document.querySelector('.hero--home');
if (heroHome) {
  window.addEventListener('scroll', () => {
    const scrolled = window.scrollY;
    heroHome.style.backgroundPositionY = `${scrolled * 0.4}px`;
  }, { passive: true });
}

/* 14. Generate particles */
function generateParticles() {
  const container = document.querySelector('.hero__particles');
  if (!container) return;

  const count = 20;
  for (let i = 0; i < count; i++) {
    const p = document.createElement('div');
    p.className = 'particle';
    const size = 4 + Math.random() * 8;
    p.style.width  = `${size}px`;
    p.style.height = `${size}px`;
    p.style.left   = `${Math.random() * 100}%`;
    p.style.top    = `${20 + Math.random() * 70}%`;
    p.style.animationDelay    = `${Math.random() * 5}s`;
    p.style.animationDuration = `${4 + Math.random() * 6}s`;
    container.appendChild(p);
  }
}

/* 15. Active nav link */
function setActiveNavLink() {
  const path = window.location.pathname;
  const filename = path.split('/').pop().replace('.html', '') || 'index';

  document.querySelectorAll('.nav__link[data-page]').forEach(link => {
    const page = link.getAttribute('data-page');
    if (page === filename || (filename === '' && page === 'index')) {
      link.classList.add('active');
    } else {
      link.classList.remove('active');
    }
  });
}

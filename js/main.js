/**
 * OPESP — Ordem dos Parlamentares do Estado de São Paulo
 * main.js — Interatividade, animações e utilitários do site
 */

/* ================================================================
   1. Preloader
================================================================ */
(function initPreloader() {
  const preloader = document.getElementById('preloader');
  if (!preloader) return;

  window.addEventListener('load', () => {
    setTimeout(() => {
      preloader.classList.add('hidden');
    }, 1800);
  });
})();

/* ================================================================
   2. Navegação — scroll state + active links
================================================================ */
(function initNav() {
  const nav = document.querySelector('.nav');
  if (!nav) return;

  // Add 'scrolled' class when page is scrolled
  function onScroll() {
    if (window.scrollY > 60) {
      nav.classList.add('scrolled');
    } else {
      nav.classList.remove('scrolled');
    }
    updateActiveLink();
    toggleBackToTop();
  }

  // Highlight active section in nav
  function updateActiveLink() {
    const sections = document.querySelectorAll('section[id]');
    const scrollY = window.scrollY + 100;

    sections.forEach(section => {
      const top = section.offsetTop;
      const height = section.offsetHeight;
      const id = section.getAttribute('id');
      const link = document.querySelector(`.nav__link[href="#${id}"]`);
      if (!link) return;

      if (scrollY >= top && scrollY < top + height) {
        document.querySelectorAll('.nav__link').forEach(l => l.classList.remove('active'));
        link.classList.add('active');
      }
    });
  }

  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll(); // run on load
})();

/* ================================================================
   3. Mobile Hamburger Menu
================================================================ */
(function initMobileMenu() {
  const hamburger = document.querySelector('.nav__hamburger');
  const drawer    = document.querySelector('.nav__drawer');
  if (!hamburger || !drawer) return;

  hamburger.addEventListener('click', () => {
    const isOpen = hamburger.classList.toggle('open');
    drawer.classList.toggle('open', isOpen);
    document.body.style.overflow = isOpen ? 'hidden' : '';
  });

  // Close drawer on link click
  drawer.querySelectorAll('.nav__drawer-link').forEach(link => {
    link.addEventListener('click', () => {
      hamburger.classList.remove('open');
      drawer.classList.remove('open');
      document.body.style.overflow = '';
    });
  });

  // Close on outside click
  document.addEventListener('click', (e) => {
    if (!drawer.contains(e.target) && !hamburger.contains(e.target)) {
      hamburger.classList.remove('open');
      drawer.classList.remove('open');
      document.body.style.overflow = '';
    }
  });
})();

/* ================================================================
   4. Smooth Scroll for anchor links
================================================================ */
(function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', (e) => {
      const targetId = anchor.getAttribute('href');
      if (targetId === '#') return;
      const target = document.querySelector(targetId);
      if (!target) return;

      e.preventDefault();
      const navHeight = document.querySelector('.nav')?.offsetHeight || 80;
      const top = target.getBoundingClientRect().top + window.scrollY - navHeight;

      window.scrollTo({ top, behavior: 'smooth' });
    });
  });
})();

/* ================================================================
   5. Back-to-Top Button
================================================================ */
function toggleBackToTop() {
  const btn = document.getElementById('backToTop');
  if (!btn) return;
  if (window.scrollY > 400) {
    btn.classList.add('visible');
  } else {
    btn.classList.remove('visible');
  }
}

(function initBackToTop() {
  const btn = document.getElementById('backToTop');
  if (!btn) return;
  btn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
})();

/* ================================================================
   6. Animated Counters
================================================================ */
(function initCounters() {
  const counters = document.querySelectorAll('[data-counter]');
  if (!counters.length) return;

  function easeOutQuad(t) { return t * (2 - t); }

  function animateCounter(el) {
    const target   = parseFloat(el.dataset.counter);
    const suffix   = el.dataset.suffix || '';
    const prefix   = el.dataset.prefix || '';
    const duration = 2000;
    const start    = performance.now();

    function update(now) {
      const elapsed  = now - start;
      const progress = Math.min(elapsed / duration, 1);
      const eased    = easeOutQuad(progress);
      const current  = Math.round(eased * target);
      el.textContent = prefix + current.toLocaleString('pt-BR') + suffix;
      if (progress < 1) requestAnimationFrame(update);
    }

    requestAnimationFrame(update);
  }

  // Fire when counter enters viewport
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting && !entry.target.dataset.counted) {
        entry.target.dataset.counted = '1';
        animateCounter(entry.target);
      }
    });
  }, { threshold: 0.5 });

  counters.forEach(c => observer.observe(c));
})();

/* ================================================================
   7. Scroll Animations (AOS-like, lightweight)
================================================================ */
(function initScrollAnimations() {
  const elements = document.querySelectorAll('[data-aos]');
  if (!elements.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('aos-animate');
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.12,
    rootMargin: '0px 0px -60px 0px'
  });

  elements.forEach(el => observer.observe(el));
})();

/* ================================================================
   8. Parallax on Hero
================================================================ */
(function initParallax() {
  const pattern = document.querySelector('.hero__pattern');
  if (!pattern) return;

  let ticking = false;

  function onScroll() {
    if (!ticking) {
      requestAnimationFrame(() => {
        const y = window.scrollY;
        pattern.style.transform = `translateY(${y * 0.25}px)`;
        ticking = false;
      });
      ticking = true;
    }
  }

  window.addEventListener('scroll', onScroll, { passive: true });
})();

/* ================================================================
   9. Hero Floating Particles
================================================================ */
(function initParticles() {
  const container = document.querySelector('.hero__particles');
  if (!container) return;

  const count = 18;

  for (let i = 0; i < count; i++) {
    const p = document.createElement('span');
    p.className = 'hero__particle';

    const size     = Math.random() * 3 + 1;
    const left     = Math.random() * 100;
    const delay    = Math.random() * 12;
    const duration = Math.random() * 10 + 8;

    p.style.cssText = `
      width: ${size}px;
      height: ${size}px;
      left: ${left}%;
      bottom: ${Math.random() * 20}%;
      animation-duration: ${duration}s;
      animation-delay: ${delay}s;
      opacity: ${Math.random() * 0.5 + 0.1};
    `;

    container.appendChild(p);
  }
})();

/* ================================================================
   10. Members Filter / Search
================================================================ */
(function initMembersFilter() {
  const searchInput = document.getElementById('memberSearch');
  const filterTags  = document.querySelectorAll('.filter-tag');
  const cards       = document.querySelectorAll('.member-card');
  if (!searchInput && !filterTags.length) return;

  let activeFilter = 'all';

  function filterCards() {
    const query = searchInput ? searchInput.value.toLowerCase() : '';

    cards.forEach(card => {
      const name  = (card.querySelector('.member-card__name')?.textContent || '').toLowerCase();
      const role  = (card.querySelector('.member-card__role')?.textContent || '').toLowerCase();
      const badge = (card.querySelector('.member-card__badge')?.textContent || '').toLowerCase();
      const text  = name + ' ' + role + ' ' + badge;

      const matchesSearch = !query || text.includes(query);
      const matchesFilter = activeFilter === 'all' || badge.includes(activeFilter.toLowerCase());

      card.style.display = (matchesSearch && matchesFilter) ? '' : 'none';
      card.style.animation = (matchesSearch && matchesFilter) ? 'none' : '';
    });
  }

  if (searchInput) {
    searchInput.addEventListener('input', filterCards);
  }

  filterTags.forEach(tag => {
    tag.addEventListener('click', () => {
      filterTags.forEach(t => t.classList.remove('active'));
      tag.classList.add('active');
      activeFilter = tag.dataset.filter || 'all';
      filterCards();
    });
  });
})();

/* ================================================================
   11. Form Submission (simulated)
================================================================ */
(function initForms() {
  document.querySelectorAll('form[data-form]').forEach(form => {
    form.addEventListener('submit', (e) => {
      e.preventDefault();

      const btn     = form.querySelector('[type="submit"]');
      const success = form.querySelector('.success-message');
      const original = btn ? btn.textContent : '';

      if (btn) {
        btn.textContent = 'Enviando…';
        btn.disabled = true;
      }

      setTimeout(() => {
        if (btn) {
          btn.textContent = original;
          btn.disabled = false;
        }
        if (success) {
          success.classList.add('show');
          setTimeout(() => success.classList.remove('show'), 5000);
        }
        form.reset();
      }, 1600);
    });
  });
})();

/* ================================================================
   12. Partners Carousel — pause on hover (handled in CSS)
   Extra: duplicate track for seamless loop
================================================================ */
(function initPartners() {
  const track = document.querySelector('.partners__track');
  if (!track) return;

  // Clone all children for seamless infinite scroll
  const items = Array.from(track.children);
  items.forEach(item => {
    const clone = item.cloneNode(true);
    clone.setAttribute('aria-hidden', 'true');
    track.appendChild(clone);
  });
})();

/* ================================================================
   13. Video Modal (lightweight)
================================================================ */
(function initVideoCards() {
  document.querySelectorAll('.video-card').forEach(card => {
    card.addEventListener('click', () => {
      const title = card.querySelector('.video-card__title')?.textContent || 'Vídeo OPESP';
      alert(`▶ Reproduzindo: "${title}"\n\nEm produção: os vídeos serão incorporados via YouTube/Vimeo.`);
    });
  });
})();

/* ================================================================
   14. Hero badge entrance animation (CSS handles the rest)
================================================================ */
(function initHeroBadge() {
  const el = document.querySelector('.hero__badge');
  if (!el) return;
  el.style.opacity = '1';
})();

/* ================================================================
   15. Intersection-based section entrance for nav highlight
================================================================ */
(function initSectionHighlight() {
  // Already handled in updateActiveLink inside initNav
})();

/* ================================================================
   16. Initialize on DOMContentLoaded
================================================================ */
document.addEventListener('DOMContentLoaded', () => {
  // Add 'loaded' class to body
  document.body.classList.add('loaded');

  // Trigger initial scroll check
  window.dispatchEvent(new Event('scroll'));

  console.info(
    '%cOPESP — Ordem dos Parlamentares do Estado de São Paulo\n%cSite desenvolvido com HTML5, CSS3 e JavaScript puro.\nMantenedora: Aslam Innovations',
    'font-size:14px;font-weight:bold;color:#C9A84C;',
    'font-size:11px;color:#666;'
  );
});

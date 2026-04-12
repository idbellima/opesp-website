/* ============================================================
   OPESP - Main JavaScript
   ============================================================ */

(function () {
  'use strict';

  /* ----------------------------------------------------------
     Mobile Menu Toggle
  ---------------------------------------------------------- */
  const hamburger = document.getElementById('hamburger');
  const mobileNav = document.getElementById('mobile-nav');

  if (hamburger && mobileNav) {
    hamburger.addEventListener('click', function () {
      const isOpen = hamburger.classList.toggle('open');
      mobileNav.classList.toggle('open', isOpen);
      hamburger.setAttribute('aria-expanded', String(isOpen));
      document.body.style.overflow = isOpen ? 'hidden' : '';
    });

    // Close mobile nav when clicking a link
    mobileNav.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () {
        hamburger.classList.remove('open');
        mobileNav.classList.remove('open');
        hamburger.setAttribute('aria-expanded', 'false');
        document.body.style.overflow = '';
      });
    });

    // Close on outside click
    document.addEventListener('click', function (e) {
      if (!hamburger.contains(e.target) && !mobileNav.contains(e.target)) {
        hamburger.classList.remove('open');
        mobileNav.classList.remove('open');
        hamburger.setAttribute('aria-expanded', 'false');
        document.body.style.overflow = '';
      }
    });
  }

  /* ----------------------------------------------------------
     Navbar Scroll Shadow
  ---------------------------------------------------------- */
  const navbar = document.getElementById('navbar');

  if (navbar) {
    function handleNavbarScroll() {
      if (window.scrollY > 20) {
        navbar.classList.add('scrolled');
      } else {
        navbar.classList.remove('scrolled');
      }
    }

    window.addEventListener('scroll', handleNavbarScroll, { passive: true });
    handleNavbarScroll();
  }

  /* ----------------------------------------------------------
     Active Nav Link
  ---------------------------------------------------------- */
  (function setActiveLink() {
    var path = window.location.pathname;
    var filename = path.split('/').pop() || 'index.html';
    var links = document.querySelectorAll('.navbar-links a, .navbar-mobile a');
    links.forEach(function (link) {
      var href = link.getAttribute('href');
      if (
        href === filename ||
        (filename === '' && href === 'index.html') ||
        (filename === 'index.html' && href === 'index.html')
      ) {
        link.classList.add('active');
      }
    });
  })();

  /* ----------------------------------------------------------
     Animated Counters
  ---------------------------------------------------------- */
  function animateCounter(el, target, suffix, duration) {
    var start = 0;
    var startTime = null;
    var targetNum = parseInt(target, 10);

    function step(timestamp) {
      if (!startTime) startTime = timestamp;
      var progress = Math.min((timestamp - startTime) / duration, 1);
      var eased = 1 - Math.pow(1 - progress, 3);
      var current = Math.floor(eased * targetNum);
      el.textContent = current + suffix;
      if (progress < 1) {
        requestAnimationFrame(step);
      } else {
        el.textContent = targetNum + suffix;
      }
    }

    requestAnimationFrame(step);
  }

  function initCounters() {
    var counters = document.querySelectorAll('[data-count]');
    if (!counters.length) return;

    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting && !entry.target.dataset.counted) {
          entry.target.dataset.counted = 'true';
          var target = entry.target.dataset.count;
          var suffix = entry.target.dataset.suffix || '';
          animateCounter(entry.target, target, suffix, 1800);
        }
      });
    }, { threshold: 0.5 });

    counters.forEach(function (el) {
      observer.observe(el);
    });
  }

  initCounters();

  /* ----------------------------------------------------------
     Intersection Observer: Scroll Animations
  ---------------------------------------------------------- */
  function initScrollAnimations() {
    var elements = document.querySelectorAll('.slide-up');
    if (!elements.length) return;

    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry, i) {
        if (entry.isIntersecting) {
          var delay = entry.target.dataset.delay || 0;
          setTimeout(function () {
            entry.target.classList.add('animated');
          }, delay);
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

    elements.forEach(function (el, index) {
      if (!el.dataset.delay) {
        el.dataset.delay = (index % 4) * 100;
      }
      observer.observe(el);
    });
  }

  initScrollAnimations();

  /* ----------------------------------------------------------
     Smooth Scrolling for anchor links
  ---------------------------------------------------------- */
  document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
    anchor.addEventListener('click', function (e) {
      var target = document.querySelector(this.getAttribute('href'));
      if (target) {
        e.preventDefault();
        var navbarHeight = navbar ? navbar.offsetHeight : 0;
        var top = target.getBoundingClientRect().top + window.scrollY - navbarHeight - 20;
        window.scrollTo({ top: top, behavior: 'smooth' });
      }
    });
  });

  /* ----------------------------------------------------------
     Page Load Fade-in
  ---------------------------------------------------------- */
  document.documentElement.style.opacity = '0';
  window.addEventListener('load', function () {
    document.documentElement.style.transition = 'opacity 0.4s ease';
    document.documentElement.style.opacity = '1';
  });

  /* ----------------------------------------------------------
     Member Search Filter
  ---------------------------------------------------------- */
  var searchInput = document.getElementById('member-search');
  if (searchInput) {
    searchInput.addEventListener('input', function () {
      var query = this.value.toLowerCase().trim();
      var cards = document.querySelectorAll('.member-card');
      cards.forEach(function (card) {
        var name = (card.dataset.name || '').toLowerCase();
        var area = (card.dataset.area || '').toLowerCase();
        if (!query || name.includes(query) || area.includes(query)) {
          card.style.display = '';
        } else {
          card.style.display = 'none';
        }
      });
    });
  }

})();

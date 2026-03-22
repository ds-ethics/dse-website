(function () {
  'use strict';

  // ── 1. Navbar shadow on scroll ──────────────────────────────────
  var navbar = document.querySelector('.navbar');
  if (navbar) {
    window.addEventListener('scroll', function () {
      navbar.classList.toggle('navbar-scrolled', window.scrollY > 60);
    }, { passive: true });
  }

  // ── 2. Page load fade-in ────────────────────────────────────────
  document.documentElement.classList.add('page-loaded');

  // ── 3. IntersectionObserver factory ────────────────────────────
  function revealOnScroll(selector, inViewClass, threshold) {
    var els = document.querySelectorAll(selector);
    if (!els.length) return;
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add(inViewClass);
          io.unobserve(entry.target);
        }
      });
    }, { threshold: threshold || 0.06 });
    els.forEach(function (el) { io.observe(el); });
  }

  // ── 4. Staggered listing items ──────────────────────────────────
  function staggerListingItems() {
    var items = document.querySelectorAll(
      '.quarto-listing .list-item, .quarto-listing .quarto-post'
    );
    if (!items.length) return;

    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('item-in-view');
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.05 });

    items.forEach(function (item, i) {
      item.style.transitionDelay = Math.min(i * 80, 400) + 'ms';
      io.observe(item);
    });

    // Safety fallback: ensure items are visible even if IO fails
    setTimeout(function () {
      items.forEach(function (item) { item.classList.add('item-in-view'); });
    }, 1800);
  }

  // ── 5. Content section fade-up ──────────────────────────────────
  function revealSections() {
    revealOnScroll(
      '#quarto-content .level2, #quarto-content .level3',
      'section-in-view',
      0.05
    );
    // Safety fallback
    setTimeout(function () {
      document.querySelectorAll(
        '#quarto-content .level2, #quarto-content .level3'
      ).forEach(function (el) { el.classList.add('section-in-view'); });
    }, 1800);
  }

  // ── 6. Footer reveal ────────────────────────────────────────────
  function revealFooter() {
    revealOnScroll('.nav-footer', 'footer-in-view', 0.1);
  }

  // ── Init ─────────────────────────────────────────────────────────
  function init() {
    staggerListingItems();
    revealSections();
    revealFooter();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

}());

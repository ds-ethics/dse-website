(function () {
  'use strict';

  // ── 1. Scroll: navbar glass + progress bar + parallax ────────
  var navbar = document.querySelector('.navbar');
  var progressBar = document.createElement('div');
  progressBar.className = 'scroll-progress-bar';
  document.body.insertBefore(progressBar, document.body.firstChild);

  var parallaxItems = []; // populated in init()

  function onScroll() {
    if (navbar) {
      navbar.classList.toggle('navbar-scrolled', window.scrollY > 60);
    }
    var docHeight = document.documentElement.scrollHeight - window.innerHeight;
    progressBar.style.width = docHeight > 0
      ? (window.scrollY / docHeight * 100) + '%'
      : '0%';

    // image parallax
    var winH = window.innerHeight;
    parallaxItems.forEach(function (item) {
      var rect = item.section.getBoundingClientRect();
      var centerOffset = (rect.top + rect.height / 2) - winH / 2;
      item.img.style.transform = 'translateY(' + (centerOffset * 0.22) + 'px)';
    });
  }

  window.addEventListener('scroll', onScroll, { passive: true });

  // ── 2. Page load fade-in ─────────────────────────────────────
  document.documentElement.classList.add('page-loaded');

  // ── 3. Page-leave transition ─────────────────────────────────
  document.addEventListener('click', function (e) {
    var link = e.target.closest('a[href]');
    if (!link) return;
    var href = link.getAttribute('href');
    if (!href || href.charAt(0) === '#' || link.target === '_blank') return;
    if (/^(https?:|mailto:|tel:)/.test(href)) return;
    e.preventDefault();
    document.documentElement.classList.add('page-leaving');
    setTimeout(function () { window.location.href = href; }, 260);
  });

  // ── 4. IntersectionObserver factory ──────────────────────────
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

  // ── 5. Staggered listing items ────────────────────────────────
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

    setTimeout(function () {
      items.forEach(function (item) { item.classList.add('item-in-view'); });
    }, 1800);
  }

  // ── 6. Content section fade-up ────────────────────────────────
  function revealSections() {
    revealOnScroll(
      '#quarto-content .level2, #quarto-content .level3',
      'section-in-view',
      0.05
    );
    setTimeout(function () {
      document.querySelectorAll(
        '#quarto-content .level2, #quarto-content .level3'
      ).forEach(function (el) { el.classList.add('section-in-view'); });
    }, 1800);
  }

  // ── 7. Footer reveal ──────────────────────────────────────────
  function revealFooter() {
    revealOnScroll('.nav-footer', 'footer-in-view', 0.1);
  }

  // ── 8. Home content section reveal ───────────────────────────
  function revealHomeSections() {
    var sections = document.querySelectorAll('.section');
    if (!sections.length) return;
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('section-visible');
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15 });
    sections.forEach(function (s) { io.observe(s); });
  }

  // ── Init ──────────────────────────────────────────────────────
  function init() {
    // cache parallax targets
    document.querySelectorAll('.section').forEach(function (section) {
      var img = section.querySelector('.image-box .img');
      if (img) parallaxItems.push({ section: section, img: img });
    });
    onScroll(); // set initial parallax positions

    staggerListingItems();
    revealSections();
    revealFooter();
    revealHomeSections();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

}());

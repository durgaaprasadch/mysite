/* ==========================================================================
   Durga Prasad — Portfolio Script
   ========================================================================== */

(function () {
  'use strict';

  /* -------------------------------------------------------------------------
     Utilities
     --------------------------------------------------------------------- */
  function qs(sel, ctx) { return (ctx || document).querySelector(sel); }
  function qsa(sel, ctx) { return Array.from((ctx || document).querySelectorAll(sel)); }
  function clamp(v, min, max) { return Math.min(Math.max(v, min), max); }

  function easeOutCubic(t) { return 1 - Math.pow(1 - t, 3); }

  /* -------------------------------------------------------------------------
     1. Page Loader
     --------------------------------------------------------------------- */
  const loader = qs('#loader');

  function hideLoader() {
    if (!loader) return;
    loader.classList.add('hiding');
    setTimeout(function () {
      loader.classList.add('hidden');
    }, 700);
  }

  if (document.readyState === 'complete') {
    setTimeout(hideLoader, 300);
  } else {
    window.addEventListener('load', function () {
      setTimeout(hideLoader, 300);
    });
  }

  /* -------------------------------------------------------------------------
     2. Touch Detection
     --------------------------------------------------------------------- */
  var isTouch = (('ontouchstart' in window) || navigator.maxTouchPoints > 0);
  if (isTouch) {
    document.body.classList.add('touch-device');
  }

  /* -------------------------------------------------------------------------
     3. Custom Cursor
     --------------------------------------------------------------------- */
  var cursorDot  = qs('#cursorDot');
  var cursorRing = qs('#cursorRing');
  var mouseX = 0, mouseY = 0;
  var ringX  = 0, ringY  = 0;
  var rafId  = null;

  if (!isTouch && cursorDot && cursorRing) {
    document.addEventListener('mousemove', function (e) {
      mouseX = e.clientX;
      mouseY = e.clientY;
      cursorDot.style.transform = 'translate(' + mouseX + 'px, ' + mouseY + 'px) translate(-50%, -50%)';
    });

    function animateRing() {
      ringX += (mouseX - ringX) * 0.12;
      ringY += (mouseY - ringY) * 0.12;
      cursorRing.style.transform = 'translate(' + ringX + 'px, ' + ringY + 'px) translate(-50%, -50%)';
      rafId = requestAnimationFrame(animateRing);
    }
    animateRing();

    /* Hover effect on interactive elements */
    var hoverEls = qsa('a, button, .skill-card, .project-card, .social-card, .stat');
    hoverEls.forEach(function (el) {
      el.addEventListener('mouseenter', function () {
        document.body.classList.add('cursor--hover');
      });
      el.addEventListener('mouseleave', function () {
        document.body.classList.remove('cursor--hover');
      });
    });

    /* Hide cursor when leaving window */
    document.addEventListener('mouseleave', function () {
      cursorDot.style.opacity  = '0';
      cursorRing.style.opacity = '0';
    });
    document.addEventListener('mouseenter', function () {
      cursorDot.style.opacity  = '1';
      cursorRing.style.opacity = '0.5';
    });
  }

  /* -------------------------------------------------------------------------
     4. Navigation — scroll class, auto-hide, mobile menu
     --------------------------------------------------------------------- */
  var nav        = qs('#nav');
  var hamburger  = qs('#hamburger');
  var navLinks   = qs('#navLinks');
  var lastScroll = 0;
  var menuOpen   = false;

  function onScroll() {
    var y = window.scrollY;

    /* Glass effect */
    if (y > 20) {
      nav.classList.add('scrolled');
    } else {
      nav.classList.remove('scrolled');
    }

    /* Auto-hide on scroll down (only when menu is closed) */
    if (!menuOpen) {
      if (y > lastScroll && y > 120) {
        nav.classList.add('hidden');
      } else {
        nav.classList.remove('hidden');
      }
    }

    lastScroll = y;
    updateActiveLink();
  }

  window.addEventListener('scroll', onScroll, { passive: true });

  /* Mobile menu toggle */
  if (hamburger && navLinks) {
    hamburger.addEventListener('click', function () {
      menuOpen = !menuOpen;
      hamburger.classList.toggle('open', menuOpen);
      navLinks.classList.toggle('open', menuOpen);
      hamburger.setAttribute('aria-expanded', menuOpen ? 'true' : 'false');
      nav.classList.remove('hidden');
    });

    /* Close menu on link click */
    qsa('.nav__link', navLinks).forEach(function (link) {
      link.addEventListener('click', function () {
        menuOpen = false;
        hamburger.classList.remove('open');
        navLinks.classList.remove('open');
        hamburger.setAttribute('aria-expanded', 'false');
      });
    });
  }

  /* -------------------------------------------------------------------------
     5. Active nav link tracking
     --------------------------------------------------------------------- */
  var sections   = qsa('section[id]');
  var navLinkEls = qsa('.nav__link');

  function updateActiveLink() {
    var scrollY = window.scrollY + 120;
    var current = '';

    sections.forEach(function (sec) {
      if (sec.offsetTop <= scrollY) {
        current = sec.id;
      }
    });

    navLinkEls.forEach(function (link) {
      link.classList.toggle('active', link.dataset.section === current);
    });
  }

  /* -------------------------------------------------------------------------
     6. Scroll Reveal via IntersectionObserver
     --------------------------------------------------------------------- */
  var revealEls = qsa('.reveal');

  if ('IntersectionObserver' in window) {
    var revealObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          var el = entry.target;
          /* Stagger grid items */
          var delay = el.dataset.delay ? (parseInt(el.dataset.delay, 10) * 100) + 'ms' : null;
          if (delay) {
            el.style.transitionDelay = delay;
          }
          el.classList.add('visible');
          revealObserver.unobserve(el);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

    revealEls.forEach(function (el) {
      revealObserver.observe(el);
    });
  } else {
    /* Fallback: show all */
    revealEls.forEach(function (el) { el.classList.add('visible'); });
  }

  /* -------------------------------------------------------------------------
     7. Animated Stat Counters
     --------------------------------------------------------------------- */
  var statEls = qsa('.stat');
  var countersStarted = false;

  function animateCounter(el) {
    var numEl   = el.querySelector('.stat__number');
    var target  = parseInt(numEl.dataset.target, 10);
    var duration = 1600;
    var startTime = null;

    function step(timestamp) {
      if (!startTime) startTime = timestamp;
      var elapsed  = timestamp - startTime;
      var progress = clamp(elapsed / duration, 0, 1);
      var eased    = easeOutCubic(progress);
      numEl.textContent = Math.round(eased * target);
      if (progress < 1) {
        requestAnimationFrame(step);
      } else {
        numEl.textContent = target;
      }
    }

    requestAnimationFrame(step);
  }

  if ('IntersectionObserver' in window && statEls.length) {
    var statsSection = qs('#about');
    var statsObserver = new IntersectionObserver(function (entries) {
      if (entries[0].isIntersecting && !countersStarted) {
        countersStarted = true;
        statEls.forEach(function (el, i) {
          setTimeout(function () { animateCounter(el); }, i * 150);
        });
        statsObserver.disconnect();
      }
    }, { threshold: 0.3 });

    if (statsSection) statsObserver.observe(statsSection);
  }

  /* -------------------------------------------------------------------------
     8. Hero Art — Mouse Parallax
     --------------------------------------------------------------------- */
  var heroArt   = qs('#heroArt');
  var fragments = heroArt ? qsa('.portrait__fragment', heroArt) : [];

  if (heroArt && fragments.length && !isTouch) {
    document.addEventListener('mousemove', function (e) {
      var cx = window.innerWidth  / 2;
      var cy = window.innerHeight / 2;
      var dx = (e.clientX - cx) / cx;
      var dy = (e.clientY - cy) / cy;

      fragments.forEach(function (frag) {
        var speed = parseFloat(frag.dataset.speed) || 0.02;
        var tx = dx * speed * 40;
        var ty = dy * speed * 40;
        frag.style.transform = 'translate(' + tx + 'px, ' + ty + 'px)';
      });
    });
  }

  /* -------------------------------------------------------------------------
     9. Smooth Scroll with 80px offset
     --------------------------------------------------------------------- */
  qsa('a[href^="#"]').forEach(function (anchor) {
    anchor.addEventListener('click', function (e) {
      var targetId = anchor.getAttribute('href');
      if (targetId === '#') return;
      var target = qs(targetId);
      if (!target) return;
      e.preventDefault();
      var top = target.getBoundingClientRect().top + window.scrollY - 80;
      window.scrollTo({ top: top, behavior: 'smooth' });
    });
  });

  /* -------------------------------------------------------------------------
     10. Back-to-top shortcut
     --------------------------------------------------------------------- */
  var backToTop = qs('#backToTop');
  if (backToTop) {
    backToTop.addEventListener('click', function (e) {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

})();

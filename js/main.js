/* Claudio — official website interactions */
(function () {
  'use strict';

  var root = document.documentElement;
  root.classList.add('js');

  var $ = function (sel, ctx) { return (ctx || document).querySelector(sel); };
  var $$ = function (sel, ctx) { return Array.prototype.slice.call((ctx || document).querySelectorAll(sel)); };

  function store(key, value) {
    try {
      if (value === undefined) return localStorage.getItem(key);
      localStorage.setItem(key, value);
    } catch (e) { return null; }
  }

  /* Footer year ---------------------------------------------------------- */
  var year = $('#year');
  if (year) year.textContent = new Date().getFullYear();

  /* Header shadow on scroll --------------------------------------------- */
  var header = $('.site-header');
  function onScroll() { header.classList.toggle('scrolled', window.scrollY > 8); }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  /* Mobile menu ---------------------------------------------------------- */
  var toggle = $('.nav-toggle');
  var menu = $('#nav-menu');
  function setMenu(open) {
    toggle.setAttribute('aria-expanded', String(open));
    toggle.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
    menu.classList.toggle('open', open);
  }
  toggle.addEventListener('click', function () {
    setMenu(toggle.getAttribute('aria-expanded') !== 'true');
  });
  $$('a', menu).forEach(function (a) { a.addEventListener('click', function () { setMenu(false); }); });
  document.addEventListener('keydown', function (e) { if (e.key === 'Escape') setMenu(false); });

  /* Theme toggle --------------------------------------------------------- */
  function currentTheme() {
    var t = root.getAttribute('data-theme');
    if (t) return t;
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  }
  $('.theme-toggle').addEventListener('click', function () {
    var next = currentTheme() === 'dark' ? 'light' : 'dark';
    root.setAttribute('data-theme', next);
    store('claudio-theme', next);
  });

  /* Active nav link ------------------------------------------------------ */
  var links = $$('.nav-menu > a[href^="#"]:not(.btn)');
  if ('IntersectionObserver' in window) {
    var sectionObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        links.forEach(function (l) {
          l.classList.toggle('active', l.getAttribute('href') === '#' + entry.target.id);
        });
      });
    }, { rootMargin: '-45% 0px -50% 0px' });
    links.forEach(function (l) {
      var s = $(l.getAttribute('href'));
      if (s) sectionObserver.observe(s);
    });
  }

  /* Reveal on scroll ----------------------------------------------------- */
  var reveals = $$('.reveal');
  if ('IntersectionObserver' in window) {
    var revealObserver = new IntersectionObserver(function (entries, obs) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          obs.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });
    reveals.forEach(function (el) { revealObserver.observe(el); });
  } else {
    reveals.forEach(function (el) { el.classList.add('visible'); });
  }

  /* Animated counters ---------------------------------------------------- */
  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  function animateCount(el) {
    var target = parseInt(el.getAttribute('data-count'), 10);
    if (reduceMotion) { el.textContent = target.toLocaleString(); return; }
    var start = null, duration = 1400;
    function tick(ts) {
      if (!start) start = ts;
      var p = Math.min((ts - start) / duration, 1);
      var eased = 1 - Math.pow(1 - p, 3);
      el.textContent = Math.round(target * eased).toLocaleString();
      if (p < 1) requestAnimationFrame(tick);
    }
    requestAnimationFrame(tick);
  }
  var counters = $$('[data-count]');
  if ('IntersectionObserver' in window) {
    var countObserver = new IntersectionObserver(function (entries, obs) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) { animateCount(entry.target); obs.unobserve(entry.target); }
      });
    });
    counters.forEach(function (c) { countObserver.observe(c); });
  } else {
    counters.forEach(animateCount);
  }

  /* Pricing billing toggle ---------------------------------------------- */
  var billingButtons = $$('[data-billing]');
  billingButtons.forEach(function (btn) {
    btn.addEventListener('click', function () {
      var period = btn.getAttribute('data-billing');
      billingButtons.forEach(function (b) { b.classList.toggle('active', b === btn); });
      $$('.price .amount').forEach(function (el) {
        var value = parseFloat(el.getAttribute('data-' + period));
        el.textContent = '$' + (value % 1 ? value.toFixed(2) : value);
      });
    });
  });

  /* Contact form validation --------------------------------------------- */
  var form = $('#contact-form');
  var emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  function validateField(input) {
    var field = input.closest('.field');
    var error = $('.error', field);
    var value = input.value.trim();
    var msg = '';
    if (!value) msg = 'This field is required.';
    else if (input.type === 'email' && !emailRe.test(value)) msg = 'Please enter a valid email.';
    else if (input.name === 'message' && value.length < 10) msg = 'Please write at least 10 characters.';
    field.classList.toggle('invalid', !!msg);
    input.setAttribute('aria-invalid', msg ? 'true' : 'false');
    error.textContent = msg;
    return !msg;
  }

  if (form) {
    var inputs = $$('input, textarea', form);
    inputs.forEach(function (input) {
      input.addEventListener('blur', function () { validateField(input); });
    });
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var ok = inputs.map(validateField).every(Boolean);
      var status = $('.form-status', form);
      if (!ok) {
        status.textContent = '';
        var firstInvalid = $('[aria-invalid="true"]', form);
        if (firstInvalid) firstInvalid.focus();
        return;
      }
      // No backend yet: hand the message to the visitor's mail client.
      var data = new FormData(form);
      var subject = encodeURIComponent('Message from ' + data.get('name'));
      var body = encodeURIComponent(data.get('message') + '\n\n— ' + data.get('name') + ' <' + data.get('email') + '>');
      window.location.href = 'mailto:hello@claudio.example?subject=' + subject + '&body=' + body;
      status.textContent = 'Thanks! Your email app should open to send the message.';
      form.reset();
    });
  }

  /* Newsletter ----------------------------------------------------------- */
  var nl = $('#newsletter-form');
  if (nl) {
    nl.addEventListener('submit', function (e) {
      e.preventDefault();
      var input = $('input', nl);
      var status = $('.newsletter-status');
      if (!emailRe.test(input.value.trim())) {
        status.textContent = 'Please enter a valid email address.';
        return;
      }
      status.textContent = "You're on the list — welcome to Claudio!";
      nl.reset();
    });
  }
})();

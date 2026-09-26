/* CLAUDIO — official website interactions */
(function () {
  'use strict';

  /* Site settings — fill in the real channel URLs when they exist.
     Links left empty show "Coming soon" instead of going nowhere. */
  var SOCIAL = {
    youtube: '',
    instagram: '',
    tiktok: '',
    facebook: ''
  };
  var CONTACT_EMAIL = 'hello@claudio.example';

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

  /* Social links ------------------------------------------------------- */
  $$('[data-platform]').forEach(function (a) {
    var url = SOCIAL[a.getAttribute('data-platform')];
    if (url) {
      a.href = url;
      a.target = '_blank';
      a.rel = 'noopener';
    } else {
      a.removeAttribute('href');
      a.setAttribute('aria-disabled', 'true');
      a.title = 'Coming soon';
    }
  });

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
      window.location.href = 'mailto:' + CONTACT_EMAIL + '?subject=' + subject + '&body=' + body;
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
      status.textContent = "Thanks! We'll let you know when Claudio and Max are back on the road.";
      nl.reset();
    });
  }
})();

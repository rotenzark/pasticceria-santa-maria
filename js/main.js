/* Pasticceria Santa Maria — main.js
   PLUMBING_V 1. Pasticceria da colazione: solo mattina, lun chiuso.
   Gesto-firma: «la mattina del quartiere» (la pasticceria-rituale).
   GSAP SUBITO; reveal once; watchdog 1,5s. */

(function () {
  'use strict';
  var root = document.documentElement;
  root.classList.add('js');
  var reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (reducedMotion) root.classList.add('reduced-motion');

  /* ══════════ CONFIG PER-SITO (PLUMBING_V 1) ══════════ */
  var SITE = {
    slug: 'pasticceria-santa-maria',
    hours: {
      0: [['08:00', '13:00']],
      1: [],
      2: [['07:30', '13:00']],
      3: [['07:30', '13:00']],
      4: [['07:30', '13:00']],
      5: [['07:30', '13:00']],
      6: [['08:00', '13:00']],
    },
    hoursStatusIds: ['orarioStato', 'orarioStato2'],
    hoursTableSelector: '#orariTable tr[data-day]',
    todayClass: 'is-today',
    introId: 'intro',
    introDuration: 1900,
    inViewClass: 'in-view',
    breakpointMenu: 920,
    EN: {
      'nav.classici': 'The classics', 'nav.weekend': 'The weekend', 'nav.torte': 'The cakes', 'nav.dove': 'Where & hours', 'nav.chiama': 'Call',
      'hero.rec': '140 reviews',
      'hero.kicker': 'The classic pastry shop of Via San Siro',
      'hero.sub': 'The cream brioche and the cappuccino, the great classics made with care — and at the weekend <strong>the krapfen</strong>. Open mornings only, because breakfast is a ritual.',
      'hero.cta1': 'Call: 02 3656 2193', 'hero.cta2': 'The classics',
      'cla.kicker': 'Breakfast', 'cla.t1': 'The great classics,', 'cla.t2': 'made like at home',
      'cla.p1': 'The freshly-baked cream brioche, the croissant, the girella, the choux bun: the classics of the pastry shop, made with care, following tradition. <strong>Like homemade</strong> — fragrant, with no artificial flavours or shortcuts.',
      'cla.l1': 'Cream brioche', 'cla.l2': 'Croissants & girelle', 'cla.l3': 'Cream choux buns', 'cla.l4': 'Assorted pastries', 'cla.l5': 'Fruit tarts', 'cla.l6': 'Cappuccino & coffee',
      'wk.kicker': 'The weekend ritual', 'wk.t1': 'The krapfen', 'wk.t2': 'of Saturday and Sunday',
      'wk.p1': 'Some have searched for years for a good krapfen in Milan and find it here: <strong>«perfect»</strong>. Warm, sugar-dusted doughnuts, only at the weekend — and during Carnival the tortelli arrive too. A little fixed appointment.',
      'tor.kicker': 'Cakes to order', 'tor.t1': 'For every occasion,', 'tor.t2': 'even a hundredth birthday',
      'tor.p1': 'From sponge cake with <strong>Chantilly cream and berries</strong> to special requests: Santa Maria’s cakes have graced the neighbourhood’s parties and birthdays — «wonderful, so delicate», they say. Just drop by or call.',
      'casa.kicker': 'Like at home', 'casa.t1': 'Natural, careful,', 'casa.t2': 'bright',
      'casa.p1': 'Here everything respects the natural quality of the ingredients: no artificial flavours, no pointless shortcuts. An intimate, bright little room, a few tables, and the care of someone who makes cakes as they would for their own home.',
      'casa.p2': 'All made here, every morning. Because a neighbourhood pastry shop is a little piece of the neighbourhood.',
      'gal.kicker': 'The pastry shop', 'gal.t1': 'A look', 'gal.t2': 'at the window',
      'rec.kicker': 'What people say', 'rec.t2': 'from 140 Google reviews',
      'rec.r1': '«The classic neighbourhood pastry shop where you know you’ll always find the great classics, made with care, following tradition.»',
      'rec.r2': '«Everything is particularly good, like homemade: fragrant, delicious, with no artificial flavours or shortcuts whatsoever.»',
      'rec.r3': '«For years I’d looked for good krapfen in Milan and never found them as they make them here: they really are perfect!»',
      'rec.r4': '«Sponge cake with Chantilly cream and berries: wonderful, so delicate. So happy to have shared that special day.»',
      'dove.kicker': 'Where & hours', 'dove.t1': 'On Via San Siro,', 'dove.t2': 'De Angeli area',
      'dove.metro': 'Via San Siro 6, 20149 Milan · De Angeli / Buonarroti area, steps from the M1 metro.',
      'dove.chiama': 'Call 02 3656 2193', 'dove.apri': 'Open in Maps',
      'giorni.lun': 'Monday', 'giorni.mar': 'Tuesday', 'giorni.mer': 'Wednesday', 'giorni.gio': 'Thursday', 'giorni.ven': 'Friday', 'giorni.sab': 'Saturday', 'giorni.dom': 'Sunday', 'giorni.chiuso': 'Closed',
      'faq.kicker': 'Frequently asked questions',
      'faq.q1': 'What can I find at Santa Maria?', 'faq.a1': 'The great classics of the pastry shop: cream brioche, croissants, girelle, cream choux buns, pastries, tarts and cakes. With cappuccino and coffee. All made with care, like at home.',
      'faq.q2': 'Do you make krapfen?', 'faq.a2': 'Yes, at the weekend: krapfen and doughnuts on Saturday and Sunday. And during Carnival, the tortelli too.',
      'faq.q3': 'Do you make cakes to order?', 'faq.a3': 'Yes, for special occasions: from sponge cake with Chantilly cream and berries to special requests. Just drop by or call.',
      'faq.q4': 'When are you open?', 'faq.a4': 'Mornings only: Tuesday to Friday 7:30am–1:00pm; Saturday and Sunday 8:00am–1:00pm. Closed Monday.',
      'faq.q5': 'Where are you?', 'faq.a5': 'At Via San Siro 6 in Milan, De Angeli / Buonarroti area. Phone 02 3656 2193.',
      'foot.dove': 'Via San Siro 6, 20149 Milan · <a href="tel:+390236562193">02 3656 2193</a>',
      'foot.demo': 'Demo website (concept) by Bespoke Studio, built from public data and photos — this is not the official website of the business.',
      'bar.chiama': 'Call', 'bar.orari': 'Hours', 'bar.mappa': 'Directions'
    },
  };
  /* ═══════════════════════════════════════════════════ */

  var hasGsap = typeof gsap !== 'undefined';
  var hasST = hasGsap && typeof ScrollTrigger !== 'undefined';
  if (hasST) gsap.registerPlugin(ScrollTrigger);

  function showAllReveals() {
    var els = document.querySelectorAll('.reveal, .reveal-hero');
    els.forEach(function (el) { el.classList.add(SITE.inViewClass); });
    if (hasGsap) { gsap.set(els, { opacity: 1, y: 0 }); }
    else { els.forEach(function (el) { el.style.opacity = 1; }); }
  }
  setTimeout(showAllReveals, 1500);

  if (hasGsap && !reducedMotion) {
    gsap.utils.toArray('.reveal').forEach(function (el) {
      gsap.fromTo(el, { opacity: 0, y: 24 }, { opacity: 1, y: 0, duration: .7, ease: 'power2.out', scrollTrigger: { trigger: el, start: 'top 88%', once: true } });
    });
    gsap.to('#heroPhoto', { yPercent: 8, ease: 'none', scrollTrigger: { trigger: '.hero', start: 'top top', end: 'bottom top', scrub: true } });
  } else {
    document.querySelectorAll('.reveal, .reveal-hero').forEach(function (el) { el.classList.add(SITE.inViewClass); el.style.opacity = 1; });
  }

  /* hero entrance */
  function heroEntrance() {
    if (!hasGsap || reducedMotion) { document.querySelectorAll('.reveal-hero').forEach(function (el) { el.style.opacity = 1; }); return; }
    gsap.timeline({ defaults: { ease: 'power3.out' } })
      .to('.hero__badge', { opacity: 1, y: 0, duration: .5 }, .05)
      .to('.hero__kicker', { opacity: 1, y: 0, duration: .5 }, .15)
      .fromTo('.hero__title', { opacity: 0, y: 26 }, { opacity: 1, y: 0, duration: .8 }, .25)
      .to('.hero__sub', { opacity: 1, y: 0, duration: .6 }, .55)
      .to('.tuner', { opacity: 1, y: 0, duration: .5 }, .7)
      .to('.hero__cta', { opacity: 1, y: 0, duration: .6 }, .8);
  }
  var intro = document.getElementById(SITE.introId);
  function hideIntro() { if (!intro) return; var el = intro; intro = null; el.classList.add('hide'); setTimeout(function () { el.remove(); }, 650); heroEntrance(); }
  if (reducedMotion || !intro) { if (intro) { intro.remove(); intro = null; } heroEntrance(); }
  else { setTimeout(hideIntro, SITE.introDuration); setTimeout(hideIntro, 6000); intro.addEventListener('click', hideIntro); }

  /* burger */
  var burger = document.getElementById('burger'); var nav = document.getElementById('mainNav');
  if (burger && nav) {
    var lastFocus = null;
    var closeNav = function () { nav.classList.remove('nav-open'); burger.setAttribute('aria-expanded', 'false'); if (lastFocus) { lastFocus.focus(); lastFocus = null; } };
    var openNav = function () { lastFocus = document.activeElement; nav.classList.add('nav-open'); burger.setAttribute('aria-expanded', 'true'); var f = nav.querySelector('a'); if (f) f.focus(); };
    burger.addEventListener('click', function () { nav.classList.contains('nav-open') ? closeNav() : openNav(); });
    nav.querySelectorAll('a').forEach(function (a) { a.addEventListener('click', closeNav); });
    document.addEventListener('keydown', function (e) { if (e.key === 'Escape' && nav.classList.contains('nav-open')) closeNav(); });
    window.addEventListener('resize', function () { if (window.innerWidth > SITE.breakpointMenu) closeNav(); });
  }

  /* lightbox */
  var lightbox = document.getElementById('lightbox'), lightboxImg = document.getElementById('lightboxImg'), lightboxClose = document.getElementById('lightboxClose');
  if (lightbox && lightboxImg) {
    var opener = null;
    var openLb = function (src, alt) { lightboxImg.src = src; lightboxImg.alt = alt || ''; lightbox.hidden = false; document.body.style.overflow = 'hidden'; if (lightboxClose) lightboxClose.focus(); };
    var closeLb = function () { lightbox.hidden = true; lightboxImg.src = ''; document.body.style.overflow = ''; if (opener) { opener.focus(); opener = null; } };
    document.querySelectorAll('[data-full]').forEach(function (fig) {
      fig.setAttribute('tabindex', '0'); fig.setAttribute('role', 'button');
      var img = fig.querySelector('img');
      var go = function () { opener = fig; openLb(fig.getAttribute('data-full'), img ? img.alt : ''); };
      fig.addEventListener('click', go);
      fig.addEventListener('keydown', function (e) { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); go(); } });
    });
    if (lightboxClose) lightboxClose.addEventListener('click', closeLb);
    lightbox.addEventListener('click', function (e) { if (e.target === lightbox) closeLb(); });
    document.addEventListener('keydown', function (e) { if (e.key === 'Escape' && !lightbox.hidden) closeLb(); });
  }

  /* orari dinamici Europe/Rome (PLUMBING_V 1) */
  function romeNow() {
    try {
      var f = new Intl.DateTimeFormat('en-GB', { timeZone: 'Europe/Rome', weekday: 'short', hour: '2-digit', minute: '2-digit', hour12: false });
      var p = f.formatToParts(new Date());
      var map = { Sun: 0, Mon: 1, Tue: 2, Wed: 3, Thu: 4, Fri: 5, Sat: 6 };
      var g = function (t) { return p.find(function (x) { return x.type === t; }).value; };
      return { day: map[g('weekday')], mins: parseInt(g('hour'), 10) * 60 + parseInt(g('minute'), 10) };
    } catch (e) { var d = new Date(); return { day: d.getDay(), mins: d.getHours() * 60 + d.getMinutes() }; }
  }
  var toMin = function (hm) { var a = hm.split(':'); return parseInt(a[0], 10) * 60 + parseInt(a[1], 10); };
  var fmt = function (m) { m = ((m % 1440) + 1440) % 1440; return ('0' + Math.floor(m / 60)).slice(-2) + ':' + ('0' + (m % 60)).slice(-2); };
  var DIT = ['domenica', 'lunedì', 'martedì', 'mercoledì', 'giovedì', 'venerdì', 'sabato'];
  var DEN = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  function hoursState() {
    var now = romeNow(), w = SITE.hours[now.day] || [];
    for (var i = 0; i < w.length; i++) { var s = toMin(w[i][0]), e = toMin(w[i][1]); if (now.mins >= s && now.mins < Math.min(e, 1440)) return { open: true, day: now.day, closesAt: fmt(e) }; }
    for (var k = 0; k < w.length; k++) { if (now.mins < toMin(w[k][0])) return { open: false, day: now.day, opensToday: fmt(toMin(w[k][0])) }; }
    for (var d = 1; d <= 7; d++) { var nd = (now.day + d) % 7, nw = SITE.hours[nd] || []; if (nw.length) return { open: false, day: now.day, opensDay: nd, opensAt: fmt(toMin(nw[0][0])) }; }
    return { open: false, day: now.day };
  }
  function renderHours() {
    var st = hoursState();
    document.querySelectorAll(SITE.hoursTableSelector).forEach(function (row) { row.classList.toggle(SITE.todayClass, parseInt(row.getAttribute('data-day'), 10) === st.day); });
    var en = root.lang === 'en', txt;
    if (st.open) txt = (en ? 'Open now · closes at ' : 'Aperto ora · chiude alle ') + st.closesAt;
    else if (st.opensToday) txt = (en ? 'Closed · opens today at ' : 'Chiuso · apre oggi alle ') + st.opensToday;
    else if (st.opensAt !== undefined) txt = (en ? 'Closed · opens ' + DEN[st.opensDay] + ' at ' : 'Chiuso · apre ' + DIT[st.opensDay] + ' alle ') + st.opensAt;
    else txt = en ? 'Closed' : 'Chiuso';
    SITE.hoursStatusIds.forEach(function (id) { var el = document.getElementById(id); if (el) el.textContent = txt; });
  }
  renderHours(); setInterval(renderHours, 60000);

  /* i18n overlay (innerHTML per <strong>/<em>/<a>) */
  var originals = {};
  var I18N_ATTRS = [['data-i18n', null], ['data-i18n-aria', 'aria-label'], ['data-i18n-alt', 'alt']];
  function setLang(lang) {
    root.lang = lang === 'en' ? 'en' : 'it';
    I18N_ATTRS.forEach(function (pair) {
      var dattr = pair[0], target = pair[1];
      if (!originals[dattr]) originals[dattr] = {};
      document.querySelectorAll('[' + dattr + ']').forEach(function (el) {
        var key = el.getAttribute(dattr), store = originals[dattr];
        if (!(key in store)) store[key] = target ? el.getAttribute(target) : el.innerHTML;
        var val = lang === 'en' && SITE.EN[key] !== undefined ? SITE.EN[key] : store[key];
        if (target) el.setAttribute(target, val); else el.innerHTML = val;
      });
    });
    renderHours();
    var t = document.getElementById('langToggle'); if (t) t.textContent = lang === 'en' ? 'IT' : 'EN';
    try { localStorage.setItem(SITE.slug + '-lang', lang); } catch (e) {}
  }
  var langToggle = document.getElementById('langToggle');
  if (langToggle) langToggle.addEventListener('click', function () { setLang(root.lang === 'en' ? 'it' : 'en'); });
  try { if (localStorage.getItem(SITE.slug + '-lang') === 'en') setLang('en'); } catch (e) {}

  /* action-bar mobile */
  var actionBar = document.getElementById('actionBar');
  if (actionBar) {
    var onScroll = function () { actionBar.classList.toggle('is-visible', window.scrollY > window.innerHeight * 0.6); };
    window.addEventListener('scroll', onScroll, { passive: true }); onScroll();
  }
})();

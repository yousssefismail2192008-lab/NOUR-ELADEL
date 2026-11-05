/* نور العدل — interactions & motion */
(async () => {
  const d = document, root = d.documentElement;
  const $ = (s, c = d) => c.querySelector(s);
  const $$ = (s, c = d) => [...c.querySelectorAll(s)];
  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const fine = matchMedia('(pointer: fine)').matches;
  const G = window.gsap;
  const hasG = !!G && !reduce;
  if (hasG) { G.registerPlugin(window.ScrollTrigger); root.classList.add('anim'); }

  /* ---------- wait for live content (Supabase) ---------- */
  await Promise.race([window.NOOR_READY || Promise.resolve(), new Promise((r) => setTimeout(r, 2500))]);
  window.NOOR_STARTED = true;

  /* ---------- split headings into words ---------- */
  function split(el) {
    const walk = (node) => {
      [...node.childNodes].forEach((n) => {
        if (n.nodeType === 3) {
          const parts = n.textContent.split(/(\s+)/);
          const frag = d.createDocumentFragment();
          const gold = node.classList && node.classList.contains('gold-text');
          parts.forEach((p) => {
            if (!p) return;
            if (/^\s+$/.test(p)) { frag.appendChild(d.createTextNode(' ')); return; }
            const w = d.createElement('span'); w.className = 'w';
            const i = d.createElement('span'); i.textContent = p; if (gold) i.className = 'gold-text';
            w.appendChild(i); frag.appendChild(w);
          });
          n.replaceWith(frag);
        } else if (n.nodeType === 1) walk(n);
      });
      if (node.classList && node.classList.contains('gold-text')) node.classList.remove('gold-text');
    };
    walk(el);
  }
  if (hasG) $$('[data-split]').forEach(split);

  /* ---------- preloader ---------- */
  const pre = $('.preloader');
  let started = false;
  function start() {
    if (started) return; started = true;
    if (pre) {
      if (hasG) G.to(pre, { yPercent: -100, duration: 1, ease: 'expo.inOut', onComplete: () => pre.remove() });
      else { pre.classList.add('done'); setTimeout(() => pre.remove(), 700); }
    }
    intro();
  }
  if (d.readyState === 'complete') setTimeout(start, 250);
  else window.addEventListener('load', () => setTimeout(start, 350));
  setTimeout(start, 2600);

  /* ---------- header / progress ---------- */
  const hdr = $('.site-header'), bar = $('.scroll-progress span');
  let lastY = 0;
  const onScroll = () => {
    const y = scrollY, h = d.documentElement.scrollHeight - innerHeight;
    hdr.classList.toggle('scrolled', y > 40);
    hdr.classList.toggle('hide', y > 400 && y > lastY && !d.body.classList.contains('menu-open'));
    lastY = y;
    if (bar) bar.style.transform = `scaleX(${h > 0 ? y / h : 0})`;
  };
  addEventListener('scroll', onScroll, { passive: true }); onScroll();

  /* ---------- mobile menu ---------- */
  const menu = $('.m-menu'), burger = $('.burger');
  const toggleMenu = (open) => {
    menu.classList.toggle('open', open); menu.setAttribute('aria-hidden', !open);
    burger.setAttribute('aria-expanded', open); d.body.classList.toggle('menu-open', open);
    d.body.style.overflow = open ? 'hidden' : '';
  };
  burger && burger.addEventListener('click', () => toggleMenu(true));
  $('.m-close') && $('.m-close').addEventListener('click', () => toggleMenu(false));
  $$('.m-link').forEach((a) => a.addEventListener('click', () => toggleMenu(false)));
  addEventListener('keydown', (e) => { if (e.key === 'Escape' && menu.classList.contains('open')) toggleMenu(false); });


  /* ---------- HUD reveal effect (emblem slide) ---------- */
  const FX = new Map();
  const EMB = { w: 2400, h: 1066, cx: 506.2, cy: 543, r: 422, ring: 17 };
  function fxGeom(slide, cv) {
    const img = $('.bg-main', slide); if (!img) return null;
    const br = cv.getBoundingClientRect(), ir = img.getBoundingClientRect();
    const sc = Math.max(ir.width / EMB.w, ir.height / EMB.h);
    const dw = EMB.w * sc, dh = EMB.h * sc;
    const pos = getComputedStyle(img).objectPosition.split(' ').map((v) => parseFloat(v) / 100);
    const ox = ir.left - br.left + (ir.width - dw) * (isNaN(pos[0]) ? .5 : pos[0]);
    const oy = ir.top - br.top + (ir.height - dh) * (isNaN(pos[1]) ? .5 : pos[1]);
    return { x: ox + EMB.cx * sc, y: oy + EMB.cy * sc, R: EMB.r * sc };
  }
  const clamp = (v) => Math.max(0, Math.min(1, v));
  const seg = (t, a, b) => clamp((t - a) / (b - a));
  const easeO = (k) => 1 - Math.pow(1 - k, 3);
  function fxStart(slide, dur) {
    fxStop(slide, true);
    const title = $('.fx-text', slide);
    const st = { timers: [], raf: 0 };
    FX.set(slide, st);
    if (title) { title.classList.remove('fx-in'); }
    const showTitle = () => title && title.classList.add('fx-in');
    if (reduce) { showTitle(); return; }
    const bg = $('.slide-bg', slide);
    const cv = d.createElement('canvas'); cv.className = 'fx-canvas'; bg.appendChild(cv);
    st.cv = cv;
    const ctx = cv.getContext('2d');
    const rnd = (a, b) => a + Math.random() * (b - a);
    const smoke = Array.from({ length: 160 }, () => ({ a: rnd(0, Math.PI * 2), j: rnd(-.09, .09), s: rnd(.05, .13), o: rnd(.25, .7) }));
    const net = Array.from({ length: 26 }, () => ({ a: rnd(0, Math.PI * 2), d: rnd(.2, 1), v: rnd(.6, 1.6) }));
    const T = 4.8;
    let t0 = performance.now();
    const draw = (now) => {
      const t = (now - t0) / 1000;
      const dpr = Math.min(devicePixelRatio || 1, 2);
      const W = cv.clientWidth, H = cv.clientHeight;
      if (cv.width !== Math.round(W * dpr)) { cv.width = Math.round(W * dpr); cv.height = Math.round(H * dpr); }
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0); ctx.clearRect(0, 0, W, H);
      const g = fxGeom(slide, cv); if (!g) return;
      const { x, y, R } = g;
      // cover the emblem
      const cover = 1 - easeO(seg(t, 3.85, 4.6));
      if (cover > 0) {
        const grd = ctx.createRadialGradient(x, y, R * .2, x, y, R * 1.12);
        grd.addColorStop(0, `rgba(10,16,34,${cover})`); grd.addColorStop(.86, `rgba(9,14,30,${cover})`); grd.addColorStop(1, 'rgba(9,14,30,0)');
        ctx.fillStyle = grd; ctx.beginPath(); ctx.arc(x, y, R * 1.12, 0, Math.PI * 2); ctx.fill();
      }
      ctx.globalCompositeOperation = 'lighter';
      // flares
      const flare = (k, size) => {
        if (k <= 0) return;
        const gr = ctx.createRadialGradient(x, y, 0, x, y, R * .45 * size);
        gr.addColorStop(0, `rgba(255,246,220,${k})`); gr.addColorStop(.25, `rgba(243,215,150,${k * .6})`); gr.addColorStop(1, 'rgba(200,162,94,0)');
        ctx.fillStyle = gr; ctx.beginPath(); ctx.arc(x, y, R * .45 * size, 0, Math.PI * 2); ctx.fill();
        const sv = ctx.createLinearGradient(x, y - R * 1.6, x, y + R * 1.6);
        sv.addColorStop(0, 'rgba(232,205,146,0)'); sv.addColorStop(.5, `rgba(255,240,205,${k * .8})`); sv.addColorStop(1, 'rgba(232,205,146,0)');
        ctx.fillStyle = sv; ctx.fillRect(x - 1.5 * size, y - R * 1.6, 3 * size, R * 3.2);
        const sh = ctx.createLinearGradient(x - R * 1.4, y, x + R * 1.4, y);
        sh.addColorStop(0, 'rgba(232,205,146,0)'); sh.addColorStop(.5, `rgba(255,240,205,${k * .5})`); sh.addColorStop(1, 'rgba(232,205,146,0)');
        ctx.fillStyle = sh; ctx.fillRect(x - R * 1.4, y - 1, R * 2.8, 2);
      };
      flare(Math.sin(Math.PI * seg(t, .05, 1.1)), 1);
      flare(Math.sin(Math.PI * seg(t, 3.3, 4.05)) * .9, .8);
      // HUD rings
      const build = easeO(seg(t, .7, 1.9));
      const out = easeO(seg(t, 2.55, 3.35));
      const hudA = seg(t, .7, 1.0) * (1 - out);
      if (hudA > 0) {
        const sc = 1 + out * 1.3;
        ctx.lineCap = 'round';
        const rings = [[.36, 2, 1], [.56, 1.2, -1], [.78, 2.4, 1], [.97, 1, -1]];
        rings.forEach(([rr, lw, dir], idx) => {
          const prog = clamp(build * 1.25 - idx * .12);
          const rot = dir * t * (.35 + idx * .12);
          ctx.strokeStyle = `rgba(232,205,146,${.85 * hudA})`; ctx.lineWidth = lw;
          ctx.beginPath(); ctx.arc(x, y, R * rr * sc, rot, rot + Math.PI * 2 * prog); ctx.stroke();
        });
        // tick ring
        const ticks = 64, tr = R * .87 * sc;
        ctx.strokeStyle = `rgba(243,215,150,${.7 * hudA})`; ctx.lineWidth = 1.5;
        for (let k = 0; k < ticks * build; k++) {
          const a = (k / ticks) * Math.PI * 2 - t * .25, len = k % 4 === 0 ? R * .05 : R * .025;
          ctx.beginPath(); ctx.moveTo(x + Math.cos(a) * tr, y + Math.sin(a) * tr); ctx.lineTo(x + Math.cos(a) * (tr - len), y + Math.sin(a) * (tr - len)); ctx.stroke();
        }
        // segmented arcs
        ctx.lineWidth = R * .035; ctx.strokeStyle = `rgba(200,162,94,${.55 * hudA})`;
        for (let k = 0; k < 6; k++) { const a = k * Math.PI / 3 + t * .6; ctx.beginPath(); ctx.arc(x, y, R * .67 * sc, a, a + .5 * build); ctx.stroke(); }
        // core
        const core = seg(t, 1.1, 2.3);
        const cr = R * .27 * sc;
        const cg = ctx.createRadialGradient(x, y, 0, x, y, cr);
        cg.addColorStop(0, `rgba(255,244,214,${.85 * core * hudA})`); cg.addColorStop(.75, `rgba(232,205,146,${.55 * core * hudA})`); cg.addColorStop(1, 'rgba(200,162,94,0)');
        ctx.fillStyle = cg; ctx.beginPath(); ctx.arc(x, y, cr, 0, Math.PI * 2); ctx.fill();
        if (core < 1) { // pixel noise build-up
          ctx.fillStyle = `rgba(255,240,205,${.8 * hudA})`; const px = Math.max(2, R * .025);
          for (let k = 0; k < 90 * core; k++) { const a = Math.random() * Math.PI * 2, rr2 = Math.sqrt(Math.random()) * cr * .9; ctx.fillRect(x + Math.cos(a) * rr2, y + Math.sin(a) * rr2, px, px); }
        }
      }
      // network lines
      const nA = Math.sin(Math.PI * seg(t, 2.7, 3.9));
      if (nA > 0) {
        const k = seg(t, 2.7, 3.9); ctx.strokeStyle = `rgba(232,205,146,${.35 * nA})`; ctx.fillStyle = `rgba(255,240,205,${.8 * nA})`; ctx.lineWidth = 1;
        const pts = net.map((p) => { const dd = R * (p.d * .9 + k * p.v * 1.4); return [x + Math.cos(p.a) * dd, y + Math.sin(p.a) * dd]; });
        pts.forEach((p, i2) => { const q = pts[(i2 + 3) % pts.length], q2 = pts[(i2 + 7) % pts.length];
          ctx.beginPath(); ctx.moveTo(p[0], p[1]); ctx.lineTo(q[0], q[1]); ctx.lineTo(q2[0], q2[1]); ctx.stroke(); ctx.fillRect(p[0] - 1.5, p[1] - 1.5, 3, 3); });
      }
      // smoke ring burst
      const sm = seg(t, 3.75, 4.75);
      if (sm > 0 && sm < 1) {
        const rad = R * (.55 + easeO(sm) * .6), al = Math.sin(Math.PI * sm);
        smoke.forEach((p) => {
          const rr = rad * (1 + p.j), px = x + Math.cos(p.a + sm * .4) * rr, py = y + Math.sin(p.a + sm * .4) * rr, sz = R * p.s * (1 + sm);
          const gp = ctx.createRadialGradient(px, py, 0, px, py, sz);
          gp.addColorStop(0, `rgba(243,215,150,${p.o * al * .35})`); gp.addColorStop(1, 'rgba(200,162,94,0)');
          ctx.fillStyle = gp; ctx.beginPath(); ctx.arc(px, py, sz, 0, Math.PI * 2); ctx.fill();
        });
      }
      ctx.globalCompositeOperation = 'source-over';
      if (t < T) st.raf = requestAnimationFrame(draw);
      else { cv.remove(); st.cv = null; }
    };
    st.raf = requestAnimationFrame((n) => { t0 = n; draw(n); });
    st.timers.push(setTimeout(showTitle, 4600));
    if (title) st.timers.push(setTimeout(() => title.classList.remove('fx-in'), Math.max(5600, (dur - 1.3) * 1000)));
  }
  function fxStop(slide, quiet) {
    const st = FX.get(slide); if (!st) return;
    cancelAnimationFrame(st.raf); st.timers.forEach(clearTimeout);
    if (st.cv) { const c = st.cv; if (quiet) c.remove(); else { c.style.transition = 'opacity .6s'; c.style.opacity = 0; setTimeout(() => c.remove(), 700); } }
    const title = $('.fx-text', slide); if (title && quiet) title.classList.remove('fx-in');
    FX.delete(slide);
  }


  /* ---------- rotating gold frame (emblem slide) ---------- */
  function initRing(slide) {
    const bg = $('.slide-bg', slide); if (!bg) return;
    const cv = d.createElement('canvas'); cv.className = 'fx-canvas ring-canvas'; bg.appendChild(cv);
    const ctx = cv.getContext('2d');
    const conic = !!ctx.createConicGradient;
    // pre-rendered starburst sprite (matches the flares of the original artwork)
    const burst = d.createElement('canvas'); burst.width = burst.height = 256;
    (() => {
      const b = burst.getContext('2d'), c = 128;
      b.globalCompositeOperation = 'lighter';
      const glow = b.createRadialGradient(c, c, 0, c, c, 70);
      glow.addColorStop(0, 'rgba(255,248,226,1)'); glow.addColorStop(.12, 'rgba(255,226,160,.9)'); glow.addColorStop(.4, 'rgba(226,160,70,.35)'); glow.addColorStop(1, 'rgba(180,110,40,0)');
      b.fillStyle = glow; b.beginPath(); b.arc(c, c, 70, 0, Math.PI * 2); b.fill();
      const rays = 14;
      for (let i = 0; i < rays; i++) {
        const a = (i / rays) * Math.PI * 2 + (i % 2 ? .1 : 0), len = (i % 2 ? 62 : 104) * (.8 + Math.random() * .35), w = i % 2 ? .05 : .075;
        const g = b.createRadialGradient(c, c, 0, c, c, len);
        g.addColorStop(0, 'rgba(255,236,190,.75)'); g.addColorStop(.5, 'rgba(240,190,110,.25)'); g.addColorStop(1, 'rgba(220,150,70,0)');
        b.fillStyle = g; b.beginPath(); b.moveTo(c, c);
        b.lineTo(c + Math.cos(a - w) * len, c + Math.sin(a - w) * len); b.lineTo(c + Math.cos(a + w) * len, c + Math.sin(a + w) * len); b.closePath(); b.fill();
      }
      const core = b.createRadialGradient(c, c, 0, c, c, 16);
      core.addColorStop(0, 'rgba(255,255,245,1)'); core.addColorStop(1, 'rgba(255,240,200,0)');
      b.fillStyle = core; b.beginPath(); b.arc(c, c, 16, 0, Math.PI * 2); b.fill();
    })();
    let raf = 0, t0 = performance.now();
    const frame = (now) => {
      raf = 0;
      if (!(slide.classList.contains('is-active') || slide.classList.contains('is-leaving'))) return;
      const dpr = Math.min(devicePixelRatio || 1, 2), W = cv.clientWidth, H = cv.clientHeight;
      if (cv.width !== Math.round(W * dpr) || cv.height !== Math.round(H * dpr)) { cv.width = Math.round(W * dpr); cv.height = Math.round(H * dpr); }
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0); ctx.clearRect(0, 0, W, H);
      const g = fxGeom(slide, cv);
      if (g) {
        const { x, y, R } = g, k = R / EMB.r, lw = EMB.ring * k;
        const ang = ((now - t0) / 1000) * (reduce ? 0 : .55);
        // base ring (soft sheen)
        if (conic) {
          const cg = ctx.createConicGradient(ang, x, y);
          [[0, '#b48a45'], [.12, '#e9cd8c'], [.25, '#a77d3b'], [.37, '#d6b36f'], [.5, '#b48a45'], [.62, '#e9cd8c'], [.75, '#a77d3b'], [.87, '#d6b36f'], [1, '#b48a45']].forEach(([o, c]) => cg.addColorStop(o, c));
          ctx.strokeStyle = cg;
        } else ctx.strokeStyle = '#c8a25e';
        ctx.lineWidth = lw; ctx.beginPath(); ctx.arc(x, y, R, 0, Math.PI * 2); ctx.stroke();
        ctx.lineWidth = Math.max(1, lw * .14); ctx.strokeStyle = 'rgba(255,240,205,.4)';
        ctx.beginPath(); ctx.arc(x, y, R - lw * .3, 0, Math.PI * 2); ctx.stroke();
        // the two starbursts travel around the frame
        ctx.globalCompositeOperation = 'lighter';
        const sz = R * .62;
        [ang - Math.PI / 2, ang + Math.PI / 2].forEach((a) => {
          const gx = x + Math.cos(a) * R, gy = y + Math.sin(a) * R;
          ctx.drawImage(burst, gx - sz / 2, gy - sz / 2, sz, sz);
        });
        ctx.globalCompositeOperation = 'source-over';
      }
      raf = requestAnimationFrame(frame);
    };
    const kick = () => { if (!raf) raf = requestAnimationFrame(frame); };
    new MutationObserver(kick).observe(slide, { attributes: true, attributeFilter: ['class'] });
    kick();
  }
  $$('.slide[data-ring]').forEach(initRing);

  /* ---------- hero slider ---------- */
  const hero = $('.hero');
  let heroGo = () => {};
  if (hero) {
    const slides = $$('.slide', hero), navs = $$('.hn-item', hero);
    const DUR = 6;
    const durOf = (i) => +(slides[i].dataset.dur || DUR);
    let cur = 0, timer, prog;
    const animIn = (s) => {
      if (!hasG) return;
      const els = $$('.s-anim', s);
      G.fromTo(els, { yPercent: 105, opacity: 0 }, { yPercent: 0, opacity: 1, duration: 1.1, ease: 'expo.out', stagger: .09, delay: .25, overwrite: true });
    };
    const runProgress = (i) => {
      navs.forEach((n, k) => { const b = $('i', n); if (hasG) G.killTweensOf(b); b.style.transform = 'scaleX(0)'; n.classList.toggle('is-active', k === i); });
      const b = $('i', navs[i]);
      clearTimeout(timer);
      if (hasG) { prog = G.fromTo(b, { scaleX: 0 }, { scaleX: 1, duration: durOf(i), ease: 'none', onComplete: () => go(cur + 1) }); }
      else { b.style.transform = 'scaleX(1)'; timer = setTimeout(() => go(cur + 1), durOf(i) * 1000); }
    };
    const go = (n) => {
      n = (n + slides.length) % slides.length;
      if (n === cur) return;
      const prev = slides[cur], next = slides[n];
      slides.forEach((s) => s.classList.remove('is-leaving'));
      prev.classList.remove('is-active'); prev.classList.add('is-leaving');
      next.classList.add('is-active');
      const img = $('.slide-bg img', next); img.style.animation = 'none'; void img.offsetWidth; img.style.animation = '';
      if (hasG) {
        G.fromTo($('.slide-bg', next), { opacity: 0 }, { opacity: 1, duration: 1.4, ease: 'power1.inOut', onComplete: () => prev.classList.remove('is-leaving') });
        G.to($$('.s-anim', prev), { yPercent: -60, opacity: 0, duration: .6, ease: 'power3.in', stagger: .04 });
        G.set($$('.s-anim', next), { yPercent: 105, opacity: 0 });
        animIn(next);
      } else prev.classList.remove('is-leaving');
      if (prev.dataset.fx) fxStop(prev);
      if (next.dataset.fx) fxStart(next, durOf(n));
      cur = n; runProgress(n);
    };
    heroGo = () => { animIn(slides[0]); if (slides.length > 1) runProgress(0); };
    if (hasG) G.set($$('.s-anim', slides[0]), { yPercent: 105, opacity: 0 });
    navs.forEach((b) => b.addEventListener('click', () => go(+b.dataset.go)));
    // swipe
    let sx = null;
    hero.addEventListener('touchstart', (e) => (sx = e.touches[0].clientX), { passive: true });
    hero.addEventListener('touchend', (e) => { if (sx === null) return; const dx = e.changedTouches[0].clientX - sx; if (Math.abs(dx) > 50) go(cur + (dx > 0 ? 1 : -1)); sx = null; });
    d.addEventListener('visibilitychange', () => { if (!prog) return; d.hidden ? prog.pause() : prog.resume(); });
  }

  /* ---------- intro (after preloader) ---------- */
  function intro() {
    heroGo();
    if (!hasG) return;
    G.from('.site-header .hdr > *', { y: -30, opacity: 0, duration: 1, ease: 'expo.out', stagger: .08, delay: .3 });
    if (hero) G.from('.chip, .scroll-cue', { y: 30, opacity: 0, duration: 1, ease: 'expo.out', stagger: .08, delay: .7 });
    if (hero) G.from('.hn-item', { x: -30, opacity: 0, duration: 1, ease: 'expo.out', stagger: .08, delay: .8 });
    scrollAnims();
  }

  /* ---------- scroll animations ---------- */
  function scrollAnims() {
    const ST = window.ScrollTrigger;

    ST.batch('[data-reveal]', {
      start: 'top 88%', once: true,
      onEnter: (els) => G.to(els, { opacity: 1, y: 0, duration: 1.1, ease: 'expo.out', stagger: .09, overwrite: true, onComplete: () => els.forEach((el) => { el.classList.add('in'); G.set(el, { clearProps: 'opacity,transform' }); }) }),
    });

    $$('[data-split]').forEach((h) => {
      const words = $$('.w > span', h);
      G.set(words, { yPercent: 110 });
      ST.create({ trigger: h, start: 'top 88%', once: true, onEnter: () => G.to(words, { yPercent: 0, duration: 1.1, ease: 'expo.out', stagger: .06 }) });
    });

    $$('.img-reveal').forEach((el) => {
      ST.create({ trigger: el, start: 'top 82%', once: true, onEnter: () => {
        G.fromTo(el, { clipPath: 'inset(100% 0% 0% 0%)' }, { clipPath: 'inset(0% 0% 0% 0%)', duration: 1.5, ease: 'expo.inOut' });
        G.fromTo($('img', el), { scale: 1.3 }, { scale: 1, duration: 1.8, ease: 'expo.out' });
      } });
    });

    $$('[data-parallax]').forEach((img) => {
      G.fromTo(img, { yPercent: -7 }, { yPercent: 7, ease: 'none', scrollTrigger: { trigger: img.parentElement, start: 'top bottom', end: 'bottom top', scrub: true } });
    });

    $$('.count').forEach((c) => {
      const to = +c.dataset.to, o = { v: 0 };
      c.textContent = '0';
      ST.create({ trigger: c, start: 'top 90%', once: true, onEnter: () => G.to(o, { v: to, duration: 2.4, ease: 'power3.out', onUpdate: () => (c.textContent = Math.round(o.v).toLocaleString('en')) }) });
    });

    const line = $('.steps-line span');
    if (line) G.to(line, { scaleX: 1, ease: 'none', scrollTrigger: { trigger: '.steps', start: 'top 75%', end: 'bottom 60%', scrub: .6 } });

    $$('.step-dot').forEach((dot) => {
      ST.create({ trigger: dot, start: 'top 80%', once: true, onEnter: () => G.fromTo(dot, { scale: .4 }, { scale: 1, duration: 1, ease: 'elastic.out(1,.5)' }) });
    });

    const mq = $('.marquee');
    if (mq) G.fromTo(mq, { rotate: -1.2 }, { rotate: 1.2, ease: 'none', scrollTrigger: { trigger: mq, start: 'top bottom', end: 'bottom top', scrub: true } });

    $$('.svc-grid').forEach((g) => {
      const cards = $$('.svc-card', g);
      G.set(cards, { opacity: 0, y: 70 });
      ST.batch(cards, { start: 'top 90%', once: true, onEnter: (els) => G.to(els, { opacity: 1, y: 0, duration: 1.2, ease: 'expo.out', stagger: .12, overwrite: true, clearProps: 'opacity,y' }) });
    });

    $$('.fade-head').forEach((h) => {
      const parts = h.children;
      G.set(parts, { opacity: 0 });
      ST.create({ trigger: h, start: 'top 85%', end: 'bottom 15%',
        onEnter: () => G.to(parts, { opacity: 1, duration: 1.1, ease: 'power1.out', stagger: .18, overwrite: true }),
        onEnterBack: () => G.to(parts, { opacity: 1, duration: 1.1, ease: 'power1.out', stagger: .18, overwrite: true }),
        onLeave: () => G.to(parts, { opacity: 0, duration: .8, ease: 'power1.in', overwrite: true }),
        onLeaveBack: () => G.to(parts, { opacity: 0, duration: .8, ease: 'power1.in', overwrite: true }) });
    });
    addEventListener('load', () => ST.refresh());
  }

  /* ---------- FAQ ---------- */
  $$('.faq-item').forEach((it) => {
    const q = $('.faq-q', it), a = $('.faq-a', it);
    q.addEventListener('click', () => {
      const open = !it.classList.contains('open');
      $$('.faq-item.open').forEach((o) => { if (o !== it) { o.classList.remove('open'); $('.faq-a', o).style.height = '0px'; $('.faq-q', o).setAttribute('aria-expanded', 'false'); } });
      it.classList.toggle('open', open); q.setAttribute('aria-expanded', open);
      a.style.height = open ? a.scrollHeight + 'px' : '0px';
    });
  });

  /* ---------- pointer effects ---------- */
  if (fine && !reduce) {
    d.addEventListener('pointermove', (e) => {
      const s = e.target.closest && e.target.closest('.spot');
      if (s) { const r = s.getBoundingClientRect(); s.style.setProperty('--mx', e.clientX - r.left + 'px'); s.style.setProperty('--my', e.clientY - r.top + 'px'); }
    }, { passive: true });

    const glow = $('.cursor-glow');
    if (glow && G) {
      G.set(glow, { xPercent: -50, yPercent: -50, x: innerWidth / 2, y: innerHeight / 2 });
      const gx = G.quickTo(glow, 'x', { duration: .6, ease: 'power3' }), gy = G.quickTo(glow, 'y', { duration: .6, ease: 'power3' });
      addEventListener('pointermove', (e) => { glow.style.opacity = 1; gx(e.clientX); gy(e.clientY); }, { passive: true });
      d.addEventListener('pointerleave', () => (glow.style.opacity = 0));
    }

    if (G) {
      $$('.magnetic').forEach((b) => {
        const mx = G.quickTo(b, 'x', { duration: .5, ease: 'power3' }), my = G.quickTo(b, 'y', { duration: .5, ease: 'power3' });
        b.addEventListener('pointermove', (e) => { const r = b.getBoundingClientRect(); mx((e.clientX - r.left - r.width / 2) * .25); my((e.clientY - r.top - r.height / 2) * .35); });
        b.addEventListener('pointerleave', () => { mx(0); my(0); });
      });
      $$('.svc-card').forEach((c) => {
        G.set(c, { transformPerspective: 900 });
        const rx = G.quickTo(c, 'rotationX', { duration: .6, ease: 'power3' }), ry = G.quickTo(c, 'rotationY', { duration: .6, ease: 'power3' });
        c.addEventListener('pointermove', (e) => { const r = c.getBoundingClientRect(); ry(((e.clientX - r.left) / r.width - .5) * 8); rx(-((e.clientY - r.top) / r.height - .5) * 8); });
        c.addEventListener('pointerleave', () => { rx(0); ry(0); });
      });
    }
  }

  /* ---------- contact form → WhatsApp ---------- */
  const form = $('#contactForm');
  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const f = Object.fromEntries(new FormData(form));
      const err = $('.f-err', form);
      $$('.fld', form).forEach((x) => x.classList.remove('err'));
      const bad = [];
      if (!f.name || f.name.trim().length < 3) bad.push('name');
      if (!f.phone || f.phone.replace(/\D/g, '').length < 8) bad.push('phone');
      if (!f.topic) bad.push('topic');
      if (bad.length) {
        bad.forEach((n) => form.elements[n].closest('.fld').classList.add('err'));
        err.textContent = 'من فضلك اكتب الاسم ورقم الهاتف واختار موضوع الاستشارة.';
        if (G && !reduce) G.fromTo(form, { x: -8 }, { x: 0, duration: .5, ease: 'elastic.out(1,.3)' });
        return;
      }
      err.textContent = '';
      const ok = $('.f-ok', form), btn = $('button[type=submit]', form);
      if (window.NOOR_SB) {
        btn.disabled = true;
        window.NOOR_SB.from('contact_messages').insert({ full_name: f.name.trim(), phone: f.phone.trim(), email: (f.email || '').trim() || null, topic: f.topic, details: (f.details || '').trim() || null })
          .then(({ error }) => {
            btn.disabled = false;
            if (error) { err.textContent = 'حصلت مشكلة في الإرسال، جرّب تاني أو كلمنا على واتساب.'; return; }
            form.reset(); ok.hidden = false; ok.textContent = 'تم إرسال رسالتك بنجاح، وهيتواصل معاك فريقنا في أقرب وقت.';
          });
        return;
      }
      const msg = `السلام عليكم، أنا ${f.name.trim()}\nرقم الهاتف: ${f.phone.trim()}` + (f.email ? `\nالبريد: ${f.email.trim()}` : '') + `\nموضوع الاستشارة: ${f.topic}` + (f.details ? `\nالتفاصيل: ${f.details.trim()}` : '');
      window.open((($('a[data-wa]') || {}).href || 'https://wa.me/201065656521').split('?')[0] + '?text=' + encodeURIComponent(msg), '_blank', 'noopener');
    });
  }
})();

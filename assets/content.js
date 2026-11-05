/* نور العدل — يقرأ محتوى الموقع من Supabase ويحدّث الصفحة قبل ما الأنيميشن يبدأ */
(() => {
  const ICONS = {"shield": "<path d=\"M12 3l7 3v5c0 4.5-3 8.3-7 10-4-1.7-7-5.5-7-10V6l7-3z\"/><path d=\"M9 12l2 2 4-4\"/>", "award": "<circle cx=\"12\" cy=\"9\" r=\"5.5\"/><path d=\"M8.5 13.5L7 21l5-2.5 5 2.5-1.5-7.5\"/>", "users": "<circle cx=\"9\" cy=\"8\" r=\"3.5\"/><path d=\"M2.5 20c.8-3.6 3.4-5.5 6.5-5.5s5.7 1.9 6.5 5.5\"/><path d=\"M16 4.6a3.5 3.5 0 010 6.8M18.5 14.8c1.6.8 2.7 2.5 3 5.2\"/>", "scale": "<path d=\"M12 3v18M7 21h10M4 7h16M6 7l-3 7a3.2 3.2 0 006 0L6 7zM18 7l-3 7a3.2 3.2 0 006 0l-3-7z\"/>", "gavel": "<path d=\"M14.5 3.5l6 6M11 7l6 6M12.75 5.25l-4.5 4.5M17.25 9.75l-4.5 4.5M10 12l-7 7M3 21h9\"/>", "family": "<circle cx=\"8\" cy=\"6\" r=\"2.5\"/><circle cx=\"16\" cy=\"6\" r=\"2.5\"/><circle cx=\"12\" cy=\"13\" r=\"2\"/><path d=\"M4 20v-5a4 4 0 014-4M20 20v-5a4 4 0 00-4-4M9 21v-2a3 3 0 016 0v2\"/>", "doc": "<path d=\"M14 3H7a2 2 0 00-2 2v14a2 2 0 002 2h10a2 2 0 002-2V8l-5-5z\"/><path d=\"M14 3v5h5M9 13h6M9 17h6\"/>", "building": "<path d=\"M3 21h18M5 21V10M19 21V10M9 21v-7M15 21v-7M2 10h20L12 3 2 10z\"/>", "star": "<path d=\"M12 3l2.7 5.6 6.1.9-4.4 4.3 1 6.1L12 17l-5.4 2.9 1-6.1-4.4-4.3 6.1-.9L12 3z\"/>", "briefcase": "<rect x=\"3\" y=\"7\" width=\"18\" height=\"13\" rx=\"2\"/><path d=\"M9 7V5a2 2 0 012-2h2a2 2 0 012 2v2M3 13h18\"/>", "coins": "<ellipse cx=\"9\" cy=\"7\" rx=\"6\" ry=\"3\"/><path d=\"M3 7v4c0 1.7 2.7 3 6 3s6-1.3 6-3V7\"/><path d=\"M9 14v3c0 1.7 2.7 3 6 3s6-1.3 6-3v-4c0-1.6-2.4-2.9-5.5-3\"/>", "chart": "<path d=\"M3 3v18h18\"/><path d=\"M7 15l4-4 3 3 6-7\"/><path d=\"M16 7h4v4\"/>", "phone": "<path d=\"M5 4h4l2 5-2.5 1.5a11 11 0 005 5L15 13l5 2v4a2 2 0 01-2 2A16 16 0 013 6a2 2 0 012-2\"/>", "search": "<circle cx=\"11\" cy=\"11\" r=\"7\"/><path d=\"M21 21l-5-5\"/>", "map": "<path d=\"M12 21s-7-6.2-7-11.5A7 7 0 0119 9.5C19 14.8 12 21 12 21z\"/><circle cx=\"12\" cy=\"9.5\" r=\"2.5\"/>", "mail": "<rect x=\"3\" y=\"5\" width=\"18\" height=\"14\" rx=\"2\"/><path d=\"M3 7l9 6 9-6\"/>", "clock": "<circle cx=\"12\" cy=\"12\" r=\"9\"/><path d=\"M12 7v5l3 2\"/>", "target": "<circle cx=\"12\" cy=\"12\" r=\"9\"/><circle cx=\"12\" cy=\"12\" r=\"5\"/><circle cx=\"12\" cy=\"12\" r=\"1\"/>", "eye": "<path d=\"M2 12s3.6-7 10-7 10 7 10 7-3.6 7-10 7S2 12 2 12z\"/><circle cx=\"12\" cy=\"12\" r=\"3\"/>", "gem": "<path d=\"M6 3h12l4 6-10 12L2 9l4-6z\"/><path d=\"M2 9h20M12 21L8 9l4-6 4 6-4 12\"/>", "check": "<path d=\"M5 12.5l4.5 4.5L19 7.5\"/>", "arrow": "<path d=\"M19 12H5M11 6l-6 6 6 6\"/>", "quote": "<path d=\"M10 7H6a2 2 0 00-2 2v4h6V7zM20 7h-4a2 2 0 00-2 2v4h6V7z\"/><path d=\"M4 13c0 3 1 4 3 5M14 13c0 3 1 4 3 5\"/>", "plus": "<path d=\"M12 5v14M5 12h14\"/>", "menu": "<path d=\"M4 7h16M4 12h16M4 17h10\"/>", "close": "<path d=\"M6 6l12 12M18 6L6 18\"/>", "send": "<path d=\"M21 3L10 14M21 3l-7 18-4-7-7-4 18-7z\"/>", "fb": "<path d=\"M14 8h3V4h-3a4 4 0 00-4 4v3H7v4h3v6h4v-6h3l1-4h-4V8z\"/>", "ig": "<rect x=\"3\" y=\"3\" width=\"18\" height=\"18\" rx=\"5\"/><circle cx=\"12\" cy=\"12\" r=\"4\"/><circle cx=\"17.5\" cy=\"6.5\" r=\".8\"/>"};
  const WA_SVG = "<svg viewBox=\"0 0 24 24\" aria-hidden=\"true\"><path fill=\"currentColor\" d=\"M12 2a10 10 0 00-8.6 15.1L2 22l5-1.3A10 10 0 1012 2zm0 18.2c-1.5 0-3-.4-4.3-1.2l-.3-.2-3 .8.8-2.9-.2-.3A8.2 8.2 0 1112 20.2zm4.5-6.1c-.2-.1-1.5-.7-1.7-.8-.2-.1-.4-.1-.6.1l-.8 1c-.1.2-.3.2-.5.1a6.7 6.7 0 01-3.3-2.9c-.3-.4.2-.4.7-1.3.1-.2 0-.3 0-.4l-.8-1.8c-.2-.5-.4-.4-.6-.4h-.5a1 1 0 00-.7.3 3 3 0 00-.9 2.2 5.2 5.2 0 001.1 2.7 11.8 11.8 0 004.5 4c1.7.7 2.3.8 3.2.6.5-.1 1.5-.6 1.7-1.2.2-.6.2-1.1.2-1.2-.1-.1-.3-.2-.5-.3z\"/></svg>";
  const cfg = window.NOOR_CONFIG || {};
  const d = document;
  const $ = (s, c = d) => c.querySelector(s);
  const $$ = (s, c = d) => [...c.querySelectorAll(s)];
  const esc = (v) => String(v ?? '').replace(/[&<>"']/g, (m) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[m]));
  const rich = (v) => esc(v).replace(/\[([^\]]+)\]/g, '<span class="gold-text">$1</span>');
  const ic = (n, cls = 'ic') => `<svg class="${cls}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${ICONS[n] || ICONS.scale}</svg>`;
  const two = (n) => String(n).padStart(2, '0');

  let sb = null;
  if (cfg.SUPABASE_URL && cfg.SUPABASE_ANON_KEY && window.supabase && !/YOUR_/.test(cfg.SUPABASE_URL)) {
    sb = window.supabase.createClient(cfg.SUPABASE_URL, cfg.SUPABASE_ANON_KEY, { auth: { persistSession: false } });
  }
  window.NOOR_SB = sb;
  window.NOOR_ICON = ic;

  async function load() {
    const q = (t, sel = '*', order = 'sort_order') => sb.from(t).select(sel).order(order, { ascending: true });
    const [st, he, sv, sg, si, stt, ft, pr, te, fa, tx] = await Promise.all([
      sb.from('site_settings').select('*').eq('id', 1).maybeSingle(),
      sb.from('hero').select('*').eq('id', 1).maybeSingle(),
      q('services').eq('is_active', true),
      q('service_groups'), q('service_items'), q('stats'), q('features'), q('process_steps'),
      q('testimonials').eq('is_published', true), q('faqs').eq('is_published', true),
      sb.from('site_texts').select('key,value'),
    ]);
    const err = [st, he, sv, sg, si, stt, ft, pr, te, fa, tx].find((r) => r.error);
    if (err) throw err.error;
    const groups = sg.data || [], items = si.data || [];
    const services = (sv.data || []).map((s) => ({
      ...s,
      groups: groups.filter((g) => g.service_id === s.id).map((g) => ({ ...g, items: items.filter((i) => i.group_id === g.id) })),
    }));
    const texts = Object.fromEntries((tx.data || []).map((r) => [r.key, r.value]));
    return { settings: st.data, hero: he.data, services, stats: stt.data || [], features: ft.data || [], process: pr.data || [], testimonials: te.data || [], faqs: fa.data || [], texts };
  }

  /* ---------- renderers (same markup as the static build) ---------- */
  const card = (s, i) => `
<a href="/services/${esc(s.slug)}" class="svc-card spot">
  <div class="svc-media"><img src="${esc(s.image_url)}" alt="${esc(s.title)}" loading="lazy"></div>
  <div class="svc-shade"></div>
  <span class="svc-num">${two(i + 1)}</span>
  <div class="svc-body">
    <span class="svc-ic">${ic(s.icon)}</span>
    <h3>${esc(s.title)}</h3>
    <p>${esc(s.short_desc)}</p>
    <span class="svc-more">اقرأ المزيد ${ic('arrow')}</span>
  </div>
</a>`;
  const R = {
    services: (D) => D.services.map(card).join(''),
    related: (D, el) => { const slug = d.body.dataset.slug || D._slug; return D.services.filter((s) => s.slug !== slug).slice(0, 3).map((s) => card(s, D.services.indexOf(s))).join(''); },
    'footer-services': (D) => D.services.slice(0, 5).map((s) => `<li><a href="/services/${esc(s.slug)}">${esc(s.title)}</a></li>`).join(''),
    'aside-services': (D) => { const slug = d.body.dataset.slug || D._slug; return D.services.map((s) => `<a href="/services/${esc(s.slug)}" class="${s.slug === slug ? 'is-active' : ''}">${ic(s.icon)}<span>${esc(s.title)}</span></a>`).join(''); },
    topics: (D) => '<option value="" disabled selected></option>' + D.services.map((s) => `<option>${esc(s.title)}</option>`).join('') + '<option>أخرى</option>',
    process: (D) => '<div class="steps-line"><span></span></div>' + D.process.map((p, i) => `
<div class="step" data-reveal>
  <div class="step-dot"><span>${i + 1}</span></div>
  <div class="step-card spot"><span class="step-ic">${ic(p.icon)}</span><h3>${esc(p.title)}</h3><p>${esc(p.body)}</p></div>
</div>`).join(''),
    why: (D) => D.features.filter((f) => f.section === 'why').map((f, i) => `
<div class="why-card spot" data-reveal><span class="why-ic">${ic(f.icon)}</span><h3>${esc(f.title)}</h3><p>${esc(f.body)}</p><span class="why-num">${two(i + 1)}</span></div>`).join(''),
    about_features: (D) => D.features.filter((f) => f.section === 'about_features').map((f) => `
<div class="feat spot" data-reveal><span class="feat-ic">${ic(f.icon)}</span><div><h3>${esc(f.title)}</h3><p>${esc(f.body)}</p></div></div>`).join(''),
    principles: (D) => D.features.filter((f) => f.section === 'principles').map((f) => `
<div class="pr-card spot" data-reveal><span class="pr-ic">${ic(f.icon)}</span><h3>${esc(f.title)}</h3><p>${esc(f.body)}</p></div>`).join(''),
    testimonials: (D) => D.testimonials.map((t) => `
<figure class="t-card spot" data-reveal>
  <span class="t-q">${ic('quote')}</span>
  <div class="t-stars">${'★'.repeat(t.rating || 5)}</div>
  <blockquote>«${esc(t.quote)}»</blockquote>
  <figcaption><span class="t-av">${esc((t.name || '؟')[0])}</span><span><b>${esc(t.name)}</b><small>${esc(t.role)}</small></span></figcaption>
</figure>`).join(''),
    faqs: (D) => D.faqs.map((f) => `
<div class="faq-item" data-reveal>
  <button class="faq-q" aria-expanded="false"><span>${esc(f.question)}</span><i>${ic('plus')}</i></button>
  <div class="faq-a"><p>${esc(f.answer)}</p></div>
</div>`).join(''),
    stats: (D, el) => D.stats.filter((s) => s.page === el.dataset.page).map((s) => `
<div class="stat" data-reveal>
  <div class="stat-num"><span class="pre">${esc(s.prefix)}</span><span class="count" data-to="${+s.value || 0}">${(+s.value || 0).toLocaleString('en')}</span><span class="suf">${esc(s.suffix)}</span></div>
  <div class="stat-label">${esc(s.label)}</div>
</div>`).join(''),
    'about-points': (D) => (D.settings?.about_points || []).map((p) => `<li data-reveal>${ic('check')}<span>${esc(p)}</span></li>`).join(''),
    'about-story': (D) => (D.settings?.about_story || []).map((p) => `<p data-reveal>${esc(p)}</p>`).join(''),
    chips: (D) => (D.hero?.chips || []).map((c) => `<div class="chip">${ic(c.icon)}<span>${esc(c.text)}</span></div>`).join(''),
    'svc-groups': (D) => { const s = D._svc; if (!s) return ''; return s.groups.map((g, gi) => `
<div class="grp spot" data-reveal>
  <div class="grp-head"><span class="grp-n">${two(gi + 1)}</span><h3>${esc(g.title)}</h3><span class="grp-count">${g.items.length} بند</span></div>
  <ul class="grp-list">${g.items.map((it) => `<li>${ic('check')}<span>${esc(it.title)}</span></li>`).join('')}</ul>
</div>`).join(''); },
  };

  function apply(D) {
    const S = D.settings || {};
    // texts
    $$('[data-t]').forEach((el) => { const v = D.texts[el.dataset.t]; if (v == null) return; if (el.hasAttribute('data-rich')) el.innerHTML = rich(v); else el.textContent = v; });
    // settings
    $$('[data-s]').forEach((el) => { const v = S[el.dataset.s]; if (v != null && v !== '') el.textContent = v; });
    $$('[data-s-src]').forEach((el) => { const v = S[el.dataset.sSrc]; if (v) el.src = v; });
    if (S.logo_url) { $$('[data-logo]').forEach((el) => (el.src = S.logo_url)); const fav = $('link[rel="icon"]'); if (fav) fav.href = S.logo_url; }
    if (S.phone_tel) $$('[data-tel]').forEach((a) => (a.href = 'tel:' + S.phone_tel));
    if (S.whatsapp) $$('[data-wa]').forEach((a) => { const u = new URL(a.href); a.href = 'https://wa.me/' + S.whatsapp.replace(/\D/g, '') + u.search; });
    if (S.email) $$('[data-mail]').forEach((a) => (a.href = 'mailto:' + S.email));
    $$('[data-social]').forEach((a) => { const v = S[a.dataset.social]; if (v) { a.href = v; a.target = '_blank'; a.rel = 'noopener'; } else a.hidden = true; });
    // hero
    const H = D.hero;
    if (H) {
      $$('[data-hero-img]').forEach((el) => (el.src = H.image_url));
      const l1 = $('[data-hero-l="1"]'), l2 = $('[data-hero-l="2"]');
      if (l1) { l1.textContent = H.title_line1 || ''; l1.classList.toggle('gold-text', H.gold_line === 1); }
      if (l2) { l2.textContent = H.title_line2 || ''; l2.classList.toggle('gold-text', H.gold_line === 2); l2.parentElement.hidden = !H.title_line2; }
    }
    // service page
    if (d.body.classList.contains('is-service')) {
      let slug = d.body.dataset.slug;
      if (!slug) { slug = decodeURIComponent(location.pathname.replace(/\/+$/, '').split('/').pop() || ''); D._slug = slug; }
      const s = D.services.find((x) => x.slug === slug);
      D._svc = s;
      if (!s) { notFound(); return; }
      $$('[data-svc]').forEach((el) => { el.textContent = s[el.dataset.svc] || ''; });
      $$('[data-svc-src]').forEach((el) => { if (s.image_url) el.src = s.image_url; });
      const ov = $('[data-svc-icon]'); if (ov) ov.innerHTML = ic(s.icon);
      const crumb = $('.crumbs span:last-child'); if (crumb) crumb.textContent = s.title;
      d.title = `${s.title} | ${S.company_name || 'نور العدل للمحاماة'}`;
      $$('.aside-card a[data-wa]').forEach((a) => { const u = new URL(a.href); u.searchParams.set('text', 'السلام عليكم، محتاج استشارة بخصوص: ' + s.title); a.href = u.toString(); });
    }
    // lists
    $$('[data-list]').forEach((el) => { const fn = R[el.dataset.list]; if (fn) el.innerHTML = fn(D, el); });
    d.body.classList.remove('is-generic');
  }

  function notFound() {
    const m = $('main');
    if (m) m.innerHTML = `<section class="nf"><div class="container center"><div class="nf-num gold-text">404</div><h1>الخدمة غير موجودة</h1><p>الخدمة دي مش موجودة أو اتشالت.</p><a href="/services" class="btn btn-gold">${ic('arrow')}<span>كل الخدمات</span></a></div></section>`;
    d.body.classList.remove('is-generic');
  }

  let done = false;
  window.NOOR_READY = (async () => {
    if (!sb) { if (d.body && d.body.classList.contains('is-generic')) { await new Promise((r) => d.readyState === 'loading' ? d.addEventListener('DOMContentLoaded', r) : r()); notFound(); } return false; }
    try {
      const D = await load();
      if (d.readyState === 'loading') await new Promise((r) => d.addEventListener('DOMContentLoaded', r));
      if (window.NOOR_STARTED) return false; // too late; keep static content
      apply(D); done = true; return true;
    } catch (e) {
      console.warn('[noor] content load failed, using built-in content', e);
      if (d.body && d.body.classList.contains('is-generic')) notFound();
      return false;
    }
  })();
})();

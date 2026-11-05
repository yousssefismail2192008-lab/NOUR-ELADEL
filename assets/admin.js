/* نور العدل — لوحة التحكم */
(() => {
  const ICONS = {"shield": "<path d=\"M12 3l7 3v5c0 4.5-3 8.3-7 10-4-1.7-7-5.5-7-10V6l7-3z\"/><path d=\"M9 12l2 2 4-4\"/>", "award": "<circle cx=\"12\" cy=\"9\" r=\"5.5\"/><path d=\"M8.5 13.5L7 21l5-2.5 5 2.5-1.5-7.5\"/>", "users": "<circle cx=\"9\" cy=\"8\" r=\"3.5\"/><path d=\"M2.5 20c.8-3.6 3.4-5.5 6.5-5.5s5.7 1.9 6.5 5.5\"/><path d=\"M16 4.6a3.5 3.5 0 010 6.8M18.5 14.8c1.6.8 2.7 2.5 3 5.2\"/>", "scale": "<path d=\"M12 3v18M7 21h10M4 7h16M6 7l-3 7a3.2 3.2 0 006 0L6 7zM18 7l-3 7a3.2 3.2 0 006 0l-3-7z\"/>", "gavel": "<path d=\"M14.5 3.5l6 6M11 7l6 6M12.75 5.25l-4.5 4.5M17.25 9.75l-4.5 4.5M10 12l-7 7M3 21h9\"/>", "family": "<circle cx=\"8\" cy=\"6\" r=\"2.5\"/><circle cx=\"16\" cy=\"6\" r=\"2.5\"/><circle cx=\"12\" cy=\"13\" r=\"2\"/><path d=\"M4 20v-5a4 4 0 014-4M20 20v-5a4 4 0 00-4-4M9 21v-2a3 3 0 016 0v2\"/>", "doc": "<path d=\"M14 3H7a2 2 0 00-2 2v14a2 2 0 002 2h10a2 2 0 002-2V8l-5-5z\"/><path d=\"M14 3v5h5M9 13h6M9 17h6\"/>", "building": "<path d=\"M3 21h18M5 21V10M19 21V10M9 21v-7M15 21v-7M2 10h20L12 3 2 10z\"/>", "star": "<path d=\"M12 3l2.7 5.6 6.1.9-4.4 4.3 1 6.1L12 17l-5.4 2.9 1-6.1-4.4-4.3 6.1-.9L12 3z\"/>", "briefcase": "<rect x=\"3\" y=\"7\" width=\"18\" height=\"13\" rx=\"2\"/><path d=\"M9 7V5a2 2 0 012-2h2a2 2 0 012 2v2M3 13h18\"/>", "coins": "<ellipse cx=\"9\" cy=\"7\" rx=\"6\" ry=\"3\"/><path d=\"M3 7v4c0 1.7 2.7 3 6 3s6-1.3 6-3V7\"/><path d=\"M9 14v3c0 1.7 2.7 3 6 3s6-1.3 6-3v-4c0-1.6-2.4-2.9-5.5-3\"/>", "chart": "<path d=\"M3 3v18h18\"/><path d=\"M7 15l4-4 3 3 6-7\"/><path d=\"M16 7h4v4\"/>", "phone": "<path d=\"M5 4h4l2 5-2.5 1.5a11 11 0 005 5L15 13l5 2v4a2 2 0 01-2 2A16 16 0 013 6a2 2 0 012-2\"/>", "search": "<circle cx=\"11\" cy=\"11\" r=\"7\"/><path d=\"M21 21l-5-5\"/>", "map": "<path d=\"M12 21s-7-6.2-7-11.5A7 7 0 0119 9.5C19 14.8 12 21 12 21z\"/><circle cx=\"12\" cy=\"9.5\" r=\"2.5\"/>", "mail": "<rect x=\"3\" y=\"5\" width=\"18\" height=\"14\" rx=\"2\"/><path d=\"M3 7l9 6 9-6\"/>", "clock": "<circle cx=\"12\" cy=\"12\" r=\"9\"/><path d=\"M12 7v5l3 2\"/>", "target": "<circle cx=\"12\" cy=\"12\" r=\"9\"/><circle cx=\"12\" cy=\"12\" r=\"5\"/><circle cx=\"12\" cy=\"12\" r=\"1\"/>", "eye": "<path d=\"M2 12s3.6-7 10-7 10 7 10 7-3.6 7-10 7S2 12 2 12z\"/><circle cx=\"12\" cy=\"12\" r=\"3\"/>", "gem": "<path d=\"M6 3h12l4 6-10 12L2 9l4-6z\"/><path d=\"M2 9h20M12 21L8 9l4-6 4 6-4 12\"/>", "check": "<path d=\"M5 12.5l4.5 4.5L19 7.5\"/>", "arrow": "<path d=\"M19 12H5M11 6l-6 6 6 6\"/>", "quote": "<path d=\"M10 7H6a2 2 0 00-2 2v4h6V7zM20 7h-4a2 2 0 00-2 2v4h6V7z\"/><path d=\"M4 13c0 3 1 4 3 5M14 13c0 3 1 4 3 5\"/>", "plus": "<path d=\"M12 5v14M5 12h14\"/>", "menu": "<path d=\"M4 7h16M4 12h16M4 17h10\"/>", "close": "<path d=\"M6 6l12 12M18 6L6 18\"/>", "send": "<path d=\"M21 3L10 14M21 3l-7 18-4-7-7-4 18-7z\"/>", "fb": "<path d=\"M14 8h3V4h-3a4 4 0 00-4 4v3H7v4h3v6h4v-6h3l1-4h-4V8z\"/>", "ig": "<rect x=\"3\" y=\"3\" width=\"18\" height=\"18\" rx=\"5\"/><circle cx=\"12\" cy=\"12\" r=\"4\"/><circle cx=\"17.5\" cy=\"6.5\" r=\".8\"/>"};
  const ICON_NAMES = ['scale', 'gavel', 'shield', 'award', 'users', 'family', 'doc', 'building', 'star', 'briefcase', 'coins', 'chart', 'phone', 'search', 'map', 'mail', 'clock', 'target', 'eye', 'gem', 'check', 'quote', 'send'];
  const UI = {
    home: '<path d="M3 11l9-7 9 7"/><path d="M5 10v10h14V10"/>', inbox: '<path d="M3 13l3-8h12l3 8v6H3z"/><path d="M3 13h5l1 2h6l1-2h5"/>',
    edit: '<path d="M4 20h4L19 9l-4-4L4 16v4z"/>', trash: '<path d="M4 7h16M9 7V4h6v3M6 7l1 13h10l1-13"/>', up: '<path d="M12 19V5M6 11l6-6 6 6"/>', down: '<path d="M12 5v14M6 13l6 6 6-6"/>',
    plus: '<path d="M12 5v14M5 12h14"/>', close: '<path d="M6 6l12 12M18 6L6 18"/>', menu: '<path d="M4 7h16M4 12h16M4 17h16"/>', image: '<rect x="3" y="4" width="18" height="16" rx="2"/><circle cx="9" cy="10" r="2"/><path d="M21 16l-5-5-9 9"/>',
    text: '<path d="M5 6h14M9 6v12M15 6v12M7 18h4M13 18h4"/>', settings: '<circle cx="12" cy="12" r="3"/><path d="M19 12a7 7 0 00-.1-1.2l2-1.6-2-3.4-2.4 1a7 7 0 00-2-1.2L14 3h-4l-.5 2.6a7 7 0 00-2 1.2l-2.4-1-2 3.4 2 1.6A7 7 0 005 12c0 .4 0 .8.1 1.2l-2 1.6 2 3.4 2.4-1a7 7 0 002 1.2L10 21h4l.5-2.6a7 7 0 002-1.2l2.4 1 2-3.4-2-1.6c.1-.4.1-.8.1-1.2z"/>',
    wa: '<path d="M4 20l1.3-4A8 8 0 1112 20a8 8 0 01-4-1.1L4 20z"/>', ext: '<path d="M14 4h6v6M20 4l-9 9M18 14v6H4V6h6"/>',
  };
  const all = { ...ICONS, ...UI };
  const ic = (n, cls = 'ic') => `<svg class="${cls}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${all[n] || ''}</svg>`;
  const esc = (v) => String(v ?? '').replace(/[&<>"']/g, (m) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[m]));
  const $ = (s, c = document) => c.querySelector(s);
  const $$ = (s, c = document) => [...c.querySelectorAll(s)];
  const fmtDate = (v) => v ? new Date(v).toLocaleString('ar-EG', { dateStyle: 'medium', timeStyle: 'short' }) : '';

  const cfg = window.NOOR_CONFIG || {};
  const configured = cfg.SUPABASE_URL && cfg.SUPABASE_ANON_KEY && !/YOUR_/.test(cfg.SUPABASE_URL + cfg.SUPABASE_ANON_KEY);
  const sb = configured ? window.supabase.createClient(cfg.SUPABASE_URL, cfg.SUPABASE_ANON_KEY) : null;

  /* ---------- toast ---------- */
  function toast(msg, kind = 'ok') {
    const t = document.createElement('div'); t.className = 'toast ' + kind; t.textContent = msg;
    $('#toasts').appendChild(t); setTimeout(() => t.remove(), 3600);
  }
  const fail = (e) => { console.error(e); toast('حصلت مشكلة: ' + (e?.message || e), 'bad'); };
  async function run(p) { const { data, error } = await p; if (error) throw error; return data; }

  /* ---------- modal ---------- */
  function modal(title, bodyHtml, { saveText = 'حفظ', onSave, wide } = {}) {
    const m = document.createElement('div'); m.className = 'modal';
    m.innerHTML = `<div class="modal-box" style="${wide ? 'width:min(980px,100%)' : ''}" role="dialog" aria-modal="true">
      <div class="modal-head"><h3>${esc(title)}</h3><button class="btn btn-icon" data-x aria-label="إغلاق">${ic('close')}</button></div>
      <div class="modal-body">${bodyHtml}</div>
      ${onSave ? `<div class="modal-foot"><button class="btn" data-x>إلغاء</button><button class="btn btn-gold" data-save>${esc(saveText)}</button></div>` : ''}
    </div>`;
    document.body.appendChild(m);
    const close = () => m.remove();
    $$('[data-x]', m).forEach((b) => b.addEventListener('click', close));
    m.addEventListener('mousedown', (e) => { if (e.target === m) close(); });
    const onKey = (e) => { if (e.key === 'Escape') { close(); removeEventListener('keydown', onKey); } };
    addEventListener('keydown', onKey);
    if (onSave) $('[data-save]', m).addEventListener('click', async (e) => {
      const b = e.currentTarget; b.disabled = true;
      try { const r = await onSave(m); if (r !== false) close(); } catch (er) { fail(er); } finally { b.disabled = false; }
    });
    return m;
  }

  /* ---------- field builders ---------- */
  const F = {
    text: (f, v) => `<label class="fld"><span>${esc(f.label)}</span><input name="${f.name}" value="${esc(v)}" ${f.dir ? `dir="${f.dir}"` : ''} ${f.required ? 'required' : ''} placeholder="${esc(f.ph || '')}">${f.help ? `<small>${esc(f.help)}</small>` : ''}</label>`,
    number: (f, v) => `<label class="fld"><span>${esc(f.label)}</span><input name="${f.name}" type="number" value="${esc(v ?? 0)}" dir="ltr"></label>`,
    textarea: (f, v) => `<label class="fld"><span>${esc(f.label)}</span><textarea name="${f.name}" rows="${f.rows || 4}">${esc(v)}</textarea>${f.help ? `<small>${esc(f.help)}</small>` : ''}</label>`,
    lines: (f, v) => `<label class="fld"><span>${esc(f.label)}</span><textarea name="${f.name}" rows="${f.rows || 5}" data-lines>${esc((v || []).join('\n'))}</textarea><small>${esc(f.help || 'كل سطر = عنصر')}</small></label>`,
    paras: (f, v) => `<label class="fld"><span>${esc(f.label)}</span><textarea name="${f.name}" rows="${f.rows || 7}" data-paras>${esc((v || []).join('\n\n'))}</textarea><small>سيب سطر فاضي بين كل فقرة والتانية</small></label>`,
    select: (f, v) => `<label class="fld"><span>${esc(f.label)}</span><select name="${f.name}">${f.options.map(([k, l]) => `<option value="${esc(k)}" ${String(v) === String(k) ? 'selected' : ''}>${esc(l)}</option>`).join('')}</select></label>`,
    bool: (f, v) => `<label class="switch"><input type="checkbox" name="${f.name}" ${v ?? f.def ?? true ? 'checked' : ''}><span>${esc(f.label)}</span></label>`,
    icon: (f, v) => `<div class="fld"><span>${esc(f.label)}</span><input type="hidden" name="${f.name}" value="${esc(v || 'scale')}"><div class="icons" data-icons>${ICON_NAMES.map((n) => `<button type="button" data-ico="${n}" class="${(v || 'scale') === n ? 'on' : ''}" title="${n}">${ic(n)}</button>`).join('')}</div></div>`,
    image: (f, v) => `<div class="fld"><span>${esc(f.label)}</span><div class="imgf"><img src="${esc(v || '')}" alt="" data-prev><div class="col"><input class="inp" name="${f.name}" value="${esc(v)}" dir="ltr" placeholder="رابط الصورة"><span class="btn btn-sm upl">${ic('image')} رفع صورة من الجهاز<input type="file" accept="image/*" data-upload="${f.name}" data-folder="${f.folder || 'misc'}"></span></div></div></div>`,
  };
  const fieldsHtml = (fields, row = {}) => fields.map((f) => (f.row ? `<div class="grid${f.row.length}">${f.row.map((x) => F[x.type || 'text'](x, row[x.name])).join('')}</div>` : F[f.type || 'text'](f, row[f.name]))).join('');
  const flat = (fields) => fields.flatMap((f) => f.row || [f]);

  function wireFields(root) {
    $$('[data-icons]', root).forEach((box) => box.addEventListener('click', (e) => {
      const b = e.target.closest('[data-ico]'); if (!b) return;
      $$('[data-ico]', box).forEach((x) => x.classList.remove('on')); b.classList.add('on');
      box.previousElementSibling.value = b.dataset.ico;
    }));
    $$('.imgf', root).forEach((w) => {
      const inp = $('input[name]', w), prev = $('[data-prev]', w);
      inp.addEventListener('input', () => (prev.src = inp.value));
    });
    $$('[data-upload]', root).forEach((fi) => fi.addEventListener('change', async () => {
      const file = fi.files[0]; if (!file) return;
      const w = fi.closest('.imgf'), inp = $('input[name]', w), prev = $('[data-prev]', w), lbl = fi.parentElement;
      lbl.style.opacity = .5;
      try {
        const ext = (file.name.split('.').pop() || 'jpg').toLowerCase().replace(/[^a-z0-9]/g, '');
        const path = `${fi.dataset.folder}/${Date.now()}-${Math.random().toString(36).slice(2, 7)}.${ext}`;
        await run(sb.storage.from('site-media').upload(path, file, { cacheControl: '31536000', upsert: false }));
        const url = sb.storage.from('site-media').getPublicUrl(path).data.publicUrl;
        inp.value = url; prev.src = url; toast('اترفعت الصورة');
      } catch (e) { fail(e); } finally { lbl.style.opacity = 1; fi.value = ''; }
    }));
  }
  function readFields(root, fields) {
    const out = {};
    flat(fields).forEach((f) => {
      const el = root.querySelector(`[name="${f.name}"]`); if (!el) return;
      let v;
      if (f.type === 'bool') v = el.checked;
      else if (f.type === 'number') v = el.value === '' ? 0 : Number(el.value);
      else if (f.type === 'lines') v = el.value.split('\n').map((x) => x.trim()).filter(Boolean);
      else if (f.type === 'paras') v = el.value.split(/\n\s*\n/).map((x) => x.replace(/\s*\n\s*/g, ' ').trim()).filter(Boolean);
      else v = el.value.trim();
      if (f.type === 'select' && f.numeric) v = Number(v);
      out[f.name] = v;
    });
    return out;
  }
  function requireFields(data, fields) {
    const miss = flat(fields).filter((f) => f.required && !String(data[f.name] ?? '').trim());
    if (miss.length) { toast('اكتب: ' + miss.map((f) => f.label).join('، '), 'bad'); return false; }
    return true;
  }

  /* ---------- generic ordered collections ---------- */
  const STAT_PAGES = [['home', 'الصفحة الرئيسية'], ['about', 'صفحة من نحن']];
  const COLL = {
    process: { title: 'خطوات العمل', hint: 'قسم «كيف نعمل معك» في الرئيسية', table: 'process_steps', item: 'خطوة',
      fields: [{ name: 'title', label: 'العنوان', required: true }, { name: 'body', label: 'الوصف', type: 'textarea', rows: 3 }, { name: 'icon', label: 'الأيقونة', type: 'icon' }] },
    why: { title: 'ما يميزنا', hint: 'قسم «ما يميزنا» في الرئيسية', table: 'features', filter: { section: 'why' }, item: 'ميزة',
      fields: [{ name: 'title', label: 'العنوان', required: true }, { name: 'body', label: 'الوصف', type: 'textarea', rows: 3 }, { name: 'icon', label: 'الأيقونة', type: 'icon' }] },
    about_features: { title: 'مميزات «ليه نور العدل»', hint: 'في صفحة من نحن', table: 'features', filter: { section: 'about_features' }, item: 'ميزة',
      fields: [{ name: 'title', label: 'العنوان', required: true }, { name: 'body', label: 'الوصف', type: 'textarea', rows: 3 }, { name: 'icon', label: 'الأيقونة', type: 'icon' }] },
    principles: { title: 'مبادئنا', hint: 'رسالتنا / رؤيتنا / قيمنا… في صفحة من نحن', table: 'features', filter: { section: 'principles' }, item: 'مبدأ',
      fields: [{ name: 'title', label: 'العنوان', required: true }, { name: 'body', label: 'الوصف', type: 'textarea', rows: 3 }, { name: 'icon', label: 'الأيقونة', type: 'icon' }] },
    stats: { title: 'الأرقام', hint: 'أرقام «أرقامنا» في الرئيسية ومن نحن', table: 'stats', item: 'رقم', groupBy: ['page', STAT_PAGES],
      fields: [{ name: 'page', label: 'الصفحة', type: 'select', options: STAT_PAGES }, { row: [{ name: 'prefix', label: 'قبل الرقم', ph: '+' }, { name: 'value', label: 'الرقم', type: 'number' }, { name: 'suffix', label: 'بعد الرقم', ph: '%' }] }, { name: 'label', label: 'الوصف تحت الرقم', required: true }],
      sub: (r) => `${r.prefix || ''}${r.value}${r.suffix || ''}`, ttl: (r) => r.label },
    testimonials: { title: 'آراء العملاء', table: 'testimonials', item: 'رأي',
      fields: [{ name: 'quote', label: 'الرأي', type: 'textarea', required: true }, { row: [{ name: 'name', label: 'الاسم', required: true }, { name: 'role', label: 'الوظيفة' }] }, { name: 'rating', label: 'عدد النجوم', type: 'select', numeric: true, options: [[5, '★★★★★'], [4, '★★★★'], [3, '★★★']] }, { name: 'is_published', label: 'ظاهر في الموقع', type: 'bool' }],
      ttl: (r) => r.name, sub: (r) => r.quote, on: (r) => r.is_published },
    faqs: { title: 'الأسئلة الشائعة', table: 'faqs', item: 'سؤال',
      fields: [{ name: 'question', label: 'السؤال', required: true }, { name: 'answer', label: 'الإجابة', type: 'textarea', required: true }, { name: 'is_published', label: 'ظاهر في الموقع', type: 'bool' }],
      ttl: (r) => r.question, sub: (r) => r.answer, on: (r) => r.is_published },
  };

  async function collView(key) {
    const view = fresh();
    const C = COLL[key];
    setTitle(C.title, C.hint);
    let q = sb.from(C.table).select('*').order('sort_order');
    Object.entries(C.filter || {}).forEach(([k, v]) => (q = q.eq(k, v)));
    const rows = await run(q);
    const ttl = C.ttl || ((r) => r.title), sub = C.sub || ((r) => r.body);
    const rowHtml = (r, i, arr) => `<div class="row ${C.on && !C.on(r) ? 'off' : ''}" data-id="${r.id}">
      ${r.icon ? `<span class="ricon">${ic(r.icon)}</span>` : ''}
      <div class="grow"><div class="ttl">${esc(ttl(r))}</div><div class="sub">${esc(sub(r) || '')}</div></div>
      <div class="acts">
        <button class="btn btn-icon" data-mv="-1" ${i === 0 ? 'disabled' : ''} title="لفوق">${ic('up')}</button>
        <button class="btn btn-icon" data-mv="1" ${i === arr.length - 1 ? 'disabled' : ''} title="لتحت">${ic('down')}</button>
        <button class="btn btn-icon" data-ed title="تعديل">${ic('edit')}</button>
        <button class="btn btn-icon btn-danger" data-del title="حذف">${ic('trash')}</button>
      </div></div>`;
    let body;
    if (C.groupBy) {
      const [k, opts] = C.groupBy;
      body = opts.map(([v, l]) => { const g = rows.filter((r) => r[k] === v); return `<div class="panel"><h3>${esc(l)}</h3><div class="list">${g.length ? g.map(rowHtml).join('') : '<div class="empty">مفيش عناصر</div>'}</div></div>`; }).join('');
    } else body = `<div class="list">${rows.length ? rows.map(rowHtml).join('') : '<div class="empty">مفيش عناصر لسه</div>'}</div>`;
    view.innerHTML = `<div class="toolbar"><span class="hint">${rows.length} ${esc(C.item)}</span><div class="sp"></div><button class="btn btn-gold" data-add>${ic('plus')} إضافة ${esc(C.item)}</button></div>${body}`;
    const byId = Object.fromEntries(rows.map((r) => [r.id, r]));
    const edit = (r) => {
      const m = modal(r ? `تعديل ${C.item}` : `إضافة ${C.item}`, fieldsHtml(C.fields, r || { ...(C.filter || {}) }), {
        onSave: async (m) => {
          const data = readFields(m, C.fields);
          if (!requireFields(data, C.fields)) return false;
          Object.assign(data, C.filter || {});
          if (r) await run(sb.from(C.table).update(data).eq('id', r.id));
          else { data.sort_order = (rows.reduce((a, x) => Math.max(a, x.sort_order || 0), 0) || 0) + 1; await run(sb.from(C.table).insert(data)); }
          toast('اتحفظ'); collView(key);
        } });
      wireFields(m);
    };
    $('[data-add]', view).addEventListener('click', () => edit(null));
    view.addEventListener('click', async (e) => {
      const rowEl = e.target.closest('.row'); if (!rowEl) return;
      const r = byId[rowEl.dataset.id];
      if (e.target.closest('[data-ed]')) edit(r);
      else if (e.target.closest('[data-del]')) {
        if (!confirm('متأكد إنك عايز تحذف العنصر ده؟')) return;
        try { await run(sb.from(C.table).delete().eq('id', r.id)); toast('اتحذف'); collView(key); } catch (er) { fail(er); }
      } else if (e.target.closest('[data-mv]')) {
        const dir = +e.target.closest('[data-mv]').dataset.mv;
        const list = C.groupBy ? rows.filter((x) => x[C.groupBy[0]] === r[C.groupBy[0]]) : rows;
        const i = list.indexOf(r), j = i + dir; if (j < 0 || j >= list.length) return;
        const o = list[j];
        try {
          const a = r.sort_order, b = o.sort_order === a ? a + dir : o.sort_order;
          await run(sb.from(C.table).update({ sort_order: b }).eq('id', r.id));
          await run(sb.from(C.table).update({ sort_order: a }).eq('id', o.id));
          collView(key);
        } catch (er) { fail(er); }
      }
    }, { once: false });
  }

  /* ---------- settings ---------- */
  const SET_FIELDS = [
    { name: 'company_name', label: 'اسم الشركة', required: true },
    { name: 'logo_url', label: 'اللوجو', type: 'image', folder: 'brand' },
    { row: [{ name: 'phone_display', label: 'رقم التليفون (اللي بيظهر)', dir: 'ltr' }, { name: 'phone_tel', label: 'رقم الاتصال (بكود الدولة)', dir: 'ltr', ph: '+2010…' }] },
    { row: [{ name: 'whatsapp', label: 'رقم الواتساب (أرقام بس)', dir: 'ltr', ph: '2010…' }, { name: 'email', label: 'البريد الإلكتروني', dir: 'ltr' }] },
    { name: 'address', label: 'العنوان', type: 'textarea', rows: 2 },
    { name: 'working_hours', label: 'مواعيد العمل' },
    { row: [{ name: 'facebook_url', label: 'لينك فيسبوك', dir: 'ltr' }, { name: 'instagram_url', label: 'لينك إنستجرام', dir: 'ltr' }] },
    { name: 'footer_about', label: 'نبذة الفوتر', type: 'textarea', rows: 3 },
  ];
  const ABOUT_FIELDS = [
    { name: 'about_image', label: 'صورة «من نحن» في الرئيسية', type: 'image', folder: 'about' },
    { name: 'about_lead', label: 'نبذة «من نحن» في الرئيسية', type: 'textarea', rows: 3 },
    { name: 'about_points', label: 'النقاط (علامات الصح) في الرئيسية', type: 'lines' },
    { name: 'about_story', label: 'فقرات «قصتنا» في صفحة من نحن', type: 'paras' },
    { name: 'about_hook', label: 'الاقتباس في صفحة من نحن', type: 'textarea', rows: 2 },
  ];
  async function settingsView(which) {
    const view = fresh();
    const fields = which === 'about' ? ABOUT_FIELDS : SET_FIELDS;
    setTitle(which === 'about' ? 'محتوى «من نحن»' : 'بيانات الموقع والتواصل', which === 'about' ? '' : 'بتظهر في الهيدر والفوتر وصفحة التواصل');
    const row = (await run(sb.from('site_settings').select('*').eq('id', 1).maybeSingle())) || {};
    view.innerHTML = `<form class="panel" id="setForm" novalidate>${fieldsHtml(fields, row)}<div class="panel-actions"><button class="btn btn-gold" type="submit">حفظ التغييرات</button></div></form>`;
    const f = $('#setForm'); wireFields(f);
    f.addEventListener('submit', async (e) => {
      e.preventDefault(); const data = readFields(f, fields); if (!requireFields(data, fields)) return;
      const b = $('button[type=submit]', f); b.disabled = true;
      try { await run(sb.from('site_settings').upsert({ id: 1, ...row, ...data, updated_at: undefined })); toast('اتحفظ'); } catch (er) { fail(er); } finally { b.disabled = false; }
    });
  }

  /* ---------- hero ---------- */
  async function heroView() {
    const view = fresh();
    setTitle('الهيرو (أول الصفحة)', 'الصورة والجملة والشارات');
    const h = (await run(sb.from('hero').select('*').eq('id', 1).maybeSingle())) || { chips: [] };
    const fields = [
      { name: 'image_url', label: 'صورة الخلفية', type: 'image', folder: 'hero' },
      { name: 'title_line1', label: 'السطر الأول', required: true },
      { name: 'title_line2', label: 'السطر التاني' },
      { name: 'gold_line', label: 'السطر الدهبي', type: 'select', numeric: true, options: [[1, 'السطر الأول دهبي'], [2, 'السطر التاني دهبي']] },
    ];
    view.innerHTML = `<form class="panel" id="heroForm" novalidate>${fieldsHtml(fields, h)}
      <div class="fld"><span>الشارات تحت الأزرار</span><div class="rep" id="chips"></div><button type="button" class="btn btn-sm" id="addChip" style="justify-self:start">${ic('plus')} شارة</button></div>
      <div class="panel-actions"><button class="btn btn-gold" type="submit">حفظ</button></div></form>`;
    const f = $('#heroForm'); wireFields(f);
    const chipRow = (c = { icon: 'shield', text: '' }) => {
      const d = document.createElement('div'); d.className = 'rep-row';
      d.innerHTML = `<select class="inp" style="flex:0 0 130px">${ICON_NAMES.map((n) => `<option ${n === c.icon ? 'selected' : ''}>${n}</option>`).join('')}</select><input class="inp" value="${esc(c.text)}" placeholder="النص"><button type="button" class="btn btn-icon btn-danger">${ic('trash')}</button>`;
      $('button', d).addEventListener('click', () => d.remove()); $('#chips').appendChild(d);
    };
    (h.chips || []).forEach(chipRow);
    $('#addChip').addEventListener('click', () => chipRow());
    f.addEventListener('submit', async (e) => {
      e.preventDefault(); const data = readFields(f, fields); if (!requireFields(data, fields)) return;
      data.chips = $$('#chips .rep-row').map((r) => ({ icon: $('select', r).value, text: $('input', r).value.trim() })).filter((c) => c.text);
      try { await run(sb.from('hero').upsert({ id: 1, ...data })); toast('اتحفظ'); } catch (er) { fail(er); }
    });
  }

  /* ---------- services ---------- */
  async function servicesView() {
    const view = fresh();
    setTitle('الخدمات', 'كل خدمة ليها صفحة بالبنود بتاعتها');
    const rows = await run(sb.from('services').select('*').order('sort_order'));
    view.innerHTML = `<div class="toolbar"><span class="hint">${rows.length} خدمة</span><div class="sp"></div><button class="btn btn-gold" data-add>${ic('plus')} إضافة خدمة</button></div>
      <div class="list">${rows.map((r, i) => `<div class="row ${r.is_active ? '' : 'off'}" data-id="${r.id}">
        <img class="thumb" src="${esc(r.image_url)}" alt="">
        <div class="grow"><div class="ttl">${esc(r.title)}</div><div class="sub">${esc(r.short_desc || '')}</div><div class="meta"><span dir="ltr">/services/${esc(r.slug)}</span>${r.is_active ? '' : '<span class="pill">مخفية</span>'}</div></div>
        <div class="acts">
          <a class="btn btn-icon" href="/services/${esc(r.slug)}" target="_blank" title="فتح">${ic('ext')}</a>
          <button class="btn btn-icon" data-mv="-1" ${i === 0 ? 'disabled' : ''}>${ic('up')}</button>
          <button class="btn btn-icon" data-mv="1" ${i === rows.length - 1 ? 'disabled' : ''}>${ic('down')}</button>
          <button class="btn btn-icon" data-ed>${ic('edit')}</button>
          <button class="btn btn-icon btn-danger" data-del>${ic('trash')}</button>
        </div></div>`).join('') || '<div class="empty">مفيش خدمات</div>'}</div>`;
    const byId = Object.fromEntries(rows.map((r) => [r.id, r]));
    $('[data-add]', view).addEventListener('click', () => serviceEditor(null, rows));
    view.addEventListener('click', async (e) => {
      const el = e.target.closest('.row'); if (!el) return; const r = byId[el.dataset.id];
      if (e.target.closest('[data-ed]')) serviceEditor(r, rows);
      else if (e.target.closest('[data-del]')) {
        if (!confirm(`حذف خدمة «${r.title}» وكل بنودها؟`)) return;
        try { await run(sb.from('services').delete().eq('id', r.id)); toast('اتحذفت'); servicesView(); } catch (er) { fail(er); }
      } else if (e.target.closest('[data-mv]')) {
        const dir = +e.target.closest('[data-mv]').dataset.mv, i = rows.indexOf(r), o = rows[i + dir]; if (!o) return;
        try { const a = r.sort_order, b = o.sort_order === a ? a + dir : o.sort_order; await run(sb.from('services').update({ sort_order: b }).eq('id', r.id)); await run(sb.from('services').update({ sort_order: a }).eq('id', o.id)); servicesView(); } catch (er) { fail(er); }
      }
    });
  }
  async function serviceEditor(s, rows) {
    let groups = [];
    if (s) {
      const g = await run(sb.from('service_groups').select('*').eq('service_id', s.id).order('sort_order'));
      const it = g.length ? await run(sb.from('service_items').select('*').in('group_id', g.map((x) => x.id)).order('sort_order')) : [];
      groups = g.map((x) => ({ title: x.title, items: it.filter((i) => i.group_id === x.id).map((i) => i.title) }));
    }
    const fields = [
      { row: [{ name: 'title', label: 'اسم الخدمة', required: true }, { name: 'slug', label: 'رابط الصفحة (إنجليزي)', dir: 'ltr', required: true, ph: 'family-law', help: 'حروف إنجليزي صغيرة وشرطة بس' }] },
      { name: 'short_desc', label: 'وصف قصير (في الكارت)' },
      { name: 'overview', label: 'نظرة عامة (في صفحة الخدمة)', type: 'textarea', rows: 4 },
      { name: 'image_url', label: 'صورة الخدمة', type: 'image', folder: 'services' },
      { name: 'icon', label: 'الأيقونة', type: 'icon' },
      { name: 'is_active', label: 'ظاهرة في الموقع', type: 'bool' },
    ];
    const m = modal(s ? `تعديل: ${s.title}` : 'خدمة جديدة', `${fieldsHtml(fields, s || {})}
      <div class="fld"><span>بنود الخدمة (مجموعات)</span><div class="rep" id="grps"></div><button type="button" class="btn btn-sm" id="addGrp" style="justify-self:start">${ic('plus')} مجموعة بنود</button></div>`, {
      wide: true, saveText: 'حفظ الخدمة',
      onSave: async (m) => {
        const data = readFields(m, fields);
        if (!requireFields(data, fields)) return false;
        data.slug = data.slug.toLowerCase().replace(/[^a-z0-9-]+/g, '-').replace(/^-+|-+$/g, '');
        if (!data.slug) { toast('اكتب رابط الصفحة بالإنجليزي', 'bad'); return false; }
        const gs = $$('#grps .grp', m).map((g) => ({ title: $('.grp-head input', g).value.trim(), items: $('textarea', g).value.split('\n').map((x) => x.trim()).filter(Boolean) })).filter((g) => g.title || g.items.length);
        let id = s?.id;
        if (s) await run(sb.from('services').update(data).eq('id', id));
        else { data.sort_order = rows.reduce((a, x) => Math.max(a, x.sort_order || 0), 0) + 1; id = (await run(sb.from('services').insert(data).select('id').single())).id; }
        await run(sb.from('service_groups').delete().eq('service_id', id));
        for (let gi = 0; gi < gs.length; gi++) {
          const g = await run(sb.from('service_groups').insert({ service_id: id, title: gs[gi].title || 'البنود', sort_order: gi + 1 }).select('id').single());
          if (gs[gi].items.length) await run(sb.from('service_items').insert(gs[gi].items.map((t, ii) => ({ group_id: g.id, title: t, sort_order: ii + 1 }))));
        }
        toast('اتحفظت الخدمة'); servicesView();
      } });
    wireFields(m);
    const addGrp = (g = { title: '', items: [] }) => {
      const d = document.createElement('div'); d.className = 'grp';
      d.innerHTML = `<div class="grp-head"><input class="inp" value="${esc(g.title)}" placeholder="اسم المجموعة (مثلاً: أبرز الدعاوى)"><button type="button" class="btn btn-icon btn-danger" title="حذف المجموعة">${ic('trash')}</button></div><textarea class="inp" rows="${Math.max(4, g.items.length + 1)}" placeholder="كل بند في سطر">${esc(g.items.join('\n'))}</textarea><small class="hint">كل بند في سطر لوحده</small>`;
      $('.grp-head button', d).addEventListener('click', () => { if (confirm('حذف المجموعة دي؟')) d.remove(); });
      $('#grps', m).appendChild(d);
    };
    (groups.length ? groups : [{ title: 'أبرز الدعاوى', items: [] }]).forEach(addGrp);
    $('#addGrp', m).addEventListener('click', () => addGrp());
    const t = $('[name=title]', m), sl = $('[name=slug]', m);
    if (!s) t.addEventListener('input', () => { if (!sl.dataset.touched) sl.value = ''; });
    sl.addEventListener('input', () => (sl.dataset.touched = 1));
  }

  /* ---------- texts ---------- */
  async function textsView() {
    const view = fresh();
    setTitle('نصوص الموقع', 'عناوين وأوصاف كل الأقسام — الكلام بين [ ] بيظهر دهبي');
    const rows = await run(sb.from('site_texts').select('*').order('key'));
    const pages = [...new Set(rows.map((r) => r.page || 'أخرى'))];
    view.innerHTML = `<div class="toolbar"><input class="inp" id="txq" placeholder="دوّر على نص…" style="max-width:320px"><div class="sp"></div><button class="btn btn-gold" id="txSave" disabled>حفظ التغييرات</button></div>
      ${pages.map((p) => `<div class="panel texts-page"><h4>${esc(p)}</h4>${rows.filter((r) => (r.page || 'أخرى') === p).map((r) => `<div class="tx" data-k="${esc(r.key)}"><span class="hint">${esc(r.label || r.key)}</span>${(r.value || '').length > 70 ? `<textarea class="inp" rows="2">${esc(r.value)}</textarea>` : `<input class="inp" value="${esc(r.value)}">`}</div>`).join('')}</div>`).join('')}`;
    const orig = Object.fromEntries(rows.map((r) => [r.key, r.value]));
    const save = $('#txSave');
    view.addEventListener('input', (e) => {
      const tx = e.target.closest('.tx');
      if (tx) { tx.classList.toggle('dirty', e.target.value !== orig[tx.dataset.k]); save.disabled = !$$('.tx.dirty').length; }
      if (e.target.id === 'txq') { const q = e.target.value.trim(); $$('.tx').forEach((x) => (x.hidden = q && !x.textContent.includes(q) && !$('.inp', x).value.includes(q))); }
    });
    save.addEventListener('click', async () => {
      const ch = $$('.tx.dirty').map((x) => ({ key: x.dataset.k, value: $('.inp', x).value }));
      save.disabled = true;
      try { for (const c of ch) await run(sb.from('site_texts').update({ value: c.value }).eq('key', c.key)); ch.forEach((c) => (orig[c.key] = c.value)); $$('.tx.dirty').forEach((x) => x.classList.remove('dirty')); toast(`اتحفظ ${ch.length} نص`); }
      catch (er) { fail(er); save.disabled = false; }
    });
  }

  /* ---------- messages ---------- */
  const MSG_ST = [['new', 'جديدة'], ['contacted', 'تم التواصل'], ['closed', 'مقفولة']];
  const REQ_ST = [['new', 'جديد'], ['reviewing', 'قيد المراجعة'], ['offers_sent', 'اتبعتت عروض'], ['accepted', 'اتقبل عرض'], ['closed', 'مقفول'], ['rejected', 'مرفوض']];
  const OFF_ST = [['pending', 'مسودة (مش ظاهر للعميل)'], ['sent', 'اتبعت للعميل'], ['accepted', 'العميل قبله'], ['rejected', 'مرفوض']];
  const lbl = (arr, k) => (arr.find((x) => x[0] === k) || [k, k])[1];
  const waLink = (p) => 'https://wa.me/' + String(p || '').replace(/\D/g, '').replace(/^0/, '20');

  async function messagesView(filter = 'all') {
    const view = fresh();
    setTitle('رسائل التواصل', 'اللي جاية من نموذج «أرسل لنا رسالة»');
    let q = sb.from('contact_messages').select('*').order('created_at', { ascending: false }).limit(500);
    if (filter !== 'all') q = q.eq('status', filter);
    const rows = await run(q);
    view.innerHTML = `<div class="toolbar">${[['all', 'الكل'], ...MSG_ST].map(([k, l]) => `<button class="btn btn-sm ${k === filter ? 'btn-gold' : ''}" data-f="${k}">${l}</button>`).join('')}</div>
      <div class="list">${rows.map((r) => `<div class="row" data-id="${r.id}"><div class="grow"><div class="ttl">${esc(r.full_name)} <span class="pill ${r.status}">${lbl(MSG_ST, r.status)}</span></div><div class="sub">${esc(r.topic || '')}${r.details ? ' — ' + esc(r.details) : ''}</div><div class="meta"><span dir="ltr">${esc(r.phone)}</span><span>${fmtDate(r.created_at)}</span></div></div><div class="acts"><a class="btn btn-icon" href="${waLink(r.phone)}" target="_blank" title="واتساب">${ic('wa')}</a><button class="btn btn-sm" data-ed>فتح</button></div></div>`).join('') || '<div class="empty">مفيش رسائل</div>'}</div>`;
    $$('[data-f]', view).forEach((b) => b.addEventListener('click', () => messagesView(b.dataset.f)));
    const byId = Object.fromEntries(rows.map((r) => [r.id, r]));
    $$('[data-ed]', view).forEach((b) => b.addEventListener('click', () => {
      const r = byId[b.closest('.row').dataset.id];
      const m = modal('رسالة من ' + r.full_name, `
        <div class="grid2"><div class="fld"><span>الاسم</span><div>${esc(r.full_name)}</div></div><div class="fld"><span>التليفون</span><div dir="ltr" style="text-align:right"><a href="tel:${esc(r.phone)}">${esc(r.phone)}</a> · <a href="${waLink(r.phone)}" target="_blank">واتساب</a></div></div></div>
        <div class="grid2"><div class="fld"><span>البريد</span><div dir="ltr" style="text-align:right">${esc(r.email || '—')}</div></div><div class="fld"><span>الموضوع</span><div>${esc(r.topic || '—')}</div></div></div>
        <div class="fld"><span>التفاصيل</span><div style="white-space:pre-wrap">${esc(r.details || '—')}</div></div>
        <div class="hint">${fmtDate(r.created_at)}</div>
        ${F.select({ name: 'status', label: 'الحالة', options: MSG_ST }, r.status)}
        ${F.textarea({ name: 'admin_notes', label: 'ملاحظات داخلية', rows: 3 }, r.admin_notes)}
        <button type="button" class="btn btn-sm btn-danger" data-delmsg style="justify-self:start">${ic('trash')} حذف الرسالة</button>`, {
        onSave: async (m) => { await run(sb.from('contact_messages').update({ status: $('[name=status]', m).value, admin_notes: $('[name=admin_notes]', m).value.trim() || null }).eq('id', r.id)); toast('اتحفظ'); refreshBadges(); messagesView(filter); } });
      $('[data-delmsg]', m).addEventListener('click', async () => { if (!confirm('حذف الرسالة نهائيًا؟')) return; try { await run(sb.from('contact_messages').delete().eq('id', r.id)); m.remove(); toast('اتحذفت'); refreshBadges(); messagesView(filter); } catch (er) { fail(er); } });
    }));
  }

  /* ---------- legal requests + offers ---------- */
  async function requestsView(filter = 'all') {
    const view = fresh();
    setTitle('الطلبات القانونية', '«اطرح طلبك القانوني» والعروض اللي بتتبعت عليها');
    let q = sb.from('legal_requests').select('*, services(title), offers(count)').order('created_at', { ascending: false }).limit(500);
    if (filter !== 'all') q = q.eq('status', filter);
    const rows = await run(q);
    view.innerHTML = `<div class="toolbar">${[['all', 'الكل'], ...REQ_ST].map(([k, l]) => `<button class="btn btn-sm ${k === filter ? 'btn-gold' : ''}" data-f="${k}">${l}</button>`).join('')}</div>
      <div class="list">${rows.map((r) => `<div class="row" data-id="${r.id}"><div class="grow"><div class="ttl">${esc(r.title)} <span class="pill ${r.status}">${lbl(REQ_ST, r.status)}</span></div><div class="sub">${esc(r.description)}</div><div class="meta"><span>${esc(r.full_name)}</span><span dir="ltr">${esc(r.phone)}</span><span>كود: <b dir="ltr">${esc(r.ref_code)}</b></span>${r.services ? `<span>${esc(r.services.title)}</span>` : ''}<span>${r.offers?.[0]?.count || 0} عرض</span><span>${fmtDate(r.created_at)}</span></div></div><div class="acts"><button class="btn btn-sm" data-ed>فتح</button></div></div>`).join('') || '<div class="empty">مفيش طلبات لسه</div>'}</div>`;
    $$('[data-f]', view).forEach((b) => b.addEventListener('click', () => requestsView(b.dataset.f)));
    const byId = Object.fromEntries(rows.map((r) => [r.id, r]));
    $$('[data-ed]', view).forEach((b) => b.addEventListener('click', () => requestEditor(byId[b.closest('.row').dataset.id], filter)));
  }
  async function requestEditor(r, filter) {
    const offers = await run(sb.from('offers').select('*').eq('request_id', r.id).order('created_at'));
    const m = modal(`طلب ${r.ref_code}`, `
      <div class="panel" style="margin:0"><h3>${esc(r.title)}</h3><div style="white-space:pre-wrap">${esc(r.description)}</div>
      <div class="meta" style="margin-top:10px"><span>${esc(r.full_name)}</span><a dir="ltr" href="tel:${esc(r.phone)}">${esc(r.phone)}</a><a href="${waLink(r.phone)}" target="_blank">واتساب</a>${r.email ? `<span dir="ltr">${esc(r.email)}</span>` : ''}${r.city ? `<span>${esc(r.city)}</span>` : ''}${r.budget_range ? `<span>الميزانية: ${esc(r.budget_range)}</span>` : ''}${r.services ? `<span>${esc(r.services.title)}</span>` : ''}<span>${fmtDate(r.created_at)}</span></div></div>
      <div class="grid2">${F.select({ name: 'status', label: 'حالة الطلب', options: REQ_ST }, r.status)}<div class="fld"><span>كود المتابعة للعميل</span><div dir="ltr" style="text-align:right;font-weight:700;font-size:18px;color:var(--gold-2)">${esc(r.ref_code)}</div></div></div>
      ${F.textarea({ name: 'admin_notes', label: 'ملاحظات داخلية', rows: 2 }, r.admin_notes)}
      <div class="fld"><span>عروض المحامين (العميل بيشوف العروض اللي حالتها «اتبعت» بس)</span><div class="list" id="offs"></div><button type="button" class="btn btn-sm" id="addOff" style="justify-self:start">${ic('plus')} عرض جديد</button></div>
      <button type="button" class="btn btn-sm btn-danger" data-delreq style="justify-self:start">${ic('trash')} حذف الطلب</button>`, {
      wide: true,
      onSave: async (m) => {
        await run(sb.from('legal_requests').update({ status: $('[name=status]', m).value, admin_notes: $('[name=admin_notes]', m).value.trim() || null }).eq('id', r.id));
        toast('اتحفظ'); refreshBadges(); requestsView(filter);
      } });
    const OF = [{ row: [{ name: 'lawyer_name', label: 'اسم المحامي', required: true }, { name: 'lawyer_title', label: 'الصفة / التخصص' }] }, { row: [{ name: 'fee', label: 'الأتعاب', type: 'number' }, { name: 'currency', label: 'العملة', type: 'select', options: [['EGP', 'جنيه'], ['USD', 'دولار'], ['SAR', 'ريال']] }, { name: 'duration', label: 'المدة المتوقعة' }] }, { name: 'details', label: 'تفاصيل العرض', type: 'textarea', rows: 3 }, { name: 'status', label: 'الحالة', type: 'select', options: OFF_ST }];
    const draw = (list) => {
      $('#offs', m).innerHTML = list.map((o) => `<div class="row" data-oid="${o.id}"><div class="grow"><div class="ttl">${esc(o.lawyer_name)} <span class="pill ${o.status}">${lbl(OFF_ST, o.status)}</span></div><div class="sub">${o.fee != null ? esc(o.fee) + ' ' + esc(o.currency) : ''}${o.duration ? ' · ' + esc(o.duration) : ''}${o.details ? ' — ' + esc(o.details) : ''}</div></div><div class="acts"><button type="button" class="btn btn-icon" data-oed>${ic('edit')}</button><button type="button" class="btn btn-icon btn-danger" data-odel>${ic('trash')}</button></div></div>`).join('') || '<div class="empty">مفيش عروض</div>';
    };
    draw(offers);
    const reload = async () => draw(await run(sb.from('offers').select('*').eq('request_id', r.id).order('created_at')));
    const editOffer = (o) => {
      const mm = modal(o ? 'تعديل العرض' : 'عرض جديد', fieldsHtml(OF, o || { currency: 'EGP', status: 'pending' }), {
        onSave: async (mm) => {
          const data = readFields(mm, OF); if (!requireFields(data, OF)) return false;
          if (!data.fee) data.fee = null;
          if (o) await run(sb.from('offers').update(data).eq('id', o.id)); else await run(sb.from('offers').insert({ ...data, request_id: r.id }));
          toast('اتحفظ العرض'); reload();
        } });
      wireFields(mm);
    };
    $('#addOff', m).addEventListener('click', () => editOffer(null));
    $('#offs', m).addEventListener('click', async (e) => {
      const el = e.target.closest('[data-oid]'); if (!el) return;
      const o = (await run(sb.from('offers').select('*').eq('id', el.dataset.oid).single()));
      if (e.target.closest('[data-oed]')) editOffer(o);
      else if (e.target.closest('[data-odel]') && confirm('حذف العرض؟')) { try { await run(sb.from('offers').delete().eq('id', o.id)); reload(); } catch (er) { fail(er); } }
    });
    $('[data-delreq]', m).addEventListener('click', async () => { if (!confirm('حذف الطلب وكل عروضه نهائيًا؟')) return; try { await run(sb.from('legal_requests').delete().eq('id', r.id)); m.remove(); toast('اتحذف'); refreshBadges(); requestsView(filter); } catch (er) { fail(er); } });
  }

  /* ---------- admins ---------- */
  async function adminsView() {
    const view = fresh();
    setTitle('الأدمنز', 'اللي ليهم صلاحية دخول لوحة التحكم');
    const rows = await run(sb.from('admins').select('*').order('created_at'));
    view.innerHTML = `<div class="panel"><h3>إضافة أدمن</h3><p class="hint" style="margin:-6px 0 12px">اعمل الحساب الأول من Supabase → Authentication → Users → Add user، وبعدين اكتب الإيميل هنا.</p>
      <form class="grid3" id="addAdm" style="align-items:end"><label class="fld"><span>الإيميل</span><input name="email" type="email" dir="ltr" required></label><label class="fld"><span>الاسم</span><input name="name"></label><button class="btn btn-gold" type="submit">${ic('plus')} إضافة</button></form></div>
      <div class="list">${rows.map((a) => `<div class="row" data-id="${a.user_id}"><div class="grow"><div class="ttl">${esc(a.full_name || a.email)}</div><div class="meta"><span dir="ltr">${esc(a.email)}</span><span>${fmtDate(a.created_at)}</span>${a.user_id === me.id ? '<span class="pill accepted">إنت</span>' : ''}</div></div><div class="acts">${a.user_id === me.id ? '' : `<button class="btn btn-sm btn-danger" data-rm>إزالة</button>`}</div></div>`).join('')}</div>`;
    $('#addAdm').addEventListener('submit', async (e) => {
      e.preventDefault(); const f = e.target;
      try { const r = await run(sb.rpc('add_admin_by_email', { p_email: f.email.value, p_name: f.name.value || null }));
        if (r === 'not_found') toast('الإيميل ده ملوش حساب في Authentication لسه', 'bad'); else { toast('اتضاف'); adminsView(); } } catch (er) { fail(er); }
    });
    $$('[data-rm]', view).forEach((b) => b.addEventListener('click', async () => { if (!confirm('إزالة الأدمن ده؟')) return; try { await run(sb.from('admins').delete().eq('user_id', b.closest('.row').dataset.id)); adminsView(); } catch (er) { fail(er); } }));
  }

  /* ---------- dashboard ---------- */
  async function dashView() {
    const view = fresh();
    setTitle('الرئيسية', '');
    const c = (await run(sb.rpc('dashboard_counts'))) || {};
    const day = new Date(); day.setHours(0, 0, 0, 0); const since = day.toISOString();
    const cnt = async (t) => { const { count, error } = await sb.from(t).select('id', { count: 'exact', head: true }).gte('created_at', since); if (error) throw error; return count || 0; };
    const [todayMsgs, todayReqs] = await Promise.all([cnt('contact_messages'), cnt('legal_requests')]);
    const [msgs, reqs] = await Promise.all([
      run(sb.from('contact_messages').select('*').order('created_at', { ascending: false }).limit(5)),
      run(sb.from('legal_requests').select('*').order('created_at', { ascending: false }).limit(5)),
    ]);
    view.innerHTML = `<div class="cards">
      <div class="kpi" data-go="messages"><b>${c.messages_new || 0}</b><span>رسائل جديدة (من ${c.messages || 0})</span></div>
      <div class="kpi" data-go="requests"><b>${c.requests_new || 0}</b><span>طلبات جديدة (من ${c.requests || 0})</span></div>
      <div class="kpi" data-go="messages"><b>${todayMsgs}</b><span>رسائل النهارده</span></div>
      <div class="kpi" data-go="requests"><b>${todayReqs}</b><span>طلبات النهارده</span></div></div>
      <div class="panel"><h3>آخر الرسائل</h3><div class="list">${msgs.map((r) => `<div class="row"><div class="grow"><div class="ttl">${esc(r.full_name)} <span class="pill ${r.status}">${lbl(MSG_ST, r.status)}</span></div><div class="sub">${esc(r.topic || '')}</div><div class="meta">${fmtDate(r.created_at)}</div></div></div>`).join('') || '<div class="empty">مفيش</div>'}</div></div>
      `;
    $$('[data-go]', view).forEach((k) => k.addEventListener('click', () => go(k.dataset.go)));
  }

  /* ---------- navigation ---------- */
  const NAV = [
    ['عام', [['dash', 'الرئيسية', 'home', dashView], ['messages', 'رسائل التواصل', 'inbox', () => messagesView(), 'msg'], ['requests', 'الطلبات القانونية', 'doc', () => requestsView(), 'req']]],
    ['محتوى الموقع', [['settings', 'بيانات الموقع والتواصل', 'settings', () => settingsView('main')], ['hero', 'الهيرو', 'image', heroView], ['texts', 'نصوص وعناوين الأقسام', 'text', textsView], ['services', 'الخدمات', 'scale', servicesView], ['process', 'خطوات العمل', 'map', () => collView('process')], ['why', 'ما يميزنا', 'award', () => collView('why')], ['stats', 'الأرقام', 'chart', () => collView('stats')], ['testimonials', 'آراء العملاء', 'quote', () => collView('testimonials')], ['faqs', 'الأسئلة الشائعة', 'search', () => collView('faqs')]]],
    ['صفحة من نحن', [['about', 'محتوى من نحن', 'users', () => settingsView('about')], ['about_features', 'المميزات', 'gem', () => collView('about_features')], ['principles', 'مبادئنا', 'target', () => collView('principles')]]],
    ['الإدارة', [['admins', 'الأدمنز', 'shield', adminsView]]],
  ];
  const ROUTES = Object.fromEntries(NAV.flatMap(([, items]) => items.map((x) => [x[0], x])));
  let me = null;
  function fresh() { const old = $('#view'); const n = old.cloneNode(false); n.innerHTML = '<div class="spin"></div>'; old.replaceWith(n); return n; }
  function setTitle(t, h) { $('#vTitle').textContent = t; $('#vHint').textContent = h || ''; document.title = t + ' | لوحة تحكم نور العدل'; }
  function go(key) {
    if (!ROUTES[key]) key = 'dash';
    $$('.nav-btn').forEach((b) => b.classList.toggle('on', b.dataset.k === key));
    $('#side').classList.remove('open');
    if (location.hash !== '#' + key) history.replaceState(null, '', '#' + key);
    Promise.resolve(ROUTES[key][3]()).catch(fail);
    scrollTo(0, 0);
  }

  function buildNav() {
    $('#nav').innerHTML = NAV.map(([h, items]) => `<div class="nav-group"><h6>${esc(h)}</h6>${items.map(([k, l, i, , b]) => `<button class="nav-btn" data-k="${k}">${ic(i)}<span>${esc(l)}</span>${b ? `<span class="badge zero" data-badge="${b}">0</span>` : ''}</button>`).join('')}</div>`).join('');
    $$('.nav-btn').forEach((b) => b.addEventListener('click', () => go(b.dataset.k)));
    $('#burger').innerHTML = ic('menu');
    $('#burger').addEventListener('click', () => $('#side').classList.toggle('open'));
  }
  async function refreshBadges() {
    try { const c = await run(sb.rpc('dashboard_counts')) || {};
      [['msg', c.messages_new], ['req', c.requests_new]].forEach(([k, n]) => { const b = $(`[data-badge="${k}"]`); if (b) { b.textContent = n || 0; b.classList.toggle('zero', !n); } });
    } catch (e) { /* ignore */ }
  }

  /* ---------- auth ---------- */
  async function showApp(user) {
    const ok = await run(sb.rpc('is_admin'));
    if (!ok) { await sb.auth.signOut(); showLogin('الحساب ده مش أدمن. لازم يتضاف في جدول الأدمنز الأول.'); return; }
    me = user;
    $('#loginView').hidden = true; $('#appView').hidden = false;
    $('#who').textContent = user.email;
    try { const s = await run(sb.from('site_settings').select('logo_url').eq('id', 1).maybeSingle()); if (s?.logo_url) $$('[data-logo]').forEach((i) => (i.src = s.logo_url)); } catch (e) { /* */ }
    buildNav(); refreshBadges(); setInterval(refreshBadges, 60000);
    go(location.hash.slice(1) || 'dash');
  }
  function showLogin(err) {
    $('#appView').hidden = true; $('#loginView').hidden = false;
    $('#lErr').hidden = !err; $('#lErr').textContent = err || '';
  }

  $('#loginForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    if (!sb) return;
    const b = $('#lBtn'); b.disabled = true; $('#lErr').hidden = true;
    const { data, error } = await sb.auth.signInWithPassword({ email: $('#lEmail').value.trim(), password: $('#lPass').value });
    b.disabled = false;
    if (error) { showLogin(error.message === 'Invalid login credentials' ? 'الإيميل أو كلمة المرور غلط.' : error.message); return; }
    showApp(data.user).catch(fail);
  });
  $('#logout').addEventListener('click', async () => { await sb.auth.signOut(); location.hash = ''; showLogin(); });

  (async () => {
    if (!sb) { showLogin(); $('#cfgMsg').hidden = false; $('#lBtn').disabled = true; return; }
    const { data } = await sb.auth.getSession();
    if (data.session) showApp(data.session.user).catch((e) => { fail(e); showLogin(); });
    else showLogin();
  })();
})();

/* Silberzirkel – Oberfläche, Teil 1: Navigation, Schloss-Ansicht, Modulblatt, Schriftrolle. */
(function (g) {
  'use strict';
  var SZ = g.SZ, T = SZ.T, esc = SZ.esc, doc = g.document;
  var UI = SZ.UI = { screens: {}, after: {}, act: {} };
  var app, sheetEl, toastEl, stack = [], toastTimer = null;
  function $(sel, root) { return (root || doc).querySelector(sel); }
  function $$(sel, root) { return Array.prototype.slice.call((root || doc).querySelectorAll(sel)); }
  UI.$ = $; UI.$$ = $$;

  /* ---------- Navigation ---------- */
  UI.go = function (name, p, replace) {
    if (replace) stack.pop();
    stack.push({ name: name, p: p || {} });
    render();
  };
  UI.home = function (tab) { stack = [{ name: 'home', p: { tab: tab || 'schloss' } }]; render(); };
  UI.back = function () {
    if (stack.length > 1) { stack.pop(); render(); return true; }
    return false;
  };
  UI.top = function () { return stack[stack.length - 1]; };
  /* oberste Bildschirme mit diesen Namen vom Stapel nehmen (ohne neu zu zeichnen) */
  UI.dropTop = function (names) { while (stack.length > 1 && names.indexOf(UI.top().name) >= 0) stack.pop(); };
  UI.refresh = function () { render(true); };
  function render(keepScroll) {
    var top = UI.top(), y = keepScroll ? g.pageYOffset : 0;
    if (SZ.Klang && SZ.Klang.playing && top.name !== 'klang') SZ.Klang.stop();
    app.innerHTML = UI.screens[top.name](top.p);
    g.scrollTo(0, y);
    if (UI.after[top.name]) UI.after[top.name](top.p, keepScroll);
  }
  UI.sheet = function (html) {
    sheetEl.innerHTML = '<div class="dim" data-act="closeSheet"></div><div class="panel">' + html + '</div>';
    sheetEl.className = 'open';
  };
  UI.closeSheet = function () { sheetEl.className = ''; sheetEl.innerHTML = ''; };
  UI.sheetOpen = function () { return sheetEl.className === 'open'; };
  UI.toast = function (text) {
    toastEl.innerHTML = '<div>' + text + '</div>';
    clearTimeout(toastTimer);
    toastTimer = setTimeout(function () { toastEl.innerHTML = ''; }, 2600);
  };
  /* Funkenregen an einer Stelle des Bildschirms */
  UI.sparks = function (x, y, n) {
    for (var i = 0; i < (n || 9); i++) {
      var s = doc.createElement('div'), a = Math.random() * 6.283, d = 40 + Math.random() * 70;
      s.className = 'spark';
      s.textContent = '✦';
      s.style.left = x + 'px'; s.style.top = y + 'px';
      s.style.setProperty('--dx', Math.cos(a) * d + 'px');
      s.style.setProperty('--dy', Math.sin(a) * d - 30 + 'px');
      doc.body.appendChild(s);
      setTimeout((function (el) { return function () { if (el.parentNode) el.parentNode.removeChild(el); }; })(s), 1000);
    }
  };

  /* ---------- kleine Bilder ---------- */
  UI.emblem = function (id) {                         // Zeichen der vier Zirkel
    var p = {
      spirale: '<path d="M16 16 m0 0 a2 2 0 1 1 3 2 a5 5 0 1 1 -7 -4 a9 9 0 1 1 12 8 a12 12 0 0 1 -18 -2" fill="none" stroke="#fff" stroke-width="2.2" stroke-linecap="round"/>',
      rosette: '<g fill="none" stroke="#fff" stroke-width="1.8"><circle cx="16" cy="16" r="5"/><circle cx="16" cy="9" r="5"/><circle cx="22" cy="12.5" r="5"/><circle cx="22" cy="19.5" r="5"/><circle cx="16" cy="23" r="5"/><circle cx="10" cy="19.5" r="5"/><circle cx="10" cy="12.5" r="5"/></g>',
      echo: '<g fill="none" stroke="#fff" stroke-width="2.2" stroke-linecap="round"><path d="M7 16 q3 -9 6 0 t6 0 t6 0"/><path d="M5 23 h22" opacity=".5"/><path d="M5 9 h22" opacity=".5"/></g>',
      polarstern: '<path d="M16 3 L18.6 13.4 L29 16 L18.6 18.6 L16 29 L13.4 18.6 L3 16 L13.4 13.4 Z" fill="#fff"/>'
    };
    return '<svg viewBox="0 0 32 32">' + (p[id] || p.polarstern) + '</svg>';
  };
  UI.ravenSvg = '<svg class="bird" viewBox="0 0 64 64"><ellipse cx="30" cy="40" rx="17" ry="14" fill="#15122e" stroke="#8d86c9" stroke-width="1.5"/><path d="M14 44 L3 56 L20 50 Z" fill="#15122e" stroke="#8d86c9" stroke-width="1.5" stroke-linejoin="round"/><circle cx="42" cy="24" r="11" fill="#15122e" stroke="#8d86c9" stroke-width="1.5"/><path d="M51 22 L63 26 L51 30 Z" fill="#f2c14e"/><circle cx="45" cy="22" r="2.6" fill="#f2c14e"/><circle cx="45.6" cy="21.4" r="1" fill="#15122e"/><path d="M22 36 q9 4 16 -2" fill="none" stroke="#8d86c9" stroke-width="1.5" stroke-linecap="round"/><path d="M27 54 v6 M34 54 v6" stroke="#f2c14e" stroke-width="2" stroke-linecap="round"/></svg>';
  UI.logoSvg = '<svg class="logo" viewBox="0 0 108 108"><defs><radialGradient id="lg" cx="50%" cy="40%" r="60%"><stop offset="0" stop-color="#3b2f86"/><stop offset="1" stop-color="#14122b"/></radialGradient></defs><circle cx="54" cy="54" r="52" fill="url(#lg)" stroke="#f2c14e" stroke-width="1.5"/><path d="M30 78 A26 26 0 0 0 78 78" fill="none" stroke="#f2c14e" stroke-width="3.4" stroke-linecap="round"/><path d="M54 34 L36 78 M54 34 L72 78" stroke="#e8ecf8" stroke-width="4.4" stroke-linecap="round"/><path d="M54 16 L57.4 25.8 L67.7 26 L59.5 32.3 L62.5 42.2 L54 36.3 L45.5 42.2 L48.5 32.3 L40.3 26 L50.6 25.8 Z" fill="#f2c14e"/><circle cx="22" cy="34" r="1.4" fill="#fff"/><circle cx="86" cy="30" r="1.1" fill="#fff"/><circle cx="90" cy="62" r="1.5" fill="#fff"/><circle cx="18" cy="64" r="1" fill="#fff"/></svg>';
  UI.starsHtml = function (n, cls) {
    return '<span class="' + (cls || 'st') + '">' + (n ? '<b>' + '★★★'.slice(0, n) + '</b>' : '') + '★★★'.slice(n) + '</span>';
  };
  UI.modLabel = function (id) { var m = SZ.MOD[id]; return 'Kl. ' + (m.k === 11 ? '11/12' : m.k) + ' · ' + m.name; };

  /* ---------- Kopf und Reiter ---------- */
  function header() {
    var S = SZ.S, r = SZ.rank(S.xp), next = SZ.RANKS[r + 1], cur = SZ.RANKS[r];
    var pct = next ? Math.round((S.xp - cur.xp) / (next.xp - cur.xp) * 100) : 100;
    return '<div class="top"><button class="crest" data-act="tab" data-tab="buch">' + UI.emblem(S.zirkel) + '</button>' +
      '<div class="who grow"><b>' + esc(S.name || 'Novizin') + '</b><br><span>' + SZ.rankName(r) + '</span><div class="xpbar"><i style="width:' + pct + '%"></i></div></div>' +
      '<div class="stat" data-act="tab" data-tab="schatz"><i>✦</i>' + S.dust + '</div>' +
      '<div class="stat"><i>🔥</i>' + (S.daily.last === SZ.today() || dayGap() === 1 ? S.daily.streak : 0) + '</div></div>';
  }
  function dayGap() {                                 // Tage seit der letzten Rabenpost
    var l = SZ.S.daily.last;
    if (!l) return 99;
    var p = l.split('-'), d = new Date(+p[0], +p[1] - 1, +p[2]), n = new Date();
    return Math.round((new Date(n.getFullYear(), n.getMonth(), n.getDate()) - d) / 864e5);
  }
  function tabs(tab) {
    var t = [['schloss', '🏰', 'Schloss'], ['schatz', '💎', 'Schatzkammer'], ['buch', '📖', 'Studienbuch']];
    return '<nav class="tabs"><div>' + t.map(function (x) { return '<button class="' + (tab === x[0] ? 'on' : '') + '" data-act="tab" data-tab="' + x[0] + '"><span>' + x[1] + '</span>' + x[2] + '</button>'; }).join('') + '</div></nav>';
  }
  UI.screens.home = function (p) {
    var tab = p.tab || 'schloss';
    return '<div class="screen">' + header() + (tab === 'schloss' ? schloss() : tab === 'schatz' ? UI.schatz() : UI.buch()) + '</div>' + tabs(tab);
  };
  UI.after.home = function (p, keep) {
    if ((p.tab || 'schloss') !== 'schloss' || keep) return;
    if (p.trace) { UI.trace(p.trace); return; }
    var el = $('.floor.cur');
    if (el && el.scrollIntoView) {
      var y = el.getBoundingClientRect().top + g.pageYOffset - 150;
      g.scrollTo(0, Math.max(0, p.y != null ? p.y : y));
    }
  };
  UI.act.tab = function (el) { UI.closeSheet(); UI.home(el.getAttribute('data-tab')); SZ.Audio.sfx.tap(); };

  /* ---------- Das Schloss: das Gebäude der Mathematik ---------- */
  function room(m, rec) {
    var s = SZ.stars(m.id), len = m.icon.length;
    return '<button class="room t-' + m.t + ' s' + s + (SZ.cracked(m.id) ? ' crack' : '') + (rec === m.id ? ' rec' : '') + '" data-act="mod" data-id="' + m.id + '">' +
      '<span class="ic' + (len >= 7 ? ' l7' : len >= 6 ? ' l6' : len >= 5 ? ' l5' : '') + '">' + esc(m.icon) + '</span><span class="nm">' + esc(m.name) + '</span>' + UI.starsHtml(s) + '</button>';
  }
  function schloss() {
    var S = SZ.S, rec = SZ.recommend(), h = '', cols = ['zahl', 'alg', 'fun', 'geo', 'sto'];
    // Rabe Quod
    var say, btn = '';
    if (rec) {
      var m = SZ.MOD[rec.id], tw = SZ.tower(m.t);
      say = rec.why === 'riss' ? 'Krah! Im Mauerwerk ist ein <b>Riss</b>: ' + esc(UI.modLabel(rec.id)) + '. Eine bestandene Übung dort repariert ihn.' :
        rec.why === 'neu' ? 'Bereit für einen neuen Raum? <b>' + esc(m.name) + '</b> wartet ' + (m.t === 'log' ? 'im Fundament' : 'im ' + tw.name) + ' auf dich.' :
        rec.why === 'pruefung' ? '<b>' + esc(m.name) + '</b> hast du geübt. Wage jetzt die Prüfung und brich das Siegel!' :
        'In <b>' + esc(m.name) + '</b> fehlt dir nur noch der goldene dritte Stern.';
      btn = '<div style="margin-top:8px"><button class="btn" style="min-height:40px;padding:6px 14px;font-size:14.5px" data-act="mod" data-id="' + rec.id + '">Hingehen</button></div>';
    } else say = 'Alle Räume dieses Stockwerks leuchten golden. Im <b>Studienbuch</b> kannst du das nächste Stockwerk öffnen. q. e. d.!';
    h += '<div class="raven">' + UI.ravenSvg + '<div class="bubble grow">' + say + btn + '</div></div>';
    // Rabenpost
    var done = S.daily.last === SZ.today();
    h += '<div class="card row"><div style="font-size:30px">✉️</div><div class="grow"><b>Rabenpost</b><br><span class="small mute">' + (done ? 'Heute erledigt. Serie: ' + S.daily.streak + (S.daily.streak === 1 ? ' Tag' : ' Tage') + '.' : 'Fünf Aufgaben quer durchs Schloss – jeden Tag neu.') + '</span></div>' +
      '<button class="btn ' + (done ? 'ghost' : 'violet') + '" style="min-height:42px;padding:6px 14px;font-size:14.5px" data-act="daily">' + (done ? 'Nochmal' : 'Öffnen') + '</button></div>';
    // Türme
    h += '<div class="sec" style="margin:16px 2px 0">Das Gebäude der Mathematik</div>';
    h += '<div class="towers">' + cols.map(function (c) { var t = SZ.tower(c); return '<button class="roof t-' + c + '" data-act="tower" data-id="' + c + '">' + t.short + '</button>'; }).join('') + '</div>';
    h += '<div class="building" id="building"><svg id="links"></svg>';
    SZ.KLASSEN.slice().reverse().forEach(function (c) {
      var lp = SZ.lpOf(c.k), locked = c.k > S.klasse;
      h += '<section class="floor' + (c.k === S.klasse ? ' cur' : '') + (locked ? ' locked' : '') + '" data-k="' + c.k + '"><header><b>' + c.label + '</b>' + c.floor + '<span class="lp">' + lp[0] + '/' + lp[1] + ' LP</span></header><div class="rooms">';
      cols.forEach(function (t) {
        h += '<div class="col">' + SZ.MODS.filter(function (m) { return m.k === c.k && m.t === t; }).map(function (m) { return room(m, rec && rec.id); }).join('') + '</div>';
      });
      h += '</div>';
      var logs = SZ.MODS.filter(function (m) { return m.k === c.k && m.t === 'log'; });
      if (logs.length) h += '<div class="beam"><span class="lbl">Fundament</span>' + logs.map(function (m) { return room(m, rec && rec.id); }).join('') + '</div>';
      h += '</section>';
    });
    h += '<div class="ground">Grundmauern: Zählen, Einmaleins, Formen – alles aus der Grundschule.<br>Kein Raum schwebt in der Luft: Jeder ruht auf den Räumen darunter.</div></div>';
    return h;
  }
  UI.act.tower = function (el) {
    var t = SZ.tower(el.getAttribute('data-id')), mods = SZ.MODS.filter(function (m) { return m.t === t.id; });
    var got = mods.filter(function (m) { return SZ.stars(m.id) >= 2; }).length;
    UI.sheet('<div class="t-' + t.id + '"><div class="modhead"><div class="big">' + ({ zahl: 'ℕ ℤ ℚ ℝ', alg: 'x', fun: 'f(x)', geo: '△', sto: 'P(E)', log: '∴' }[t.id]) + '</div><div><h2>' + t.name + '</h2><div class="spell">' + t.sub + '</div></div></div>' +
      '<p>' + t.about + '</p><div class="note">An der Universität heißt dieses Fachgebiet <b>' + t.uni + '</b>.<br>Hüterin dieses Turms: <b>' + t.prof + '</b>.</div>' +
      '<div class="note">' + got + ' von ' + mods.length + ' Räumen mit bestandener Prüfung.</div><button class="btn ghost wide" data-act="closeSheet">Schließen</button></div>');
  };

  /* ---------- Modulblatt ---------- */
  UI.act.mod = function (el) { UI.modSheet(el.getAttribute('data-id')); SZ.Audio.sfx.tap(); };
  UI.modSheet = function (id) {
    var m = SZ.MOD[id], t = SZ.tower(m.t), kl = SZ.klasse(m.k), st = SZ.stars(id), locked = m.k > SZ.S.klasse, has = SZ.gen[id] && SZ.gen[id].length;
    var status = ['Dieser Raum liegt noch im Dunkeln.', 'Übung bestanden – das erste Licht brennt.', 'Prüfung bestanden – das Siegel ist gebrochen.', 'Gemeistert – der Raum leuchtet golden.'][st];
    var h = '<div class="t-' + m.t + '"><div class="modhead"><div class="big" style="font-size:' + (m.icon.length > 5 ? 14 : 19) + 'px">' + esc(m.icon) + '</div><div class="grow"><h2>' + esc(m.name) + '</h2><div class="spell">„' + esc(m.spell) + '“</div></div></div>';
    h += '<div class="small mute">' + t.name + ' · an der Universität: ' + t.uni + '<br>Lehrplan Sachsen · ' + kl.label + ' · ' + m.lb.map(function (l) { return 'LB ' + l + ': ' + kl.lbs[l - 1]; }).join(' / ') + '<br>' + m.lp + ' Leistungspunkte</div>';
    h += '<div class="row" style="margin-top:8px">' + UI.starsHtml(st, 'stars3') + '<span class="small mute">' + status + '</span></div>';
    if (SZ.cracked(id)) h += '<div class="warn">⚡ <b>Riss im Mauerwerk.</b> Bei einer Fundament-Aufgabe aus diesem Raum hat etwas nicht gestimmt. Eine bestandene Übung repariert den Riss.</div>';
    if (locked) h += '<div class="note">🔒 Dieses Stockwerk gehört zu ' + kl.label + '. Die Schriftrolle darfst du schon lesen – üben kannst du, sobald du im Studienbuch diese Klassenstufe wählst.</div>';
    h += '<div class="acts"><button class="btn ghost" data-act="lesson" data-id="' + id + '"><span>📜</span>Schriftrolle</button>' +
      '<button class="btn" data-act="quest" data-mode="ueben" data-id="' + id + '"' + (locked || !has ? ' disabled' : '') + '><span>🪄</span>Üben</button>' +
      '<button class="btn violet" data-act="quest" data-mode="pruefung" data-id="' + id + '"' + (locked || !has ? ' disabled' : '') + '><span>🏆</span>Prüfung</button></div>';
    h += '<div class="small mute">Üben: 6 Aufgaben mit Tipps. Prüfung: 8 Aufgaben, 3 Herzen, keine Tipps.</div>';
    var pre = m.pre || [], kids = SZ.children(id);
    function chips(list) {
      return list.map(function (x) { var mm = SZ.MOD[x]; return '<button class="chipbtn t-' + mm.t + '" data-act="mod" data-id="' + x + '"><small>Kl. ' + (mm.k === 11 ? '11/12' : mm.k) + '</small>' + esc(mm.name) + (SZ.cracked(x) ? ' ⚡' : '') + '</button>'; }).join('');
    }
    h += '<div class="sec">Ruht auf</div>' + (pre.length ? chips(pre) : '<span class="small mute">den Grundmauern aus der Grundschule</span>');
    if (kids.length) h += '<div class="sec">Trägt</div>' + chips(kids);
    h += '<div style="margin-top:12px"><button class="btn ghost wide" data-act="trace" data-id="' + id + '">🧭 Im Gebäude zeigen, worauf dieser Raum ruht</button></div></div>';
    UI.sheet(h);
  };

  /* Im Gebäude zeigen: der Raum und alles, worauf er ruht, leuchtet auf und wird verbunden */
  UI.act.trace = function (el) {
    var id = el.getAttribute('data-id');
    UI.closeSheet();
    var top = UI.top();
    if (top.name !== 'home' || (top.p.tab || 'schloss') !== 'schloss') { stack = [{ name: 'home', p: { tab: 'schloss', trace: id } }]; render(); }
    else UI.trace(id);
  };
  UI.trace = function (id) {
    var b = $('#building');
    if (!b) return;
    var anc = SZ.ancestors(id), set = {}, rooms = {};
    set[id] = 1;
    anc.forEach(function (a) { set[a.id] = 1; });
    b.classList.add('trace');
    $$('.room', b).forEach(function (r) {
      var rid = r.getAttribute('data-id');
      rooms[rid] = r;
      r.classList.toggle('on', !!set[rid]);
      r.classList.toggle('self', rid === id);
    });
    var bb = b.getBoundingClientRect(), svg = $('#links'), paths = '';
    function c(r) { var q = r.getBoundingClientRect(); return [q.left - bb.left + q.width / 2, q.top - bb.top + q.height / 2]; }
    Object.keys(set).forEach(function (mid) {
      (SZ.MOD[mid].pre || []).forEach(function (pid) {
        if (!rooms[mid] || !rooms[pid]) return;
        var a = c(rooms[mid]), z = c(rooms[pid]), my = (a[1] + z[1]) / 2;
        paths += '<path d="M' + a[0].toFixed(1) + ' ' + a[1].toFixed(1) + ' C' + a[0].toFixed(1) + ' ' + my.toFixed(1) + ' ' + z[0].toFixed(1) + ' ' + my.toFixed(1) + ' ' + z[0].toFixed(1) + ' ' + z[1].toFixed(1) + '" fill="none" stroke="#f2c14e" stroke-width="' + (mid === id ? 2.4 : 1.4) + '" stroke-opacity="' + (mid === id ? .95 : .55) + '" stroke-linecap="round"/>';
      });
    });
    svg.setAttribute('viewBox', '0 0 ' + bb.width + ' ' + bb.height);
    svg.innerHTML = paths;
    var low = 12;
    anc.forEach(function (a) { low = Math.min(low, SZ.MOD[a.id].k); });
    var bar = doc.createElement('div');
    bar.className = 'tracebar';
    bar.id = 'tracebar';
    bar.innerHTML = '<div><span class="grow"><b>' + esc(SZ.MOD[id].name) + '</b> ruht auf ' + anc.length + (anc.length === 1 ? ' Raum' : ' Räumen') + (anc.length ? ' – bis hinunter in Klasse ' + low : '') + '.</span><button class="btn" style="min-height:36px;padding:4px 12px;font-size:14px;margin-left:10px" data-act="untrace">OK</button></div>';
    var old = $('#tracebar');
    if (old) old.parentNode.removeChild(old);
    doc.body.appendChild(bar);
    var self = rooms[id];
    if (self) g.scrollTo(0, Math.max(0, self.getBoundingClientRect().top + g.pageYOffset - 170));
  };
  UI.untrace = function () {
    var b = $('#building'), bar = $('#tracebar');
    if (bar) bar.parentNode.removeChild(bar);
    if (!b) return false;
    var was = b.classList.contains('trace');
    b.classList.remove('trace');
    $$('.room', b).forEach(function (r) { r.classList.remove('on'); r.classList.remove('self'); });
    var svg = $('#links');
    if (svg) svg.innerHTML = '';
    var top = UI.top();
    if (top && top.p) top.p.trace = null;
    return was;
  };
  UI.act.untrace = function () { UI.untrace(); };

  /* ---------- Schriftrolle (Vorlesung) ---------- */
  UI.act.lesson = function (el) { UI.closeSheet(); UI.go('lesson', { id: el.getAttribute('data-id') }); };
  UI.screens.lesson = function (p) {
    var m = SZ.MOD[p.id], kl = SZ.klasse(m.k), t = SZ.tower(m.t), locked = m.k > SZ.S.klasse;
    var h = '<div class="screen" style="padding-bottom:30px"><div class="subbar"><button class="x" data-act="back">←</button><h2>Schriftrolle</h2></div><div class="parch scroll">';
    h += '<h2>' + esc(m.name) + '</h2><div class="sub">„' + esc(m.spell) + '“ · ' + t.name + ' · ' + kl.label + ', ' + m.lb.map(function (l) { return 'Lernbereich ' + l; }).join(' und ') + '</div>';
    h += '<h3>Worum geht es?</h3><p>' + T(m.idea) + '</p>';
    h += '<h3>Definitionen</h3>' + m.defs.map(function (d) { return '<div class="def"><b>' + T(d[0]) + '</b>' + T(d[1]) + '</div>'; }).join('');
    h += '<h3>Sätze und Regeln</h3>' + m.rules.map(function (r) { return '<div class="satz"><b>' + T(r[0]) + '</b>' + T(r[1]) + (r[2] ? '<div class="why">' + T(r[2]) + '</div>' : '') + '</div>'; }).join('');
    h += '<h3>Beispiel</h3><div class="ex"><b>' + T(m.ex[0]) + '</b><br>' + T(m.ex[1]) + '</div>';
    h += '<h3>Stolperfalle</h3><div class="trap">' + T(m.trap) + '</div>';
    h += '<h3>Kunst &amp; Klang</h3><div class="art">' + T(m.art) + '</div>';
    var pre = m.pre || [];
    h += '<h3>Im Gebäude</h3><p class="rests">' + (pre.length ? 'Dieser Raum ruht auf: ' + pre.map(function (x) { return '<b>' + esc(SZ.MOD[x].name) + '</b> (Kl. ' + (SZ.MOD[x].k === 11 ? '11/12' : SZ.MOD[x].k) + ')'; }).join(', ') + '.' : 'Dieser Raum steht direkt auf den Grundmauern aus der Grundschule.') + '</p></div>';
    h += '<div style="margin-top:14px"><button class="btn wide" data-act="quest" data-mode="ueben" data-id="' + m.id + '"' + (locked || !SZ.gen[m.id] ? ' disabled' : '') + '>🪄 Jetzt üben</button></div></div>';
    return h;
  };
  UI.after.lesson = function (p) {
    var st = SZ.ms(p.id);
    if (!st.read) {
      st.read = 1; SZ.S.stats.scrolls++;
      var nb = SZ.checkBadges();
      SZ.Store.save();
      if (nb.length) UI.toast(nb[0].icon + ' Abzeichen: ' + nb[0].name);
    }
  };
  UI.act.back = function () { if (!UI.back()) UI.home(); };
  UI.act.closeSheet = function () { UI.closeSheet(); };

  /* ---------- Start ---------- */
  UI.boot = function () {
    app = $('#app'); sheetEl = $('#sheet'); toastEl = $('#toast');
    var sky = $('#sky'), i, s;
    for (i = 0; i < 46; i++) {
      s = doc.createElement('i');
      s.style.left = Math.random() * 100 + '%'; s.style.top = Math.random() * 100 + '%';
      s.style.animationDelay = Math.random() * 4 + 's';
      if (i % 5 === 0) { s.style.width = '3px'; s.style.height = '3px'; }
      sky.appendChild(s);
    }
    doc.addEventListener('click', function (e) {
      var el = e.target;
      while (el && el !== doc.body && !(el.getAttribute && el.getAttribute('data-act'))) el = el.parentNode;
      if (!el || el === doc.body || !el.getAttribute) return;
      SZ.Audio.init();
      var fn = UI.act[el.getAttribute('data-act')];
      if (fn) fn(el, e);
    });
    SZ.Store.load();
    UI.applyTheme();
    if (SZ.S.onboarded) UI.home(); else UI.go('intro', { step: 0 });
  };
  UI.applyTheme = function () {
    var z = SZ.ZIRKEL.filter(function (x) { return x.id === SZ.S.zirkel; })[0] || SZ.ZIRKEL[0];
    doc.documentElement.style.setProperty('--accent', z.color);
  };
  /* Zurück-Taste des Telefons: true = vom Spiel behandelt */
  SZ.onBack = function () {
    if (UI.sheetOpen()) { UI.closeSheet(); return true; }
    if (UI.untrace()) return true;
    var top = UI.top();
    if (!top) return false;
    if (top.name === 'quest') { UI.act.quit(); return true; }
    if (top.name === 'result') { UI.home(); return true; }
    if (top.name === 'intro') { if (top.p.step > 0) { top.p.step--; UI.refresh(); return true; } return false; }
    if (stack.length > 1) { UI.back(); return true; }
    if (top.name === 'home' && (top.p.tab || 'schloss') !== 'schloss') { UI.home('schloss'); return true; }
    return false;
  };
  SZ.onPause = function () { SZ.Store.save(); if (SZ.Klang && SZ.Klang.stop) SZ.Klang.stop(); SZ.Audio.suspend(); };
  SZ.onResume = function () { /* Töne starten bei der nächsten Berührung wieder */ };
})(typeof window !== 'undefined' ? window : globalThis);

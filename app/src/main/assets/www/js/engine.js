/* Silberzirkel – Spielstand, Aufgabenfolgen, Belohnungen. */
(function (g) {
  'use strict';
  var SZ = g.SZ, R = SZ.R;

  /* ---------- Aufgaben-Generatoren anmelden ---------- */
  SZ.gen = {};
  /* G(modulId, schwierigkeit 1..3, funktion) */
  SZ.G = function (id, d, f) { (SZ.gen[id] = SZ.gen[id] || []).push({ d: d, f: f }); };

  /* ---------- Spielstand ---------- */
  var KEY = 'silberzirkel.v1';
  function fresh() {
    return {
      v: 1, created: Date.now(), onboarded: false, name: '', zirkel: 'spirale', klasse: 8, g: 'f', sound: true,
      dust: 0, xp: 0, mods: {}, cards: [], badges: [], owned: [],
      daily: { last: '', streak: 0, best: 0 },
      stats: { right: 0, wrong: 0, quests: 0, bestStreak: 0, repaired: 0, art: 0, songs: 0, scrolls: 0 },
      art: [], songs: []
    };
  }
  var mem = null;                                  // Ersatz, falls kein localStorage verfügbar ist
  SZ.Store = {
    load: function () {
      var s = fresh(), raw = null;
      try { raw = g.localStorage ? g.localStorage.getItem(KEY) : mem; } catch (e) { raw = mem; }
      if (raw) {
        try {
          var o = JSON.parse(raw);
          Object.keys(o).forEach(function (k) {
            if (o[k] && typeof o[k] === 'object' && !Array.isArray(o[k]) && s[k] && typeof s[k] === 'object') {
              Object.keys(o[k]).forEach(function (kk) { s[k][kk] = o[k][kk]; });
            } else s[k] = o[k];
          });
        } catch (e) { /* beschädigter Stand: neu beginnen */ }
      }
      SZ.S = s;
      return s;
    },
    save: function () {
      var raw = JSON.stringify(SZ.S);
      mem = raw;
      try { if (g.localStorage) g.localStorage.setItem(KEY, raw); } catch (e) { /* z. B. Speicher voll */ }
    },
    reset: function () {
      mem = null;
      try { if (g.localStorage) g.localStorage.removeItem(KEY); } catch (e) { /* egal */ }
      SZ.S = fresh();
    }
  };
  SZ.ms = function (id) {                          // Stand eines Moduls
    var m = SZ.S.mods[id];
    if (!m) m = SZ.S.mods[id] = { s: 0, r: 0, w: 0, crack: 0, t: 0, n: 0, read: 0 };
    return m;
  };
  SZ.stars = function (id) { var m = SZ.S.mods[id]; return m ? m.s : 0; };
  SZ.cracked = function (id) { var m = SZ.S.mods[id]; return !!(m && m.crack); };
  SZ.rank = function (xp) {
    var i = 0;
    SZ.RANKS.forEach(function (r, k) { if (xp >= r.xp) i = k; });
    return i;
  };
  SZ.rankName = function (i) { var r = SZ.RANKS[i]; return SZ.S.g === 'm' ? r.m : r.f; };
  SZ.today = function () {
    var d = new Date();
    return d.getFullYear() + '-' + ('0' + (d.getMonth() + 1)).slice(-2) + '-' + ('0' + d.getDate()).slice(-2);
  };
  SZ.lpOf = function (k) {                         // Leistungspunkte einer Klassenstufe: [erreicht, möglich]
    var got = 0, all = 0;
    SZ.MODS.forEach(function (m) {
      if (k != null && m.k !== k) return;
      all += m.lp;
      if (SZ.stars(m.id) >= 2) got += m.lp;
    });
    return [got, all];
  };
  var helper = {
    count: function (min) { return SZ.MODS.filter(function (m) { return SZ.stars(m.id) >= min; }).length; },
    towersWith: function (min) {
      return SZ.TOWERS.filter(function (t) { return SZ.MODS.some(function (m) { return m.t === t.id && SZ.stars(m.id) >= min; }); }).length;
    },
    fullFloors: function (min) {
      return SZ.KLASSEN.filter(function (c) { return SZ.MODS.filter(function (m) { return m.k === c.k; }).every(function (m) { return SZ.stars(m.id) >= min; }); }).length;
    }
  };
  /* neu verdiente Abzeichen eintragen und zurückgeben */
  SZ.checkBadges = function () {
    var fresh = [];
    SZ.BADGES.forEach(function (b) {
      if (SZ.S.badges.indexOf(b.id) < 0 && b.test(SZ.S, helper)) { SZ.S.badges.push(b.id); fresh.push(b); }
    });
    return fresh;
  };

  /* ---------- Aufgaben erzeugen ---------- */
  function valid(t) {
    if (!t || !t.q || /undefined|NaN|Infinity/.test(t.q + (t.sol || '') + (t.opts || []).join(' '))) return false;
    if (t.type === 'mc') return t.opts && t.opts.length >= 2 && t.correct >= 0 && t.correct < t.opts.length;
    if (t.type === 'num') return t.ans && t.ans.length > 0 && t.ans.every(function (a) { return typeof a === 'number' ? isFinite(a) : (a && isFinite(a.n) && a.d > 0); });
    if (t.type === 'tf') return typeof t.ans === 'boolean';
    if (t.type === 'ord') return t.items && t.items.length >= 3;
    return false;
  }
  SZ.validTask = valid;
  /* eine Aufgabe aus Modul id; maxD begrenzt die Schwierigkeit; avoid = schon benutzte Generatoren */
  SZ.makeTask = function (id, maxD, avoid) {
    var gens = (SZ.gen[id] || []).filter(function (x) { return x.d <= (maxD || 3); });
    if (!gens.length) gens = SZ.gen[id] || [];
    if (!gens.length) return null;
    var pool = gens.filter(function (x) { return !avoid || avoid.indexOf(x) < 0; });
    if (!pool.length) pool = gens;
    for (var i = 0; i < 12; i++) {
      var ge = R.pick(pool), t = null;
      try { t = ge.f(); } catch (e) { t = null; }
      if (valid(t)) { t.mod = id; t.d = ge.d; if (avoid) avoid.push(ge); return t; }
    }
    return null;
  };

  /* Module, auf denen id ruht – gewichtet ausgewählt (Risse und nahe Voraussetzungen bevorzugt) */
  function pickFoundations(id, n) {
    var k = SZ.MOD[id].k;
    var cand = SZ.ancestors(id).filter(function (a) { return SZ.gen[a.id] && SZ.gen[a.id].length; });
    var out = [];
    while (out.length < n && cand.length) {
      var total = 0, w = cand.map(function (a) {
        var x = (SZ.cracked(a.id) ? 3 : 1) * (a.depth === 1 ? 2 : 1) * (SZ.MOD[a.id].k < k ? 2 : 1);
        total += x;
        return x;
      });
      var r = R.f() * total, i = 0;
      while (i < w.length - 1 && r > w[i]) { r -= w[i]; i++; }
      out.push(cand[i].id);
      cand.splice(i, 1);
    }
    return out;
  }

  /* Eine Aufgabenfolge bauen. mode: 'ueben' | 'pruefung' | 'daily' */
  SZ.buildQuest = function (id, mode) {
    var tasks = [], used = [], i, t;
    if (mode === 'daily') {
      var ids = SZ.dailyMods(5);
      ids.forEach(function (mid) {
        t = SZ.makeTask(mid, 2);
        if (t) { t.fnd = SZ.MOD[mid].k < SZ.S.klasse; tasks.push(t); }
      });
      return { mode: mode, id: null, tasks: tasks, lives: 0 };
    }
    var n = mode === 'pruefung' ? 8 : 6;
    var fnd = pickFoundations(id, mode === 'pruefung' ? 2 : (R.bool(0.6) ? 2 : 1));
    var own = n - fnd.length;
    for (i = 0; i < own; i++) {
      // Schwierigkeit steigt im Verlauf an
      var maxD = mode === 'pruefung' ? (i < 2 ? 2 : 3) : (i < 2 ? 1 : (i < 4 ? 2 : 3));
      t = SZ.makeTask(id, maxD, used);
      if (t) tasks.push(t);
    }
    var slots = mode === 'pruefung' ? [2, 5] : [2, 4];
    fnd.forEach(function (fid, k) {
      t = SZ.makeTask(fid, 2);
      if (t) { t.fnd = true; tasks.splice(Math.min(slots[k], tasks.length), 0, t); }
    });
    return { mode: mode, id: id, tasks: tasks, lives: mode === 'pruefung' ? 3 : 0 };
  };

  /* Module für die tägliche Rabenpost: Risse zuerst, dann lange nicht Geübtes, bunt gemischt */
  SZ.dailyMods = function (n) {
    var k = SZ.S.klasse, now = Date.now();
    var cand = SZ.MODS.filter(function (m) { return m.k <= k && SZ.gen[m.id] && SZ.gen[m.id].length; });
    var scored = cand.map(function (m) {
      var st = SZ.S.mods[m.id], w = 1;
      if (st && st.crack) w += 6;
      if (st && st.s > 0) w += 2 + Math.min(3, (now - st.t) / 864e5 / 3);   // Wiederholung wird mit der Zeit wichtiger
      if (m.k === k) w += 1.5;
      if (m.k === k - 1) w += 1;
      return { id: m.id, w: w * (0.5 + R.f()), t: m.t };
    });
    scored.sort(function (a, b) { return b.w - a.w; });
    var out = [], towers = {};
    scored.forEach(function (s) {                 // möglichst verschiedene Türme
      if (out.length < n && !towers[s.t]) { out.push(s.id); towers[s.t] = 1; }
    });
    scored.forEach(function (s) { if (out.length < n && out.indexOf(s.id) < 0) out.push(s.id); });
    return R.shuffle(out);
  };

  /* Antwort prüfen */
  SZ.checkTask = function (t, answer) {
    if (t.type === 'mc') return answer === t.correct;
    if (t.type === 'tf') return answer === t.ans;
    if (t.type === 'num') {
      return t.ans.every(function (a, i) { return SZ.checkNum(answer[i] == null ? '' : answer[i], a, t.tol, t.reduced); });
    }
    if (t.type === 'ord') return answer.length === t.order.length && answer.every(function (x, i) { return x === t.order[i]; });
    return false;
  };
  SZ.solutionText = function (t) {
    if (t.type === 'mc') return t.opts[t.correct];
    if (t.type === 'tf') return t.ans ? 'Wahr' : 'Falsch';
    if (t.type === 'num') {
      return t.ans.map(function (a, i) { return (t.pre[i] ? t.pre[i] + ' ' : '') + SZ.showAns(a) + (t.unit[i] ? ' ' + t.unit[i] : ''); }).join(' &nbsp;·&nbsp; ');
    }
    if (t.type === 'ord') return t.order.join(' → ');
    return '';
  };

  /* ---------- Ein Durchlauf (Übung, Prüfung, Rabenpost) ---------- */
  SZ.Run = function (quest) {
    this.q = quest;
    this.i = 0;
    this.right = 0;
    this.wrong = 0;
    this.streak = 0;
    this.dust = 0;
    this.xp = 0;
    this.lives = quest.lives;
    this.cracks = [];                              // neu entdeckte Risse
    this.failed = false;
  };
  SZ.Run.prototype.task = function () { return this.q.tasks[this.i]; };
  /* Antwort verbuchen; liefert {ok, dust} */
  SZ.Run.prototype.answer = function (answer, usedHint) {
    var t = this.task(), ok = SZ.checkTask(t, answer), S = SZ.S, st = SZ.ms(t.mod), gain = 0;
    if (ok) {
      this.right++; this.streak++;
      gain = (usedHint ? 6 : 10) + Math.min(this.streak - 1, 5) * 2 + (t.d === 3 ? 4 : 0);
      this.dust += gain; this.xp += 10 + (t.d || 1) * 2;
      S.stats.right++; st.r++;
      if (this.streak > S.stats.bestStreak) S.stats.bestStreak = this.streak;
    } else {
      this.wrong++; this.streak = 0;
      S.stats.wrong++; st.w++;
      if (this.q.mode === 'pruefung') { this.lives--; if (this.lives <= 0) this.failed = true; }
      // Fehler bei einer Fundament-Aufgabe: Riss im entsprechenden Modul
      if (t.fnd && !st.crack && t.mod !== this.q.id) { st.crack = 1; this.cracks.push(t.mod); }
    }
    return { ok: ok, dust: gain };
  };
  SZ.Run.prototype.next = function () { this.i++; return this.i < this.q.tasks.length && !this.failed; };
  /* Abschluss: Sterne, Belohnungen, Karten, Abzeichen. Liefert eine Zusammenfassung. */
  SZ.Run.prototype.finish = function () {
    var S = SZ.S, q = this.q, n = q.tasks.length, res = { mode: q.mode, id: q.id, right: this.right, n: n, wrong: this.wrong, passed: false, stars: 0, newStars: 0, bonus: 0, cards: [], badges: [], cracks: this.cracks, repaired: false, rankUp: null, lpGain: 0, streakDays: 0 };
    var rankBefore = SZ.rank(S.xp), st;
    S.stats.quests++;
    if (q.mode === 'ueben') {
      st = SZ.ms(q.id);
      res.passed = this.right >= Math.ceil(n * 2 / 3);
      st.n++; st.t = Date.now();
      if (res.passed) {
        res.bonus = 20;
        if (st.s < 1) { st.s = 1; res.newStars = 1; }
        if (st.crack) { st.crack = 0; S.stats.repaired++; res.repaired = true; res.bonus += 30; }
      }
      res.stars = st.s;
    } else if (q.mode === 'pruefung') {
      st = SZ.ms(q.id);
      res.passed = !this.failed && this.wrong <= 2;
      st.n++; st.t = Date.now();
      if (res.passed) {
        var got = this.wrong <= 1 ? 3 : 2, before = st.s;
        res.bonus = got === 3 ? 80 : 50;
        if (got > st.s) { st.s = got; res.newStars = got; }
        if (before < 2) { res.lpGain = SZ.MOD[q.id].lp; var c1 = SZ.drawCard(q.id); if (c1) res.cards.push(c1); }
        if (before < 3 && got === 3) { var c2 = SZ.drawCard(q.id); if (c2) res.cards.push(c2); }
        if (st.crack) { st.crack = 0; S.stats.repaired++; res.repaired = true; }
      }
      res.stars = st.s;
    } else if (q.mode === 'daily') {
      res.passed = true;
      var today = SZ.today(), y = new Date(Date.now() - 864e5);
      var yest = y.getFullYear() + '-' + ('0' + (y.getMonth() + 1)).slice(-2) + '-' + ('0' + y.getDate()).slice(-2);
      if (S.daily.last !== today) {
        S.daily.streak = S.daily.last === yest ? S.daily.streak + 1 : 1;
        S.daily.last = today;
        if (S.daily.streak > S.daily.best) S.daily.best = S.daily.streak;
        res.bonus = 30 + 10 * Math.min(S.daily.streak, 7);
        if (S.daily.streak % 3 === 0) { var c3 = SZ.drawCard(null); if (c3) res.cards.push(c3); }
      } else res.bonus = 10;
      res.streakDays = S.daily.streak;
    }
    res.dust = this.dust + res.bonus;
    res.xp = this.xp + (res.passed ? (q.mode === 'pruefung' ? 40 : 15) : 0);
    S.dust += res.dust;
    S.xp += res.xp;
    var rankAfter = SZ.rank(S.xp);
    if (rankAfter > rankBefore) res.rankUp = SZ.rankName(rankAfter);
    res.badges = SZ.checkBadges();
    SZ.Store.save();
    return res;
  };
  /* eine noch nicht gefundene Sammelkarte ziehen – bevorzugt eine, die zum Modul passt */
  SZ.drawCard = function (modId) {
    var S = SZ.S, left = SZ.CARDS.filter(function (c) { return S.cards.indexOf(c.id) < 0; });
    if (!left.length) return null;
    var fit = modId ? left.filter(function (c) { return c.mods.indexOf(modId) >= 0; }) : [];
    var c = fit.length ? R.pick(fit) : R.pick(left);
    S.cards.push(c.id);
    return c;
  };

  /* Empfehlung des Raben: was als Nächstes sinnvoll ist */
  SZ.recommend = function () {
    var S = SZ.S, k = S.klasse;
    var cracked = SZ.MODS.filter(function (m) { return m.k <= k && SZ.cracked(m.id); });
    if (cracked.length) return { id: cracked[0].id, why: 'riss' };
    var floor = SZ.MODS.filter(function (m) { return m.k === k; });
    function ready(m) { return (m.pre || []).every(function (p) { return SZ.MOD[p].k < k || SZ.stars(p) >= 1; }); }
    var a = floor.filter(function (m) { return SZ.stars(m.id) === 0 && ready(m); });
    if (a.length) return { id: a[0].id, why: 'neu' };
    var b = floor.filter(function (m) { return SZ.stars(m.id) === 1; });
    if (b.length) return { id: b[0].id, why: 'pruefung' };
    var c = floor.filter(function (m) { return SZ.stars(m.id) === 2; });
    if (c.length) return { id: c[0].id, why: 'gold' };
    var d = floor.filter(function (m) { return SZ.stars(m.id) === 0; });
    if (d.length) return { id: d[0].id, why: 'neu' };
    return null;
  };
})(typeof window !== 'undefined' ? window : globalThis);

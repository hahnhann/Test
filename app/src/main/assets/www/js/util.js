/* Silberzirkel – Hilfsfunktionen: Zufall, Rechnen, Formelsatz, Aufgaben-Bausteine.
   Alles läuft lokal auf dem Gerät. Keine KI, kein Netz. */
(function (g) {
  'use strict';
  var SZ = g.SZ = g.SZ || {};

  /* ---------- Zufall (mit Startwert, damit Tests wiederholbar sind) ---------- */
  var seed = (Date.now() ^ Math.floor(Math.random() * 0x7fffffff)) >>> 0;
  function rnd() {
    seed = (seed + 0x6D2B79F5) >>> 0;
    var t = seed;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  }
  var R = SZ.R = {
    seed: function (s) { seed = s >>> 0; },
    f: rnd,
    int: function (a, b) { return a + Math.floor(rnd() * (b - a + 1)); },
    pick: function (arr) { return arr[Math.floor(rnd() * arr.length)]; },
    bool: function (p) { return rnd() < (p == null ? 0.5 : p); },
    shuffle: function (arr) {
      var a = arr.slice();
      for (var i = a.length - 1; i > 0; i--) {
        var j = Math.floor(rnd() * (i + 1));
        var t = a[i]; a[i] = a[j]; a[j] = t;
      }
      return a;
    },
    sample: function (arr, n) { return R.shuffle(arr).slice(0, n); },
    /* ganze Zahl aus [a, b], aber nicht 0 */
    nz: function (a, b) { var x; do { x = R.int(a, b); } while (x === 0); return x; },
    /* ganze Zahl aus [a, b], aber keine aus der Liste "not" */
    intNot: function (a, b, not) { var x, n = 0; do { x = R.int(a, b); n++; } while (not.indexOf(x) >= 0 && n < 200); return x; },
    /* n verschiedene ganze Zahlen aus [a, b] */
    distinct: function (n, a, b) {
      var all = [];
      for (var i = a; i <= b; i++) all.push(i);
      return R.sample(all, n);
    }
  };

  /* ---------- Rechnen ---------- */
  var M = SZ.M = {};
  M.gcd = function (a, b) { a = Math.abs(a); b = Math.abs(b); while (b) { var t = a % b; a = b; b = t; } return a; };
  M.lcm = function (a, b) { return Math.abs(a * b) / M.gcd(a, b); };
  M.isPrime = function (n) {
    if (n < 2) return false;
    for (var i = 2; i * i <= n; i++) if (n % i === 0) return false;
    return true;
  };
  M.factors = function (n) {
    var f = [], d = 2;
    while (n > 1) { while (n % d === 0) { f.push(d); n /= d; } d++; if (d * d > n && n > 1) { f.push(n); break; } }
    return f;
  };
  M.divisors = function (n) { var r = []; for (var i = 1; i <= n; i++) if (n % i === 0) r.push(i); return r; };
  M.round = function (x, n) {
    var p = Math.pow(10, n || 0);
    var r = Math.round((Math.abs(x) + 1e-10) * p) / p;
    return x < 0 ? -r : r;
  };
  M.fact = function (n) { var r = 1; for (var i = 2; i <= n; i++) r *= i; return r; };
  M.binom = function (n, k) { var r = 1; for (var i = 1; i <= k; i++) r = r * (n - k + i) / i; return Math.round(r); };

  /* Brüche als {n, d}, immer gekürzt, Nenner positiv */
  M.F = function (n, d) {
    if (d == null) d = 1;
    if (d < 0) { n = -n; d = -d; }
    var t = M.gcd(n, d) || 1;
    return { n: n / t, d: d / t };
  };
  M.fadd = function (a, b) { return M.F(a.n * b.d + b.n * a.d, a.d * b.d); };
  M.fsub = function (a, b) { return M.F(a.n * b.d - b.n * a.d, a.d * b.d); };
  M.fmul = function (a, b) { return M.F(a.n * b.n, a.d * b.d); };
  M.fdiv = function (a, b) { return M.F(a.n * b.d, a.d * b.n); };
  M.fval = function (a) { return a.n / a.d; };
  /* Bruch als Formeltext für $...$, z. B. "-{3/4}" oder "5" */
  M.fs = function (a, d) {
    if (d != null) a = { n: a, d: d };          // ungekürzte Darstellung erlaubt
    if (a.d === 1) return String(a.n);
    return (a.n < 0 ? '-' : '') + '{' + Math.abs(a.n) + '/' + a.d + '}';
  };

  /* Zahl in deutscher Schreibweise (Komma, echtes Minuszeichen) */
  M.de = function (x, n) {
    if (typeof x !== 'number') return String(x);
    var k = n == null ? 6 : n;
    var r = M.round(x, k);
    var s = Math.abs(r).toFixed(k);
    if (s.indexOf('.') >= 0) s = s.replace(/0+$/, '').replace(/\.$/, '');
    var parts = s.split('.');
    if (parts[0].length > 4) parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
    s = parts.join(',');
    return (r < 0 ? '−' : '') + s;
  };
  /* feste Zahl von Nachkommastellen, z. B. Geldbeträge */
  M.fix = function (x, n) {
    var s = Math.abs(M.round(x, n)).toFixed(n).replace('.', ',');
    var parts = s.split(',');
    if (parts[0].length > 4) parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
    return (x < 0 ? '−' : '') + parts.join(',');
  };

  /* Bausteine für Terme (als Formeltext) */
  M.co = function (a, v) {                       // Koeffizient · Variable
    if (a === 0) return '';
    if (a === 1) return v;
    if (a === -1) return '-' + v;
    return M.num(a) + v;
  };
  M.num = function (a) { return typeof a === 'number' ? String(M.round(a, 6)).replace('.', ',') : String(a); };
  M.sum = function (terms) {                     // ['3x', '-4', ''] -> "3x - 4"
    var out = '';
    terms.forEach(function (t) {
      t = String(t);
      if (t === '' || t === '0') return;
      if (out === '') { out = t; return; }
      if (t.charAt(0) === '-' || t.charAt(0) === '−') out += ' - ' + t.slice(1);
      else out += ' + ' + t;
    });
    return out === '' ? '0' : out;
  };
  M.lin = function (a, v, b) { return M.sum([M.co(a, v), b === 0 ? '' : M.num(b)]); };
  M.poly = function (c, v) {                     // [1,-3,2] -> "x^2 - 3x + 2"
    v = v || 'x';
    var n = c.length - 1, t = [];
    c.forEach(function (a, i) {
      var e = n - i;
      if (a === 0) return;
      if (e === 0) t.push(M.num(a));
      else t.push(M.co(a, e === 1 ? v : v + '^' + e));
    });
    return M.sum(t);
  };
  /* Zahl in Klammern, wenn negativ: 3 · (−2) */
  M.par = function (a) { return a < 0 ? '(' + M.num(a) + ')' : M.num(a); };

  /* ---------- Formelsatz: $ ... $ wird zu hübschem HTML ---------- */
  var H = SZ.H = {};
  H.fr = function (a, b) { return '<span class="fr"><span>' + a + '</span><span>' + b + '</span></span>'; };
  H.sq = function (x, n) { return '<span class="sqrt">' + (n ? '<sup class="ix">' + n + '</sup>' : '') + '√<span class="rad">' + x + '</span></span>'; };

  function findClose(s, open) {                  // passende schließende Klammer
    var depth = 0;
    for (var i = open; i < s.length; i++) {
      if (s.charAt(i) === '(') depth++;
      else if (s.charAt(i) === ')') { depth--; if (depth === 0) return i; }
    }
    return -1;
  }
  H.m = function (s) {
    var store = [];
    function keep(html) { store.push(html); return '' + (store.length - 1) + ''; }
    function conv(x) {
      var i, j, prev;
      // Wurzeln: sqrt(...) und cbrt(...)
      while ((i = x.search(/(sqrt|cbrt)\(/)) >= 0) {
        var cube = x.substr(i, 4) === 'cbrt';
        j = findClose(x, i + 4);
        if (j < 0) break;
        x = x.slice(0, i) + keep(H.sq(conv(x.slice(i + 5, j)), cube ? 3 : 0)) + x.slice(j + 1);
      }
      // Spaltenvektor vec(1;2;3), Binomialkoeffizient binom(n,k), Integral int(a,b)
      x = x.replace(/vec\(([^()]+)\)/g, function (_, a) {
        return keep('<span class="vecc">' + a.split(';').map(function (c) { return '<span>' + conv(c.trim()) + '</span>'; }).join('') + '</span>');
      });
      x = x.replace(/binom\(([^,()]+),([^()]+)\)/g, function (_, a, b) {
        return keep('<span class="vecc"><span>' + conv(a.trim()) + '</span><span>' + conv(b.trim()) + '</span></span>');
      });
      x = x.replace(/int\(([^,()]*),([^()]*)\)/g, function (_, a, b) {
        return keep('<span class="intg">∫<span class="lim"><span>' + conv(b.trim()) + '</span><span>' + conv(a.trim()) + '</span></span></span>');
      });
      // Periode: 0,[3] -> 0,3 mit Überstrich
      x = x.replace(/\[(\d+)\]/g, function (_, d) { return keep('<span class="per">' + d + '</span>'); });
      // Hoch- und Tiefstellung (vor den Brüchen, damit {x^{n+1}/2} funktioniert)
      x = x.replace(/\^(\{[^{}]*\}|-?[A-Za-z0-9]+)/g, function (_, e) {
        if (e.charAt(0) === '{') e = e.slice(1, -1);
        return keep('<sup>' + conv(e) + '</sup>');
      });
      x = x.replace(/_(\{[^{}]*\}|[A-Za-z0-9]+)/g, function (_, e) {
        if (e.charAt(0) === '{') e = e.slice(1, -1);
        return keep('<sub>' + conv(e) + '</sub>');
      });
      // Brüche {a/b}, von innen nach außen
      do {
        prev = x;
        x = x.replace(/\{([^{}\/]+)\/([^{}\/]+)\}/g, function (_, a, b) { return keep(H.fr(conv(a.trim()), conv(b.trim()))); });
      } while (x !== prev);
      // Zeichen
      x = x.replace(/<=/g, '≤').replace(/>=/g, '≥').replace(/!=/g, '≠').replace(/->/g, '→')
        .replace(/\+-/g, '±').replace(/\*/g, '·').replace(/-/g, '−').replace(/\.\.\./g, '…')
        .replace(/</g, '&lt;').replace(/>/g, '&gt;');
      // Funktionsnamen aufrecht, einzelne Buchstaben kursiv
      x = x.replace(/\b(sin|cos|tan|ln|lg|log|lim|ggT|kgV|pi|dx)\b/g, function (w) { return keep(w === 'pi' ? 'π' : (w === 'dx' ? ' d<i>x</i>' : w)); });
      x = x.replace(/(^|[^A-Za-zÄÖÜäöüß])([A-Za-z])(?![A-Za-zÄÖÜäöüß])/g, function (_, p, c) { return p + keep('<i>' + c + '</i>'); });
      return x;
    }
    var out = conv(String(s));
    var guard = 0;
    while (out.indexOf('') >= 0 && guard++ < 20) {
      out = out.replace(/(\d+)/g, function (_, k) { return store[+k]; });
    }
    return out;
  };
  /* Text mit Formeln: alles zwischen $ ... $ wird gesetzt */
  var T = SZ.T = function (s) {
    return String(s).replace(/\$([^$]+)\$/g, function (_, x) { return '<span class="m">' + H.m(x) + '</span>'; });
  };

  /* ---------- Aufgaben-Bausteine ---------- */
  function base(type, q, o) {
    o = o || {};
    return { type: type, q: T(q), sol: o.sol ? T(o.sol) : '', hint: o.hint ? T(o.hint) : '', fig: o.fig || '' };
  }
  function plain(html) { return String(html).replace(/<span class="per">(\d+)<\/span>/g, '[$1]').replace(/<[^>]*>/g, '').replace(/\s+/g, ''); }

  /* Auswahlaufgabe: eine richtige, mehrere falsche Antworten (werden gemischt) */
  SZ.MC = function (q, correct, wrongs, o) {
    var t = base('mc', q, o);
    var c = T(correct), seen = {}, ws = [];
    seen[plain(c)] = 1;
    wrongs.forEach(function (w) {
      if (w == null) return;
      var h = T(w), k = plain(h);
      if (!seen[k]) { seen[k] = 1; ws.push(h); }
    });
    ws = R.shuffle(ws).slice(0, 3);
    t.opts = R.shuffle([c].concat(ws));
    t.correct = t.opts.indexOf(c);
    return t;
  };
  /* Auswahlaufgabe mit Zahlen: fehlende falsche Antworten werden sinnvoll ergänzt */
  SZ.MCN = function (q, correct, wrongs, o) {
    o = o || {};
    var fmt = o.fmt || function (x) { return '$' + M.de(x) + '$' + (o.unit ? ' ' + o.unit : ''); };
    var list = [], seen = {};
    seen[M.de(correct)] = 1;
    function add(w) {
      if (w == null || isNaN(w)) return;
      if (o.pos && w <= 0) return;
      var k = M.de(w);
      if (!seen[k]) { seen[k] = 1; list.push(w); }
    }
    (wrongs || []).forEach(add);
    list = R.shuffle(list).slice(0, 3);
    var step = Math.abs(correct) >= 100 && correct % 10 === 0 ? 10 : (correct % 1 !== 0 ? 0.1 : 1);
    var tries = [1, -1, 2, -2, 3, -3, 5, -5, 10, -10], i = 0;
    while (list.length < 3 && i < tries.length) {
      var before = list.length;
      add(M.round(correct + tries[i] * step, 6));
      if (list.length === before) { /* schon vorhanden */ }
      i++;
    }
    return SZ.MC(q, fmt(correct), list.map(fmt), o);
  };
  /* Auswahlaufgabe mit fester Reihenfolge der Antworten */
  SZ.MCF = function (q, opts, correctIdx, o) {
    var t = base('mc', q, o);
    t.opts = opts.map(T);
    t.correct = correctIdx;
    return t;
  };
  /* Zahleneingabe. ans: Zahl oder Bruch {n,d}. o.unit, o.pre (z. B. "x ="), o.tol, o.reduced */
  SZ.NUM = function (q, ans, o) {
    o = o || {};
    var t = base('num', q, o);
    t.ans = [ans];
    t.pre = [o.pre ? T(o.pre) : ''];
    t.unit = [o.unit ? T(o.unit) : ''];
    t.tol = o.tol || 0;
    t.reduced = !!o.reduced;
    return t;
  };
  /* Lückenaufgabe mit mehreren Zahlen: parts = [{pre:'x =', ans:3, unit:''}, ...] */
  SZ.GAP = function (q, parts, o) {
    o = o || {};
    var t = base('num', q, o);
    t.ans = parts.map(function (p) { return p.ans; });
    t.pre = parts.map(function (p) { return p.pre ? T(p.pre) : ''; });
    t.unit = parts.map(function (p) { return p.unit ? T(p.unit) : ''; });
    t.tol = o.tol || 0;
    t.reduced = !!o.reduced;
    return t;
  };
  /* Wahr oder falsch? */
  SZ.TF = function (q, truth, o) {
    var t = base('tf', q, o);
    t.ans = !!truth;
    return t;
  };
  /* Reihenfolge: items in richtiger Reihenfolge übergeben, sie werden gemischt angezeigt */
  SZ.ORD = function (q, items, o) {
    var t = base('ord', q, o);
    var html = items.map(T), perm, tries = 0;
    do { perm = R.shuffle(html.map(function (_, i) { return i; })); tries++; }
    while (tries < 20 && perm.every(function (v, i) { return v === i; }));
    t.items = perm.map(function (i) { return html[i]; });
    t.order = html;                               // richtige Reihenfolge (als HTML)
    return t;
  };

  /* ---------- Eingaben prüfen ---------- */
  /* "3,5" | "-2" | "3/4" | "-1/2" -> {n, d} als exakter Bruch, sonst null */
  SZ.parseInput = function (s) {
    s = String(s).replace(/\s/g, '').replace(/−/g, '-').replace(/\./g, ',');
    if (s === '' || s === '-' || s === ',') return null;
    function dec(x) {
      if (!/^-?\d*(,\d*)?$/.test(x) || !/\d/.test(x)) return null;
      var neg = x.charAt(0) === '-';
      if (neg) x = x.slice(1);
      var p = x.split(',');
      var frac = p[1] || '';
      var n = parseInt((p[0] || '0') + frac, 10), d = Math.pow(10, frac.length);
      return { n: neg ? -n : n, d: d };
    }
    var parts = s.split('/');
    if (parts.length === 1) { var a = dec(s); return a ? { n: a.n, d: a.d, raw: 'dec' } : null; }
    if (parts.length !== 2) return null;
    var z = dec(parts[0]), nn = dec(parts[1]);
    if (!z || !nn || nn.n === 0) return null;
    // (z.n/z.d) / (nn.n/nn.d)
    var num = z.n * nn.d, den = z.d * nn.n;
    if (den < 0) { num = -num; den = -den; }
    return { n: num, d: den, raw: 'frac', plainInts: z.d === 1 && nn.d === 1 };
  };
  /* Vergleicht eine Eingabe mit der Lösung */
  SZ.checkNum = function (input, ans, tol, reduced) {
    var p = SZ.parseInput(input);
    if (!p) return false;
    var val = p.n / p.d;
    if (typeof ans === 'number') {
      var eps = Math.max(tol || 0, 1e-9 * Math.max(1, Math.abs(ans)));
      return Math.abs(val - ans) <= eps + 1e-12;
    }
    // Bruch als Lösung: exakter Vergleich über Kreuz
    var ok = p.n * ans.d === ans.n * p.d;
    if (!ok && tol) ok = Math.abs(val - ans.n / ans.d) <= tol;
    if (ok && reduced && p.raw === 'frac') ok = M.gcd(p.n, p.d) === 1;
    return ok;
  };
  /* Lösung als lesbares HTML */
  SZ.showAns = function (ans) {
    if (typeof ans === 'number') return T('$' + M.de(ans) + '$');
    return T('$' + M.fs(ans) + '$');
  };

  /* ---------- Sonstiges ---------- */
  SZ.esc = function (s) {
    return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
  };
  SZ.NAMES = ['Mira', 'Jonas', 'Lea', 'Emil', 'Nele', 'Finn', 'Clara', 'Ben', 'Ida', 'Paul', 'Greta', 'Oskar', 'Frieda', 'Anton', 'Mathilda', 'Karl'];
})(typeof window !== 'undefined' ? window : globalThis);

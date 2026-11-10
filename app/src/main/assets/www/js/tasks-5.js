/* Silberzirkel – Aufgaben Klasse 5 (Lehrplan Sachsen, Gymnasium).
   Jede Aufgabe wird auf dem Gerät nach festen Regeln mit Zufallszahlen erzeugt. */
(function (g) {
  'use strict';
  var SZ = g.SZ, R = SZ.R, M = SZ.M, G = SZ.G, MC = SZ.MC, MCN = SZ.MCN, MCF = SZ.MCF, NUM = SZ.NUM, GAP = SZ.GAP, TF = SZ.TF, ORD = SZ.ORD, Fig = SZ.Fig, de = M.de;
  function rect(a, b, la, lb) { return Fig.shape({ P: [[0, 0], [a, 0], [a, b], [0, b]], s: [la, lb, '', ''], maxh: 120, fill: 'rgba(183,121,31,.16)' }); }

  /* ---------- 5-nat: Natürliche Zahlen ---------- */
  G('5-nat', 1, function () {
    var k = R.pick([[10, 'Zehner'], [100, 'Hunderter'], [1000, 'Tausender']]);
    var n = R.int(1200, 98000), r = Math.round(n / k[0]) * k[0];
    if (n % k[0] === 0) n += R.int(1, k[0] - 1);
    r = Math.round(n / k[0]) * k[0];
    var digit = Math.floor(n / (k[0] / 10)) % 10;
    return NUM('Runde $' + de(n) + '$ auf ' + k[1] + '.', r, { sol: 'Die Ziffer rechts von der Rundungsstelle ist ' + digit + ': Es wird ' + (digit >= 5 ? 'aufgerundet' : 'abgerundet') + '. Ergebnis: $' + de(r) + '$.', hint: 'Schau auf die Ziffer direkt rechts neben der Rundungsstelle: 0–4 abrunden, 5–9 aufrunden.' });
  });
  G('5-nat', 1, function () {
    var ds = R.sample([1, 2, 3, 4, 5, 6, 7, 8, 9], 5), n = +ds.join(''), i = R.int(0, 4), val = ds[i] * Math.pow(10, 4 - i);
    var names = ['Zehntausender', 'Tausender', 'Hunderter', 'Zehner', 'Einer'];
    return MCN('Welchen Wert hat die Ziffer ' + ds[i] + ' in der Zahl $' + de(n) + '$?', val, [ds[i], ds[i] * 10, ds[i] * 100, ds[i] * 1000, ds[i] * 10000], { sol: 'Die ' + ds[i] + ' steht an der Stelle der ' + names[i] + ', ihr Wert ist $' + de(val) + '$.' });
  });
  G('5-nat', 1, function () {
    var step = R.pick([10, 100, 20, 50]), a = step * R.int(0, 6), x = a + step * R.int(1, 9) + step / 2 * R.int(0, 1);
    if (x >= a + 10 * step) x = a + 5 * step;
    return NUM('Welche Zahl ist auf dem Zahlenstrahl markiert?', x, { fig: Fig.numline({ a: a, b: a + 10 * step, step: step, sub: 2, every: 5, marks: [{ x: x, l: '?' }] }), sol: 'Von einem langen Strich zum nächsten sind es ' + step + ', von Strich zu Strich also ' + step / 2 + '. Die markierte Zahl ist $' + de(x) + '$.', hint: 'Finde zuerst heraus, wie groß ein Schritt von Strich zu Strich ist.' });
  });
  G('5-nat', 2, function () {
    var n = R.int(11, 20);
    if (R.bool()) return NUM('Berechne die Quadratzahl: $' + n + '^2$', n * n, { sol: '$' + n + '^2 = ' + n + ' * ' + n + ' = ' + n * n + '$', hint: 'Quadrieren heißt: die Zahl mit sich selbst multiplizieren.' });
    return NUM('Welche natürliche Zahl ergibt mit sich selbst multipliziert $' + n * n + '$?', n, { sol: '$' + n + ' * ' + n + ' = ' + n * n + '$' });
  });
  G('5-nat', 2, function () {
    var e = R.int(2, 7), v = Math.pow(10, e);
    if (R.bool()) return MCN('Wie groß ist $10^' + e + '$?', v, [v * 10, v / 10, 10 * e, v / 100], { sol: '$10^' + e + '$ ist eine 1 mit ' + e + ' Nullen: $' + de(v) + '$.' });
    return NUM('Schreibe $' + de(v) + '$ als Zehnerpotenz: $10^n$. Wie groß ist $n$?', e, { pre: '$n =$', sol: 'Die Zahl hat ' + e + ' Nullen, also $' + de(v) + ' = 10^' + e + '$.' });
  });
  G('5-nat', 2, function () {
    var a = R.int(1, 8), d = R.sample([0, 3, 9, 4, 7], 3), base = a * 10000;
    var list = [base + d[0] * 1000 + d[1] * 100 + d[2], base + d[1] * 1000 + d[0] * 100 + d[2] * 10, base + d[0] * 1000 + d[2] * 100 + d[1] * 10, base + d[2] * 1000 + d[1] * 10 + d[0]];
    var uniq = list.filter(function (x, i) { return list.indexOf(x) === i; });
    if (uniq.length < 4) uniq = [base + 399, base + 3099, base + 939, base + 9003];
    uniq.sort(function (x, y) { return x - y; });
    return ORD('Ordne der Größe nach. Beginne mit der kleinsten Zahl.', uniq.map(function (x) { return '$' + de(x) + '$'; }), { sol: 'Vergleiche stellenweise von links: zuerst die Zehntausender, dann die Tausender, dann die Hunderter …' });
  });
  G('5-nat', 3, function () {
    var p = R.pick([[2, 5], [2, 6], [2, 7], [3, 3], [3, 4], [4, 3], [5, 3], [2, 8], [6, 3], [2, 10]]), v = Math.pow(p[0], p[1]);
    return MCN('Berechne die Potenz: $' + p[0] + '^' + p[1] + '$', v, [p[0] * p[1], Math.pow(p[1], p[0]), v + p[0], v / p[0]], { sol: '$' + p[0] + '^' + p[1] + '$ bedeutet: ' + p[1] + '-mal der Faktor ' + p[0] + '. Ergebnis: $' + de(v) + '$.', hint: 'Achtung: Potenzieren ist nicht Basis mal Exponent.' });
  });
  G('5-nat', 3, function () {
    var k = R.pick([10, 100, 1000]), r = k * R.int(12, 95), low = r - k / 2, high = r + k / 2 - 1, small = R.bool();
    return NUM('Eine natürliche Zahl wurde auf ' + (k === 10 ? 'Zehner' : k === 100 ? 'Hunderter' : 'Tausender') + ' gerundet. Das Ergebnis ist $' + de(r) + '$. Welches ist die ' + (small ? 'kleinste' : 'größte') + ' Zahl, die so gerundet wird?', small ? low : high, { sol: 'Ab $' + de(low) + '$ wird aufgerundet auf $' + de(r) + '$, bis $' + de(high) + '$ wird abgerundet. Bei $' + de(high + 1) + '$ würde schon zur nächsten Stufe aufgerundet.', hint: 'Ab der Ziffer 5 wird aufgerundet.' });
  });

  /* ---------- 5-teiler: Teiler & Primzahlen ---------- */
  G('5-teiler', 1, function () {
    var t = R.pick([3, 4, 6]), ok, opts = [], x;
    do { ok = R.int(34, 250) * t; } while (ok % 10 === 0);
    while (opts.length < 3) { x = ok + R.pick([-1, 1, 2, -2, 10, -10, 5, 7]) + t * R.int(-3, 3) * 0; if (x % t !== 0 && opts.indexOf(x) < 0 && x > 10) opts.push(x); }
    var why = t === 3 ? 'Die Quersumme muss durch 3 teilbar sein.' : t === 4 ? 'Die Zahl aus den letzten beiden Ziffern muss durch 4 teilbar sein.' : 'Die Zahl muss gerade sein und ihre Quersumme durch 3 teilbar.';
    return MCN('Welche dieser Zahlen ist durch ' + t + ' teilbar?', ok, opts, { sol: why + ' Das trifft nur auf $' + de(ok) + '$ zu.', hint: why });
  });
  G('5-teiler', 1, function () {
    var t = R.pick([3, 4, 6, 9, 5]), n = R.int(120, 990), truth = n % t === 0;
    if (R.bool() && !truth) { n = n - n % t; truth = true; }
    var why = t === 3 ? 'Quersumme prüfen' : t === 9 ? 'Quersumme prüfen (durch 9)' : t === 4 ? 'letzte zwei Ziffern prüfen' : t === 5 ? 'letzte Ziffer 0 oder 5?' : 'gerade und Quersumme durch 3?';
    var qs = String(n).split('').reduce(function (a, c) { return a + (+c); }, 0);
    return TF('Stimmt das? $' + n + '$ ist durch ' + t + ' teilbar.', truth, { sol: (t === 3 || t === 9 || t === 6 ? 'Quersumme: ' + qs + '. ' : '') + '$' + n + ' : ' + t + (truth ? ' = ' + n / t : '$ geht nicht auf: Rest $' + n % t) + '$.', hint: 'Regel: ' + why });
  });
  G('5-teiler', 2, function () {
    var primes = [23, 29, 31, 37, 41, 43, 47, 53, 59, 61, 67, 71, 73, 79, 83, 89, 97, 101, 103, 107, 109, 113];
    var comps = [21, 27, 33, 39, 49, 51, 57, 63, 69, 77, 81, 87, 91, 93, 99, 111, 117, 119];
    var p = R.pick(primes), cs = R.sample(comps, 3);
    return MCN('Welche dieser Zahlen ist eine Primzahl?', p, cs, { sol: cs.map(function (c) { var f = M.factors(c); return '$' + c + ' = ' + f[0] + ' * ' + c / f[0] + '$'; }).join(', ') + '. Nur ' + p + ' hat genau zwei Teiler.', hint: 'Prüfe die Teilbarkeit durch 3, 7 und 11.' });
  });
  G('5-teiler', 2, function () {
    var n = R.pick([12, 18, 20, 24, 28, 30, 36, 40, 42, 45, 48, 50, 54, 56, 60, 63, 72, 75, 84, 90, 96, 100]);
    var f = M.factors(n), cnt = {}, parts = [];
    f.forEach(function (p) { cnt[p] = (cnt[p] || 0) + 1; });
    Object.keys(cnt).forEach(function (p) { parts.push(cnt[p] > 1 ? p + '^' + cnt[p] : p); });
    var right = '$' + parts.join(' * ') + '$';
    var big = f[f.length - 1], rest = n / big;
    var wrongs = ['$' + (M.isPrime(rest) ? rest * big / f[0] + ' * ' + f[0] * 1 : rest + ' * ' + big) + '$', '$' + f.slice(0, -1).join(' * ') + '$', '$' + f[0] + ' * ' + n / f[0] + '$', '$' + parts.join(' + ') + '$', '$1 * ' + n + '$'];
    return MC('Welche Zerlegung ist die Primfaktorzerlegung von ' + n + '?', right, wrongs, { sol: 'Teile so lange durch die kleinste mögliche Primzahl: $' + n + ' = ' + f.join(' * ') + '$. In einer Primfaktorzerlegung dürfen nur Primzahlen stehen.', hint: 'Alle Faktoren müssen Primzahlen sein – und das Produkt muss ' + n + ' ergeben.' });
  });
  G('5-teiler', 2, function () {
    var n = R.pick([12, 16, 18, 20, 24, 28, 30, 32, 36, 40, 45, 48, 50, 60]), d = M.divisors(n);
    return NUM('Wie viele Teiler hat die Zahl ' + n + '?', d.length, { sol: 'Die Teiler sind ' + d.join(', ') + ' – das sind ' + d.length + ' Stück.', hint: 'Suche Teilerpaare: $1 * ' + n + '$, $2 * ' + n / 2 + '$ …' });
  });
  G('5-teiler', 2, function () {
    var b = R.int(3, 9), q = R.int(4, 12), r = R.int(1, b - 1), a = b * q + r;
    return GAP('Dividiere mit Rest: $' + a + ' : ' + b + '$', [{ pre: 'Ergebnis', ans: q }, { pre: 'Rest', ans: r }], { sol: '$' + q + ' * ' + b + ' = ' + q * b + '$, bis ' + a + ' fehlen noch ' + r + '. Also $' + a + ' : ' + b + ' = ' + q + '$ Rest $' + r + '$.', hint: 'Welches Vielfache von ' + b + ' liegt knapp unter ' + a + '?' });
  });
  G('5-teiler', 3, function () {
    var gd = R.pick([4, 6, 8, 9, 12, 15]), m = R.pick([[2, 3], [3, 4], [2, 5], [3, 5], [4, 5], [1, 2], [1, 3]]), a = gd * m[0], b = gd * m[1];
    return NUM('Welches ist die größte Zahl, die sowohl ' + a + ' als auch ' + b + ' teilt (größter gemeinsamer Teiler)?', gd, { sol: 'Teiler von ' + a + ': ' + M.divisors(a).join(', ') + '. Teiler von ' + b + ': ' + M.divisors(b).join(', ') + '. Der größte gemeinsame ist ' + gd + '.', hint: 'Schreibe die Teiler beider Zahlen auf und suche den größten gemeinsamen.' });
  });
  G('5-teiler', 3, function () {
    var a = R.int(1, 9), c = R.int(0, 9), ok = [], i;
    for (i = 0; i <= 9; i++) if ((a + i + c) % 3 === 0) ok.push(i);
    var right = R.pick(ok), wrong = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9].filter(function (x) { return ok.indexOf(x) < 0; });
    return MCN('Welche Ziffer kann für ▢ stehen, damit die Zahl ' + a + '▢' + c + ' durch 3 teilbar ist?', right, R.sample(wrong, 3), { sol: 'Die Quersumme $' + a + ' + ' + right + ' + ' + c + ' = ' + (a + right + c) + '$ ist durch 3 teilbar.', hint: 'Eine Zahl ist durch 3 teilbar, wenn ihre Quersumme durch 3 teilbar ist.' });
  });

  /* ---------- 5-gesetze: Rechengesetze & erste Gleichungen ---------- */
  G('5-gesetze', 1, function () {
    var a = R.int(2, 9), b = R.int(2, 9), c = R.int(2, 9), d = R.int(2, 5), v = R.int(0, 4), q, ans, sol;
    if (v === 0) { q = a + ' + ' + b + ' * ' + c; ans = a + b * c; sol = 'Punkt vor Strich: $' + b + ' * ' + c + ' = ' + b * c + '$, dann $' + a + ' + ' + b * c + ' = ' + ans + '$.'; }
    else if (v === 1) { q = '(' + a + ' + ' + b + ') * ' + c; ans = (a + b) * c; sol = 'Klammer zuerst: $' + (a + b) + ' * ' + c + ' = ' + ans + '$.'; }
    else if (v === 2) { q = (b * c + a * d) + ' - ' + (a * d) + ' : ' + d; ans = b * c + a * d - a; sol = 'Punkt vor Strich: $' + a * d + ' : ' + d + ' = ' + a + '$, dann $' + (b * c + a * d) + ' - ' + a + ' = ' + ans + '$.'; }
    else if (v === 3) { q = a + ' * ' + d + '^2'; ans = a * d * d; sol = 'Potenz vor Punkt: $' + d + '^2 = ' + d * d + '$, dann $' + a + ' * ' + d * d + ' = ' + ans + '$.'; }
    else { q = (a * c + b * c + 5) + ' - (' + a + ' + ' + b + ') * ' + c; ans = 5; sol = 'Klammer, dann Punkt, dann Strich: $' + (a + b) + ' * ' + c + ' = ' + (a + b) * c + '$ und $' + (a * c + b * c + 5) + ' - ' + (a + b) * c + ' = 5$.'; }
    return NUM('Berechne: $' + q + '$', ans, { sol: sol, hint: 'Reihenfolge: Klammern – Potenzen – Punktrechnung – Strichrechnung.' });
  });
  G('5-gesetze', 1, function () {
    if (R.bool()) {
      var p = R.pick([[25, 4], [5, 20], [50, 2], [125, 8], [5, 2]]), k = R.int(3, 19);
      return NUM('Rechne geschickt: $' + p[0] + ' * ' + k + ' * ' + p[1] + '$', p[0] * p[1] * k, { sol: 'Vertausche die Faktoren: $' + p[0] + ' * ' + p[1] + ' = ' + p[0] * p[1] + '$, dann mal ' + k + ': $' + de(p[0] * p[1] * k) + '$.', hint: 'Welche zwei Faktoren ergeben zusammen eine glatte Zahl?' });
    }
    var a = R.int(11, 89), b = 100 - a, c = R.int(12, 78);
    return NUM('Rechne geschickt: $' + a + ' + ' + c + ' + ' + b + '$', 100 + c, { sol: 'Vertausche die Summanden: $' + a + ' + ' + b + ' = 100$, dann $100 + ' + c + ' = ' + (100 + c) + '$.', hint: 'Zwei der Zahlen ergänzen sich zu 100.' });
  });
  G('5-gesetze', 2, function () {
    if (R.bool()) {
      var a = R.int(3, 9), d = R.int(1, 3), big = R.pick([100, 50, 20, 200]);
      return NUM('Rechne geschickt mit dem Distributivgesetz: $' + a + ' * ' + (big - d) + '$', a * (big - d), { sol: '$' + a + ' * (' + big + ' - ' + d + ') = ' + a * big + ' - ' + a * d + ' = ' + a * (big - d) + '$', hint: 'Zerlege den zweiten Faktor in eine glatte Zahl minus einen kleinen Rest.' });
    }
    var f = R.int(3, 12), x = R.int(11, 69), y = 100 - x;
    return NUM('Rechne geschickt: $' + f + ' * ' + x + ' + ' + f + ' * ' + y + '$', f * 100, { sol: 'Ausklammern: $' + f + ' * (' + x + ' + ' + y + ') = ' + f + ' * 100 = ' + f * 100 + '$', hint: 'Der Faktor ' + f + ' kommt in beiden Produkten vor.' });
  });
  G('5-gesetze', 2, function () {
    var v = R.int(0, 3), x = R.int(4, 40), a = R.int(5, 40), q, sol, va = R.pick(['x', 'a', 'b', 'y']);
    if (v === 0) { q = va + ' + ' + a + ' = ' + (x + a); sol = 'Umkehraufgabe: $' + (x + a) + ' - ' + a + ' = ' + x + '$'; }
    else if (v === 1) { q = va + ' - ' + a + ' = ' + x; x = x + a; sol = 'Umkehraufgabe: $' + (x - a) + ' + ' + a + ' = ' + x + '$'; }
    else if (v === 2) { a = R.int(3, 9); x = R.int(3, 12); q = a + ' * ' + va + ' = ' + a * x; sol = 'Umkehraufgabe: $' + a * x + ' : ' + a + ' = ' + x + '$'; }
    else { a = R.int(3, 9); var res = R.int(3, 12); x = a * res; q = va + ' : ' + a + ' = ' + res; sol = 'Umkehraufgabe: $' + res + ' * ' + a + ' = ' + x + '$'; }
    return NUM('Welche Zahl löst die Gleichung? $' + q + '$', x, { pre: '$' + va + ' =$', sol: sol, hint: 'Überlege die Umkehraufgabe – und mache danach die Probe.' });
  });
  G('5-gesetze', 1, function () {
    var abc = R.distinct(3, 2, 9), a = abc[0], b = abc[1], c = abc[2], v = R.int(0, 2);
    var eq = ['$' + a + ' * (' + b + ' + ' + c + ') = ' + a + ' * ' + b + ' + ' + a + ' * ' + c + '$', '$' + a + ' + ' + b + ' = ' + b + ' + ' + a + '$', '$(' + a + ' * ' + b + ') * ' + c + ' = ' + a + ' * (' + b + ' * ' + c + ')$'][v];
    var names = ['Distributivgesetz', 'Kommutativgesetz', 'Assoziativgesetz'];
    return MCF('Welches Rechengesetz wird hier benutzt?<br>' + eq, names, v, { sol: 'Kommutativ: vertauschen. Assoziativ: anders klammern. Distributiv: einen Faktor auf eine Summe verteilen. Hier ist es das ' + names[v] + '.' });
  });
  G('5-gesetze', 2, function () {
    var a = R.pick([2, 3, 4, 5, 6]) * 100 + R.pick([-3, -2, 2, 3, -4]), b = R.pick([2, 3, 4, 5]) * 10 + R.pick([-1, 1, -2, 2]);
    var ra = Math.round(a / 100) * 100, rb = Math.round(b / 10) * 10, est = ra * rb;
    return MCN('Überschlage: $' + a + ' * ' + b + '$ ist ungefähr …', est, [est * 10, est / 10, est + ra * 10 * 3, est / 2], { sol: 'Runde beide Faktoren: $' + ra + ' * ' + rb + ' = ' + de(est) + '$. (Genau: $' + de(a * b) + '$)', hint: 'Runde beide Faktoren auf glatte Zahlen.' });
  });
  G('5-gesetze', 3, function () {
    var a = R.int(2, 6), b = R.int(2, 6), c = R.int(2, 6), target = (a + b) * c;
    if (target === a + b * c) return null;
    return MC('Setze Klammern so, dass die Rechnung stimmt: $' + a + ' + ' + b + ' * ' + c + ' = ' + target + '$', '$(' + a + ' + ' + b + ') * ' + c + '$', ['$' + a + ' + (' + b + ' * ' + c + ')$', '$(' + a + ' + ' + b + ' * ' + c + ')$', 'Es sind keine Klammern nötig.'], { sol: 'Ohne Klammern gilt Punkt vor Strich: $' + a + ' + ' + b * c + ' = ' + (a + b * c) + '$. Mit der Klammer um die Summe: $' + (a + b) + ' * ' + c + ' = ' + target + '$.' });
  });
  G('5-gesetze', 3, function () {
    var a = R.int(3, 9), b = R.int(3, 9), c = R.int(a * b + 5, 99), v = R.int(0, 2);
    if (v === 0) return NUM('Subtrahiere das Produkt von ' + a + ' und ' + b + ' von ' + c + '.', c - a * b, { sol: 'Term: $' + c + ' - ' + a + ' * ' + b + ' = ' + c + ' - ' + a * b + ' = ' + (c - a * b) + '$', hint: 'Schreibe zuerst den Term auf. Was ist das Produkt?' });
    if (v === 1) return NUM('Multipliziere die Summe von ' + a + ' und ' + b + ' mit ' + (c % 9 + 2) + '.', (a + b) * (c % 9 + 2), { sol: 'Term: $(' + a + ' + ' + b + ') * ' + (c % 9 + 2) + ' = ' + (a + b) + ' * ' + (c % 9 + 2) + ' = ' + (a + b) * (c % 9 + 2) + '$', hint: 'Die Summe muss in eine Klammer.' });
    return NUM('Addiere zum Quotienten von ' + a * b + ' und ' + a + ' die Zahl ' + c + '.', b + c, { sol: 'Term: $' + a * b + ' : ' + a + ' + ' + c + ' = ' + b + ' + ' + c + ' = ' + (b + c) + '$', hint: 'Der Quotient ist das Ergebnis einer Division.' });
  });

  /* ---------- 5-bruch: Brüche ---------- */
  G('5-bruch', 1, function () {
    var d = R.pick([3, 4, 5, 6, 8, 10]), n = R.int(1, d - 1), kind = R.pick(['pie', 'bar']);
    return MC('Welcher Bruchteil ist gefärbt?', '${' + n + '/' + d + '}$', ['${' + (d - n) + '/' + d + '}$', '${' + n + '/' + (d + n) + '}$', '${' + d + '/' + n + '}$', '${' + n + '/' + (d - 1) + '}$', '${' + (n + 1) + '/' + d + '}$'], { fig: Fig.frac(n, d, kind), sol: 'Das Ganze ist in ' + d + ' gleiche Teile geteilt, ' + n + ' davon sind gefärbt: ${' + n + '/' + d + '}$.', hint: 'Nenner: in wie viele Teile geteilt? Zähler: wie viele gefärbt?' });
  });
  G('5-bruch', 1, function () {
    var d = R.pick([2, 3, 4, 5, 6, 8]), n = R.int(1, d - 1), k = R.int(2, 6);
    if (R.bool()) return NUM('Erweitere: ${' + n + '/' + d + '} = {?/' + d * k + '}$. Welche Zahl gehört in den Zähler?', n * k, { sol: 'Der Nenner wurde mit ' + k + ' multipliziert, also auch der Zähler: $' + n + ' * ' + k + ' = ' + n * k + '$.', hint: 'Womit wurde der Nenner multipliziert?' });
    return NUM('Erweitere: ${' + n + '/' + d + '} = {' + n * k + '/?}$. Welche Zahl gehört in den Nenner?', d * k, { sol: 'Der Zähler wurde mit ' + k + ' multipliziert, also auch der Nenner: $' + d + ' * ' + k + ' = ' + d * k + '$.', hint: 'Womit wurde der Zähler multipliziert?' });
  });
  G('5-bruch', 1, function () {
    var f = R.pick([[1, 2], [1, 3], [2, 3], [1, 4], [3, 4], [2, 5], [3, 5], [4, 5], [5, 6], [3, 8], [5, 8], [7, 10]]), k = R.pick([2, 3, 4, 5, 6, 8]);
    return NUM('Kürze vollständig: ${' + f[0] * k + '/' + f[1] * k + '}$ (Eingabe mit Bruchstrich, z. B. 3/4)', M.F(f[0], f[1]), { reduced: true, sol: 'Zähler und Nenner durch ' + k + ' teilen: ${' + f[0] + '/' + f[1] + '}$.', hint: 'Suche die größte Zahl, die Zähler und Nenner teilt.' });
  });
  G('5-bruch', 2, function () {
    var d = R.pick([3, 4, 5, 6, 8]), n = R.int(1, d - 1), part = R.int(2, 12), whole = d * part, u = R.pick(['kg', 'm', 'Taler', 'Liter', 'Minuten']);
    return NUM('Wie viel sind ${' + n + '/' + d + '}$ von ' + whole + ' ' + u + '?', n * part, { unit: u, sol: 'Erst durch ' + d + ' teilen: $' + whole + ' : ' + d + ' = ' + part + '$. Dann mal ' + n + ': $' + n * part + '$ ' + u + '.', hint: 'Erst durch den Nenner teilen, dann mit dem Zähler multiplizieren.' });
  });
  G('5-bruch', 2, function () {
    var a, b;
    do { a = [R.int(1, 7), R.pick([3, 4, 5, 6, 8])]; b = [R.int(1, 7), R.pick([3, 4, 5, 6, 8])]; } while (a[0] >= a[1] || b[0] >= b[1] || a[1] === b[1]);
    var cmp = a[0] * b[1] - b[0] * a[1], hn = M.lcm(a[1], b[1]);
    return MCF('Welcher Bruch ist größer?', ['${' + a[0] + '/' + a[1] + '}$', '${' + b[0] + '/' + b[1] + '}$', 'Beide sind gleich groß.'], cmp > 0 ? 0 : cmp < 0 ? 1 : 2, { sol: 'Gleichnamig machen (Nenner ' + hn + '): ${' + a[0] * hn / a[1] + '/' + hn + '}$ und ${' + b[0] * hn / b[1] + '/' + hn + '}$.', hint: 'Erweitere beide Brüche auf denselben Nenner.' });
  });
  G('5-bruch', 2, function () {
    var d = R.pick([2, 3, 4, 5, 7]), w = R.int(1, 4), r = R.int(1, d - 1), n = w * d + r;
    if (M.gcd(r, d) > 1) r = 1, n = w * d + r;
    return MC('Schreibe ${' + n + '/' + d + '}$ als gemischte Zahl.', '$' + w + '{' + r + '/' + d + '}$', ['$' + r + '{' + w + '/' + d + '}$', '$' + (w + 1) + '{' + r + '/' + d + '}$', '$' + w + '{' + (d - r === r ? r + 1 : d - r) + '/' + (d - r === r ? d + 1 : d) + '}$', '$' + (w - 1 || 5) + '{' + r + '/' + d + '}$'], { sol: '$' + n + ' : ' + d + ' = ' + w + '$ Rest $' + r + '$. Also ' + w + ' Ganze und ${' + r + '/' + d + '}$.', hint: 'Wie oft passt der Nenner ganz in den Zähler? Der Rest bleibt als Bruch.' });
  });
  G('5-bruch', 2, function () {
    var d = R.pick([2, 3, 4, 5]), n = R.int(1, 2 * d - 1);
    if (M.gcd(n, d) > 1) n = d + 1;
    return MC('Welcher Bruch ist auf dem Zahlenstrahl markiert?', '${' + n + '/' + d + '}$', ['${' + d + '/' + n + '}$', '${' + (n + 1) + '/' + d + '}$', '${' + n + '/' + (d + 1) + '}$', '${' + (n - 1 || n + 2) + '/' + d + '}$'], { fig: Fig.numline({ a: 0, b: 2, step: 1, sub: d, marks: [{ x: n / d, l: '?' }] }), sol: 'Zwischen 0 und 1 liegen ' + d + ' gleiche Abschnitte, jeder ist ${1/' + d + '}$ lang. Die Markierung liegt beim ' + n + '. Strich: ${' + n + '/' + d + '}$.', hint: 'In wie viele Teile ist die Strecke von 0 bis 1 geteilt?' });
  });
  G('5-bruch', 3, function () {
    var d = R.pick([3, 4, 5, 6]), n = R.int(2, d - 1), part = R.int(2, 9), u = R.pick(['km', 'kg', 'Taler', 'Seiten']);
    return NUM('${' + n + '/' + d + '}$ einer Größe sind ' + n * part + ' ' + u + '. Wie groß ist das Ganze?', d * part, { unit: u, sol: '${1/' + d + '}$ sind $' + n * part + ' : ' + n + ' = ' + part + '$ ' + u + '. Das Ganze sind ' + d + ' solche Teile: $' + d * part + '$ ' + u + '.', hint: 'Berechne zuerst, wie groß ein einzelner Teil ist.' });
  });
  G('5-bruch', 3, function () {
    var sets = [[[1, 2], [2, 3], [3, 4], [5, 6]], [[1, 4], [1, 3], [1, 2], [3, 5]], [[1, 6], [1, 4], [1, 3], [5, 12]], [[2, 5], [1, 2], [3, 5], [7, 10]], [[1, 8], [1, 4], [3, 8], [1, 2]], [[1, 3], [5, 12], [1, 2], [7, 12]]];
    var s = R.pick(sets);
    return ORD('Ordne die Brüche der Größe nach. Beginne mit dem kleinsten.', s.map(function (f) { return '${' + f[0] + '/' + f[1] + '}$'; }), { sol: 'Bringe alle Brüche auf einen gemeinsamen Nenner und vergleiche die Zähler.', hint: 'Finde einen gemeinsamen Nenner für alle Brüche.' });
  });

  /* ---------- 5-dezimal: Dezimalzahlen & Prozent ---------- */
  var FD = [[1, 2, 0.5], [1, 4, 0.25], [3, 4, 0.75], [1, 5, 0.2], [2, 5, 0.4], [3, 5, 0.6], [4, 5, 0.8], [1, 10, 0.1], [3, 10, 0.3], [7, 10, 0.7], [9, 10, 0.9], [1, 20, 0.05], [7, 20, 0.35], [3, 20, 0.15], [1, 25, 0.04], [3, 25, 0.12], [1, 8, 0.125], [3, 8, 0.375], [9, 20, 0.45], [11, 50, 0.22]];
  G('5-dezimal', 1, function () {
    var f = R.pick(FD);
    if (R.bool()) return NUM('Schreibe als Dezimalzahl: ${' + f[0] + '/' + f[1] + '}$', f[2], { sol: 'Erweitere auf einen Zehnerbruch: ${' + f[0] + '/' + f[1] + '} = {' + f[2] * 1000 + '/1000} = ' + de(f[2]) + '$', hint: 'Erweitere auf den Nenner 10, 100 oder 1000.' });
    return NUM('Schreibe in Prozent: ${' + f[0] + '/' + f[1] + '}$', M.round(f[2] * 100, 2), { unit: '%', sol: '${' + f[0] + '/' + f[1] + '} = ' + de(f[2]) + ' = ' + de(f[2] * 100) + ' %$', hint: 'Prozent heißt Hundertstel: Erweitere auf den Nenner 100.' });
  });
  G('5-dezimal', 1, function () {
    var p = R.int(1, 99);
    if (R.bool()) return NUM('Schreibe als Dezimalzahl: $' + p + ' %$', p / 100, { sol: '$' + p + ' % = {' + p + '/100} = ' + de(p / 100) + '$', hint: 'Prozent bedeutet „von hundert“.' });
    return NUM('Schreibe in Prozent: $' + de(p / 100) + '$', p, { unit: '%', sol: '$' + de(p / 100) + ' = {' + p + '/100} = ' + p + ' %$', hint: 'Wie viele Hundertstel sind es?' });
  });
  G('5-dezimal', 1, function () {
    var a = R.int(105, 2990) / 100, b = R.int(11, 199) / 10, plus = R.bool();
    if (!plus && b > a) { var t = a; a = b; b = t; }
    var r = M.round(plus ? a + b : a - b, 2);
    return NUM('Berechne: $' + de(a) + (plus ? ' + ' : ' - ') + de(b) + '$', r, { sol: 'Komma unter Komma schreiben und stellenweise rechnen: $' + de(r) + '$.', hint: 'Schreibe die Zahlen untereinander – Komma unter Komma. Fehlende Stellen mit 0 auffüllen.' });
  });
  G('5-dezimal', 2, function () {
    var x = R.pick([R.int(11, 999) / 10, R.int(11, 999) / 100, R.int(2, 99) / 1000]), k = R.pick([10, 100, 1000]), mul = R.bool();
    var r = M.round(mul ? x * k : x / k, 6), st = String(k).length - 1;
    if (M.round(r, 4) !== r) return null;
    return NUM('Berechne: $' + de(x) + (mul ? ' * ' : ' : ') + de(k) + '$', r, { sol: 'Das Komma rückt um ' + st + ' Stelle' + (st > 1 ? 'n' : '') + ' nach ' + (mul ? 'rechts' : 'links') + ': $' + de(r) + '$.', hint: 'Zähle die Nullen der Zehnerpotenz – so weit wandert das Komma.' });
  });
  G('5-dezimal', 2, function () {
    var k = R.int(2, 9);
    if (R.bool()) { var x = R.int(12, 95) / 10; return NUM('Berechne: $' + de(x) + ' * ' + k + '$', M.round(x * k, 2), { sol: 'Rechne erst ohne Komma: $' + x * 10 + ' * ' + k + ' = ' + M.round(x * 10 * k) + '$. Eine Nachkommastelle: $' + de(x * k) + '$.', hint: 'Rechne zuerst ohne Komma und setze es dann wieder ein.' }); }
    var q = R.int(3, 19) / 10, d = M.round(q * k, 2);
    return NUM('Berechne: $' + de(d) + ' : ' + k + '$', q, { sol: '$' + M.round(d * 10) + ' : ' + k + ' = ' + M.round(q * 10) + '$, also $' + de(d) + ' : ' + k + ' = ' + de(q) + '$.', hint: 'Denke dir die Zahl in Zehnteln: Wie viele Zehntel sind es?' });
  });
  G('5-dezimal', 2, function () {
    var a = R.int(1, 8), b = R.intNot(1, 9, [a]), list = [a / 10, (a * 10 + b) / 100, (a * 100 + b) / 1000, (a * 10 + b) / 10];
    list = list.concat([(b * 10 + a) / 100]).filter(function (x, i, arr) { return arr.indexOf(x) === i; }).slice(0, 4);
    list.sort(function (x, y) { return x - y; });
    return ORD('Ordne der Größe nach. Beginne mit der kleinsten Zahl.', list.map(function (x) { return '$' + de(x) + '$'; }), { sol: 'Vergleiche stellenweise von links: erst die Einer, dann die Zehntel, dann die Hundertstel.', hint: 'Fülle mit Nullen auf gleiche Länge auf: 0,5 = 0,500.' });
  });
  G('5-dezimal', 2, function () {
    var k = R.pick([[1, 'Zehntel'], [2, 'Hundertstel'], [0, 'Einer']]);
    var x = M.round(R.int(1, 9) + R.int(0, 9) / 10 + R.int(0, 9) / 100 + R.pick([1, 2, 3, 4, 6, 7, 8, 9]) / 1000, 3);
    return NUM('Runde $' + de(x) + '$ auf ' + k[1] + '.', M.round(x, k[0]), { sol: 'Die Ziffer rechts von der Rundungsstelle entscheidet: $' + de(M.round(x, k[0])) + '$.', hint: 'Dieselbe Regel wie bei natürlichen Zahlen: 0–4 abrunden, 5–9 aufrunden.' });
  });
  G('5-dezimal', 3, function () {
    var p = R.pick([5, 10, 12, 15, 20, 24, 25, 30, 35, 40, 45, 60, 64, 75, 80, 85]), f = M.F(p, 100);
    return NUM('Schreibe $' + p + ' %$ als vollständig gekürzten Bruch (z. B. 3/4).', f, { reduced: true, sol: '$' + p + ' % = {' + p + '/100} = {' + f.n + '/' + f.d + '}$', hint: 'Prozent heißt Hundertstel. Danach kürzen.' });
  });
  G('5-dezimal', 3, function () {
    var ds = R.sample([1, 2, 3, 4, 5, 6, 7, 8, 9], 5), s = '' + ds[0] + ds[1] + ',' + ds[2] + ds[3] + ds[4], i = R.int(0, 4);
    var names = ['Zehnerstelle', 'Einerstelle', 'Zehntelstelle', 'Hundertstelstelle', 'Tausendstelstelle'];
    return NUM('Welche Ziffer steht in $' + s + '$ an der ' + names[i] + '?', ds[i], { sol: 'Links vom Komma: Zehner, Einer. Rechts vom Komma: Zehntel, Hundertstel, Tausendstel. Gesucht: ' + ds[i] + '.', hint: 'Die erste Stelle nach dem Komma sind die Zehntel.' });
  });

  /* ---------- 5-mittel: Arithmetisches Mittel ---------- */
  G('5-mittel', 1, function () {
    var n = R.int(3, 5), mean = R.int(4, 20), vals = [], sum = 0, i;
    for (i = 0; i < n - 1; i++) { vals.push(mean + R.int(-3, 3)); sum += vals[i]; }
    vals.push(mean * n - sum);
    if (vals[n - 1] < 0) return null;
    return NUM('Berechne das arithmetische Mittel von ' + vals.join('; ') + '.', mean, { sol: 'Summe: $' + vals.join(' + ') + ' = ' + mean * n + '$. Geteilt durch ' + n + ': $' + mean + '$.', hint: 'Alle Werte addieren, dann durch die Anzahl teilen.' });
  });
  G('5-mittel', 1, function () {
    var days = ['Mo', 'Di', 'Mi', 'Do', 'Fr'], mean = R.int(4, 9), vals = [mean - 2, mean + 1, mean, mean + 3, mean - 2];
    vals = R.shuffle(vals);
    return NUM('Das Diagramm zeigt, wie viele Seiten ' + R.pick(SZ.NAMES) + ' an fünf Tagen im Zauberbuch gelesen hat. Wie viele Seiten waren es im Durchschnitt pro Tag?', mean, { fig: Fig.bars({ labels: days, vals: vals, showVals: true, step: 2 }), sol: 'Summe: $' + vals.join(' + ') + ' = ' + mean * 5 + '$. Geteilt durch 5: $' + mean + '$.', hint: 'Lies alle fünf Werte ab, addiere sie und teile durch 5.' });
  });
  G('5-mittel', 2, function () {
    var n = R.pick([2, 4, 5]), vals = [], sum = 0, i;
    for (i = 0; i < n; i++) { vals.push(R.int(1, 15)); sum += vals[i]; }
    return NUM('Berechne das arithmetische Mittel von ' + vals.join('; ') + '.', sum / n, { sol: 'Summe: $' + sum + '$. Geteilt durch ' + n + ': $' + de(sum / n) + '$.', hint: 'Das Ergebnis darf eine Dezimalzahl sein.' });
  });
  G('5-mittel', 2, function () {
    var name = R.pick(SZ.NAMES), n = R.pick([4, 5]), vals = [], sum = 0, i;
    for (i = 0; i < n; i++) { vals.push(R.int(8, 20) / 2 + 10); sum += vals[i]; }
    var mean = M.round(sum / n, 3);
    if (M.round(mean * 100) !== mean * 100) return null;
    return NUM(name + ' misst an ' + n + ' Tagen die Temperatur im Kräutergarten: ' + vals.map(function (v) { return de(v) + ' °C'; }).join('; ') + '. Wie hoch war die Durchschnittstemperatur?', mean, { unit: '°C', sol: 'Summe: $' + de(sum) + '$ °C. Geteilt durch ' + n + ': $' + de(mean) + '$ °C.', hint: 'Addiere die Dezimalzahlen stellenweise.' });
  });
  G('5-mittel', 3, function () {
    var n = R.pick([3, 4, 5]), mean = R.int(5, 12), vals = [], sum = 0, i;
    for (i = 0; i < n - 1; i++) { vals.push(mean + R.int(-3, 3)); sum += vals[i]; }
    var last = mean * n - sum;
    if (last < 1) return null;
    return NUM('Der Durchschnitt von ' + n + ' Zahlen ist ' + mean + '. ' + (n - 1) + ' der Zahlen sind ' + vals.join('; ') + '. Wie heißt die fehlende Zahl?', last, { sol: 'Die Summe aller Zahlen muss $' + n + ' * ' + mean + ' = ' + n * mean + '$ sein. Bekannt sind $' + sum + '$, also fehlt $' + last + '$.', hint: 'Rückwärts denken: Wie groß muss die Summe aller Zahlen sein?' });
  });
  G('5-mittel', 2, function () {
    var st = R.pick([['Das arithmetische Mittel liegt nie unter dem kleinsten und nie über dem größten Wert.', true, 'Beim gleichmäßigen Verteilen kann niemand mehr bekommen als der größte Wert.'], ['Das arithmetische Mittel ist immer einer der Werte aus der Liste.', false, 'Gegenbeispiel: Das Mittel von 1 und 2 ist 1,5.'], ['Sind alle Werte gleich, dann ist das arithmetische Mittel genau dieser Wert.', true, 'Es gibt nichts auszugleichen.'], ['Kommt ein Wert dazu, der größer ist als der bisherige Durchschnitt, dann steigt der Durchschnitt.', true, 'Der neue Wert zieht den Ausgleich nach oben.'], ['Das arithmetische Mittel von zwei Zahlen liegt auf dem Zahlenstrahl genau in der Mitte zwischen ihnen.', true, 'Von der Mitte aus ist es zu beiden Zahlen gleich weit.'], ['Verdoppelt man alle Werte, bleibt das arithmetische Mittel gleich.', false, 'Auch die Summe verdoppelt sich – und damit das Mittel.']]);
    return TF('Wahr oder falsch? ' + st[0], st[1], { sol: st[2] });
  });

  /* ---------- 5-koord: Koordinatensystem ---------- */
  function grid(o) { o.x = [0, 8]; o.y = [0, 8]; o.w = 230; return Fig.graph(o); }
  G('5-koord', 1, function () {
    var x = R.int(1, 7), y = R.intNot(1, 7, [x]);
    return MC('Welche Koordinaten hat der Punkt $P$?', '$P(' + x + '|' + y + ')$', ['$P(' + y + '|' + x + ')$', '$P(' + (x + 1) + '|' + y + ')$', '$P(' + x + '|' + (y - 1 || y + 1) + ')$'], { fig: grid({ pts: [{ x: x, y: y, l: 'P' }] }), sol: 'Vom Ursprung ' + x + ' nach rechts ($x$-Wert) und ' + y + ' nach oben ($y$-Wert): $P(' + x + '|' + y + ')$.', hint: 'Erst nach rechts ($x$), dann nach oben ($y$).' });
  });
  G('5-koord', 1, function () {
    var x = R.int(0, 7), y = R.int(0, 7);
    if (x === 0 && y === 0) x = 3;
    return GAP('Lies die Koordinaten des Punktes $A$ ab.', [{ pre: '$x =$', ans: x }, { pre: '$y =$', ans: y }], { fig: grid({ pts: [{ x: x, y: y, l: 'A' }] }), sol: '$A(' + x + '|' + y + ')$: ' + x + ' nach rechts, ' + y + ' nach oben.', hint: 'Der $x$-Wert steht auf der waagerechten Achse.' });
  });
  G('5-koord', 2, function () {
    var hor = R.bool(), a = R.int(0, 3), b = R.int(a + 2, 8), c = R.int(1, 7);
    var A = hor ? [a, c] : [c, a], B = hor ? [b, c] : [c, b];
    return NUM('Wie lang ist die Strecke von $A(' + A[0] + '|' + A[1] + ')$ nach $B(' + B[0] + '|' + B[1] + ')$ (in Längeneinheiten)?', b - a, { fig: grid({ pts: [{ x: A[0], y: A[1], l: 'A' }, { x: B[0], y: B[1], l: 'B' }], segs: [[A[0], A[1], B[0], B[1]]] }), sol: 'Die Punkte haben denselben ' + (hor ? '$y$' : '$x$') + '-Wert. Länge: $' + b + ' - ' + a + ' = ' + (b - a) + '$.', hint: 'Welche Koordinate ist bei beiden Punkten gleich? Die andere zeigt den Abstand.' });
  });
  G('5-koord', 2, function () {
    var x1 = R.int(0, 3), x2 = R.int(x1 + 2, 8), y1 = R.int(0, 3), y2 = R.int(y1 + 2, 8);
    return GAP('$A(' + x1 + '|' + y1 + ')$, $B(' + x2 + '|' + y1 + ')$ und $C(' + x2 + '|' + y2 + ')$ sind drei Ecken eines Rechtecks $ABCD$. Welche Koordinaten hat $D$?', [{ pre: '$x =$', ans: x1 }, { pre: '$y =$', ans: y2 }], { fig: grid({ pts: [{ x: x1, y: y1, l: 'A' }, { x: x2, y: y1, l: 'B' }, { x: x2, y: y2, l: 'C' }], segs: [[x1, y1, x2, y1], [x2, y1, x2, y2]] }), sol: '$D$ liegt senkrecht über $A$ (gleicher $x$-Wert ' + x1 + ') und auf gleicher Höhe wie $C$ (gleicher $y$-Wert ' + y2 + '): $D(' + x1 + '|' + y2 + ')$.', hint: '$D$ liegt über $A$ und links von $C$.' });
  });
  G('5-koord', 2, function () {
    var v = R.int(0, 2), a = R.int(1, 7), b = R.int(0, 3), c = R.int(b + 2, 8), q;
    if (v === 0) q = '$A(' + a + '|' + b + ')$ und $B(' + a + '|' + c + ')$';
    else if (v === 1) q = '$A(' + b + '|' + a + ')$ und $B(' + c + '|' + a + ')$';
    else q = '$A(' + b + '|' + b + ')$ und $B(' + c + '|' + c + ')$';
    return MCF('Wie verläuft die Gerade durch ' + q + '?', ['parallel zur $y$-Achse', 'parallel zur $x$-Achse', 'zu keiner Achse parallel'], v, { sol: v === 0 ? 'Beide Punkte haben denselben $x$-Wert – die Gerade verläuft senkrecht, also parallel zur $y$-Achse.' : v === 1 ? 'Beide Punkte haben denselben $y$-Wert – die Gerade verläuft waagerecht, also parallel zur $x$-Achse.' : 'Weder die $x$- noch die $y$-Werte stimmen überein: Die Gerade verläuft schräg.', hint: 'Welche Koordinate bleibt gleich?' });
  });
  G('5-koord', 3, function () {
    var x1 = R.int(0, 3), x2 = R.int(x1 + 2, 8), y1 = R.int(0, 3), y2 = R.int(y1 + 2, 8), w = x2 - x1, h = y2 - y1, area = R.bool();
    return NUM('Ein Rechteck hat die Ecken $A(' + x1 + '|' + y1 + ')$, $B(' + x2 + '|' + y1 + ')$, $C(' + x2 + '|' + y2 + ')$ und $D(' + x1 + '|' + y2 + ')$. Wie groß ist sein ' + (area ? 'Flächeninhalt (in Kästchen)' : 'Umfang (in Längeneinheiten)') + '?', area ? w * h : 2 * (w + h), { fig: grid({ polys: [{ P: [[x1, y1], [x2, y1], [x2, y2], [x1, y2]] }] }), sol: 'Seitenlängen: $' + x2 + ' - ' + x1 + ' = ' + w + '$ und $' + y2 + ' - ' + y1 + ' = ' + h + '$. ' + (area ? '$A = ' + w + ' * ' + h + ' = ' + w * h + '$' : '$u = 2 * (' + w + ' + ' + h + ') = ' + 2 * (w + h) + '$'), hint: 'Bestimme zuerst die beiden Seitenlängen aus den Koordinaten.' });
  });
  G('5-koord', 3, function () {
    var hor = R.bool(), a = R.int(0, 3), len = 2 * R.int(1, 2), b = a + len, c = R.int(1, 7), m = a + len / 2;
    var A = hor ? [a, c] : [c, a], B = hor ? [b, c] : [c, b], Mi = hor ? [m, c] : [c, m];
    return GAP('Welche Koordinaten hat der Mittelpunkt der Strecke von $A(' + A[0] + '|' + A[1] + ')$ nach $B(' + B[0] + '|' + B[1] + ')$?', [{ pre: '$x =$', ans: Mi[0] }, { pre: '$y =$', ans: Mi[1] }], { sol: 'Die Strecke ist ' + len + ' Einheiten lang. Der Mittelpunkt liegt ' + (len === 2 ? '1 Einheit' : len / 2 + ' Einheiten') + ' von $A$ entfernt: $M(' + Mi[0] + '|' + Mi[1] + ')$.', hint: 'Der Mittelpunkt ist von beiden Endpunkten gleich weit entfernt.' });
  });

  /* ---------- 5-winkel: Winkel ---------- */
  G('5-winkel', 1, function () {
    var kinds = [['spitzer Winkel', R.int(5, 89)], ['rechter Winkel', 90], ['stumpfer Winkel', R.int(91, 179)], ['gestreckter Winkel', 180], ['überstumpfer Winkel', R.int(181, 359)]], i = R.pick([0, 0, 2, 2, 4, 4, 1, 3]);
    return MCF('Ein Winkel misst ' + kinds[i][1] + '°. Welche Winkelart ist das?', kinds.map(function (k) { return k[0]; }), i, { sol: 'Spitz: unter 90°. Recht: 90°. Stumpf: zwischen 90° und 180°. Gestreckt: 180°. Überstumpf: über 180°.' });
  });
  G('5-winkel', 1, function () {
    var a = R.int(25, 155);
    return NUM('Die beiden Geraden schneiden sich. Wie groß ist der Winkel $β$?', 180 - a, { unit: '°', fig: Fig.cross(Math.min(Math.max(a, 35), 145), [a + '°', 'β', '', '']), sol: '$β$ ist Nebenwinkel des gegebenen Winkels: $180° - ' + a + '° = ' + (180 - a) + '°$.', hint: 'Nebenwinkel ergänzen sich zu 180°.' });
  });
  G('5-winkel', 1, function () {
    var a = R.int(25, 155);
    return NUM('Die beiden Geraden schneiden sich. Wie groß ist der Winkel $γ$?', a, { unit: '°', fig: Fig.cross(Math.min(Math.max(a, 35), 145), [a + '°', '', 'γ', '']), sol: '$γ$ liegt dem gegebenen Winkel gegenüber: Scheitelwinkel sind gleich groß, also ' + a + '°.', hint: 'Scheitelwinkel sind gleich groß.' });
  });
  G('5-winkel', 2, function () {
    var th = R.int(40, 80), v = R.int(0, 3), up, lo, ans, why;
    if (v === 0) { up = { tr: th + '°' }; lo = { tr: '?' }; ans = th; why = 'Stufenwinkel an Parallelen sind gleich groß.'; }
    else if (v === 1) { up = { bl: th + '°' }; lo = { tr: '?' }; ans = th; why = 'Wechselwinkel an Parallelen sind gleich groß.'; }
    else if (v === 2) { up = { tr: th + '°' }; lo = { tl: '?' }; ans = 180 - th; why = 'Der Stufenwinkel ist ' + th + '° groß, der gesuchte Winkel ist dessen Nebenwinkel: $180° - ' + th + '°$.'; }
    else { up = { tl: (180 - th) + '°' }; lo = { tl: '?' }; ans = 180 - th; why = 'Stufenwinkel an Parallelen sind gleich groß.'; }
    return NUM('Die Geraden $g$ und $h$ sind parallel. Wie groß ist der mit ? markierte Winkel?', ans, { unit: '°', fig: Fig.parallel(th, up, lo), sol: why + ' Ergebnis: ' + ans + '°.', hint: 'Suche nach Stufen-, Wechsel-, Neben- oder Scheitelwinkeln.' });
  });
  G('5-winkel', 2, function () {
    var th = R.int(45, 75), v = R.int(0, 3), up, lo;
    var names = ['Stufenwinkel', 'Wechselwinkel', 'Nebenwinkel', 'Scheitelwinkel'];
    if (v === 0) { up = { tr: 'α' }; lo = { tr: 'β' }; }
    else if (v === 1) { up = { bl: 'α' }; lo = { tr: 'β' }; }
    else if (v === 2) { up = { tr: 'α', tl: 'β' }; lo = {}; }
    else { up = { tr: 'α', bl: 'β' }; lo = {}; }
    return MCF('Die Geraden $g$ und $h$ sind parallel. Wie heißt das Winkelpaar $α$ und $β$?', names, v, { fig: Fig.parallel(th, up, lo), sol: 'Stufenwinkel: gleiche Lage an beiden Kreuzungen. Wechselwinkel: zwischen den Parallelen auf verschiedenen Seiten. Nebenwinkel: nebeneinander an einer Geraden. Scheitelwinkel: gegenüber an einer Kreuzung.' });
  });
  G('5-winkel', 2, function () {
    var m = R.pick([5, 10, 15, 20, 25, 35, 40, 45, 50]);
    return NUM('Welchen Winkel überstreicht der Minutenzeiger einer Uhr in ' + m + ' Minuten?', m * 6, { unit: '°', sol: 'In 60 Minuten schafft er 360°, in einer Minute also 6°. $' + m + ' * 6° = ' + m * 6 + '°$.', hint: 'Eine volle Umdrehung (360°) dauert 60 Minuten.' });
  });
  G('5-winkel', 3, function () {
    var full = R.bool(), a = R.int(35, 80), b = R.int(40, 85), tot = full ? 360 : 180, c = full ? R.int(90, 140) : 0, x = tot - a - b - c;
    if (x < 15) return null;
    return NUM(full ? 'Vier Winkel liegen rund um einen Punkt und bilden zusammen einen Vollwinkel. Drei davon messen ' + a + '°, ' + b + '° und ' + c + '°. Wie groß ist der vierte?' : 'Drei Winkel liegen nebeneinander an einer Geraden und bilden zusammen einen gestreckten Winkel. Zwei davon messen ' + a + '° und ' + b + '°. Wie groß ist der dritte?', x, { unit: '°', sol: '$' + tot + '° - ' + a + '° - ' + b + '°' + (full ? ' - ' + c + '°' : '') + ' = ' + x + '°$', hint: full ? 'Ein Vollwinkel hat 360°.' : 'Ein gestreckter Winkel hat 180°.' });
  });
  G('5-winkel', 3, function () {
    var k = R.pick([2, 3, 4, 5, 8]), small = 180 / (k + 1);
    if (small % 1 !== 0) return null;
    return NUM('Ein Winkel ist ' + k + '-mal so groß wie sein Nebenwinkel. Wie groß ist der kleinere der beiden Winkel?', small, { unit: '°', sol: 'Zusammen sind es 180°, aufgeteilt in $' + k + ' + 1 = ' + (k + 1) + '$ gleiche Teile: $180° : ' + (k + 1) + ' = ' + small + '°$. Der größere misst ' + small * k + '°.', hint: 'Nebenwinkel ergeben zusammen 180°. In wie viele gleiche Teile wird geteilt?' });
  });

  /* ---------- 5-symm: Symmetrie & Spiegelung ---------- */
  var SHAPES = [
    ['Quadrat', 4, true, function () { return Fig.regular(4); }],
    ['Rechteck (kein Quadrat)', 2, true, function () { return Fig.shape({ P: [[0, 0], [5, 0], [5, 3], [0, 3]], w: 170, pad: 16, maxh: 100 }); }],
    ['gleichseitiges Dreieck', 3, false, function () { return Fig.regular(3); }],
    ['gleichschenkliges Dreieck (nicht gleichseitig)', 1, false, function () { return Fig.shape({ P: [[0, 0], [3, 0], [1.5, 4]], w: 150, pad: 16, maxh: 110 }); }],
    ['regelmäßiges Fünfeck', 5, false, function () { return Fig.regular(5); }],
    ['regelmäßiges Sechseck', 6, true, function () { return Fig.regular(6); }],
    ['Raute (kein Quadrat)', 2, true, function () { return Fig.shape({ P: [[0, 2], [3, 0], [6, 2], [3, 4]], w: 170, pad: 16, maxh: 100 }); }],
    ['Parallelogramm (keine Raute, kein Rechteck)', 0, true, function () { return Fig.shape({ P: [[0, 0], [5, 0], [6.5, 3], [1.5, 3]], w: 180, pad: 16, maxh: 100 }); }],
    ['Drachenviereck (keine Raute)', 1, false, function () { return Fig.shape({ P: [[0, 3.6], [2, 0], [4, 3.6], [2, 5]], w: 150, pad: 16, maxh: 110 }); }],
    ['gleichschenkliges Trapez', 1, false, function () { return Fig.shape({ P: [[0, 0], [6, 0], [4.5, 3], [1.5, 3]], w: 180, pad: 16, maxh: 100 }); }]
  ];
  G('5-symm', 1, function () {
    var s = R.pick(SHAPES);
    return NUM('Wie viele Symmetrieachsen hat diese Figur: ' + s[0] + '?', s[1], { fig: s[3](), sol: 'Ein ' + s[0] + ' hat ' + (s[1] === 0 ? 'keine Symmetrieachse' : s[1] === 1 ? 'genau eine Symmetrieachse' : s[1] + ' Symmetrieachsen') + '.', hint: 'Stell dir vor, du faltest die Figur: Wie viele Faltlinien lassen beide Hälften genau aufeinanderfallen?' });
  });
  G('5-symm', 1, function () {
    var s = R.pick(SHAPES);
    return TF('Ist diese Figur punktsymmetrisch? ' + s[0], s[2], { fig: s[3](), sol: s[2] ? 'Ja: Nach einer halben Drehung um den Mittelpunkt sieht die Figur genauso aus.' : 'Nein: Nach einer halben Drehung (180°) steht die Figur anders da.', hint: 'Drehe die Figur in Gedanken um 180°.' });
  });
  G('5-symm', 2, function () {
    var ver = R.bool(), ax = R.int(3, 5), p = R.intNot(0, 7, [ax]), q = R.int(1, 7), img = 2 * ax - p;
    if (img < 0 || img > 8) return null;
    var P = ver ? [p, q] : [q, p], I = ver ? [img, q] : [q, img];
    var seg = ver ? [ax, 0, ax, 8, Fig.C.red, '6 4'] : [0, ax, 8, ax, Fig.C.red, '6 4'];
    return GAP('Der Punkt $P(' + P[0] + '|' + P[1] + ')$ wird an der rot gestrichelten Geraden gespiegelt. Welche Koordinaten hat der Bildpunkt $P\'$?', [{ pre: '$x =$', ans: I[0] }, { pre: '$y =$', ans: I[1] }], { fig: grid({ pts: [{ x: P[0], y: P[1], l: 'P', c: Fig.C.teal }], segs: [seg] }), sol: '$P$ ist ' + (Math.abs(ax - p) === 1 ? '1 Einheit' : Math.abs(ax - p) + ' Einheiten') + ' von der Achse entfernt. Der Bildpunkt liegt genauso weit auf der anderen Seite: $P\'(' + I[0] + '|' + I[1] + ')$.', hint: 'Zähle die Kästchen bis zur Achse und gehe genauso weit darüber hinaus.' });
  });
  G('5-symm', 2, function () {
    var v = R.int(0, 2), tri = [[1, 1], [3, 1], [1, 4]], img, names = ['Verschiebung', 'Spiegelung', 'Drehung'];
    if (v === 0) { var dx = R.int(3, 4), dy = R.int(0, 3); img = tri.map(function (p) { return [p[0] + dx, p[1] + dy]; }); }
    else if (v === 1) img = tri.map(function (p) { return [8 - p[0], p[1]]; });
    else img = tri.map(function (p) { return [8 - p[0], 8 - p[1]]; });
    return MCF('Das violette Dreieck wird auf das grüne abgebildet. Um welche Bewegung handelt es sich?', names, v, { fig: grid({ polys: [{ P: tri }, { P: img, c: Fig.C.green, fill: 'rgba(47,133,90,.2)' }] }), sol: v === 0 ? 'Alle Punkte wandern gleich weit in dieselbe Richtung: eine Verschiebung.' : v === 1 ? 'Das Bild ist seitenverkehrt, als wäre das Blatt an der Geraden $x = 4$ gefaltet: eine Spiegelung.' : 'Das Dreieck steht auf dem Kopf, ist aber nicht seitenverkehrt: eine Drehung um 180°.', hint: 'Ist das Bild seitenverkehrt? Hat es sich gedreht? Oder ist es nur verrutscht?' });
  });
  G('5-symm', 2, function () {
    var n = 4, on = [], i, j, sym = R.bool(), ver = R.bool();
    for (i = 0; i < n; i++) { on.push([]); for (j = 0; j < n; j++) on[i].push(0); }
    for (i = 0; i < n; i++) for (j = 0; j < n / 2; j++) { var c = R.bool(0.5) ? 1 : 0; if (ver) { on[i][j] = c; on[i][n - 1 - j] = c; } else { on[j][i] = c; on[n - 1 - j][i] = c; } }
    if (!sym) { var a = R.int(0, n - 1), b = R.int(0, n - 1); on[a][b] = 1 - on[a][b]; }
    return TF('Ist das Muster achsensymmetrisch zur rot gestrichelten Achse?', sym, { fig: Fig.cells({ n: n, on: on, axis: ver ? 'v' : 'h' }), sol: sym ? 'Ja: Jedes gefärbte Kästchen hat ein Spiegelbild auf der anderen Seite der Achse.' : 'Nein: Ein Kästchen hat kein passendes Spiegelbild auf der anderen Seite.', hint: 'Prüfe Kästchen für Kästchen: Gibt es zu jedem ein Spiegelbild?' });
  });
  G('5-symm', 3, function () {
    var st = R.pick([['Bei einer Geradenspiegelung bleiben alle Streckenlängen erhalten.', true, 'Original und Bild sind deckungsgleich.'], ['Punkte, die auf der Spiegelachse liegen, werden auf sich selbst abgebildet.', true, 'Ihr Abstand zur Achse ist 0 – auf der anderen Seite ebenso.'], ['Bei einer Geradenspiegelung haben Original und Bild denselben Umlaufsinn.', false, 'Das Spiegelbild ist seitenverkehrt: Der Umlaufsinn kehrt sich um.'], ['Die Verbindungsstrecke von Punkt und Bildpunkt steht senkrecht auf der Spiegelachse.', true, 'So ist die Geradenspiegelung festgelegt.'], ['Eine Verschiebung kann die Größe einer Figur verändern.', false, 'Verschiebung, Drehung und Spiegelung ändern nur die Lage.'], ['Bei einer Spiegelung bleiben alle Winkelgrößen erhalten.', true, 'Original und Bild sind deckungsgleich.'], ['Jede achsensymmetrische Figur ist auch punktsymmetrisch.', false, 'Gegenbeispiel: Das gleichseitige Dreieck hat drei Symmetrieachsen, ist aber nicht punktsymmetrisch.']]);
    return TF('Wahr oder falsch? ' + st[0], st[1], { sol: st[2] });
  });
  G('5-symm', 3, function () {
    var d = R.int(12, 95) / 10;
    return NUM('Der Punkt $P$ hat von der Spiegelachse den Abstand ' + de(d) + ' cm. Wie weit sind $P$ und sein Bildpunkt $P\'$ voneinander entfernt?', M.round(2 * d, 1), { unit: 'cm', sol: 'Der Bildpunkt liegt genauso weit auf der anderen Seite: $2 * ' + de(d) + ' = ' + de(2 * d) + '$ cm.', hint: 'Punkt und Bildpunkt haben denselben Abstand zur Achse.' });
  });

  /* ---------- 5-flaeche: Rechtecke & Quader ---------- */
  G('5-flaeche', 1, function () {
    var a = R.int(4, 15), b = R.intNot(2, 10, [a]), area = R.bool();
    return NUM('Berechne den ' + (area ? 'Flächeninhalt' : 'Umfang') + ' des Rechtecks.', area ? a * b : 2 * (a + b), { unit: area ? '$cm^2$' : 'cm', fig: rect(a, b, a + ' cm', b + ' cm'), sol: area ? '$A = a * b = ' + a + ' * ' + b + ' = ' + a * b + '$, also $' + a * b + ' cm^2$.' : '$u = 2 * (a + b) = 2 * ' + (a + b) + ' = ' + 2 * (a + b) + '$ cm.', hint: area ? 'Flächeninhalt: Länge mal Breite.' : 'Umfang: einmal außen herum.' });
  });
  G('5-flaeche', 2, function () {
    var a = R.int(3, 12), b = R.int(3, 12), area = R.bool();
    if (area) return NUM('Ein Rechteck hat den Flächeninhalt $' + a * b + ' cm^2$ und ist ' + a + ' cm lang. Wie breit ist es?', b, { unit: 'cm', sol: '$b = A : a = ' + a * b + ' : ' + a + ' = ' + b + '$ cm.', hint: 'Welche Zahl mal ' + a + ' ergibt ' + a * b + '?' });
    return NUM('Ein Rechteck hat den Umfang ' + 2 * (a + b) + ' cm und ist ' + a + ' cm lang. Wie breit ist es?', b, { unit: 'cm', sol: 'Der halbe Umfang ist $' + (a + b) + '$ cm, das sind Länge plus Breite. $' + (a + b) + ' - ' + a + ' = ' + b + '$ cm.', hint: 'Der halbe Umfang ist Länge plus Breite.' });
  });
  G('5-flaeche', 2, function () {
    var a = R.int(6, 10), b = R.int(5, 8), c = R.int(2, a - 3), d = R.int(2, b - 2), area = a * b - c * d;
    return NUM('Berechne den Flächeninhalt der Figur (alle Ecken sind rechtwinklig, Maße in cm).', area, { unit: '$cm^2$', fig: Fig.shape({ P: [[0, 0], [a, 0], [a, b - d], [a - c, b - d], [a - c, b], [0, b]], s: [a + '', (b - d) + '', c + '', d + '', (a - c) + '', b + ''], maxh: 140, fill: 'rgba(183,121,31,.16)' }), sol: 'Großes Rechteck minus ausgeschnittene Ecke: $' + a + ' * ' + b + ' - ' + c + ' * ' + d + ' = ' + a * b + ' - ' + c * d + ' = ' + area + '$, also $' + area + ' cm^2$.', hint: 'Zerlege die Figur in zwei Rechtecke – oder ergänze sie zu einem großen Rechteck und ziehe die Ecke ab.' });
  });
  G('5-flaeche', 2, function () {
    var u = R.pick([['dm^2', 'cm^2', 100], ['m^2', 'dm^2', 100], ['cm^2', 'mm^2', 100], ['m^2', 'cm^2', 10000]]), x = R.pick([2, 3, 5, 7, 12, 0.5, 1.5, 2.5]), down = R.bool();
    if (down) return NUM('Rechne um: $' + de(x) + ' ' + u[0] + '$ in $' + u[1] + '$', M.round(x * u[2], 4), { unit: '$' + u[1] + '$', sol: '$1 ' + u[0] + ' = ' + de(u[2]) + ' ' + u[1] + '$, also $' + de(x) + ' * ' + de(u[2]) + ' = ' + de(x * u[2]) + '$.', hint: 'Bei Flächen ist die Umrechnungszahl zur nächsten Einheit 100.' });
    var y = x * u[2];
    return NUM('Rechne um: $' + de(y) + ' ' + u[1] + '$ in $' + u[0] + '$', x, { unit: '$' + u[0] + '$', sol: '$' + de(u[2]) + ' ' + u[1] + ' = 1 ' + u[0] + '$, also $' + de(y) + ' : ' + de(u[2]) + ' = ' + de(x) + '$.', hint: 'In die größere Einheit: dividieren.' });
  });
  G('5-flaeche', 1, function () {
    var a = R.int(3, 10), b = R.int(2, 8), c = R.int(2, 8);
    return NUM('Berechne das Volumen des Quaders.', a * b * c, { unit: '$cm^3$', fig: Fig.cuboid(a, b, c, [a + ' cm', b + ' cm', c + ' cm']), sol: '$V = a * b * c = ' + a + ' * ' + b + ' * ' + c + ' = ' + a * b * c + '$, also $' + a * b * c + ' cm^3$.', hint: 'Volumen: Länge mal Breite mal Höhe.' });
  });
  G('5-flaeche', 2, function () {
    var a = R.int(3, 9), b = R.int(2, 7), c = R.int(2, 6), o = 2 * (a * b + a * c + b * c);
    return NUM('Berechne den Oberflächeninhalt des Quaders.', o, { unit: '$cm^2$', fig: Fig.cuboid(a, b, c, [a + ' cm', b + ' cm', c + ' cm']), sol: '$O = 2 * (' + a + ' * ' + b + ' + ' + a + ' * ' + c + ' + ' + b + ' * ' + c + ') = 2 * (' + a * b + ' + ' + a * c + ' + ' + b * c + ') = ' + o + '$, also $' + o + ' cm^2$.', hint: 'Der Quader hat drei Paare gleicher Rechtecke.' });
  });
  G('5-flaeche', 2, function () {
    var v = R.int(0, 2), x = R.pick([2, 3, 5, 0.5, 1.5, 4, 2.5]);
    if (v === 0) return NUM('Rechne um: $' + de(x) + ' dm^3$ in $cm^3$', x * 1000, { unit: '$cm^3$', sol: '$1 dm^3 = 1000 cm^3$, also $' + de(x * 1000) + ' cm^3$.', hint: 'Bei Volumen ist die Umrechnungszahl 1000.' });
    if (v === 1) return NUM('Wie viele Liter sind $' + de(x * 1000) + ' cm^3$?', x, { unit: 'Liter', sol: '$1000 cm^3 = 1 dm^3 = 1$ Liter, also $' + de(x) + '$ Liter.', hint: '1 Liter ist ein Kubikdezimeter.' });
    return NUM('Rechne um: $' + de(x) + ' m^3$ in $dm^3$', x * 1000, { unit: '$dm^3$', sol: '$1 m^3 = 1000 dm^3$, also $' + de(x * 1000) + ' dm^3$.', hint: 'Bei Volumen ist die Umrechnungszahl 1000.' });
  });
  G('5-flaeche', 3, function () {
    var a = R.int(2, 9), v = R.int(0, 2);
    if (v === 0) return NUM('Ein Würfel hat das Volumen $' + a * a * a + ' cm^3$. Wie lang ist eine Kante?', a, { unit: 'cm', sol: '$' + a + ' * ' + a + ' * ' + a + ' = ' + a * a * a + '$, also ist die Kante ' + a + ' cm lang.', hint: 'Welche Zahl ergibt dreimal mit sich selbst multipliziert das Volumen?' });
    if (v === 1) return NUM('Ein Würfel hat die Kantenlänge ' + a + ' cm. Wie groß ist sein Oberflächeninhalt?', 6 * a * a, { unit: '$cm^2$', sol: 'Sechs gleiche Quadrate: $6 * ' + a + ' * ' + a + ' = ' + 6 * a * a + '$, also $' + 6 * a * a + ' cm^2$.', hint: 'Ein Würfel hat sechs gleiche Quadratflächen.' });
    return NUM('Ein Quadrat hat den Umfang ' + 4 * a + ' cm. Wie groß ist sein Flächeninhalt?', a * a, { unit: '$cm^2$', sol: 'Seitenlänge: $' + 4 * a + ' : 4 = ' + a + '$ cm. Flächeninhalt: $' + a + ' * ' + a + ' = ' + a * a + '$, also $' + a * a + ' cm^2$.', hint: 'Berechne erst die Seitenlänge.' });
  });
  G('5-flaeche', 3, function () {
    var a = R.pick([40, 50, 60, 80]), b = R.pick([20, 30, 40, 50]), c = R.pick([20, 30, 40, 50]), l = a * b * c / 1000;
    return NUM('Ein Aquarium ist innen ' + a + ' cm lang, ' + b + ' cm breit und ' + c + ' cm hoch. Wie viele Liter Wasser passen höchstens hinein?', l, { unit: 'Liter', sol: '$V = ' + a + ' * ' + b + ' * ' + c + ' = ' + de(a * b * c) + '$, also $' + de(a * b * c) + ' cm^3$. Da $1000 cm^3 = 1$ Liter: $' + de(l) + '$ Liter.', hint: 'Erst das Volumen in $cm^3$ berechnen, dann in Liter umrechnen.' });
  });

  /* ---------- 5-groessen: Größen & Problemlösen ---------- */
  G('5-groessen', 1, function () {
    var c = R.pick([['km', 'm', 1000], ['m', 'cm', 100], ['cm', 'mm', 10], ['kg', 'g', 1000], ['t', 'kg', 1000], ['m', 'dm', 10]]), x = R.pick([0.5, 1.2, 2.4, 3.5, 4.75, 0.25, 7, 12.5]), down = R.bool();
    if (down) return NUM('Rechne um: ' + de(x) + ' ' + c[0] + ' in ' + c[1], M.round(x * c[2], 4), { unit: c[1], sol: '1 ' + c[0] + ' = ' + c[2] + ' ' + c[1] + ', also $' + de(x) + ' * ' + c[2] + ' = ' + de(x * c[2]) + '$ ' + c[1] + '.', hint: 'In die kleinere Einheit umrechnen: multiplizieren.' });
    return NUM('Rechne um: ' + de(x * c[2]) + ' ' + c[1] + ' in ' + c[0], x, { unit: c[0], sol: c[2] + ' ' + c[1] + ' = 1 ' + c[0] + ', also $' + de(x * c[2]) + ' : ' + c[2] + ' = ' + de(x) + '$ ' + c[0] + '.', hint: 'In die größere Einheit umrechnen: dividieren.' });
  });
  G('5-groessen', 1, function () {
    var v = R.int(0, 3), h = R.int(1, 4), m = R.pick([10, 15, 20, 25, 40, 45, 50]);
    if (v === 0) return NUM('Wie viele Minuten sind ' + h + ' h ' + m + ' min?', h * 60 + m, { unit: 'min', sol: '$' + h + ' * 60 + ' + m + ' = ' + (h * 60 + m) + '$ Minuten.', hint: 'Eine Stunde hat 60 Minuten.' });
    if (v === 1) { var x = R.pick([0.5, 1.5, 2.5, 0.25, 0.75, 1.25]); return NUM('Wie viele Minuten sind ' + de(x) + ' Stunden?', x * 60, { unit: 'min', sol: '$' + de(x) + ' * 60 = ' + x * 60 + '$ Minuten.', hint: 'Achtung: 0,5 h sind 30 Minuten, nicht 50.' }); }
    if (v === 2) { var mi = R.int(2, 9); return NUM('Wie viele Sekunden sind ' + mi + ' Minuten?', mi * 60, { unit: 's', sol: '$' + mi + ' * 60 = ' + mi * 60 + '$ Sekunden.', hint: 'Eine Minute hat 60 Sekunden.' }); }
    var tot = h * 60 + m;
    return GAP('Wie viele Stunden und Minuten sind ' + tot + ' Minuten?', [{ ans: h, unit: 'h' }, { ans: m, unit: 'min' }], { sol: '$' + tot + ' : 60 = ' + h + '$ Rest $' + m + '$: ' + h + ' h ' + m + ' min.', hint: 'Wie oft passen 60 Minuten hinein?' });
  });
  G('5-groessen', 2, function () {
    var sh = R.int(8, 19), sm = R.pick([5, 15, 25, 35, 45, 50]), dur = R.pick([50, 75, 95, 105, 110, 130, 145]);
    var end = sh * 60 + sm + dur;
    function tm(t) { return Math.floor(t / 60) + ':' + ('0' + t % 60).slice(-2) + ' Uhr'; }
    return MC('Die Probe des Schulorchesters beginnt um ' + tm(sh * 60 + sm) + ' und dauert ' + dur + ' Minuten. Wann endet sie?', tm(end), [tm(end + 60), tm(end - 40), tm(end + 10), tm(sh * 60 + sm + Math.floor(dur / 100) * 60 + dur % 100)], { sol: dur + ' min = ' + Math.floor(dur / 60) + ' h ' + dur % 60 + ' min. Von ' + tm(sh * 60 + sm) + ' aus ergibt das ' + tm(end) + '.', hint: 'Zerlege die Dauer in Stunden und Minuten. Eine Stunde hat 60 Minuten – nicht 100.' });
  });
  G('5-groessen', 2, function () {
    var n = R.int(2, 6), p = R.pick([0.8, 1.2, 1.5, 2.4, 0.95, 1.75]), q = R.pick([2.5, 3.2, 4.9, 6.5]), tot = M.round(n * p + q, 2);
    return NUM(R.pick(SZ.NAMES) + ' kauft im Laden der Akademie ' + n + ' Federkiele zu je ' + M.fix(p, 2) + ' Talern und ein Tintenfass für ' + M.fix(q, 2) + ' Taler. Wie viel kostet alles zusammen?', tot, { unit: 'Taler', sol: 'Teilproblem 1: $' + n + ' * ' + de(p) + ' = ' + de(n * p) + '$. Teilproblem 2: $' + de(n * p) + ' + ' + de(q) + ' = ' + de(tot) + '$ Taler.', hint: 'Zerlege in Teilprobleme: erst die Federkiele, dann alles zusammen.' });
  });
  G('5-groessen', 2, function () {
    var it = R.pick([['die Höhe einer Zimmertür', '2 m', ['2 cm', '20 m', '200 mm']], ['die Masse eines Apfels', '150 g', ['150 kg', '15 g', '1,5 t']], ['die Länge eines Bleistifts', '17 cm', ['17 mm', '17 m', '1,7 cm']], ['die Dauer einer Schulstunde', '45 min', ['45 s', '45 h', '4,5 min']], ['das Fassungsvermögen einer Badewanne', '150 Liter', ['150 ml', '15 Liter', '15 000 Liter']], ['die Fläche eines Klassenzimmers', '60 m²', ['60 cm²', '6 m²', '600 m²']], ['die Masse eines Autos', '1,2 t', ['1,2 kg', '120 kg', '120 t']], ['die Dicke eines Mathebuchs', '2 cm', ['2 mm', '2 dm', '2 m']]]);
    return MC('Welche Angabe ist sinnvoll für ' + it[0] + '?', it[1], it[2], { sol: 'Vergleiche mit Bekanntem aus deinem Alltag. Sinnvoll ist hier nur: ' + it[1] + '.', hint: 'Stell dir die Größen wirklich vor.' });
  });
  G('5-groessen', 2, function () {
    return ORD('Bringe die Schritte eines Lösungsplans in die richtige Reihenfolge.', ['Aufgabe genau lesen: Was ist gegeben, was ist gesucht?', 'Das Problem in Teilprobleme zerlegen', 'Die Teilprobleme nacheinander berechnen', 'Ergebnis am Sachverhalt prüfen und Antwort formulieren'], { sol: 'Erst verstehen, dann planen, dann rechnen, dann prüfen.' });
  });
  G('5-groessen', 3, function () {
    var v = R.pick([30, 40, 50, 60, 80]), t = R.pick([1.5, 2.5, 0.5, 3.5, 1.25, 0.75]);
    if (v * t % 1 !== 0) return null;
    var h = Math.floor(t), m = (t - h) * 60;
    return NUM('Ein Postrabe fliegt gleichmäßig ' + v + ' km in einer Stunde. Wie weit kommt er in ' + (h ? h + ' h ' : '') + (m ? m + ' min' : '') + '?', v * t, { unit: 'km', sol: (h ? h + ' h ' : '') + (m ? m + ' min' : '') + ' sind $' + de(t) + '$ Stunden. $' + v + ' * ' + de(t) + ' = ' + de(v * t) + '$ km.', hint: 'Wie weit fliegt er in einer halben oder einer Viertelstunde?' });
  });
  G('5-groessen', 3, function () {
    var n = R.int(3, 6), p = R.int(4, 12), rest = R.int(3, 15), tot = n * p + rest;
    return NUM('Nach dem Kauf von ' + n + ' gleichen Zauberbüchern bleiben von ' + tot + ' Talern noch ' + rest + ' Taler übrig. Wie viel kostet ein Buch?', p, { unit: 'Taler', sol: 'Rückwärts arbeiten: Ausgegeben wurden $' + tot + ' - ' + rest + ' = ' + n * p + '$ Taler. Ein Buch: $' + n * p + ' : ' + n + ' = ' + p + '$ Taler.', hint: 'Wie viel wurde insgesamt ausgegeben?' });
  });
})(typeof window !== 'undefined' ? window : globalThis);

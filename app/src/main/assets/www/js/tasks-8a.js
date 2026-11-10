/* Silberzirkel – Aufgaben Klasse 8, Teil A: Terme, binomische Formeln, Gleichungen,
   Gleichungssysteme und Logik (Lehrplan Sachsen, Gymnasium, Lernbereiche 1, 3 und 5). */
(function (g) {
  'use strict';
  var SZ = g.SZ, R = SZ.R, M = SZ.M, G = SZ.G, MC = SZ.MC, MCN = SZ.MCN, MCF = SZ.MCF, NUM = SZ.NUM, GAP = SZ.GAP, TF = SZ.TF, ORD = SZ.ORD, Fig = SZ.Fig, de = M.de, lin = M.lin, co = M.co, sum = M.sum, par = M.par;
  function sg(x) { return x < 0 ? '- ' + (-x) : '+ ' + x; }   // "+ 3" oder "- 3"

  /* ---------- 8-terme ---------- */
  G('8-terme', 1, function () {
    var a = R.int(3, 9), b = R.int(2, 9), c = R.int(1, a - 1), d = R.int(1, 8), v = R.pick([['a', 'b'], ['x', 'y'], ['m', 'n']]);
    var q = sum([co(a, v[0]), co(b, v[1]), co(-c, v[0]), co(d, v[1])]);
    return MC('Fasse zusammen: $' + q + '$', '$' + sum([co(a - c, v[0]), co(b + d, v[1])]) + '$', ['$' + sum([co(a + c, v[0]), co(b + d, v[1])]) + '$', '$' + (a - c + b + d) + v[0] + v[1] + '$', '$' + sum([co(a - c, v[0]), co(Math.abs(b - d) || b + d + 1, v[1])]) + '$', '$' + (a - c + b + d) + v[0] + '$'], { sol: 'Nur gleichartige Glieder zusammenfassen: $' + a + v[0] + ' - ' + c + v[0] + ' = ' + co(a - c, v[0]) + '$ und $' + b + v[1] + ' + ' + d + v[1] + ' = ' + (b + d) + v[1] + '$.', hint: 'Sortiere zuerst: alle Glieder mit $' + v[0] + '$ zusammen, alle mit $' + v[1] + '$ zusammen.' });
  });
  G('8-terme', 1, function () {
    var q = R.pick([['3 * (x + 2)', 2], ['3 * x + 2', 0], ['{x + 2/3}', 3], ['x - 2 * y', 1], ['(a + b) * (a - b)', 2], ['a * b + c', 0], ['{a/b} - c', 1], ['(x - 1) : 4', 3], ['5 - 2 * x', 1], ['a * (b - c)', 2]]);
    return MCF('Welche Struktur hat der Term $' + q[0] + '$?', ['Summe', 'Differenz', 'Produkt', 'Quotient'], q[1], { sol: 'Entscheidend ist die Rechenart, die zuletzt ausgeführt wird. Hier: ' + ['Summe', 'Differenz', 'Produkt', 'Quotient'][q[1]] + '.', hint: 'Welche Rechnung würdest du beim Einsetzen von Zahlen als letzte ausführen?' });
  });
  G('8-terme', 1, function () {
    var x = R.nz(-4, 6), y = R.nz(-4, 5), v = R.int(0, 3), a = R.int(2, 5), b = R.int(2, 4), q, r, s;
    if (v === 0) { q = a + 'x - ' + b + 'y'; r = a * x - b * y; s = a + ' * ' + par(x) + ' - ' + b + ' * ' + par(y); }
    else if (v === 1) { q = 'x^2 + ' + a + 'x'; r = x * x + a * x; s = par(x) + '^2 + ' + a + ' * ' + par(x); }
    else if (v === 2) { q = a + ' * (x - y)'; r = a * (x - y); s = a + ' * (' + x + ' - ' + par(y) + ')'; }
    else { q = 'x * y - ' + a; r = x * y - a; s = par(x) + ' * ' + par(y) + ' - ' + a; }
    return NUM('Berechne den Wert des Terms $' + q + '$ für $x = ' + x + '$ und $y = ' + y + '$.', r, { sol: 'Einsetzen: $' + s + ' = ' + r + '$', hint: 'Setze negative Zahlen beim Einsetzen in Klammern.' });
  });
  G('8-terme', 1, function () {
    var a = R.int(2, 7), b = R.int(2, 7);
    if (R.bool()) return MC('Vereinfache: $' + a + 'a * ' + b + 'b$', '$' + a * b + 'ab$', ['$' + (a + b) + 'ab$', '$' + a * b + 'a + b$', '$' + a * b + 'a^2b$', '$' + (a + b) + 'a + b$'], { sol: 'Zahlen mit Zahlen, Buchstaben mit Buchstaben multiplizieren: $' + a + ' * ' + b + ' * a * b = ' + a * b + 'ab$', hint: 'Beim Multiplizieren darf man die Faktoren beliebig umsortieren (Kommutativgesetz).' });
    return MC('Vereinfache: $' + a + 'x * ' + b + 'x$', '$' + a * b + 'x^2$', ['$' + a * b + 'x$', '$' + (a + b) + 'x^2$', '$' + (a + b) + 'x$', '$' + a * b + '^2x$'], { sol: '$' + a + ' * ' + b + ' * x * x = ' + a * b + 'x^2$', hint: '$x * x = x^2$' });
  });
  G('8-terme', 2, function () {
    var a = R.int(4, 9), b = R.int(1, a - 1), c = R.int(1, 9), inner = R.bool();
    return GAP('Löse die Klammer auf und fasse zusammen: $' + a + 'a - (' + b + 'a ' + (inner ? '- ' : '+ ') + c + ')$. Schreibe das Ergebnis in der Form $▢ * a + ▢$.', [{ pre: 'Faktor vor $a$:', ans: a - b }, { pre: 'Zahl ohne $a$:', ans: inner ? c : -c }], { sol: 'Minus vor der Klammer kehrt alle Vorzeichen um: $' + a + 'a - ' + b + 'a ' + (inner ? '+ ' : '- ') + c + ' = ' + lin(a - b, 'a', inner ? c : -c) + '$', hint: 'Ein Minus vor der Klammer dreht jedes Vorzeichen in der Klammer um.' });
  });
  G('8-terme', 2, function () {
    var k = R.pick([2, 3, 4, 5, -2, -3]), a = R.int(2, 5), b = R.int(2, 6), minus = R.bool();
    var right = sum([co(k * a, 'x'), co(minus ? -k * b : k * b, 'y')]);
    return MC('Multipliziere aus: $' + k + ' * (' + a + 'x ' + (minus ? '- ' : '+ ') + b + 'y)$', '$' + right + '$', ['$' + sum([co(k * a, 'x'), co(minus ? -b : b, 'y')]) + '$', '$' + sum([co(k * a, 'x'), co(minus ? k * b : -k * b, 'y')]) + '$', '$' + sum([co(k + a, 'x'), co(minus ? -(k + b) : k + b, 'y')]) + '$', '$' + k * a * b + 'xy$'], { sol: 'Distributivgesetz: Der Faktor wird mit jedem Summanden multipliziert. $' + k + ' * ' + a + 'x = ' + k * a + 'x$ und $' + k + ' * ' + par(minus ? -b : b) + 'y = ' + (minus ? -k * b : k * b) + 'y$.', hint: 'Jeder Summand in der Klammer wird mit dem Faktor multipliziert – auch der zweite.' });
  });
  G('8-terme', 2, function () {
    var p = R.nz(-6, 7), q = R.nz(-6, 7);
    return GAP('Multipliziere aus und fasse zusammen: $(' + lin(1, 'x', p) + ') * (' + lin(1, 'x', q) + ') = x^2 + ▢ * x + ▢$', [{ pre: 'Faktor vor $x$:', ans: p + q }, { pre: 'Zahl ohne $x$:', ans: p * q }], { sol: 'Jeder mit jedem: $x * x + x * ' + par(q) + ' + ' + par(p) + ' * x + ' + par(p) + ' * ' + par(q) + ' = ' + M.poly([1, p + q, p * q]) + '$', hint: 'Jeder Summand der ersten Klammer mal jeden Summanden der zweiten – das gibt vier Produkte.' });
  });
  G('8-terme', 2, function () {
    var gd = R.pick([2, 3, 4, 5, 6]), m = R.pick([[2, 3], [3, 2], [1, 2], [3, 4], [2, 5], [5, 3], [1, 4]]), a = gd * m[0], b = gd * m[1];
    return MC('Klammere den größten gemeinsamen Faktor aus: $' + a + 'x + ' + b + '$', '$' + gd + ' * (' + lin(m[0], 'x', m[1]) + ')$', ['$' + gd + ' * (' + lin(m[0], 'x', b) + ')$', '$' + gd + 'x * (' + m[0] + ' + ' + m[1] + ')$', '$' + (a + b) + 'x$', '$' + m[0] + ' * (' + lin(gd, 'x', gd) + ')$'], { sol: 'Der größte gemeinsame Teiler von ' + a + ' und ' + b + ' ist ' + gd + ' (Klasse 5): $' + a + 'x + ' + b + ' = ' + gd + ' * (' + lin(m[0], 'x', m[1]) + ')$. Probe durch Ausmultiplizieren.', hint: 'Welche größte Zahl teilt ' + a + ' und ' + b + '? Mache die Probe durch Ausmultiplizieren.' });
  });
  G('8-terme', 2, function () {
    var c = R.int(2, 6), k = R.int(2, 6), area = R.bool();
    var fig = Fig.shape({ P: [[0, 0], [7, 0], [7, 3.4], [0, 3.4]], s: ['x + ' + c, k + '', '', ''], maxh: 100, fill: 'rgba(183,121,31,.16)' });
    return MC('Ein Rechteck hat die Seitenlängen $x + ' + c + '$ und $' + k + '$. Welcher Term beschreibt seinen ' + (area ? 'Flächeninhalt' : 'Umfang') + '?', '$' + (area ? lin(k, 'x', k * c) : lin(2, 'x', 2 * c + 2 * k)) + '$', ['$' + (area ? lin(k, 'x', c) : lin(1, 'x', c + k)) + '$', '$' + (area ? lin(1, 'x', c + k) : lin(k, 'x', k * c)) + '$', '$' + (area ? lin(2, 'x', 2 * c + 2 * k) : lin(2, 'x', c + k)) + '$'], { fig: fig, sol: area ? '$A = ' + k + ' * (x + ' + c + ') = ' + lin(k, 'x', k * c) + '$' : '$u = 2 * (x + ' + c + ' + ' + k + ') = ' + lin(2, 'x', 2 * c + 2 * k) + '$', hint: (area ? 'Flächeninhalt: Länge mal Breite' : 'Umfang: zweimal Länge plus zweimal Breite') + ' (Klasse 5) – jetzt mit einem Term als Seitenlänge.' });
  });
  G('8-terme', 2, function () {
    var st = R.pick([['$x + x = x^2$', false, '$x + x = 2x$. Dagegen ist $x * x = x^2$.'], ['$2x + 3y = 5xy$', false, 'Verschiedenartige Glieder lassen sich nicht zusammenfassen.'], ['$3a * 2a = 6a^2$', true, '$3 * 2 * a * a = 6a^2$'], ['$a - (b - c) = a - b + c$', true, 'Das Minus vor der Klammer kehrt beide Vorzeichen um.'], ['$-(a + b) = -a + b$', false, 'Richtig ist $-a - b$: Beide Vorzeichen kehren sich um.'], ['$2 * (x + 3) = 2x + 3$', false, 'Auch die 3 muss mit 2 multipliziert werden: $2x + 6$.'], ['$5x - x = 5$', false, '$5x - 1x = 4x$'], ['$a * (b + c) = a * b + a * c$', true, 'Das ist das Distributivgesetz – es gilt für alle Zahlen.'], ['$3x^2 + 2x^2 = 5x^2$', true, 'Gleichartige Glieder: 3 Stück plus 2 Stück von derselben Sorte.']]);
    return TF('Gilt das für alle Zahlen? ' + st[0], st[1], { sol: st[2], hint: 'Setze zur Probe eine Zahl ein, z. B. 2 oder 3.' });
  });
  G('8-terme', 3, function () {
    var a = R.int(2, 4), b = R.nz(-5, 5), c = R.int(1, 3), d = R.nz(-5, 5);
    return GAP('Multipliziere aus und fasse zusammen: $(' + lin(a, 'x', b) + ') * (' + lin(c, 'x', d) + ') = ▢ * x^2 + ▢ * x + ▢$', [{ pre: 'vor $x^2$:', ans: a * c }, { pre: 'vor $x$:', ans: a * d + b * c }, { pre: 'Zahl:', ans: b * d }], { sol: 'Vier Produkte: $' + a * c + 'x^2$, $' + a * d + 'x$, $' + b * c + 'x$ und $' + b * d + '$. Zusammengefasst: $' + M.poly([a * c, a * d + b * c, b * d]) + '$', hint: 'Jeder mit jedem – und am Ende die beiden Glieder mit $x$ zusammenfassen.' });
  });
  G('8-terme', 3, function () {
    var k = R.int(2, 6), b = R.int(1, 7), m = R.intNot(2, 9, [k]);
    return GAP('Vereinfache: $' + k + ' * (x + ' + b + ') - ' + m + 'x$. Schreibe das Ergebnis in der Form $▢ * x + ▢$.', [{ pre: 'Faktor vor $x$:', ans: k - m }, { pre: 'Zahl ohne $x$:', ans: k * b }], { sol: 'Ausmultiplizieren: $' + k + 'x + ' + k * b + ' - ' + m + 'x$. Zusammenfassen: $' + lin(k - m, 'x', k * b) + '$', hint: 'Erst die Klammer auflösen, dann gleichartige Glieder zusammenfassen.' });
  });

  /* ---------- 8-binom ---------- */
  G('8-binom', 1, function () {
    var a = R.int(2, 9), v = R.pick(['x', 'a', 'y']);
    return GAP('Wende die 1. binomische Formel an: $(' + v + ' + ' + a + ')^2 = ' + v + '^2 + ▢ * ' + v + ' + ▢$', [{ pre: 'Faktor vor $' + v + '$:', ans: 2 * a }, { pre: 'Zahl:', ans: a * a }], { sol: '$(a + b)^2 = a^2 + 2ab + b^2$: Das doppelte Produkt ist $2 * ' + v + ' * ' + a + ' = ' + 2 * a + v + '$, das Quadrat $' + a + '^2 = ' + a * a + '$.', hint: 'Quadrat des ersten – doppeltes Produkt – Quadrat des zweiten.' });
  });
  G('8-binom', 1, function () {
    var a = R.int(2, 9);
    return GAP('Wende die 2. binomische Formel an: $(x - ' + a + ')^2 = x^2 + ▢ * x + ▢$ (Achte auf das Vorzeichen.)', [{ pre: 'Faktor vor $x$:', ans: -2 * a }, { pre: 'Zahl:', ans: a * a }], { sol: '$(a - b)^2 = a^2 - 2ab + b^2$: $x^2 - ' + 2 * a + 'x + ' + a * a + '$. Das Quadrat am Ende ist immer positiv.', hint: 'Das mittlere Glied ist negativ, das letzte positiv.' });
  });
  G('8-binom', 1, function () {
    var a = R.int(2, 12);
    return NUM('Wende die 3. binomische Formel an: $(x + ' + a + ') * (x - ' + a + ') = x^2 - ▢$. Welche Zahl fehlt?', a * a, { sol: '$(a + b) * (a - b) = a^2 - b^2$: $x^2 - ' + a + '^2 = x^2 - ' + a * a + '$', hint: 'Die gemischten Glieder heben sich auf – übrig bleibt die Differenz der Quadrate.' });
  });
  G('8-binom', 2, function () {
    var b = R.int(2, 5), a = R.int(1, 6), minus = R.bool();
    return GAP('Wende eine binomische Formel an: $(' + b + 'x ' + (minus ? '- ' : '+ ') + a + ')^2 = ▢ * x^2 + ▢ * x + ▢$', [{ pre: 'vor $x^2$:', ans: b * b }, { pre: 'vor $x$:', ans: (minus ? -2 : 2) * a * b }, { pre: 'Zahl:', ans: a * a }], { sol: 'Quadrat des ersten: $(' + b + 'x)^2 = ' + b * b + 'x^2$. Doppeltes Produkt: $2 * ' + b + 'x * ' + a + ' = ' + 2 * a * b + 'x$' + (minus ? ' (mit Minus)' : '') + '. Quadrat des zweiten: $' + a * a + '$.', hint: 'Achtung: $(' + b + 'x)^2 = ' + b + '^2 * x^2$.' });
  });
  G('8-binom', 2, function () {
    var a = R.int(2, 12);
    return NUM('Zerlege in Faktoren: $x^2 - ' + a * a + ' = (x + ▢) * (x - ▢)$. Welche Zahl gehört in beide Lücken?', a, { sol: '3. binomische Formel rückwärts: $x^2 - ' + a * a + ' = x^2 - ' + a + '^2 = (x + ' + a + ') * (x - ' + a + ')$', hint: 'Welche Zahl hat das Quadrat ' + a * a + '?' });
  });
  G('8-binom', 2, function () {
    var a = R.int(2, 10), minus = R.bool();
    return NUM('Schreibe als Quadrat: $x^2 ' + (minus ? '- ' : '+ ') + 2 * a + 'x + ' + a * a + ' = (x ' + (minus ? '- ' : '+ ') + '▢)^2$. Welche Zahl fehlt?', a, { sol: 'Die Zahl am Ende ist $' + a + '^2$, das mittlere Glied $2 * ' + a + ' * x$ – also $(x ' + (minus ? '- ' : '+ ') + a + ')^2$.', hint: 'Halbiere den Faktor vor $x$ und prüfe, ob sein Quadrat die letzte Zahl ergibt.' });
  });
  G('8-binom', 2, function () {
    var v = R.int(0, 2), t = R.pick([20, 30, 40, 50]), e = R.int(1, 3);
    if (v === 0) return NUM('Rechne geschickt im Kopf: $' + (t + e) + '^2$', (t + e) * (t + e), { sol: '$(' + t + ' + ' + e + ')^2 = ' + t * t + ' + 2 * ' + t + ' * ' + e + ' + ' + e * e + ' = ' + (t + e) * (t + e) + '$', hint: 'Zerlege in $(' + t + ' + ' + e + ')^2$ und nutze die 1. binomische Formel.' });
    if (v === 1) return NUM('Rechne geschickt im Kopf: $' + (t - e) + '^2$', (t - e) * (t - e), { sol: '$(' + t + ' - ' + e + ')^2 = ' + t * t + ' - 2 * ' + t + ' * ' + e + ' + ' + e * e + ' = ' + (t - e) * (t - e) + '$', hint: 'Zerlege in $(' + t + ' - ' + e + ')^2$ und nutze die 2. binomische Formel.' });
    return NUM('Rechne geschickt im Kopf: $' + (t - e) + ' * ' + (t + e) + '$', t * t - e * e, { sol: '$(' + t + ' - ' + e + ') * (' + t + ' + ' + e + ') = ' + t + '^2 - ' + e + '^2 = ' + t * t + ' - ' + e * e + ' = ' + (t * t - e * e) + '$', hint: 'Beide Faktoren liegen gleich weit von ' + t + ' entfernt: 3. binomische Formel.' });
  });
  G('8-binom', 2, function () {
    var q = R.pick([['(a + b)^2', 'a^2 + 2ab + b^2', ['a^2 + b^2', 'a^2 - 2ab + b^2', 'a^2 - b^2', '2a + 2b']], ['(a - b)^2', 'a^2 - 2ab + b^2', ['a^2 - b^2', 'a^2 + 2ab + b^2', 'a^2 - 2ab - b^2', '2a - 2b']], ['(a + b) * (a - b)', 'a^2 - b^2', ['a^2 + b^2', 'a^2 - 2ab + b^2', 'a^2 + 2ab - b^2', '2a']]]);
    return MC('Welcher Term ist gleich $' + q[0] + '$?', '$' + q[1] + '$', q[2].map(function (x) { return '$' + x + '$'; }), { sol: 'Binomische Formel: $' + q[0] + ' = ' + q[1] + '$', hint: 'Multipliziere im Zweifel aus: jeder mit jedem.' });
  });
  G('8-binom', 2, function () {
    var a = R.int(3, 7), b = R.int(1, a - 1), s = a + b, v = R.int(0, 2);
    var fig = Fig.shape({ P: [[0, 0], [s, 0], [s, s], [0, s]], s: ['', '', '', ''], extra: [{ from: [a, 0], to: [a, s], c: Fig.C.ink }, { from: [0, a], to: [s, a], c: Fig.C.ink }, { from: [a / 2, -0.01], to: [a / 2, -0.01], l: 'a', dx: 0, dy: 12, it: true }, { from: [a + b / 2, -0.01], to: [a + b / 2, -0.01], l: 'b', dx: 0, dy: 12, it: true }, { from: [-0.01, a / 2], to: [-0.01, a / 2], l: 'a', dx: -11, it: true }, { from: [-0.01, a + b / 2], to: [-0.01, a + b / 2], l: 'b', dx: -11, it: true }], maxh: 150, w: 210, fill: 'rgba(107,70,193,.12)' });
    var qs = ['Wie groß ist der Flächeninhalt der beiden Rechtecke zusammen?', 'Wie groß ist der Flächeninhalt des ganzen Quadrats?', 'Wie groß ist der Flächeninhalt des kleinen Quadrats oben rechts?'];
    var ans = [2 * a * b, s * s, b * b], sols = ['Jedes Rechteck hat $a * b = ' + a * b + '$, zusammen $2ab = ' + 2 * a * b + '$ – das doppelte Produkt der binomischen Formel.', '$(a + b)^2 = ' + s + '^2 = ' + s * s + '$. Das ist zugleich $a^2 + 2ab + b^2 = ' + a * a + ' + ' + 2 * a * b + ' + ' + b * b + '$.', '$b^2 = ' + b * b + '$'];
    return NUM('Das große Quadrat hat die Seitenlänge $a + b$ mit $a = ' + a + '$ und $b = ' + b + '$. ' + qs[v], ans[v], { fig: fig, sol: sols[v], hint: 'Das Bild zeigt die 1. binomische Formel: $(a + b)^2$ besteht aus $a^2$, $b^2$ und zwei Rechtecken $a * b$.' });
  });
  G('8-binom', 3, function () {
    var a = R.int(2, 9);
    return NUM('Quadratische Ergänzung: Welche Zahl muss man zu $x^2 + ' + 2 * a + 'x$ addieren, damit ein vollständiges Quadrat $(x + ▢)^2$ entsteht?', a * a, { sol: 'Halbiere den Faktor vor $x$: ' + a + '. Sein Quadrat fehlt: $x^2 + ' + 2 * a + 'x + ' + a * a + ' = (x + ' + a + ')^2$', hint: 'In $(x + b)^2 = x^2 + 2bx + b^2$ ist der Faktor vor $x$ das Doppelte von $b$.' });
  });
  G('8-binom', 3, function () {
    var st = R.pick([['$(x + 3)^2 = x^2 + 9$', false, 'Das doppelte Produkt fehlt: $x^2 + 6x + 9$.'], ['$(2a)^2 = 4a^2$', true, '$2a * 2a = 4a^2$'], ['$(a - b)^2 = (b - a)^2$', true, '$b - a = -(a - b)$, und beim Quadrieren verschwindet das Minus.'], ['$(x - 5) * (x + 5) = x^2 - 10x + 25$', false, 'Das ist die 3. binomische Formel: $x^2 - 25$.'], ['$(x - 4)^2 = x^2 - 8x - 16$', false, 'Das letzte Glied ist positiv: $x^2 - 8x + 16$.'], ['$x^2 - 1 = (x + 1) * (x - 1)$', true, '3. binomische Formel mit $b = 1$.'], ['$(a + b)^2 - (a - b)^2 = 4ab$', true, '$a^2 + 2ab + b^2 - a^2 + 2ab - b^2 = 4ab$']]);
    return TF('Gilt das für alle Zahlen? ' + st[0], st[1], { sol: st[2], hint: 'Multipliziere aus oder setze Zahlen zur Probe ein.' });
  });
  G('8-binom', 3, function () {
    var a = R.int(2, 4), b = R.int(2, 5), minus = R.bool(), mid = 2 * a * b;
    return MC('Wende eine binomische Formel an: $(' + a + 'x ' + (minus ? '- ' : '+ ') + b + 'y)^2$', '$' + a * a + 'x^2 ' + (minus ? '- ' : '+ ') + mid + 'xy + ' + b * b + 'y^2$', ['$' + a * a + 'x^2 ' + (minus ? '- ' : '+ ') + b * b + 'y^2$', '$' + a * a + 'x^2 ' + (minus ? '- ' : '+ ') + a * b + 'xy + ' + b * b + 'y^2$', '$' + a * a + 'x^2 ' + (minus ? '+ ' : '- ') + mid + 'xy + ' + b * b + 'y^2$', '$' + a + 'x^2 ' + (minus ? '- ' : '+ ') + mid + 'xy + ' + b + 'y^2$'], { sol: 'Quadrat des ersten: $' + a * a + 'x^2$. Doppeltes Produkt: $2 * ' + a + 'x * ' + b + 'y = ' + mid + 'xy$. Quadrat des zweiten: $' + b * b + 'y^2$.', hint: 'Auch die Zahlen vor $x$ und $y$ werden quadriert.' });
  });

  /* ---------- 8-gleichung ---------- */
  G('8-gleichung', 1, function () {
    var x = R.nz(-6, 9), k = R.int(2, 5), b = R.nz(-5, 6), c = R.intNot(1, 7, [k]), d = k * (x + b) - c * x;
    return NUM('Löse die Gleichung: $' + k + ' * (' + lin(1, 'x', b) + ') = ' + lin(c, 'x', d) + '$', x, { pre: '$x =$', sol: 'Klammer auflösen: $' + lin(k, 'x', k * b) + ' = ' + lin(c, 'x', d) + '$. Sortieren: $' + co(k - c, 'x') + ' = ' + (d - k * b) + '$, also $x = ' + x + '$.', hint: 'Erst ausmultiplizieren (Terme umformen), dann wie in Klasse 7 lösen.' });
  });
  G('8-gleichung', 2, function () {
    var x = R.nz(-5, 8), a = R.int(3, 6), b = R.int(1, 5), c = R.int(1, 6), r = a * (x - b) - (x + c);
    return NUM('Löse die Gleichung: $' + a + ' * (x - ' + b + ') - (x + ' + c + ') = ' + r + '$', x, { pre: '$x =$', sol: 'Klammern auflösen: $' + a + 'x - ' + a * b + ' - x - ' + c + ' = ' + r + '$. Zusammenfassen: $' + lin(a - 1, 'x', -a * b - c) + ' = ' + r + '$, also $' + (a - 1) + 'x = ' + (r + a * b + c) + '$ und $x = ' + x + '$.', hint: 'Das Minus vor der zweiten Klammer kehrt beide Vorzeichen um.' });
  });
  G('8-gleichung', 2, function () {
    var k = R.int(2, 5), b = R.int(1, 6), v = R.int(0, 2), c = R.intNot(1, 9, [k]), q, sol;
    if (v === 0) { q = k + ' * (x + ' + b + ') = ' + lin(k, 'x', k * b + R.int(1, 5)); sol = 'Ausmultiplizieren: $' + lin(k, 'x', k * b) + '$ steht links. Zieht man $' + k + 'x$ ab, bleibt eine falsche Aussage wie $' + k * b + ' = …$ mit zwei verschiedenen Zahlen. Keine Zahl erfüllt die Gleichung.'; }
    else if (v === 1) { q = lin(k, 'x', k * b) + ' = ' + k + ' * (x + ' + b + ')'; sol = 'Beide Seiten sind derselbe Term: Es entsteht $0 = 0$. Jede Zahl ist Lösung.'; }
    else { q = k + ' * (x + ' + b + ') = ' + lin(c, 'x', k * b); sol = 'Ausmultiplizieren und sortieren: $' + co(k - c, 'x') + ' = 0$, also $x = 0$ – genau eine Lösung.'; }
    return MCF('Wie viele Lösungen hat die Gleichung $' + q + '$?', ['keine Lösung', 'jede Zahl ist Lösung', 'genau eine Lösung'], v, { sol: sol, hint: 'Forme um, bis $x$ allein steht – oder ganz verschwindet.' });
  });
  G('8-gleichung', 1, function () {
    var b = R.int(1, 9), c = R.int(b + 1, 20), a = R.int(2, 6), v = R.int(0, 1), rel = R.pick(['<', '>']);
    if (v === 0) return MC('Löse die Ungleichung: $x + ' + b + ' ' + rel + ' ' + c + '$', '$x ' + rel + ' ' + (c - b) + '$', ['$x ' + (rel === '<' ? '>' : '<') + ' ' + (c - b) + '$', '$x ' + rel + ' ' + (c + b) + '$', '$x ' + (rel === '<' ? '>' : '<') + ' ' + (c + b) + '$'], { sol: 'Auf beiden Seiten $- ' + b + '$. Beim Addieren und Subtrahieren bleibt das Zeichen erhalten: $x ' + rel + ' ' + (c - b) + '$', hint: 'Wie bei einer Gleichung – das Zeichen dreht sich hier nicht um.' });
    var r = R.int(2, 9);
    return MC('Löse die Ungleichung: $' + a + 'x ' + rel + ' ' + a * r + '$', '$x ' + rel + ' ' + r + '$', ['$x ' + (rel === '<' ? '>' : '<') + ' ' + r + '$', '$x ' + rel + ' ' + (a * r - a) + '$', '$x ' + rel + ' ' + a * a * r + '$'], { sol: 'Beide Seiten durch ' + a + ' teilen. Die Zahl ist positiv – das Zeichen bleibt: $x ' + rel + ' ' + r + '$', hint: 'Durch eine positive Zahl teilen ändert das Zeichen nicht.' });
  });
  G('8-gleichung', 2, function () {
    var a = -R.int(2, 6), b = R.int(1, 9), r = R.nz(-6, 6), rel = R.pick(['<', '>']), inv = rel === '<' ? '>' : '<', c = a * r + b;
    return MC('Löse die Ungleichung: $' + lin(a, 'x', b) + ' ' + rel + ' ' + c + '$', '$x ' + inv + ' ' + r + '$', ['$x ' + rel + ' ' + r + '$', '$x ' + inv + ' ' + (-r === r ? r + 1 : -r) + '$', '$x ' + rel + ' ' + (-r === r ? r - 1 : -r) + '$'], { sol: 'Erst $- ' + b + '$: $' + a + 'x ' + rel + ' ' + (c - b) + '$. Dann durch $' + a + '$ teilen – die Zahl ist negativ, also dreht sich das Zeichen um: $x ' + inv + ' ' + r + '$', hint: 'Inversionsregel: Beim Teilen durch eine negative Zahl dreht sich das Relationszeichen um.' });
  });
  G('8-gleichung', 2, function () {
    var a = R.nz(-4, 5), b = R.nz(-9, 9), x = R.nz(-5, 6), rel = R.pick(['<', '>', '<=', '>=']), l = a * x + b, c = l + R.pick([-3, -1, 0, 0, 1, 2]);
    var ok = rel === '<' ? l < c : rel === '>' ? l > c : rel === '<=' ? l <= c : l >= c;
    return TF('Ist $x = ' + x + '$ eine Lösung der Ungleichung $' + lin(a, 'x', b) + ' ' + rel + ' ' + c + '$?', ok, { sol: 'Einsetzen: $' + a + ' * ' + par(x) + ' ' + sg(b) + ' = ' + l + '$. Die Aussage $' + l + ' ' + rel + ' ' + c + '$ ist ' + (ok ? 'wahr.' : 'falsch.'), hint: 'Setze die Zahl ein und prüfe, ob eine wahre Aussage entsteht.' });
  });
  G('8-gleichung', 2, function () {
    var a = R.int(2, 5), r = R.int(2, 8), b = R.int(1, 9), small = R.bool();
    if (small) return NUM('Welches ist die kleinste ganze Zahl, die die Ungleichung $' + a + 'x - ' + b + ' > ' + (a * r - b) + '$ erfüllt?', r + 1, { sol: '$+ ' + b + '$: $' + a + 'x > ' + a * r + '$. $: ' + a + '$: $x > ' + r + '$. Die kleinste ganze Zahl größer als ' + r + ' ist ' + (r + 1) + '.', hint: 'Löse erst die Ungleichung. Gehört die Grenze selbst dazu?' });
    return NUM('Welches ist die größte ganze Zahl, die die Ungleichung $' + a + 'x + ' + b + ' <= ' + (a * r + b) + '$ erfüllt?', r, { sol: '$- ' + b + '$: $' + a + 'x <= ' + a * r + '$. $: ' + a + '$: $x <= ' + r + '$. Die Grenze ' + r + ' gehört dazu.', hint: 'Löse erst die Ungleichung. Bei ≤ gehört die Grenze dazu.' });
  });
  G('8-gleichung', 2, function () {
    var st = R.pick([['Aus $-2x > 6$ folgt $x > -3$.', false, 'Beim Teilen durch $-2$ dreht sich das Zeichen um: $x < -3$.'], ['Aus $x - 4 < 1$ folgt $x < 5$.', true, 'Beim Addieren bleibt das Zeichen erhalten.'], ['Aus $3x >= 12$ folgt $x >= 4$.', true, 'Teilen durch eine positive Zahl ändert das Zeichen nicht.'], ['Aus $-x < 2$ folgt $x > -2$.', true, 'Multiplizieren mit $-1$ dreht das Zeichen um.'], ['Aus $2 < 5$ folgt $-2 < -5$.', false, 'Auf der Zahlengeraden liegt $-2$ rechts von $-5$: $-2 > -5$.'], ['Eine Ungleichung wie $x > 3$ hat unendlich viele Lösungen.', true, 'Alle Zahlen rechts von 3 auf der Zahlengeraden.']]);
    return TF('Wahr oder falsch? ' + st[0], st[1], { sol: st[2] });
  });
  G('8-gleichung', 3, function () {
    var a = R.int(1, 5), x = R.nz(-4, 7), c = 2 * a * x + a * a;
    return NUM('Löse die Gleichung: $(x + ' + a + ')^2 = x^2 ' + sg(c) + '$', x, { pre: '$x =$', sol: 'Binomische Formel: $x^2 + ' + 2 * a + 'x + ' + a * a + ' = x^2 ' + sg(c) + '$. $x^2$ fällt auf beiden Seiten weg: $' + 2 * a + 'x = ' + (c - a * a) + '$, also $x = ' + x + '$.', hint: 'Multipliziere das Quadrat mit der 1. binomischen Formel aus – $x^2$ hebt sich dann auf.' });
  });
  G('8-gleichung', 3, function () {
    var p = R.pick([[2, 3], [2, 4], [3, 6], [2, 6], [4, 4], [3, 3], [2, 5]]), hn = M.lcm(p[0], p[1]), x = hn * R.int(1, 4), r = x / p[0] + x / p[1];
    return NUM('Löse die Gleichung: ${x/' + p[0] + '} + {x/' + p[1] + '} = ' + r + '$', x, { pre: '$x =$', sol: 'Mit dem Hauptnenner ' + hn + ' multiplizieren: $' + co(hn / p[0], 'x') + ' + ' + co(hn / p[1], 'x') + ' = ' + r * hn + '$, also $' + (hn / p[0] + hn / p[1]) + 'x = ' + r * hn + '$ und $x = ' + x + '$.', hint: 'Multipliziere beide Seiten mit dem Hauptnenner (Klasse 6) – dann verschwinden die Brüche.' });
  });
  G('8-gleichung', 3, function () {
    var b = R.int(3, 9), d = R.int(1, 6), u = 2 * (2 * b + d);
    return NUM('Ein Rechteck ist ' + d + ' cm länger als breit. Sein Umfang beträgt ' + u + ' cm. Wie breit ist es?', b, { unit: 'cm', sol: 'Breite $x$, Länge $x + ' + d + '$. Umfang: $2 * (x + x + ' + d + ') = ' + u + '$, also $4x + ' + 2 * d + ' = ' + u + '$, $4x = ' + (u - 2 * d) + '$ und $x = ' + b + '$.', hint: 'Nenne die Breite $x$ und stelle eine Gleichung für den Umfang auf.' });
  });

  /* ---------- 8-lgs ---------- */
  G('8-lgs', 1, function () {
    var x = R.nz(-3, 5), y = R.nz(-3, 5), a = R.int(1, 3), b = R.int(1, 3), ok = R.bool(), tx = ok ? x : x + R.pick([-1, 1]);
    return TF('Ist das Zahlenpaar $(' + tx + '|' + y + ')$ eine Lösung des Gleichungssystems?<br>I: $' + sum([co(a, 'x'), co(b, 'y')]) + ' = ' + (a * x + b * y) + '$<br>II: $x - y = ' + (x - y) + '$', ok, { sol: 'Einsetzen in I: $' + (a * tx + b * y) + (a * tx + b * y === a * x + b * y ? ' = ' : ' != ') + (a * x + b * y) + '$. Einsetzen in II: $' + (tx - y) + (tx - y === x - y ? ' = ' : ' != ') + (x - y) + '$. ' + (ok ? 'Beide Gleichungen sind erfüllt.' : 'Eine Lösung muss beide Gleichungen erfüllen.'), hint: 'Setze $x$ und $y$ in beide Gleichungen ein.' });
  });
  G('8-lgs', 1, function () {
    var x0 = R.int(1, 5), y0 = R.int(1, 5), m1 = R.pick([1, 2, 0.5]), m2 = R.pick([-1, -0.5, -2]);
    return GAP('Die beiden Geraden gehören zu den Gleichungen eines linearen Gleichungssystems. Lies die Lösung ab.', [{ pre: '$x =$', ans: x0 }, { pre: '$y =$', ans: y0 }], { fig: Fig.graph({ x: [-1, 7], y: [-1, 7], w: 240, fns: [{ f: function (t) { return m1 * (t - x0) + y0; } }, { f: function (t) { return m2 * (t - x0) + y0; } }] }), sol: 'Die Lösung ist der Schnittpunkt der beiden Geraden: $(' + x0 + '|' + y0 + ')$. Nur dieser Punkt liegt auf beiden Geraden und erfüllt deshalb beide Gleichungen.', hint: 'Welcher Punkt liegt auf beiden Geraden?' });
  });
  G('8-lgs', 2, function () {
    var x = R.nz(-3, 5), m = R.pick([2, 3, -1, -2, 1]), n = R.nz(-4, 5), y = m * x + n, a = R.int(1, 3), b = R.int(1, 2), c = a * x + b * y;
    return GAP('Löse mit dem Einsetzungsverfahren:<br>I: $y = ' + lin(m, 'x', n) + '$<br>II: $' + sum([co(a, 'x'), co(b, 'y')]) + ' = ' + c + '$', [{ pre: '$x =$', ans: x }, { pre: '$y =$', ans: y }], { sol: 'I in II einsetzen: $' + co(a, 'x') + ' + ' + (b === 1 ? '' : b + ' * ') + '(' + lin(m, 'x', n) + ') = ' + c + '$. Das ergibt $' + lin(a + b * m, 'x', b * n) + ' = ' + c + '$, also $x = ' + x + '$. In I: $y = ' + y + '$.', hint: 'Ersetze in Gleichung II das $y$ durch den Term aus Gleichung I.' });
  });
  G('8-lgs', 2, function () {
    var x = R.nz(-4, 8), y = R.nz(-4, 8);
    return GAP('Löse mit dem Additionsverfahren:<br>I: $x + y = ' + (x + y) + '$<br>II: $x - y = ' + (x - y) + '$', [{ pre: '$x =$', ans: x }, { pre: '$y =$', ans: y }], { sol: 'I + II: $2x = ' + 2 * x + '$, also $x = ' + x + '$. In I: $' + x + ' + y = ' + (x + y) + '$, also $y = ' + y + '$.', hint: 'Addiere beide Gleichungen – dann fällt $y$ weg.' });
  });
  G('8-lgs', 2, function () {
    var x = R.nz(-3, 5), y = R.nz(-3, 5), a = R.int(2, 4), b = R.int(1, 4), d = R.int(1, 3);
    return GAP('Löse das Gleichungssystem:<br>I: $' + sum([co(a, 'x'), co(b, 'y')]) + ' = ' + (a * x + b * y) + '$<br>II: $' + sum([co(d, 'x'), co(-b, 'y')]) + ' = ' + (d * x - b * y) + '$', [{ pre: '$x =$', ans: x }, { pre: '$y =$', ans: y }], { sol: 'I + II: $' + (a + d) + 'x = ' + ((a + d) * x) + '$, also $x = ' + x + '$. In I: $' + a * x + ' + ' + co(b, 'y') + ' = ' + (a * x + b * y) + '$, also $y = ' + y + '$.', hint: 'Die Glieder mit $y$ haben entgegengesetzte Vorzeichen – addiere die Gleichungen.' });
  });
  G('8-lgs', 2, function () {
    var m = R.pick([2, 3, -1, 0.5]), n = R.nz(-3, 4), v = R.int(0, 2), g2, sol;
    if (v === 0) { g2 = 'y = ' + lin(m, 'x', n + R.pick([2, 3, -2])); sol = 'Gleicher Anstieg, verschiedene Achsenabschnitte: Die Geraden sind parallel und haben keinen gemeinsamen Punkt.'; }
    else if (v === 1) { g2 = '2y = ' + lin(2 * m, 'x', 2 * n); sol = 'Teilt man II durch 2, entsteht genau Gleichung I: Beide Geraden sind identisch – jeder ihrer Punkte ist Lösung.'; }
    else { g2 = 'y = ' + lin(m === -1 ? 2 : -1, 'x', n + 1); sol = 'Verschiedene Anstiege: Die Geraden schneiden sich in genau einem Punkt.'; }
    return MCF('Wie viele Lösungen hat das Gleichungssystem?<br>I: $y = ' + lin(m, 'x', n) + '$<br>II: $' + g2 + '$', ['keine Lösung', 'unendlich viele Lösungen', 'genau eine Lösung'], v, { sol: sol, hint: 'Vergleiche die Anstiege und die Achsenabschnitte der beiden Geraden (lineare Funktionen).' });
  });
  G('8-lgs', 2, function () {
    var x = R.int(2, 8), y = R.int(1, 6), v = R.bool();
    return MC('I: $x + y = ' + (x + y) + '$ und II: $x - y = ' + (x - y) + '$. Was entsteht, wenn man beide Gleichungen ' + (v ? 'addiert' : 'voneinander subtrahiert (I − II)') + '?', v ? '$2x = ' + 2 * x + '$' : '$2y = ' + 2 * y + '$', [v ? '$2y = ' + 2 * y + '$' : '$2x = ' + 2 * x + '$', '$2x + 2y = ' + 2 * x + '$', '$x = ' + 2 * x + '$', '$0 = ' + 2 * y + '$'], { sol: v ? 'Links: $x + y + x - y = 2x$. Rechts: $' + (x + y) + ' + ' + par(x - y) + ' = ' + 2 * x + '$.' : 'Links: $x + y - (x - y) = 2y$. Rechts: $' + (x + y) + ' - ' + par(x - y) + ' = ' + 2 * y + '$.', hint: 'Addiere bzw. subtrahiere linke Seiten und rechte Seiten getrennt.' });
  });
  G('8-lgs', 2, function () {
    var q = R.pick([['keine Lösung hat', 'Die Geraden sind parallel und verschieden.'], ['unendlich viele Lösungen hat', 'Die Geraden sind identisch.'], ['genau eine Lösung hat', 'Die Geraden schneiden sich in einem Punkt.']]);
    return MC('Was bedeutet es geometrisch, wenn ein lineares Gleichungssystem mit zwei Variablen ' + q[0] + '?', q[1], ['Die Geraden sind parallel und verschieden.', 'Die Geraden sind identisch.', 'Die Geraden schneiden sich in einem Punkt.', 'Die Geraden stehen immer senkrecht aufeinander.'], { sol: 'Zwei Geraden in der Ebene können sich schneiden, parallel sein oder zusammenfallen – eine vollständige Fallunterscheidung.', hint: 'Jede Gleichung beschreibt eine Gerade. Wie können zwei Geraden zueinander liegen?' });
  });
  G('8-lgs', 3, function () {
    var cats = R.int(3, 9), ravens = R.int(3, 9), n = cats + ravens, legs = 4 * cats + 2 * ravens;
    return GAP('Im Innenhof der Akademie sitzen Katzen und Raben: zusammen ' + n + ' Tiere mit ' + legs + ' Beinen. Wie viele Katzen und wie viele Raben sind es?', [{ pre: 'Katzen:', ans: cats }, { pre: 'Raben:', ans: ravens }], { sol: 'I: $k + r = ' + n + '$. II: $4k + 2r = ' + legs + '$. Aus I: $r = ' + n + ' - k$. In II: $4k + ' + 2 * n + ' - 2k = ' + legs + '$, also $2k = ' + (legs - 2 * n) + '$ und $k = ' + cats + '$, $r = ' + ravens + '$.', hint: 'Stelle zwei Gleichungen auf: eine für die Anzahl der Tiere, eine für die Beine.' });
  });
  G('8-lgs', 3, function () {
    var b = R.int(2, 12), d = R.int(1, 9), a = b + d;
    return GAP('Die Summe zweier Zahlen ist ' + (a + b) + ', ihre Differenz ist ' + d + '. Wie heißen die beiden Zahlen?', [{ pre: 'größere Zahl:', ans: a }, { pre: 'kleinere Zahl:', ans: b }], { sol: 'I: $x + y = ' + (a + b) + '$. II: $x - y = ' + d + '$. Addieren: $2x = ' + (a + b + d) + '$, also $x = ' + a + '$ und $y = ' + b + '$.', hint: 'Zwei Unbekannte, zwei Bedingungen: Stelle ein Gleichungssystem auf.' });
  });
  G('8-lgs', 3, function () {
    var e = R.int(5, 12), k = R.int(2, e - 1);
    return GAP('Für das Schulkonzert zahlen 2 Erwachsene und 3 Kinder zusammen ' + (2 * e + 3 * k) + ' Taler. 1 Erwachsener und 2 Kinder zahlen ' + (e + 2 * k) + ' Taler. Was kostet eine Karte?', [{ pre: 'Erwachsene:', ans: e, unit: 'Taler' }, { pre: 'Kinder:', ans: k, unit: 'Taler' }], { sol: 'I: $2e + 3k = ' + (2 * e + 3 * k) + '$. II: $e + 2k = ' + (e + 2 * k) + '$. II mal 2: $2e + 4k = ' + (2 * e + 4 * k) + '$. Davon I abziehen: $k = ' + k + '$. In II: $e = ' + e + '$.', hint: 'Verdopple die zweite Gleichung und ziehe die erste ab.' });
  });

  /* ---------- 8-logik ---------- */
  var EV = [['gerade Zahl', [2, 4, 6]], ['ungerade Zahl', [1, 3, 5]], ['Zahl größer als 3', [4, 5, 6]], ['Primzahl', [2, 3, 5]], ['Zahl kleiner als 3', [1, 2]], ['durch 3 teilbare Zahl', [3, 6]], ['Zahl größer als 4', [5, 6]], ['Zahl kleiner als 5', [1, 2, 3, 4]]];
  function set(s) { return s.length ? '{' + s.join('; ') + '}' : '{ } (leere Menge)'; }
  function two() { var p = R.sample(EV, 2); return p; }
  G('8-logik', 1, function () {
    var p = two(), A = p[0][1], B = p[1][1], inter = A.filter(function (x) { return B.indexOf(x) >= 0; }), uni = [1, 2, 3, 4, 5, 6].filter(function (x) { return A.indexOf(x) >= 0 || B.indexOf(x) >= 0; });
    return MC('Ein Würfel wird geworfen. $A$: „' + p[0][0] + '“, $B$: „' + p[1][0] + '“. Welche Ergebnisse gehören zu $A ∩ B$ ($A$ UND $B$)?', set(inter), [set(uni), set(A), set(B), set([1, 2, 3, 4, 5, 6].filter(function (x) { return uni.indexOf(x) < 0; }))], { sol: '$A$ = ' + set(A) + ', $B$ = ' + set(B) + '. UND heißt: in beiden Mengen – ' + set(inter) + '.', hint: 'Schreibe erst beide Mengen auf. UND: Was kommt in beiden vor?' });
  });
  G('8-logik', 1, function () {
    var p = two(), A = p[0][1], B = p[1][1], inter = A.filter(function (x) { return B.indexOf(x) >= 0; }), uni = [1, 2, 3, 4, 5, 6].filter(function (x) { return A.indexOf(x) >= 0 || B.indexOf(x) >= 0; });
    return NUM('Ein Würfel wird geworfen. $A$: „' + p[0][0] + '“, $B$: „' + p[1][0] + '“. Wie viele Ergebnisse gehören zu $A ∪ B$ ($A$ ODER $B$)?', uni.length, { sol: '$A$ = ' + set(A) + ', $B$ = ' + set(B) + '. ODER heißt: in mindestens einer Menge – ' + set(uni) + ', das sind ' + uni.length + ' Ergebnisse.', hint: 'Das mathematische ODER schließt „beides“ ein. Zähle kein Ergebnis doppelt.' });
  });
  G('8-logik', 1, function () {
    var q = R.pick([['Beim zweimaligen Würfeln fällt mindestens eine Sechs.', 'Es fällt keine Sechs.', ['Es fallen zwei Sechsen.', 'Es fällt genau eine Sechs.', 'Es fällt höchstens eine Sechs.']], ['Alle drei Münzen zeigen Kopf.', 'Mindestens eine Münze zeigt Zahl.', ['Alle drei Münzen zeigen Zahl.', 'Genau eine Münze zeigt Zahl.', 'Keine Münze zeigt Zahl.']], ['Die gewürfelte Zahl ist gerade.', 'Die gewürfelte Zahl ist ungerade.', ['Die gewürfelte Zahl ist eine Primzahl.', 'Die gewürfelte Zahl ist größer als 3.', 'Die gewürfelte Zahl ist eine Sechs.']], ['Die gezogene Kugel ist rot.', 'Die gezogene Kugel ist nicht rot.', ['Die gezogene Kugel ist blau.', 'Es wird keine Kugel gezogen.', 'Die gezogene Kugel ist rot oder blau.']]]);
    return MC('Wie lautet das Gegenereignis (NICHT)? „' + q[0] + '“', q[1], q[2], { sol: 'Das Gegenereignis enthält genau die Ergebnisse, die nicht zum Ereignis gehören: „' + q[1] + '“', hint: 'Ereignis und Gegenereignis zusammen müssen alle Möglichkeiten abdecken – ohne Überschneidung.' });
  });
  G('8-logik', 2, function () {
    var n = R.pick([12, 15, 18, 20, 21, 24, 25, 30, 35]), a = R.pick([2, 3, 5]), b = R.pick([4, 5, 7, 9]), op = R.pick(['UND', 'ODER']);
    if (a === b) return null;
    var A = n % a === 0, B = n % b === 0, truth = op === 'UND' ? A && B : A || B;
    return TF('Wahr oder falsch? „' + n + ' ist durch ' + a + ' teilbar ' + op + ' ' + n + ' ist durch ' + b + ' teilbar.“', truth, { sol: 'Erste Teilaussage: ' + (A ? 'wahr' : 'falsch') + '. Zweite Teilaussage: ' + (B ? 'wahr' : 'falsch') + '. ' + (op === 'UND' ? 'UND verlangt, dass beide wahr sind.' : 'ODER verlangt, dass mindestens eine wahr ist – auch beide dürfen wahr sein.'), hint: 'Prüfe beide Teilaussagen einzeln (Teilbarkeitsregeln, Klasse 5).' });
  });
  G('8-logik', 2, function () {
    var both = R.int(2, 6), a = both + R.int(3, 9), b = both + R.int(3, 9);
    return NUM('In einer Klasse spielen ' + a + ' Kinder ein Instrument, ' + b + ' Kinder singen im Chor, ' + both + ' Kinder tun beides. Wie viele Kinder spielen ein Instrument ODER singen im Chor?', a + b - both, { fig: Fig.venn({ la: 'I', lb: 'C', n: [a - both, both, b - both], shade: 'union' }), sol: '$' + a + ' + ' + b + ' - ' + both + ' = ' + (a + b - both) + '$. Die ' + both + ' Kinder, die beides tun, würde man sonst doppelt zählen.', hint: 'Addierst du einfach, zählst du die Kinder in der Mitte doppelt.' });
  });
  G('8-logik', 2, function () {
    var q = R.pick([['für eine ganze Zahl $n$', '$n$ ist gerade – $n$ ist ungerade', ['$n$ ist positiv – $n$ ist negativ', '$n < 5$ – $n > 5$', '$n$ ist eine Primzahl – $n$ ist gerade'], 'Jede ganze Zahl ist entweder gerade oder ungerade. Bei den anderen Vorschlägen fehlt ein Fall (0 bzw. 5) oder Fälle überschneiden sich (2 ist prim und gerade).'], ['für zwei Geraden in der Ebene', 'sie schneiden sich – sie sind parallel und verschieden – sie sind identisch', ['sie schneiden sich – sie sind parallel und verschieden', 'sie stehen senkrecht – sie sind parallel', 'sie schneiden sich – sie berühren sich'], 'Genau diese drei Lagen gibt es. Daraus folgen die drei Lösungsfälle eines Gleichungssystems.'], ['für ein Dreieck (nach Winkeln)', 'spitzwinklig – rechtwinklig – stumpfwinklig', ['spitzwinklig – stumpfwinklig', 'gleichseitig – rechtwinklig', 'gleichschenklig – rechtwinklig – stumpfwinklig'], 'Der größte Winkel ist entweder kleiner als 90°, gleich 90° oder größer als 90°.'], ['für eine rationale Zahl $x$', '$x < 0$ – $x = 0$ – $x > 0$', ['$x < 0$ – $x > 0$', '$x <= 0$ – $x >= 0$', '$x$ ist ganz – $x$ ist negativ'], 'Jede Zahl ist negativ, null oder positiv – und nie zwei davon zugleich.']]);
    return MC('Welche Fallunterscheidung ist vollständig ' + q[0] + ' (jeder Fall kommt genau einmal vor)?', q[1], q[2], { sol: q[3], hint: 'Prüfe: Wird kein Fall vergessen? Kommt kein Fall doppelt vor?' });
  });
  G('8-logik', 2, function () {
    var p = two(), A = p[0][1], B = p[1][1], diff = A.filter(function (x) { return B.indexOf(x) < 0; });
    return MC('Ein Würfel wird geworfen. $A$: „' + p[0][0] + '“, $B$: „' + p[1][0] + '“. Welche Ergebnisse gehören zu „$A$ und NICHT $B$“?', set(diff), [set(B.filter(function (x) { return A.indexOf(x) < 0; })), set(A.filter(function (x) { return B.indexOf(x) >= 0; })), set(A), set([1, 2, 3, 4, 5, 6].filter(function (x) { return B.indexOf(x) < 0; }))], { sol: '$A$ = ' + set(A) + '. Davon werden die Ergebnisse aus $B$ = ' + set(B) + ' gestrichen: ' + set(diff) + '.', hint: 'Starte mit $A$ und streiche alles, was auch in $B$ liegt.' });
  });
  G('8-logik', 3, function () {
    var q = R.pick([['Alle Schüler der Klasse haben ein Instrument.', 'Mindestens ein Schüler der Klasse hat kein Instrument.', ['Kein Schüler der Klasse hat ein Instrument.', 'Alle Schüler der Klasse haben kein Instrument.', 'Mindestens ein Schüler der Klasse hat ein Instrument.']], ['Es gibt eine Primzahl, die gerade ist.', 'Alle Primzahlen sind ungerade.', ['Es gibt eine Primzahl, die ungerade ist.', 'Alle Primzahlen sind gerade.', 'Keine Primzahl ist ungerade.']], ['Die Zahl ist größer als 5.', 'Die Zahl ist kleiner oder gleich 5.', ['Die Zahl ist kleiner als 5.', 'Die Zahl ist gleich 5.', 'Die Zahl ist größer oder gleich 5.']], ['Es regnet UND es ist kalt.', 'Es regnet nicht ODER es ist nicht kalt.', ['Es regnet nicht UND es ist nicht kalt.', 'Es regnet ODER es ist kalt.', 'Es regnet nicht UND es ist kalt.']]]);
    return MC('Welche Aussage ist die genaue Verneinung (NICHT)? „' + q[0] + '“', q[1], q[2], { sol: 'Die Verneinung ist genau dann wahr, wenn die Aussage falsch ist: „' + q[1] + '“', hint: 'Wann genau ist die Aussage falsch? Das beschreibt die Verneinung.' });
  });
  G('8-logik', 3, function () {
    var x = R.int(2, 12), a = R.int(2, 4), b = R.int(1, 9) * a - a * x % a, c = a;
    b = R.int(1, 6) * c - (a * x) % c;
    var res = (a * x + b) / c;
    if (res % 1) return null;
    return NUM('Ich denke mir eine Zahl, multipliziere sie mit ' + a + ', addiere ' + b + ' und teile durch ' + c + '. Ich erhalte ' + res + '. Wie heißt meine Zahl?', x, { sol: 'Rückwärtsarbeiten: $' + res + ' * ' + c + ' = ' + res * c + '$, dann $' + res * c + ' - ' + b + ' = ' + a * x + '$, dann $' + a * x + ' : ' + a + ' = ' + x + '$.', hint: 'Beginne beim Ergebnis und mache jeden Schritt in umgekehrter Reihenfolge rückgängig.' });
  });
  G('8-logik', 2, function () {
    var q = R.pick([['Du kennst von einem Rechteck Länge und Breite und rechnest der Reihe nach Umfang, Flächeninhalt und Diagonale aus.', 0], ['Du sollst zeigen, dass zwei Dreiecke ähnlich sind, und überlegst zuerst: „Welcher Satz liefert Ähnlichkeit, und was brauche ich dafür?“', 1], ['Bei einem Zahlenrätsel beginnst du mit dem Endergebnis und kehrst jeden Rechenschritt um.', 1], ['Du setzt in eine Formel alle bekannten Größen ein und schaust, was sich daraus ergibt.', 0]]);
    return MCF(q[0] + ' Welche Strategie ist das?', ['Vorwärtsarbeiten', 'Rückwärtsarbeiten', 'Fallunterscheidung'], q[1], { sol: 'Vorwärts: vom Gegebenen zum Gesuchten. Rückwärts: vom Gesuchten aus fragen, was man dafür braucht.', hint: 'Wo beginnt der Gedankengang – beim Gegebenen oder beim Ziel?' });
  });
  G('8-logik', 3, function () {
    var p = two(), A = p[0][1], B = p[1][1], uni = [1, 2, 3, 4, 5, 6].filter(function (x) { return A.indexOf(x) >= 0 || B.indexOf(x) >= 0; }), inter = A.filter(function (x) { return B.indexOf(x) >= 0; });
    return NUM('Ein Würfel wird geworfen. $A$: „' + p[0][0] + '“, $B$: „' + p[1][0] + '“. Wie groß ist die Wahrscheinlichkeit $P(A ∪ B)$? (vollständig gekürzter Bruch oder ganze Zahl)', M.F(uni.length, 6), { reduced: true, sol: '$A ∪ B$ = ' + set(uni) + ': ' + uni.length + ' von 6 Ergebnissen. Oder: $P(A) + P(B) - P(A ∩ B) = {' + A.length + '/6} + {' + B.length + '/6} - {' + inter.length + '/6} = ' + M.fs(M.F(uni.length, 6)) + '$', hint: 'Bestimme zuerst die Menge $A ∪ B$ und zähle ihre Elemente.' });
  });
})(typeof window !== 'undefined' ? window : globalThis);

/* Silberzirkel – Aufgaben Klasse 9 (Lehrplan Sachsen, Gymnasium). */
(function (g) {
  'use strict';
  var SZ = g.SZ, R = SZ.R, M = SZ.M, G = SZ.G, MC = SZ.MC, MCN = SZ.MCN, MCF = SZ.MCF, NUM = SZ.NUM, GAP = SZ.GAP, TF = SZ.TF, ORD = SZ.ORD, Fig = SZ.Fig, de = M.de, F = M.F, fs = M.fs, lin = M.lin, par = M.par;
  function sg(x) { return x < 0 ? '- ' + de(-x).replace('−', '') : '+ ' + de(x); }
  function vform(d, e) { return '(x ' + sg(-d) + ')^2' + (e ? ' ' + sg(e) : ''); }   // (x − d)² + e
  function rtri(a, b, labs, ang) {                    // rechtwinkliges Dreieck, rechter Winkel bei C
    return Fig.shape({ P: [[0, 0], [a, 0], [0, b]], v: ['C', 'B', 'A'], s: labs, ang: [{ at: 0, right: true }].concat(ang || []), maxh: 120 });
  }

  /* ---------- 9-potenz ---------- */
  G('9-potenz', 1, function () {
    var a = R.pick([2, 3, 5, 10, 'a', 'x']), m = R.nz(-4, 7), n = R.nz(-4, 7), v = R.int(0, 2);
    if (v === 0) return NUM('Fasse zu einer Potenz zusammen: $' + a + '^{' + m + '} * ' + a + '^{' + n + '} = ' + a + '^n$. Wie groß ist der Exponent $n$?', m + n, { pre: '$n =$', sol: 'Gleiche Basis: Exponenten addieren. $' + m + ' + ' + par(n) + ' = ' + (m + n) + '$', hint: 'Beim Multiplizieren von Potenzen mit gleicher Basis werden die Exponenten addiert.' });
    if (v === 1) return NUM('Fasse zu einer Potenz zusammen: $' + a + '^{' + m + '} : ' + a + '^{' + n + '} = ' + a + '^n$. Wie groß ist der Exponent $n$?', m - n, { pre: '$n =$', sol: 'Gleiche Basis: Exponenten subtrahieren. $' + m + ' - ' + par(n) + ' = ' + (m - n) + '$', hint: 'Beim Dividieren von Potenzen mit gleicher Basis werden die Exponenten subtrahiert.' });
    m = R.int(2, 5); n = R.nz(-3, 4);
    return NUM('Fasse zu einer Potenz zusammen: $(' + a + '^{' + m + '})^{' + n + '} = ' + a + '^n$. Wie groß ist der Exponent $n$?', m * n, { pre: '$n =$', sol: 'Potenz einer Potenz: Exponenten multiplizieren. $' + m + ' * ' + par(n) + ' = ' + m * n + '$', hint: 'Beim Potenzieren einer Potenz werden die Exponenten multipliziert.' });
  });
  G('9-potenz', 1, function () {
    var b = R.pick([2, 3, 4, 5, 10]), e = R.int(1, b === 2 ? 5 : b === 10 ? 3 : 2);
    return NUM('Berechne: $' + b + '^{-' + e + '}$ (Bruch oder Dezimalzahl)', F(1, Math.pow(b, e)), { sol: '$' + b + '^{-' + e + '} = {1/' + b + '^' + e + '} = {1/' + Math.pow(b, e) + '}$', hint: 'Ein negativer Exponent bedeutet: Kehrwert bilden.' });
  });
  G('9-potenz', 2, function () {
    var b = R.int(2, 9), v = R.int(0, 2);
    if (v === 0) return NUM('Berechne: $' + b + '^0 + ' + b + '^1$', 1 + b, { sol: '$' + b + '^0 = 1$ und $' + b + '^1 = ' + b + '$, zusammen $' + (1 + b) + '$.', hint: 'Jede Zahl (außer 0) hoch 0 ergibt 1.' });
    if (v === 1) return NUM('Berechne: $(' + b + '^0)^5 * ' + b + '^2$', b * b, { sol: '$' + b + '^0 = 1$, $1^5 = 1$, also $1 * ' + b * b + ' = ' + b * b + '$.', hint: 'Jede Zahl (außer 0) hoch 0 ergibt 1.' });
    var e = R.int(2, 4);
    return NUM('Berechne: $' + b + '^' + e + ' * ' + b + '^{-' + e + '}$', 1, { sol: 'Exponenten addieren: $' + b + '^{' + e + ' - ' + e + '} = ' + b + '^0 = 1$', hint: 'Addiere die Exponenten.' });
  });
  G('9-potenz', 2, function () {
    var q = R.pick([[8, '1/3', 2], [16, '1/2', 4], [27, '1/3', 3], [32, '1/5', 2], [81, '1/4', 3], [27, '2/3', 9], [8, '2/3', 4], [16, '3/4', 8], [100, '1/2', 10], [64, '1/3', 4], [4, '3/2', 8], [9, '3/2', 27], [125, '1/3', 5]]), p = q[1].split('/');
    return NUM('Berechne: $' + q[0] + '^{' + q[1] + '}$', q[2], { sol: 'Der Nenner des Exponenten ist der Wurzelexponent' + (p[0] === '1' ? '' : ', der Zähler die Potenz') + ': ' + (p[1] === '2' ? 'Quadratwurzel' : p[1] + '. Wurzel') + ' aus ' + q[0] + ' ist ' + Math.round(Math.pow(q[0], 1 / p[1])) + (p[0] === '1' ? '.' : ', hoch ' + p[0] + ' ergibt ' + q[2] + '.'), hint: '$a^{1/n}$ ist die $n$-te Wurzel aus $a$.' });
  });
  G('9-potenz', 2, function () {
    var p = R.pick([[2, 5, 3], [4, 25, 2], [2, 50, 2], [5, 20, 2], [4, 5, 3], [2, 5, 4], [25, 4, 3], [8, 125, 1]]);
    if (p[2] === 1) return null;
    return NUM('Rechne geschickt: $' + p[0] + '^' + p[2] + ' * ' + p[1] + '^' + p[2] + '$', Math.pow(p[0] * p[1], p[2]), { sol: 'Gleicher Exponent: $(' + p[0] + ' * ' + p[1] + ')^' + p[2] + ' = ' + p[0] * p[1] + '^' + p[2] + ' = ' + de(Math.pow(p[0] * p[1], p[2])) + '$', hint: 'Bei gleichem Exponenten darf man erst die Basen multiplizieren.' });
  });
  G('9-potenz', 2, function () {
    var m = R.int(2, 6), n = R.int(2, 5), k = R.int(2, 3);
    if (m === 2 && n === 2) n = 3;
    var q = R.pick([
      ['x^' + m + ' * x^' + n, 'x^{' + (m + n) + '}', ['x^{' + m * n + '}', '2x^{' + (m + n) + '}', m === n ? 'x^' + m : 'x^{' + Math.abs(m - n) + '}']],
      ['(a^' + m + ')^' + n, 'a^{' + m * n + '}', ['a^{' + (m + n) + '}', a2(m, n), n + 'a^' + m]],
      ['{x^' + (m + n) + '/x^' + n + '}', 'x^' + m, ['x^{' + (m + 2 * n) + '}', 'x^{' + (m + n) * n + '}', '1']],
      ['(' + k + 'x)^' + n, Math.pow(k, n) + 'x^' + n, [k + 'x^' + n, k * n + 'x^' + n, Math.pow(k, n) + 'x']],
      ['x^' + m + ' * y^' + m, '(xy)^' + m, ['(xy)^{' + 2 * m + '}', 'x^{' + 2 * m + '}y', '(x + y)^' + m]]
    ]);
    function a2(mm, nn) { return 'a^{' + Math.pow(mm, nn) + '}'; }
    return MC('Vereinfache: $' + q[0] + '$', '$' + q[1] + '$', q[2].map(function (x) { return '$' + x + '$'; }), { sol: 'Potenzgesetz anwenden: $' + q[0] + ' = ' + q[1] + '$', hint: 'Gleiche Basis: Exponenten addieren oder subtrahieren. Potenz einer Potenz: Exponenten multiplizieren.' });
  });
  G('9-potenz', 3, function () {
    var p = R.pick([[2, 3], [3, 2], [1, 2], [2, 5], [3, 4], [1, 3]]), e = R.pick([2, 3]);
    if (Math.pow(p[1], e) > 130) e = 2;
    return NUM('Berechne: $({' + p[0] + '/' + p[1] + '})^{-' + e + '}$ (Bruch oder ganze Zahl)', F(Math.pow(p[1], e), Math.pow(p[0], e)), { reduced: true, sol: 'Negativer Exponent: Kehrwert bilden, dann potenzieren. $({' + p[1] + '/' + p[0] + '})^' + e + ' = ' + fs(F(Math.pow(p[1], e), Math.pow(p[0], e))) + '$', hint: 'Der negative Exponent dreht den Bruch um.' });
  });
  G('9-potenz', 3, function () {
    var b = R.pick([2, 3, 5, 10]), x = R.pick([-3, -2, -1, 0, 3, 4]), val = x >= 0 ? String(Math.pow(b, x)) : '{1/' + Math.pow(b, -x) + '}';
    return NUM('Für welchen Exponenten $x$ gilt $' + b + '^x = ' + val + '$?', x, { pre: '$x =$', sol: x === 0 ? 'Jede Zahl hoch 0 ergibt 1: $x = 0$.' : (x > 0 ? '$' + b + '^' + x + ' = ' + Math.pow(b, x) + '$' : '$' + b + '^{' + x + '} = {1/' + b + '^' + (-x) + '} = {1/' + Math.pow(b, -x) + '}$'), hint: 'Schreibe die rechte Seite als Potenz von ' + b + '.' });
  });
  G('9-potenz', 3, function () {
    var st = R.pick([['$a^2 + a^3 = a^5$', false, 'Für Summen gibt es kein Potenzgesetz. Probe mit $a = 2$: $4 + 8 = 12$, aber $2^5 = 32$.'], ['$a^2 * a^3 = a^5$', true, 'Gleiche Basis: Exponenten addieren.'], ['$(a + b)^2 = a^2 + b^2$', false, 'Binomische Formel (Klasse 8): Es fehlt $2ab$.'], ['$(a * b)^2 = a^2 * b^2$', true, 'Gleicher Exponent: Die Faktoren lassen sich umsortieren.'], ['$a^{-1} = -a$', false, '$a^{-1} = {1/a}$ – der Kehrwert, nicht die Gegenzahl.'], ['$(a^3)^2 = a^9$', false, 'Exponenten multiplizieren: $a^6$.'], ['$a^0 = 1$ für jedes $a != 0$', true, 'Permanenzprinzip: $a^n : a^n = a^{n-n} = a^0$, und eine Zahl durch sich selbst ist 1.'], ['$a^{1/2} = sqrt(a)$ für $a >= 0$', true, '$(a^{1/2})^2 = a^1 = a$ – genau das leistet die Quadratwurzel.']]);
    return TF('Gilt das? ' + st[0], st[1], { sol: st[2], hint: 'Setze zur Probe eine Zahl ein.' });
  });

  /* ---------- 9-wurzel ---------- */
  G('9-wurzel', 1, function () {
    var q = R.pick([[8, 2], [27, 3], [64, 4], [125, 5], [1000, 10], [1, 1], [216, 6]]);
    return NUM('Berechne die dritte Wurzel: $cbrt(' + q[0] + ')$', q[1], { sol: '$' + q[1] + '^3 = ' + q[0] + '$, also $cbrt(' + q[0] + ') = ' + q[1] + '$.', hint: 'Welche Zahl ergibt dreimal mit sich selbst multipliziert ' + q[0] + '?' });
  });
  G('9-wurzel', 1, function () {
    var irr = R.pick(['sqrt(2)', 'sqrt(3)', 'sqrt(5)', 'sqrt(10)', 'pi', 'sqrt(7)']), rat = R.sample(['sqrt(4)', 'sqrt(9)', '0,[3]', '{3/7}', '-2,5', 'sqrt(0,25)', '1,41', 'sqrt({4/9})', '3,14'], 3);
    return MC('Welche dieser Zahlen ist irrational?', '$' + irr + '$', rat.map(function (x) { return '$' + x + '$'; }), { sol: 'Irrational sind Zahlen, die sich nicht als Bruch schreiben lassen. $' + irr + '$ hat eine unendliche, nicht periodische Dezimaldarstellung. Die anderen sind Brüche, endliche oder periodische Dezimalzahlen oder Wurzeln aus Quadratzahlen.', hint: 'Wurzeln aus Quadratzahlen sind rational. Periodische Dezimalzahlen sind Brüche.' });
  });
  G('9-wurzel', 2, function () {
    var k = R.pick([2, 3, 4, 5, 6, 10]), r = R.pick([2, 3, 5]);
    return NUM('Ziehe teilweise die Wurzel: $sqrt(' + k * k * r + ') = ▢ * sqrt(' + r + ')$. Welche Zahl fehlt?', k, { sol: '$sqrt(' + k * k * r + ') = sqrt(' + k * k + ' * ' + r + ') = sqrt(' + k * k + ') * sqrt(' + r + ') = ' + k + ' * sqrt(' + r + ')$', hint: 'Zerlege den Radikanden in eine Quadratzahl mal ' + r + '.' });
  });
  G('9-wurzel', 2, function () {
    var p = R.pick([[2, 8, 4], [3, 12, 6], [2, 18, 6], [5, 20, 10], [3, 27, 9], [2, 32, 8], [5, 45, 15], [6, 24, 12], [2, 50, 10]]);
    return NUM('Berechne: $sqrt(' + p[0] + ') * sqrt(' + p[1] + ')$', p[2], { sol: '$sqrt(' + p[0] + ' * ' + p[1] + ') = sqrt(' + p[0] * p[1] + ') = ' + p[2] + '$', hint: 'Wurzeln darf man multiplizieren: $sqrt(a) * sqrt(b) = sqrt(a * b)$.' });
  });
  G('9-wurzel', 2, function () {
    var r = R.int(2, 12), c = R.int(1, 9), v = R.bool();
    if (v) return NUM('Löse die Wurzelgleichung: $sqrt(x + ' + c + ') = ' + r + '$', r * r - c, { pre: '$x =$', sol: 'Quadrieren: $x + ' + c + ' = ' + r * r + '$, also $x = ' + (r * r - c) + '$. Probe: $sqrt(' + r * r + ') = ' + r + '$ ✓', hint: 'Quadriere beide Seiten – und mache die Probe.' });
    return NUM('Löse die Wurzelgleichung: $sqrt(x) + ' + c + ' = ' + (r + c) + '$', r * r, { pre: '$x =$', sol: 'Erst die Wurzel isolieren: $sqrt(x) = ' + r + '$. Quadrieren: $x = ' + r * r + '$.', hint: 'Bringe erst die Wurzel allein auf eine Seite.' });
  });
  G('9-wurzel', 2, function () {
    var q = R.pick([['sqrt(9)', 0], ['-sqrt(4)', 1], ['sqrt({1/4})', 2], ['sqrt(3)', 3], ['pi', 3], ['0,[6]', 2], ['-{8/2}', 1], ['sqrt(2) * sqrt(2)', 0], ['sqrt(0,16)', 2], ['-sqrt(5)', 3]]);
    return MCF('Welcher ist der kleinste Zahlbereich, in dem $' + q[0] + '$ liegt?', ['ℕ', 'ℤ', 'ℚ', 'ℝ'], q[1], { sol: '$ℕ ⊂ ℤ ⊂ ℚ ⊂ ℝ$. ' + ['Der Wert ist eine natürliche Zahl.', 'Der Wert ist ganz und negativ.', 'Der Wert ist ein Bruch, aber nicht ganz.', 'Der Wert ist irrational – er liegt erst in ℝ.'][q[1]], hint: 'Rechne den Wert zuerst aus, wenn das möglich ist.' });
  });
  G('9-wurzel', 2, function () {
    var q = R.pick([['sqrt(x)', 'x^{1/2}', ['x^2', 'x^{-2}', 'x^{-1}']], ['cbrt(x)', 'x^{1/3}', ['x^3', 'x^{-3}', '3x']], ['cbrt(x^2)', 'x^{2/3}', ['x^{3/2}', 'x^6', 'x^{-6}']], ['{1/sqrt(x)}', 'x^{-1/2}', ['x^{1/2}', 'x^{-2}', '-x^2']], ['sqrt(x^3)', 'x^{3/2}', ['x^{2/3}', 'x^6', 'x^5']]]);
    return MC('Schreibe als Potenz: $' + q[0] + '$', '$' + q[1] + '$', q[2].map(function (x) { return '$' + x + '$'; }), { sol: 'Der Wurzelexponent kommt in den Nenner des Exponenten: $' + q[0] + ' = ' + q[1] + '$', hint: 'Die $n$-te Wurzel entspricht dem Exponenten ${1/n}$.' });
  });
  G('9-wurzel', 2, function () {
    var q = R.pick([[2, '1,41', ['1,14', '1,73', '2,41']], [3, '1,73', ['1,37', '1,41', '2,73']], [5, '2,24', ['2,42', '2,5', '1,73']], [10, '3,16', ['3,61', '5', '2,24']], [50, '7,07', ['7,7', '25', '6,3']]]);
    return MC('Welcher Näherungswert passt zu $sqrt(' + q[0] + ')$?', '$' + q[1] + '$', q[2].map(function (x) { return '$' + x + '$'; }), { sol: 'Probe durch Quadrieren: $' + q[1] + '^2 ≈ ' + q[0] + '$. Der genaue Wert ist irrational.', hint: 'Quadriere die Kandidaten im Kopf oder schätze zwischen zwei Quadratzahlen ab (Klasse 7).' });
  });
  G('9-wurzel', 3, function () {
    var r = R.int(2, 7), a = R.int(2, 4), x = Math.ceil((r * r + 1) / a), b = a * x - r * r;
    if (b < 1 || b > 9) return null;
    return NUM('Löse die Wurzelgleichung: $sqrt(' + a + 'x - ' + b + ') = ' + r + '$', x, { pre: '$x =$', sol: 'Quadrieren: $' + a + 'x - ' + b + ' = ' + r * r + '$. Also $' + a + 'x = ' + (r * r + b) + '$ und $x = ' + x + '$. Probe: $sqrt(' + r * r + ') = ' + r + '$ ✓', hint: 'Nach dem Quadrieren bleibt eine lineare Gleichung (Klasse 7).' });
  });
  G('9-wurzel', 3, function () {
    var st = R.pick([['$sqrt(a + b) = sqrt(a) + sqrt(b)$ gilt für alle positiven $a$, $b$.', false, 'Gegenbeispiel: $sqrt(9 + 16) = 5$, aber $3 + 4 = 7$.'], ['Die Gleichung $sqrt(x) = -2$ hat keine Lösung.', true, 'Eine Quadratwurzel ist nie negativ. Quadrieren würde die Scheinlösung $x = 4$ liefern – deshalb ist die Probe Pflicht.'], ['Jede Quadratwurzel aus einer natürlichen Zahl ist irrational.', false, 'Gegenbeispiel: $sqrt(9) = 3$.'], ['$sqrt(a^2) = a$ gilt auch für negative $a$.', false, 'Für $a = -3$: $sqrt(9) = 3$, nicht $-3$. Allgemein gilt $sqrt(a^2) = |a|$.'], ['Zu jedem Punkt der Zahlengeraden gehört genau eine reelle Zahl.', true, 'Die reellen Zahlen füllen die Zahlengerade lückenlos.'], ['Das Produkt zweier irrationaler Zahlen kann rational sein.', true, 'Beispiel: $sqrt(2) * sqrt(2) = 2$.'], ['Die Dezimaldarstellung einer irrationalen Zahl ist unendlich und nicht periodisch.', true, 'Wäre sie endlich oder periodisch, ließe sich die Zahl als Bruch schreiben (Klasse 6).']]);
    return TF('Wahr oder falsch? ' + st[0], st[1], { sol: st[2] });
  });

  /* ---------- 9-quadfkt ---------- */
  function para(d, e, a) { return Fig.graph({ x: [-6, 6], y: [-6, 6], w: 220, fns: [{ f: function (t) { return (a || 1) * (t - d) * (t - d) + e; } }] }); }
  G('9-quadfkt', 1, function () {
    var d = R.nz(-4, 5), e = R.nz(-5, 6);
    return GAP('Lies den Scheitelpunkt $S$ der Parabel $f(x) = ' + vform(d, e) + '$ ab.', [{ pre: '$x_S =$', ans: d }, { pre: '$y_S =$', ans: e }], { sol: 'Scheitelpunktform $f(x) = (x - d)^2 + e$ mit $S(d|e)$: Hier ist $d = ' + d + '$ und $e = ' + e + '$, also $S(' + d + '|' + e + ')$.', hint: 'Achtung beim Vorzeichen in der Klammer: $(x - d)^2$ hat den Scheitel bei $x = d$.' });
  });
  G('9-quadfkt', 1, function () {
    var p = R.nz(-5, 5), q = R.nz(-6, 6), x = R.nz(-3, 4), v = x * x + p * x + q;
    return NUM('Gegeben ist $f(x) = ' + M.poly([1, p, q]) + '$. Berechne $f(' + x + ')$.', v, { sol: '$f(' + x + ') = ' + par(x) + '^2 ' + sg(p) + ' * ' + par(x) + ' ' + sg(q) + ' = ' + x * x + ' ' + sg(p * x) + ' ' + sg(q) + ' = ' + v + '$', hint: 'Setze die Zahl ein – negative Zahlen in Klammern.' });
  });
  G('9-quadfkt', 2, function () {
    var d = R.int(-3, 3), e = R.int(-4, 2);
    return GAP('Lies den Scheitelpunkt der Parabel am Graphen ab.', [{ pre: '$x_S =$', ans: d }, { pre: '$y_S =$', ans: e }], { fig: para(d, e), sol: 'Der tiefste Punkt der Parabel liegt bei $S(' + d + '|' + e + ')$. Die Gleichung lautet $f(x) = ' + vform(d, e) + '$.', hint: 'Der Scheitelpunkt ist der tiefste Punkt der nach oben geöffneten Parabel.' });
  });
  G('9-quadfkt', 2, function () {
    var d = R.nz(-3, 3), e = R.nz(-4, 2);
    return MC('Welche Gleichung gehört zu der verschobenen Normalparabel?', '$f(x) = ' + vform(d, e) + '$', ['$f(x) = ' + vform(-d, e) + '$', '$f(x) = ' + vform(d, -e) + '$', '$f(x) = ' + vform(e, d) + '$', '$f(x) = ' + vform(-d, -e) + '$'], { fig: para(d, e), sol: 'Scheitelpunkt ablesen: $S(' + d + '|' + e + ')$. In der Scheitelpunktform steht $(x ' + sg(-d) + ')^2 ' + sg(e) + '$.', hint: 'Lies den Scheitelpunkt ab. In der Klammer kehrt sich das Vorzeichen des $x$-Werts um.' });
  });
  G('9-quadfkt', 2, function () {
    var a = R.pick([2, 3, 0.5, -1, -2, -0.5, 0.25, -3]);
    var open = a > 0 ? 'nach oben geöffnet' : 'nach unten geöffnet', shape = Math.abs(a) > 1 ? 'gestreckt (schmaler)' : Math.abs(a) < 1 ? 'gestaucht (breiter)' : 'so breit wie die Normalparabel';
    var all = [];
    ['nach oben geöffnet', 'nach unten geöffnet'].forEach(function (o) { ['gestreckt (schmaler)', 'gestaucht (breiter)', 'so breit wie die Normalparabel'].forEach(function (s) { all.push(o + ' und ' + s); }); });
    return MC('Wie sieht der Graph von $f(x) = ' + M.co(a, 'x^2') + '$ im Vergleich zur Normalparabel aus?', open + ' und ' + shape, all, { sol: 'Vorzeichen von $a$: ' + (a > 0 ? 'positiv – nach oben geöffnet.' : 'negativ – an der $x$-Achse gespiegelt, nach unten geöffnet.') + ' Betrag $|a| = ' + de(Math.abs(a)) + '$: ' + shape + '.', hint: 'Das Vorzeichen bestimmt die Öffnung, der Betrag die Breite.' });
  });
  G('9-quadfkt', 2, function () {
    var d = R.nz(-4, 4), k = R.int(1, 4);
    return GAP('Bestimme die Nullstellen von $f(x) = ' + vform(d, -k * k) + '$.', [{ pre: 'kleinere:', ans: d - k }, { pre: 'größere:', ans: d + k }], { sol: '$(x ' + sg(-d) + ')^2 = ' + k * k + '$, also $x ' + sg(-d) + ' = ' + k + '$ oder $x ' + sg(-d) + ' = -' + k + '$. Nullstellen: $' + (d - k) + '$ und $' + (d + k) + '$ – symmetrisch zum Scheitel bei $x = ' + d + '$.', hint: 'Setze $f(x) = 0$ und ziehe die Wurzel – es gibt zwei Möglichkeiten.' });
  });
  G('9-quadfkt', 2, function () {
    var d = R.int(1, 5), e = R.int(1, 5), right = R.bool(), upw = R.bool();
    var dd = right ? d : -d, ee = upw ? e : -e;
    return MC('Die Normalparabel wird um ' + d + ' nach ' + (right ? 'rechts' : 'links') + ' und um ' + e + ' nach ' + (upw ? 'oben' : 'unten') + ' verschoben. Welche Gleichung hat die neue Parabel?', '$f(x) = ' + vform(dd, ee) + '$', ['$f(x) = ' + vform(-dd, ee) + '$', '$f(x) = ' + vform(dd, -ee) + '$', '$f(x) = ' + vform(-dd, -ee) + '$', '$f(x) = ' + vform(ee, dd) + '$'], { sol: 'Verschiebung nach ' + (right ? 'rechts' : 'links') + ': $(x ' + sg(-dd) + ')^2$. Verschiebung nach ' + (upw ? 'oben' : 'unten') + ': $' + sg(ee) + '$. Scheitelpunkt $S(' + dd + '|' + ee + ')$.', hint: 'Nach rechts verschieben heißt in der Klammer subtrahieren.' });
  });
  G('9-quadfkt', 2, function () {
    var d = R.nz(-5, 5), e = R.nz(-5, 5), v = R.bool();
    if (v) return NUM('Welche Gleichung hat die Symmetrieachse der Parabel $f(x) = ' + vform(d, e) + '$? Gib den Wert an: $x = ▢$', d, { pre: '$x =$', sol: 'Die Symmetrieachse verläuft senkrecht durch den Scheitelpunkt $S(' + d + '|' + e + ')$: $x = ' + d + '$.', hint: 'Die Symmetrieachse geht durch den Scheitelpunkt.' });
    return NUM('In welcher Höhe schneidet die Parabel $f(x) = ' + vform(d, e) + '$ die $y$-Achse?', d * d + e, { pre: '$y =$', sol: '$f(0) = (0 ' + sg(-d) + ')^2 ' + sg(e) + ' = ' + d * d + ' ' + sg(e) + ' = ' + (d * d + e) + '$', hint: 'Setze $x = 0$ ein (Klasse 8).' });
  });
  G('9-quadfkt', 3, function () {
    var d = R.nz(-4, 4), e = R.nz(-6, 6), p = -2 * d, q = d * d + e;
    return GAP('Bestimme den Scheitelpunkt von $f(x) = ' + M.poly([1, p, q]) + '$ durch quadratische Ergänzung.', [{ pre: '$x_S =$', ans: d }, { pre: '$y_S =$', ans: e }], { sol: 'Ergänzen: $x^2 ' + sg(p) + 'x + ' + d * d + ' - ' + d * d + ' ' + sg(q) + ' = ' + vform(d, e) + '$. Scheitelpunkt $S(' + d + '|' + e + ')$.', hint: 'Halbiere den Faktor vor $x$, quadriere ihn, addiere und subtrahiere dieses Quadrat (binomische Formeln, Klasse 8).' });
  });
  G('9-quadfkt', 3, function () {
    var d = R.nz(-4, 4), e = R.pick([-4, -1, 0, 0, 2, 5]), a = R.pick([1, 1, -1]), cnt = a * e < 0 ? 2 : e === 0 ? 1 : 0;
    return MCF('Wie viele Nullstellen hat $f(x) = ' + (a < 0 ? '-' : '') + vform(d, e) + '$?', ['keine', 'genau eine', 'zwei'], cnt, { sol: 'Scheitelpunkt $S(' + d + '|' + e + ')$, die Parabel ist nach ' + (a > 0 ? 'oben' : 'unten') + ' geöffnet. ' + (cnt === 2 ? 'Der Scheitel liegt auf der anderen Seite der $x$-Achse als die Öffnung: zwei Schnittpunkte.' : cnt === 1 ? 'Der Scheitel liegt genau auf der $x$-Achse: eine Nullstelle.' : 'Die Parabel entfernt sich von der $x$-Achse: keine Nullstelle.'), hint: 'Wo liegt der Scheitelpunkt – über, auf oder unter der $x$-Achse? Und wohin öffnet sich die Parabel?' });
  });
  G('9-quadfkt', 3, function () {
    var s = R.pick([4, 6, 8, 10, 12, 14]);
    return NUM('Mit einem ' + 2 * s + ' m langen Zaun soll ein rechteckiges Beet eingezäunt werden. Wie groß kann der Flächeninhalt höchstens werden?', s * s / 4, { unit: '$m^2$', sol: 'Seiten $x$ und $' + s + ' - x$. Flächeninhalt $A(x) = x * (' + s + ' - x) = -x^2 + ' + s + 'x$ – eine nach unten geöffnete Parabel mit Nullstellen 0 und ' + s + '. Der Scheitel liegt in der Mitte bei $x = ' + s / 2 + '$: $A = ' + s / 2 + ' * ' + s / 2 + ' = ' + de(s * s / 4) + '$. Das Beet ist dann ein Quadrat.', hint: 'Stelle den Flächeninhalt als Funktion einer Seitenlänge auf. Wo liegt der Scheitelpunkt der Parabel?' });
  });

  /* ---------- 9-quadgl ---------- */
  G('9-quadgl', 1, function () {
    var r = R.int(2, 13);
    return GAP('Löse die Gleichung $x^2 = ' + r * r + '$.', [{ pre: '$x_1 =$', ans: -r }, { pre: '$x_2 =$', ans: r }], { sol: 'Es gibt zwei Zahlen mit dem Quadrat ' + r * r + ': $x_1 = -' + r + '$ und $x_2 = ' + r + '$.', hint: 'Gib zuerst die negative, dann die positive Lösung an.' });
  });
  G('9-quadgl', 1, function () {
    var a = R.nz(-7, 7), b = R.intNot(-7, 7, [a, 0]), lo = Math.min(a, b), hi = Math.max(a, b);
    return GAP('Löse die Gleichung $(x ' + sg(-a) + ') * (x ' + sg(-b) + ') = 0$.', [{ pre: 'kleinere Lösung:', ans: lo }, { pre: 'größere Lösung:', ans: hi }], { sol: 'Ein Produkt ist 0, wenn ein Faktor 0 ist: $x ' + sg(-a) + ' = 0$ oder $x ' + sg(-b) + ' = 0$. Also $x = ' + a + '$ oder $x = ' + b + '$.', hint: 'Wann wird die erste Klammer 0, wann die zweite?' });
  });
  G('9-quadgl', 1, function () {
    var p = R.nz(-9, 9), q = R.nz(-9, 9);
    return GAP('Die Gleichung $' + M.poly([1, p, q]) + ' = 0$ hat die Normalform $x^2 + px + q = 0$. Lies $p$ und $q$ ab.', [{ pre: '$p =$', ans: p }, { pre: '$q =$', ans: q }], { sol: '$p$ ist der Faktor vor $x$ (mit Vorzeichen): $' + p + '$. $q$ ist die Zahl ohne $x$: $' + q + '$.', hint: 'Achte auf die Vorzeichen.' });
  });
  G('9-quadgl', 2, function () {
    var a = R.nz(-6, 7), b = R.intNot(-6, 7, [a, 0, -a]), p = -(a + b), q = a * b, lo = Math.min(a, b), hi = Math.max(a, b), h = -p / 2, D = h * h - q;
    return GAP('Löse mit der Lösungsformel: $' + M.poly([1, p, q]) + ' = 0$', [{ pre: 'kleinere Lösung:', ans: lo }, { pre: 'größere Lösung:', ans: hi }], { sol: '$p = ' + p + '$, $q = ' + q + '$. $x_{1,2} = ' + de(h) + ' +- sqrt(' + de(h * h) + ' ' + sg(-q) + ') = ' + de(h) + ' +- ' + de(Math.sqrt(D)) + '$. Also $' + lo + '$ und $' + hi + '$. Probe: Die Summe der Lösungen ist $-p$, ihr Produkt ist $q$.', hint: '$x_{1,2} = -{p/2} +- sqrt(({p/2})^2 - q)$' });
  });
  G('9-quadgl', 2, function () {
    var h = R.nz(-4, 4), D = R.pick([-3, -1, 0, 0, 1, 4]), p = -2 * h, q = h * h - D, cnt = D > 0 ? 2 : D === 0 ? 1 : 0;
    return MCF('Wie viele reelle Lösungen hat die Gleichung $' + M.poly([1, p, q]) + ' = 0$?', ['keine', 'genau eine', 'zwei'], cnt, { sol: 'Diskriminante: $({p/2})^2 - q = ' + h * h + ' ' + sg(-q) + ' = ' + D + '$. ' + (cnt === 2 ? 'Positiv: zwei Lösungen.' : cnt === 1 ? 'Null: genau eine Lösung.' : 'Negativ: keine reelle Lösung.'), hint: 'Berechne den Term unter der Wurzel der Lösungsformel.' });
  });
  G('9-quadgl', 2, function () {
    var p = R.nz(-9, 9);
    return GAP('Löse durch Ausklammern: $x^2 ' + sg(p) + 'x = 0$', [{ pre: 'kleinere Lösung:', ans: Math.min(0, -p) }, { pre: 'größere Lösung:', ans: Math.max(0, -p) }], { sol: '$x * (x ' + sg(p) + ') = 0$. Ein Produkt ist 0, wenn ein Faktor 0 ist: $x = 0$ oder $x = ' + (-p) + '$.', hint: 'Klammere $x$ aus (Klasse 8). Achtung: Nicht durch $x$ teilen – dabei ginge die Lösung 0 verloren.' });
  });
  G('9-quadgl', 2, function () {
    var a = R.nz(-6, 6);
    return NUM('Die Gleichung $' + M.poly([1, -2 * a, a * a]) + ' = 0$ hat genau eine Lösung. Wie lautet sie?', a, { pre: '$x =$', sol: 'Binomische Formel rückwärts: $(x ' + sg(-a) + ')^2 = 0$, also $x = ' + a + '$.', hint: 'Erkennst du eine binomische Formel (Klasse 8)?' });
  });
  G('9-quadgl', 2, function () {
    var a = R.nz(-5, 6), b = R.intNot(-5, 6, [a]);
    return GAP('Eine quadratische Gleichung $x^2 + px + q = 0$ hat die Lösungen $x_1 = ' + a + '$ und $x_2 = ' + b + '$. Bestimme $p$ und $q$.', [{ pre: '$p =$', ans: -(a + b) }, { pre: '$q =$', ans: a * b }], { sol: '$(x ' + sg(-a) + ') * (x ' + sg(-b) + ') = ' + M.poly([1, -(a + b), a * b]) + '$. Also $p = ' + (-(a + b)) + '$ und $q = ' + a * b + '$.', hint: 'Schreibe die Gleichung als Produkt $(x - x_1) * (x - x_2) = 0$ und multipliziere aus.' });
  });
  G('9-quadgl', 3, function () {
    var k = R.pick([2, 3, -2]), a = R.nz(-4, 5), b = R.intNot(-4, 5, [a, 0, -a]);
    return GAP('Löse die Gleichung: $' + M.poly([k, -k * (a + b), k * a * b]) + ' = 0$', [{ pre: 'kleinere Lösung:', ans: Math.min(a, b) }, { pre: 'größere Lösung:', ans: Math.max(a, b) }], { sol: 'Erst durch $' + k + '$ teilen (Normalform): $' + M.poly([1, -(a + b), a * b]) + ' = 0$. Lösungsformel: $x_1 = ' + Math.min(a, b) + '$, $x_2 = ' + Math.max(a, b) + '$.', hint: 'Bringe die Gleichung zuerst in die Normalform: Teile durch den Faktor vor $x^2$.' });
  });
  G('9-quadgl', 3, function () {
    var v = R.bool(), n = R.int(4, 11), w = R.int(3, 9), d = R.int(1, 5);
    if (v) return NUM('Das Produkt zweier aufeinanderfolgender natürlicher Zahlen ist ' + n * (n + 1) + '. Wie heißt die kleinere Zahl?', n, { sol: '$x * (x + 1) = ' + n * (n + 1) + '$, also $x^2 + x - ' + n * (n + 1) + ' = 0$. Lösungsformel: $x = ' + n + '$ oder $x = -' + (n + 1) + '$. Nur ' + n + ' ist eine natürliche Zahl.', hint: 'Nenne die kleinere Zahl $x$. Dann ist die größere $x + 1$.' });
    return NUM('Ein Rechteck ist ' + d + ' cm länger als breit und hat den Flächeninhalt $' + w * (w + d) + ' cm^2$. Wie breit ist es?', w, { unit: 'cm', sol: '$x * (x + ' + d + ') = ' + w * (w + d) + '$, also $x^2 + ' + d + 'x - ' + w * (w + d) + ' = 0$. Lösungen: $x = ' + w + '$ oder $x = -' + (w + d) + '$. Eine Länge ist nicht negativ: ' + w + ' cm.', hint: 'Breite $x$, Länge $x + ' + d + '$. Stelle die Gleichung für den Flächeninhalt auf.' });
  });
  G('9-quadgl', 2, function () {
    var st = R.pick([['Die Gleichung $x^2 = -4$ hat keine reelle Lösung.', true, 'Kein Quadrat einer reellen Zahl ist negativ.'], ['Die Gleichung $x^2 = 9$ hat nur die Lösung $x = 3$.', false, 'Auch $x = -3$ ist eine Lösung.'], ['Eine quadratische Gleichung kann höchstens zwei reelle Lösungen haben.', true, 'Eine Parabel schneidet die $x$-Achse höchstens zweimal.'], ['Bei $x^2 - 5x = 0$ darf man beide Seiten durch $x$ teilen.', false, 'Dabei ginge die Lösung $x = 0$ verloren. Besser: $x$ ausklammern.'], ['Ist die Diskriminante 0, hat die Gleichung genau eine Lösung.', true, 'Dann ist $+- sqrt(0)$ in beiden Fällen 0.'], ['Die Lösungen von $x^2 + px + q = 0$ sind die Nullstellen der Funktion $f(x) = x^2 + px + q$.', true, 'Nullstellen sind die $x$-Werte mit $f(x) = 0$.']]);
    return TF('Wahr oder falsch? ' + st[0], st[1], { sol: st[2] });
  });

  /* ---------- 9-potfkt ---------- */
  var PF = [['x^2', function (x) { return x * x; }], ['x^3', function (x) { return x * x * x; }], ['{1/x}', function (x) { return 1 / x; }], ['{1/x^2}', function (x) { return 1 / (x * x); }], ['sqrt(x)', function (x) { return x < 0 ? NaN : Math.sqrt(x); }], ['x^4', function (x) { return x * x * x * x; }]];
  G('9-potfkt', 1, function () {
    var q = R.pick([['x^3', -2, -8], ['x^3', 3, 27], ['x^4', -2, 16], ['x^{-1}', 4, F(1, 4)], ['x^{-2}', 2, F(1, 4)], ['x^{-2}', -3, F(1, 9)], ['x^{-1}', -5, F(-1, 5)], ['x^{1/2}', 49, 7], ['x^{-3}', 2, F(1, 8)], ['x^5', -1, -1], ['x^{1/3}', 64, 4]]);
    return NUM('Gegeben ist $f(x) = ' + q[0] + '$. Berechne $f(' + q[1] + ')$. (ganze Zahl oder Bruch)', q[2], { reduced: true, sol: '$f(' + q[1] + ') = ' + par(q[1]) + '^{' + q[0].replace('x^', '').replace(/[{}]/g, '') + '} = ' + (typeof q[2] === 'number' ? q[2] : fs(q[2])) + '$', hint: 'Negativer Exponent: Kehrwert. Bruch als Exponent: Wurzel.' });
  });
  G('9-potfkt', 1, function () {
    var n = R.pick([2, 3, 4, 5, -1, -2, -3, 6]), even = n % 2 === 0;
    return MCF('Welche Symmetrie hat der Graph von $f(x) = x^{' + n + '}$?', ['achsensymmetrisch zur $y$-Achse', 'punktsymmetrisch zum Ursprung', 'keine dieser Symmetrien'], even ? 0 : 1, { sol: 'Der Exponent ist ' + (even ? 'gerade: $(-x)^{' + n + '} = x^{' + n + '}$ – achsensymmetrisch zur $y$-Achse.' : 'ungerade: $(-x)^{' + n + '} = -x^{' + n + '}$ – punktsymmetrisch zum Ursprung.'), hint: 'Was passiert mit dem Vorzeichen, wenn du $-x$ einsetzt?' });
  });
  G('9-potfkt', 2, function () {
    var i = R.int(0, 4), others = [0, 1, 2, 3, 4].filter(function (k) { return k !== i; });
    return MC('Welche Funktionsgleichung gehört zu diesem Graphen?', '$f(x) = ' + PF[i][0] + '$', others.map(function (k) { return '$f(x) = ' + PF[k][0] + '$'; }), { fig: Fig.graph({ x: [-4, 4], y: [-4, 4], w: 220, fns: [{ f: PF[i][1] }] }), sol: ['Parabel durch den Ursprung, achsensymmetrisch: $x^2$.', 'S-förmige Kurve durch den Ursprung, punktsymmetrisch: $x^3$.', 'Hyperbel mit zwei Ästen im 1. und 3. Quadranten: ${1/x}$.', 'Zwei Äste oberhalb der $x$-Achse, Polstelle bei 0: ${1/x^2}$.', 'Beginnt im Ursprung und existiert nur für $x >= 0$: $sqrt(x)$.'][i], hint: 'Achte auf Symmetrie, Polstelle und Definitionsbereich.' });
  });
  G('9-potfkt', 2, function () {
    var q = R.pick([['x^{-2}', 1], ['x^3', 0], ['sqrt(x)', 2], ['{1/x}', 1], ['x^4', 0], ['x^{1/2}', 2], ['x^{-1}', 1], ['x^5', 0]]);
    return MCF('Welchen größtmöglichen Definitionsbereich hat $f(x) = ' + q[0] + '$?', ['alle reellen Zahlen', 'alle reellen Zahlen außer 0', 'alle reellen Zahlen $x >= 0$'], q[1], { sol: ['Ein Polynom ist für jede reelle Zahl definiert.', 'Für $x = 0$ müsste man durch 0 teilen.', 'Aus negativen Zahlen kann man keine Quadratwurzel ziehen.'][q[1]], hint: 'Gibt es Zahlen, die man nicht einsetzen darf (Division durch 0, Wurzel aus negativen Zahlen)?' });
  });
  G('9-potfkt', 2, function () {
    var c = R.nz(-5, 6), v = R.bool();
    if (v) return NUM('An welcher Stelle hat $f(x) = {1/x ' + sg(-c) + '}$ eine Polstelle?', c, { pre: '$x =$', sol: 'Der Nenner wird 0 für $x = ' + c + '$. Dort ist die Funktion nicht definiert, und die Funktionswerte wachsen ins Unendliche.', hint: 'Wann wird der Nenner 0?' });
    return NUM('Die Funktion $f(x) = {1/x} ' + sg(c) + '$ hat eine waagerechte Asymptote $y = ▢$. Welche Zahl gehört in die Lücke?', c, { pre: '$y =$', sol: 'Für sehr große $x$ wird ${1/x}$ winzig. Die Funktionswerte nähern sich $' + c + '$: Asymptote $y = ' + c + '$.', hint: 'Was passiert mit ${1/x}$, wenn $x$ riesig wird?' });
  });
  G('9-potfkt', 2, function () {
    var c = R.int(1, 5), q = R.pick([['(x - ' + c + ')^3', 'um ' + c + ' nach rechts verschoben'], ['(x + ' + c + ')^3', 'um ' + c + ' nach links verschoben'], ['x^3 + ' + c, 'um ' + c + ' nach oben verschoben'], ['x^3 - ' + c, 'um ' + c + ' nach unten verschoben']]);
    return MC('Wie entsteht der Graph von $g(x) = ' + q[0] + '$ aus dem Graphen von $f(x) = x^3$?', 'Er wird ' + q[1] + '.', ['Er wird um ' + c + ' nach rechts verschoben.', 'Er wird um ' + c + ' nach links verschoben.', 'Er wird um ' + c + ' nach oben verschoben.', 'Er wird um ' + c + ' nach unten verschoben.'], { sol: '$f(x) + c$ verschiebt nach oben, $f(x) - c$ nach unten; $f(x - c)$ verschiebt nach rechts, $f(x + c)$ nach links.', hint: 'Steht die Zahl in der Klammer (waagerecht) oder außerhalb (senkrecht)?' });
  });
  G('9-potfkt', 2, function () {
    var st = R.pick([['$f(x) = x^3$ ist überall monoton steigend.', true, 'Zu größeren $x$ gehören immer größere Funktionswerte.'], ['$f(x) = x^2$ ist überall monoton steigend.', false, 'Für $x < 0$ fällt die Parabel.'], ['Der Graph von $f(x) = {1/x}$ schneidet die $x$-Achse nie.', true, 'Ein Bruch mit dem Zähler 1 kann nicht 0 werden.'], ['Alle Graphen von $f(x) = x^n$ mit natürlichem $n$ gehen durch den Punkt $(1|1)$.', true, '$1^n = 1$ für jedes $n$.'], ['$f(x) = {1/x}$ beschreibt eine indirekte Proportionalität.', true, 'Das Produkt $x * y = 1$ ist konstant (Klasse 6).'], ['$f(x) = x^4$ nimmt auch negative Funktionswerte an.', false, 'Ein gerader Exponent macht jedes Ergebnis nichtnegativ.'], ['Der Graph von $f(x) = sqrt(x)$ ist der an der Geraden $y = x$ gespiegelte rechte Ast der Normalparabel.', true, 'Wurzelziehen kehrt das Quadrieren um – dabei tauschen $x$ und $y$ die Rollen.']]);
    return TF('Wahr oder falsch? ' + st[0], st[1], { sol: st[2] });
  });
  G('9-potfkt', 3, function () {
    var q = R.pick([['x^4', '$y >= 0$'], ['x^3', 'alle reellen Zahlen'], ['{1/x^2}', '$y > 0$'], ['{1/x}', 'alle reellen Zahlen außer 0'], ['sqrt(x)', '$y >= 0$'], ['x^2 + 3', '$y >= 3$'], ['-x^2', '$y <= 0$']]);
    return MC('Welchen Wertebereich hat $f(x) = ' + q[0] + '$?', q[1], ['$y >= 0$', 'alle reellen Zahlen', '$y > 0$', 'alle reellen Zahlen außer 0', '$y >= 3$', '$y <= 0$'], { sol: 'Überlege, welche Funktionswerte vorkommen können: ' + q[1] + '.', hint: 'Welche Höhen erreicht der Graph? Wird 0 erreicht?' });
  });
  G('9-potfkt', 3, function () {
    var a = R.pick([2, 3, 0.5, -1, -2]), n = R.pick([2, 3]), x = R.pick([-2, 2, 3]), v = a * Math.pow(x, n);
    return NUM('Der Graph von $f(x) = x^' + n + '$ wird mit dem Faktor $' + de(a) + '$ in $y$-Richtung gestreckt: $g(x) = ' + M.co(a, 'x^' + n) + '$. Berechne $g(' + x + ')$.', v, { sol: '$g(' + x + ') = ' + M.num(a) + ' * ' + par(x) + '^' + n + ' = ' + M.num(a) + ' * ' + par(Math.pow(x, n)) + ' = ' + de(v) + '$. Jeder Funktionswert wird mit $' + de(a) + '$ multipliziert.', hint: 'Erst potenzieren, dann mit dem Faktor multiplizieren.' });
  });

  /* ---------- 9-kreis ---------- */
  var PI = 'Rechne mit $π ≈ 3,14$ und runde auf eine Nachkommastelle.';
  G('9-kreis', 1, function () {
    var r = R.int(2, 12), v = R.int(0, 2);
    if (v === 0) return NUM('Ein Kreis hat den Radius ' + r + ' cm. Sein Umfang ist $u = ▢ * π$ cm. Welche Zahl fehlt?', 2 * r, { sol: '$u = 2 * π * r = 2 * π * ' + r + ' = ' + 2 * r + 'π$', hint: 'Umfang: $u = 2 * π * r$' });
    if (v === 1) return NUM('Ein Kreis hat den Radius ' + r + ' cm. Sein Flächeninhalt ist $A = ▢ * π$ $cm^2$. Welche Zahl fehlt?', r * r, { sol: '$A = π * r^2 = π * ' + r + '^2 = ' + r * r + 'π$', hint: 'Flächeninhalt: $A = π * r^2$' });
    return NUM('Ein Kreis hat den Durchmesser ' + 2 * r + ' cm. Sein Flächeninhalt ist $A = ▢ * π$ $cm^2$. Welche Zahl fehlt?', r * r, { sol: 'Radius: $' + 2 * r + ' : 2 = ' + r + '$. $A = π * ' + r + '^2 = ' + r * r + 'π$', hint: 'Achtung: gegeben ist der Durchmesser. Berechne zuerst den Radius.' });
  });
  G('9-kreis', 1, function () {
    var r = R.int(2, 15), area = R.bool(), val = area ? 3.14 * r * r : 2 * 3.14 * r;
    return NUM('Berechne den ' + (area ? 'Flächeninhalt' : 'Umfang') + ' eines Kreises mit dem Radius ' + r + ' cm. ' + PI, M.round(val, 1), { unit: area ? '$cm^2$' : 'cm', tol: area ? 0.6 : 0.15, sol: area ? '$A = π * r^2 ≈ 3,14 * ' + r * r + ' = ' + de(val, 1) + '$' : '$u = 2 * π * r ≈ 2 * 3,14 * ' + r + ' = ' + de(val, 1) + '$', hint: area ? '$A = π * r^2$' : '$u = 2 * π * r$' });
  });
  G('9-kreis', 2, function () {
    var r = R.pick([3, 6, 9, 12]), al = R.pick([60, 90, 120, 30, 180, 45]), v = R.bool(), fr = al / 360;
    if (v) { if ((2 * r * fr) % 0.5 !== 0) return null; return NUM('Ein Kreissektor hat den Radius ' + r + ' cm und den Mittelpunktswinkel ' + al + '°. Seine Bogenlänge ist $b = ▢ * π$ cm. Welche Zahl fehlt?', 2 * r * fr, { sol: 'Anteil am Vollkreis: ${' + al + '/360} = ' + fs(F(al, 360)) + '$. $b = ' + fs(F(al, 360)) + ' * 2 * π * ' + r + ' = ' + de(2 * r * fr) + 'π$', hint: 'Der Bogen ist der Anteil ${α/360°}$ des Umfangs.' }); }
    if ((r * r * fr) % 0.5 !== 0) return null;
    return NUM('Ein Kreissektor hat den Radius ' + r + ' cm und den Mittelpunktswinkel ' + al + '°. Sein Flächeninhalt ist $A = ▢ * π$ $cm^2$. Welche Zahl fehlt?', r * r * fr, { sol: 'Anteil am Vollkreis: ${' + al + '/360} = ' + fs(F(al, 360)) + '$. $A = ' + fs(F(al, 360)) + ' * π * ' + r + '^2 = ' + de(r * r * fr) + 'π$', hint: 'Der Sektor ist der Anteil ${α/360°}$ der Kreisfläche.' });
  });
  G('9-kreis', 2, function () {
    var r = R.int(2, 6), h = R.int(3, 12), v = R.int(0, 2);
    if (v === 0) return NUM('Ein Zylinder hat den Radius ' + r + ' cm und die Höhe ' + h + ' cm. Sein Volumen ist $V = ▢ * π$ $cm^3$. Welche Zahl fehlt?', r * r * h, { sol: '$V = π * r^2 * h = π * ' + r * r + ' * ' + h + ' = ' + r * r * h + 'π$', hint: 'Zylinder: Grundfläche mal Höhe – wie beim Prisma (Klasse 6).' });
    if (v === 1) return NUM('Ein Zylinder hat den Radius ' + r + ' cm und die Höhe ' + h + ' cm. Seine Mantelfläche ist $M = ▢ * π$ $cm^2$. Welche Zahl fehlt?', 2 * r * h, { sol: 'Der Mantel ist abgewickelt ein Rechteck: Umfang mal Höhe. $M = 2 * π * ' + r + ' * ' + h + ' = ' + 2 * r * h + 'π$', hint: 'Mantel = Umfang der Grundfläche mal Höhe.' });
    return NUM('Ein Zylinder hat den Radius ' + r + ' cm und die Höhe ' + h + ' cm. Sein Oberflächeninhalt ist $O = ▢ * π$ $cm^2$. Welche Zahl fehlt?', 2 * r * r + 2 * r * h, { sol: 'Zwei Kreise und der Mantel: $2 * π * ' + r * r + ' + 2 * π * ' + r + ' * ' + h + ' = ' + (2 * r * r + 2 * r * h) + 'π$', hint: '$O = 2 * π * r^2 + 2 * π * r * h$' });
  });
  G('9-kreis', 2, function () {
    var r = R.pick([3, 6, 9]), v = R.bool();
    if (v) return NUM('Eine Kugel hat den Radius ' + r + ' cm. Ihr Volumen ist $V = ▢ * π$ $cm^3$. Welche Zahl fehlt?', 4 * r * r * r / 3, { sol: '$V = {4/3} * π * r^3 = {4/3} * π * ' + r * r * r + ' = ' + 4 * r * r * r / 3 + 'π$', hint: 'Kugel: $V = {4/3} * π * r^3$' });
    r = R.int(2, 9);
    return NUM('Eine Kugel hat den Radius ' + r + ' cm. Ihr Oberflächeninhalt ist $O = ▢ * π$ $cm^2$. Welche Zahl fehlt?', 4 * r * r, { sol: '$O = 4 * π * r^2 = 4 * π * ' + r * r + ' = ' + 4 * r * r + 'π$', hint: 'Kugel: $O = 4 * π * r^2$ – viermal die Fläche des Großkreises.' });
  });
  G('9-kreis', 2, function () {
    var r = R.pick([2, 5, 10, 15, 20]), u = M.round(2 * 3.14 * r, 1);
    return NUM('Ein Kreis hat den Umfang ' + de(u) + ' cm. Wie groß ist sein Radius? (Rechne mit $π ≈ 3,14$.)', r, { unit: 'cm', tol: 0.06, sol: '$r = {u/2 * π} ≈ {' + de(u) + '/6,28} = ' + r + '$', hint: 'Stelle $u = 2 * π * r$ nach $r$ um (Formeln umstellen, Klasse 7).' });
  });
  G('9-kreis', 3, function () {
    var ri = R.int(2, 6), ra = ri + R.int(1, 4);
    return NUM('Ein Kreisring hat den äußeren Radius ' + ra + ' cm und den inneren Radius ' + ri + ' cm. Sein Flächeninhalt ist $A = ▢ * π$ $cm^2$. Welche Zahl fehlt?', ra * ra - ri * ri, { sol: 'Großer Kreis minus kleiner Kreis: $π * ' + ra + '^2 - π * ' + ri + '^2 = (' + ra * ra + ' - ' + ri * ri + ') * π = ' + (ra * ra - ri * ri) + 'π$', hint: 'Ziehe die innere Kreisfläche von der äußeren ab.' });
  });
  G('9-kreis', 3, function () {
    var k = R.pick([2, 3]), q = R.pick([['Umfang eines Kreises', k], ['Flächeninhalt eines Kreises', k * k], ['Volumen einer Kugel', k * k * k], ['Oberflächeninhalt einer Kugel', k * k]]);
    return MCN('Der Radius wird ' + (k === 2 ? 'verdoppelt' : 'verdreifacht') + '. Mit welchem Faktor ändert sich der ' + q[0].replace('Volumen', 'das Volumen').replace('der das', 'das') + '?', q[1], [k, k * k, k * k * k, 2 * k], { sol: 'Längen wachsen mit $k$, Flächen mit $k^2$, Volumina mit $k^3$ (Ähnlichkeit, Klasse 8). Hier: Faktor ' + q[1] + '.', hint: 'Geht es um eine Länge, eine Fläche oder ein Volumen?' });
  });
  G('9-kreis', 3, function () {
    var r = R.pick([1, 2, 3]), h = R.pick([5, 10, 20]), rho = R.pick([2.7, 7.9, 8.9]), m = M.round(3.14 * r * r * h * rho, 0);
    return NUM('Ein Metallzylinder hat den Radius ' + r + ' cm und die Höhe ' + h + ' cm. Das Metall hat die Dichte ' + de(rho) + ' Gramm pro $cm^3$. Welche Masse hat der Zylinder? Rechne mit $π ≈ 3,14$ und runde auf ganze Gramm.', m, { unit: 'g', tol: Math.max(1.5, m * 0.004), sol: '$V = π * r^2 * h ≈ 3,14 * ' + r * r + ' * ' + h + ' = ' + de(3.14 * r * r * h) + '$. $m = ρ * V ≈ ' + de(rho) + ' * ' + de(3.14 * r * r * h) + ' ≈ ' + de(m) + '$ g', hint: 'Erst das Volumen, dann Masse = Dichte mal Volumen (Klasse 7).' });
  });

  /* ---------- 9-pythagoras ---------- */
  var TR = [[3, 4, 5], [6, 8, 10], [5, 12, 13], [8, 15, 17], [9, 12, 15], [7, 24, 25], [12, 16, 20], [20, 21, 29], [10, 24, 26]];
  G('9-pythagoras', 1, function () {
    var t = R.pick(TR);
    return NUM('Berechne die Länge der Hypotenuse $c$.', t[2], { unit: 'cm', fig: rtri(t[0], t[1], [t[0] + ' cm', 'c = ?', t[1] + ' cm']), sol: '$c^2 = ' + t[0] + '^2 + ' + t[1] + '^2 = ' + t[0] * t[0] + ' + ' + t[1] * t[1] + ' = ' + t[2] * t[2] + '$, also $c = sqrt(' + t[2] * t[2] + ') = ' + t[2] + '$ cm.', hint: 'Satz des Pythagoras: $a^2 + b^2 = c^2$' });
  });
  G('9-pythagoras', 1, function () {
    var t = R.pick(TR), sw = R.bool(), known = sw ? t[0] : t[1], x = sw ? t[1] : t[0];
    return NUM('Berechne die Länge der fehlenden Kathete.', x, { unit: 'cm', fig: rtri(sw ? t[0] : x, sw ? x : t[1], sw ? [t[0] + ' cm', t[2] + ' cm', '?'] : ['?', t[2] + ' cm', t[1] + ' cm']), sol: '$' + t[2] + '^2 - ' + known + '^2 = ' + t[2] * t[2] + ' - ' + known * known + ' = ' + x * x + '$, also ist die Kathete $sqrt(' + x * x + ') = ' + x + '$ cm lang.', hint: 'Stelle $a^2 + b^2 = c^2$ nach der gesuchten Kathete um.' });
  });
  G('9-pythagoras', 1, function () {
    var q = R.pick([['γ', 'c'], ['α', 'a'], ['β', 'b']]);
    return MC('In einem Dreieck $ABC$ ist der Winkel $' + q[0] + '$ ein rechter Winkel. Welche Seite ist die Hypotenuse?', 'Seite $' + q[1] + '$', ['Seite $a$', 'Seite $b$', 'Seite $c$', 'Es gibt keine Hypotenuse.'], { sol: 'Die Hypotenuse liegt dem rechten Winkel gegenüber. Dem Winkel $' + q[0] + '$ liegt die Seite $' + q[1] + '$ gegenüber.', hint: 'Der Seite $a$ liegt $α$ gegenüber, $b$ liegt $β$ gegenüber, $c$ liegt $γ$ gegenüber (Klasse 6).' });
  });
  G('9-pythagoras', 2, function () {
    var t = R.pick(TR), ok = R.bool(), c = ok ? t[2] : t[2] + R.pick([-1, 1, 2]);
    return TF('Ein Dreieck hat die Seitenlängen ' + t[0] + ' cm, ' + t[1] + ' cm und ' + c + ' cm. Ist es rechtwinklig?', ok, { sol: 'Umkehrung des Satzes des Pythagoras: $' + t[0] + '^2 + ' + t[1] + '^2 = ' + (t[0] * t[0] + t[1] * t[1]) + '$ und $' + c + '^2 = ' + c * c + '$. ' + (ok ? 'Die Werte stimmen überein: rechtwinklig.' : 'Die Werte sind verschieden: nicht rechtwinklig.'), hint: 'Prüfe, ob die Summe der Quadrate der beiden kürzeren Seiten gleich dem Quadrat der längsten Seite ist.' });
  });
  G('9-pythagoras', 2, function () {
    var t = R.pick(TR), v = R.bool();
    if (v) return NUM('Ein Rechteck ist ' + t[1] + ' cm lang und ' + t[0] + ' cm breit. Wie lang ist seine Diagonale?', t[2], { unit: 'cm', sol: 'Die Diagonale ist die Hypotenuse eines rechtwinkligen Dreiecks: $sqrt(' + t[1] + '^2 + ' + t[0] + '^2) = sqrt(' + t[2] * t[2] + ') = ' + t[2] + '$ cm.', hint: 'Die Diagonale teilt das Rechteck in zwei rechtwinklige Dreiecke.' });
    var a = R.int(2, 9), d = M.round(a * Math.SQRT2, 2);
    return NUM('Ein Quadrat hat die Seitenlänge ' + a + ' cm. Wie lang ist seine Diagonale? Runde auf zwei Nachkommastellen.', d, { unit: 'cm', tol: 0.015, sol: '$d = sqrt(' + a + '^2 + ' + a + '^2) = sqrt(' + 2 * a * a + ') = ' + a + ' * sqrt(2) ≈ ' + de(d) + '$ cm.', hint: '$d^2 = a^2 + a^2$' });
  });
  G('9-pythagoras', 2, function () {
    var t = R.pick([[5, 12, 13], [3, 4, 5], [8, 15, 17], [6, 8, 10], [12, 16, 20]]);
    return NUM('Ein gleichschenkliges Dreieck hat die Basis ' + 2 * t[0] + ' cm und Schenkel der Länge ' + t[2] + ' cm. Wie lang ist die Höhe auf der Basis?', t[1], { unit: 'cm', fig: Fig.shape({ P: [[0, 0], [2 * t[0], 0], [t[0], t[1]]], s: [2 * t[0] + ' cm', t[2] + ' cm', ''], extra: [{ from: [t[0], 0], to: [t[0], t[1]], dash: true, l: 'h', it: true }], maxh: 110 }), sol: 'Die Höhe halbiert die Basis: Es entsteht ein rechtwinkliges Dreieck mit den Seiten ' + t[0] + ', $h$ und ' + t[2] + '. $h = sqrt(' + t[2] + '^2 - ' + t[0] + '^2) = sqrt(' + t[1] * t[1] + ') = ' + t[1] + '$ cm.', hint: 'Die Höhe teilt das gleichschenklige Dreieck in zwei rechtwinklige Dreiecke (Symmetrie, Klasse 6).' });
  });
  G('9-pythagoras', 2, function () {
    var q = R.pick([[4, 9, 6], [2, 8, 4], [3, 12, 6], [1, 9, 3], [4, 16, 8], [9, 16, 12], [2, 18, 6], [5, 20, 10]]);
    return NUM('In einem rechtwinkligen Dreieck teilt die Höhe $h$ die Hypotenuse in die Abschnitte $p = ' + q[0] + '$ cm und $q = ' + q[1] + '$ cm. Wie lang ist $h$?', q[2], { unit: 'cm', sol: 'Höhensatz: $h^2 = p * q = ' + q[0] + ' * ' + q[1] + ' = ' + q[0] * q[1] + '$, also $h = ' + q[2] + '$ cm.', hint: 'Höhensatz: $h^2 = p * q$' });
  });
  G('9-pythagoras', 2, function () {
    var q = R.pick([[9, 4, 6], [16, 4, 8], [25, 9, 15], [25, 16, 20], [12, 3, 6], [18, 8, 12], [20, 5, 10]]);
    return NUM('In einem rechtwinkligen Dreieck ist die Hypotenuse $c = ' + q[0] + '$ cm lang. Der Hypotenusenabschnitt unter der Kathete $a$ ist $p = ' + q[1] + '$ cm lang. Wie lang ist $a$?', q[2], { unit: 'cm', sol: 'Kathetensatz: $a^2 = c * p = ' + q[0] + ' * ' + q[1] + ' = ' + q[0] * q[1] + '$, also $a = ' + q[2] + '$ cm.', hint: 'Kathetensatz: $a^2 = c * p$' });
  });
  G('9-pythagoras', 3, function () {
    var t = R.pick([[3, 4, 5], [1.5, 2, 2.5], [6, 8, 10], [0.9, 1.2, 1.5], [5, 12, 13]]);
    return NUM('Eine ' + de(t[2]) + ' m lange Leiter lehnt an einer Hauswand. Ihr Fuß steht ' + de(t[0]) + ' m von der Wand entfernt. In welcher Höhe berührt sie die Wand?', t[1], { unit: 'm', sol: 'Wand und Boden bilden einen rechten Winkel, die Leiter ist die Hypotenuse: $h = sqrt(' + de(t[2]) + '^2 - ' + de(t[0]) + '^2) = sqrt(' + de(t[1] * t[1]) + ') = ' + de(t[1]) + '$ m.', hint: 'Skizze: Wo ist der rechte Winkel? Welche Seite ist die Hypotenuse?' });
  });
  G('9-pythagoras', 3, function () {
    var q = R.pick([[2, 3, 6, 7], [1, 2, 2, 3], [3, 4, 12, 13], [2, 6, 9, 11], [4, 4, 7, 9], [1, 4, 8, 9], [2, 10, 11, 15]]);
    return NUM('Ein Quader hat die Kantenlängen ' + q[0] + ' cm, ' + q[1] + ' cm und ' + q[2] + ' cm. Wie lang ist seine Raumdiagonale?', q[3], { unit: 'cm', sol: 'Zweimal Pythagoras: erst die Diagonale der Grundfläche, dann die Raumdiagonale. $d = sqrt(' + q[0] + '^2 + ' + q[1] + '^2 + ' + q[2] + '^2) = sqrt(' + (q[0] * q[0] + q[1] * q[1] + q[2] * q[2]) + ') = ' + q[3] + '$ cm.', hint: 'Berechne erst die Diagonale der Grundfläche. Sie bildet mit der Höhe wieder ein rechtwinkliges Dreieck.' });
  });
  G('9-pythagoras', 3, function () {
    var t = R.pick(TR.slice(0, 5)), x1 = R.int(-3, 3), y1 = R.int(-3, 3), sx = R.pick([1, -1]), sy = R.pick([1, -1]);
    return NUM('Wie weit sind die Punkte $A(' + x1 + '|' + y1 + ')$ und $B(' + (x1 + sx * t[0]) + '|' + (y1 + sy * t[1]) + ')$ voneinander entfernt?', t[2], { sol: 'Waagerechter Abstand: ' + t[0] + ', senkrechter Abstand: ' + t[1] + '. Der Abstand ist die Hypotenuse: $sqrt(' + t[0] + '^2 + ' + t[1] + '^2) = ' + t[2] + '$.', hint: 'Zeichne ein Steigungsdreieck zwischen den Punkten (Klasse 8) und wende Pythagoras an.' });
  });

  /* ---------- 9-trigo ---------- */
  G('9-trigo', 1, function () {
    var fn = R.pick([['sin', 'a', 'c', 'Gegenkathete durch Hypotenuse'], ['cos', 'b', 'c', 'Ankathete durch Hypotenuse'], ['tan', 'a', 'b', 'Gegenkathete durch Ankathete']]);
    return MC('Im rechtwinkligen Dreieck liegt $a$ dem Winkel $α$ gegenüber, $b$ liegt an $α$ an, $c$ ist die Hypotenuse. Was ist $' + fn[0] + ' α$?', '${' + fn[1] + '/' + fn[2] + '}$', ['${a/c}$', '${b/c}$', '${a/b}$', '${c/a}$', '${b/a}$'], { fig: Fig.shape({ P: [[0, 0], [5, 0], [5, 3]], v: ['A', 'C', 'B'], s: ['b', 'a', 'c'], ang: [{ at: 0, l: 'α' }, { at: 1, right: true }], maxh: 100 }), sol: '$' + fn[0] + ' α$ = ' + fn[3] + ' = ${' + fn[1] + '/' + fn[2] + '}$', hint: 'Sinus: Gegenkathete durch Hypotenuse. Kosinus: Ankathete durch Hypotenuse. Tangens: Gegenkathete durch Ankathete.' });
  });
  G('9-trigo', 1, function () {
    var q = R.pick([['sin 30°', 0.5], ['cos 60°', 0.5], ['tan 45°', 1], ['sin 90°', 1], ['cos 0°', 1], ['cos 90°', 0], ['sin 0°', 0]]);
    return NUM('Welchen Wert hat $' + q[0] + '$?', q[1], { sol: 'Ein besonderer Wert, den man auswendig kennen sollte: $' + q[0] + ' = ' + de(q[1]) + '$. Er ergibt sich aus dem halben gleichseitigen Dreieck (30° und 60°) bzw. dem halben Quadrat (45°).', hint: 'Denke an das halbe gleichseitige Dreieck mit den Winkeln 30°, 60° und 90°.' });
  });
  G('9-trigo', 2, function () {
    var c = 2 * R.int(2, 12), v = R.int(0, 2);
    if (v === 0) return NUM('In einem rechtwinkligen Dreieck ist die Hypotenuse ' + c + ' cm lang und $α = 30°$. Wie lang ist die Gegenkathete von $α$?', c / 2, { unit: 'cm', sol: '$sin 30° = {1/2}$, also Gegenkathete $= ' + c + ' * {1/2} = ' + c / 2 + '$ cm.', hint: 'Gegenkathete = Hypotenuse mal $sin α$.' });
    if (v === 1) return NUM('In einem rechtwinkligen Dreieck ist die Hypotenuse ' + c + ' cm lang und $α = 60°$. Wie lang ist die Ankathete von $α$?', c / 2, { unit: 'cm', sol: '$cos 60° = {1/2}$, also Ankathete $= ' + c + ' * {1/2} = ' + c / 2 + '$ cm.', hint: 'Ankathete = Hypotenuse mal $cos α$.' });
    return NUM('In einem rechtwinkligen Dreieck ist $α = 45°$ und die Ankathete ' + c + ' cm lang. Wie lang ist die Gegenkathete?', c, { unit: 'cm', sol: '$tan 45° = 1$, also Gegenkathete $= ' + c + ' * 1 = ' + c + '$ cm. Das Dreieck ist gleichschenklig.', hint: 'Gegenkathete = Ankathete mal $tan α$.' });
  });
  G('9-trigo', 2, function () {
    var q = R.pick([[37, 0.6, 0.8, 0.75], [53, 0.8, 0.6, 1.33], [24, 0.4, 0.9, 0.45]]), c = R.pick([5, 10, 15, 20, 25]), v = R.int(0, 1);
    if (v === 0) return NUM('In einem rechtwinkligen Dreieck ist die Hypotenuse ' + c + ' cm lang und $α = ' + q[0] + '°$. Wie lang ist die Gegenkathete von $α$? (Verwende $sin ' + q[0] + '° ≈ ' + de(q[1]) + '$.)', M.round(c * q[1], 2), { unit: 'cm', tol: 0.05, sol: 'Gegenkathete $= c * sin α ≈ ' + c + ' * ' + de(q[1]) + ' = ' + de(c * q[1]) + '$ cm.', hint: '$sin α = {Gegenkathete/Hypotenuse}$ – stelle nach der Gegenkathete um.' });
    return NUM('In einem rechtwinkligen Dreieck ist die Hypotenuse ' + c + ' cm lang und $α = ' + q[0] + '°$. Wie lang ist die Ankathete von $α$? (Verwende $cos ' + q[0] + '° ≈ ' + de(q[2]) + '$.)', M.round(c * q[2], 2), { unit: 'cm', tol: 0.05, sol: 'Ankathete $= c * cos α ≈ ' + c + ' * ' + de(q[2]) + ' = ' + de(c * q[2]) + '$ cm.', hint: '$cos α = {Ankathete/Hypotenuse}$ – stelle nach der Ankathete um.' });
  });
  G('9-trigo', 2, function () {
    var c = 2 * R.int(2, 9), v = R.int(0, 2);
    if (v === 0) return NUM('In einem rechtwinkligen Dreieck ist die Gegenkathete von $α$ ' + c / 2 + ' cm lang und die Hypotenuse ' + c + ' cm. Wie groß ist $α$?', 30, { unit: '°', sol: '$sin α = {' + c / 2 + '/' + c + '} = {1/2}$, also $α = 30°$.', hint: 'Welcher Winkel hat den Sinus ${1/2}$?' });
    if (v === 1) return NUM('In einem rechtwinkligen Dreieck ist die Ankathete von $α$ ' + c / 2 + ' cm lang und die Hypotenuse ' + c + ' cm. Wie groß ist $α$?', 60, { unit: '°', sol: '$cos α = {' + c / 2 + '/' + c + '} = {1/2}$, also $α = 60°$.', hint: 'Welcher Winkel hat den Kosinus ${1/2}$?' });
    return NUM('In einem rechtwinkligen Dreieck sind beide Katheten ' + c + ' cm lang. Wie groß ist jeder der beiden spitzen Winkel?', 45, { unit: '°', sol: '$tan α = {' + c + '/' + c + '} = 1$, also $α = 45°$. Das Dreieck ist gleichschenklig (Basiswinkelsatz, Klasse 6).', hint: 'Welcher Winkel hat den Tangens 1?' });
  });
  G('9-trigo', 2, function () {
    var d = R.pick([20, 30, 40, 50, 60]), q = R.pick([[45, 1], [31, 0.6], [27, 0.5], [39, 0.8]]);
    return NUM('Vom Boden aus sieht man die Spitze eines Kirchturms unter einem Winkel von ' + q[0] + '°. Der Turm ist ' + d + ' m entfernt. Wie hoch ist er? (Verwende $tan ' + q[0] + '° ≈ ' + de(q[1]) + '$.)', d * q[1], { unit: 'm', tol: 0.05, sol: 'Höhe = Gegenkathete, Entfernung = Ankathete: $h = ' + d + ' * tan ' + q[0] + '° ≈ ' + d + ' * ' + de(q[1]) + ' = ' + de(d * q[1]) + '$ m.', hint: '$tan α = {Gegenkathete/Ankathete}$' });
  });
  G('9-trigo', 2, function () {
    var a = R.pick([10, 20, 25, 35, 40, 55, 70, 80]);
    return NUM('Ergänze: $sin ' + a + '° = cos ▢°$. Welcher spitze Winkel gehört in die Lücke?', 90 - a, { unit: '°', sol: '$sin α = cos (90° - α)$: Die Gegenkathete des einen spitzen Winkels ist die Ankathete des anderen. $90° - ' + a + '° = ' + (90 - a) + '°$', hint: 'Die beiden spitzen Winkel im rechtwinkligen Dreieck ergänzen sich zu 90°.' });
  });
  G('9-trigo', 2, function () {
    var r = R.int(2, 6), h = R.pick([3, 6, 9, 12]);
    return NUM('Ein Kreiskegel hat den Radius ' + r + ' cm und die Höhe ' + h + ' cm. Sein Volumen ist $V = ▢ * π$ $cm^3$. Welche Zahl fehlt?', r * r * h / 3, { sol: '$V = {1/3} * π * r^2 * h = {1/3} * π * ' + r * r + ' * ' + h + ' = ' + r * r * h / 3 + 'π$', hint: 'Der Kegel ist eine „runde Pyramide“: ein Drittel von Grundfläche mal Höhe (Klasse 7).' });
  });
  G('9-trigo', 3, function () {
    var q = R.pick([[0.6, 0.8], [0.8, 0.6], [0.28, 0.96], [0.96, 0.28]]);
    return NUM('Für einen spitzen Winkel gilt $sin α = ' + de(q[0]) + '$. Wie groß ist $cos α$?', q[1], { tol: 0.005, sol: '$(sin α)^2 + (cos α)^2 = 1$, also $cos α = sqrt(1 - ' + de(q[0] * q[0]) + ') = sqrt(' + de(1 - q[0] * q[0]) + ') = ' + de(q[1]) + '$', hint: 'Trigonometrischer Pythagoras: $(sin α)^2 + (cos α)^2 = 1$' });
  });
  G('9-trigo', 3, function () {
    var t = R.pick([[3, 4, 5], [5, 12, 13], [6, 8, 10], [8, 15, 17]]);
    return NUM('Ein Kreiskegel hat den Radius ' + t[0] + ' cm und die Höhe ' + t[1] + ' cm. Seine Mantelfläche ist $M = π * r * s$ mit der Mantellinie $s$. Berechne $M = ▢ * π$ $cm^2$.', t[0] * t[2], { sol: 'Mantellinie mit Pythagoras: $s = sqrt(' + t[0] + '^2 + ' + t[1] + '^2) = ' + t[2] + '$. $M = π * ' + t[0] + ' * ' + t[2] + ' = ' + t[0] * t[2] + 'π$', hint: 'Radius, Höhe und Mantellinie bilden ein rechtwinkliges Dreieck.' });
  });
  G('9-trigo', 3, function () {
    var t = R.pick([[3, 4, 5], [5, 12, 13], [8, 15, 17], [6, 8, 10]]), a = 2 * t[0], o = a * a + 2 * a * t[2];
    return NUM('Eine quadratische Pyramide hat die Grundkante ' + a + ' cm und die Höhe ' + t[1] + ' cm. Berechne ihren Oberflächeninhalt.', o, { unit: '$cm^2$', sol: 'Höhe einer Seitenfläche mit Pythagoras: $h_s = sqrt(' + t[0] + '^2 + ' + t[1] + '^2) = ' + t[2] + '$. Vier Dreiecke: $4 * {' + a + ' * ' + t[2] + '/2} = ' + 2 * a * t[2] + '$. Plus Grundfläche $' + a * a + '$: $' + o + '$, also $' + o + ' cm^2$.', hint: 'Die Höhe einer Seitenfläche ist die Hypotenuse im Dreieck aus Körperhöhe und halber Grundkante.' });
  });
  G('9-trigo', 2, function () {
    var st = R.pick([['Der Wert von $sin α$ hängt davon ab, wie groß das rechtwinklige Dreieck ist.', false, 'Alle rechtwinkligen Dreiecke mit demselben Winkel sind ähnlich – die Seitenverhältnisse sind gleich (Klasse 8).'], ['Für jeden spitzen Winkel liegt $sin α$ zwischen 0 und 1.', true, 'Die Gegenkathete ist immer kürzer als die Hypotenuse.'], ['$tan α = {sin α/cos α}$', true, 'Gegenkathete durch Ankathete – die Hypotenuse kürzt sich heraus.'], ['$sin 60° = 2 * sin 30°$', false, '$sin 60° = {sqrt(3)/2} ≈ 0,87$, aber $2 * sin 30° = 1$. Der Sinus wächst nicht proportional zum Winkel.'], ['Der Tangens eines spitzen Winkels kann größer als 1 sein.', true, 'Sobald die Gegenkathete länger ist als die Ankathete, also für Winkel über 45°.'], ['Im rechtwinkligen Dreieck ist die Hypotenuse immer die längste Seite.', true, 'Sie liegt dem größten Winkel (90°) gegenüber.']]);
    return TF('Wahr oder falsch? ' + st[0], st[1], { sol: st[2] });
  });

  /* ---------- 9-statistik ---------- */
  function data(n, lo, hi) { var a = []; for (var i = 0; i < n; i++) a.push(R.int(lo, hi)); return a; }
  function sorted(a) { return a.slice().sort(function (x, y) { return x - y; }); }
  G('9-statistik', 1, function () {
    var a = data(R.pick([5, 7]), 1, 15), s = sorted(a), med = s[(s.length - 1) / 2];
    return NUM('Bestimme den Median der Daten: ' + a.join('; '), med, { sol: 'Geordnet: ' + s.join('; ') + '. Der mittlere Wert ist ' + med + '.', hint: 'Erst der Größe nach ordnen, dann den mittleren Wert suchen.' });
  });
  G('9-statistik', 1, function () {
    var m = R.int(2, 9), a = R.shuffle([m, m, m].concat(R.distinct(4, 1, 12).filter(function (x) { return x !== m; }).slice(0, 3)));
    return NUM('Bestimme den Modalwert der Daten: ' + a.join('; '), m, { sol: 'Der Wert ' + m + ' kommt am häufigsten vor (dreimal).', hint: 'Welcher Wert kommt am häufigsten vor?' });
  });
  G('9-statistik', 1, function () {
    var a = data(6, 2, 30), s = sorted(a);
    return NUM('Bestimme die Spannweite der Daten: ' + a.join('; '), s[5] - s[0], { sol: 'Größter Wert minus kleinster Wert: $' + s[5] + ' - ' + s[0] + ' = ' + (s[5] - s[0]) + '$', hint: 'Spannweite = Maximum minus Minimum.' });
  });
  G('9-statistik', 2, function () {
    var a = data(R.pick([4, 6]), 1, 14), s = sorted(a), n = s.length, med = (s[n / 2 - 1] + s[n / 2]) / 2;
    return NUM('Bestimme den Median der Daten: ' + a.join('; '), med, { sol: 'Geordnet: ' + s.join('; ') + '. Bei gerader Anzahl: Mittelwert der beiden mittleren Werte $(' + s[n / 2 - 1] + ' + ' + s[n / 2] + ') : 2 = ' + de(med) + '$', hint: 'Bei gerader Anzahl gibt es zwei mittlere Werte – nimm deren arithmetisches Mittel.' });
  });
  G('9-statistik', 2, function () {
    var base = sorted(data(4, 3, 9)), out = R.int(40, 90), mean1 = base.reduce(function (x, y) { return x + y; }, 0) / 4;
    return MC('Zu den Daten ' + base.join('; ') + ' kommt der Ausreißer ' + out + ' hinzu. Welche Kenngröße ändert sich dadurch am stärksten?', 'das arithmetische Mittel', ['der Median', 'der Modalwert', 'der kleinste Wert'], { sol: 'Das arithmetische Mittel steigt von $' + de(mean1, 2) + '$ auf $' + de((mean1 * 4 + out) / 5, 2) + '$. Der Median bleibt in der Nähe der mittleren Werte – er ist robust gegen Ausreißer.', hint: 'Welche Kenngröße rechnet mit jedem einzelnen Wert?' });
  });
  G('9-statistik', 2, function () {
    var q = R.pick([['Lieblingsfarbe', 0], ['Schulnote', 1], ['Körpergröße in cm', 2], ['Augenfarbe', 0], ['Platzierung beim Wettlauf', 1], ['Temperatur in °C', 2], ['Instrument, das jemand spielt', 0], ['Kleidergröße S, M, L, XL', 1], ['Schulweg in Minuten', 2]]);
    return MCF('Auf welcher Skala wird das Merkmal „' + q[0] + '“ gemessen?', ['Nominalskala (nur Namen)', 'Ordinalskala (Rangfolge)', 'metrische Skala (Messwerte)'], q[1], { sol: ['Die Ausprägungen sind nur Namen ohne Reihenfolge. Sinnvoll ist nur der Modalwert.', 'Die Ausprägungen lassen sich ordnen, aber Abstände sind nicht vergleichbar. Sinnvoll sind Modalwert und Median.', 'Mit den Werten kann man rechnen. Auch das arithmetische Mittel ist sinnvoll.'][q[1]], hint: 'Kann man die Werte ordnen? Kann man mit ihnen rechnen?' });
  });
  G('9-statistik', 2, function () {
    var a = sorted(data(9, 10, 39)), lo = R.pick([10, 20, 30]), cnt = a.filter(function (x) { return x >= lo && x < lo + 10; }).length;
    return NUM('Die Daten ' + a.join('; ') + ' werden in Klassen eingeteilt. Wie viele Werte liegen in der Klasse „' + lo + ' bis unter ' + (lo + 10) + '“?', cnt, { sol: 'In diese Klasse gehören: ' + (a.filter(function (x) { return x >= lo && x < lo + 10; }).join('; ') || 'keine Werte') + '. Im Histogramm bekommt die Klasse eine Säule dieser Höhe.', hint: '„Bis unter ' + (lo + 10) + '“ heißt: ' + (lo + 10) + ' selbst gehört schon zur nächsten Klasse.' });
  });
  G('9-statistik', 3, function () {
    var m = R.int(4, 9), devs = R.pick([[-2, -1, 0, 1, 2], [-3, -1, 0, 1, 3], [-2, -2, 0, 2, 2], [-1, -1, 0, 0, 2], [-4, -1, 0, 2, 3], [-3, 0, 0, 1, 2]]), a = R.shuffle(devs.map(function (d) { return m + d; })), ss = devs.reduce(function (x, d) { return x + d * d; }, 0);
    return NUM('Berechne die Varianz der Daten: ' + a.join('; ') + ' (Mittelwert der quadrierten Abweichungen vom arithmetischen Mittel)', ss / 5, { sol: 'Arithmetisches Mittel: ' + m + '. Abweichungen: ' + sorted(devs).join('; ') + '. Quadrate: ' + sorted(devs).map(function (d) { return d * d; }).join(' + ') + ' = ' + ss + '. Varianz: $' + ss + ' : 5 = ' + de(ss / 5) + '$', hint: 'Schritte: Mittelwert – Abweichungen – quadrieren – Mittelwert der Quadrate.' });
  });
  G('9-statistik', 3, function () {
    var m = R.int(5, 12), d = R.int(1, 4), a = R.shuffle([m - d, m - d, m + d, m + d]);
    return NUM('Berechne die Standardabweichung der Daten: ' + a.join('; '), d, { sol: 'Arithmetisches Mittel: ' + m + '. Jede Abweichung beträgt $+-' + d + '$, quadriert $' + d * d + '$. Varianz: $' + d * d + '$. Standardabweichung: $sqrt(' + d * d + ') = ' + d + '$', hint: 'Die Standardabweichung ist die Wurzel aus der Varianz.' });
  });
  G('9-statistik', 2, function () {
    var q = R.pick([['Eine Firma zeigt ihren Gewinn in einem Diagramm, dessen Hochachse erst bei 980 beginnt.', 'Die Achse ist abgeschnitten – kleine Zuwächse wirken riesig.'], ['Ein Bericht vergleicht die Zahl der Unfälle in einer Großstadt mit der in einem Dorf.', 'Die Bezugsbasis ist verschieden – man müsste Unfälle pro Einwohner vergleichen.'], ['Für eine Umfrage zur Beliebtheit von Musikunterricht werden nur Mitglieder des Schulchors befragt.', 'Die Stichprobe ist vorsortiert und nicht repräsentativ.'], ['Aus zwei Messwerten wird eine Entwicklung „für die nächsten 20 Jahre“ vorhergesagt.', 'Ein Trend wird unzulässig fortgeschrieben.'], ['Ein Ergebnis von 3 Befragten wird als „33,333 %“ angegeben.', 'Die Genauigkeit ist übertrieben – bei 3 Personen sagt sie nichts aus.']]);
    return MC(q[0] + ' Was ist daran problematisch?', q[1], ['Die Achse ist abgeschnitten – kleine Zuwächse wirken riesig.', 'Die Bezugsbasis ist verschieden – man müsste Unfälle pro Einwohner vergleichen.', 'Die Stichprobe ist vorsortiert und nicht repräsentativ.', 'Ein Trend wird unzulässig fortgeschrieben.', 'Die Genauigkeit ist übertrieben – bei 3 Personen sagt sie nichts aus.'], { sol: q[1] + ' Statistiken immer kritisch lesen: Achsen, Bezugsgrößen, Stichprobe.', hint: 'Welcher Eindruck soll entstehen – und stimmt er?' });
  });
  G('9-statistik', 2, function () {
    var st = R.pick([['Der Median ist unempfindlich gegen einzelne Ausreißer.', true, 'Er hängt nur von der Reihenfolge ab, nicht von der Größe der Randwerte.'], ['Die Standardabweichung kann negativ sein.', false, 'Sie ist die Wurzel aus einer Summe von Quadraten – also nie negativ.'], ['Sind alle Daten gleich, ist die Varianz 0.', true, 'Es gibt keine Abweichung vom Mittelwert.'], ['Zwei Datenreihen mit gleichem arithmetischem Mittel haben immer die gleiche Streuung.', false, 'Gegenbeispiel: 5; 5; 5 und 1; 5; 9 haben beide das Mittel 5.'], ['Für das Merkmal „Lieblingsfarbe“ kann man ein arithmetisches Mittel berechnen.', false, 'Mit Namen kann man nicht rechnen – nur der Modalwert ist sinnvoll.'], ['Mindestens die Hälfte der Daten ist kleiner oder gleich dem Median.', true, 'So ist der Median als mittlerer Wert festgelegt.']]);
    return TF('Wahr oder falsch? ' + st[0], st[1], { sol: st[2] });
  });

  /* ---------- 9-beweis ---------- */
  G('9-beweis', 1, function () {
    var q = R.pick([['Es gibt keine größte natürliche Zahl.', 'Es gibt eine größte natürliche Zahl.', ['Alle natürlichen Zahlen sind groß.', 'Es gibt keine kleinste natürliche Zahl.', 'Es gibt unendlich viele natürliche Zahlen.']], ['$sqrt(2)$ ist irrational.', '$sqrt(2)$ ist rational, lässt sich also als Bruch schreiben.', ['$sqrt(2)$ ist negativ.', '$sqrt(2)$ ist eine natürliche Zahl.', '$sqrt(3)$ ist irrational.']], ['Es gibt unendlich viele Primzahlen.', 'Es gibt nur endlich viele Primzahlen.', ['Es gibt keine Primzahlen.', 'Alle Zahlen sind Primzahlen.', 'Es gibt unendlich viele gerade Zahlen.']], ['In einem Dreieck kann es keine zwei rechten Winkel geben.', 'Es gibt ein Dreieck mit zwei rechten Winkeln.', ['Alle Dreiecke haben einen rechten Winkel.', 'Kein Dreieck hat einen rechten Winkel.', 'Es gibt ein Dreieck mit drei spitzen Winkeln.']]]);
    return MC('Die Behauptung „' + q[0] + '“ soll indirekt bewiesen werden. Mit welcher Annahme beginnt der Beweis?', q[1], q[2], { sol: 'Ein indirekter Beweis beginnt mit dem genauen Gegenteil der Behauptung und führt es zu einem Widerspruch.', hint: 'Gesucht ist die Verneinung der Behauptung (Klasse 8).' });
  });
  G('9-beweis', 2, function () {
    return ORD('Bringe den Beweis, dass $sqrt(2)$ irrational ist, in die richtige Reihenfolge.', ['Annahme: $sqrt(2) = {p/q}$ mit einem vollständig gekürzten Bruch.', 'Quadrieren ergibt $p^2 = 2 * q^2$. Also ist $p^2$ gerade – und damit auch $p$.', 'Setze $p = 2k$ ein: $4k^2 = 2q^2$, also $q^2 = 2k^2$. Damit ist auch $q$ gerade.', 'Sind $p$ und $q$ beide gerade, lässt sich der Bruch durch 2 kürzen – Widerspruch zur Annahme.'], { sol: 'Annahme des Gegenteils – Folgerungen – Widerspruch. Also war die Annahme falsch: $sqrt(2)$ ist irrational.', hint: 'Ein indirekter Beweis beginnt mit der Annahme und endet mit dem Widerspruch.' });
  });
  G('9-beweis', 1, function () {
    var q = R.pick([['sqrt(2)', 3], ['-3', 1], ['{1/2}', 2], ['sqrt(16)', 0], ['pi', 3], ['0,[3]', 2], ['-sqrt(9)', 1], ['sqrt(5)', 3], ['{10/5}', 0], ['2,75', 2]]);
    return MCF('In welchem kleinsten Zahlbereich liegt $' + q[0] + '$?', ['ℕ', 'ℤ', 'ℚ', 'ℝ'], q[1], { sol: '$ℕ ⊂ ℤ ⊂ ℚ ⊂ ℝ$ – jeder Bereich enthält den vorigen und schließt eine Lücke. ' + ['Hier: eine natürliche Zahl.', 'Hier: eine negative ganze Zahl.', 'Hier: ein Bruch, der nicht ganz ist.', 'Hier: eine irrationale Zahl.'][q[1]], hint: 'Berechne erst den Wert, falls möglich.' });
  });
  G('9-beweis', 2, function () {
    var q = R.pick([['Wenn ein Dreieck rechtwinklig ist (mit Hypotenuse $c$), dann gilt $a^2 + b^2 = c^2$.', true, 'Die Umkehrung des Satzes des Pythagoras ist wahr und wurde eigens bewiesen.'], ['Wenn ein Viereck ein Quadrat ist, dann sind seine Diagonalen gleich lang.', false, 'Auch in einem Rechteck, das kein Quadrat ist, sind die Diagonalen gleich lang.'], ['Wenn $a = b$ gilt, dann gilt $a^2 = b^2$.', false, 'Gegenbeispiel: $(-2)^2 = 2^2$, aber $-2 != 2$.'], ['Wenn ein Dreieck gleichseitig ist, dann ist es gleichschenklig.', false, 'Ein Dreieck mit den Seiten 5, 5 und 3 ist gleichschenklig, aber nicht gleichseitig.'], ['Wenn $C$ auf dem Kreis mit dem Durchmesser $AB$ liegt, dann ist der Winkel bei $C$ ein rechter.', true, 'Die Umkehrung des Satzes des Thales ist ebenfalls wahr.'], ['Wenn eine Zahl durch 9 teilbar ist, dann ist ihre Quersumme durch 9 teilbar.', true, 'Die Quersummenregel gilt in beiden Richtungen.']]);
    return TF('Der Satz ist wahr: „' + q[0] + '“ Ist auch seine Umkehrung wahr?', q[1], { sol: q[2] + (q[1] ? ' Man darf also „genau dann, wenn“ sagen.' : ' Hier darf man nicht „genau dann, wenn“ sagen.'), hint: 'Vertausche Voraussetzung und Behauptung und suche ein Gegenbeispiel.' });
  });
  G('9-beweis', 2, function () {
    var q = R.pick([['Die Behauptung „Alle Primzahlen sind ungerade“ soll widerlegt werden.', 2], ['Es soll gezeigt werden, dass die Summe zweier gerader Zahlen immer gerade ist: $2m + 2n = 2 * (m + n)$.', 0], ['Es soll gezeigt werden, dass $sqrt(2)$ kein Bruch ist. Man nimmt das Gegenteil an und stößt auf einen Widerspruch.', 1], ['Aus den Kongruenzsätzen wird Schritt für Schritt gefolgert, dass die Basiswinkel gleich sind.', 0], ['Die Behauptung „Jedes Viereck mit gleich langen Diagonalen ist ein Rechteck“ soll widerlegt werden.', 2]]);
    return MCF(q[0] + ' Welches Verfahren ist das?', ['direkter Beweis', 'indirekter Beweis', 'Widerlegen durch ein Gegenbeispiel'], q[1], { sol: 'Direkt: von der Voraussetzung zur Behauptung. Indirekt: Gegenteil annehmen, Widerspruch finden. Gegenbeispiel: eine Allaussage mit einem einzigen Fall widerlegen.', hint: 'Wird etwas hergeleitet, ein Widerspruch gesucht oder ein einzelner Fall angegeben?' });
  });
  G('9-beweis', 3, function () {
    return MC('Im Beweis für die Irrationalität von $sqrt(2)$ folgt aus der Annahme $sqrt(2) = {p/q}$: Sowohl $p$ als auch $q$ sind gerade. Worin besteht der Widerspruch?', 'Der Bruch sollte vollständig gekürzt sein – er lässt sich aber durch 2 kürzen.', ['Gerade Zahlen kann man nicht dividieren.', '$p$ und $q$ dürfen nicht gleich sein.', 'Eine Wurzel kann keine gerade Zahl sein.'], { sol: 'Zu Beginn wurde angenommen, dass ${p/q}$ vollständig gekürzt ist. Zwei gerade Zahlen haben aber den gemeinsamen Teiler 2.', hint: 'Welche Eigenschaft des Bruchs wurde am Anfang vorausgesetzt?' });
  });
  G('9-beweis', 3, function () {
    return ORD('Euklids Beweis: Es gibt unendlich viele Primzahlen. Ordne die Schritte.', ['Annahme: Es gibt nur endlich viele Primzahlen $p_1, p_2, ..., p_n$.', 'Bilde die Zahl $N = p_1 * p_2 * ... * p_n + 1$.', '$N$ lässt beim Teilen durch jede dieser Primzahlen den Rest 1 – keine von ihnen teilt $N$.', '$N$ muss aber einen Primfaktor haben. Dieser fehlt in der Liste – Widerspruch.'], { sol: 'Ein über 2000 Jahre alter indirekter Beweis – er steht in Euklids „Elementen“.', hint: 'Annahme – Konstruktion – Folgerung – Widerspruch.' });
  });
  G('9-beweis', 3, function () {
    var st = R.pick([['Die Summe aus einer rationalen und einer irrationalen Zahl ist immer irrational.', true, 'Indirekt: Wäre die Summe rational, dann wäre auch die Differenz zweier rationaler Zahlen – die irrationale Zahl – rational. Widerspruch.'], ['Das Produkt zweier irrationaler Zahlen ist immer irrational.', false, 'Gegenbeispiel: $sqrt(2) * sqrt(2) = 2$.'], ['Zwischen 1 und 2 liegen irrationale Zahlen.', true, 'Zum Beispiel $sqrt(2) ≈ 1,41$.'], ['Jede reelle Zahl ist entweder rational oder irrational.', true, 'So sind die irrationalen Zahlen festgelegt: die reellen Zahlen, die nicht rational sind.'], ['Ein indirekter Beweis zeigt, dass die Behauptung falsch ist.', false, 'Er zeigt, dass das Gegenteil der Behauptung falsch ist – also die Behauptung wahr.'], ['Gilt ein Satz und seine Umkehrung, darf man „genau dann, wenn“ sagen.', true, 'Beide Richtungen sind dann bewiesen.']]);
    return TF('Wahr oder falsch? ' + st[0], st[1], { sol: st[2] });
  });
})(typeof window !== 'undefined' ? window : globalThis);

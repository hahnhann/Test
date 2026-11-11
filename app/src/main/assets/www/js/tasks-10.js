/* Silberzirkel – Aufgaben Klasse 10 (Lehrplan Sachsen, Gymnasium). */
(function (g) {
  'use strict';
  var SZ = g.SZ, R = SZ.R, M = SZ.M, G = SZ.G, MC = SZ.MC, MCN = SZ.MCN, MCF = SZ.MCF, NUM = SZ.NUM, GAP = SZ.GAP, TF = SZ.TF, ORD = SZ.ORD, Fig = SZ.Fig, de = M.de, F = M.F, fs = M.fs, lin = M.lin, par = M.par;
  function tb(xs, ys, lx, ly) { return '<table class="tb"><tr><th>$' + (lx || 'x') + '$</th><td>' + xs.join('</td><td>') + '</td></tr><tr><th>$' + (ly || 'y') + '$</th><td>' + ys.map(function (y) { return typeof y === 'number' ? de(y) : y; }).join('</td><td>') + '</td></tr></table>'; }
  var PI = Math.PI;
  var PIT = [{ x: PI / 2, l: 'π/2' }, { x: PI, l: 'π' }, { x: 3 * PI / 2, l: '3π/2' }, { x: 2 * PI, l: '2π' }, { x: -PI / 2, l: '' }];

  /* ---------- 10-expo ---------- */
  G('10-expo', 1, function () {
    var p = R.pick([2, 3, 5, 8, 10, 12, 20, 25, 50]), up = R.bool(), q = (100 + (up ? p : -p)) / 100;
    return NUM('Eine Größe ' + (up ? 'wächst' : 'schrumpft') + ' in jedem Schritt um ' + p + ' %. Wie groß ist der Wachstumsfaktor $q$?', q, { pre: '$q =$', sol: '$q = 1 ' + (up ? '+' : '-') + ' {' + p + '/100} = ' + de(q) + '$', hint: 'Um 5 % mehr heißt „mal 1,05“ (Prozentrechnung, Klasse 7).' });
  });
  G('10-expo', 1, function () {
    var lin1 = R.bool(), a = R.int(2, 6), d = R.int(2, 5), q = R.pick([2, 3]), ys = [0, 1, 2, 3].map(function (n) { return lin1 ? a + d * n : a * Math.pow(q, n); });
    return MCF('Welche Art von Wachstum zeigt die Tabelle?' + tb([0, 1, 2, 3], ys, 'n', 'B(n)'), ['lineares Wachstum', 'exponentielles Wachstum', 'keines von beiden'], lin1 ? 0 : 1, { sol: lin1 ? 'Die Differenz benachbarter Werte ist immer ' + d + ': lineares Wachstum.' : 'Der Quotient benachbarter Werte ist immer ' + q + ': exponentielles Wachstum.', hint: 'Bilde Differenzen und Quotienten benachbarter Werte.' });
  });
  G('10-expo', 1, function () {
    var b0 = R.pick([50, 100, 200, 500]), q = R.pick([2, 3]), n = R.int(2, 5);
    return NUM('Eine Bakterienkultur beginnt mit ' + b0 + ' Bakterien und ' + (q === 2 ? 'verdoppelt' : 'verdreifacht') + ' sich jede Stunde. Wie viele Bakterien sind es nach ' + n + ' Stunden?', b0 * Math.pow(q, n), { sol: '$B(' + n + ') = ' + b0 + ' * ' + q + '^' + n + ' = ' + b0 + ' * ' + Math.pow(q, n) + ' = ' + de(b0 * Math.pow(q, n)) + '$', hint: 'Explizite Formel: $B(n) = B(0) * q^n$' });
  });
  G('10-expo', 2, function () {
    var q = R.pick([['2^x', -2, F(1, 4)], ['2^x', 5, 32], ['3^x', 0, 1], ['3^x', -1, F(1, 3)], ['({1/2})^x', 3, F(1, 8)], ['({1/2})^x', -3, 8], ['10^x', -2, F(1, 100)], ['4^x', F(1, 2), 2], ['5^x', 2, 25], ['({1/3})^x', -2, 9]]), x = typeof q[1] === 'number' ? q[1] : fs(q[1]);
    return NUM('Gegeben ist $f(x) = ' + q[0] + '$. Berechne $f(' + x + ')$. (ganze Zahl oder Bruch)', q[2], { reduced: true, sol: '$f(' + x + ') = ' + (typeof q[2] === 'number' ? q[2] : fs(q[2])) + '$ – mit den Potenzgesetzen aus Klasse 9 (negativer Exponent: Kehrwert; Exponent ${1/2}$: Wurzel).', hint: 'Negativer Exponent bedeutet Kehrwert.' });
  });
  G('10-expo', 2, function () {
    var hw = R.pick([4, 5, 8, 10, 30]), n = R.int(2, 4), m0 = R.pick([80, 160, 320, 640]);
    return NUM('Ein radioaktiver Stoff hat die Halbwertszeit ' + hw + ' Tage. Am Anfang sind ' + m0 + ' mg vorhanden. Wie viel ist nach ' + hw * n + ' Tagen noch übrig?', m0 / Math.pow(2, n), { unit: 'mg', sol: hw * n + ' Tage sind ' + n + ' Halbwertszeiten: $' + m0 + ' * ({1/2})^' + n + ' = {' + m0 + '/' + Math.pow(2, n) + '} = ' + de(m0 / Math.pow(2, n)) + '$ mg.', hint: 'Wie viele Halbwertszeiten sind vergangen? Jede halbiert die Menge.' });
  });
  G('10-expo', 2, function () {
    var dt = R.pick([2, 3, 5, 20]), n = R.int(2, 5), b0 = R.pick([10, 50, 100, 300]);
    return NUM('Eine Algenfläche verdoppelt sich alle ' + dt + ' Tage. Heute bedeckt sie ' + b0 + ' m². Wie groß ist sie in ' + dt * n + ' Tagen?', b0 * Math.pow(2, n), { unit: 'm²', sol: dt * n + ' Tage sind ' + n + ' Verdopplungszeiten: $' + b0 + ' * 2^' + n + ' = ' + de(b0 * Math.pow(2, n)) + '$ m².', hint: 'Wie oft wird in dieser Zeit verdoppelt?' });
  });
  G('10-expo', 2, function () {
    var q = R.pick([1.5, 2, 0.5, 3]), b0 = R.pick([8, 16, 32, 64]), n = R.int(2, 3);
    return NUM('Eine Folge ist rekursiv festgelegt: $B(0) = ' + b0 + '$ und $B(n + 1) = ' + de(q) + ' * B(n)$. Berechne $B(' + n + ')$.', b0 * Math.pow(q, n), { sol: 'Schritt für Schritt: ' + [0, 1, 2, 3].slice(0, n + 1).map(function (k) { return '$B(' + k + ') = ' + de(b0 * Math.pow(q, k)) + '$'; }).join(', ') + '. Explizit: $B(n) = ' + b0 + ' * ' + de(q) + '^n$.', hint: 'Rekursiv heißt: Jeder Wert wird aus seinem Vorgänger berechnet.' });
  });
  G('10-expo', 2, function () {
    var fns = [['2^x', function (x) { return Math.pow(2, x); }], ['({1/2})^x', function (x) { return Math.pow(0.5, x); }], ['x^2', function (x) { return x * x; }], ['2x', function (x) { return 2 * x; }]], i = R.int(0, 1);
    return MC('Welche Funktionsgleichung gehört zu diesem Graphen?', '$f(x) = ' + fns[i][0] + '$', fns.filter(function (_, k) { return k !== i; }).map(function (f) { return '$f(x) = ' + f[0] + '$'; }), { fig: Fig.graph({ x: [-4, 4], y: [-1, 7], w: 220, fns: [{ f: fns[i][1] }] }), sol: 'Der Graph geht durch $(0|1)$, verläuft ganz oberhalb der $x$-Achse und ' + (i === 0 ? 'steigt immer steiler: $2^x$.' : 'fällt und schmiegt sich an die $x$-Achse: $({1/2})^x$.'), hint: 'Jede Exponentialfunktion $a^x$ geht durch $(0|1)$ und hat die $x$-Achse als Asymptote.' });
  });
  G('10-expo', 2, function () {
    var q = R.pick([1.25, 1.5, 1.04, 0.8, 0.95, 2, 1.1, 0.5]), p = M.round((q - 1) * 100, 2);
    return NUM('Der Wachstumsfaktor ist $q = ' + de(q) + '$. Um wie viel Prozent ändert sich die Größe pro Schritt? (Abnahme als negative Zahl)', p, { unit: '%', sol: '$q - 1 = ' + de(q - 1) + '$, also ' + (p > 0 ? 'eine Zunahme um ' + de(p) + ' %.' : 'eine Abnahme um ' + de(-p) + ' %.'), hint: 'Ziehe 1 ab und rechne in Prozent um.' });
  });
  G('10-expo', 3, function () {
    var q = R.pick([1.1, 1.2, 1.5, 0.5, 0.9, 2, 3]), b0 = R.pick([100, 200, 400, 1000]), b2 = M.round(b0 * q * q, 2);
    return NUM('Ein Bestand ändert sich exponentiell: Aus ' + b0 + ' werden in zwei Schritten ' + de(b2) + '. Wie groß ist der Wachstumsfaktor $q$ pro Schritt?', q, { pre: '$q =$', tol: 0.001, sol: '$' + b0 + ' * q^2 = ' + de(b2) + '$, also $q^2 = ' + de(q * q) + '$ und $q = sqrt(' + de(q * q) + ') = ' + de(q) + '$.', hint: 'In zwei Schritten wird zweimal mit $q$ multipliziert: $q^2$.' });
  });
  G('10-expo', 3, function () {
    var c = R.int(1, 5), a = R.int(2, 5), v = R.int(0, 2);
    if (v === 0) return NUM('In welcher Höhe schneidet der Graph von $f(x) = ' + a + ' * 2^x$ die $y$-Achse?', a, { pre: '$y =$', sol: '$f(0) = ' + a + ' * 2^0 = ' + a + ' * 1 = ' + a + '$. Der Faktor vor der Potenz ist der Anfangswert.', hint: 'Setze $x = 0$ ein. Was ist $2^0$?' });
    if (v === 1) return NUM('Die Funktion $g(x) = 2^x + ' + c + '$ hat eine waagerechte Asymptote $y = ▢$. Welche Zahl gehört in die Lücke?', c, { pre: '$y =$', sol: 'Der Graph von $2^x$ wird um ' + c + ' nach oben verschoben – mit ihm die Asymptote: $y = ' + c + '$.', hint: '$2^x$ nähert sich für sehr kleine $x$ der 0. Was passiert, wenn man ' + c + ' addiert?' });
    return MC('Wie entsteht der Graph von $g(x) = 2^{x - ' + c + '}$ aus dem Graphen von $f(x) = 2^x$?', 'Verschiebung um ' + c + ' nach rechts', ['Verschiebung um ' + c + ' nach links', 'Verschiebung um ' + c + ' nach unten', 'Verschiebung um ' + c + ' nach oben'], { sol: '$f(x - c)$ verschiebt den Graphen um $c$ nach rechts – wie bei der Parabel in Klasse 9.', hint: 'Die Zahl steht im Exponenten bei $x$: waagerechte Verschiebung.' });
  });
  G('10-expo', 2, function () {
    var st = R.pick([['Der Graph von $f(x) = 2^x$ schneidet die $x$-Achse.', false, 'Eine Potenz mit positiver Basis ist immer positiv – es gibt keine Nullstelle.'], ['Jede Exponentialfunktion $f(x) = a^x$ geht durch den Punkt $(0|1)$.', true, '$a^0 = 1$ für jede Basis.'], ['Für $0 < a < 1$ fällt der Graph von $f(x) = a^x$.', true, 'Jeder Schritt multipliziert mit einer Zahl kleiner als 1.'], ['Bei exponentiellem Wachstum ist die Verdopplungszeit immer gleich lang.', true, 'In gleichen Zeitspannen wird mit demselben Faktor multipliziert.'], ['Lineares Wachstum überholt auf lange Sicht jedes exponentielle Wachstum.', false, 'Es ist umgekehrt: Exponentielles Wachstum mit $q > 1$ überholt irgendwann jedes lineare.'], ['$f(x) = x^2$ ist eine Exponentialfunktion.', false, 'Das ist eine Potenzfunktion: Die Variable steht in der Basis, nicht im Exponenten.']]);
    return TF('Wahr oder falsch? ' + st[0], st[1], { sol: st[2] });
  });

  /* ---------- 10-sinus ---------- */
  var GB = [[180, F(1, 1)], [90, F(1, 2)], [60, F(1, 3)], [45, F(1, 4)], [30, F(1, 6)], [360, F(2, 1)], [270, F(3, 2)], [120, F(2, 3)], [150, F(5, 6)], [135, F(3, 4)]];
  G('10-sinus', 1, function () {
    var q = R.pick(GB);
    if (R.bool()) return NUM('Rechne ins Bogenmaß um: $' + q[0] + '° = ▢ * π$. Welche Zahl fehlt? (ganze Zahl oder Bruch)', q[1], { reduced: true, sol: '$180° = π$, also $' + q[0] + '° = {' + q[0] + '/180} * π = ' + fs(q[1]) + ' * π$', hint: '$180°$ entsprechen $π$.' });
    return NUM('Rechne ins Gradmaß um: $x = ' + (q[1].d === 1 ? (q[1].n === 1 ? '' : q[1].n) + 'π' : '{' + (q[1].n === 1 ? '' : q[1].n) + 'π/' + q[1].d + '}') + '$', q[0], { unit: '°', sol: '$π$ entspricht 180°: $' + fs(q[1]) + ' * 180° = ' + q[0] + '°$', hint: 'Ersetze $π$ durch 180°.' });
  });
  G('10-sinus', 1, function () {
    var a = R.pick([2, 3, 0.5, 4, 1.5, 5]), b = R.pick([1, 2, 3]), neg = R.bool(0.25);
    return NUM('Wie groß ist die Amplitude von $f(x) = ' + (neg ? '-' : '') + M.num(a) + ' * sin(' + (b === 1 ? '' : b) + 'x)$?', a, { sol: 'Die Amplitude ist der Betrag des Faktors vor dem Sinus: $' + de(a) + '$. Die Funktionswerte liegen zwischen $' + de(-a) + '$ und $' + de(a) + '$.', hint: 'Die Amplitude ist der größte Ausschlag – sie ist nie negativ.' });
  });
  G('10-sinus', 2, function () {
    var q = R.pick([[2, F(1, 1)], [4, F(1, 2)], [1, F(2, 1)], [3, F(2, 3)], [0.5, F(4, 1)], [8, F(1, 4)]]);
    return NUM('Die Periode von $f(x) = sin(' + (q[0] === 1 ? '' : M.num(q[0])) + 'x)$ ist $▢ * π$. Welche Zahl fehlt? (ganze Zahl oder Bruch)', q[1], { reduced: true, sol: 'Periode $= {2π/b} = {2π/' + M.num(q[0]) + '} = ' + fs(q[1]) + ' * π$', hint: 'Die Periode von $sin(b * x)$ ist ${2π/b}$.' });
  });
  G('10-sinus', 2, function () {
    var q = R.pick([['{π/2}', 1], ['π', 0], ['{3π/2}', -1], ['{π/6}', 0.5], ['0', 0], ['2π', 0], ['{5π/2}', 1], ['-{π/2}', -1]]);
    return NUM('Berechne: $sin(' + q[0] + ')$', q[1], { sol: 'Am Einheitskreis: $sin(' + q[0] + ') = ' + de(q[1]) + '$. Merke: Nullstellen bei allen Vielfachen von $π$, Maximum 1 bei ${π/2}$, Minimum $-1$ bei ${3π/2}$.', hint: 'Rechne ins Gradmaß um, wenn dir das leichter fällt: $π$ entspricht 180°.' });
  });
  G('10-sinus', 2, function () {
    var a = R.pick([1, 2, 3]), b = R.pick([1, 2]), ask = R.bool();
    var fig = Fig.graph({ x: [-1, 7], y: [-4, 4], w: 250, xticks: PIT, fns: [{ f: function (x) { return a * Math.sin(b * x); } }] });
    if (ask) return NUM('Lies am Graphen die Amplitude der Sinusfunktion ab.', a, { fig: fig, sol: 'Der größte Ausschlag nach oben beträgt ' + a + '.', hint: 'Wie hoch ist der höchste Punkt über der $x$-Achse?' });
    return NUM('Lies am Graphen die Periode der Sinusfunktion ab: $▢ * π$', 2 / b, { fig: fig, sol: 'Nach $' + (2 / b === 1 ? '' : 2 / b) + 'π$ wiederholt sich der Verlauf. Die Funktion ist $f(x) = ' + (a === 1 ? '' : a + ' * ') + 'sin(' + (b === 1 ? '' : b) + 'x)$.', hint: 'Nach welcher Strecke auf der $x$-Achse beginnt die Welle von vorn?' });
  });
  G('10-sinus', 2, function () {
    var a = R.int(2, 5), d = R.nz(-4, 4), mx = R.bool();
    return NUM('Welchen ' + (mx ? 'größten' : 'kleinsten') + ' Funktionswert nimmt $f(x) = ' + a + ' * sin(x) ' + (d < 0 ? '- ' + (-d) : '+ ' + d) + '$ an?', mx ? a + d : d - a, { sol: '$sin(x)$ liegt zwischen $-1$ und $1$. Also liegt $' + a + ' * sin(x)$ zwischen $-' + a + '$ und $' + a + '$, und nach der Verschiebung um $' + d + '$ zwischen $' + (d - a) + '$ und $' + (a + d) + '$.', hint: 'Welche Werte kann $sin(x)$ höchstens und mindestens annehmen?' });
  });
  G('10-sinus', 2, function () {
    var b = R.pick([1, 2, 3]);
    return NUM('Wie viele Nullstellen hat $f(x) = sin(' + (b === 1 ? '' : b) + 'x)$ im Intervall $0 <= x <= 2π$ (Ränder mitgezählt)?', 2 * b + 1, { sol: 'Die Nullstellen liegen im Abstand $' + (b === 1 ? 'π' : '{π/' + b + '}') + '$: bei $0$, $' + (b === 1 ? 'π' : '{π/' + b + '}') + '$, … bis $2π$. Das sind $' + (2 * b + 1) + '$ Stück.', hint: '$sin$ wird 0 bei allen Vielfachen von $π$. Hier läuft die Zeit ' + b + '-mal so schnell.' });
  });
  G('10-sinus', 3, function () {
    var q = R.pick([['sin(x) + 2', 'Verschiebung um 2 nach oben'], ['sin(x) - 2', 'Verschiebung um 2 nach unten'], ['2 * sin(x)', 'Streckung in $y$-Richtung: doppelte Amplitude'], ['sin(2x)', 'Stauchung in $x$-Richtung: halbe Periode'], ['sin(x - {π/2})', 'Verschiebung um ${π/2}$ nach rechts'], ['sin(x + {π/2})', 'Verschiebung um ${π/2}$ nach links']]);
    return MC('Wie entsteht der Graph von $g(x) = ' + q[0] + '$ aus dem Graphen von $f(x) = sin(x)$?', q[1], ['Verschiebung um 2 nach oben', 'Verschiebung um 2 nach unten', 'Streckung in $y$-Richtung: doppelte Amplitude', 'Stauchung in $x$-Richtung: halbe Periode', 'Verschiebung um ${π/2}$ nach rechts', 'Verschiebung um ${π/2}$ nach links'], { sol: '$c * f(x)$ streckt in $y$-Richtung, $f(x) + c$ verschiebt nach oben, $f(x + c)$ verschiebt nach links, $f(c * x)$ staucht in $x$-Richtung.', hint: 'Steht die Zahl außen (wirkt auf $y$) oder innen bei $x$ (wirkt waagerecht)?' });
  });
  G('10-sinus', 3, function () {
    var v = R.int(0, 2), f = R.pick([110, 220, 440, 880]);
    if (v === 0) return NUM('Der Ton a′ schwingt ' + f + '-mal pro Sekunde. Wie oft schwingt der Ton, der genau eine Oktave höher liegt?', 2 * f, { unit: 'Hertz', sol: 'Eine Oktave höher bedeutet doppelte Frequenz: $2 * ' + f + ' = ' + 2 * f + '$ Hertz. Die Sinuswelle wird in $x$-Richtung auf die Hälfte gestaucht.', hint: 'Eine Oktave entspricht dem Frequenzverhältnis 2 : 1.' });
    if (v === 1) return NUM('Ein Ton schwingt ' + f + '-mal pro Sekunde. Wie oft schwingt der Ton, der genau eine Oktave tiefer liegt?', f / 2, { unit: 'Hertz', sol: 'Eine Oktave tiefer bedeutet halbe Frequenz: $' + f + ' : 2 = ' + f / 2 + '$ Hertz. Die Periode verdoppelt sich.', hint: 'Eine Oktave entspricht dem Frequenzverhältnis 2 : 1.' });
    var fr = R.pick([100, 200, 250, 500]);
    return NUM('Ein Ton schwingt ' + fr + '-mal pro Sekunde. Wie viele Millisekunden dauert eine einzelne Schwingung (die Periode)?', 1000 / fr, { unit: 'ms', sol: 'Periodendauer $= {1/' + fr + '}$ Sekunde $= {1000/' + fr + '}$ ms $= ' + de(1000 / fr) + '$ ms. Frequenz und Periode sind indirekt proportional (Klasse 6).', hint: 'In einer Sekunde (1000 ms) passen ' + fr + ' Schwingungen.' });
  });
  G('10-sinus', 2, function () {
    var st = R.pick([['Die Sinusfunktion ist periodisch mit der Periode $2π$.', true, 'Nach einem vollen Umlauf am Einheitskreis wiederholen sich alle Werte.'], ['Die Sinusfunktion nimmt Werte größer als 1 an.', false, 'Der Wertebereich von $sin(x)$ ist $-1 <= y <= 1$.'], ['Der Graph der Sinusfunktion ist punktsymmetrisch zum Ursprung.', true, '$sin(-x) = -sin(x)$'], ['$360°$ entsprechen im Bogenmaß $π$.', false, '$360° = 2π$, $180° = π$.'], ['Je größer $b$ in $sin(b * x)$, desto kürzer ist die Periode.', true, 'Die Periode ist ${2π/b}$.'], ['Die Amplitude bestimmt bei einem Ton die Lautstärke, die Frequenz die Tonhöhe.', true, 'Größerer Ausschlag: lauter. Schnellere Schwingung: höher.']]);
    return TF('Wahr oder falsch? ' + st[0], st[1], { sol: st[2] });
  });

  /* ---------- 10-zufallsgr ---------- */
  G('10-zufallsgr', 1, function () {
    var p = R.pick([[0.1, 0.4, 0.3, 0.2], [0.25, 0.25, 0.3, 0.2], [0.5, 0.2, 0.2, 0.1], [0.15, 0.35, 0.4, 0.1], [0.3, 0.3, 0.3, 0.1]]), i = R.int(0, 3), shown = p.map(function (x, k) { return k === i ? '?' : de(x); });
    return NUM('Die Tabelle zeigt die Wahrscheinlichkeitsverteilung einer Zufallsgröße $X$. Welcher Wert fehlt?' + tb([0, 1, 2, 3], shown, 'k', 'P(X = k)'), p[i], { sol: 'Alle Wahrscheinlichkeiten ergeben zusammen 1: $1 - ' + p.filter(function (_, k) { return k !== i; }).map(function (x) { return de(x); }).join(' - ') + ' = ' + de(p[i]) + '$', hint: 'Die Summe aller Wahrscheinlichkeiten einer Verteilung ist 1.' });
  });
  G('10-zufallsgr', 1, function () {
    var xs = R.pick([[0, 1, 2], [1, 2, 3], [0, 2, 4], [0, 5, 10], [-1, 0, 2]]), p = R.pick([[0.5, 0.3, 0.2], [0.2, 0.5, 0.3], [0.1, 0.6, 0.3], [0.25, 0.5, 0.25], [0.4, 0.4, 0.2]]), e = M.round(xs[0] * p[0] + xs[1] * p[1] + xs[2] * p[2], 4);
    return NUM('Berechne den Erwartungswert der Zufallsgröße $X$.' + tb(xs, p, 'x_i', 'P(X = x_i)'), e, { sol: '$E(X) = ' + xs.map(function (x, k) { return par(x) + ' * ' + de(p[k]); }).join(' + ') + ' = ' + de(e) + '$', hint: 'Jeden Wert mit seiner Wahrscheinlichkeit multiplizieren und alles addieren.' });
  });
  G('10-zufallsgr', 2, function () {
    var n = R.pick([4, 6, 8, 10, 12, 20]);
    return NUM('Ein fairer Würfel mit ' + n + ' Flächen trägt die Zahlen 1 bis ' + n + '. Wie groß ist der Erwartungswert der gewürfelten Zahl?', (n + 1) / 2, { sol: 'Jede Zahl hat die Wahrscheinlichkeit ${1/' + n + '}$: $E(X) = (1 + 2 + ... + ' + n + ') * {1/' + n + '} = {' + n * (n + 1) / 2 + '/' + n + '} = ' + de((n + 1) / 2) + '$. Das ist zugleich das arithmetische Mittel der Zahlen (Klasse 5).', hint: 'Bei gleichen Wahrscheinlichkeiten ist der Erwartungswert das arithmetische Mittel aller Werte.' });
  });
  G('10-zufallsgr', 2, function () {
    var p = R.pick([[0.1, 0.4, 0.3, 0.2], [0.2, 0.3, 0.4, 0.1], [0.05, 0.25, 0.45, 0.25], [0.3, 0.4, 0.2, 0.1]]), k = R.int(1, 2), v = R.int(0, 2), ans, txt, why;
    if (v === 0) { ans = p.slice(k).reduce(function (a, b) { return a + b; }, 0); txt = 'mindestens ' + k; why = p.slice(k).map(function (x) { return de(x); }).join(' + '); }
    else if (v === 1) { ans = p.slice(0, k + 1).reduce(function (a, b) { return a + b; }, 0); txt = 'höchstens ' + k; why = p.slice(0, k + 1).map(function (x) { return de(x); }).join(' + '); }
    else { ans = p[k]; txt = 'genau ' + k; why = de(p[k]); }
    return NUM('$X$ zählt die Treffer bei drei Würfen auf eine Zielscheibe. Wie groß ist die Wahrscheinlichkeit für ' + txt + ' Treffer?' + tb([0, 1, 2, 3], p, 'k', 'P(X = k)'), M.round(ans, 4), { sol: '„' + txt.charAt(0).toUpperCase() + txt.slice(1) + '“ umfasst ' + (v === 0 ? 'die Werte ' + k + ' bis 3' : v === 1 ? 'die Werte 0 bis ' + k : 'nur den Wert ' + k) + ': $' + why + ' = ' + de(ans) + '$', hint: 'Welche Trefferzahlen gehören zu „' + txt + '“?' });
  });
  G('10-zufallsgr', 2, function () {
    var q = R.pick([[6, 'eine Sechs', 1], [6, 'eine gerade Zahl', 3], [6, 'eine Zahl größer als 4', 2]]), pay = R.pick([6, 12, 18, 24]), fair = pay * q[2] / 6;
    return NUM('Bei einem Würfelspiel erhält man ' + pay + ' Taler, wenn ' + q[1] + ' fällt, sonst nichts. Bei welchem Einsatz ist das Spiel fair?', fair, { unit: 'Taler', sol: 'Erwartete Auszahlung: $' + pay + ' * {' + q[2] + '/6} = ' + de(fair) + '$ Taler. Bei einem fairen Spiel ist der Einsatz genauso groß – der erwartete Gewinn ist dann 0.', hint: 'Fair heißt: Einsatz = erwartete Auszahlung.' });
  });
  G('10-zufallsgr', 2, function () {
    var parts = R.pick([[[F(1, 2), 0], [F(1, 4), 2], [F(1, 4), 4]], [[F(1, 2), 0], [F(1, 3), 3], [F(1, 6), 6]], [[F(3, 4), 0], [F(1, 4), 8]], [[F(1, 2), 1], [F(1, 2), 3]], [[F(2, 5), 0], [F(2, 5), 5], [F(1, 5), 10]]]), e = 0;
    parts.forEach(function (x) { e += M.fval(x[0]) * x[1]; });
    return NUM('Ein Glücksrad zahlt aus: ' + parts.map(function (x) { return 'mit Wahrscheinlichkeit $' + fs(x[0]) + '$ ' + x[1] + ' Taler'; }).join(', ') + '. Wie viele Taler bekommt man im Durchschnitt pro Drehung?', M.round(e, 4), { unit: 'Taler', sol: '$E(X) = ' + parts.map(function (x) { return fs(x[0]) + ' * ' + x[1]; }).join(' + ') + ' = ' + de(e) + '$', hint: 'Der Erwartungswert ist der Durchschnitt auf lange Sicht.' });
  });
  G('10-zufallsgr', 2, function () {
    var three = R.bool(), q = three ? R.pick([['genau zweimal Kopf', F(3, 8)], ['genau einmal Kopf', F(3, 8)], ['dreimal Kopf', F(1, 8)], ['mindestens zweimal Kopf', F(1, 2)]]) : R.pick([['genau einmal Kopf', F(1, 2)], ['zweimal Kopf', F(1, 4)], ['mindestens einmal Kopf', F(3, 4)]]);
    return NUM('Eine Münze wird ' + (three ? 'dreimal' : 'zweimal') + ' geworfen. $X$ zählt, wie oft Kopf fällt. Wie groß ist die Wahrscheinlichkeit für „' + q[0] + '“? (Bruch oder Dezimalzahl)', q[1], { sol: 'Alle ' + (three ? 8 : 4) + ' Ergebnisse sind gleich wahrscheinlich. Günstig: ' + q[1].n * (three ? 8 : 4) / q[1].d + '. $P = ' + fs(q[1]) + '$ (Baumdiagramm, Klasse 8).', hint: 'Zeichne ein Baumdiagramm oder schreibe alle Ergebnisse auf.' });
  });
  G('10-zufallsgr', 3, function () {
    var m = R.int(2, 6), d = R.int(1, 3), v = R.bool();
    if (v) return NUM('Die Zufallsgröße $X$ nimmt die Werte $' + (m - d) + '$ und $' + (m + d) + '$ jeweils mit der Wahrscheinlichkeit ${1/2}$ an. Berechne die Varianz von $X$.', d * d, { sol: 'Erwartungswert: $' + m + '$. Beide Werte weichen um $' + d + '$ ab, quadriert $' + d * d + '$. Varianz: ${1/2} * ' + d * d + ' + {1/2} * ' + d * d + ' = ' + d * d + '$. Standardabweichung: $' + d + '$.', hint: 'Varianz: mittlere quadratische Abweichung vom Erwartungswert (Klasse 9).' });
    return NUM('Die Zufallsgröße $X$ hat die Verteilung:' + tb([m - d, m, m + d], ['0,25', '0,5', '0,25'], 'x_i', 'P(X = x_i)') + 'Berechne die Varianz von $X$.', d * d / 2, { sol: 'Erwartungswert: $' + m + '$. Varianz: $0,25 * ' + d * d + ' + 0,5 * 0 + 0,25 * ' + d * d + ' = ' + de(d * d / 2) + '$', hint: 'Erst den Erwartungswert, dann die quadrierten Abweichungen mit ihren Wahrscheinlichkeiten gewichten.' });
  });
  G('10-zufallsgr', 3, function () {
    var q = R.pick([[F(1, 2), 3, F(7, 8)], [F(1, 2), 2, F(3, 4)], [F(1, 3), 2, F(5, 9)], [F(1, 4), 2, F(7, 16)], [F(1, 2), 4, F(15, 16)], [F(1, 5), 2, F(9, 25)]]);
    return NUM('Bei jedem Versuch trifft man mit der Wahrscheinlichkeit $' + fs(q[0]) + '$. Wie groß ist die Wahrscheinlichkeit für mindestens einen Treffer bei ' + q[1] + ' Versuchen? (Bruch oder Dezimalzahl)', q[2], { sol: 'Gegenereignis „kein Treffer“: $(' + fs(F(q[0].d - q[0].n, q[0].d)) + ')^' + q[1] + ' = ' + fs(F(q[2].d - q[2].n, q[2].d)) + '$. Also $1 - ' + fs(F(q[2].d - q[2].n, q[2].d)) + ' = ' + fs(q[2]) + '$', hint: '„Mindestens einer“ ist das Gegenteil von „keiner“.' });
  });
  G('10-zufallsgr', 2, function () {
    var st = R.pick([['Der Erwartungswert muss einer der Werte sein, die die Zufallsgröße annehmen kann.', false, 'Gegenbeispiel: Beim Würfeln ist der Erwartungswert 3,5.'], ['Die Summe aller Wahrscheinlichkeiten einer Verteilung ist 1.', true, 'Irgendeinen ihrer Werte nimmt die Zufallsgröße sicher an.'], ['Bei einem fairen Spiel ist der Erwartungswert des Gewinns 0.', true, 'Auf lange Sicht gewinnt und verliert man gleich viel.'], ['Ein Spiel mit negativem Erwartungswert des Gewinns verliert man in jeder einzelnen Runde.', false, 'Einzelne Runden kann man gewinnen – nur auf lange Sicht verliert man.'], ['Je größer die Standardabweichung, desto stärker streuen die Ergebnisse um den Erwartungswert.', true, 'Bei Spielen ist sie ein Maß für das Risiko.'], ['Bei sehr vielen Wiederholungen liegt der Mittelwert der Ergebnisse meist nahe am Erwartungswert.', true, 'Das folgt aus dem Gesetz der großen Zahlen (Klasse 8).']]);
    return TF('Wahr oder falsch? ' + st[0], st[1], { sol: st[2] });
  });

  /* ---------- 10-sinsatz ---------- */
  G('10-sinsatz', 1, function () {
    var q = R.pick([['zwei Seiten und der eingeschlossene Winkel', 1], ['drei Seiten', 1], ['eine Seite und zwei Winkel', 0], ['zwei Seiten und der Gegenwinkel einer dieser Seiten', 0]]);
    return MCF('Von einem Dreieck sind gegeben: ' + q[0] + '. Welcher Satz führt direkt zum Ziel?', ['Sinussatz', 'Kosinussatz', 'Satz des Thales'], q[1], { sol: q[1] === 0 ? 'Ist ein Paar aus Seite und Gegenwinkel bekannt, hilft der Sinussatz: ${a/sin α} = {b/sin β}$.' : 'Ohne ein solches Paar hilft der Kosinussatz: $c^2 = a^2 + b^2 - 2ab * cos γ$.', hint: 'Kennst du eine Seite zusammen mit ihrem Gegenwinkel?' });
  });
  G('10-sinsatz', 1, function () {
    var a = R.int(40, 75), b = R.int(35, 70);
    return NUM('In einem Dreieck sind $α = ' + a + '°$ und $β = ' + b + '°$. Wie groß ist $γ$? (Den braucht man oft als ersten Schritt.)', 180 - a - b, { unit: '°', sol: 'Innenwinkelsatz (Klasse 6): $γ = 180° - ' + a + '° - ' + b + '° = ' + (180 - a - b) + '°$', hint: 'Innenwinkelsatz.' });
  });
  G('10-sinsatz', 2, function () {
    var q = R.pick([[5, 8, 60, 7], [3, 8, 60, 7], [7, 15, 60, 13], [8, 15, 60, 13], [3, 5, 120, 7], [7, 8, 120, 13], [5, 16, 120, 19], [6, 8, 90, 10], [5, 12, 90, 13]]), cs = q[2] === 60 ? '{1/2}' : q[2] === 120 ? '(-{1/2})' : '0';
    return NUM('In einem Dreieck sind $a = ' + q[0] + '$ cm, $b = ' + q[1] + '$ cm und der eingeschlossene Winkel $γ = ' + q[2] + '°$. Berechne die Seite $c$.' + (q[2] === 120 ? ' ($cos 120° = -{1/2}$)' : q[2] === 60 ? ' ($cos 60° = {1/2}$)' : ''), q[3], { unit: 'cm', sol: 'Kosinussatz: $c^2 = ' + q[0] + '^2 + ' + q[1] + '^2 - 2 * ' + q[0] + ' * ' + q[1] + ' * ' + cs + ' = ' + q[3] * q[3] + '$, also $c = ' + q[3] + '$ cm.' + (q[2] === 90 ? ' Für 90° wird daraus der Satz des Pythagoras.' : ''), hint: 'Kosinussatz: $c^2 = a^2 + b^2 - 2ab * cos γ$' });
  });
  G('10-sinsatz', 2, function () {
    var a = R.int(3, 12), v = R.int(0, 1);
    if (v === 0) return NUM('In einem Dreieck sind $a = ' + a + '$ cm, $α = 30°$ und $β = 90°$. Berechne die Seite $b$.', 2 * a, { unit: 'cm', sol: 'Sinussatz: ${b/sin 90°} = {' + a + '/sin 30°}$, also $b = ' + a + ' * {1/0,5} = ' + 2 * a + '$ cm.', hint: 'Sinussatz: ${a/sin α} = {b/sin β}$ mit $sin 30° = 0,5$ und $sin 90° = 1$.' });
    var q = R.pick([[40, 0.64, 70, 0.94], [35, 0.57, 80, 0.98], [50, 0.77, 65, 0.91]]), k = R.pick([5, 10, 20]);
    return NUM('In einem Dreieck sind $a = ' + de(k * q[1]) + '$ cm, $α = ' + q[0] + '°$ und $β = ' + q[2] + '°$. Berechne die Seite $b$. (Verwende $sin ' + q[0] + '° ≈ ' + de(q[1]) + '$ und $sin ' + q[2] + '° ≈ ' + de(q[3]) + '$.)', M.round(k * q[3], 2), { unit: 'cm', tol: 0.06, sol: 'Sinussatz: $b = a * {sin β/sin α} ≈ ' + de(k * q[1]) + ' * {' + de(q[3]) + '/' + de(q[1]) + '} = ' + de(k * q[3]) + '$ cm.', hint: 'Stelle ${a/sin α} = {b/sin β}$ nach $b$ um.' });
  });
  G('10-sinsatz', 2, function () {
    var a = R.int(3, 10), b = 2 * R.int(2, 6), q = R.pick([[30, 0.5, '{1/2}'], [90, 1, '1'], [150, 0.5, '{1/2}']]);
    return NUM('Berechne den Flächeninhalt des Dreiecks mit $a = ' + a + '$ cm, $b = ' + b + '$ cm und dem eingeschlossenen Winkel $γ = ' + q[0] + '°$. ($sin ' + q[0] + '° = ' + q[2] + '$)', a * b * q[1] / 2, { unit: '$cm^2$', sol: '$A = {1/2} * a * b * sin γ = {1/2} * ' + a + ' * ' + b + ' * ' + q[2] + ' = ' + de(a * b * q[1] / 2) + '$', hint: '$A = {1/2} * a * b * sin γ$ – die Höhe ist $b * sin γ$.' });
  });
  G('10-sinsatz', 3, function () {
    var q = R.pick([[5, 8, 7, 60], [3, 8, 7, 60], [7, 15, 13, 60], [3, 5, 7, 120], [7, 8, 13, 120], [3, 4, 5, 90], [5, 12, 13, 90]]), cs = (q[0] * q[0] + q[1] * q[1] - q[2] * q[2]) / (2 * q[0] * q[1]);
    return NUM('Ein Dreieck hat die Seiten $a = ' + q[0] + '$ cm, $b = ' + q[1] + '$ cm und $c = ' + q[2] + '$ cm. Wie groß ist der Winkel $γ$ (gegenüber von $c$)?', q[3], { unit: '°', sol: 'Kosinussatz nach $cos γ$ umstellen: $cos γ = {a^2 + b^2 - c^2/2ab} = {' + (q[0] * q[0] + q[1] * q[1] - q[2] * q[2]) + '/' + 2 * q[0] * q[1] + '} = ' + de(cs) + '$, also $γ = ' + q[3] + '°$.', hint: 'Stelle den Kosinussatz nach $cos γ$ um. $cos 60° = 0,5$; $cos 90° = 0$; $cos 120° = -0,5$.' });
  });
  G('10-sinsatz', 3, function () {
    var q = R.pick([[5, 8, 7], [3, 8, 7], [7, 15, 13], [8, 15, 13]]);
    return NUM('Zwei Wanderwege gehen von einer Hütte in der Sächsischen Schweiz geradlinig auseinander und schließen einen Winkel von 60° ein. Der eine führt nach ' + q[0] + ' km zu einem Aussichtsfelsen, der andere nach ' + q[1] + ' km zu einer Quelle. Wie weit sind Felsen und Quelle voneinander entfernt (Luftlinie)?', q[2], { unit: 'km', sol: 'Kosinussatz mit $cos 60° = {1/2}$: $c^2 = ' + q[0] * q[0] + ' + ' + q[1] * q[1] + ' - ' + q[0] * q[1] + ' = ' + q[2] * q[2] + '$, also $c = ' + q[2] + '$ km.', hint: 'Skizze! Gegeben sind zwei Seiten und der eingeschlossene Winkel.' });
  });
  G('10-sinsatz', 2, function () {
    var st = R.pick([['Der Kosinussatz gilt nur in rechtwinkligen Dreiecken.', false, 'Er gilt in jedem Dreieck. Für $γ = 90°$ wird er zum Satz des Pythagoras.'], ['Der Satz des Pythagoras ist ein Sonderfall des Kosinussatzes.', true, '$cos 90° = 0$ – der letzte Summand fällt weg.'], ['Im Sinussatz stehen jeweils eine Seite und ihr Gegenwinkel im selben Bruch.', true, '${a/sin α} = {b/sin β} = {c/sin γ}$'], ['In jedem Dreieck liegt der größeren Seite der größere Winkel gegenüber.', true, 'Seiten-Winkel-Beziehung aus Klasse 6 – der Sinussatz macht sie berechenbar.'], ['Mit drei gegebenen Winkeln lässt sich die Seitenlänge eines Dreiecks berechnen.', false, 'Drei Winkel legen nur die Form fest (Ähnlichkeit, Klasse 8), nicht die Größe.'], ['$A = {1/2} * a * b * sin γ$ gilt für jedes Dreieck.', true, 'Die Höhe auf $a$ ist $b * sin γ$.']]);
    return TF('Wahr oder falsch? ' + st[0], st[1], { sol: st[2] });
  });

  /* ---------- 10-log ---------- */
  G('10-log', 1, function () {
    var q = R.pick([[2, 8, 3], [3, 81, 4], [10, 1000, 3], [5, 25, 2], [2, 32, 5], [2, '{1/4}', -2], [10, '0,01', -2], [7, 1, 0], [6, 6, 1], [3, '{1/3}', -1], [4, 64, 3], [2, 1024, 10]]);
    return NUM('Berechne: $log_' + q[0] + ' ' + q[1] + '$', q[2], { sol: 'Gesucht ist der Exponent: $' + q[0] + '^{' + q[2] + '} = ' + q[1] + '$', hint: '„' + q[0] + ' hoch wie viel ergibt ' + String(q[1]).replace(/[{}]/g, '') + '?“' });
  });
  G('10-log', 1, function () {
    var b = R.pick([2, 3, 5]), e = R.int(2, 5), v = Math.pow(b, e);
    return MC('Was bedeutet $log_' + b + ' ' + v + ' = ' + e + '$?', '$' + b + '^' + e + ' = ' + v + '$', ['$' + e + '^' + b + ' = ' + v + '$', '$' + b + ' * ' + e + ' = ' + v + '$', '$' + v + '^' + e + ' = ' + b + '$'], { sol: 'Der Logarithmus ist der Exponent, mit dem man die Basis potenzieren muss: $' + b + '^' + e + ' = ' + v + '$', hint: 'Die Basis des Logarithmus ist die Basis der Potenz.' });
  });
  G('10-log', 1, function () {
    var e = R.int(-3, 6), val = e >= 0 ? de(Math.pow(10, e)) : de(Math.pow(10, e));
    return NUM('Berechne den dekadischen Logarithmus: $lg ' + val + '$', e, { sol: '$' + val + ' = 10^{' + e + '}$, also $lg ' + val + ' = ' + e + '$', hint: '$lg$ ist der Logarithmus zur Basis 10: Zähle die Nullen bzw. Nachkommastellen.' });
  });
  G('10-log', 2, function () {
    var q = R.pick([['lg 2 + lg 5', 1, 'lg (2 * 5) = lg 10'], ['log_2 48 - log_2 3', 4, 'log_2 {48/3} = log_2 16'], ['lg 4 + lg 25', 2, 'lg (4 * 25) = lg 100'], ['log_3 54 - log_3 2', 3, 'log_3 {54/2} = log_3 27'], ['log_6 4 + log_6 9', 2, 'log_6 (4 * 9) = log_6 36'], ['lg 200 - lg 2', 2, 'lg {200/2} = lg 100'], ['log_2 6 + log_2 {4/3}', 3, 'log_2 (6 * {4/3}) = log_2 8']]);
    return NUM('Berechne mit den Logarithmengesetzen: $' + q[0] + '$', q[1], { sol: '$' + q[0] + ' = ' + q[2] + ' = ' + q[1] + '$', hint: 'Summe von Logarithmen: Produkt. Differenz von Logarithmen: Quotient.' });
  });
  G('10-log', 2, function () {
    var q = R.pick([[2, 8, 3, 3], [10, 10, 7, 1], [3, 9, 4, 2], [2, 4, 5, 2], [5, 25, 3, 2], [10, 100, 4, 2]]);
    return NUM('Berechne: $log_' + q[0] + ' (' + q[1] + '^' + q[2] + ')$', q[2] * q[3], { sol: '$log (u^r) = r * log u$: $' + q[2] + ' * log_' + q[0] + ' ' + q[1] + ' = ' + q[2] + ' * ' + q[3] + ' = ' + q[2] * q[3] + '$', hint: 'Der Exponent darf als Faktor vor den Logarithmus gezogen werden.' });
  });
  G('10-log', 2, function () {
    var q = R.pick([['2^x = 32', 5, '32 = 2^5'], ['3^{x+1} = 27', 2, '27 = 3^3, also x + 1 = 3'], ['5^{2x} = 25', 1, '25 = 5^2, also 2x = 2'], ['10^x = 0,001', -3, '0,001 = 10^{-3}'], ['4^x = 8', F(3, 2), '(2^2)^x = 2^3, also 2x = 3'], ['2^{x-3} = 16', 7, '16 = 2^4, also x - 3 = 4'], ['9^x = 3', F(1, 2), '(3^2)^x = 3^1, also 2x = 1']]);
    return NUM('Löse die Exponentialgleichung: $' + q[0] + '$ (ganze Zahl oder Bruch)', q[1], { pre: '$x =$', reduced: true, sol: 'Beide Seiten als Potenzen derselben Basis schreiben: $' + q[2] + '$. Exponentenvergleich: $x = ' + (typeof q[1] === 'number' ? q[1] : fs(q[1])) + '$', hint: 'Schreibe beide Seiten als Potenz derselben Basis (Potenzgesetze, Klasse 9).' });
  });
  G('10-log', 2, function () {
    var q = R.pick([['lg (a * b)', 'lg a + lg b', ['lg a * lg b', 'lg a - lg b', 'a * lg b']], ['lg {a/b}', 'lg a - lg b', ['{lg a/lg b}', 'lg a + lg b', 'lg (a - b)']], ['lg (a^3)', '3 * lg a', ['(lg a)^3', 'lg a + 3', 'lg (3a)']], ['lg sqrt(a)', '{1/2} * lg a', ['sqrt(lg a)', 'lg a - 2', '2 * lg a']]]);
    return MC('Welcher Term ist gleich $' + q[0] + '$ (für positive $a$, $b$)?', '$' + q[1] + '$', q[2].map(function (x) { return '$' + x + '$'; }), { sol: 'Logarithmengesetz: $' + q[0] + ' = ' + q[1] + '$ – die Potenzgesetze, rückwärts gelesen.', hint: 'Aus Mal wird Plus, aus Geteilt wird Minus, aus Hoch wird Mal.' });
  });
  G('10-log', 3, function () {
    var q = R.pick([[2, 10, 0.301, 1, 3.32], [3, 20, 0.477, 1.301, 2.73], [2, 5, 0.301, 0.699, 2.32], [5, 100, 0.699, 2, 2.86], [1.5, 10, 0.176, 1, 5.68]]);
    return NUM('Löse die Exponentialgleichung $' + M.num(q[0]) + '^x = ' + q[1] + '$. Runde auf zwei Nachkommastellen. (Verwende $lg ' + M.num(q[0]) + ' ≈ ' + de(q[2]) + '$ und $lg ' + q[1] + ' ' + (q[3] % 1 ? '≈' : '=') + ' ' + de(q[3]) + '$.)', q[4], { pre: '$x ≈$', tol: 0.02, sol: 'Auf beiden Seiten logarithmieren: $x * lg ' + M.num(q[0]) + ' = lg ' + q[1] + '$, also $x = {' + de(q[3]) + '/' + de(q[2]) + '} ≈ ' + de(q[4]) + '$', hint: '$a^x = b$ hat die Lösung $x = {lg b/lg a}$.' });
  });
  G('10-log', 3, function () {
    var q = R.pick([[5, 0.0212, 14.2], [10, 0.0414, 7.3], [3, 0.0128, 23.5], [7, 0.0294, 10.2]]);
    return NUM('Ein Kapital wächst jedes Jahr um ' + q[0] + ' %. Nach wie vielen Jahren hat es sich verdoppelt? Runde auf eine Nachkommastelle. (Verwende $lg 2 ≈ 0,301$ und $lg ' + de(1 + q[0] / 100) + ' ≈ ' + de(q[1]) + '$.)', q[2], { unit: 'Jahre', tol: 0.25, sol: '$' + de(1 + q[0] / 100) + '^n = 2$, also $n = {lg 2/lg ' + de(1 + q[0] / 100) + '} ≈ {0,301/' + de(q[1]) + '} ≈ ' + de(q[2]) + '$ Jahre.', hint: 'Gesucht ist $n$ in $q^n = 2$. Logarithmiere beide Seiten.' });
  });
  G('10-log', 2, function () {
    var st = R.pick([['$lg (a + b) = lg a + lg b$', false, 'Für Summen gibt es kein Logarithmengesetz. Richtig ist $lg (a * b) = lg a + lg b$.'], ['$ln e = 1$', true, '$e^1 = e$'], ['$lg 1 = 0$', true, '$10^0 = 1$'], ['$log_2 (-4) = -2$', false, 'Logarithmen sind nur für positive Zahlen erklärt: $2^x$ wird nie negativ.'], ['$ln (e^x) = x$', true, 'Logarithmieren macht das Potenzieren rückgängig.'], ['$log_a a = 1$ für jede zulässige Basis $a$', true, '$a^1 = a$'], ['$lg 0 = 0$', false, '$10^x$ wird nie 0 – $lg 0$ ist nicht definiert. Aber $lg 1 = 0$.']]);
    return TF('Wahr oder falsch? ' + st[0], st[1], { sol: st[2] });
  });

  /* ---------- 10-umkehr ---------- */
  G('10-umkehr', 1, function () {
    var a = R.int(2, 5), b = R.nz(-6, 6);
    return MC('Welche Funktion ist die Umkehrfunktion von $f(x) = ' + lin(a, 'x', b) + '$?', '$f^{-1}(x) = {' + lin(1, 'x', -b) + '/' + a + '}$', ['$f^{-1}(x) = {' + lin(1, 'x', b) + '/' + a + '}$', '$f^{-1}(x) = ' + lin(a, 'x', -b) + '$', '$f^{-1}(x) = {1/' + lin(a, 'x', b) + '}$', '$f^{-1}(x) = ' + lin(-a, 'x', -b) + '$'], { sol: '$y = ' + lin(a, 'x', b) + '$ nach $x$ auflösen: $x = {' + lin(1, 'y', -b) + '/' + a + '}$. Dann $x$ und $y$ tauschen.', hint: 'Löse $y = f(x)$ nach $x$ auf – jeder Schritt wird in umgekehrter Reihenfolge rückgängig gemacht.' });
  });
  G('10-umkehr', 1, function () {
    var a = R.int(2, 5), b = R.nz(-6, 6), x = R.nz(-4, 5), y = a * x + b;
    return NUM('Gegeben ist $f(x) = ' + lin(a, 'x', b) + '$. Berechne $f^{-1}(' + y + ')$.', x, { sol: 'Gesucht ist das $x$ mit $f(x) = ' + y + '$: $' + lin(a, 'x', b) + ' = ' + y + '$, also $x = ' + x + '$.', hint: '$f^{-1}(' + y + ')$ fragt: Für welches $x$ ist $f(x) = ' + y + '$?' });
  });
  G('10-umkehr', 2, function () {
    var q = R.pick([['e^x', '', 'ln x', ''], ['x^2', ' (für $x >= 0$)', 'sqrt(x)', ''], ['x^3', '', 'cbrt(x)', ''], ['2^x', '', 'log_2 x', ''], ['10^x', '', 'lg x', ''], ['ln x', '', 'e^x', ''], ['sqrt(x)', '', 'x^2', ' (für $x >= 0$)']]);
    var all = ['ln x', 'sqrt(x)', 'cbrt(x)', 'log_2 x', 'lg x', 'e^x', '{1/x}', 'x^2'];
    return MC('Welche Funktion ist die Umkehrfunktion von $f(x) = ' + q[0] + '$' + q[1] + '?', '$y = ' + q[2] + '$' + q[3], all.filter(function (o) { return o !== q[2] && o !== q[0]; }).map(function (o) { return '$y = ' + o + '$'; }), { sol: 'Die Umkehrfunktion macht rückgängig, was $f$ tut. Beide Graphen liegen spiegelbildlich zur Geraden $y = x$.', hint: 'Welche Rechenoperation macht die gegebene rückgängig?' });
  });
  G('10-umkehr', 2, function () {
    var q = R.pick([['$f(x) = x^2$ auf ganz ℝ', false, '$f(2) = f(-2) = 4$ – zu $y = 4$ gehören zwei $x$-Werte.'], ['$f(x) = x^3$', true, 'Die Funktion ist überall streng steigend – zu jedem $y$ gehört genau ein $x$.'], ['$f(x) = sin x$ auf ganz ℝ', false, 'Der Wert 0 wird unendlich oft angenommen.'], ['$f(x) = 2x + 1$', true, 'Eine nicht waagerechte Gerade ist eineindeutig.'], ['$f(x) = e^x$', true, 'Die Funktion ist streng steigend. Ihre Umkehrfunktion ist $ln x$.'], ['$f(x) = x^2$ für $x >= 0$', true, 'Auf dem rechten Ast ist die Parabel streng steigend. Umkehrfunktion: $sqrt(x)$.'], ['$f(x) = 5$ (konstant)', false, 'Alle $x$ haben denselben Funktionswert.']]);
    return TF('Ist die Funktion ' + q[0] + ' umkehrbar?', q[1], { sol: q[2] + ' Umkehrbar sind genau die eineindeutigen Funktionen (Klasse 6).', hint: 'Gibt es zwei verschiedene $x$ mit demselben Funktionswert?' });
  });
  G('10-umkehr', 2, function () {
    var a = R.int(1, 5), x = R.int(1, 4), v = R.bool();
    return NUM('Gegeben sind $f(x) = x + ' + a + '$ und $g(x) = x^2$. Berechne $' + (v ? 'f(g(' + x + '))' : 'g(f(' + x + '))') + '$.', v ? x * x + a : (x + a) * (x + a), { sol: v ? 'Erst die innere Funktion: $g(' + x + ') = ' + x * x + '$. Dann $f(' + x * x + ') = ' + (x * x + a) + '$.' : 'Erst die innere Funktion: $f(' + x + ') = ' + (x + a) + '$. Dann $g(' + (x + a) + ') = ' + (x + a) * (x + a) + '$.', hint: 'Von innen nach außen rechnen. Die Reihenfolge ist wichtig!' });
  });
  G('10-umkehr', 2, function () {
    var a = R.int(2, 4), b = R.int(1, 6), v = R.bool();
    return MC('Gegeben sind $f(x) = ' + a + 'x$ und $g(x) = x + ' + b + '$. Welcher Term ist $' + (v ? 'f(g(x))' : 'g(f(x))') + '$?', '$' + (v ? lin(a, 'x', a * b) : lin(a, 'x', b)) + '$', ['$' + (v ? lin(a, 'x', b) : lin(a, 'x', a * b)) + '$', '$' + lin(a + 1, 'x', b) + '$', '$' + a + 'x^2 + ' + a * b + 'x$'], { sol: v ? '$f(g(x)) = ' + a + ' * (x + ' + b + ') = ' + lin(a, 'x', a * b) + '$' : '$g(f(x)) = ' + a + 'x + ' + b + '$', hint: 'Setze die innere Funktion für $x$ in die äußere ein.' });
  });
  G('10-umkehr', 2, function () {
    var k = R.int(2, 9), q = R.pick([['ln (e^' + k + ')', k], ['e^{ln ' + k + '}', k], ['ln 1', 0], ['ln e', 1], ['lg (10^' + k + ')', k], ['10^{lg ' + k + '}', k]]);
    return NUM('Berechne: $' + q[0] + '$', q[1], { sol: 'Funktion und Umkehrfunktion heben sich auf: $' + q[0] + ' = ' + q[1] + '$', hint: '$e^x$ und $ln x$ machen einander rückgängig – ebenso $10^x$ und $lg x$.' });
  });
  G('10-umkehr', 2, function () {
    var q = R.pick([[0.6, 0.8, 0.75], [0.8, 0.6, 1.3333], [0.5, 0.866, 0.577], [0.28, 0.96, 0.2917]]);
    return NUM('Für einen Winkel gilt $sin α = ' + de(q[0]) + '$ und $cos α = ' + de(q[1]) + '$. Berechne $tan α$. Runde auf zwei Nachkommastellen.', M.round(q[2], 2), { tol: 0.011, sol: '$tan α = {sin α/cos α} = {' + de(q[0]) + '/' + de(q[1]) + '} ≈ ' + de(q[2], 2) + '$', hint: 'Der Tangens ist der Quotient aus Sinus und Kosinus.' });
  });
  G('10-umkehr', 3, function () {
    var x = R.nz(-5, 6), y = R.intNot(-5, 8, [x]);
    return GAP('Der Punkt $P(' + x + '|' + y + ')$ liegt auf dem Graphen einer umkehrbaren Funktion $f$. Welcher Punkt liegt dann sicher auf dem Graphen von $f^{-1}$?', [{ pre: '$x =$', ans: y }, { pre: '$y =$', ans: x }], { sol: 'Beim Umkehren tauschen $x$ und $y$ die Rollen: $P\'(' + y + '|' + x + ')$. Das ist die Spiegelung an der Geraden $y = x$.', hint: 'Aus $f(' + x + ') = ' + y + '$ folgt $f^{-1}(' + y + ') = ' + x + '$.' });
  });
  G('10-umkehr', 3, function () {
    var q = R.pick([['(3x - 1)^2', '3x - 1', ['x^2', '3x', '(3x)^2']], ['sqrt(x^2 + 4)', 'x^2 + 4', ['sqrt(x)', 'x^2', '4']], ['e^{2x}', '2x', ['e^x', 'x^2', 'e^2']], ['sin(x + 1)', 'x + 1', ['sin x', 'sin 1', 'x']], ['ln (5x)', '5x', ['ln x', 'ln 5', 'x^5']]]);
    return MC('Die Funktion $h(x) = ' + q[0] + '$ ist eine Verkettung. Welche ist die innere Funktion?', '$' + q[1] + '$', q[2].map(function (x) { return '$' + x + '$'; }), { sol: 'Die innere Funktion wird zuerst ausgeführt: $' + q[1] + '$. Auf ihr Ergebnis wird dann die äußere Funktion angewendet.', hint: 'Was würdest du beim Einsetzen einer Zahl zuerst ausrechnen?' });
  });

  /* ---------- 10-galerie ---------- */
  var GF = [['x', function (x) { return x; }, 0, 0, 1, 'alle reellen Zahlen'], ['x^2', function (x) { return x * x; }, 0, 1, 0, '$y >= 0$'], ['sqrt(x)', function (x) { return x < 0 ? NaN : Math.sqrt(x); }, 2, 1, 2, '$y >= 0$'], ['{1/x}', function (x) { return 1 / x; }, 1, 3, 1, 'alle reellen Zahlen außer 0'], ['ln x', function (x) { return x <= 0 ? NaN : Math.log(x); }, 3, 0, 2, 'alle reellen Zahlen'], ['e^x', function (x) { return Math.exp(x); }, 0, 2, 2, '$y > 0$'], ['sin x', function (x) { return Math.sin(x); }, 0, 4, 1, '$-1 <= y <= 1$']];
  G('10-galerie', 1, function () {
    var i = R.int(0, 6), o = R.sample([0, 1, 2, 3, 4, 5, 6].filter(function (k) { return k !== i; }), 3);
    return MC('Welche der sieben Grundfunktionen zeigt der Graph?', '$y = ' + GF[i][0] + '$', o.map(function (k) { return '$y = ' + GF[k][0] + '$'; }), { fig: Fig.graph({ x: [-5, 5], y: [-4, 4], w: 230, fns: [{ f: GF[i][1] }] }), sol: ['Gerade durch den Ursprung mit Anstieg 1.', 'Normalparabel mit Scheitel im Ursprung.', 'Halbe liegende Parabel, nur für $x >= 0$.', 'Hyperbel mit Polstelle bei 0.', 'Nur für $x > 0$ definiert, Nullstelle bei 1, wächst sehr langsam.', 'Geht durch $(0|1)$, wächst immer schneller, links schmiegt sie sich an die $x$-Achse.', 'Welle zwischen $-1$ und $1$ mit der Periode $2π$.'][i], hint: 'Achte auf Definitionsbereich, Nullstellen und Verhalten am Rand.' });
  });
  G('10-galerie', 1, function () {
    var i = R.int(0, 6);
    return MCF('Welchen Definitionsbereich hat $y = ' + GF[i][0] + '$?', ['alle reellen Zahlen', 'alle reellen Zahlen außer 0', '$x >= 0$', '$x > 0$'], GF[i][2], { sol: ['Für jede reelle Zahl lässt sich ein Wert berechnen.', 'Durch 0 kann man nicht teilen.', 'Aus negativen Zahlen gibt es keine reelle Quadratwurzel.', 'Der Logarithmus ist nur für positive Zahlen erklärt: $e^x$ wird nie 0 oder negativ.'][GF[i][2]], hint: 'Welche Zahlen darf man nicht einsetzen?' });
  });
  G('10-galerie', 2, function () {
    var q = R.pick([['hat keine Nullstelle und ist für alle reellen Zahlen definiert', 5], ['ist periodisch', 6], ['hat eine Polstelle', 3], ['ist nur für $x > 0$ definiert', 4], ['ist achsensymmetrisch zur $y$-Achse', 1], ['hat die Nullstelle $x = 1$', 4], ['hat an der Stelle 0 den Funktionswert 1', 5], ['ist nur für $x >= 0$ definiert und hat dort keine negativen Werte', 2]]);
    return MC('Welche der Grundfunktionen ' + q[0] + '?', '$y = ' + GF[q[1]][0] + '$', GF.filter(function (_, k) { return k !== q[1]; }).map(function (f) { return '$y = ' + f[0] + '$'; }), { sol: 'Das trifft nur auf $y = ' + GF[q[1]][0] + '$ zu.', hint: 'Stell dir die Graphen der sieben Grundfunktionen vor.' });
  });
  G('10-galerie', 2, function () {
    var i = R.int(0, 6);
    return MC('Welchen Wertebereich hat $y = ' + GF[i][0] + '$?', GF[i][5], ['alle reellen Zahlen', '$y >= 0$', '$y > 0$', 'alle reellen Zahlen außer 0', '$-1 <= y <= 1$'], { sol: 'Am Graphen ablesen, welche Höhen erreicht werden: ' + GF[i][5] + '.', hint: 'Welche $y$-Werte kommen als Funktionswerte vor?' });
  });
  G('10-galerie', 2, function () {
    var i = R.int(0, 6);
    return MCF('Welche Symmetrie hat der Graph von $y = ' + GF[i][0] + '$?', ['achsensymmetrisch zur $y$-Achse', 'punktsymmetrisch zum Ursprung', 'keine dieser Symmetrien'], GF[i][4], { sol: ['$f(-x) = f(x)$: achsensymmetrisch zur $y$-Achse.', '$f(-x) = -f(x)$: punktsymmetrisch zum Ursprung.', 'Der Graph ist weder zur $y$-Achse noch zum Ursprung symmetrisch.'][GF[i][4]], hint: 'Vergleiche $f(-x)$ mit $f(x)$.' });
  });
  G('10-galerie', 2, function () {
    var q = R.pick([['y = x^2', 1, 1], ['y = sqrt(x)', 4, 2], ['y = {1/x}', 2, 0.5], ['y = ln x', 1, 0], ['y = e^x', 0, 1], ['y = sin x', 0, 0], ['y = x^2', -3, 9], ['y = {1/x}', -4, -0.25], ['y = sqrt(x)', 9, 3]]);
    return NUM('Welchen Funktionswert hat $' + q[0] + '$ an der Stelle $x = ' + q[1] + '$?', q[2], { sol: 'Einsetzen: $y = ' + de(q[2]) + '$. Solche Stützpunkte helfen beim Skizzieren der Graphen ohne Hilfsmittel.', hint: 'Merke dir: $ln 1 = 0$, $e^0 = 1$, $sin 0 = 0$.' });
  });
  G('10-galerie', 3, function () {
    var fast = R.bool();
    return MC('Welche Funktion wächst für sehr große $x$ am ' + (fast ? 'schnellsten' : 'langsamsten') + '?', fast ? '$y = e^x$' : '$y = ln x$', fast ? ['$y = x^2$', '$y = x$', '$y = sqrt(x)$'] : ['$y = sqrt(x)$', '$y = x$', '$y = x^2$'], { sol: 'Rangfolge für große $x$: $ln x$ wächst langsamer als $sqrt(x)$, das langsamer als $x$, das langsamer als $x^2$ – und $e^x$ überholt sie alle.', hint: 'Vergleiche die Werte für $x = 100$.' });
  });
  G('10-galerie', 3, function () {
    var st = R.pick([['Der Graph von $y = ln x$ schneidet die $y$-Achse.', false, '$ln x$ ist für $x = 0$ nicht definiert; die $y$-Achse ist Asymptote.'], ['Die Graphen von $y = e^x$ und $y = ln x$ liegen spiegelbildlich zur Geraden $y = x$.', true, 'Sie sind Umkehrfunktionen voneinander.'], ['$y = sqrt(x)$ und $y = x^2$ schneiden sich in $(0|0)$ und $(1|1)$.', true, '$sqrt(0) = 0^2 = 0$ und $sqrt(1) = 1^2 = 1$.'], ['$y = {1/x}$ ist für $x > 0$ monoton steigend.', false, 'Je größer $x$, desto kleiner der Bruch: Die Funktion fällt.'], ['$y = e^x$ nimmt jeden positiven Wert genau einmal an.', true, 'Die Funktion ist streng steigend mit dem Wertebereich $y > 0$.'], ['$y = sin x$ hat unendlich viele Nullstellen.', true, 'Alle Vielfachen von $π$.'], ['$y = x^2$ ist umkehrbar auf ganz ℝ.', false, 'Zu jedem $y > 0$ gehören zwei $x$-Werte.']]);
    return TF('Wahr oder falsch? ' + st[0], st[1], { sol: st[2] });
  });

  /* ---------- 10-folgen ---------- */
  G('10-folgen', 1, function () {
    var a = R.int(1, 12), d = R.nz(-5, 7), geo = R.bool(), q = R.pick([2, 3, -2]), s = [0, 1, 2, 3].map(function (n) { return geo ? a * Math.pow(q, n) : a + d * n; });
    return NUM('Wie lautet das nächste Glied der Folge? $' + s.join('; ') + '; ...$', geo ? a * Math.pow(q, 4) : a + 4 * d, { sol: geo ? 'Jedes Glied ist das $' + par(q) + '$-Fache des vorigen (geometrische Folge): $' + s[3] + ' * ' + par(q) + ' = ' + a * Math.pow(q, 4) + '$' : 'Von Glied zu Glied kommt $' + d + '$ dazu (arithmetische Folge): $' + s[3] + ' + ' + par(d) + ' = ' + (a + 4 * d) + '$', hint: 'Bilde Differenzen und Quotienten benachbarter Glieder.' });
  });
  G('10-folgen', 1, function () {
    var a = R.int(2, 5), b = R.nz(-6, 6), n = R.pick([5, 10, 20, 100]);
    return NUM('Eine Folge hat die explizite Vorschrift $a_n = ' + lin(a, 'n', b) + '$. Berechne $a_{' + n + '}$.', a * n + b, { sol: '$a_{' + n + '} = ' + a + ' * ' + n + ' ' + (b < 0 ? '- ' + (-b) : '+ ' + b) + ' = ' + (a * n + b) + '$', hint: 'Setze für $n$ die Platznummer ein.' });
  });
  G('10-folgen', 2, function () {
    var a1 = R.int(1, 10), d = R.nz(-4, 6), n = R.pick([10, 15, 21, 51]);
    return NUM('Eine arithmetische Folge beginnt mit $a_1 = ' + a1 + '$ und hat die Differenz $d = ' + d + '$. Berechne $a_{' + n + '}$.', a1 + (n - 1) * d, { sol: '$a_n = a_1 + (n - 1) * d$: $' + a1 + ' + ' + (n - 1) + ' * ' + par(d) + ' = ' + (a1 + (n - 1) * d) + '$', hint: 'Vom 1. bis zum ' + n + '. Glied macht man ' + (n - 1) + ' Schritte.' });
  });
  G('10-folgen', 2, function () {
    var a1 = R.pick([1, 2, 3, 5]), q = R.pick([2, 3, 10]), n = R.int(4, 6);
    if (a1 * Math.pow(q, n - 1) > 100000) n = 4;
    return NUM('Eine geometrische Folge beginnt mit $a_1 = ' + a1 + '$ und hat den Quotienten $q = ' + q + '$. Berechne $a_' + n + '$.', a1 * Math.pow(q, n - 1), { sol: '$a_n = a_1 * q^{n-1}$: $' + a1 + ' * ' + q + '^' + (n - 1) + ' = ' + de(a1 * Math.pow(q, n - 1)) + '$', hint: 'Vom 1. bis zum ' + n + '. Glied wird ' + (n - 1) + '-mal mit $q$ multipliziert.' });
  });
  G('10-folgen', 2, function () {
    var a1 = R.int(1, 4), k = R.pick([2, 3]), c = R.nz(-2, 3), s = [a1];
    for (var i = 0; i < 3; i++) s.push(k * s[i] + c);
    return NUM('Eine Folge ist rekursiv festgelegt: $a_1 = ' + a1 + '$ und $a_{n+1} = ' + k + ' * a_n ' + (c < 0 ? '- ' + (-c) : '+ ' + c) + '$. Berechne $a_4$.', s[3], { sol: 'Schritt für Schritt: $a_2 = ' + s[1] + '$, $a_3 = ' + s[2] + '$, $a_4 = ' + s[3] + '$', hint: 'Berechne der Reihe nach $a_2$, $a_3$, $a_4$.' });
  });
  G('10-folgen', 2, function () {
    var v = R.int(0, 2), a = R.int(2, 9), s;
    if (v === 0) { var d = R.nz(-4, 5); s = [a, a + d, a + 2 * d, a + 3 * d]; }
    else if (v === 1) { var q = R.pick([2, 3]); s = [a, a * q, a * q * q, a * q * q * q]; }
    else s = [1, 4, 9, 16].map(function (x) { return x + a; });
    return MCF('Welche Art von Folge ist das? $' + s.join('; ') + '; ...$', ['arithmetisch (konstante Differenz)', 'geometrisch (konstanter Quotient)', 'keines von beiden'], v, { sol: v === 0 ? 'Die Differenz ist immer ' + (s[1] - s[0]) + '.' : v === 1 ? 'Der Quotient ist immer ' + s[1] / s[0] + '.' : 'Die Differenzen ' + (s[1] - s[0]) + ', ' + (s[2] - s[1]) + ', ' + (s[3] - s[2]) + ' sind verschieden, die Quotienten auch.', hint: 'Prüfe Differenzen und Quotienten.' });
  });
  G('10-folgen', 2, function () {
    var q = R.pick([['{2n + 1/n}', 2, 'Umformen: $a_n = 2 + {1/n}$.'], ['{3n - 1/n + 2}', 3, 'Zähler und Nenner durch $n$ teilen: ${3 - {1/n}/1 + {2/n}}$.'], ['{5/n}', 0, 'Der Nenner wächst über alle Grenzen, der Zähler bleibt 5.'], ['({1/2})^n', 0, 'Jedes Glied ist halb so groß wie das vorige.'], ['4 - {1/n}', 4, 'Von 4 wird immer weniger abgezogen.'], ['{n/2n + 1}', 0.5, 'Zähler und Nenner durch $n$ teilen: ${1/2 + {1/n}}$.'], ['{6n^2/2n^2 + 1}', 3, 'Zähler und Nenner durch $n^2$ teilen: ${6/2 + {1/n^2}}$.']]);
    return NUM('Welchen Grenzwert hat die Folge $a_n = ' + q[0] + '$ für immer größere $n$?', q[1], { sol: q[2] + ' Da ${1/n}$ gegen 0 geht, ist der Grenzwert $' + de(q[1]) + '$.', hint: 'Was passiert mit ${1/n}$, wenn $n$ riesig wird?' });
  });
  G('10-folgen', 2, function () {
    var d = R.int(2, 5), b = R.nz(-3, 5), s = [1, 2, 3, 4].map(function (n) { return d * n + b; });
    return MC('Welche explizite Vorschrift gehört zur Folge $' + s.join('; ') + '; ...$ (beginnend mit $n = 1$)?', '$a_n = ' + lin(d, 'n', b) + '$', ['$a_n = ' + lin(d, 'n', s[0]) + '$', '$a_n = ' + lin(s[0], 'n', d) + '$', '$a_n = ' + lin(d + 1, 'n', b - 1) + '$', '$a_n = n + ' + d + '$'], { sol: 'Die Differenz ist ' + d + ', also $a_n = ' + d + 'n + ...$. Probe mit $n = 1$: $' + d + ' ' + (b < 0 ? '- ' + (-b) : '+ ' + b) + ' = ' + s[0] + '$ ✓', hint: 'Eine arithmetische Folge ist eine lineare Funktion (Klasse 8): Die Differenz ist der Anstieg.' });
  });
  G('10-folgen', 3, function () {
    var n = R.pick([10, 20, 50, 100, 200]);
    return NUM('Berechne geschickt die Summe $1 + 2 + 3 + ... + ' + n + '$.', n * (n + 1) / 2, { sol: 'Wie der junge Gauß: Paare bilden. $1 + ' + n + ' = ' + (n + 1) + '$, $2 + ' + (n - 1) + ' = ' + (n + 1) + '$ … Das sind ' + n / 2 + ' Paare: $' + n / 2 + ' * ' + (n + 1) + ' = ' + de(n * (n + 1) / 2) + '$', hint: 'Addiere die erste und die letzte Zahl, die zweite und die vorletzte … Wie viele solche Paare gibt es?' });
  });
  G('10-folgen', 3, function () {
    var q = R.pick([['{n/n + 1}', '1', ['0', '2', 'Es gibt keine obere Schranke.'], 'Der Zähler ist immer kleiner als der Nenner: alle Glieder sind kleiner als 1 und kommen der 1 beliebig nahe.'], ['{1/n}', '1', ['0', '{1/2}', 'Es gibt keine obere Schranke.'], 'Das größte Glied ist $a_1 = 1$; danach werden die Glieder kleiner.'], ['2 - {1/n}', '2', ['1', '3', 'Es gibt keine obere Schranke.'], 'Von 2 wird immer etwas Positives abgezogen – die Glieder bleiben unter 2 und nähern sich der 2.'], ['n^2', 'Es gibt keine obere Schranke.', ['100', '1', '0'], 'Die Glieder wachsen über jede Grenze hinaus.']]);
    return MC('Welches ist die kleinste obere Schranke der Folge $a_n = ' + q[0] + '$ ($n = 1, 2, 3, ...$)?', q[1] === 'Es gibt keine obere Schranke.' ? q[1] : '$' + q[1] + '$', q[2].map(function (x) { return x.indexOf('Es gibt') === 0 ? x : '$' + x + '$'; }), { sol: q[3], hint: 'Berechne die ersten Glieder und beobachte, wohin sie streben.' });
  });
  G('10-folgen', 3, function () {
    var s = [1, 1, 2, 3, 5, 8, 13, 21, 34, 55], i = R.int(5, 8);
    return NUM('Die Fibonacci-Folge beginnt mit $1; 1; 2; 3; 5; 8; ...$ – jedes Glied ist die Summe der beiden vorigen. Wie lautet das ' + (i + 1) + '. Glied?', s[i], { sol: 'Fortsetzen: ' + s.slice(0, i + 1).join('; ') + '. Rekursiv: $a_{n+2} = a_{n+1} + a_n$.', hint: 'Addiere jeweils die beiden letzten Glieder.' });
  });
  G('10-folgen', 2, function () {
    var st = R.pick([['Eine arithmetische Folge mit $d > 0$ wächst über alle Grenzen.', true, 'Sie ist eine lineare Funktion mit positivem Anstieg auf ℕ.'], ['Eine geometrische Folge mit $0 < q < 1$ hat den Grenzwert 0.', true, 'Jedes Glied ist nur noch der $q$-te Teil des vorigen.'], ['Hat eine Folge einen Grenzwert, dann wird dieser Wert irgendwann erreicht.', false, 'Die Folge ${1/n}$ kommt der 0 beliebig nahe, erreicht sie aber nie.'], ['Jede Folge ist eine Funktion mit dem Definitionsbereich ℕ (ohne 0).', true, 'Jeder Platznummer wird genau ein Folgenglied zugeordnet.'], ['Die Folge $1; -1; 1; -1; ...$ hat den Grenzwert 0.', false, 'Sie springt hin und her und nähert sich keinem Wert an.'], ['Zinseszins lässt ein Kapital wie eine geometrische Folge wachsen.', true, 'Jedes Jahr wird mit demselben Faktor multipliziert.']]);
    return TF('Wahr oder falsch? ' + st[0], st[1], { sol: st[2] });
  });

  /* ---------- 10-zins ---------- */
  G('10-zins', 1, function () {
    var k = R.pick([200, 500, 800, 1000, 2500, 4000]), p = R.pick([1, 2, 2.5, 3, 4, 5]);
    return NUM('Ein Kapital von ' + de(k) + ' € wird ein Jahr lang zu ' + de(p) + ' % verzinst. Wie viele Zinsen gibt es?', k * p / 100, { unit: '€', sol: '$Z = K * {p/100} = ' + k + ' * {' + de(p) + '/100} = ' + de(k * p / 100) + '$ €', hint: 'Zinsrechnung ist Prozentrechnung (Klasse 7): Zinsen = Prozentwert.' });
  });
  G('10-zins', 1, function () {
    var p = R.pick([1, 2, 2.5, 3, 4, 5, 7.5]), n = R.int(2, 12);
    return MC('Ein Kapital $K_0$ wird ' + n + ' Jahre lang mit Zinseszins zu ' + de(p) + ' % angelegt. Welche Formel liefert das Endkapital?', '$K_0 * ' + de(1 + p / 100) + '^{' + n + '}$', ['$K_0 * ' + de(1 + p / 100) + ' * ' + n + '$', '$K_0 + ' + n + ' * ' + de(p) + '$', '$K_0 * ' + de(p) + '^{' + n + '}$', '$K_0 * ' + de(p / 100) + '^{' + n + '}$'], { sol: 'Jedes Jahr wird mit dem Faktor $1 + {' + de(p) + '/100} = ' + de(1 + p / 100) + '$ multipliziert – ' + n + '-mal hintereinander: $K_0 * ' + de(1 + p / 100) + '^{' + n + '}$', hint: 'Das Kapital wächst exponentiell: jedes Jahr mit demselben Faktor.' });
  });
  G('10-zins', 2, function () {
    var k = R.pick([1000, 2000, 5000, 10000]), p = R.pick([2, 3, 4, 5, 10]), q = 1 + p / 100, e = M.round(k * q * q, 2);
    return NUM(de(k) + ' € werden für 2 Jahre zu ' + p + ' % mit Zinseszins angelegt. Wie groß ist das Kapital danach?', e, { unit: '€', tol: 0.006, sol: '$K_2 = ' + k + ' * ' + de(q) + '^2 = ' + k + ' * ' + de(q * q) + ' = ' + M.fix(e, 2) + '$ €', hint: '$K_n = K_0 * (1 + {p/100})^n$' });
  });
  G('10-zins', 2, function () {
    var k = R.pick([400, 800, 1200, 2000, 5000]), p = R.pick([1.5, 2, 2.5, 3, 4]), z = k * p / 100, v = R.bool();
    if (v) return NUM('Für ein Kapital von ' + de(k) + ' € gibt es in einem Jahr ' + de(z) + ' € Zinsen. Wie hoch ist der Zinssatz?', p, { unit: '%', sol: '$p % = {Z/K} = {' + de(z) + '/' + k + '} = ' + de(p / 100) + ' = ' + de(p) + ' %$', hint: 'Zinssatz = Zinsen geteilt durch Kapital.' });
    return NUM('Bei einem Zinssatz von ' + de(p) + ' % gibt es in einem Jahr ' + de(z) + ' € Zinsen. Wie groß ist das Kapital?', k, { unit: '€', sol: '$K = Z : {p/100} = ' + de(z) + ' : ' + de(p / 100) + ' = ' + de(k) + '$ €', hint: 'Gesucht ist der Grundwert (Klasse 7).' });
  });
  G('10-zins', 2, function () {
    var k = R.pick([1200, 2400, 3600, 6000]), p = R.pick([2, 3, 4, 5]), m = R.pick([3, 4, 6, 9]);
    return NUM(de(k) + ' € werden zu ' + p + ' % pro Jahr angelegt. Wie viele Zinsen gibt es nach ' + m + ' Monaten?', k * p / 100 * m / 12, { unit: '€', sol: 'Jahreszinsen: $' + de(k * p / 100) + '$ €. Für ' + m + ' Monate der Anteil ${' + m + '/12}$: $' + de(k * p / 100 * m / 12) + '$ €', hint: 'Berechne die Jahreszinsen und nimm den passenden Bruchteil des Jahres.' });
  });
  G('10-zins', 3, function () {
    var s = R.pick([1000, 2000, 5000]), p = R.pick([4, 5, 10]), r = R.pick([300, 500, 600]), rest = s * (1 + p / 100) - r;
    return NUM('Ein Kredit über ' + de(s) + ' € wird mit ' + p + ' % pro Jahr verzinst. Am Jahresende werden ' + r + ' € zurückgezahlt. Wie hoch ist die Restschuld danach?', rest, { unit: '€', sol: 'Schuld plus Zinsen: $' + s + ' * ' + de(1 + p / 100) + ' = ' + de(s * (1 + p / 100)) + '$. Minus Rate: $' + de(s * (1 + p / 100)) + ' - ' + r + ' = ' + de(rest) + '$ €. Von der Rate tilgen nur $' + de(r - s * p / 100) + '$ € die Schuld – der Rest sind Zinsen.', hint: 'Erst kommen die Zinsen dazu, dann wird die Rate abgezogen.' });
  });
  G('10-zins', 3, function () {
    var k = R.pick([1000, 2000, 10000]), p = R.pick([5, 10, 20]), diff = k * p * p / 10000;
    return NUM(de(k) + ' € werden 2 Jahre lang zu ' + p + ' % angelegt. Um wie viel Euro ist das Endkapital mit Zinseszins größer als bei einfacher Verzinsung (ohne Zinseszins)?', diff, { unit: '€', sol: 'Einfach: $' + k + ' + 2 * ' + de(k * p / 100) + ' = ' + de(k + 2 * k * p / 100) + '$. Mit Zinseszins: $' + k + ' * ' + de(1 + p / 100) + '^2 = ' + de(k * Math.pow(1 + p / 100, 2)) + '$. Unterschied: $' + de(diff) + '$ € – das sind die Zinsen auf die Zinsen des ersten Jahres.', hint: 'Im zweiten Jahr werden beim Zinseszins auch die Zinsen des ersten Jahres verzinst.' });
  });
  G('10-zins', 3, function () {
    var k = R.pick([1000, 2000]), p = 10, e = M.round(k * 1.331, 2);
    return NUM(de(k) + ' € werden 3 Jahre lang zu ' + p + ' % mit Zinseszins angelegt. Wie groß ist das Kapital danach?', e, { unit: '€', tol: 0.006, sol: '$' + k + ' * 1,1^3 = ' + k + ' * 1,331 = ' + de(e) + '$ €. Eine geometrische Folge: $' + k + '; ' + de(k * 1.1) + '; ' + de(k * 1.21) + '; ' + de(e) + '$', hint: 'Dreimal hintereinander mit 1,1 multiplizieren.' });
  });

  /* ---------- 10-modell ---------- */
  G('10-modell', 1, function () {
    var v = R.int(0, 3), a = R.int(2, 6), ys, why;
    if (v === 0) { var d = R.int(2, 5); ys = [0, 1, 2, 3].map(function (n) { return a + d * n; }); why = 'Konstante Differenz ' + d + ': lineares Modell.'; }
    else if (v === 1) { var q = R.pick([2, 3]); ys = [0, 1, 2, 3].map(function (n) { return a * Math.pow(q, n); }); why = 'Konstanter Quotient ' + q + ': exponentielles Modell.'; }
    else if (v === 2) { var pr = R.pick([24, 36, 48, 60]); ys = [1, 2, 3, 4].map(function (x) { return pr / x; }); why = 'Konstantes Produkt $x * y = ' + pr + '$: indirekte Proportionalität.'; }
    else { ys = [0, 1, 2, 3].map(function (n) { return n * n + a; }); why = 'Die Differenzen 1, 3, 5 wachsen gleichmäßig (zweite Differenzen konstant 2): quadratisches Modell.'; }
    return MCF('Welches Modell passt zu den Daten?' + tb(v === 2 ? [1, 2, 3, 4] : [0, 1, 2, 3], ys), ['linear', 'exponentiell', 'indirekt proportional', 'quadratisch'], v, { sol: why, hint: 'Prüfe der Reihe nach: Differenzen, Quotienten, Produkte $x * y$, zweite Differenzen.' });
  });
  G('10-modell', 2, function () {
    var q = R.pick([['Ein Handyvertrag kostet eine feste Grundgebühr und zusätzlich einen festen Betrag pro Gigabyte.', 0], ['Eine Bakterienkultur verdoppelt sich alle 20 Minuten.', 1], ['Die Höhe eines senkrecht hochgeworfenen Balls in Abhängigkeit von der Zeit.', 2], ['Die Tageslänge in Dresden im Verlauf mehrerer Jahre.', 3], ['Die Zeit zum Füllen eines Beckens in Abhängigkeit von der Anzahl gleicher Pumpen.', 4], ['Die Menge eines radioaktiven Stoffes im Laufe der Zeit.', 1], ['Die Auslenkung eines schwingenden Pendels.', 3], ['Der Flächeninhalt eines Quadrats in Abhängigkeit von der Seitenlänge.', 2], ['Der Wasserstand an der Nordseeküste im Wechsel von Ebbe und Flut.', 3], ['Ein Guthaben, das jedes Jahr 3 % Zinsen mit Zinseszins bekommt.', 1]]);
    return MCF(q[0] + ' Welches Modell beschreibt das am besten?', ['lineare Funktion', 'Exponentialfunktion', 'quadratische Funktion', 'Sinusfunktion (periodisch)', 'indirekte Proportionalität'], q[1], { sol: ['Gleiche Zunahme pro Schritt: linear.', 'Gleicher Faktor pro Schritt: exponentiell.', 'Die Größe hängt vom Quadrat ab: quadratisch.', 'Der Vorgang wiederholt sich regelmäßig: periodisch.', 'Doppelt so viele – halb so lange: indirekt proportional.'][q[1]], hint: 'Kommt pro Schritt gleich viel dazu? Wird mit dem gleichen Faktor multipliziert? Wiederholt sich etwas?' });
  });
  G('10-modell', 2, function () {
    var v = R.int(0, 2), a = R.int(2, 6), s, nx, why;
    if (v === 0) { var d = R.int(3, 8); s = [a, a + d, a + 2 * d, a + 3 * d]; nx = a + 4 * d; why = 'linear, jeweils $+' + d + '$'; }
    else if (v === 1) { var q = R.pick([2, 3]); s = [a, a * q, a * q * q, a * q * q * q]; nx = s[3] * q; why = 'exponentiell, jeweils mal ' + q; }
    else { s = [1, 4, 9, 16].map(function (x) { return x + a; }); nx = 25 + a; why = 'quadratisch: $n^2 + ' + a + '$'; }
    return NUM('Erkenne das Muster und setze fort: $' + s.join('; ') + '; ▢$', nx, { sol: 'Das Muster ist ' + why + '. Nächster Wert: $' + nx + '$', hint: 'Untersuche Differenzen und Quotienten.' });
  });
  G('10-modell', 2, function () {
    var q = R.pick([['Eine Seerose verdoppelt täglich ihre Fläche. Warum kann dieses Modell nicht beliebig lange gelten?', 'Der Teich ist begrenzt – irgendwann ist kein Platz mehr.', ['Seerosen wachsen linear.', 'Verdopplung ist mathematisch unmöglich.', 'Das Modell gilt immer.']], ['Die Bevölkerung einer Stadt wuchs zehn Jahre lang jedes Jahr um 2 %. Jemand rechnet damit 500 Jahre in die Zukunft. Was ist problematisch?', 'Ein Trend wird weit über den Bereich hinaus fortgeschrieben, für den er beobachtet wurde.', ['2 % ist zu wenig.', 'Prozentrechnung gilt nicht für Menschen.', 'Nichts – das Modell ist exakt.']], ['Eine heiße Tasse Tee kühlt ab. Welche Annahme ist sinnvoll?', 'Die Temperatur nähert sich der Raumtemperatur an – ein beschränkter Vorgang.', ['Die Temperatur fällt linear bis weit unter null.', 'Die Temperatur schwankt periodisch.', 'Die Temperatur wächst exponentiell.']]]);
    return MC(q[0], q[1], q[2], { sol: 'Jedes Modell vereinfacht die Wirklichkeit und gilt nur in einem bestimmten Bereich. ' + q[1], hint: 'Ein Modell gilt nur dort, wo seine Annahmen stimmen.' });
  });
  G('10-modell', 2, function () {
    var a = R.int(2, 6), q = R.pick([2, 3, 0.5]), ys = [0, 1, 2].map(function (n) { return a * 8 * Math.pow(q, n); });
    return GAP('Die Daten folgen einem exponentiellen Modell $f(n) = a * q^n$. Bestimme $a$ und $q$.' + tb([0, 1, 2], ys, 'n', 'f(n)'), [{ pre: '$a =$', ans: a * 8 }, { pre: '$q =$', ans: q }], { sol: '$a = f(0) = ' + a * 8 + '$. $q$ ist der Quotient benachbarter Werte: ${' + de(ys[1]) + '/' + de(ys[0]) + '} = ' + de(q) + '$', hint: '$a$ ist der Startwert, $q$ der Wachstumsfaktor.' });
  });
  G('10-modell', 3, function () {
    var x1 = R.int(1, 3), x2 = x1 + R.int(2, 4), m = R.int(2, 5), n = R.nz(-4, 6);
    return GAP('Ein lineares Modell $f(x) = m * x + n$ soll durch die Messpunkte $(' + x1 + '|' + (m * x1 + n) + ')$ und $(' + x2 + '|' + (m * x2 + n) + ')$ gehen. Bestimme $m$ und $n$.', [{ pre: '$m =$', ans: m }, { pre: '$n =$', ans: n }], { sol: 'Zwei Gleichungen: $' + x1 + 'm + n = ' + (m * x1 + n) + '$ und $' + x2 + 'm + n = ' + (m * x2 + n) + '$. Subtrahieren: $' + (x2 - x1) + 'm = ' + m * (x2 - x1) + '$, also $m = ' + m + '$ und $n = ' + n + '$. (Gleichungssystem, Klasse 8)', hint: 'Jeder Punkt liefert eine Gleichung – zusammen ein lineares Gleichungssystem.' });
  });
  G('10-modell', 3, function () {
    var day = R.pick([20, 30, 48, 60]), v = R.bool();
    return NUM('Eine Seerose verdoppelt jeden Tag ihre Fläche. Am ' + day + '. Tag bedeckt sie den ganzen Teich. An welchem Tag war der Teich ' + (v ? 'zur Hälfte' : 'zu einem Viertel') + ' bedeckt?', v ? day - 1 : day - 2, { sol: 'Rückwärts denken: Einen Tag vorher war es die Hälfte' + (v ? '.' : ', zwei Tage vorher ein Viertel.') + ' Also am ' + (v ? day - 1 : day - 2) + '. Tag. Exponentielles Wachstum passiert „am Ende ganz schnell“.', hint: 'Arbeite rückwärts: Wenn sich die Fläche täglich verdoppelt, war sie am Vortag halb so groß.' });
  });
  G('10-modell', 3, function () {
    var a = R.pick([10, 20, 50]), n = 1;
    while (Math.pow(2, n - 1) <= a * n) n++;
    return NUM('Angebot A: In der 1. Woche ' + a + ' Taler, jede Woche ' + a + ' Taler mehr. Angebot B: In der 1. Woche 1 Taler, jede Woche doppelt so viel wie in der Vorwoche. In welcher Woche ist die Wochenzahlung von B zum ersten Mal größer als die von A?', n, { sol: 'A wächst linear: $' + a + 'n$. B wächst exponentiell: $2^{n-1}$. Tabelle: in Woche ' + (n - 1) + ' ist A $' + a * (n - 1) + '$ und B $' + Math.pow(2, n - 2) + '$; in Woche ' + n + ' ist A $' + a * n + '$ und B $' + Math.pow(2, n - 1) + '$.', hint: 'Lege eine Tabelle an: Woche, Zahlung A, Zahlung B.' });
  });
})(typeof window !== 'undefined' ? window : globalThis);

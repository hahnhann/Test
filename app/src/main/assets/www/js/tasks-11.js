/* Silberzirkel – Aufgaben Jahrgangsstufen 11/12, Grundkurs (Lehrplan Sachsen, Gymnasium). */
(function (g) {
  'use strict';
  var SZ = g.SZ, R = SZ.R, M = SZ.M, G = SZ.G, MC = SZ.MC, MCN = SZ.MCN, MCF = SZ.MCF, NUM = SZ.NUM, GAP = SZ.GAP, TF = SZ.TF, ORD = SZ.ORD, Fig = SZ.Fig, de = M.de, F = M.F, fs = M.fs, lin = M.lin, par = M.par, poly = M.poly;
  function sg(x) { return x < 0 ? '- ' + (-x) : '+ ' + x; }
  function V(a) { return 'vec(' + a.join(';') + ')'; }
  function vecn() { return [R.nz(-4, 5), R.int(-4, 5), R.nz(-4, 5)]; }
  var XYZ = ['$x =$', '$y =$', '$z =$'];
  function comp(a) { return a.map(function (v, i) { return { pre: XYZ[i], ans: v }; }); }

  /* ---------- 11-grenz ---------- */
  G('11-grenz', 1, function () {
    var a = R.int(1, 9), c = R.nz(-6, 6), v = R.bool();
    if (v) return NUM('Bestimme den Grenzwert: $lim_{x->∞} {' + a + '/x}$', 0, { sol: 'Der Nenner wächst über alle Grenzen, der Zähler bleibt ' + a + ': Der Bruch geht gegen 0.', hint: 'Was passiert mit einem Bruch, dessen Nenner riesig wird?' });
    return NUM('Bestimme den Grenzwert: $lim_{x->∞} ({' + a + '/x} ' + sg(c) + ')$', c, { sol: '${' + a + '/x}$ geht gegen 0, übrig bleibt $' + c + '$ (Grenzwertsatz für Summen).', hint: 'Der Grenzwert einer Summe ist die Summe der Grenzwerte.' });
  });
  G('11-grenz', 1, function () {
    var q = R.pick([['e^{-x}', 0, 'Für große $x$ ist $e^{-x} = {1/e^x}$ winzig.'], ['{1/x^2}', 0, 'Der Nenner wächst über alle Grenzen.'], ['({1/2})^x', 0, 'Jeder Schritt halbiert den Wert.'], ['2 + {3/x}', 2, '${3/x}$ geht gegen 0.'], ['5 - e^{-x}', 5, '$e^{-x}$ geht gegen 0.'], ['{x + 1/x}', 1, '${x + 1/x} = 1 + {1/x}$']]);
    return NUM('Welchem Wert nähern sich die Funktionswerte von $f(x) = ' + q[0] + '$ für $x -> ∞$?', q[1], { sol: q[2] + ' Grenzwert: $' + q[1] + '$. Die Gerade $y = ' + q[1] + '$ ist waagerechte Asymptote.', hint: 'Setze in Gedanken sehr große Zahlen ein (Folgen, Klasse 10).' });
  });
  G('11-grenz', 2, function () {
    var a = R.int(1, 6), b = R.int(2, 6), c = R.nz(-5, 5), d = R.nz(-5, 5), r = F(a, b);
    return NUM('Bestimme den Grenzwert: $lim_{x->∞} {' + a + 'x^2 ' + sg(c) + '/' + b + 'x^2 ' + sg(d) + '}$ (ganze Zahl oder Bruch)', r, { reduced: true, sol: 'Zähler und Nenner durch $x^2$ teilen: Die Reste ${' + c + '/x^2}$ und ${' + d + '/x^2}$ gehen gegen 0. Übrig bleibt ${' + a + '/' + b + '}' + (r.d !== b ? ' = ' + fs(r) : '') + '$.', hint: 'Bei gleichem Grad in Zähler und Nenner entscheiden die Faktoren vor der höchsten Potenz.' });
  });
  G('11-grenz', 2, function () {
    var a = R.int(1, 6), b = R.int(1, 6), c = R.nz(-5, 5), up = R.bool();
    if (up) return NUM('Bestimme den Grenzwert: $lim_{x->∞} {' + a + 'x ' + sg(c) + '/' + b + 'x^2 + 1}$', 0, { sol: 'Der Nenner hat den höheren Grad und wächst viel schneller als der Zähler: Grenzwert 0.', hint: 'Vergleiche die höchsten Potenzen in Zähler und Nenner.' });
    return MCF('Wie verhält sich $f(x) = {' + a + 'x^2 ' + sg(c) + '/' + b + 'x + 1}$ für $x -> ∞$?', ['Die Funktionswerte wachsen über alle Grenzen.', 'Die Funktionswerte gehen gegen 0.', 'Die Funktionswerte gehen gegen ' + fs(F(a, b)).replace(/[{}]/g, '') + '.'], 0, { sol: 'Der Zähler hat den höheren Grad: Der Bruch verhält sich für große $x$ wie ${' + a + 'x^2/' + b + 'x} = ' + fs(F(a, b)) + ' * x$ und wächst unbeschränkt.', hint: 'Vergleiche die höchsten Potenzen in Zähler und Nenner.' });
  });
  G('11-grenz', 2, function () {
    var a = R.nz(-5, 6);
    return NUM('Bestimme den Grenzwert an der Stelle $x = ' + a + '$: $lim_{x->' + a + '} {x^2 - ' + a * a + '/x ' + sg(-a) + '}$', 2 * a, { sol: '3. binomische Formel (Klasse 8): ${(x ' + sg(a) + ') * (x ' + sg(-a) + ')/x ' + sg(-a) + '} = x ' + sg(a) + '$ für $x != ' + a + '$. Für $x -> ' + a + '$ ergibt sich $' + 2 * a + '$. Die Funktion hat dort eine Lücke, aber einen Grenzwert.', hint: 'Zerlege den Zähler mit der 3. binomischen Formel und kürze.' });
  });
  G('11-grenz', 2, function () {
    var a = R.int(1, 5), c = R.nz(-5, 6), b = R.nz(-4, 4);
    return GAP('Die Funktion $f(x) = {' + a + 'x ' + sg(b) + '/x ' + sg(-c) + '}$ hat eine Polstelle und eine waagerechte Asymptote. Bestimme beide.', [{ pre: 'Polstelle $x =$', ans: c }, { pre: 'Asymptote $y =$', ans: a }], { sol: 'Polstelle: Der Nenner wird 0 für $x = ' + c + '$. Asymptote: Für $x -> ∞$ geht der Bruch gegen ${' + a + '/1} = ' + a + '$.', hint: 'Polstelle: Nullstelle des Nenners. Asymptote: Grenzwert für $x -> ∞$.' });
  });
  G('11-grenz', 3, function () {
    var st = R.pick([['„Unendlich“ ist eine sehr große reelle Zahl.', false, '$∞$ ist keine Zahl, sondern beschreibt ein Verhalten: Wachsen über alle Grenzen.'], ['Hat $f$ für $x -> ∞$ den Grenzwert 3, dann ist $y = 3$ eine waagerechte Asymptote.', true, 'Der Graph nähert sich dieser Geraden beliebig an.'], ['Eine Funktion kann an einer Stelle einen Grenzwert haben, obwohl sie dort nicht definiert ist.', true, 'Beispiel: ${x^2 - 1/x - 1}$ an der Stelle 1 – der Grenzwert ist 2.'], ['Den Graphen einer stetigen Funktion kann man in einem Intervall ohne Absetzen zeichnen.', true, 'Das ist die anschauliche Bedeutung von Stetigkeit.'], ['$f(x) = {1/x}$ ist an der Stelle 0 stetig.', false, 'An der Stelle 0 ist die Funktion nicht definiert – dort liegt eine Polstelle.'], ['Der Grenzwert einer Summe ist die Summe der Grenzwerte, wenn beide existieren.', true, 'Das ist ein Grenzwertsatz.']]);
    return TF('Wahr oder falsch? ' + st[0], st[1], { sol: st[2] });
  });

  /* ---------- 11-ableitung ---------- */
  G('11-ableitung', 1, function () {
    var n = R.pick([2, 3, 4, 5, 6, 7, 10]);
    return GAP('Leite ab: $f(x) = x^{' + n + '}$. Dann ist $f′(x) = ▢ * x^{▢}$.', [{ pre: 'Faktor:', ans: n }, { pre: 'Exponent:', ans: n - 1 }], { sol: 'Potenzregel: Der Exponent kommt als Faktor nach vorn und wird um 1 kleiner. $f′(x) = ' + n + 'x^{' + (n - 1) + '}$', hint: '$(x^n)′ = n * x^{n-1}$' });
  });
  G('11-ableitung', 1, function () {
    var a = R.nz(-5, 6), b = R.nz(-7, 7), c = R.nz(-9, 9);
    return GAP('Leite ab: $f(x) = ' + poly([a, b, c]) + '$. Dann ist $f′(x) = ▢ * x + ▢$.', [{ pre: 'Faktor vor $x$:', ans: 2 * a }, { pre: 'Zahl:', ans: b }], { sol: 'Summen- und Faktorregel: $(' + M.co(a, 'x^2') + ')′ = ' + 2 * a + 'x$, $(' + M.co(b, 'x') + ')′ = ' + b + '$, die Konstante fällt weg. $f′(x) = ' + lin(2 * a, 'x', b) + '$', hint: 'Jeden Summanden einzeln ableiten. Die Ableitung einer Konstanten ist 0.' });
  });
  G('11-ableitung', 2, function () {
    var a = R.nz(-2, 3), b = R.nz(-4, 4), c = R.nz(-6, 6), x = R.nz(-2, 3), v = 3 * a * x * x + 2 * b * x + c;
    return NUM('Gegeben ist $f(x) = ' + poly([a, b, c, R.int(-5, 5)]) + '$. Berechne $f′(' + x + ')$.', v, { sol: '$f′(x) = ' + poly([3 * a, 2 * b, c]) + '$. Einsetzen: $f′(' + x + ') = ' + v + '$. Das ist der Anstieg der Tangente an dieser Stelle.', hint: 'Erst ableiten, dann einsetzen.' });
  });
  G('11-ableitung', 2, function () {
    var q = R.pick([['e^x', 'e^x', ['x * e^{x-1}', 'ln x', '{1/x}']], ['sin x', 'cos x', ['-cos x', '-sin x', 'tan x']], ['cos x', '-sin x', ['sin x', '-cos x', 'tan x']], ['ln x', '{1/x}', ['e^x', 'x', '{1/x^2}']], ['sqrt(x)', '{1/2 * sqrt(x)}', ['{1/sqrt(x)}', '2 * sqrt(x)', '{1/2} * x']], ['{1/x}', '-{1/x^2}', ['{1/x^2}', 'ln x', '-{1/x}']]]);
    return MC('Welche Funktion ist die Ableitung von $f(x) = ' + q[0] + '$?', '$f′(x) = ' + q[1] + '$', q[2].map(function (x) { return '$f′(x) = ' + x + '$'; }), { sol: 'Eine Grundableitung zum Merken: $(' + q[0] + ')′ = ' + q[1] + '$', hint: 'Wurzeln und Brüche lassen sich als Potenzen schreiben (Klasse 9) und mit der Potenzregel ableiten.' });
  });
  G('11-ableitung', 2, function () {
    var a = R.int(0, 3), h = R.int(1, 3), b = a + h, m = a + b;
    return NUM('Berechne die mittlere Änderungsrate (den Differenzenquotienten) von $f(x) = x^2$ im Intervall von $x = ' + a + '$ bis $x = ' + b + '$.', m, { sol: '${f(' + b + ') - f(' + a + ')/' + b + ' - ' + a + '} = {' + b * b + ' - ' + a * a + '/' + h + '} = ' + m + '$ – der Anstieg der Sekante (Differenzenquotient wie bei linearen Funktionen, Klasse 8).', hint: 'Höhenunterschied geteilt durch Seitenunterschied.' });
  });
  G('11-ableitung', 2, function () {
    var x0 = R.nz(-4, 5), k = R.pick([1, 2, 3]), v = R.bool();
    if (v) return NUM('Welchen Anstieg hat die Tangente an den Graphen von $f(x) = ' + M.co(k, 'x^2') + '$ an der Stelle $x_0 = ' + x0 + '$?', 2 * k * x0, { sol: '$f′(x) = ' + 2 * k + 'x$, also $f′(' + x0 + ') = ' + 2 * k * x0 + '$.', hint: 'Der Tangentenanstieg ist der Wert der Ableitung an dieser Stelle.' });
    return NUM('An welcher Stelle hat der Graph von $f(x) = x^2$ eine Tangente mit dem Anstieg ' + 2 * x0 + '?', x0, { pre: '$x =$', sol: '$f′(x) = 2x = ' + 2 * x0 + '$, also $x = ' + x0 + '$.', hint: 'Setze die Ableitung gleich dem gewünschten Anstieg.' });
  });
  G('11-ableitung', 2, function () {
    var n = R.pick([-1, -2, -3]), v = R.bool();
    if (v) return GAP('Leite ab: $f(x) = x^{' + n + '}$. Dann ist $f′(x) = ▢ * x^{▢}$.', [{ pre: 'Faktor:', ans: n }, { pre: 'Exponent:', ans: n - 1 }], { sol: 'Die Potenzregel gilt auch für negative Exponenten: $f′(x) = ' + n + 'x^{' + (n - 1) + '}$', hint: '$(x^n)′ = n * x^{n-1}$ – auch für negative $n$.' });
    return MC('Leite ab: $f(x) = x^{1/2}$ (also $sqrt(x)$).', '$f′(x) = {1/2} * x^{-1/2}$', ['$f′(x) = {1/2} * x^{1/2}$', '$f′(x) = 2 * x^{-1/2}$', '$f′(x) = -{1/2} * x^{-3/2}$'], { sol: 'Potenzregel mit $n = {1/2}$: Faktor ${1/2}$, neuer Exponent ${1/2} - 1 = -{1/2}$. Das ist ${1/2 * sqrt(x)}$.', hint: 'Die Potenzregel gilt auch für Brüche als Exponenten.' });
  });
  G('11-ableitung', 3, function () {
    var a = R.int(2, 5), b = R.nz(-4, 5), q = R.pick([
      ['(' + lin(a, 'x', b) + ')^2', 2 * a + ' * (' + lin(a, 'x', b) + ')', ['2 * (' + lin(a, 'x', b) + ')', a + ' * (' + lin(a, 'x', b) + ')^2', '(' + lin(a, 'x', b) + ')']],
      ['e^{' + a + 'x}', a + ' * e^{' + a + 'x}', ['e^{' + a + 'x}', a + 'x * e^{' + a + 'x - 1}', 'e^{' + a + '}']],
      ['sin(' + lin(a, 'x', b) + ')', a + ' * cos(' + lin(a, 'x', b) + ')', ['cos(' + lin(a, 'x', b) + ')', '-' + a + ' * cos(' + lin(a, 'x', b) + ')', a + ' * sin(' + lin(a, 'x', b) + ')']],
      ['ln (' + a + 'x)', '{1/x}', ['{1/' + a + 'x}', '{' + a + '/x}', a + ' * ln x']]
    ]);
    return MC('Leite mit der Kettenregel ab: $f(x) = ' + q[0] + '$', '$f′(x) = ' + q[1] + '$', q[2].map(function (x) { return '$f′(x) = ' + x + '$'; }), { sol: 'Äußere Ableitung mal innere Ableitung. Die innere Funktion hat die Ableitung $' + a + '$. Ergebnis: $f′(x) = ' + q[1] + '$', hint: 'Kettenregel: äußere Funktion ableiten (innere stehen lassen), dann mit der Ableitung der inneren Funktion multiplizieren.' });
  });
  G('11-ableitung', 3, function () {
    var q = R.pick([['x * e^x', 'e^x + x * e^x', ['e^x', 'x * e^x', '1 + e^x']], ['x^2 * sin x', '2x * sin x + x^2 * cos x', ['2x * cos x', '2x * sin x', 'x^2 * cos x']], ['x * ln x', 'ln x + 1', ['{1/x}', 'ln x', '1 + {1/x}']], ['x^3 * e^x', '3x^2 * e^x + x^3 * e^x', ['3x^2 * e^x', 'x^3 * e^x', '3x^2 + e^x']]]);
    return MC('Leite mit der Produktregel ab: $f(x) = ' + q[0] + '$', '$f′(x) = ' + q[1] + '$', q[2].map(function (x) { return '$f′(x) = ' + x + '$'; }), { sol: '$(u * v)′ = u′ * v + u * v′$: $f′(x) = ' + q[1] + '$', hint: 'Produktregel: Ableitung des ersten mal zweiter plus erster mal Ableitung des zweiten.' });
  });
  G('11-ableitung', 3, function () {
    var a = R.nz(-3, 4);
    return GAP('Bestimme die Gleichung der Tangente $t(x) = m * x + n$ an den Graphen von $f(x) = x^2$ an der Stelle $x_0 = ' + a + '$.', [{ pre: '$m =$', ans: 2 * a }, { pre: '$n =$', ans: -a * a }], { sol: 'Anstieg: $m = f′(' + a + ') = ' + 2 * a + '$. Berührpunkt: $(' + a + '|' + a * a + ')$. Einsetzen: $' + a * a + ' = ' + 2 * a + ' * ' + par(a) + ' + n$, also $n = ' + (-a * a) + '$.', hint: 'Der Anstieg ist $f′(x_0)$. Dann den Berührpunkt in $y = m * x + n$ einsetzen (lineare Funktionen, Klasse 8).' });
  });
  G('11-ableitung', 2, function () {
    var st = R.pick([['Die Ableitung einer konstanten Funktion ist 0.', true, 'Eine waagerechte Gerade hat überall den Anstieg 0.'], ['$f(x) = e^x$ ist ihre eigene Ableitung.', true, 'Das macht die Zahl $e$ so besonders.'], ['Die Ableitung von $f(x) = x^3$ ist $f′(x) = 3x^3$.', false, 'Der Exponent wird um 1 kleiner: $3x^2$.'], ['Die Ableitung an einer Stelle gibt den Anstieg der Tangente an.', true, 'Sie ist der Grenzwert der Sekantenanstiege.'], ['Die Ableitung von $f(x) = 5x$ ist $f′(x) = 5x$.', false, 'Eine lineare Funktion hat überall denselben Anstieg: $f′(x) = 5$.'], ['Die Ableitung einer Summe ist die Summe der Ableitungen.', true, 'Das ist die Summenregel.'], ['Die Ableitung eines Produkts ist das Produkt der Ableitungen.', false, 'Dafür braucht man die Produktregel: $(u * v)′ = u′v + uv′$.']]);
    return TF('Wahr oder falsch? ' + st[0], st[1], { sol: st[2] });
  });

  /* ---------- 11-kurven ---------- */
  G('11-kurven', 1, function () {
    var d = R.nz(-5, 6), c = R.nz(-6, 6);
    return NUM('An welcher Stelle hat $f(x) = ' + poly([1, -2 * d, c]) + '$ ihre Extremstelle?', d, { pre: '$x =$', sol: '$f′(x) = ' + lin(2, 'x', -2 * d) + ' = 0$ ergibt $x = ' + d + '$. Das ist der Scheitelpunkt der Parabel (Klasse 9) – jetzt mit der Ableitung gefunden.', hint: 'Notwendige Bedingung: $f′(x) = 0$.' });
  });
  G('11-kurven', 1, function () {
    var q = R.pick([['eine lokale Extremstelle', '$f′(x_0) = 0$'], ['eine Wendestelle', '$f″(x_0) = 0$'], ['eine Nullstelle', '$f(x_0) = 0$']]);
    return MC('Welche Bedingung ist notwendig dafür, dass $x_0$ ' + q[0] + ' ist?', q[1], ['$f′(x_0) = 0$', '$f″(x_0) = 0$', '$f(x_0) = 0$', '$f‴(x_0) = 0$'], { sol: 'Nullstelle: $f = 0$. Extremstelle: waagerechte Tangente, also $f′ = 0$. Wendestelle: Die Krümmung wechselt, also $f″ = 0$.', hint: 'Extremstelle: waagerechte Tangente. Wendestelle: Wechsel der Krümmung.' });
  });
  G('11-kurven', 2, function () {
    var a = R.int(1, 3), c = R.nz(-5, 5);
    return GAP('Bestimme die Extremstellen von $f(x) = ' + poly([1, 0, -3 * a * a, c]) + '$.', [{ pre: 'kleinere:', ans: -a }, { pre: 'größere:', ans: a }], { sol: '$f′(x) = 3x^2 - ' + 3 * a * a + ' = 0$ ergibt $x^2 = ' + a * a + '$, also $x = -' + a + '$ oder $x = ' + a + '$ (quadratische Gleichung, Klasse 9).', hint: 'Setze $f′(x) = 0$ und löse die quadratische Gleichung.' });
  });
  G('11-kurven', 2, function () {
    var a = R.int(1, 3), at = R.pick([-1, 1]) * a, f2 = 6 * at;
    return MCF('$f(x) = x^3 - ' + 3 * a * a + 'x$ hat bei $x = ' + at + '$ eine waagerechte Tangente. Was liegt dort vor?', ['ein Hochpunkt', 'ein Tiefpunkt', 'weder noch'], f2 < 0 ? 0 : 1, { sol: '$f″(x) = 6x$, also $f″(' + at + ') = ' + f2 + '$. ' + (f2 < 0 ? 'Negativ: Die Kurve ist nach unten gekrümmt – Hochpunkt.' : 'Positiv: Die Kurve ist nach oben gekrümmt – Tiefpunkt.'), hint: 'Hinreichende Bedingung: $f″(x_0) < 0$ Hochpunkt, $f″(x_0) > 0$ Tiefpunkt.' });
  });
  G('11-kurven', 2, function () {
    var w = R.nz(-3, 4), c = R.nz(-5, 5);
    return NUM('Bestimme die Wendestelle von $f(x) = ' + poly([1, -3 * w, c, 0]) + '$.', w, { pre: '$x =$', sol: '$f′(x) = ' + poly([3, -6 * w, c]) + '$, $f″(x) = ' + lin(6, 'x', -6 * w) + ' = 0$ ergibt $x = ' + w + '$. Da $f‴(x) = 6 != 0$, ist es wirklich eine Wendestelle.', hint: 'Notwendige Bedingung: $f″(x) = 0$.' });
  });
  G('11-kurven', 2, function () {
    var d = R.nz(-4, 5), up = R.bool();
    return MC('Gegeben ist $f′(x) = ' + lin(up ? 2 : -2, 'x', up ? -2 * d : 2 * d) + '$. In welchem Bereich ist $f$ monoton steigend?', up ? 'für $x > ' + d + '$' : 'für $x < ' + d + '$', [up ? 'für $x < ' + d + '$' : 'für $x > ' + d + '$', 'für alle $x$', 'nirgends'], { sol: '$f$ steigt, wo $f′(x) > 0$ ist: $' + lin(up ? 2 : -2, 'x', up ? -2 * d : 2 * d) + ' > 0$ gilt für $x ' + (up ? '>' : '<') + ' ' + d + '$' + (up ? '' : ' (Zeichen dreht sich beim Teilen durch $-2$, Klasse 8)') + '.', hint: 'Steigend heißt: Die Ableitung ist positiv. Löse die Ungleichung.' });
  });
  G('11-kurven', 3, function () {
    var L = R.pick([12, 16, 20, 24, 40]);
    return NUM('An einer Mauer soll mit ' + L + ' m Zaun ein rechteckiges Beet abgegrenzt werden (die Mauer bildet eine Seite). Wie groß kann der Flächeninhalt höchstens werden?', L * L / 8, { unit: '$m^2$', sol: 'Tiefe $x$, Breite $' + L + ' - 2x$. $A(x) = x * (' + L + ' - 2x) = ' + L + 'x - 2x^2$. $A′(x) = ' + L + ' - 4x = 0$ ergibt $x = ' + L / 4 + '$. $A(' + L / 4 + ') = ' + L / 4 + ' * ' + L / 2 + ' = ' + de(L * L / 8) + '$. Wegen $A″ = -4 < 0$ ist es ein Maximum.', hint: 'Stelle die Zielfunktion $A(x)$ auf, leite ab und setze $A′(x) = 0$.' });
  });
  G('11-kurven', 3, function () {
    var a = R.nz(-3, 4), c = R.nz(-5, 6), x1 = R.pick([1, 2, 3]);
    return GAP('Eine Funktion $f(x) = a * x^2 + c$ erfüllt $f(0) = ' + c + '$ und $f(' + x1 + ') = ' + (a * x1 * x1 + c) + '$. Bestimme $a$ und $c$.', [{ pre: '$a =$', ans: a }, { pre: '$c =$', ans: c }], { sol: '$f(0) = c = ' + c + '$. Dann $a * ' + x1 * x1 + ' ' + sg(c) + ' = ' + (a * x1 * x1 + c) + '$, also $a = ' + a + '$. So bestimmt man Funktionsgleichungen aus Bedingungen – mit einem Gleichungssystem (Klasse 8).', hint: 'Jede Bedingung liefert eine Gleichung für die Unbekannten.' });
  });
  G('11-kurven', 2, function () {
    var st = R.pick([['Hat $f$ an der Stelle $x_0$ einen Hochpunkt, dann ist $f′(x_0) = 0$.', true, 'Im Gipfel ist die Tangente waagerecht (für differenzierbare Funktionen).'], ['Aus $f′(x_0) = 0$ folgt immer, dass bei $x_0$ ein Extremum liegt.', false, 'Gegenbeispiel: $f(x) = x^3$ bei $x_0 = 0$ – ein Sattelpunkt. Die Umkehrung des Satzes gilt nicht (Klasse 7!).'], ['Wo $f′$ positiv ist, steigt der Graph von $f$.', true, 'Die Ableitung ist der Anstieg der Tangente.'], ['An einer Wendestelle ist der Anstieg des Graphen lokal am größten oder am kleinsten.', true, 'Dort hat $f′$ selbst ein Extremum.'], ['Eine ganzrationale Funktion dritten Grades hat immer genau zwei Extrempunkte.', false, 'Gegenbeispiel: $f(x) = x^3$ hat keinen.'], ['Wechselt $f′$ bei $x_0$ das Vorzeichen von Plus nach Minus, liegt dort ein Hochpunkt.', true, 'Erst steigt der Graph, dann fällt er.']]);
    return TF('Wahr oder falsch? ' + st[0], st[1], { sol: st[2] });
  });

  /* ---------- 11-integral ---------- */
  G('11-integral', 1, function () {
    var n = R.int(1, 6);
    return GAP('Bestimme eine Stammfunktion von $f(x) = x^{' + n + '}$: $F(x) = {x^{▢}/▢}$', [{ pre: 'Exponent:', ans: n + 1 }, { pre: 'Nenner:', ans: n + 1 }], { sol: 'Exponent um 1 erhöhen und durch den neuen Exponenten teilen: $F(x) = {x^{' + (n + 1) + '}/' + (n + 1) + '}$. Probe durch Ableiten.', hint: 'Umkehrung der Potenzregel: Der Exponent wird um 1 größer.' });
  });
  G('11-integral', 1, function () {
    var a = R.int(1, 4), b = R.int(1, 5), q = '$F(x) = ' + poly([a, b, 0, 0]) + '$';
    return MC('Welche Funktion ist eine Stammfunktion von $f(x) = ' + poly([3 * a, 2 * b, 0]) + '$?', q, ['$F(x) = ' + poly([6 * a, 2 * b]) + '$', '$F(x) = ' + poly([3 * a, 2 * b, 0, 0]) + '$', '$F(x) = ' + poly([a, b, 0]) + '$'], { sol: 'Probe durch Ableiten: $(' + poly([a, b, 0, 0]) + ')′ = ' + poly([3 * a, 2 * b, 0]) + '$ ✓', hint: 'Leite die Kandidaten ab – die Stammfunktion muss wieder $f$ ergeben.' });
  });
  G('11-integral', 2, function () {
    var v = R.int(0, 2), b = R.int(1, 4), a = R.int(0, b - 1), k = R.int(2, 6);
    if (v === 0) return NUM('Berechne: $int(0,' + b + ') x^2 dx$ (ganze Zahl oder Bruch)', F(b * b * b, 3), { reduced: true, sol: '$F(x) = {x^3/3}$. $F(' + b + ') - F(0) = {' + b * b * b + '/3}' + (b * b * b % 3 ? '' : ' = ' + b * b * b / 3) + '$', hint: 'Hauptsatz: $F(b) - F(a)$ mit $F(x) = {x^3/3}$.' });
    if (v === 1) return NUM('Berechne: $int(' + a + ',' + b + ') 2x dx$', b * b - a * a, { sol: '$F(x) = x^2$. $F(' + b + ') - F(' + a + ') = ' + b * b + ' - ' + a * a + ' = ' + (b * b - a * a) + '$', hint: 'Eine Stammfunktion von $2x$ ist $x^2$.' });
    return NUM('Berechne: $int(' + a + ',' + (b + 1) + ') ' + k + ' dx$', k * (b + 1 - a), { sol: '$F(x) = ' + k + 'x$. $' + k + ' * ' + (b + 1) + ' - ' + k + ' * ' + a + ' = ' + k * (b + 1 - a) + '$ – der Flächeninhalt eines Rechtecks mit Höhe ' + k + ' und Breite ' + (b + 1 - a) + '.', hint: 'Unter einer konstanten Funktion liegt ein Rechteck (Klasse 5).' });
  });
  G('11-integral', 2, function () {
    var q = R.pick([['e^x', 'e^x', ['{e^{x+1}/x + 1}', 'ln x', 'x * e^x']], ['sin x', '-cos x', ['cos x', '-sin x', 'tan x']], ['cos x', 'sin x', ['-sin x', '-cos x', 'tan x']], ['{1/x}$ (für $x > 0$)$', 'ln x', ['-{1/x^2}', '{1/x^2}', 'e^x']]]);
    var name = q[0].indexOf('$') >= 0 ? '${1/x}$ (für $x > 0$)' : '$' + q[0] + '$';
    return MC('Welche Funktion ist eine Stammfunktion von $f(x) =$ ' + name + '?', '$F(x) = ' + q[1] + '$', q[2].map(function (x) { return '$F(x) = ' + x + '$'; }), { sol: 'Probe durch Ableiten: $(' + q[1] + ')′$ ergibt wieder $f(x)$.', hint: 'Welche Funktion hat die gegebene Funktion als Ableitung?' });
  });
  G('11-integral', 2, function () {
    var a = R.int(0, 2), b = a + R.int(1, 2), k = R.pick([1, 2, 3]);
    return NUM('$F(x) = ' + M.co(k, 'x^3') + '$ ist eine Stammfunktion von $f$. Berechne $int(' + a + ',' + b + ') f(x) dx$.', k * (b * b * b - a * a * a), { sol: 'Hauptsatz: $F(' + b + ') - F(' + a + ') = ' + k * b * b * b + ' - ' + k * a * a * a + ' = ' + k * (b * b * b - a * a * a) + '$', hint: 'Hauptsatz der Differential- und Integralrechnung: obere Grenze einsetzen minus untere Grenze einsetzen.' });
  });
  G('11-integral', 2, function () {
    var v = R.bool(), b = R.int(1, 3), r = R.int(1, 3);
    if (v) return NUM('Wie groß ist die Fläche zwischen dem Graphen von $f(x) = 3x^2$ und der $x$-Achse im Intervall von 0 bis ' + b + '?', b * b * b, { sol: '$int(0,' + b + ') 3x^2 dx = ' + b + '^3 - 0 = ' + b * b * b + '$. Der Graph liegt oberhalb der $x$-Achse, also ist das der Flächeninhalt.', hint: 'Eine Stammfunktion von $3x^2$ ist $x^3$.' });
    return NUM('Wie groß ist die Fläche, die der Graph von $f(x) = ' + r * r + ' - x^2$ mit der $x$-Achse einschließt? (ganze Zahl oder Bruch)', F(4 * r * r * r, 3), { reduced: true, sol: 'Nullstellen: $x = -' + r + '$ und $x = ' + r + '$. $F(x) = ' + r * r + 'x - {x^3/3}$. $F(' + r + ') - F(-' + r + ') = 2 * (' + r * r * r + ' - {' + r * r * r + '/3}) = ' + fs(F(4 * r * r * r, 3)) + '$', hint: 'Die Integrationsgrenzen sind die Nullstellen (quadratische Gleichung, Klasse 9).' });
  });
  G('11-integral', 3, function () {
    var q = R.pick([['int(-1,1) x^3 dx', 0, 'Der Graph ist punktsymmetrisch zum Ursprung: Die Fläche unterhalb der $x$-Achse zählt negativ und hebt die obere auf.'], ['int(0,2π) sin x dx', 0, 'Eine volle Periode: Der Bogen über und der Bogen unter der $x$-Achse sind gleich groß.'], ['int(-2,2) x dx', 0, 'Punktsymmetrie: Die beiden Dreiecke heben sich auf.']]);
    return NUM('Berechne das Integral: $' + q[0] + '$', q[1], { sol: q[2] + ' Das Integral ist ein orientierter Flächeninhalt. Für den echten Flächeninhalt müsste man an der Nullstelle aufteilen.', hint: 'Flächen unterhalb der $x$-Achse zählt das Integral negativ.' });
  });
  G('11-integral', 3, function () {
    var k = R.int(1, 4), t = R.int(2, 6), v = R.bool();
    if (v) return NUM('Ein Körper bewegt sich mit der Geschwindigkeit $v(t) = ' + 2 * k + 't$ (in Metern pro Sekunde). Welchen Weg legt er in den ersten ' + t + ' Sekunden zurück?', k * t * t, { unit: 'm', sol: 'Der Weg ist das Integral der Geschwindigkeit: $int(0,' + t + ') ' + 2 * k + 't dt = ' + k + ' * ' + t + '^2 = ' + k * t * t + '$ m. Aus der Änderungsrate wird der Bestand rekonstruiert.', hint: 'Die Geschwindigkeit ist die Änderungsrate des Weges – integriere sie.' });
    return NUM('In einen Kessel fließen gleichmäßig ' + k + ' Liter pro Minute. Wie viele Liter kommen in ' + t * 5 + ' Minuten dazu?', k * t * 5, { unit: 'Liter', sol: 'Konstante Änderungsrate: $int(0,' + t * 5 + ') ' + k + ' dt = ' + k + ' * ' + t * 5 + ' = ' + k * t * 5 + '$ Liter – der Flächeninhalt eines Rechtecks.', hint: 'Bestand = Änderungsrate mal Zeit, wenn die Rate konstant ist.' });
  });
  G('11-integral', 2, function () {
    var st = R.pick([['Ist $F$ eine Stammfunktion von $f$, dann ist auch $F + 5$ eine Stammfunktion von $f$.', true, 'Die Konstante fällt beim Ableiten weg.'], ['Das bestimmte Integral kann negativ sein.', true, 'Flächen unterhalb der $x$-Achse zählen negativ.'], ['Integrieren ist die Umkehrung des Differenzierens.', true, 'Das ist die Aussage des Hauptsatzes.'], ['Eine Stammfunktion von $f(x) = x^2$ ist $F(x) = 2x$.', false, '$2x$ ist die Ableitung. Eine Stammfunktion ist ${x^3/3}$.'], ['$int(a,a) f(x) dx = 0$', true, 'Ein Intervall der Breite 0 hat keinen Flächeninhalt.'], ['Jede Funktion hat genau eine Stammfunktion.', false, 'Mit $F$ ist auch $F + c$ für jede Konstante $c$ eine Stammfunktion.']]);
    return TF('Wahr oder falsch? ' + st[0], st[1], { sol: st[2] });
  });

  /* ---------- 11-matrix ---------- */
  function m2() { return [R.int(-3, 4), R.int(-3, 4), R.int(-3, 4), R.int(-3, 4)]; }
  function MT(a) { return 'mat(' + a[0] + ',' + a[1] + ';' + a[2] + ',' + a[3] + ')'; }
  G('11-matrix', 1, function () {
    var a = m2(), v = [R.nz(-3, 4), R.nz(-3, 4)];
    return GAP('Berechne das Produkt: $' + MT(a) + ' * ' + V(v) + '$', [{ pre: 'oben:', ans: a[0] * v[0] + a[1] * v[1] }, { pre: 'unten:', ans: a[2] * v[0] + a[3] * v[1] }], { sol: 'Zeile mal Spalte. Oben: $' + a[0] + ' * ' + par(v[0]) + ' + ' + par(a[1]) + ' * ' + par(v[1]) + ' = ' + (a[0] * v[0] + a[1] * v[1]) + '$. Unten: $' + a[2] + ' * ' + par(v[0]) + ' + ' + par(a[3]) + ' * ' + par(v[1]) + ' = ' + (a[2] * v[0] + a[3] * v[1]) + '$.', hint: 'Jede Zeile der Matrix wird mit dem Vektor multipliziert: Eintrag mal Eintrag, dann addieren.' });
  });
  G('11-matrix', 1, function () {
    var t3 = R.pick([[2, 3, 1], [2, 3, 4], [3, 2, 4], [4, 2, 3], [3, 4, 2], [2, 4, 3], [4, 3, 2], [3, 2, 1], [4, 3, 1], [2, 4, 1]]), m = t3[0], n = t3[1], k = t3[2], v = R.int(0, 2);
    if (v === 0) return NUM('Eine Matrix hat ' + m + ' Zeilen und ' + n + ' Spalten. Wie viele Einträge hat sie?', m * n, { sol: '$' + m + ' * ' + n + ' = ' + m * n + '$ Einträge. Man nennt sie eine $(' + m + ',' + n + ')$-Matrix.', hint: 'Zeilen mal Spalten.' });
    if (v === 1) { var ok = R.bool(), n2 = ok ? n : n + 1; return TF('Kann man eine $(' + m + ',' + n + ')$-Matrix mit einer $(' + n2 + ',' + k + ')$-Matrix multiplizieren (in dieser Reihenfolge)?', ok, { sol: 'Die Spaltenzahl der ersten (' + n + ') muss gleich der Zeilenzahl der zweiten (' + n2 + ') sein. ' + (ok ? 'Das passt – das Ergebnis ist eine $(' + m + ',' + k + ')$-Matrix.' : 'Das passt nicht.'), hint: 'Die „inneren“ Zahlen müssen übereinstimmen.' }); }
    return MC('Eine $(' + m + ',' + n + ')$-Matrix wird mit einer $(' + n + ',' + k + ')$-Matrix multipliziert. Welchen Typ hat das Ergebnis?', '$(' + m + ',' + k + ')$', ['$(' + n + ',' + n + ')$', '$(' + k + ',' + m + ')$', '$(' + m * n + ',' + k + ')$', '$(' + n + ',' + k + ')$', '$(' + m + ',' + n + ')$'], { sol: 'Die äußeren Zahlen bleiben: $(' + m + ',' + n + ') * (' + n + ',' + k + ')$ ergibt $(' + m + ',' + k + ')$.', hint: 'Typ $(m,n)$ mal Typ $(n,k)$ ergibt Typ $(m,k)$.' });
  });
  G('11-matrix', 2, function () {
    var a = m2(), b = m2(), i = R.int(0, 3), prod = [a[0] * b[0] + a[1] * b[2], a[0] * b[1] + a[1] * b[3], a[2] * b[0] + a[3] * b[2], a[2] * b[1] + a[3] * b[3]];
    var row = Math.floor(i / 2), col = i % 2;
    return NUM('Berechne das Produkt $' + MT(a) + ' * ' + MT(b) + '$. Welche Zahl steht im Ergebnis in Zeile ' + (row + 1) + ', Spalte ' + (col + 1) + '?', prod[i], { sol: 'Zeile ' + (row + 1) + ' der ersten Matrix mal Spalte ' + (col + 1) + ' der zweiten: $' + par(a[2 * row]) + ' * ' + par(b[col]) + ' + ' + par(a[2 * row + 1]) + ' * ' + par(b[2 + col]) + ' = ' + prod[i] + '$. Das ganze Ergebnis: $' + MT(prod) + '$', hint: 'Der Eintrag in Zeile $i$, Spalte $j$ entsteht aus Zeile $i$ der ersten und Spalte $j$ der zweiten Matrix.' });
  });
  G('11-matrix', 2, function () {
    var a = [R.int(1, 5), R.nz(-4, 5), R.nz(-4, 5), R.int(1, 5)], x = R.nz(-3, 4), y = R.nz(-3, 4);
    if (a[1] === a[2] || a[0] === a[1] || a[2] === a[3] || a[0] * a[3] === a[1] * a[2]) return null;
    return MC('Welche Koeffizientenmatrix gehört zum Gleichungssystem?<br>I: $' + M.sum([M.co(a[0], 'x'), M.co(a[1], 'y')]) + ' = ' + (a[0] * x + a[1] * y) + '$<br>II: $' + M.sum([M.co(a[2], 'x'), M.co(a[3], 'y')]) + ' = ' + (a[2] * x + a[3] * y) + '$', '$' + MT(a) + '$', ['$' + MT([a[0], a[2], a[1], a[3]]) + '$', '$' + MT([a[0], a[1], a[0] * x + a[1] * y, a[3]]) + '$', '$' + MT([a[1], a[0], a[3], a[2]]) + '$'], { sol: 'In jeder Zeile stehen die Faktoren vor $x$ und $y$ einer Gleichung: $' + MT(a) + ' * vec(x;y) = vec(' + (a[0] * x + a[1] * y) + ';' + (a[2] * x + a[3] * y) + ')$', hint: 'Zeile 1 gehört zu Gleichung I, Zeile 2 zu Gleichung II; Spalte 1 zu $x$, Spalte 2 zu $y$.' });
  });
  G('11-matrix', 2, function () {
    var q = R.pick([[[0, -1, 1, 0], 'Drehung um 90° gegen den Uhrzeigersinn'], [[-1, 0, 0, -1], 'Drehung um 180°'], [[1, 0, 0, -1], 'Spiegelung an der $x$-Achse'], [[-1, 0, 0, 1], 'Spiegelung an der $y$-Achse'], [[2, 0, 0, 2], 'Streckung mit dem Faktor 2']]), p = [R.int(1, 4), R.int(1, 4)];
    return GAP('Die Matrix $' + MT(q[0]) + '$ beschreibt eine Abbildung der Ebene. Auf welchen Punkt wird $P(' + p[0] + '|' + p[1] + ')$ abgebildet?', [{ pre: '$x =$', ans: q[0][0] * p[0] + q[0][1] * p[1] }, { pre: '$y =$', ans: q[0][2] * p[0] + q[0][3] * p[1] }], { sol: '$' + MT(q[0]) + ' * ' + V(p) + ' = vec(' + (q[0][0] * p[0] + q[0][1] * p[1]) + ';' + (q[0][2] * p[0] + q[0][3] * p[1]) + ')$. Die Matrix beschreibt eine ' + q[1] + '.', hint: 'Multipliziere die Matrix mit dem Ortsvektor des Punktes.' });
  });
  G('11-matrix', 3, function () {
    var x = R.nz(-3, 4), y = R.nz(-3, 4), z = R.nz(-3, 4), a = R.int(1, 3), b = R.int(1, 3), c = R.int(1, 3);
    return GAP('Das Gleichungssystem ist schon in Dreiecksform. Löse es von unten nach oben.<br>I: $x + ' + M.co(a, 'y') + ' + ' + M.co(b, 'z') + ' = ' + (x + a * y + b * z) + '$<br>II: $y + ' + M.co(c, 'z') + ' = ' + (y + c * z) + '$<br>III: $z = ' + z + '$', comp([x, y, z]), { sol: 'III: $z = ' + z + '$. In II: $y = ' + (y + c * z) + ' - ' + c + ' * ' + par(z) + ' = ' + y + '$. In I: $x = ' + (x + a * y + b * z) + ' - ' + a + ' * ' + par(y) + ' - ' + b + ' * ' + par(z) + ' = ' + x + '$.', hint: 'Rückwärtseinsetzen: erst $z$, dann $y$, dann $x$.' });
  });
  G('11-matrix', 3, function () {
    var k = R.int(2, 4), a = R.int(1, 4), b = R.nz(-3, 4);
    return MC('Gauß-Verfahren: I: $x + ' + M.co(a, 'y') + ' = ' + (a + 2) + '$ und II: $' + k + 'x + ' + M.co(k * a + b, 'y') + ' = ' + (k * (a + 2) + b) + '$. Welche Umformung beseitigt $x$ aus Gleichung II?', 'II − ' + k + ' · I', ['II + ' + k + ' · I', 'II − I', 'I − ' + k + ' · II'], { sol: '$' + k + 'x - ' + k + ' * x = 0$. Es bleibt $' + M.co(b, 'y') + ' = ' + b + '$, also $y = 1$ und $x = 2$. Das ist das Additionsverfahren aus Klasse 8, systematisch angewendet.', hint: 'Welches Vielfache von I muss man von II abziehen, damit $x$ wegfällt?' });
  });
  G('11-matrix', 2, function () {
    var st = R.pick([['Für Matrizen gilt immer $A * B = B * A$.', false, 'Die Matrizenmultiplikation ist im Allgemeinen nicht kommutativ – anders als bei Zahlen (Klasse 5).'], ['Ein lineares Gleichungssystem lässt sich in der Form $A * x = b$ schreiben.', true, '$A$ enthält die Koeffizienten, $x$ die Unbekannten, $b$ die rechten Seiten.'], ['Beim Gauß-Verfahren darf man ein Vielfaches einer Zeile zu einer anderen addieren.', true, 'Das ändert die Lösungsmenge nicht – eine Äquivalenzumformung.'], ['Zwei Matrizen kann man immer miteinander multiplizieren.', false, 'Die Spaltenzahl der ersten muss gleich der Zeilenzahl der zweiten sein.'], ['Das Produkt einer $(2,3)$-Matrix mit einer $(3,1)$-Matrix hat zwei Einträge.', true, 'Das Ergebnis ist vom Typ $(2,1)$.']]);
    return TF('Wahr oder falsch? ' + st[0], st[1], { sol: st[2] });
  });

  /* ---------- 11-vektor ---------- */
  G('11-vektor', 1, function () {
    var A = vecn(), d = vecn(), B = [A[0] + d[0], A[1] + d[1], A[2] + d[2]];
    return GAP('Bestimme den Verbindungsvektor von $A(' + A.join('|') + ')$ nach $B(' + B.join('|') + ')$.', comp(d), { sol: '„Spitze minus Fuß“: $' + V(B.map(function (b, i) { return b + ' - ' + par(A[i]); })) + ' = ' + V(d) + '$', hint: 'Koordinaten von $B$ minus Koordinaten von $A$.' });
  });
  G('11-vektor', 1, function () {
    var a = vecn(), b = vecn(), plus = R.bool(), r = a.map(function (x, i) { return plus ? x + b[i] : x - b[i]; });
    return GAP('Berechne: $' + V(a) + (plus ? ' + ' : ' - ') + V(b) + '$', comp(r), { sol: 'Koordinatenweise rechnen: $' + V(r) + '$', hint: 'Vektoren werden koordinatenweise addiert und subtrahiert.' });
  });
  G('11-vektor', 1, function () {
    var a = vecn(), k = R.pick([2, 3, -1, -2, 4]), r = a.map(function (x) { return k * x; });
    return GAP('Berechne: $' + k + ' * ' + V(a) + '$', comp(r), { sol: 'Jede Koordinate wird mit $' + k + '$ multipliziert: $' + V(r) + '$. Der Vektor wird ' + (k < 0 ? 'umgedreht und ' : '') + (Math.abs(k) === 1 ? 'behält seine Länge.' : Math.abs(k) + '-mal so lang.'), hint: 'Jede Koordinate einzeln multiplizieren.' });
  });
  var QUAD = [[2, 3, 6, 7], [1, 2, 2, 3], [2, 6, 9, 11], [4, 4, 7, 9], [1, 4, 8, 9], [3, 4, 12, 13], [2, 10, 11, 15], [6, 6, 7, 11], [0, 3, 4, 5]];
  G('11-vektor', 2, function () {
    var q = R.pick(QUAD), s = R.shuffle([q[0], q[1], q[2]]).map(function (x) { return R.bool() ? x : -x; });
    return NUM('Berechne den Betrag (die Länge) des Vektors $' + V(s) + '$.', q[3], { sol: '$sqrt(' + s.map(function (x) { return par(x) + '^2'; }).join(' + ') + ') = sqrt(' + s.map(function (x) { return x * x; }).join(' + ') + ') = sqrt(' + q[3] * q[3] + ') = ' + q[3] + '$ – der Satz des Pythagoras im Raum (Raumdiagonale, Klasse 9).', hint: 'Betrag = Wurzel aus der Summe der Quadrate der Koordinaten.' });
  });
  G('11-vektor', 2, function () {
    var q = R.pick(QUAD), A = vecn(), s = R.shuffle([q[0], q[1], q[2]]), B = A.map(function (x, i) { return x + s[i]; });
    return NUM('Wie weit sind die Punkte $A(' + A.join('|') + ')$ und $B(' + B.join('|') + ')$ voneinander entfernt?', q[3], { sol: 'Verbindungsvektor: $' + V(s) + '$. Länge: $sqrt(' + s.map(function (x) { return x * x; }).join(' + ') + ') = ' + q[3] + '$', hint: 'Erst den Verbindungsvektor bestimmen, dann seinen Betrag.' });
  });
  G('11-vektor', 2, function () {
    var A = vecn(), h = vecn(), B = A.map(function (x, i) { return x + 2 * h[i]; }), Mi = A.map(function (x, i) { return x + h[i]; });
    return GAP('Bestimme den Mittelpunkt der Strecke von $A(' + A.join('|') + ')$ nach $B(' + B.join('|') + ')$.', comp(Mi), { sol: 'Jede Koordinate ist das arithmetische Mittel (Klasse 5): $M(' + Mi.join('|') + ')$', hint: 'Mittelwert der $x$-Koordinaten, der $y$-Koordinaten und der $z$-Koordinaten.' });
  });
  G('11-vektor', 2, function () {
    var p = vecn(), u = vecn(), t = R.pick([2, 3, -1, -2]), ok = R.bool(), P = p.map(function (x, i) { return x + t * u[i]; });
    if (!ok) P[2] += R.pick([1, -1, 2]);
    return TF('Liegt der Punkt $P(' + P.join('|') + ')$ auf der Geraden $g$ mit dem Stützvektor $' + V(p) + '$ und dem Richtungsvektor $' + V(u) + '$?', ok, { sol: 'Punktprobe: Es muss ein $t$ geben mit Stützvektor + $t$ · Richtungsvektor = Ortsvektor von $P$. Aus der ersten Koordinate: $t = ' + t + '$. ' + (ok ? 'Damit stimmen auch die anderen beiden Koordinaten.' : 'Die dritte Koordinate passt dann nicht.'), hint: 'Bestimme $t$ aus einer Koordinate und prüfe die anderen beiden.' });
  });
  G('11-vektor', 2, function () {
    var a = [R.int(1, 4), R.int(1, 3)], b = [R.int(1, 3), R.int(-3, -1)], r = [a[0] + b[0], a[1] + b[1]];
    return GAP('Die Pfeile zeigen die Vektoren $a$ (rot) und $b$ (blaugrün), aneinandergehängt. Welche Koordinaten hat der Summenvektor $a + b$ (violett)?', [{ pre: '$x =$', ans: r[0] }, { pre: '$y =$', ans: r[1] }], { fig: Fig.arrows({ x: [-1, 8], y: [-3, 5], w: 240, vec: [[0, 0, a[0], a[1], Fig.C.red, 'a'], [a[0], a[1], r[0], r[1], Fig.C.teal, 'b'], [0, 0, r[0], r[1], Fig.C.violet, '']] }), sol: '$a = ' + V(a) + '$, $b = ' + V(b) + '$. Summe koordinatenweise: $' + V(r) + '$. Zwei Verschiebungen nacheinander ergeben eine Gesamtverschiebung.', hint: 'Lies beide Vektoren am Gitter ab und addiere koordinatenweise.' });
  });
  G('11-vektor', 3, function () {
    var a = vecn(), k = R.pick([2, 3, -2, -1]), ok = R.bool(), b = a.map(function (x) { return k * x; });
    if (!ok) b[1] += R.pick([1, -1]);
    return TF('Sind die Vektoren $' + V(a) + '$ und $' + V(b) + '$ parallel (linear abhängig)?', ok, { sol: ok ? 'Der zweite Vektor ist das $' + par(k) + '$-Fache des ersten.' : 'Es gibt keine Zahl $k$, mit der man alle drei Koordinaten des ersten Vektors multiplizieren kann, um den zweiten zu erhalten.', hint: 'Ist der eine Vektor ein Vielfaches des anderen? Prüfe alle drei Koordinaten.' });
  });
  G('11-vektor', 3, function () {
    var p = vecn(), u = [R.nz(-2, 3), R.int(-2, 3), R.pick([1, 2])], t = R.pick([1, 2, 3]), zc = p[2] + t * u[2], S = p.map(function (x, i) { return x + t * u[i]; });
    return GAP('Die Gerade $g$ hat den Stützvektor $' + V(p) + '$ und den Richtungsvektor $' + V(u) + '$. In welchem Punkt durchstößt sie die Ebene $z = ' + zc + '$?', comp(S), { sol: '$z$-Koordinate: $' + p[2] + ' + t * ' + u[2] + ' = ' + zc + '$, also $t = ' + t + '$. Einsetzen: $S(' + S.join('|') + ')$', hint: 'Setze die $z$-Koordinate der Geradengleichung gleich ' + zc + ' und bestimme $t$.' });
  });

  /* ---------- 11-skalar ---------- */
  function dot(a, b) { return a[0] * b[0] + a[1] * b[1] + a[2] * b[2]; }
  function cross(a, b) { return [a[1] * b[2] - a[2] * b[1], a[2] * b[0] - a[0] * b[2], a[0] * b[1] - a[1] * b[0]]; }
  G('11-skalar', 1, function () {
    var a = vecn(), b = vecn();
    return NUM('Berechne das Skalarprodukt der Vektoren $' + V(a) + '$ und $' + V(b) + '$.', dot(a, b), { sol: '$' + a.map(function (x, i) { return par(x) + ' * ' + par(b[i]); }).join(' + ') + ' = ' + dot(a, b) + '$', hint: 'Entsprechende Koordinaten multiplizieren, dann addieren. Das Ergebnis ist eine Zahl.' });
  });
  G('11-skalar', 1, function () {
    var a = [R.nz(-3, 4), R.nz(-3, 4), R.nz(-3, 4)], ok = R.bool(), b = ok ? R.pick([[a[1], -a[0], 0], [0, a[2], -a[1]], [a[2], 0, -a[0]]]) : vecn();
    if (!ok && dot(a, b) === 0) b[0] += 1;
    return TF('Stehen die Vektoren $' + V(a) + '$ und $' + V(b) + '$ senkrecht aufeinander?', dot(a, b) === 0, { sol: 'Skalarprodukt: $' + a.map(function (x, i) { return par(x) + ' * ' + par(b[i]); }).join(' + ') + ' = ' + dot(a, b) + '$. ' + (dot(a, b) === 0 ? 'Es ist 0: orthogonal.' : 'Es ist nicht 0: nicht orthogonal.'), hint: 'Zwei Vektoren sind genau dann orthogonal, wenn ihr Skalarprodukt 0 ist.' });
  });
  G('11-skalar', 2, function () {
    var a = [R.nz(-4, 4), R.nz(-4, 4), R.pick([1, 2, -1, -2])], b0 = R.nz(-3, 4), b1 = R.nz(-3, 4), t = -(a[0] * b0 + a[1] * b1) / a[2];
    if (t % 1) return null;
    return NUM('Für welchen Wert von $t$ stehen die Vektoren $' + V(a) + '$ und $vec(' + b0 + ';' + b1 + ';t)$ senkrecht aufeinander?', t, { pre: '$t =$', sol: 'Skalarprodukt gleich 0 setzen: $' + a[0] * b0 + ' ' + sg(a[1] * b1) + ' ' + sg(a[2]).replace(/(\d+)$/, '$1') + 't = 0$, also $t = ' + t + '$.', hint: 'Orthogonalitätsbedingung: Skalarprodukt = 0. Das ergibt eine lineare Gleichung für $t$.' });
  });
  G('11-skalar', 2, function () {
    var q = R.pick([[[1, 0, 0], [1, 1, 0], 45, '{1/sqrt(2)}'], [[1, 1, 0], [0, 1, 1], 60, '{1/2}'], [[1, 0, 0], [0, 1, 0], 90, '0'], [[1, 0, 0], [-1, 0, 0], 180, '-1'], [[1, 1, 0], [1, -1, 0], 90, '0'], [[1, 0, 1], [0, 1, 1], 60, '{1/2}'], [[2, 0, 0], [3, 3, 0], 45, '{1/sqrt(2)}']]);
    return MCN('Welchen Winkel schließen die Vektoren $' + V(q[0]) + '$ und $' + V(q[1]) + '$ ein?', q[2], [30, 45, 60, 90, 120, 180], { fmt: function (x) { return x + '°'; }, sol: '$cos φ = {Skalarprodukt/Produkt der Beträge} = ' + q[3] + '$, also $φ = ' + q[2] + '°$.', hint: '$cos φ$ = Skalarprodukt geteilt durch das Produkt der Beträge. $cos 60° = {1/2}$, $cos 45° = {1/sqrt(2)}$, $cos 90° = 0$.' });
  });
  G('11-skalar', 2, function () {
    var a = [R.int(-2, 3), R.int(-2, 3), R.int(-2, 3)], b = [R.int(-2, 3), R.int(-2, 3), R.int(-2, 3)], c = cross(a, b);
    if (c[0] === 0 && c[1] === 0 && c[2] === 0) return null;
    return GAP('Berechne das Vektorprodukt (Kreuzprodukt) von $' + V(a) + '$ und $' + V(b) + '$.', comp(c), { sol: '$vec(' + par(a[1]) + ' * ' + par(b[2]) + ' - ' + par(a[2]) + ' * ' + par(b[1]) + ';' + par(a[2]) + ' * ' + par(b[0]) + ' - ' + par(a[0]) + ' * ' + par(b[2]) + ';' + par(a[0]) + ' * ' + par(b[1]) + ' - ' + par(a[1]) + ' * ' + par(b[0]) + ') = ' + V(c) + '$. Probe: Das Ergebnis steht senkrecht auf beiden Vektoren (Skalarprodukt 0).', hint: 'Erste Koordinate: $a_2 * b_3 - a_3 * b_2$. Dann zyklisch weiter: $a_3 * b_1 - a_1 * b_3$ und $a_1 * b_2 - a_2 * b_1$.' });
  });
  G('11-skalar', 2, function () {
    var x = R.int(2, 6), y = R.int(2, 6), tri = R.bool();
    return NUM('Die Vektoren $vec(' + x + ';0;0)$ und $vec(0;' + y + ';0)$ spannen ein ' + (tri ? 'Dreieck' : 'Parallelogramm') + ' auf. Wie groß ist sein Flächeninhalt?', tri ? x * y / 2 : x * y, { sol: 'Vektorprodukt: $vec(0;0;' + x * y + ')$ mit dem Betrag ' + x * y + ' – das ist der Flächeninhalt des Parallelogramms.' + (tri ? ' Das Dreieck ist die Hälfte: $' + de(x * y / 2) + '$.' : ''), hint: 'Der Betrag des Vektorprodukts ist der Flächeninhalt des aufgespannten Parallelogramms.' });
  });
  G('11-skalar', 3, function () {
    var q = R.pick([[[2, 2, 1], 9, 3], [[1, 2, 2], 6, 3], [[2, 3, 6], 14, 7], [[0, 3, 4], 10, 5], [[2, 1, 2], 3, 3]]), n = q[0], P = null, val = 0;
    for (var i = 0; i < 60 && !P; i++) {                 // Punkt suchen, dessen Abstand ganzzahlig ist
      var k = R.pick([1, 2, 3, -1, -2]), x = R.int(-3, 4), y = R.int(-3, 4), z = (q[1] + k * q[2] - n[0] * x - n[1] * y) / n[2];
      if (z % 1 === 0 && Math.abs(z) <= 12) { P = [x, y, z]; val = k * q[2]; }
    }
    if (!P) return null;
    return NUM('Wie groß ist der Abstand des Punktes $P(' + P.join('|') + ')$ von der Ebene $' + M.sum([M.co(n[0], 'x'), M.co(n[1], 'y'), M.co(n[2], 'z')]) + ' = ' + q[1] + '$?', Math.abs(val) / q[2], { sol: 'Der Normalenvektor $' + V(n) + '$ hat den Betrag ' + q[2] + '. Punkt einsetzen: $' + n[0] * P[0] + ' ' + sg(n[1] * P[1]) + ' ' + sg(n[2] * P[2]) + ' - ' + q[1] + ' = ' + val + '$. Abstand: ${|' + val + '|/' + q[2] + '} = ' + Math.abs(val) / q[2] + '$', hint: 'Setze den Punkt in die Ebenengleichung ein, ziehe die rechte Seite ab und teile den Betrag durch die Länge des Normalenvektors.' });
  });
  G('11-skalar', 3, function () {
    var u = [R.nz(-2, 3), R.int(-2, 3), 0], v = [0, R.nz(-2, 3), R.nz(-2, 3)], n = cross(u, v);
    if (n[0] === 0 && n[1] === 0 && n[2] === 0) return null;
    var w1 = [n[0] + 1, n[1], n[2]], w2 = [u[0] + v[0], u[1] + v[1], u[2] + v[2]], w3 = [n[1], n[0], n[2] + 1];
    return MC('Eine Ebene wird von den Vektoren $' + V(u) + '$ und $' + V(v) + '$ aufgespannt. Welcher Vektor ist ein Normalenvektor der Ebene?', '$' + V(n) + '$', ['$' + V(w1) + '$', '$' + V(w2) + '$', '$' + V(w3) + '$'].filter(function (o) { var w = o === '$' + V(w1) + '$' ? w1 : o === '$' + V(w2) + '$' ? w2 : w3; return !(dot(w, u) === 0 && dot(w, v) === 0); }), { sol: 'Das Vektorprodukt der Spannvektoren steht senkrecht auf beiden: $' + V(n) + '$. Probe: Beide Skalarprodukte sind 0.', hint: 'Ein Normalenvektor steht senkrecht auf beiden Spannvektoren – prüfe mit dem Skalarprodukt.' });
  });
  G('11-skalar', 2, function () {
    var st = R.pick([['Das Skalarprodukt zweier Vektoren ist eine Zahl.', true, 'Daher der Name: Ein Skalar ist eine Zahl.'], ['Das Vektorprodukt zweier Vektoren ist eine Zahl.', false, 'Es ist ein Vektor, der senkrecht auf beiden steht.'], ['Ist das Skalarprodukt zweier Vektoren 0 (und keiner der Nullvektor), stehen sie senkrecht aufeinander.', true, 'Das ist die Orthogonalitätsbedingung.'], ['Das Skalarprodukt eines Vektors mit sich selbst ist das Quadrat seines Betrags.', true, '$x^2 + y^2 + z^2$ – Pythagoras.'], ['Der Normalenvektor einer Ebene liegt in der Ebene.', false, 'Er steht senkrecht auf der Ebene.'], ['Ist das Skalarprodukt negativ, schließen die Vektoren einen stumpfen Winkel ein.', true, 'Dann ist $cos φ$ negativ.']]);
    return TF('Wahr oder falsch? ' + st[0], st[1], { sol: st[2] });
  });

  /* ---------- 11-binomial ---------- */
  G('11-binomial', 1, function () {
    var n = R.int(4, 8), k = R.int(1, Math.min(3, n - 1));
    return NUM('Berechne den Binomialkoeffizienten $binom(' + n + ',' + k + ')$.', M.binom(n, k), { sol: '$binom(' + n + ',' + k + ') = {' + Array.apply(null, Array(k)).map(function (_, i) { return n - i; }).join(' * ') + '/' + Array.apply(null, Array(k)).map(function (_, i) { return k - i; }).join(' * ') + '} = ' + M.binom(n, k) + '$ – so viele Möglichkeiten gibt es, aus ' + n + ' Plätzen ' + k + ' auszuwählen (geschicktes Zählen, Klasse 8).', hint: '$binom(n,k) = {n!/k! * (n - k)!}$' });
  });
  G('11-binomial', 1, function () {
    var n = R.pick([10, 20, 50, 100, 200, 60]), p = R.pick([[1, 2], [1, 4], [1, 5], [1, 10], [3, 10], [1, 6]]);
    if (n * p[0] % p[1]) return null;
    return NUM('Eine Bernoulli-Kette hat die Länge $n = ' + n + '$ und die Trefferwahrscheinlichkeit $p = {' + p[0] + '/' + p[1] + '}$. Wie viele Treffer sind zu erwarten?', n * p[0] / p[1], { sol: '$μ = n * p = ' + n + ' * {' + p[0] + '/' + p[1] + '} = ' + n * p[0] / p[1] + '$', hint: 'Erwartungswert der Binomialverteilung: $μ = n * p$' });
  });
  G('11-binomial', 2, function () {
    var q = R.pick([[3, 1, 2, 2], [4, 1, 2, 2], [2, 1, 3, 1], [3, 1, 3, 1], [3, 1, 4, 0], [4, 1, 2, 1], [3, 1, 2, 0], [2, 2, 3, 2], [3, 2, 3, 2], [4, 1, 2, 3]]), n = q[0], p = F(q[1], q[2]), k = q[3];
    var res = F(M.binom(n, k) * Math.pow(q[1], k) * Math.pow(q[2] - q[1], n - k), Math.pow(q[2], n));
    return NUM('$X$ ist binomialverteilt mit $n = ' + n + '$ und $p = ' + fs(p) + '$. Berechne $P(X = ' + k + ')$. (Bruch oder Dezimalzahl)', res, { sol: '$binom(' + n + ',' + k + ') * (' + fs(p) + ')^' + k + ' * (' + fs(F(q[2] - q[1], q[2])) + ')^' + (n - k) + ' = ' + M.binom(n, k) + ' * {' + Math.pow(q[1], k) * Math.pow(q[2] - q[1], n - k) + '/' + Math.pow(q[2], n) + '} = ' + fs(res) + '$', hint: 'Formel von Bernoulli: $binom(n,k) * p^k * (1 - p)^{n-k}$' });
  });
  G('11-binomial', 2, function () {
    var q = R.pick([[100, 0.5, 5], [36, 0.5, 3], [64, 0.5, 4], [400, 0.2, 8], [100, 0.1, 3], [100, 0.2, 4], [48, 0.25, 3], [400, 0.5, 10], [225, 0.2, 6]]);
    return NUM('Berechne die Standardabweichung einer binomialverteilten Zufallsgröße mit $n = ' + q[0] + '$ und $p = ' + de(q[1]) + '$.', q[2], { tol: 0.001, sol: '$σ = sqrt(n * p * (1 - p)) = sqrt(' + q[0] + ' * ' + de(q[1]) + ' * ' + de(1 - q[1]) + ') = sqrt(' + de(q[0] * q[1] * (1 - q[1])) + ') = ' + q[2] + '$', hint: '$σ = sqrt(n * p * (1 - p))$' });
  });
  G('11-binomial', 2, function () {
    var q = R.pick([['Ein Würfel wird 10-mal geworfen; gezählt wird, wie oft eine Sechs fällt.', true, 'Zwei Ausgänge (Sechs oder nicht), gleiche Wahrscheinlichkeit, unabhängige Würfe.'], ['Aus einer Urne mit 3 roten und 2 blauen Kugeln wird 3-mal ohne Zurücklegen gezogen; gezählt werden die roten.', false, 'Ohne Zurücklegen ändert sich die Trefferwahrscheinlichkeit von Zug zu Zug.'], ['Eine Münze wird 20-mal geworfen; gezählt wird, wie oft Kopf fällt.', true, 'Jeder Wurf ist ein Bernoulli-Experiment mit $p = {1/2}$.'], ['Aus einer Urne wird 5-mal mit Zurücklegen gezogen; gezählt werden die roten Kugeln.', true, 'Mit Zurücklegen bleibt die Trefferwahrscheinlichkeit gleich.'], ['Ein Würfel wird 5-mal geworfen; notiert wird die Summe der Augenzahlen.', false, 'Es gibt nicht nur zwei Ausgänge „Treffer“ und „Niete“.']]);
    return TF('Liegt eine Bernoulli-Kette vor? ' + q[0], q[1], { sol: q[2], hint: 'Bernoulli-Kette: nur zwei Ausgänge, immer dieselbe Trefferwahrscheinlichkeit, unabhängige Versuche.' });
  });
  G('11-binomial', 2, function () {
    var n = R.int(4, 7), k = R.int(2, 3);
    return NUM('Eine Bernoulli-Kette hat die Länge ' + n + '. Wie viele Pfade im Baumdiagramm haben genau ' + k + ' Treffer?', M.binom(n, k), { sol: 'Aus ' + n + ' Stufen werden die ' + k + ' Trefferstufen ausgewählt: $binom(' + n + ',' + k + ') = ' + M.binom(n, k) + '$. Jeder dieser Pfade hat die Wahrscheinlichkeit $p^' + k + ' * (1 - p)^' + (n - k) + '$.', hint: 'Auf wie viele Arten kann man die Trefferstufen auswählen? (Binomialkoeffizient)' });
  });
  G('11-binomial', 3, function () {
    var q = R.pick([[3, 'höchstens einen Treffer', F(1, 2), 'P(X = 0) + P(X = 1) = {1/8} + {3/8}'], [3, 'mindestens zwei Treffer', F(1, 2), 'P(X = 2) + P(X = 3) = {3/8} + {1/8}'], [4, 'höchstens einen Treffer', F(5, 16), 'P(X = 0) + P(X = 1) = {1/16} + {4/16}'], [4, 'mindestens drei Treffer', F(5, 16), 'P(X = 3) + P(X = 4) = {4/16} + {1/16}'], [4, 'mindestens einen Treffer', F(15, 16), '1 - P(X = 0) = 1 - {1/16}'], [3, 'mindestens einen Treffer', F(7, 8), '1 - P(X = 0) = 1 - {1/8}']]);
    return NUM('$X$ ist binomialverteilt mit $n = ' + q[0] + '$ und $p = {1/2}$. Wie groß ist die Wahrscheinlichkeit für ' + q[1] + '? (Bruch oder Dezimalzahl)', q[2], { sol: '$' + q[3] + ' = ' + fs(q[2]) + '$', hint: 'Addiere die Einzelwahrscheinlichkeiten der passenden Trefferzahlen – oder nutze das Gegenereignis.' });
  });
  G('11-binomial', 3, function () {
    var q = R.pick([['Was bedeutet ein Signifikanzniveau von 5 % bei einem Hypothesentest?', 'Die Wahrscheinlichkeit, eine zutreffende Nullhypothese irrtümlich abzulehnen, beträgt höchstens 5 %.', ['Die Nullhypothese ist mit 5 % Wahrscheinlichkeit wahr.', 'Der Test wird in 5 % der Fälle nicht durchgeführt.', '5 % der Stichprobe sind fehlerhaft.']], ['Was ist der Ablehnungsbereich eines Hypothesentests?', 'Die Menge der Stichprobenergebnisse, bei denen man die Nullhypothese verwirft.', ['Die Menge der Ergebnisse, bei denen die Nullhypothese sicher falsch ist.', 'Der Bereich, in dem der Erwartungswert liegt.', 'Alle Ergebnisse, die kleiner als der Erwartungswert sind.']], ['Ein Testergebnis fällt nicht in den Ablehnungsbereich. Was folgt daraus?', 'Die Nullhypothese wird nicht verworfen – bewiesen ist sie damit aber nicht.', ['Die Nullhypothese ist bewiesen.', 'Die Nullhypothese ist widerlegt.', 'Der Test war ungültig.']]]);
    return MC(q[0], q[1], q[2], { sol: q[1] + ' Beurteilende Statistik schließt von der Stichprobe auf die Grundgesamtheit – immer mit einer Restunsicherheit.', hint: 'Ein Test liefert keine Gewissheit, sondern eine begründete Entscheidung mit begrenztem Irrtumsrisiko.' });
  });
})(typeof window !== 'undefined' ? window : globalThis);

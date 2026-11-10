/* Silberzirkel – Aufgaben Klasse 7 (Lehrplan Sachsen, Gymnasium). */
(function (g) {
  'use strict';
  var SZ = g.SZ, R = SZ.R, M = SZ.M, G = SZ.G, MC = SZ.MC, MCN = SZ.MCN, MCF = SZ.MCF, NUM = SZ.NUM, GAP = SZ.GAP, TF = SZ.TF, ORD = SZ.ORD, Fig = SZ.Fig, de = M.de, F = M.F, fs = M.fs, par = M.par;

  /* ---------- 7-rational ---------- */
  G('7-rational', 1, function () {
    var a = R.nz(-12, 12), b = R.nz(-12, 12), v = R.int(0, 2), q, r, sol;
    if (v === 0) { q = a + ' + ' + par(b); r = a + b; sol = b < 0 ? 'Eine negative Zahl addieren heißt ihren Betrag subtrahieren: $' + a + ' - ' + (-b) + ' = ' + r + '$' : 'Gehe auf der Zahlengeraden von ' + de(a) + ' aus ' + b + ' Schritte nach rechts: $' + r + '$'; }
    else if (v === 1) { q = a + ' - ' + par(b); r = a - b; sol = 'Subtrahieren heißt die Gegenzahl addieren: $' + a + ' + ' + par(-b) + ' = ' + r + '$'; }
    else { a = -Math.abs(a); b = Math.abs(b); q = a + ' - ' + b; r = a - b; sol = 'Von ' + de(a) + ' aus ' + b + ' Schritte nach links: $' + r + '$'; }
    return NUM('Berechne: $' + q + '$', r, { sol: sol, hint: 'Stell dir die Zahlengerade vor: Addieren einer positiven Zahl geht nach rechts, Subtrahieren nach links.' });
  });
  G('7-rational', 1, function () {
    var a = R.nz(-9, 9), b = R.nz(-9, 9), mul = R.bool();
    if (a > 0 && b > 0) a = -a;
    var q = mul ? par(a) + ' * ' + par(b) : par(a * b) + ' : ' + par(b), r = mul ? a * b : a;
    var s1 = mul ? (a < 0) === (b < 0) : (a * b < 0) === (b < 0);
    return NUM('Berechne: $' + q + '$', r, { sol: (s1 ? 'Gleiche Vorzeichen ergeben Plus' : 'Verschiedene Vorzeichen ergeben Minus') + ': $' + r + '$', hint: 'Erst das Vorzeichen bestimmen, dann mit den Beträgen rechnen.' });
  });
  G('7-rational', 1, function () {
    var pool = R.sample([-7.5, -4, -2.5, -1, -0.5, 0, 0.5, 2, 3.5, -6, -3, 1.5, -10, 4], 4);
    pool.sort(function (x, y) { return x - y; });
    return ORD('Ordne die Zahlen. Beginne mit der kleinsten.', pool.map(function (x) { return '$' + de(x) + '$'; }), { sol: 'Auf der Zahlengeraden von links nach rechts. Bei negativen Zahlen gilt: je größer der Betrag, desto kleiner die Zahl.', hint: 'Minus 7 Grad ist kälter als minus 2 Grad.' });
  });
  G('7-rational', 2, function () {
    var x = R.pick([-7.5, -3, 4.2, -12, 0.75, -0.6, 9]), v = R.int(0, 2);
    if (v === 0) return NUM('Bestimme den Betrag: $|' + de(x) + '|$', Math.abs(x), { sol: 'Der Betrag ist der Abstand zur 0: $' + de(Math.abs(x)) + '$.', hint: 'Ein Abstand ist nie negativ.' });
    if (v === 1) return NUM('Wie lautet die Gegenzahl von $' + de(x) + '$?', -x, { sol: 'Gleicher Betrag, anderes Vorzeichen: $' + de(-x) + '$.', hint: 'Spiegle die Zahl am Nullpunkt.' });
    var a = R.int(2, 9), b = R.int(a + 1, 15);
    return NUM('Berechne: $|' + a + ' - ' + b + '| + |' + (-a) + '|$', (b - a) + a, { sol: '$|' + (a - b) + '| + |' + (-a) + '| = ' + (b - a) + ' + ' + a + ' = ' + b + '$', hint: 'Erst das Innere der Betragsstriche ausrechnen, dann den Betrag bilden.' });
  });
  G('7-rational', 2, function () {
    var v = R.int(0, 2);
    if (v === 0) { var a = F(-R.pick([1, 3]), R.pick([2, 4])), b = F(R.pick([1, 3, 5]), R.pick([4, 8])), r = M.fadd(a, b); if (r.n === 0) return null; return NUM('Berechne und kürze vollständig: $' + fs(a) + ' + ' + fs(b) + '$', r, { reduced: true, sol: 'Gleichnamig machen und Zähler mit Vorzeichen addieren: $' + fs(r) + '$', hint: 'Bruchrechnung aus Klasse 6 – jetzt mit Vorzeichen.' }); }
    if (v === 1) { var x = -R.int(1, 9) / 10, y = -R.int(1, 9) / 10; return NUM('Berechne: $(' + de(x) + ') * (' + de(y) + ')$', M.round(x * y, 2), { sol: 'Minus mal Minus ergibt Plus; $' + de(-x) + ' * ' + de(-y) + ' = ' + de(x * y) + '$', hint: 'Vorzeichen bestimmen, dann wie in Klasse 6 multiplizieren.' }); }
    var c = F(R.int(1, 5), R.pick([2, 3, 6])), d = F(-R.int(1, 5), R.pick([3, 4, 5])), p = M.fmul(c, d);
    return NUM('Berechne und kürze vollständig: $' + fs(c) + ' * (' + fs(d) + ')$', p, { reduced: true, sol: 'Verschiedene Vorzeichen: Minus. Zähler mal Zähler, Nenner mal Nenner: $' + fs(p) + '$', hint: 'Erst das Vorzeichen bestimmen.' });
  });
  G('7-rational', 2, function () {
    var lo = -R.int(2, 14), hi = R.int(1, 12), v = R.int(0, 1);
    if (v === 0) return NUM('Am Morgen zeigt das Thermometer auf dem Fichtelberg ' + de(lo) + ' °C, am Mittag ' + hi + ' °C. Um wie viel Grad ist die Temperatur gestiegen?', hi - lo, { unit: '°C', sol: '$' + hi + ' - (' + lo + ') = ' + hi + ' + ' + (-lo) + ' = ' + (hi - lo) + '$', hint: 'Unterschied = Endwert minus Anfangswert.' });
    var debt = R.int(15, 60), pay = R.int(20, 90);
    return NUM('Das Konto der Schülerzeitung steht bei ' + de(-debt) + ' Talern. Es werden ' + pay + ' Taler eingezahlt. Wie lautet der neue Kontostand?', pay - debt, { unit: 'Taler', sol: '$' + (-debt) + ' + ' + pay + ' = ' + (pay - debt) + '$', hint: 'Einzahlen heißt addieren.' });
  });
  G('7-rational', 2, function () {
    var a = -R.int(1, 4), x = a + R.int(1, 15) * 0.5;
    if (x > a + 8) x = a + 4.5;
    return NUM('Welche Zahl ist auf der Zahlengeraden markiert?', x, { fig: Fig.numline({ a: a - 1, b: a + 8, step: 1, sub: 2, marks: [{ x: x, l: '?' }] }), sol: 'Zwischen zwei ganzen Zahlen liegt jeweils ein kleiner Strich in der Mitte. Markiert ist $' + de(x) + '$.', hint: 'Links von der 0 stehen die negativen Zahlen.' });
  });
  G('7-rational', 3, function () {
    var a = R.nz(-5, 5), b = R.int(2, 9), c = R.int(b + 1, 14), d = R.nz(-6, 6), r = a * (b - c) + d;
    return NUM('Berechne: $' + a + ' * (' + b + ' - ' + c + ') + ' + par(d) + '$', r, { sol: 'Klammer: $' + b + ' - ' + c + ' = ' + (b - c) + '$. Punkt vor Strich: $' + a + ' * ' + par(b - c) + ' = ' + a * (b - c) + '$. Dann $' + a * (b - c) + ' + ' + par(d) + ' = ' + r + '$.', hint: 'Klammer – Punkt – Strich, wie in Klasse 5. Achte bei jedem Schritt auf das Vorzeichen.' });
  });
  G('7-rational', 3, function () {
    var st = R.pick([['Das Produkt zweier negativer Zahlen ist positiv.', true, 'Gleiche Vorzeichen ergeben Plus.'], ['Die Summe zweier negativer Zahlen ist positiv.', false, 'Gegenbeispiel: $-2 + (-3) = -5$.'], ['Von zwei negativen Zahlen ist diejenige größer, die den kleineren Betrag hat.', true, 'Sie liegt näher an der 0, also weiter rechts.'], ['Subtrahiert man eine negative Zahl, wird das Ergebnis größer.', true, 'Man addiert ihre Gegenzahl – eine positive Zahl.'], ['Der Betrag einer Zahl kann negativ sein.', false, 'Ein Abstand ist nie negativ.'], ['Jede Zahl ist größer als ihre Gegenzahl.', false, 'Gegenbeispiel: $-3$ ist kleiner als ihre Gegenzahl 3.'], ['Der Quotient aus einer negativen und einer positiven Zahl ist negativ.', true, 'Verschiedene Vorzeichen ergeben Minus.']]);
    return TF('Wahr oder falsch? ' + st[0], st[1], { sol: st[2] });
  });

  /* ---------- 7-potwurz ---------- */
  G('7-potwurz', 1, function () {
    var a = R.int(2, 9), br = R.bool();
    return NUM('Berechne: $' + (br ? '(-' + a + ')^2' : '-' + a + '^2') + '$', br ? a * a : -a * a, { sol: br ? 'Die Klammer wird quadriert: $(-' + a + ') * (-' + a + ') = ' + a * a + '$' : 'Ohne Klammer wird nur die ' + a + ' quadriert: $-(' + a + ' * ' + a + ') = ' + (-a * a) + '$', hint: 'Steht das Minus in der Klammer oder davor?' });
  });
  G('7-potwurz', 1, function () {
    var a = R.int(2, 20);
    return NUM('Berechne: $sqrt(' + a * a + ')$', a, { sol: '$' + a + '^2 = ' + a * a + '$, also $sqrt(' + a * a + ') = ' + a + '$.', hint: 'Welche Zahl ergibt mit sich selbst multipliziert ' + a * a + '? (Quadratzahlen aus Klasse 5)' });
  });
  G('7-potwurz', 2, function () {
    var v = R.int(0, 2);
    if (v === 0) { var b = -R.int(2, 5), e = R.int(3, 5), r = Math.pow(b, e); if (Math.abs(r) > 700) return null; return NUM('Berechne: $(' + b + ')^' + e + '$', r, { sol: (e % 2 ? 'Ungerader Exponent: Das Ergebnis ist negativ.' : 'Gerader Exponent: Das Ergebnis ist positiv.') + ' $' + (-b) + '^' + e + ' = ' + Math.pow(-b, e) + '$, also $' + r + '$.', hint: 'Zähle die Minuszeichen: Je zwei heben sich auf.' }); }
    if (v === 1) { var f = R.pick([[1, 2], [2, 3], [3, 4], [1, 3], [2, 5], [3, 5]]), neg = R.bool(), ex = R.pick([2, 3]), n = Math.pow(f[0], ex) * (neg && ex === 3 ? -1 : 1); return NUM('Berechne: $(' + (neg ? '-' : '') + '{' + f[0] + '/' + f[1] + '})^' + ex + '$', F(n, Math.pow(f[1], ex)), { reduced: true, sol: 'Zähler und Nenner einzeln potenzieren: $' + fs(F(n, Math.pow(f[1], ex))) + '$', hint: 'Potenziere Zähler und Nenner getrennt und achte auf das Vorzeichen.' }); }
    var x = R.pick([0.2, 0.3, 0.5, 1.1, 1.2, 0.4, 1.5, 0.1]);
    return NUM('Berechne: $' + de(x) + '^2$', M.round(x * x, 4), { sol: '$' + de(x) + ' * ' + de(x) + ' = ' + de(x * x) + '$', hint: 'Zwei Faktoren mit je einer Nachkommastelle – das Ergebnis hat zwei.' });
  });
  G('7-potwurz', 2, function () {
    if (R.bool()) { var a = R.pick([2, 3, 4, 5, 6, 7, 8, 9, 11, 12]); return NUM('Berechne: $sqrt(' + de(a * a / 100) + ')$', a / 10, { sol: '$' + de(a / 10) + ' * ' + de(a / 10) + ' = ' + de(a * a / 100) + '$', hint: 'Denke an die Quadratzahl ' + a * a + ' und setze das Komma passend.' }); }
    var p = R.pick([[1, 2], [2, 3], [3, 4], [4, 5], [5, 6], [3, 7], [7, 10], [2, 9]]);
    return NUM('Berechne: $sqrt({' + p[0] * p[0] + '/' + p[1] * p[1] + '})$', F(p[0], p[1]), { reduced: true, sol: 'Wurzel aus Zähler und Nenner einzeln ziehen: ${' + p[0] + '/' + p[1] + '}$', hint: 'Zähler und Nenner sind beide Quadratzahlen.' });
  });
  G('7-potwurz', 2, function () {
    var n = R.pick([10, 20, 30, 40, 50, 60, 70, 90, 110, 130, 150, 200]), lo = Math.floor(Math.sqrt(n));
    return MC('Zwischen welchen beiden natürlichen Zahlen liegt $sqrt(' + n + ')$?', lo + ' und ' + (lo + 1), [(lo - 1) + ' und ' + lo, (lo + 1) + ' und ' + (lo + 2), Math.floor(n / 2 - 1) + ' und ' + Math.floor(n / 2), (lo + 2) + ' und ' + (lo + 3)], { sol: '$' + lo + '^2 = ' + lo * lo + '$ und $' + (lo + 1) + '^2 = ' + (lo + 1) * (lo + 1) + '$. Dazwischen liegt ' + n + '.', hint: 'Suche die beiden benachbarten Quadratzahlen, zwischen denen ' + n + ' liegt.' });
  });
  G('7-potwurz', 3, function () {
    var b = -R.int(2, 9), e = R.int(6, 25);
    return MCF('Welches Vorzeichen hat $(' + b + ')^{' + e + '}$?', ['positiv', 'negativ', 'Das Ergebnis ist 0.'], e % 2 ? 1 : 0, { sol: 'Der Exponent ' + e + ' ist ' + (e % 2 ? 'ungerade: Ein Minuszeichen bleibt übrig – negativ.' : 'gerade: Die Minuszeichen heben sich paarweise auf – positiv.'), hint: 'Du musst nichts ausrechnen – zähle nur die Minuszeichen.' });
  });
  G('7-potwurz', 3, function () {
    var a = R.int(6, 25);
    return NUM('Ein Quadrat hat den Flächeninhalt $' + a * a + ' cm^2$. Wie groß ist sein Umfang?', 4 * a, { unit: 'cm', sol: 'Seitenlänge: $sqrt(' + a * a + ') = ' + a + '$ cm. Umfang: $4 * ' + a + ' = ' + 4 * a + '$ cm.', hint: 'Erst die Seitenlänge mit der Wurzel bestimmen (Flächenformel aus Klasse 5 rückwärts).' });
  });
  G('7-potwurz', 2, function () {
    var st = R.pick([['$sqrt(16) = -4$', false, 'Die Quadratwurzel ist als die nichtnegative Zahl festgelegt: $sqrt(16) = 4$.'], ['$sqrt(2)$ lässt sich als Bruch zweier natürlicher Zahlen schreiben.', false, '$sqrt(2)$ ist irrational: $1,41421...$ endet nie und wird nie periodisch.'], ['Das Quadrat einer rationalen Zahl ist nie negativ.', true, 'Plus mal Plus und Minus mal Minus ergeben beide Plus.'], ['$sqrt(9) + sqrt(16) = sqrt(25)$', false, '$3 + 4 = 7$, aber $sqrt(25) = 5$.'], ['$(-5)^2 = 5^2$', true, 'Beide ergeben 25.'], ['$sqrt(0) = 0$', true, '$0 * 0 = 0$'], ['Aus $-9$ kann man im Bereich der rationalen Zahlen die Quadratwurzel ziehen.', false, 'Kein Quadrat einer rationalen Zahl ist negativ.']]);
    return TF('Wahr oder falsch? ' + st[0], st[1], { sol: st[2] });
  });

  /* ---------- 7-zahlbereiche ---------- */
  var ZB = { 'ℕ': function (x) { return x >= 0 && x % 1 === 0; }, 'ℤ': function (x) { return x % 1 === 0; }, 'ℚ_{+}': function (x) { return x >= 0; }, 'ℚ': function () { return true; } };
  var ZN = [[-3, '-3'], [0.5, '0,5'], [7, '7'], [-0.5, '-{1/2}'], [0, '0'], [2, '{6/3}'], [-2.4, '-2,4'], [0.75, '{3/4}'], [-8, '-8'], [15, '15']];
  G('7-zahlbereiche', 1, function () {
    var z = R.pick(ZN), b = R.pick(['ℕ', 'ℤ', 'ℚ_{+}', 'ℚ']), ok = ZB[b](z[0]);
    return TF('Wahr oder falsch? $' + z[1] + ' ∈ ' + b + '$', ok, { sol: 'ℕ: 0, 1, 2, … &nbsp; ℤ: alle ganzen Zahlen &nbsp; $ℚ_{+}$: alle nichtnegativen Brüche &nbsp; ℚ: alle Brüche. $' + z[1] + '$ gehört ' + (ok ? '' : 'nicht ') + 'zu $' + b + '$.', hint: 'Ist die Zahl ganz? Ist sie negativ?' });
  });
  G('7-zahlbereiche', 1, function () {
    var z = R.pick([[-5, '-5', 1], [12, '12', 0], [-1.5, '-1,5', 2], [0.25, '{1/4}', 2], [-100, '-100', 1], [3, '{9/3}', 0], [-0.75, '-{3/4}', 2], [0, '0', 0]]);
    return MCF('Welcher ist der kleinste Zahlbereich, in dem $' + z[1] + '$ liegt?', ['ℕ (natürliche Zahlen)', 'ℤ (ganze Zahlen)', 'ℚ (rationale Zahlen)'], z[2], { sol: '$ℕ ⊂ ℤ ⊂ ℚ$. ' + ['Die Zahl ist eine natürliche Zahl.', 'Die Zahl ist ganz, aber negativ – also nicht natürlich.', 'Die Zahl ist nicht ganz – sie liegt erst in ℚ.'][z[2]], hint: 'Die Bereiche liegen ineinander: ℕ in ℤ in ℚ.' });
  });
  G('7-zahlbereiche', 2, function () {
    var all = R.sample([1, 2, 3, 4, 5, 6, 7, 8, 9], 6), A = all.slice(0, 4).sort(), B = all.slice(2, 6).sort(), inter = all.slice(2, 4).sort(), uni = all.slice().sort(), v = R.bool();
    function set(s) { return '{' + s.join('; ') + '}'; }
    return MC('$A$ = ' + set(A) + ' und $B$ = ' + set(B) + '. Bestimme $A ' + (v ? '∩' : '∪') + ' B$.', set(v ? inter : uni), [set(v ? uni : inter), set(A), set(B), set(all.slice(0, 2).sort())], { sol: v ? 'Schnittmenge: Elemente, die in beiden Mengen liegen: ' + set(inter) + '.' : 'Vereinigungsmenge: Elemente, die in mindestens einer Menge liegen: ' + set(uni) + '.', hint: '∩ heißt „in beiden“, ∪ heißt „in mindestens einer“.' });
  });
  G('7-zahlbereiche', 2, function () {
    var a = R.int(2, 9), b = R.int(a + 1, 15), v = R.int(0, 1);
    if (v === 0) return MC('Welche Aufgabe hat im Bereich ℕ der natürlichen Zahlen kein Ergebnis?', '$' + a + ' - ' + b + '$', ['$' + b + ' - ' + a + '$', '$' + a + ' * ' + b + '$', '$' + a * 3 + ' : 3$', '$' + a + ' + ' + b + '$'], { sol: '$' + a + ' - ' + b + ' = ' + (a - b) + '$ ist negativ. Dafür braucht man die ganzen Zahlen ℤ.', hint: 'Welche Rechnung führt aus ℕ hinaus?' });
    var n = R.pick([3, 5, 7, 9]), d = R.pick([2, 4]);
    return MC('Welche Aufgabe hat im Bereich ℤ der ganzen Zahlen kein Ergebnis?', '$' + n + ' : ' + d + '$', ['$' + n + ' - ' + (n + d) + '$', '$(-' + n + ') * ' + d + '$', '$(-' + n * d + ') : ' + d + '$', '$' + d + ' - ' + n + '$'], { sol: '$' + n + ' : ' + d + ' = ' + de(n / d) + '$ ist keine ganze Zahl. Dafür braucht man die rationalen Zahlen ℚ.', hint: 'In ℤ geht jede Subtraktion – aber nicht jede Division.' });
  });
  G('7-zahlbereiche', 2, function () {
    var st = R.pick([['$ℕ ⊂ ℤ$', true, 'Jede natürliche Zahl ist auch eine ganze Zahl.'], ['$ℤ ⊂ ℕ$', false, 'Gegenbeispiel: $-1$ ist ganz, aber nicht natürlich.'], ['$ℤ ⊂ ℚ$', true, 'Jede ganze Zahl ist ein Bruch mit dem Nenner 1.'], ['$ℚ_{+} ⊂ ℤ$', false, 'Gegenbeispiel: ${1/2}$ ist gebrochen, aber nicht ganz.'], ['$ℤ ⊂ ℚ_{+}$', false, 'Gegenbeispiel: $-2$ ist ganz, aber keine gebrochene Zahl.'], ['$ℕ ⊂ ℚ$', true, '$ℕ ⊂ ℤ ⊂ ℚ$'], ['Die Schnittmenge von ℤ und $ℚ_{+}$ ist ℕ.', true, 'Ganz und nicht negativ: Das sind genau die natürlichen Zahlen.'], ['In ℚ ist jede Division ausführbar, außer durch 0.', true, 'Man multipliziert mit dem Kehrwert.']]);
    return TF('Wahr oder falsch? ' + st[0], st[1], { sol: st[2] });
  });
  G('7-zahlbereiche', 3, function () {
    var sh = R.pick([['ab', '$A ∩ B$'], ['union', '$A ∪ B$'], ['onlyA', '$A$ ohne $B$'], ['onlyB', '$B$ ohne $A$']]);
    return MC('Welche Menge ist im Mengendiagramm gefärbt?', sh[1], ['$A ∩ B$', '$A ∪ B$', '$A$ ohne $B$', '$B$ ohne $A$'], { fig: Fig.venn({ shade: sh[0] }), sol: '∩ (Schnitt): nur der gemeinsame Teil. ∪ (Vereinigung): beide Kreise ganz. „$A$ ohne $B$“: der Teil von $A$, der nicht in $B$ liegt.', hint: 'Welche Bereiche sind gefärbt: nur die Mitte, alles, oder nur eine Seite?' });
  });
  G('7-zahlbereiche', 3, function () {
    var q = R.pick([['die Schnittmenge der Menge der geraden Zahlen und der Menge der ungeraden Zahlen', 'die leere Menge ∅', ['ℕ', '{0}', '{1; 2}'], 'Keine Zahl ist zugleich gerade und ungerade.'], ['die Vereinigungsmenge der geraden und der ungeraden natürlichen Zahlen', 'ℕ', ['die leere Menge ∅', '{0}', 'ℤ'], 'Jede natürliche Zahl ist gerade oder ungerade.'], ['die Schnittmenge von ℕ und der Menge der negativen ganzen Zahlen', 'die leere Menge ∅', ['{0}', 'ℤ', 'ℕ'], 'Keine natürliche Zahl ist negativ.'], ['die Menge aller geraden Primzahlen', '{2}', ['die leere Menge ∅', '{2; 4}', '{1; 2}'], 'Jede andere gerade Zahl ist durch 2 teilbar und damit keine Primzahl.']]);
    return MC('Was ist ' + q[0] + '?', q[1], q[2], { sol: q[3], hint: 'Überlege, welche Zahlen die Bedingung erfüllen.' });
  });

  /* ---------- 7-gleichung ---------- */
  G('7-gleichung', 1, function () {
    var a = R.pick([2, 3, 4, 5, 6, -2, -3]), x = R.nz(-8, 9), b = R.nz(-9, 9), c = a * x + b;
    return NUM('Löse die Gleichung: $' + M.lin(a, 'x', b) + ' = ' + c + '$', x, { pre: '$x =$', sol: 'Auf beiden Seiten $' + (b > 0 ? '- ' + b : '+ ' + (-b)) + '$: $' + a + 'x = ' + (c - b) + '$. Dann durch $' + a + '$ teilen: $x = ' + x + '$.', hint: 'Erst die Zahl ohne $x$ auf die andere Seite bringen, dann durch den Faktor vor $x$ teilen.' });
  });
  G('7-gleichung', 1, function () {
    var x = R.nz(-9, 9), b = R.int(1, 9), v = R.bool();
    if (v) return NUM('Löse die Gleichung: $-x + ' + b + ' = ' + (b - x) + '$', x, { pre: '$x =$', sol: 'Auf beiden Seiten $- ' + b + '$: $-x = ' + (-x) + '$. Mal $(-1)$: $x = ' + x + '$.', hint: '$-x$ ist die Gegenzahl von $x$.' });
    var k = R.int(2, 6), y = R.int(2, 9);
    return NUM('Löse die Gleichung: ${x/' + k + '} + ' + b + ' = ' + (y + b) + '$', k * y, { pre: '$x =$', sol: 'Auf beiden Seiten $- ' + b + '$: ${x/' + k + '} = ' + y + '$. Mal ' + k + ': $x = ' + k * y + '$.', hint: 'Der Bruchstrich bedeutet „geteilt durch ' + k + '“. Die Umkehrung ist die Multiplikation.' });
  });
  G('7-gleichung', 2, function () {
    var x = R.nz(-9, 12), a = R.int(3, 8), c = R.intNot(1, a - 1, [0]), b = R.nz(-9, 9), d = (a - c) * x + b;
    return NUM('Löse die Gleichung: $' + M.lin(a, 'a', b) + ' = ' + M.lin(c, 'a', d) + '$', x, { pre: '$a =$', sol: 'Auf beiden Seiten $- ' + M.co(c, 'a') + '$: $' + M.lin(a - c, 'a', b) + ' = ' + d + '$. Dann $' + (b > 0 ? '- ' + b : '+ ' + (-b)) + '$: $' + M.co(a - c, 'a') + ' = ' + (d - b) + '$, also $a = ' + x + '$.', hint: 'Bringe alle Glieder mit der Variablen auf eine Seite und alle Zahlen auf die andere.' });
  });
  G('7-gleichung', 2, function () {
    var k = R.int(2, 6), x = R.nz(-6, 9), b = R.nz(-5, 7), r = k * (x + b);
    return NUM('Löse die Gleichung: $' + k + ' * (' + M.lin(1, 'x', b) + ') = ' + r + '$', x, { pre: '$x =$', sol: 'Durch ' + k + ' teilen: $' + M.lin(1, 'x', b) + ' = ' + r / k + '$, also $x = ' + x + '$. (Oder zuerst ausmultiplizieren: $' + M.lin(k, 'x', k * b) + ' = ' + r + '$.)', hint: 'Entweder beide Seiten durch ' + k + ' teilen oder die Klammer ausmultiplizieren (Distributivgesetz, Klasse 5).' });
  });
  G('7-gleichung', 2, function () {
    var q = R.pick([['A = a * b', 'b', 'b = {A/a}', ['b = A * a', 'b = A - a', 'b = {a/A}']], ['u = 2a + 2b', 'a', 'a = {u - 2b/2}', ['a = u - 2b', 'a = {u/2} + b', 'a = 2u - 2b']], ['V = a * b * c', 'c', 'c = {V/a * b}', ['c = V - a * b', 'c = V * a * b', 'c = {a * b/V}']], ['v = {s/t}', 's', 's = v * t', ['s = {v/t}', 's = {t/v}', 's = v + t']], ['v = {s/t}', 't', 't = {s/v}', ['t = s * v', 't = {v/s}', 't = s - v']], ['A = {g * h/2}', 'h', 'h = {2 * A/g}', ['h = {A/2 * g}', 'h = {A * g/2}', 'h = 2 * A * g']], ['W = {p/100} * G', 'G', 'G = {100 * W/p}', ['G = {W * p/100}', 'G = {p/100 * W}', 'G = 100 * W * p']]]);
    return MC('Stelle die Formel $' + q[0] + '$ nach $' + q[1] + '$ um.', '$' + q[2] + '$', q[3].map(function (x) { return '$' + x + '$'; }), { sol: 'Mit Äquivalenzumformungen wie bei einer Gleichung: $' + q[2] + '$', hint: 'Behandle alle anderen Buchstaben wie Zahlen und löse nach $' + q[1] + '$ auf.' });
  });
  G('7-gleichung', 2, function () {
    var a = R.int(2, 7), b = R.int(1, 9), x = R.int(2, 9), plus = R.bool(), v = R.int(0, 1);
    if (v === 0) return MC('Aus $' + a + 'x ' + (plus ? '+ ' : '- ') + b + ' = ' + (a * x + (plus ? b : -b)) + '$ wird $' + a + 'x = ' + a * x + '$. Welche Umformung wurde auf beiden Seiten ausgeführt?', (plus ? '− ' : '+ ') + b, [(plus ? '+ ' : '− ') + b, ': ' + a, '· ' + a, ': ' + b], { sol: 'Um $' + (plus ? '+ ' : '- ') + b + '$ zu beseitigen, rechnet man die Umkehrung: ' + (plus ? '− ' : '+ ') + b + ' auf beiden Seiten.', hint: 'Was ist links verschwunden? Die Umkehrung davon wurde gerechnet.' });
    return MC('Aus $' + a + 'x = ' + a * x + '$ wird $x = ' + x + '$. Welche Umformung wurde auf beiden Seiten ausgeführt?', ': ' + a, ['· ' + a, '− ' + a, '+ ' + a, ': ' + x], { sol: 'Der Faktor ' + a + ' vor $x$ wird durch Division beseitigt.', hint: '$' + a + 'x$ bedeutet $' + a + ' * x$.' });
  });
  G('7-gleichung', 2, function () {
    var a = R.int(2, 5), b = R.int(1, 8), c = R.int(1, a - 1), sol = R.int(2, 8), d = (a - c) * sol - b, test = R.bool() ? sol : sol + R.pick([-1, 1, 2]);
    return TF('Ist $x = ' + test + '$ eine Lösung der Gleichung $' + a + 'x - ' + b + ' = ' + M.lin(c, 'x', d) + '$?', test === sol, { sol: 'Probe: links $' + a + ' * ' + test + ' - ' + b + ' = ' + (a * test - b) + '$, rechts $' + c + ' * ' + test + (d < 0 ? ' - ' + (-d) : ' + ' + d) + ' = ' + (c * test + d) + '$. ' + (test === sol ? 'Beide Seiten stimmen überein.' : 'Die Seiten sind verschieden.'), hint: 'Setze die Zahl auf beiden Seiten ein und vergleiche.' });
  });
  G('7-gleichung', 3, function () {
    var k = R.int(2, 5), x = R.nz(-8, 8), b = R.int(1, 6), c = R.int(k + 1, 8), d = k * (x - b) - c * x;
    return NUM('Löse die Gleichung: $' + k + ' * (x - ' + b + ') = ' + M.lin(c, 'x', d) + '$', x, { pre: '$x =$', sol: 'Ausmultiplizieren: $' + M.lin(k, 'x', -k * b) + ' = ' + M.lin(c, 'x', d) + '$. Sortieren: $' + (-k * b - d) + ' = ' + M.co(c - k, 'x') + '$, also $x = ' + x + '$.', hint: 'Erst die Klammer auflösen, dann sortieren.' });
  });
  G('7-gleichung', 3, function () {
    var x = R.int(3, 15), k = R.int(2, 5), c = R.int(2, 12), v = R.int(0, 1);
    if (v === 0) return NUM('Das ' + ['', '', 'Doppelte', 'Dreifache', 'Vierfache', 'Fünffache'][k] + ' einer Zahl, vermindert um ' + c + ', ergibt ' + (k * x - c) + '. Wie heißt die Zahl?', x, { sol: 'Gleichung: $' + k + 'x - ' + c + ' = ' + (k * x - c) + '$. $+ ' + c + '$: $' + k + 'x = ' + k * x + '$. $: ' + k + '$: $x = ' + x + '$.', hint: 'Stelle zuerst eine Gleichung auf.' });
    var young = R.int(8, 14), diff = R.int(2, 6);
    return NUM(R.pick(SZ.NAMES) + ' ist ' + diff + ' Jahre älter als ihre Schwester. Zusammen sind sie ' + (2 * young + diff) + ' Jahre alt. Wie alt ist die Schwester?', young, { unit: 'Jahre', sol: 'Schwester: $x$, die Ältere: $x + ' + diff + '$. Gleichung: $x + x + ' + diff + ' = ' + (2 * young + diff) + '$, also $2x = ' + 2 * young + '$ und $x = ' + young + '$.', hint: 'Nenne das Alter der Schwester $x$. Wie alt ist dann die Ältere?' });
  });

  /* ---------- 7-prozent ---------- */
  G('7-prozent', 1, function () {
    var p = R.pick([5, 10, 15, 20, 25, 30, 40, 50, 60, 75]), gw = R.pick([40, 60, 80, 120, 200, 240, 360, 500]), w = p * gw / 100;
    return NUM('Wie viel sind ' + p + ' % von ' + gw + ' Talern?', w, { unit: 'Taler', sol: '$W = {' + p + '/100} * ' + gw + ' = ' + de(w) + '$', hint: 'Prozentwert = Prozentsatz (als Hundertstel) mal Grundwert.' });
  });
  G('7-prozent', 1, function () {
    var gw = R.pick([20, 25, 40, 50, 80, 200]), p = R.pick([5, 10, 15, 20, 25, 30, 40, 60, 75]), w = p * gw / 100;
    if (w % 1) return null;
    return NUM(w + ' von ' + gw + ' Schülern kommen mit dem Fahrrad. Wie viel Prozent sind das?', p, { unit: '%', sol: '${' + w + '/' + gw + '} = ' + de(w / gw) + ' = ' + p + ' %$', hint: 'Prozentsatz = Prozentwert geteilt durch Grundwert.' });
  });
  G('7-prozent', 2, function () {
    var p = R.pick([10, 20, 25, 30, 40, 60, 75, 5]), gw = R.pick([40, 60, 80, 120, 200, 300]), w = p * gw / 100;
    return NUM(de(w) + ' kg sind ' + p + ' % einer Lieferung. Wie schwer ist die ganze Lieferung?', gw, { unit: 'kg', sol: '$G = W : {' + p + '/100} = ' + de(w) + ' * {100/' + p + '} = ' + gw + '$', hint: 'Schließe erst auf 1 %, dann auf 100 % (Dreisatz, Klasse 6).' });
  });
  G('7-prozent', 2, function () {
    var gw = R.pick([40, 60, 80, 120, 150, 200, 250]), p = R.pick([10, 15, 20, 25, 30, 40]), up = R.bool(), nw = gw * (100 + (up ? p : -p)) / 100;
    return NUM(up ? 'Ein Besen kostet ' + gw + ' Taler. Der Preis steigt um ' + p + ' %. Wie viel kostet er jetzt?' : 'Ein Umhang kostet ' + gw + ' Taler und wird um ' + p + ' % reduziert. Wie viel kostet er jetzt?', nw, { unit: 'Taler', sol: (up ? 'Steigerung um ' + p + ' % heißt auf ' + (100 + p) + ' %' : 'Senkung um ' + p + ' % heißt auf ' + (100 - p) + ' %') + ': $' + gw + ' * ' + de((100 + (up ? p : -p)) / 100) + ' = ' + de(nw) + '$', hint: up ? 'Der neue Preis sind 100 % + ' + p + ' %.' : 'Der neue Preis sind 100 % − ' + p + ' %.' });
  });
  G('7-prozent', 2, function () {
    var p = R.pick([3, 5, 7, 12, 15, 20, 25, 40]), up = R.bool();
    return NUM('Mit welcher Zahl muss man einen Wert multiplizieren, wenn er um ' + p + ' % ' + (up ? 'steigt' : 'sinkt') + '?', (100 + (up ? p : -p)) / 100, { sol: '$100 % ' + (up ? '+' : '-') + ' ' + p + ' % = ' + (100 + (up ? p : -p)) + ' % = ' + de((100 + (up ? p : -p)) / 100) + '$', hint: 'Auf wie viel Prozent ' + (up ? 'steigt' : 'sinkt') + ' der Wert?' });
  });
  G('7-prozent', 2, function () {
    var old = R.pick([40, 50, 80, 120, 200]), p = R.pick([10, 20, 25, 50, 5]), nw = old * (100 + p) / 100;
    return MC('Ein Wert steigt von ' + old + ' <b>auf</b> ' + de(nw) + '. Was stimmt?', 'Er steigt um ' + p + ' % auf ' + (100 + p) + ' %.', ['Er steigt um ' + (100 + p) + ' % auf ' + p + ' %.', 'Er steigt um ' + de(nw - old) + ' % auf ' + de(nw) + ' %.', 'Er steigt um ' + p + ' % auf ' + p + ' %.'], { sol: 'Zuwachs: $' + de(nw - old) + '$, das sind ${' + de(nw - old) + '/' + old + '} = ' + p + ' %$ des alten Werts. Der neue Wert beträgt ' + (100 + p) + ' % des alten.', hint: '„Um“ meint die Änderung, „auf“ den neuen Stand.' });
  });
  G('7-prozent', 3, function () {
    var old = R.pick([40, 50, 60, 80, 120, 200]), p = R.pick([10, 15, 20, 25, 30, 50]), up = R.bool(), nw = old * (100 + (up ? p : -p)) / 100;
    return NUM('Die Zahl der Mitglieder im Schulchor ' + (up ? 'steigt' : 'sinkt') + ' von ' + old + ' auf ' + de(nw) + '. Um wie viel Prozent hat sie sich verändert?', p, { unit: '%', sol: 'Änderung: $' + de(Math.abs(nw - old)) + '$. Bezogen auf den alten Wert: ${' + de(Math.abs(nw - old)) + '/' + old + '} = ' + p + ' %$', hint: 'Die Änderung wird immer auf den alten Wert (Grundwert) bezogen.' });
  });
  G('7-prozent', 3, function () {
    var gw = R.pick([100, 200, 400, 500]), p = R.pick([10, 20, 50]), end = gw * (1 + p / 100) * (1 - p / 100);
    return NUM('Ein Preis von ' + gw + ' Talern wird erst um ' + p + ' % erhöht und danach um ' + p + ' % gesenkt. Wie hoch ist der Preis am Ende?', M.round(end, 2), { unit: 'Taler', sol: '$' + gw + ' * ' + de(1 + p / 100) + ' = ' + de(gw * (1 + p / 100)) + '$, dann $' + de(gw * (1 + p / 100)) + ' * ' + de(1 - p / 100) + ' = ' + de(end) + '$. Die Senkung bezieht sich auf den höheren Preis – deshalb landet man unter dem Startwert.', hint: 'Die zweite Änderung bezieht sich auf den neuen, höheren Preis.' });
  });
  G('7-prozent', 3, function () {
    var gw = R.pick([40, 60, 80, 120, 150, 200]), p = R.pick([10, 20, 25, 40]), nw = gw * (100 - p) / 100;
    return NUM('Nach einem Rabatt von ' + p + ' % kostet ein Zauberstab noch ' + de(nw) + ' Taler. Wie viel hat er ursprünglich gekostet?', gw, { unit: 'Taler', sol: de(nw) + ' Taler sind ' + (100 - p) + ' % des alten Preises: $' + de(nw) + ' : ' + de((100 - p) / 100) + ' = ' + gw + '$', hint: 'Der neue Preis entspricht ' + (100 - p) + ' % – nicht 100 %.' });
  });

  /* ---------- 7-kreis ---------- */
  function thales(al, labs) {                         // AB Durchmesser, C auf dem Kreis
    var cdeg = 180 - 2 * al;                          // Lage von C so, dass der Winkel bei A gleich al ist
    return Fig.circ({ pts: { A: 180, B: 0, C: cdeg }, segs: [['A', 'B'], ['A', 'C'], ['B', 'C']], ang: [{ at: 'A', a: 'B', b: 'C', l: labs[0] }, { at: 'B', a: 'A', b: 'C', l: labs[1] }, labs[2] === 'R' ? { at: 'C', a: 'A', b: 'B', right: true } : { at: 'C', a: 'A', b: 'B', l: labs[2] }] });
  }
  G('7-kreis', 1, function () {
    var al = R.int(25, 65);
    return NUM('$AB$ ist ein Durchmesser des Kreises, $C$ liegt auf dem Kreis. Wie groß ist $β$?', 90 - al, { unit: '°', fig: thales(al, [al + '°', 'β', '']), sol: 'Satz des Thales: Der Winkel bei $C$ ist 90°. Innenwinkelsatz: $β = 180° - 90° - ' + al + '° = ' + (90 - al) + '°$', hint: 'Über einem Durchmesser liegt ein rechter Winkel (Satz des Thales). Dann hilft der Innenwinkelsatz aus Klasse 6.' });
  });
  G('7-kreis', 1, function () {
    var al = R.int(25, 65);
    return NUM('$AB$ ist ein Durchmesser des Kreises, $C$ liegt auf dem Kreis. Wie groß ist der Winkel $γ$ bei $C$?', 90, { unit: '°', fig: thales(al, ['', '', 'γ']), sol: 'Satz des Thales: Jeder Winkel über einem Durchmesser, dessen Scheitel auf dem Kreis liegt, ist ein rechter Winkel.', hint: 'Das ist genau die Aussage des Satzes des Thales.' });
  });
  G('7-kreis', 2, function () {
    var per = R.int(25, 70), v = R.bool(), pa = 270 - per, pb = 270 + per, pc = R.int(60, 120);
    var fig = Fig.circ({ pts: { A: pa, B: pb % 360, C: pc }, segs: [['M', 'A'], ['M', 'B'], ['C', 'A'], ['C', 'B']], ang: [{ at: 'M', a: 'A', b: 'B', l: v ? 2 * per + '°' : '?', c: Fig.C.teal, r: 14 }, { at: 'C', a: 'A', b: 'B', l: v ? '?' : per + '°' }] });
    return NUM(v ? 'Der Zentriwinkel über dem Bogen $AB$ ist ' + 2 * per + '° groß. Wie groß ist der Peripheriewinkel bei $C$?' : 'Der Peripheriewinkel bei $C$ über dem Bogen $AB$ ist ' + per + '° groß. Wie groß ist der Zentriwinkel bei $M$?', v ? per : 2 * per, { unit: '°', fig: fig, sol: 'Zentri-Peripheriewinkelsatz: Der Zentriwinkel ist doppelt so groß wie der Peripheriewinkel über demselben Bogen. ' + (v ? '$' + 2 * per + '° : 2 = ' + per + '°$' : '$2 * ' + per + '° = ' + 2 * per + '°$'), hint: 'Zentriwinkel = 2 · Peripheriewinkel (über demselben Bogen).' });
  });
  G('7-kreis', 2, function () {
    var per = R.int(25, 65), pa = 270 - per, pb = (270 + per) % 360;
    var fig = Fig.circ({ pts: { A: pa, B: pb, C: 70, D: 125 }, segs: [['C', 'A'], ['C', 'B'], ['D', 'A'], ['D', 'B']], ang: [{ at: 'C', a: 'A', b: 'B', l: per + '°' }, { at: 'D', a: 'A', b: 'B', l: '?', c: Fig.C.teal }] });
    return NUM('Die Winkel bei $C$ und $D$ liegen über demselben Bogen $AB$. Wie groß ist der Winkel bei $D$?', per, { unit: '°', fig: fig, sol: 'Peripheriewinkelsatz: Alle Peripheriewinkel über demselben Bogen sind gleich groß – also ' + per + '°.', hint: 'Beide Winkel „sehen“ denselben Bogen.' });
  });
  G('7-kreis', 2, function () {
    var al = R.int(55, 125), be = R.int(60, 120), v = R.bool();
    var fig = Fig.circ({ pts: { A: 215, B: 320, C: 50, D: 140 }, segs: [['A', 'B'], ['B', 'C'], ['C', 'D'], ['D', 'A']], center: false });
    return NUM('$ABCD$ ist ein Sehnenviereck (alle Ecken liegen auf dem Kreis). Der Winkel bei $' + (v ? 'A' : 'B') + '$ beträgt ' + (v ? al : be) + '°. Wie groß ist der gegenüberliegende Winkel bei $' + (v ? 'C' : 'D') + '$?', 180 - (v ? al : be), { unit: '°', fig: fig, sol: 'Im Sehnenviereck ergänzen sich gegenüberliegende Winkel zu 180°: $180° - ' + (v ? al : be) + '° = ' + (180 - (v ? al : be)) + '°$', hint: 'Gegenüberliegende Winkel im Sehnenviereck ergeben zusammen 180°.' });
  });
  G('7-kreis', 1, function () {
    var q = R.pick([['genau einen Punkt', 'Tangente'], ['genau zwei Punkte', 'Sekante'], ['keinen Punkt', 'Passante']]);
    return MC('Eine Gerade hat mit einem Kreis ' + q[0] + ' gemeinsam. Wie heißt sie?', q[1], ['Tangente', 'Sekante', 'Passante', 'Sehne'], { sol: 'Passante: geht vorbei. Tangente: berührt. Sekante: schneidet. Eine Sehne ist die Strecke zwischen zwei Kreispunkten.', hint: 'tangere (lateinisch) = berühren, secare = schneiden.' });
  });
  G('7-kreis', 2, function () {
    var r = R.int(3, 9), d = R.pick([r, r - R.int(1, 2), r + R.int(1, 3)]);
    return MCF('Ein Kreis hat den Radius ' + r + ' cm. Eine Gerade hat vom Mittelpunkt den Abstand ' + d + ' cm. Die Gerade ist eine …', ['Passante', 'Tangente', 'Sekante'], d > r ? 0 : d === r ? 1 : 2, { sol: d > r ? 'Abstand größer als Radius: Die Gerade verfehlt den Kreis.' : d === r ? 'Abstand gleich Radius: Die Gerade berührt den Kreis in genau einem Punkt.' : 'Abstand kleiner als Radius: Die Gerade schneidet den Kreis zweimal.', hint: 'Vergleiche den Abstand mit dem Radius.' });
  });
  G('7-kreis', 2, function () {
    var q = R.pick([['Der Mittelpunkt des Umkreises eines Dreiecks ist der Schnittpunkt der …', 'Mittelsenkrechten', 'Jeder Punkt auf einer Mittelsenkrechten ist von beiden Endpunkten der Seite gleich weit entfernt – der Schnittpunkt also von allen drei Ecken.'], ['Der Mittelpunkt des Inkreises eines Dreiecks ist der Schnittpunkt der …', 'Winkelhalbierenden', 'Jeder Punkt auf einer Winkelhalbierenden ist von beiden Schenkeln gleich weit entfernt – der Schnittpunkt also von allen drei Seiten.']]);
    return MC(q[0], q[1], ['Mittelsenkrechten', 'Winkelhalbierenden', 'Höhen', 'Seitenhalbierenden'], { sol: q[2], hint: 'Umkreis: gleich weit von den Ecken. Inkreis: gleich weit von den Seiten.' });
  });
  G('7-kreis', 3, function () {
    var al = R.int(25, 65), cdeg = 180 - 2 * al;
    var fig = Fig.circ({ pts: { A: 180, B: 0, C: cdeg }, segs: [['A', 'B'], ['A', 'C'], ['B', 'C'], ['M', 'C', Fig.C.teal]], ang: [{ at: 'A', a: 'B', b: 'C', l: al + '°' }, { at: 'M', a: 'A', b: 'C', l: '?', c: Fig.C.teal, r: 13 }] });
    return NUM('$AB$ ist ein Durchmesser, $M$ der Mittelpunkt. Wie groß ist der Winkel $AMC$?', 180 - 2 * al, { unit: '°', fig: fig, sol: '$MA$ und $MC$ sind Radien: Das Dreieck $AMC$ ist gleichschenklig. Basiswinkelsatz: Der Winkel bei $C$ ist auch ' + al + '°. Innenwinkelsatz: $180° - 2 * ' + al + '° = ' + (180 - 2 * al) + '°$', hint: 'Alle Radien sind gleich lang – welches Dreieck ist deshalb gleichschenklig?' });
  });
  G('7-kreis', 3, function () {
    var st = R.pick([['Der Satz des Thales gilt für jede beliebige Sehne $AB$.', false, 'Er gilt nur, wenn $AB$ ein Durchmesser ist.'], ['Die Tangente steht senkrecht auf dem Radius zum Berührpunkt.', true, 'Der Berührpunkt ist der Punkt der Tangente, der dem Mittelpunkt am nächsten liegt.'], ['Jedes Rechteck ist ein Sehnenviereck.', true, 'Gegenüberliegende Winkel ergeben $90° + 90° = 180°$. Der Umkreismittelpunkt ist der Diagonalenschnittpunkt.'], ['Jedes Dreieck hat einen Umkreis.', true, 'Die drei Mittelsenkrechten schneiden sich immer in einem Punkt.'], ['Ein Peripheriewinkel ist immer größer als der Zentriwinkel über demselben Bogen.', false, 'Er ist halb so groß.'], ['Liegt der Scheitel eines rechten Winkels über der Strecke $AB$, dann liegt er auf dem Kreis mit dem Durchmesser $AB$.', true, 'Das ist die Umkehrung des Satzes des Thales – auch sie ist wahr.']]);
    return TF('Wahr oder falsch? ' + st[0], st[1], { sol: st[2] });
  });

  /* ---------- 7-logik ---------- */
  /* [Voraussetzung als Nebensatz, als Hauptsatz, Behauptung als Nebensatz, als Hauptsatz, Umkehrung wahr?, Begründung] */
  var WD = [
    ['eine Zahl durch 4 teilbar ist', 'ist sie durch 4 teilbar', 'eine Zahl gerade ist', 'ist sie gerade', false, '6 ist gerade, aber nicht durch 4 teilbar.'],
    ['ein Viereck ein Quadrat ist', 'ist es ein Quadrat', 'ein Viereck vier rechte Winkel hat', 'hat es vier rechte Winkel', false, 'Ein Rechteck hat vier rechte Winkel, muss aber kein Quadrat sein.'],
    ['ein Dreieck gleichseitig ist', 'ist es gleichseitig', 'in einem Dreieck alle Innenwinkel 60° betragen', 'betragen alle seine Innenwinkel 60°', true, 'Drei gleiche Winkel erzwingen drei gleich lange Seiten.'],
    ['eine Zahl durch 10 teilbar ist', 'ist sie durch 10 teilbar', 'die letzte Ziffer einer Zahl 0 ist', 'ist ihre letzte Ziffer 0', true, 'Endet eine Zahl auf 0, ist sie ein Vielfaches von 10.'],
    ['eine Zahl durch 6 teilbar ist', 'ist sie durch 6 teilbar', 'eine Zahl durch 3 teilbar ist', 'ist sie durch 3 teilbar', false, '9 ist durch 3 teilbar, aber nicht durch 6.'],
    ['zwei Winkel Scheitelwinkel sind', 'sind sie Scheitelwinkel', 'zwei Winkel gleich groß sind', 'sind sie gleich groß', false, 'Zwei Winkel können gleich groß sein, ohne Scheitelwinkel zu sein.'],
    ['ein Dreieck gleichschenklig ist', 'ist es gleichschenklig', 'ein Dreieck zwei gleich große Winkel hat', 'hat es zwei gleich große Winkel', true, 'Das ist die Umkehrung des Basiswinkelsatzes – auch sie ist wahr.'],
    ['es regnet', 'regnet es', 'die Straße nass ist', 'ist die Straße nass', false, 'Die Straße kann auch aus anderen Gründen nass sein.']
  ];
  G('7-logik', 1, function () {
    var w = R.pick(WD);
    return MC('Wie lautet die Umkehrung des Satzes? „Wenn ' + w[0] + ', dann ' + w[3] + '.“', 'Wenn ' + w[2] + ', dann ' + w[1] + '.', ['Wenn ' + w[0] + ', dann ' + w[3] + '.', 'Wenn nicht gilt, dass ' + w[0] + ', dann ' + w[3] + '.', 'Wenn ' + w[0] + ', dann gilt nicht, dass ' + w[2] + '.'], { sol: 'Bei der Umkehrung tauschen Voraussetzung und Behauptung die Plätze.', hint: 'Vertausche, was hinter „wenn“ und was hinter „dann“ steht.' });
  });
  G('7-logik', 2, function () {
    var w = R.pick(WD);
    return TF('Der Satz „Wenn ' + w[0] + ', dann ' + w[3] + '“ ist wahr. Ist auch seine Umkehrung wahr?', w[4], { sol: 'Umkehrung: „Wenn ' + w[2] + ', dann ' + w[1] + '.“ ' + (w[4] ? 'Sie ist wahr: ' : 'Sie ist falsch: ') + w[5], hint: 'Bilde die Umkehrung und suche nach einem Gegenbeispiel.' });
  });
  G('7-logik', 1, function () {
    var q = R.pick([['Alle Vierecke mit vier rechten Winkeln sind Quadrate.', 'ein Rechteck mit den Seiten 2 cm und 3 cm', ['ein Quadrat mit der Seite 2 cm', 'ein Dreieck', 'eine Raute ohne rechte Winkel'], 'Es hat vier rechte Winkel, ist aber kein Quadrat.'], ['Alle Zahlen, die durch 3 teilbar sind, sind auch durch 9 teilbar.', '12', ['18', '27', '10'], '12 ist durch 3 teilbar, aber nicht durch 9.'], ['Das Quadrat einer Zahl ist immer größer als die Zahl selbst.', '${1/2}$', ['3', '$-2$', '10'], '$({1/2})^2 = {1/4}$ ist kleiner als ${1/2}$.'], ['Alle Dreiecke mit einem Winkel von 60° sind gleichseitig.', 'ein Dreieck mit den Winkeln 60°, 50° und 70°', ['ein Dreieck mit den Winkeln 60°, 60° und 60°', 'ein Quadrat', 'ein Dreieck mit den Winkeln 90°, 45° und 45°'], 'Es hat einen 60°-Winkel, aber verschieden lange Seiten.'], ['Die Summe zweier Primzahlen ist immer gerade.', '$2 + 3$', ['$3 + 5$', '$7 + 11$', '$4 + 6$'], '$2 + 3 = 5$ ist ungerade.']]);
    return MC('Welches Gegenbeispiel widerlegt die Aussage? „' + q[0] + '“', q[1], q[2], { sol: q[3] + ' Ein einziges Gegenbeispiel genügt, um eine Allaussage zu widerlegen.', hint: 'Ein Gegenbeispiel erfüllt die Voraussetzung, aber nicht die Behauptung.' });
  });
  G('7-logik', 2, function () {
    var q = R.pick([['Es gibt eine Primzahl zwischen 20 und 30.', 0, 'Ein Beispiel genügt: 23 (oder 29).'], ['Alle Primzahlen größer als 2 sind ungerade.', 1, 'Man braucht eine allgemeine Begründung: Jede gerade Zahl größer als 2 ist durch 2 teilbar, also keine Primzahl.'], ['Es gibt ein Viereck mit genau einer Symmetrieachse.', 0, 'Ein Beispiel genügt: das Drachenviereck.'], ['In jedem Dreieck ist die Winkelsumme 180°.', 1, 'Man braucht einen Beweis, der für alle Dreiecke gilt.'], ['Es gibt eine natürliche Zahl, die gleich ihrem Quadrat ist.', 0, 'Ein Beispiel genügt: $1^2 = 1$ (oder $0^2 = 0$).']]);
    return MCF('Wie beweist man die Aussage? „' + q[0] + '“', ['Ein passendes Beispiel angeben genügt.', 'Man braucht eine Begründung, die alle Fälle erfasst.', 'Viele Beispiele durchprobieren genügt.'], q[1], { sol: q[2] + (q[1] === 0 ? ' Das ist eine Existenzaussage („Es gibt …“).' : ' Das ist eine Allaussage („Alle …“, „Jedes …“).'), hint: 'Beginnt die Aussage mit „Es gibt“ oder mit „Alle/Jedes“?' });
  });
  G('7-logik', 2, function () {
    var st = R.pick([['Eine Zahl ist genau dann durch 6 teilbar, wenn sie durch 2 und durch 3 teilbar ist.', true, 'Beide Richtungen stimmen.'], ['Eine Zahl ist genau dann durch 4 teilbar, wenn sie gerade ist.', false, 'Die Richtung „gerade ⇒ durch 4 teilbar“ ist falsch: 6.'], ['Ein Dreieck ist genau dann gleichseitig, wenn alle seine Winkel 60° betragen.', true, 'Beide Richtungen stimmen.'], ['Ein Viereck ist genau dann ein Quadrat, wenn es vier rechte Winkel hat.', false, 'Ein Rechteck hat auch vier rechte Winkel.'], ['Ein Winkel im Dreieck ist genau dann stumpf, wenn er größer als 90° ist.', true, 'Das ist die Definition – innerhalb eines Dreiecks ist jeder Winkel kleiner als 180°.'], ['Eine natürliche Zahl ist genau dann eine Primzahl, wenn sie ungerade ist.', false, '9 ist ungerade, aber keine Primzahl; 2 ist eine Primzahl, aber gerade.']]);
    return TF('Wahr oder falsch? ' + st[0], st[1], { sol: st[2] + ' „Genau dann, wenn“ verlangt, dass Satz und Umkehrung beide wahr sind.' });
  });
  G('7-logik', 3, function () {
    var q = R.pick([['Alle Quadrate sind Rechtecke. Die Figur $F$ ist kein Rechteck.', '$F$ ist kein Quadrat.', ['$F$ ist ein Quadrat.', '$F$ ist eine Raute.', 'Darüber lässt sich nichts sagen.'], 'Wäre $F$ ein Quadrat, dann wäre $F$ auch ein Rechteck – Widerspruch.'], ['Alle Quadrate sind Rechtecke. Die Figur $F$ ist ein Rechteck.', 'Ob $F$ ein Quadrat ist, lässt sich nicht sagen.', ['$F$ ist ein Quadrat.', '$F$ ist kein Quadrat.', '$F$ ist eine Raute.'], 'Aus dem Satz folgt nichts über Rechtecke im Allgemeinen – die Umkehrung gilt nicht.'], ['Wenn eine Zahl durch 9 teilbar ist, dann ist sie durch 3 teilbar. Die Zahl $n$ ist nicht durch 3 teilbar.', '$n$ ist nicht durch 9 teilbar.', ['$n$ ist durch 9 teilbar.', '$n$ ist eine Primzahl.', 'Darüber lässt sich nichts sagen.'], 'Wäre $n$ durch 9 teilbar, dann auch durch 3 – Widerspruch.']]);
    return MC(q[0] + ' Was folgt daraus?', q[1], q[2], { sol: q[3], hint: 'Nimm probeweise das Gegenteil an – führt es zu einem Widerspruch?' });
  });
  G('7-logik', 3, function () {
    var q = R.pick([['Du sollst die Seitenlänge eines Quadrats aus seinem Umfang bestimmen und fragst dich: „Was müsste ich kennen, um die Seitenlänge zu bekommen?“', 1], ['Du kennst zwei Winkel eines Dreiecks und überlegst: „Was kann ich daraus alles berechnen?“', 0], ['Du willst beweisen, dass ein Viereck ein Parallelogramm ist, und überlegst: „Woran erkennt man ein Parallelogramm?“', 1], ['Du hast eine Gleichung und formst sie Schritt für Schritt um, bis $x$ allein steht.', 0]]);
    return MCF(q[0] + ' Welche Strategie ist das?', ['Vorwärtsarbeiten (vom Gegebenen aus)', 'Rückwärtsarbeiten (vom Gesuchten aus)'].concat(['Systematisches Probieren']), q[1], { sol: 'Vorwärtsarbeiten: Was folgt aus dem Gegebenen? Rückwärtsarbeiten: Was brauche ich für das Gesuchte? Oft führt eine Mischung aus beiden zum Ziel.', hint: 'Startest du beim Gegebenen oder beim Gesuchten?' });
  });

  /* ---------- 7-pyramide ---------- */
  G('7-pyramide', 1, function () {
    var a = R.pick([3, 6, 9, 12]), h = R.int(4, 12), sq = R.bool(), b = sq ? a : R.int(2, 8), v = a * b * h / 3;
    if (v % 1) return null;
    return NUM('Eine Pyramide hat als Grundfläche ein ' + (sq ? 'Quadrat mit der Seitenlänge ' + a + ' cm' : 'Rechteck mit den Seiten ' + a + ' cm und ' + b + ' cm') + ' und ist ' + h + ' cm hoch. Berechne ihr Volumen.', v, { unit: '$cm^3$', sol: '$V = {1/3} * A_G * h = {1/3} * ' + a * b + ' * ' + h + ' = ' + v + '$, also $' + v + ' cm^3$.', hint: 'Volumen der Pyramide: ein Drittel von Grundfläche mal Höhe.' });
  });
  G('7-pyramide', 1, function () {
    var n = R.pick([3, 4, 5, 6, 8]), v = R.int(0, 2), ans = [n + 1, 2 * n, n + 1][v], what = ['Ecken', 'Kanten', 'Flächen'][v];
    return NUM('Wie viele ' + what + ' hat eine Pyramide, deren Grundfläche ein ' + n + '-Eck ist?', ans, { sol: v === 0 ? n + ' Ecken der Grundfläche und die Spitze: $' + ans + '$.' : v === 1 ? n + ' Kanten der Grundfläche und ' + n + ' Seitenkanten: $' + ans + '$.' : n + ' Seitenflächen und die Grundfläche: $' + ans + '$.', hint: 'Zähle Grundfläche und Spitze getrennt.' });
  });
  G('7-pyramide', 2, function () {
    var vp = R.pick([30, 45, 60, 90, 120, 150]) , v = R.bool();
    return NUM(v ? 'Ein Prisma hat das Volumen $' + vp * 3 + ' cm^3$. Wie groß ist das Volumen einer Pyramide mit gleicher Grundfläche und gleicher Höhe?' : 'Eine Pyramide hat das Volumen $' + vp + ' cm^3$. Wie groß ist das Volumen eines Prismas mit gleicher Grundfläche und gleicher Höhe?', v ? vp : 3 * vp, { unit: '$cm^3$', sol: 'Die Pyramide fasst genau ein Drittel des Prismas: ' + (v ? '$' + vp * 3 + ' : 3 = ' + vp + '$' : '$3 * ' + vp + ' = ' + 3 * vp + '$'), hint: 'Dreimal Pyramide füllt das Prisma.' });
  });
  G('7-pyramide', 2, function () {
    var a = R.int(4, 10), hs = R.int(5, 12), o = a * a + 2 * a * hs;
    return NUM('Eine quadratische Pyramide hat die Grundkante ' + a + ' cm. Jede der vier dreieckigen Seitenflächen hat die Höhe ' + hs + ' cm. Berechne den Oberflächeninhalt.', o, { unit: '$cm^2$', sol: 'Grundfläche: $' + a + '^2 = ' + a * a + '$. Vier Dreiecke: $4 * {' + a + ' * ' + hs + '/2} = ' + 2 * a * hs + '$. Zusammen $' + o + '$, also $' + o + ' cm^2$.', hint: 'Das Netz besteht aus einem Quadrat und vier gleichen Dreiecken (Dreiecksfläche: Klasse 6).' });
  });
  G('7-pyramide', 2, function () {
    var vol = R.pick([20, 50, 80, 120, 200]), mat = R.pick([['Eisen', 7.9], ['Aluminium', 2.7], ['Holz', 0.7], ['Glas', 2.5], ['Gold', 19.3]]), m = M.round(vol * mat[1], 1);
    return NUM('Ein Körper aus ' + mat[0] + ' hat das Volumen $' + vol + ' cm^3$. ' + mat[0] + ' hat die Dichte ' + de(mat[1]) + ' Gramm pro $cm^3$. Welche Masse hat der Körper?', m, { unit: 'g', sol: '$m = ρ * V = ' + de(mat[1]) + ' * ' + vol + ' = ' + de(m) + '$ Gramm.', hint: 'Masse = Dichte mal Volumen.' });
  });
  G('7-pyramide', 2, function () {
    var q = R.pick([['zeigt einen Körper so, dass er räumlich wirkt', 'Schrägbild'], ['zeigt einen Körper gleichzeitig von vorn und von oben', 'Zweitafelbild'], ['zeigt die aufgeklappte Oberfläche eines Körpers', 'Netz']]);
    return MC('Welche Darstellung ' + q[0] + '?', q[1], ['Schrägbild', 'Zweitafelbild', 'Netz', 'Kreisdiagramm'], { sol: 'Schrägbild: räumlicher Eindruck. Zweitafelbild: Grundriss und Aufriss. Netz: alle Flächen in einer Ebene ausgebreitet.' });
  });
  G('7-pyramide', 3, function () {
    var ag = R.pick([12, 15, 18, 24, 30, 36]), h = R.int(4, 12), v = ag * h / 3;
    return NUM('Eine Pyramide hat das Volumen $' + v + ' cm^3$ und die Grundfläche $' + ag + ' cm^2$. Wie hoch ist sie?', h, { unit: 'cm', sol: '$V = {1/3} * A_G * h$ nach $h$ umstellen: $h = {3 * V/A_G} = {' + 3 * v + '/' + ag + '} = ' + h + '$ cm.', hint: 'Stelle die Volumenformel nach $h$ um (Formeln umstellen).' });
  });
  G('7-pyramide', 3, function () {
    var a = R.pick([3, 6]), hw = R.int(4, 9), hp = R.pick([2, 4, 5, 7]), v = a * a * hw + a * a * hp / 3;
    if (v % 1) return null;
    return NUM('Ein Turm besteht aus einem Quader mit quadratischer Grundfläche (Seite ' + a + ' m, Höhe ' + hw + ' m) und einem Pyramidendach (Höhe ' + hp + ' m) auf derselben Grundfläche. Wie groß ist das Volumen des Turms?', v, { unit: '$m^3$', sol: 'Quader: $' + a + ' * ' + a + ' * ' + hw + ' = ' + a * a * hw + '$. Pyramide: ${1/3} * ' + a * a + ' * ' + hp + ' = ' + a * a * hp / 3 + '$. Zusammen $' + v + '$, also $' + v + ' m^3$.', hint: 'Zerlege den Turm in zwei bekannte Körper (Rückführprinzip).' });
  });
  G('7-pyramide', 3, function () {
    var st = R.pick([['Schneidet man einer Pyramide parallel zur Grundfläche die Spitze ab, entsteht ein Pyramidenstumpf.', true, 'So ist der Pyramidenstumpf festgelegt. Seine Deckfläche hat dieselbe Form wie die Grundfläche, ist aber kleiner.'], ['Eine Pyramide mit doppelter Höhe und gleicher Grundfläche hat das doppelte Volumen.', true, '$V = {1/3} * A_G * h$ – das Volumen ist proportional zur Höhe.'], ['Die Seitenflächen einer Pyramide sind Rechtecke.', false, 'Es sind Dreiecke, die sich in der Spitze treffen. Rechtecke sind die Seitenflächen eines geraden Prismas.'], ['Eine Pyramide und ein Prisma mit gleicher Grundfläche und Höhe haben das gleiche Volumen.', false, 'Die Pyramide hat nur ein Drittel des Volumens.'], ['Für jede Pyramide gilt: Ecken − Kanten + Flächen = 2.', true, 'Beim $n$-Eck als Grundfläche: $(n + 1) - 2n + (n + 1) = 2$. Das ist Eulers Polyedersatz.']]);
    return TF('Wahr oder falsch? ' + st[0], st[1], { sol: st[2] });
  });

  /* ---------- 7-daten ---------- */
  G('7-daten', 1, function () {
    var labs = ['Geige', 'Flöte', 'Klavier', 'Gitarre', 'Harfe'], vals = R.distinct(5, 3, 14), v = R.int(0, 2), fig = Fig.bars({ labels: labs, vals: vals, step: 2 });
    var max = Math.max.apply(null, vals), sum = vals.reduce(function (a, b) { return a + b; }, 0);
    if (v === 0) return NUM('Das Diagramm zeigt, welches Instrument die Kinder einer Musikschule spielen. Wie viele Kinder wurden insgesamt gezählt?', sum, { fig: fig, sol: '$' + vals.join(' + ') + ' = ' + sum + '$', hint: 'Lies alle Säulen ab und addiere.' });
    if (v === 1) return MCF('Das Diagramm zeigt, welches Instrument die Kinder einer Musikschule spielen. Welches Instrument wird am häufigsten gespielt?', labs, vals.indexOf(max), { fig: fig, sol: 'Die höchste Säule: ' + labs[vals.indexOf(max)] + ' mit ' + max + ' Kindern.' });
    return NUM('Das Diagramm zeigt, welches Instrument die Kinder einer Musikschule spielen. Wie viele Kinder spielen mehr ' + labs[vals.indexOf(max)] + ' als ' + labs[(vals.indexOf(max) + 1) % 5] + '?', max - vals[(vals.indexOf(max) + 1) % 5], { fig: fig, sol: '$' + max + ' - ' + vals[(vals.indexOf(max) + 1) % 5] + ' = ' + (max - vals[(vals.indexOf(max) + 1) % 5]) + '$', hint: 'Lies beide Säulen ab und bilde die Differenz.' });
  });
  G('7-daten', 1, function () {
    var q = R.pick([['den Temperaturverlauf im Laufe eines Tages', 1], ['die Stimmenanteile bei der Wahl der Klassensprecherin', 2], ['die Einwohnerzahlen von Dresden, Leipzig und Chemnitz im Vergleich', 0], ['die Entwicklung der Schülerzahl einer Schule über zehn Jahre', 1], ['die Zusammensetzung der Luft aus verschiedenen Gasen', 2], ['die Höhe von fünf Bergen im Erzgebirge im Vergleich', 0]]);
    return MCF('Welche Diagrammart eignet sich am besten für ' + q[0] + '?', ['Säulendiagramm', 'Liniendiagramm', 'Kreisdiagramm'], q[1], { sol: 'Säulen: einzelne Werte vergleichen. Linie: Entwicklung über die Zeit. Kreis: Anteile an einem Ganzen.', hint: 'Geht es um Vergleich, Entwicklung oder Anteile?' });
  });
  G('7-daten', 2, function () {
    var p = R.pick([12, 15, 24, 35, 45, 55, 65, 8, 85]);
    return NUM('Welcher Sektorwinkel gehört im Kreisdiagramm zu einem Anteil von ' + p + ' %?', M.round(p * 3.6, 1), { unit: '°', sol: '$' + de(p / 100) + ' * 360° = ' + de(p * 3.6) + '°$', hint: 'Zu 1 % gehören 3,6°.' });
  });
  G('7-daten', 2, function () {
    var a = R.pick([20, 25, 30, 35]), b = R.pick([15, 20, 25]), c = R.pick([10, 15, 20]), d = 100 - a - b - c;
    return NUM('Ein Kreisdiagramm zeigt vier Anteile. Drei davon sind ' + a + ' %, ' + b + ' % und ' + c + ' %. Wie groß ist der vierte?', d, { unit: '%', fig: Fig.pie({ vals: [a, b, c, d], labels: [a + ' %', b + ' %', c + ' %', '?'] }), sol: 'Alle Anteile ergeben zusammen 100 %: $100 - ' + a + ' - ' + b + ' - ' + c + ' = ' + d + '$', hint: 'Das Ganze sind 100 %.' });
  });
  G('7-daten', 2, function () {
    var tot = R.pick([20, 25, 40, 50]), parts = [0.4, 0.3, 0.2, 0.1].map(function (x) { return x * tot; }), labs = ['Bus', 'Rad', 'zu Fuß', 'Auto'], i = R.int(0, 3);
    if (parts.some(function (x) { return x % 1; })) return null;
    parts = R.shuffle(parts);
    return NUM('Das Diagramm zeigt, wie ' + tot + ' Kinder zur Schule kommen. Wie viel Prozent der Kinder wählen „' + labs[i] + '“?', parts[i] / tot * 100, { unit: '%', fig: Fig.bars({ labels: labs, vals: parts, showVals: true }), sol: '${' + parts[i] + '/' + tot + '} = ' + de(parts[i] / tot) + ' = ' + de(parts[i] / tot * 100) + ' %$', hint: 'Anteil = Anzahl geteilt durch Gesamtzahl (Prozentrechnung).' });
  });
  G('7-daten', 3, function () {
    var q = R.pick([['Die Hochachse eines Säulendiagramms beginnt bei 95 statt bei 0. Was bewirkt das?', 'Kleine Unterschiede wirken viel größer, als sie sind.', ['Die Werte werden kleiner.', 'Das Diagramm wird genauer.', 'Nichts – das ist nur Geschmackssache.']], ['Ein Zeitungsdiagramm zeigt statt Säulen kleine Bilder. Das Bild für den doppelten Wert ist doppelt so hoch und doppelt so breit. Was ist das Problem?', 'Die Fläche ist viermal so groß – der Unterschied wirkt übertrieben.', ['Das Bild ist zu klein.', 'Die Werte sind falsch berechnet.', 'Es gibt kein Problem.']], ['Eine Werbung sagt: „80 % der Befragten lieben unser Produkt“ – befragt wurden 5 Stammkunden. Was ist das Problem?', 'Die Stichprobe ist winzig und nicht zufällig ausgewählt.', ['80 % ist kein hoher Wert.', 'Prozente darf man nicht für Menschen verwenden.', 'Es gibt kein Problem.']]]);
    return MC(q[0], q[1], q[2], { sol: 'Wer Diagramme liest, prüft zuerst: Wo beginnt die Achse? Was wird verglichen? Wer wurde befragt?', hint: 'Überlege, welchen Eindruck das Diagramm erwecken soll.' });
  });
  G('7-daten', 3, function () {
    var vals = [R.int(2, 6), R.int(5, 9), R.int(7, 12), R.int(6, 11), R.int(3, 8)], labs = ['Jan', 'Feb', 'Mär', 'Apr', 'Mai'], sum = vals.reduce(function (a, b) { return a + b; }, 0);
    if (sum % 5) vals[4] += 5 - sum % 5;
    sum = vals.reduce(function (a, b) { return a + b; }, 0);
    return NUM('Das Diagramm zeigt, wie viele Konzerte das Schulorchester in fünf Monaten gegeben hat. Wie viele waren es im Durchschnitt pro Monat?', sum / 5, { fig: Fig.bars({ labels: labs, vals: vals, showVals: true, step: 2 }), sol: 'Arithmetisches Mittel (Klasse 5): $(' + vals.join(' + ') + ') : 5 = ' + sum + ' : 5 = ' + sum / 5 + '$', hint: 'Summe aller Werte geteilt durch ihre Anzahl.' });
  });
})(typeof window !== 'undefined' ? window : globalThis);

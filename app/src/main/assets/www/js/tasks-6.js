/* Silberzirkel – Aufgaben Klasse 6 (Lehrplan Sachsen, Gymnasium). */
(function (g) {
  'use strict';
  var SZ = g.SZ, R = SZ.R, M = SZ.M, G = SZ.G, MC = SZ.MC, MCN = SZ.MCN, MCF = SZ.MCF, NUM = SZ.NUM, GAP = SZ.GAP, TF = SZ.TF, ORD = SZ.ORD, Fig = SZ.Fig, de = M.de, F = M.F, fs = M.fs;
  function frac(maxD) {                               // zufälliger echter, gekürzter Bruch
    var d, n;
    do { d = R.int(2, maxD || 9); n = R.int(1, d - 1); } while (M.gcd(n, d) !== 1);
    return F(n, d);
  }
  var BR = 'Eingabe als Bruch mit Schrägstrich, z. B. 7/12.';

  /* ---------- 6-bruchrechnen ---------- */
  G('6-bruchrechnen', 1, function () {
    var d = R.pick([5, 7, 8, 9, 11, 12]), a = R.int(1, d - 2), b = R.int(1, d - 1 - a), plus = R.bool();
    if (!plus) { a = a + b; }
    var r = plus ? F(a + b, d) : F(a - b, d);
    return NUM('Berechne und kürze, wenn möglich: ${' + a + '/' + d + '} ' + (plus ? '+' : '-') + ' {' + b + '/' + d + '}$', r, { reduced: true, sol: 'Gleiche Nenner: Nur die Zähler werden ' + (plus ? 'addiert' : 'subtrahiert') + '. ${' + (plus ? a + b : a - b) + '/' + d + '}' + (r.d !== d ? ' = ' + fs(r) : '') + '$', hint: 'Der Nenner bleibt, gerechnet wird nur mit den Zählern. ' + BR });
  });
  G('6-bruchrechnen', 2, function () {
    var a = frac(6), b = frac(8), plus = R.bool();
    if (a.d === b.d) return null;
    if (!plus && M.fval(a) < M.fval(b)) { var t = a; a = b; b = t; }
    var hn = M.lcm(a.d, b.d), r = plus ? M.fadd(a, b) : M.fsub(a, b);
    if (r.n === 0) return null;
    var za = a.n * hn / a.d, zb = b.n * hn / b.d;
    return NUM('Berechne und kürze vollständig: $' + fs(a) + (plus ? ' + ' : ' - ') + fs(b) + '$', r, { reduced: true, sol: 'Hauptnenner ' + hn + ': ${' + za + '/' + hn + '} ' + (plus ? '+' : '-') + ' {' + zb + '/' + hn + '} = {' + (plus ? za + zb : za - zb) + '/' + hn + '}' + (r.d !== hn ? ' = ' + fs(r) : '') + '$', hint: 'Erst gleichnamig machen: Der Hauptnenner ist das kleinste gemeinsame Vielfache von ' + a.d + ' und ' + b.d + '. ' + BR });
  });
  G('6-bruchrechnen', 1, function () {
    var a = frac(7), b = frac(7), r = M.fmul(a, b);
    return NUM('Berechne und kürze vollständig: $' + fs(a) + ' * ' + fs(b) + '$', r, { reduced: true, sol: 'Zähler mal Zähler, Nenner mal Nenner: ${' + a.n + ' * ' + b.n + '/' + a.d + ' * ' + b.d + '} = {' + a.n * b.n + '/' + a.d * b.d + '}' + (r.d !== a.d * b.d ? ' = ' + fs(r) : '') + '$', hint: 'Zähler mal Zähler, Nenner mal Nenner. Vorher kürzen spart Arbeit. ' + BR });
  });
  G('6-bruchrechnen', 2, function () {
    var a = frac(7), b = frac(7), r = M.fdiv(a, b);
    return NUM('Berechne und kürze vollständig: $' + fs(a) + ' : ' + fs(b) + '$', r, { reduced: true, sol: 'Mit dem Kehrwert multiplizieren: $' + fs(a) + ' * {' + b.d + '/' + b.n + '} = {' + a.n * b.d + '/' + a.d * b.n + '}' + (r.d !== a.d * b.n || r.n !== a.n * b.d ? ' = ' + fs(r) : '') + '$', hint: 'Durch einen Bruch dividieren heißt: mit seinem Kehrwert multiplizieren. ' + BR });
  });
  G('6-bruchrechnen', 2, function () {
    var a = frac(6), k = R.int(2, 9), mul = R.bool(), r = mul ? F(a.n * k, a.d) : F(a.n, a.d * k);
    return NUM('Berechne und kürze vollständig: $' + fs(a) + (mul ? ' * ' : ' : ') + k + '$', r, { reduced: true, sol: mul ? 'Nur der Zähler wird multipliziert: ${' + a.n + ' * ' + k + '/' + a.d + '} = ' + fs(r) + '$' : 'Der Nenner wird multipliziert: ${' + a.n + '/' + a.d + ' * ' + k + '} = ' + fs(r) + '$', hint: mul ? 'Eine natürliche Zahl ist ein Bruch mit Nenner 1.' : 'Teilen durch ' + k + ' macht jedes Stück ' + k + '-mal so klein: Der Nenner wächst.' });
  });
  G('6-bruchrechnen', 1, function () {
    var pairs = [[4, 6], [6, 8], [3, 4], [6, 9], [4, 10], [8, 12], [5, 6], [2, 7], [10, 15], [6, 10]], p = R.pick(pairs), hn = M.lcm(p[0], p[1]);
    return MCN('Welches ist der Hauptnenner (der kleinste gemeinsame Nenner) von ${1/' + p[0] + '}$ und ${1/' + p[1] + '}$?', hn, [p[0] * p[1] === hn ? hn * 2 : p[0] * p[1], p[0] + p[1], M.gcd(p[0], p[1]) === 1 ? Math.max(p[0], p[1]) : M.gcd(p[0], p[1]), hn + p[0]], { sol: 'Vielfache von ' + p[0] + ' und ' + p[1] + ' vergleichen: Das kleinste gemeinsame ist ' + hn + '.', hint: 'Gesucht ist das kleinste gemeinsame Vielfache der Nenner.' });
  });
  G('6-bruchrechnen', 3, function () {
    var a = frac(5), b = frac(4), c = frac(3), r = M.fadd(a, M.fmul(b, c));
    return NUM('Berechne und kürze vollständig: $' + fs(a) + ' + ' + fs(b) + ' * ' + fs(c) + '$', r, { reduced: true, sol: 'Punkt vor Strich: $' + fs(b) + ' * ' + fs(c) + ' = ' + fs(M.fmul(b, c)) + '$. Dann $' + fs(a) + ' + ' + fs(M.fmul(b, c)) + ' = ' + fs(r) + '$.', hint: 'Auch bei Brüchen gilt: Punktrechnung vor Strichrechnung (Klasse 5).' });
  });
  G('6-bruchrechnen', 3, function () {
    var a = frac(6), name = R.pick(SZ.NAMES), whole = a.d * 2 * R.int(2, 5);
    var first = whole * a.n / a.d, rest = whole - first;
    return NUM(name + ' hat ' + whole + ' Seiten eines Zauberbuchs vor sich. Am ersten Tag liest ' + name + ' $' + fs(a) + '$ davon, am zweiten Tag die Hälfte des Rests. Wie viele Seiten sind danach noch übrig?', rest / 2, { unit: 'Seiten', tol: 0.001, sol: 'Tag 1: $' + fs(a) + ' * ' + whole + ' = ' + first + '$ Seiten, Rest ' + rest + '. Tag 2: die Hälfte, also bleiben $' + de(rest / 2) + '$ Seiten.', hint: 'Zerlege in Teilprobleme: erst Tag 1, dann der Rest, dann die Hälfte davon.' });
  });
  G('6-bruchrechnen', 2, function () {
    var st = R.pick([['${1/2} + {1/3} = {2/5}$', false, 'Brüche darf man nicht einfach „oben plus oben, unten plus unten“ rechnen. Richtig: ${3/6} + {2/6} = {5/6}$.'], ['${2/3} * {3/4} = {1/2}$', true, '${2 * 3/3 * 4} = {6/12} = {1/2}$'], ['Teilt man eine Zahl durch ${1/2}$, wird sie doppelt so groß.', true, 'Durch ${1/2}$ teilen heißt mit 2 multiplizieren.'], ['Multipliziert man eine Zahl mit einem echten Bruch, wird das Ergebnis kleiner als die Zahl.', true, 'Man nimmt nur einen Teil der Zahl.'], ['${3/4} : {3/4} = 0$', false, 'Jede Zahl (außer 0) durch sich selbst ergibt 1.'], ['Der Kehrwert von ${2/5}$ ist ${5/2}$.', true, 'Zähler und Nenner tauschen die Plätze.'], ['${1/4} + {1/4} = {1/8}$', false, 'Zwei Viertel sind ${2/4} = {1/2}$. Der Nenner bleibt beim Addieren gleich.']]);
    return TF('Wahr oder falsch? ' + st[0], st[1], { sol: st[2] });
  });

  /* ---------- 6-dezimal ---------- */
  G('6-dezimal', 1, function () {
    var a = R.int(2, 9) / 10, b = R.pick([R.int(2, 9) / 10, R.int(11, 49) / 100, R.int(2, 9)]), r = M.round(a * b, 4);
    return NUM('Berechne: $' + de(a) + ' * ' + de(b) + '$', r, { sol: 'Ohne Komma: $' + M.round(a * 10) + ' * ' + String(de(b)).replace(',', '').replace(/^0+/, '') + '$. Dann so viele Nachkommastellen setzen, wie beide Faktoren zusammen haben: $' + de(r) + '$.', hint: 'Zähle die Nachkommastellen beider Faktoren zusammen.' });
  });
  G('6-dezimal', 2, function () {
    var q = R.pick([R.int(2, 12), R.int(11, 99) / 10]), d = R.pick([0.2, 0.3, 0.4, 0.5, 0.6, 0.8, 1.2, 1.5, 0.04, 0.05, 0.25]), a = M.round(q * d, 4), sh = String(d).split('.')[1].length;
    return NUM('Berechne: $' + de(a) + ' : ' + de(d) + '$', q, { sol: 'Komma bei beiden Zahlen um ' + sh + ' Stelle' + (sh > 1 ? 'n' : '') + ' nach rechts: $' + de(a * Math.pow(10, sh)) + ' : ' + de(d * Math.pow(10, sh)) + ' = ' + de(q) + '$', hint: 'Verschiebe bei beiden Zahlen das Komma gleich weit, bis der Divisor eine natürliche Zahl ist.' });
  });
  G('6-dezimal', 1, function () {
    var list = [[1, 3, true], [2, 3, true], [1, 6, true], [5, 6, true], [1, 9, true], [4, 9, true], [1, 11, true], [5, 12, true], [1, 7, true], [1, 4, false], [3, 8, false], [7, 20, false], [3, 5, false], [9, 25, false], [7, 16, false], [11, 40, false]], f = R.pick(list);
    return TF('Stimmt das? Der Bruch ${' + f[0] + '/' + f[1] + '}$ ergibt eine periodische Dezimalzahl.', f[2], { sol: 'Primfaktoren des Nenners ' + f[1] + ': ' + M.factors(f[1]).join(' · ') + '. ' + (f[2] ? 'Es kommt ein anderer Faktor als 2 oder 5 vor: periodisch.' : 'Es kommen nur 2 und 5 vor: Die Dezimalzahl endet.'), hint: 'Zerlege den Nenner in Primfaktoren (Klasse 5). Nur 2 und 5 – dann endet die Dezimalzahl.' });
  });
  G('6-dezimal', 2, function () {
    var list = [['{1/3}', '0,[3]', ['0,3', '0,[13]', '0,[03]']], ['{2/3}', '0,[6]', ['0,6', '0,[23]', '0,67']], ['{1/6}', '0,1[6]', ['0,[16]', '0,16', '0,6']], ['{1/9}', '0,[1]', ['0,9', '0,[9]', '0,19']], ['{5/9}', '0,[5]', ['0,59', '0,5', '0,[59]']], ['{5/6}', '0,8[3]', ['0,[83]', '0,56', '0,83']], ['{1/11}', '0,[09]', ['0,[11]', '0,11', '0,[9]']], ['{4/9}', '0,[4]', ['0,49', '0,4', '0,[49]']]], f = R.pick(list);
    return MC('Welche Dezimalzahl ist gleich $' + f[0] + '$? (Der Strich markiert die Periode.)', '$' + f[1] + '$', f[2].map(function (x) { return '$' + x + '$'; }), { sol: 'Schriftlich dividieren: Der Rest wiederholt sich, also wiederholen sich auch die Ziffern. $' + f[0] + ' = ' + f[1] + '$', hint: 'Dividiere Zähler durch Nenner und achte darauf, welcher Rest sich wiederholt.' });
  });
  G('6-dezimal', 2, function () {
    var f = R.pick([[1, 8, 0.125], [3, 8, 0.375], [5, 8, 0.625], [7, 8, 0.875], [1, 40, 0.025], [3, 40, 0.075], [7, 25, 0.28], [13, 20, 0.65], [9, 50, 0.18], [1, 16, 0.0625], [3, 16, 0.1875]]);
    return NUM('Schreibe als Dezimalzahl: ${' + f[0] + '/' + f[1] + '}$', f[2], { sol: 'Erweitern auf einen Zehnerbruch oder dividieren: $' + f[0] + ' : ' + f[1] + ' = ' + de(f[2]) + '$', hint: 'Erweitere auf den Nenner 100, 1000 oder 10 000 – oder dividiere schriftlich.' });
  });
  G('6-dezimal', 2, function () {
    var a = R.int(12, 98) / 10, b = R.int(11, 59) / 10, c = R.int(2, 9), r = M.round(a + b * c, 2);
    return NUM('Berechne: $' + de(a) + ' + ' + de(b) + ' * ' + c + '$', r, { sol: 'Punkt vor Strich: $' + de(b) + ' * ' + c + ' = ' + de(b * c) + '$, dann $' + de(a) + ' + ' + de(b * c) + ' = ' + de(r) + '$.', hint: 'Die Vorrangregeln aus Klasse 5 gelten auch für Dezimalzahlen.' });
  });
  G('6-dezimal', 3, function () {
    var price = R.pick([1.2, 1.6, 2.4, 0.8, 3.5, 2.25]), kg = R.pick([0.5, 1.5, 2.5, 0.75, 0.4, 1.2]), tot = M.round(price * kg, 2);
    return NUM('Ein Kilogramm Drachenfrucht kostet ' + M.fix(price, 2) + ' Taler. Wie viel kosten ' + de(kg) + ' kg?', tot, { unit: 'Taler', sol: '$' + de(price) + ' * ' + de(kg) + ' = ' + de(tot) + '$ Taler.', hint: 'Multipliziere Preis und Menge. Überschlage vorher, um das Komma zu prüfen.' });
  });
  G('6-dezimal', 3, function () {
    var per = R.pick([0.2, 0.25, 0.4, 0.5, 0.75, 1.5]), n = R.int(4, 16), tot = M.round(per * n, 2);
    return NUM('Aus ' + de(tot) + ' Litern Zaubertrank sollen Fläschchen mit je ' + de(per) + ' Litern gefüllt werden. Wie viele Fläschchen werden voll?', n, { sol: '$' + de(tot) + ' : ' + de(per) + ' = ' + n + '$', hint: 'Wie oft passt die kleine Menge in die große? Das ist eine Division.' });
  });

  /* ---------- 6-mengen ---------- */
  G('6-mengen', 1, function () {
    var items = [['$5$', true], ['$0$', true], ['${6/3}$', true], ['${12/4}$', true], ['$17$', true], ['${1/2}$', false], ['$0,5$', false], ['$2,7$', false], ['${7/3}$', false], ['$3,0$', true], ['${3/4}$', false]], it = R.pick(items);
    return TF('Wahr oder falsch? ' + it[0] + ' ist ein Element der Menge ℕ der natürlichen Zahlen.', it[1], { sol: it[1] ? 'Der Wert ist eine natürliche Zahl – die Schreibweise spielt keine Rolle.' : 'Der Wert liegt zwischen zwei natürlichen Zahlen. Er gehört zu den gebrochenen Zahlen, aber nicht zu ℕ.', hint: 'Es kommt auf den Wert an, nicht auf die Schreibweise.' });
  });
  G('6-mengen', 1, function () {
    var q = R.pick([['$A$ = {2; 4; 6} und $B$ = {1; 2; 3; 4; 5; 6}', '$A$ ist Teilmenge von $B$.', ['$B$ ist Teilmenge von $A$.', 'Keine ist Teilmenge der anderen.'], 'Jedes Element von $A$ kommt auch in $B$ vor.'], ['$A$ = {1; 3; 5; 7} und $B$ = {3; 5}', '$B$ ist Teilmenge von $A$.', ['$A$ ist Teilmenge von $B$.', 'Keine ist Teilmenge der anderen.'], 'Jedes Element von $B$ kommt auch in $A$ vor.'], ['$A$ = {1; 2; 3} und $B$ = {3; 4; 5}', 'Keine ist Teilmenge der anderen.', ['$A$ ist Teilmenge von $B$.', '$B$ ist Teilmenge von $A$.'], '1 gehört zu $A$, aber nicht zu $B$; 4 gehört zu $B$, aber nicht zu $A$.'], ['$A$ = Menge der geraden Zahlen und $B$ = ℕ', '$A$ ist Teilmenge von $B$.', ['$B$ ist Teilmenge von $A$.', 'Keine ist Teilmenge der anderen.'], 'Jede gerade Zahl ist eine natürliche Zahl – aber nicht umgekehrt.']]);
    return MC('Gegeben sind ' + q[0] + '. Was stimmt?', q[1], q[2], { sol: q[3], hint: 'Teilmenge heißt: Jedes Element der einen Menge liegt auch in der anderen.' });
  });
  G('6-mengen', 2, function () {
    var n = R.int(12, 30), t = R.pick([2, 3, 4, 5, 6]), cnt = Math.floor(n / t);
    return NUM('$M$ ist die Menge aller natürlichen Zahlen von 1 bis ' + n + ', die durch ' + t + ' teilbar sind. Wie viele Elemente hat $M$?', cnt, { sol: '$M$ = {' + Array.apply(null, Array(cnt)).map(function (_, i) { return (i + 1) * t; }).join('; ') + '} hat ' + cnt + ' Elemente.', hint: 'Schreibe die Elemente auf: ' + t + ', ' + 2 * t + ', ' + 3 * t + ' …' });
  });
  G('6-mengen', 2, function () {
    var st = R.pick([['Jede natürliche Zahl ist auch eine gebrochene Zahl.', true, 'Jede natürliche Zahl lässt sich als Bruch mit dem Nenner 1 schreiben: $5 = {5/1}$.'], ['Jede gebrochene Zahl ist auch eine natürliche Zahl.', false, 'Gegenbeispiel: ${1/2}$ ist keine natürliche Zahl.'], ['Im Bereich der natürlichen Zahlen ist jede Division ausführbar.', false, 'Gegenbeispiel: $3 : 4$ hat in ℕ kein Ergebnis. Deshalb wurden die Brüche eingeführt.'], ['Im Bereich der gebrochenen Zahlen ist jede Division ausführbar, außer durch 0.', true, 'Man multipliziert mit dem Kehrwert – das geht immer.'], ['${1/2}$ und $0,5$ sind zwei verschiedene Elemente der Menge der gebrochenen Zahlen.', false, 'Es ist dieselbe Zahl in zwei Schreibweisen.'], ['Zwischen zwei verschiedenen gebrochenen Zahlen liegt immer noch eine weitere gebrochene Zahl.', true, 'Zum Beispiel ihr arithmetisches Mittel (Klasse 5).'], ['Die Menge der natürlichen Zahlen hat ein größtes Element.', false, 'Zu jeder natürlichen Zahl gibt es einen Nachfolger.']]);
    return TF('Wahr oder falsch? ' + st[0], st[1], { sol: st[2] });
  });
  G('6-mengen', 2, function () {
    var a = R.int(3, 9), b = R.int(a + 2, 15), sym = R.pick(['∈', '∉']);
    var ins = R.bool(), x = ins ? R.int(a, b) : R.pick([a - 1, b + 1, b + 3]);
    return MCF('$M$ ist die Menge der natürlichen Zahlen von ' + a + ' bis ' + b + '. Welches Zeichen ist richtig? $' + x + '$ ▢ $M$', ['∈ (ist Element von)', '∉ (ist kein Element von)'].concat(['⊂ (ist Teilmenge von)']), ins ? 0 : 1, { sol: x + (ins ? ' liegt zwischen ' + a + ' und ' + b + ': $' + x + ' ∈ M$.' : ' liegt nicht zwischen ' + a + ' und ' + b + ': $' + x + ' ∉ M$.') + ' Das Zeichen ⊂ steht zwischen zwei Mengen.', hint: '∈ verbindet ein Element mit einer Menge, ⊂ verbindet zwei Mengen.' });
  });
  G('6-mengen', 3, function () {
    var all = R.int(24, 30), a = R.int(10, 16), b = R.int(8, 14), both = R.int(3, 7), none = all - (a + b - both);
    if (none < 0) return null;
    return NUM('In einer Klasse mit ' + all + ' Kindern spielen ' + a + ' ein Instrument, ' + b + ' singen im Chor, ' + both + ' davon tun beides. Wie viele Kinder machen keines von beiden?', none, { fig: Fig.venn({ la: 'I', lb: 'C', n: [a - both, both, b - both, '?'] }), sol: 'Nur Instrument: $' + (a - both) + '$, beides: $' + both + '$, nur Chor: $' + (b - both) + '$. Zusammen $' + (a + b - both) + '$. Übrig: $' + all + ' - ' + (a + b - both) + ' = ' + none + '$.', hint: 'Zähle die Kinder, die beides machen, nicht doppelt. Ein Mengendiagramm hilft.' });
  });

  /* ---------- 6-gleich ---------- */
  G('6-gleich', 1, function () {
    var d = R.pick([4, 5, 6, 8, 10]), x = R.int(1, d - 2), a = R.int(1, d - 1 - x), plus = R.bool();
    var q = plus ? 'x + {' + a + '/' + d + '} = {' + (x + a) + '/' + d + '}' : 'x - {' + a + '/' + d + '} = {' + x + '/' + d + '}';
    var sol = plus ? F(x, d) : F(x + a, d);
    return NUM('Löse die Gleichung und kürze, wenn möglich: $' + q + '$', sol, { pre: '$x =$', reduced: true, sol: 'Umkehraufgabe: $x = {' + (plus ? x + a : x) + '/' + d + '} ' + (plus ? '-' : '+') + ' {' + a + '/' + d + '} = ' + fs(sol) + '$', hint: 'Was wurde mit $x$ gemacht? Mache es rückgängig.' });
  });
  G('6-gleich', 2, function () {
    var a = frac(6), x = R.int(2, 12) * a.d / M.gcd(a.d, 1), prod = F(a.n * x, a.d);
    if (prod.d !== 1) return null;
    return NUM('Löse die Gleichung: $' + fs(a) + ' * a = ' + prod.n + '$', x, { pre: '$a =$', sol: 'Umkehraufgabe: $a = ' + prod.n + ' : ' + fs(a) + ' = ' + prod.n + ' * {' + a.d + '/' + a.n + '} = ' + x + '$. Probe: $' + fs(a) + ' * ' + x + ' = ' + prod.n + '$ ✓', hint: 'Die Umkehrung der Multiplikation ist die Division – also mit dem Kehrwert multiplizieren.' });
  });
  G('6-gleich', 2, function () {
    var x = R.int(2, 9), n = R.int(2, 6) * x, d = R.pick([2, 3, 4, 5]);
    return NUM('Löse die Gleichung: ${' + n + '/v} = ' + n / x + '$', x, { pre: '$v =$', sol: 'Gesucht ist die Zahl, durch die man ' + n + ' teilen muss, um ' + n / x + ' zu erhalten: $' + n + ' : ' + n / x + ' = ' + x + '$.', hint: 'Der Bruchstrich bedeutet „geteilt durch“.' });
  });
  G('6-gleich', 2, function () {
    var a = R.int(2, 9) / 10, x = R.int(2, 30) / 10, v = R.int(0, 1), r = M.round(v ? a * x : a + x, 2);
    return NUM('Löse die Gleichung: $' + (v ? de(a) + ' * x' : 'x + ' + de(a)) + ' = ' + de(r) + '$', x, { pre: '$x =$', sol: 'Umkehraufgabe: $x = ' + de(r) + (v ? ' : ' : ' - ') + de(a) + ' = ' + de(x) + '$', hint: 'Überlege die Umkehraufgabe.' });
  });
  G('6-gleich', 2, function () {
    var b = R.int(3, 9), lim = R.int(3, 8), v = R.bool();
    var cnt = v ? lim : lim - 1;
    return NUM(v ? 'Wie viele natürliche Zahlen $x$ (ab 0) erfüllen die Ungleichung $x + ' + b + ' < ' + (b + lim) + '$?' : 'Wie viele natürliche Zahlen $x$ größer als 0 erfüllen die Ungleichung $' + b + ' * x < ' + b * lim + '$?', cnt, { sol: v ? '$x$ muss kleiner als ' + lim + ' sein: 0, 1, …, ' + (lim - 1) + ' – das sind ' + lim + ' Zahlen.' : '$x$ muss kleiner als ' + lim + ' sein: 1, …, ' + (lim - 1) + ' – das sind ' + (lim - 1) + ' Zahlen.', hint: 'Finde zuerst die Grenze: Für welches $x$ wären beide Seiten gleich?' });
  });
  G('6-gleich', 3, function () {
    var x = R.int(3, 15), k = R.int(2, 5), c = R.int(2, 12), name = R.pick(SZ.NAMES);
    return MC(name + ' denkt sich eine Zahl $x$, multipliziert sie mit ' + k + ' und addiert ' + c + '. Das Ergebnis ist ' + (k * x + c) + '. Welche Gleichung passt?', '$' + k + ' * x + ' + c + ' = ' + (k * x + c) + '$', ['$' + k + ' * (x + ' + c + ') = ' + (k * x + c) + '$', '$x + ' + k + ' * ' + c + ' = ' + (k * x + c) + '$', '$' + k + ' + x * ' + c + ' = ' + (k * x + c) + '$'], { sol: 'Erst mal ' + k + ', dann plus ' + c + ': $' + k + ' * x + ' + c + '$. Die Lösung ist $x = ' + x + '$.', hint: 'Übersetze Schritt für Schritt: Was passiert zuerst mit $x$?' });
  });
  G('6-gleich', 3, function () {
    var x = R.int(3, 15), k = R.int(2, 5), c = R.int(2, 12);
    return NUM('Ich denke mir eine Zahl, multipliziere sie mit ' + k + ' und addiere ' + c + '. Ich erhalte ' + (k * x + c) + '. Wie heißt meine Zahl?', x, { sol: 'Rückwärts rechnen: $' + (k * x + c) + ' - ' + c + ' = ' + k * x + '$, dann $' + k * x + ' : ' + k + ' = ' + x + '$.', hint: 'Arbeite rückwärts: Mache den letzten Schritt zuerst rückgängig.' });
  });

  /* ---------- 6-zuord ---------- */
  G('6-zuord', 1, function () {
    var q = R.pick([['Jedem Kind einer Klasse wird sein Geburtstag zugeordnet.', 0, 'Jedes Kind hat genau einen Geburtstag – aber zwei Kinder können am selben Tag Geburtstag haben.'], ['Jedem Schüler wird seine Schülerausweisnummer zugeordnet.', 1, 'Jeder Schüler hat genau eine Nummer und jede Nummer gehört zu genau einem Schüler.'], ['Jedem Vornamen werden die Kinder der Schule mit diesem Vornamen zugeordnet.', 2, 'Zu einem Vornamen kann es mehrere Kinder geben.'], ['Jeder natürlichen Zahl wird ihr Doppeltes zugeordnet.', 1, 'Jede Zahl hat genau ein Doppeltes, und aus dem Doppelten findet man eindeutig zurück.'], ['Jeder natürlichen Zahl werden ihre Teiler zugeordnet.', 2, 'Die meisten Zahlen haben mehrere Teiler.'], ['Jedem Buch der Bibliothek wird seine Seitenzahl zugeordnet.', 0, 'Jedes Buch hat genau eine Seitenzahl – aber verschiedene Bücher können gleich viele Seiten haben.'], ['Jedem Punkt wird bei einer Spiegelung sein Bildpunkt zugeordnet.', 1, 'Zu jedem Punkt gehört genau ein Bildpunkt und umgekehrt.'], ['Jeder Zahl wird ihre Quersumme zugeordnet.', 0, 'Jede Zahl hat genau eine Quersumme – aber 12 und 21 haben dieselbe.']]);
    return MCF(q[0] + ' Diese Zuordnung ist …', ['eindeutig, aber nicht eineindeutig', 'eineindeutig', 'mehrdeutig'], q[1], { sol: q[2], hint: 'Eindeutig: genau ein Partner. Eineindeutig: in beiden Richtungen genau ein Partner.' });
  });
  G('6-zuord', 1, function () {
    var k = R.int(2, 6), c = R.int(0, 5), x = R.int(2, 9);
    return NUM('Eine Zuordnung hat die Vorschrift: „Multipliziere mit ' + k + (c ? ' und addiere ' + c : '') + '.“ Welche Zahl wird der ' + x + ' zugeordnet?', k * x + c, { sol: '$' + k + ' * ' + x + (c ? ' + ' + c : '') + ' = ' + (k * x + c) + '$', hint: 'Setze die Zahl in die Vorschrift ein.' });
  });
  G('6-zuord', 2, function () {
    var k = R.int(2, 5), c = R.int(0, 6), xs = [1, 2, 3, 4], rows = xs.map(function (x) { return k * x + c; });
    return NUM('Die Tabelle zeigt eine Zuordnung $x ↦ y$.<br><table class="tb"><tr><th>$x$</th><td>1</td><td>2</td><td>3</td><td>4</td><td>7</td></tr><tr><th>$y$</th><td>' + rows.join('</td><td>') + '</td><td>?</td></tr></table>Welcher Wert gehört zu $x = 7$?', 7 * k + c, { sol: 'Von Spalte zu Spalte wächst $y$ um ' + k + '. Vorschrift: $y = ' + k + ' * x' + (c ? ' + ' + c : '') + '$. Für $x = 7$: $' + (7 * k + c) + '$.', hint: 'Um wie viel wächst $y$, wenn $x$ um 1 wächst?' });
  });
  G('6-zuord', 2, function () {
    var vals = [R.int(2, 6), R.int(4, 9), R.int(7, 12), R.int(5, 10), R.int(1, 5)], days = ['Mo', 'Di', 'Mi', 'Do', 'Fr'], v = R.int(0, 2);
    var max = Math.max.apply(null, vals), min = Math.min.apply(null, vals);
    if (vals.filter(function (x) { return x === max; }).length > 1 || vals.filter(function (x) { return x === min; }).length > 1) return null;
    var fig = Fig.bars({ labels: days, vals: vals, step: 2, yl: '°C' });
    if (v === 0) return MCF('Das Diagramm ordnet jedem Wochentag die Mittagstemperatur zu. An welchem Tag war es am wärmsten?', days, vals.indexOf(max), { fig: fig, sol: 'Die höchste Säule gehört zu ' + days[vals.indexOf(max)] + ' mit ' + max + ' °C.' });
    if (v === 1) return NUM('Das Diagramm ordnet jedem Wochentag die Mittagstemperatur zu. Um wie viel Grad war es am wärmsten Tag wärmer als am kältesten?', max - min, { unit: '°C', fig: fig, sol: '$' + max + ' - ' + min + ' = ' + (max - min) + '$ °C', hint: 'Lies die höchste und die niedrigste Säule ab.' });
    return NUM('Das Diagramm ordnet jedem Wochentag die Mittagstemperatur zu. Welche Temperatur gehört zu ' + days[2] + '?', vals[2], { unit: '°C', fig: fig, sol: 'Die Säule über ' + days[2] + ' endet bei ' + vals[2] + ' °C.', hint: 'Suche den Tag auf der waagerechten Achse und lies die Höhe ab.' });
  });
  G('6-zuord', 2, function () {
    var st = R.pick([['Jede eineindeutige Zuordnung ist auch eindeutig.', true, 'Eineindeutig heißt: eindeutig in beiden Richtungen.'], ['Jede eindeutige Zuordnung ist auch eineindeutig.', false, 'Gegenbeispiel: Kind ↦ Geburtstag. Zwei Kinder können am selben Tag Geburtstag haben.'], ['Eine Zuordnung kann man als Tabelle, als Diagramm oder mit einer Gleichung darstellen.', true, 'Alle Darstellungen enthalten dieselben Paare.'], ['Bei einer eindeutigen Zuordnung darf einem Element nur ein einziges Element zugeordnet werden.', true, 'Genau das bedeutet „eindeutig“.'], ['Die Zuordnung Zahl ↦ Vielfache der Zahl ist eindeutig.', false, 'Jede Zahl (außer 0) hat unendlich viele Vielfache.']]);
    return TF('Wahr oder falsch? ' + st[0], st[1], { sol: st[2] });
  });
  G('6-zuord', 3, function () {
    var k = R.int(2, 4), c = R.int(1, 5), y = k * R.int(3, 9) + c;
    return NUM('Eine Zuordnung hat die Gleichung $y = ' + k + ' * x + ' + c + '$. Zu welchem $x$ gehört $y = ' + y + '$?', (y - c) / k, { pre: '$x =$', sol: 'Rückwärts: $' + y + ' - ' + c + ' = ' + (y - c) + '$, dann $' + (y - c) + ' : ' + k + ' = ' + (y - c) / k + '$.', hint: 'Löse die Gleichung $' + k + ' * x + ' + c + ' = ' + y + '$ durch Rückwärtsrechnen.' });
  });

  /* ---------- 6-prop ---------- */
  G('6-prop', 1, function () {
    var a = R.int(2, 6), p = R.int(2, 9), b = R.intNot(3, 12, [a]), th = R.pick([['Kessel', 'fassen zusammen', 'Liter', 'fassen'], ['Kristalle', 'kosten zusammen', 'Taler', 'kosten'], ['Phiolen', 'wiegen zusammen', 'Gramm', 'wiegen'], ['Zauberbücher', 'kosten zusammen', 'Taler', 'kosten']]);
    return NUM(a + ' gleiche ' + th[0] + ' ' + th[1] + ' ' + a * p + ' ' + th[2] + '. Wie viel ' + th[2] + ' ' + th[3] + ' ' + b + ' ' + th[0] + '?', b * p, { unit: th[2], sol: 'Dreisatz: 1 Stück entspricht $' + a * p + ' : ' + a + ' = ' + p + '$. Dann $' + b + ' * ' + p + ' = ' + b * p + '$.', hint: 'Schließe erst auf 1, dann auf ' + b + '.' });
  });
  G('6-prop', 2, function () {
    var a = R.pick([2, 3, 4, 6]), t = R.pick([12, 24, 36, 48, 60]), b = R.pick([2, 3, 4, 6, 8, 12].filter(function (x) { return x !== a && (a * t) % x === 0; }));
    if (!b) return null;
    return NUM(a + ' Zauberlehrlinge brauchen ' + t + ' Minuten, um die Bibliothek aufzuräumen. Wie lange brauchen ' + b + ' Zauberlehrlinge, wenn alle gleich schnell arbeiten?', a * t / b, { unit: 'min', sol: 'Indirekt proportional: Das Produkt bleibt gleich. $' + a + ' * ' + t + ' = ' + a * t + '$ Minuten Arbeit. $' + a * t + ' : ' + b + ' = ' + a * t / b + '$ Minuten.', hint: 'Mehr Helfer – weniger Zeit. Wie viel Arbeit (in Minuten für eine Person) ist es insgesamt?' });
  });
  G('6-prop', 1, function () {
    var q = R.pick([['Anzahl der Brötchen ↦ Preis', 0], ['Anzahl der Arbeiter ↦ Zeit für dieselbe Arbeit', 1], ['Alter eines Kindes ↦ Körpergröße', 2], ['Seitenlänge eines Quadrats ↦ Umfang', 0], ['Geschwindigkeit ↦ Fahrzeit für dieselbe Strecke', 1], ['Seitenlänge eines Quadrats ↦ Flächeninhalt', 2], ['Menge Benzin ↦ Preis an der Tankstelle', 0], ['Anzahl der Gäste ↦ Größe der Tortenstücke bei einer Torte', 1], ['Gewicht eines Briefes ↦ Porto', 2]]);
    return MCF('Welche Art von Zuordnung ist das? ' + q[0], ['direkt proportional', 'indirekt proportional', 'keines von beiden'], q[1], { sol: q[1] === 0 ? 'Zum Doppelten gehört das Doppelte: direkt proportional.' : q[1] === 1 ? 'Zum Doppelten gehört die Hälfte: indirekt proportional.' : 'Die Werte ändern sich nicht im gleichen Verhältnis – weder Quotient noch Produkt bleibt gleich.', hint: 'Was passiert mit der zweiten Größe, wenn sich die erste verdoppelt?' });
  });
  G('6-prop', 2, function () {
    var k = R.pick([1.5, 2, 2.5, 3, 4, 0.5]), xs = [2, 4, 6, 8], dir = R.bool(), prod = R.pick([24, 48, 72, 96]);
    var ys = xs.map(function (x) { return dir ? k * x : prod / x; }), bad = R.bool(0.35);
    if (bad) ys[2] = ys[2] + (dir ? 1 : 2);
    var tb = '<table class="tb"><tr><th>$x$</th><td>' + xs.join('</td><td>') + '</td></tr><tr><th>$y$</th><td>' + ys.map(function (y) { return de(y); }).join('</td><td>') + '</td></tr></table>';
    return MCF('Untersuche die Tabelle.' + tb + 'Die Zuordnung ist …', ['direkt proportional', 'indirekt proportional', 'keines von beiden'], bad ? 2 : (dir ? 0 : 1), { sol: bad ? 'Weder die Quotienten $y : x$ noch die Produkte $x * y$ sind alle gleich.' : dir ? 'Quotientengleichheit: $y : x = ' + de(k) + '$ für alle Paare.' : 'Produktgleichheit: $x * y = ' + prod + '$ für alle Paare.', hint: 'Prüfe für jedes Paar den Quotienten $y : x$ und das Produkt $x * y$.' });
  });
  G('6-prop', 2, function () {
    var k = R.pick([0.5, 1, 1.5, 2]), x = R.pick([2, 4, 6]);
    return NUM('Der Graph zeigt eine direkt proportionale Zuordnung. Welcher $y$-Wert gehört zu $x = ' + x * 5 + '$?', k * x * 5, { fig: Fig.graph({ x: [0, 8], y: [0, 8], w: 220, fns: [{ f: function (t) { return k * t; } }], pts: [{ x: 2, y: 2 * k, l: '' }] }), sol: 'Am Graphen ablesen: Zu $x = 2$ gehört $y = ' + de(2 * k) + '$, der Quotient ist $' + de(k) + '$. Für $x = ' + x * 5 + '$: $' + de(k) + ' * ' + x * 5 + ' = ' + de(k * x * 5) + '$.', hint: 'Lies ein Wertepaar ab und bestimme den Quotienten $y : x$.' });
  });
  G('6-prop', 3, function () {
    var a = R.pick([3, 4, 5, 6]), d = R.pick([8, 10, 12, 15, 20]), b = R.pick([2, 4, 5, 6, 8, 10].filter(function (x) { return x !== a && (a * d) % x === 0; }));
    if (!b) return null;
    return NUM('Ein Futtervorrat reicht für ' + a + ' Drachen genau ' + d + ' Tage. Wie viele Tage reicht er für ' + b + ' Drachen, wenn jeder gleich viel frisst?', a * d / b, { unit: 'Tage', sol: 'Produktgleichheit: $' + a + ' * ' + d + ' = ' + a * d + '$ Tagesrationen. $' + a * d + ' : ' + b + ' = ' + a * d / b + '$ Tage.', hint: 'Wie viele Tagesrationen sind es insgesamt?' });
  });
  G('6-prop', 3, function () {
    var per = R.pick([1.5, 2.5, 0.75, 1.2, 3.5]), a = R.pick([4, 6, 8]), b = R.pick([3, 5, 7, 10]);
    return NUM(a + ' Meter Samtband kosten ' + M.fix(a * per, 2) + ' Taler. Wie viel kosten ' + b + ' Meter?', M.round(b * per, 2), { unit: 'Taler', sol: '1 Meter kostet $' + de(a * per) + ' : ' + a + ' = ' + de(per) + '$ Taler. $' + b + ' * ' + de(per) + ' = ' + de(b * per) + '$ Taler.', hint: 'Dreisatz über 1 Meter.' });
  });

  /* ---------- 6-haeufig ---------- */
  G('6-haeufig', 1, function () {
    var tot = R.pick([20, 25, 40, 50]), a = R.int(2, tot / 2 - 1), r = F(a, tot);
    return NUM('Von ' + tot + ' Kindern spielen ' + a + ' ein Instrument. Wie groß ist die relative Häufigkeit? Gib sie in Prozent an.', M.round(a / tot * 100, 2), { unit: '%', sol: '${' + a + '/' + tot + '} = {' + a * 100 / tot + '/100} = ' + de(a * 100 / tot) + ' %$', hint: 'Relative Häufigkeit = absolute Häufigkeit geteilt durch die Gesamtzahl. Erweitere auf Hundertstel.' });
  });
  G('6-haeufig', 1, function () {
    var tot = R.pick([12, 18, 24, 30, 36]), a = R.int(2, tot - 2), r = F(a, tot);
    return NUM('Ein Würfel wird ' + tot + '-mal geworfen. Dabei fällt ' + a + '-mal eine gerade Zahl. Gib die relative Häufigkeit als vollständig gekürzten Bruch an.', r, { reduced: true, sol: '${' + a + '/' + tot + '}' + (r.d !== tot ? ' = ' + fs(r) : '') + '$', hint: 'Absolute Häufigkeit durch Gesamtzahl – dann kürzen.' });
  });
  G('6-haeufig', 2, function () {
    var tot = R.pick([20, 40, 50, 200]), p = R.pick([10, 15, 20, 25, 30, 35, 45, 60]), a = tot * p / 100;
    if (a % 1 !== 0) return null;
    return NUM('Bei einer Umfrage unter ' + tot + ' Schülern beträgt die relative Häufigkeit der Antwort „Ich lese gern“ ' + p + ' %. Wie viele Schüler haben so geantwortet?', a, { sol: '$' + p + ' % = {' + p + '/100}$. Davon ' + tot + ': ${' + p + '/100} * ' + tot + ' = ' + a + '$.', hint: 'Absolute Häufigkeit = relative Häufigkeit mal Gesamtzahl.' });
  });
  G('6-haeufig', 2, function () {
    var a1 = R.int(6, 9), t1 = 10, a2 = R.int(14, 22), t2 = R.pick([25, 40, 50]);
    if (a1 / t1 === a2 / t2) return null;
    return MCF('Mannschaft A trifft bei ' + a1 + ' von ' + t1 + ' Würfen, Mannschaft B bei ' + a2 + ' von ' + t2 + ' Würfen. Welche Mannschaft hat die höhere Trefferquote?', ['Mannschaft A', 'Mannschaft B'].concat(['Beide sind gleich gut.']), a1 / t1 > a2 / t2 ? 0 : 1, { sol: 'A: ${' + a1 + '/' + t1 + '} = ' + de(a1 * 100 / t1) + ' %$. B: ${' + a2 + '/' + t2 + '} = ' + de(a2 * 100 / t2) + ' %$. Verglichen werden die relativen Häufigkeiten, nicht die Trefferzahlen.', hint: 'Vergleiche die Anteile, nicht die Anzahlen.' });
  });
  G('6-haeufig', 2, function () {
    var p = R.pick([10, 20, 25, 30, 40, 50, 75, 5, 15]);
    if (R.bool()) return NUM('In einem Kreisdiagramm soll ein Anteil von ' + p + ' % dargestellt werden. Wie groß ist der Winkel des Kreissektors?', p * 3.6, { unit: '°', sol: '$' + p + ' %$ von 360°: ${' + p + '/100} * 360° = ' + de(p * 3.6) + '°$', hint: 'Der Vollkreis (360°) steht für 100 %.' });
    return NUM('In einem Kreisdiagramm hat ein Sektor den Winkel ' + de(p * 3.6) + '°. Wie viel Prozent stellt er dar?', p, { unit: '%', sol: '${' + de(p * 3.6) + '/360} = ' + de(p / 100) + ' = ' + p + ' %$', hint: 'Welcher Anteil von 360° ist das?' });
  });
  G('6-haeufig', 2, function () {
    var parts = R.pick([[50, 25, 25], [40, 40, 20], [60, 30, 10], [50, 30, 20], [25, 25, 50]]), labs = ['Flöte', 'Geige', 'Klavier'], tot = R.pick([20, 40, 60, 80]), i = R.int(0, 2);
    return NUM('Das Kreisdiagramm zeigt, welches Instrument ' + tot + ' Kinder der Musikschule am liebsten spielen. Wie viele Kinder haben „' + labs[i] + '“ gewählt?', tot * parts[i] / 100, { fig: Fig.pie({ vals: parts, labels: labs.map(function (l, k) { return l + ' ' + parts[k] + ' %'; }) }), sol: '$' + parts[i] + ' %$ von ' + tot + ': ${' + parts[i] + '/100} * ' + tot + ' = ' + tot * parts[i] / 100 + '$', hint: 'Lies den Prozentsatz ab und berechne den Anteil an ' + tot + '.' });
  });
  G('6-haeufig', 3, function () {
    var a = R.int(3, 8), b = R.int(4, 9), c = R.int(2, 7), tot = a + b + c, r = F(a + b, tot);
    return NUM('In einer Urne liegen ' + a + ' rote, ' + b + ' blaue und ' + c + ' gelbe Kugeln. Welcher Anteil der Kugeln ist nicht gelb? (vollständig gekürzter Bruch)', r, { reduced: true, fig: Fig.urn([['rot', a], ['blau', b], ['gelb', c]]), sol: 'Nicht gelb sind $' + a + ' + ' + b + ' = ' + (a + b) + '$ von ' + tot + ' Kugeln: ${' + (a + b) + '/' + tot + '}' + (r.d !== tot ? ' = ' + fs(r) : '') + '$', hint: 'Zähle erst alle Kugeln, dann die nicht gelben.' });
  });
  G('6-haeufig', 3, function () {
    var st = R.pick([['Die Summe aller relativen Häufigkeiten ist immer 1.', true, 'Jedes Ergebnis wird genau einmal gezählt – zusammen das Ganze, also 100 %.'], ['Eine relative Häufigkeit kann größer als 1 sein.', false, 'Der Teil kann nicht größer sein als das Ganze.'], ['Wenn die absolute Häufigkeit größer ist, ist auch die relative Häufigkeit immer größer.', false, 'Gegenbeispiel: 8 von 10 (80 %) ist ein größerer Anteil als 20 von 50 (40 %).'], ['Eine relative Häufigkeit von 0,25 bedeutet 25 %.', true, '$0,25 = {25/100} = 25 %$'], ['Tritt ein Ergebnis nie auf, ist seine relative Häufigkeit 0.', true, '0 geteilt durch die Gesamtzahl ist 0.']]);
    return TF('Wahr oder falsch? ' + st[0], st[1], { sol: st[2] });
  });

  /* ---------- 6-dreieck ---------- */
  function tri(al, be, labs, sides) {                 // Dreieck mit Winkeln al (bei A), be (bei B)
    var A = [0, 0], B = [6, 0], ta = Math.tan(al * Math.PI / 180), tb = Math.tan(be * Math.PI / 180);
    var x = 6 * tb / (ta + tb), y = x * ta;
    return Fig.shape({ P: [A, B, [x, y]], v: ['A', 'B', 'C'], ang: [{ at: 0, l: labs[0] }, { at: 1, l: labs[1] }, { at: 2, l: labs[2] }], s: sides || [], maxh: 130 });
  }
  G('6-dreieck', 1, function () {
    var al = R.int(30, 80), be = R.int(30, 80), ga = 180 - al - be;
    if (ga < 25) return null;
    return NUM('Wie groß ist der Winkel $γ$?', ga, { unit: '°', fig: tri(al, be, [al + '°', be + '°', 'γ']), sol: 'Innenwinkelsatz: $γ = 180° - ' + al + '° - ' + be + '° = ' + ga + '°$', hint: 'Die Innenwinkel eines Dreiecks ergeben zusammen 180°.' });
  });
  G('6-dreieck', 1, function () {
    var base = R.int(35, 75), top = 180 - 2 * base, v = R.bool();
    if (v) return NUM('Ein gleichschenkliges Dreieck hat die Basiswinkel ' + base + '°. Wie groß ist der Winkel an der Spitze?', top, { unit: '°', fig: tri(base, base, [base + '°', base + '°', '?']), sol: 'Beide Basiswinkel sind gleich: $180° - 2 * ' + base + '° = ' + top + '°$', hint: 'Basiswinkelsatz und Innenwinkelsatz zusammen.' });
    return NUM('Ein gleichschenkliges Dreieck hat an der Spitze den Winkel ' + top + '°. Wie groß ist jeder Basiswinkel?', base, { unit: '°', fig: tri(base, base, ['?', '?', top + '°']), sol: 'Für beide Basiswinkel bleiben $180° - ' + top + '° = ' + 2 * base + '°$, jeder ist also ' + base + '° groß.', hint: 'Die beiden Basiswinkel sind gleich groß und teilen sich den Rest zu 180°.' });
  });
  G('6-dreieck', 2, function () {
    var a = R.int(3, 9), b = R.int(3, 9), ok = R.bool(), c = ok ? R.int(Math.abs(a - b) + 1, a + b - 1) : R.pick([a + b, a + b + R.int(1, 4)]);
    return TF('Kann man ein Dreieck mit den Seitenlängen ' + a + ' cm, ' + b + ' cm und ' + c + ' cm konstruieren?', ok, { sol: 'Dreiecksungleichung: Zwei Seiten müssen zusammen länger sein als die dritte. Hier: ' + [[a, b, c], [a, c, b], [b, c, a]].map(function (t) { return '$' + t[0] + ' + ' + t[1] + (t[0] + t[1] > t[2] ? ' > ' : (t[0] + t[1] === t[2] ? ' = ' : ' < ')) + t[2] + '$'; }).join(', ') + '.' + (ok ? '' : ' Die Bedingung ist verletzt.'), hint: 'Prüfe: Sind die zwei kürzeren Seiten zusammen länger als die längste?' });
  });
  G('6-dreieck', 2, function () {
    var q = R.pick([['drei Seitenlängen', 'sss', true], ['zwei Seiten und der eingeschlossene Winkel', 'sws', true], ['eine Seite und die beiden anliegenden Winkel', 'wsw', true], ['drei Winkel', 'www', false], ['zwei Seiten und der Gegenwinkel der längeren Seite', 'SsW', true]]);
    return TF('Von einem Dreieck sind gegeben: ' + q[0] + '. Ist das Dreieck dadurch eindeutig bestimmt (bis auf Kongruenz)?', q[2], { sol: q[2] ? 'Ja – das ist der Kongruenzsatz ' + q[1] + '.' : 'Nein – drei Winkel legen nur die Form fest, nicht die Größe. Es gibt beliebig viele verschieden große Dreiecke mit denselben Winkeln.', hint: 'Denke an die Kongruenzsätze sss, sws, wsw und SsW.' });
  });
  G('6-dreieck', 2, function () {
    var al = R.pick([35, 45, 55, 65, 75]), be = R.pick([40, 50, 60, 70]), ga = 180 - al - be, arr = [['a', al], ['b', be], ['c', ga]];
    if (al === be || al === ga || be === ga) return null;
    arr.sort(function (x, y) { return y[1] - x[1]; });
    return MCF('In einem Dreieck sind $α = ' + al + '°$, $β = ' + be + '°$ und $γ = ' + ga + '°$. Welche Seite ist die längste?', ['Seite $a$', 'Seite $b$', 'Seite $c$'], ['a', 'b', 'c'].indexOf(arr[0][0]), { sol: 'Seiten-Winkel-Beziehung: Dem größten Winkel liegt die längste Seite gegenüber. Der größte Winkel ist ' + arr[0][1] + '°.', hint: 'Der Seite $a$ liegt $α$ gegenüber, $b$ liegt $β$ gegenüber, $c$ liegt $γ$ gegenüber.' });
  });
  G('6-dreieck', 2, function () {
    var q = R.pick([['Welche Linie verläuft von einer Ecke senkrecht zur gegenüberliegenden Seite?', 'Höhe'], ['Welche Linie verbindet eine Ecke mit dem Mittelpunkt der gegenüberliegenden Seite?', 'Seitenhalbierende'], ['Welche Linie teilt einen Innenwinkel in zwei gleich große Winkel?', 'Winkelhalbierende'], ['Welche Linie steht senkrecht auf einer Seite und geht durch deren Mittelpunkt?', 'Mittelsenkrechte']]);
    return MC(q[0], q[1], ['Höhe', 'Seitenhalbierende', 'Winkelhalbierende', 'Mittelsenkrechte'], { sol: 'Höhe: Lot von der Ecke auf die Gegenseite. Seitenhalbierende: Ecke – Seitenmitte. Winkelhalbierende: halbiert den Winkel. Mittelsenkrechte: senkrecht durch die Seitenmitte.' });
  });
  G('6-dreieck', 3, function () {
    var inner = R.int(35, 70), other = R.int(40, 75), ext = inner + other;
    return NUM('In einem Dreieck sind $α = ' + inner + '°$ und $β = ' + other + '°$. Wie groß ist der Außenwinkel bei $C$ (der Nebenwinkel von $γ$)?', ext, { unit: '°', sol: '$γ = 180° - ' + inner + '° - ' + other + '° = ' + (180 - ext) + '°$. Der Nebenwinkel ist $180° - ' + (180 - ext) + '° = ' + ext + '°$ – genau die Summe von $α$ und $β$.', hint: 'Erst $γ$ mit dem Innenwinkelsatz, dann den Nebenwinkel (Klasse 5).' });
  });
  G('6-dreieck', 3, function () {
    var k = R.pick([[1, 2, 3], [1, 1, 2], [2, 3, 4], [1, 2, 6], [3, 4, 5], [1, 3, 5]]), s = k[0] + k[1] + k[2], unit = 180 / s;
    return NUM('Die Innenwinkel eines Dreiecks verhalten sich wie $' + k.join(' : ') + '$. Wie groß ist der größte Winkel?', unit * k[2], { unit: '°', sol: 'Insgesamt $' + s + '$ Teile für 180°: Ein Teil ist $' + de(unit) + '°$. Der größte Winkel: $' + k[2] + ' * ' + de(unit) + '° = ' + de(unit * k[2]) + '°$.', hint: 'Teile 180° in ' + s + ' gleiche Teile.' });
  });

  /* ---------- 6-beweis ---------- */
  G('6-beweis', 1, function () {
    var q = R.pick([['Ein Dreieck mit drei gleich langen Seiten heißt gleichseitig.', 0], ['In jedem Dreieck beträgt die Summe der Innenwinkel 180°.', 1], ['Ein Viereck mit vier rechten Winkeln heißt Rechteck.', 0], ['Im gleichschenkligen Dreieck sind die Basiswinkel gleich groß.', 1], ['Eine natürliche Zahl mit genau zwei Teilern heißt Primzahl.', 0], ['Scheitelwinkel sind gleich groß.', 1], ['Zwei Winkel, die sich zu 180° ergänzen und nebeneinanderliegen, heißen Nebenwinkel.', 0], ['In jedem Dreieck sind zwei Seiten zusammen länger als die dritte.', 1], ['Es gibt unendlich viele Primzahlen.', 1]]);
    return MCF('Definition oder Satz? „' + q[0] + '“', ['Definition (legt einen Begriff fest)', 'Satz (eine Aussage, die bewiesen werden muss)'].concat(['Weder noch']), q[1], { sol: q[1] === 0 ? 'Hier wird nur festgelegt, wie etwas heißt. Das kann man nicht beweisen – es ist eine Vereinbarung.' : 'Das ist eine Behauptung über alle Fälle. Sie gilt erst, wenn sie bewiesen wurde.', hint: 'Wird ein Name vergeben – oder etwas behauptet?' });
  });
  G('6-beweis', 2, function () {
    return ORD('Bringe die Schritte des Beweises für den Innenwinkelsatz in die richtige Reihenfolge.', ['Zeichne durch $C$ die Parallele zur Seite $AB$.', 'An $C$ liegen nun drei Winkel nebeneinander: einer links, $γ$ in der Mitte, einer rechts.', 'Der linke Winkel ist Wechselwinkel zu $α$, der rechte ist Wechselwinkel zu $β$.', 'Die drei Winkel an $C$ bilden zusammen einen gestreckten Winkel: $α + γ + β = 180°$.'], { sol: 'Hilfslinie – Winkel betrachten – bekannten Satz anwenden (Wechselwinkel, Klasse 5) – Schluss ziehen. Was zu beweisen war.', hint: 'Ein Beweis beginnt bei dem, was gegeben ist, und endet bei der Behauptung.' });
  });
  G('6-beweis', 1, function () {
    var q = R.pick([['Wenn ein Dreieck gleichseitig ist, dann sind alle seine Winkel 60° groß.', 'Ein Dreieck ist gleichseitig.', 'Alle seine Winkel sind 60° groß.'], ['Wenn eine Zahl durch 6 teilbar ist, dann ist sie auch durch 3 teilbar.', 'Eine Zahl ist durch 6 teilbar.', 'Sie ist durch 3 teilbar.'], ['Wenn zwei Geraden parallel sind, dann sind Stufenwinkel an ihnen gleich groß.', 'Zwei Geraden sind parallel.', 'Stufenwinkel an ihnen sind gleich groß.'], ['Wenn ein Dreieck gleichschenklig ist, dann hat es zwei gleich große Winkel.', 'Ein Dreieck ist gleichschenklig.', 'Es hat zwei gleich große Winkel.']]), v = R.bool();
    return MC('Der Satz lautet: „' + q[0] + '“ Was ist die ' + (v ? 'Voraussetzung' : 'Behauptung') + '?', v ? q[1] : q[2], [v ? q[2] : q[1], 'Der ganze Satz.', 'Das steht nicht im Satz.'], { sol: 'Voraussetzung (nach „wenn“): ' + q[1] + ' Behauptung (nach „dann“): ' + q[2], hint: 'Die Voraussetzung steht hinter „wenn“, die Behauptung hinter „dann“.' });
  });
  G('6-beweis', 2, function () {
    var st = R.pick([['Wenn eine Aussage in 100 Beispielen stimmt, ist sie bewiesen.', false, 'Beispiele beweisen keine Aussage über alle Fälle. Der 101. Fall könnte ein Gegenbeispiel sein.'], ['Eine Definition kann man nicht beweisen.', true, 'Eine Definition ist eine Vereinbarung über die Bedeutung eines Begriffs.'], ['In einem Beweis darf man nur Definitionen und bereits bewiesene Sätze benutzen.', true, 'Nur so ist die Kette der Begründungen lückenlos.'], ['Wer in einer genauen Zeichnung nachmisst, hat einen Satz bewiesen.', false, 'Messen zeigt nur einen einzelnen Fall und ist nie ganz genau.'], ['Ein bewiesener Satz gilt für alle Fälle, die die Voraussetzung erfüllen.', true, 'Das ist die Stärke eines Beweises.'], ['Ein einziges Gegenbeispiel reicht aus, um eine Behauptung über alle Dreiecke zu widerlegen.', true, 'Die Behauptung sagt ja, dass es keine Ausnahme gibt.']]);
    return TF('Wahr oder falsch? ' + st[0], st[1], { sol: st[2] });
  });
  G('6-beweis', 3, function () {
    var q = R.pick([['Alle Vielfachen von 3 sind ungerade.', '6', ['9', '15', '3'], '6 ist ein Vielfaches von 3 und gerade.'], ['Jede Primzahl ist ungerade.', '2', ['3', '9', '7'], '2 ist eine Primzahl und gerade.'], ['Jede Zahl, die durch 2 teilbar ist, ist auch durch 4 teilbar.', '6', ['8', '12', '4'], '6 ist durch 2 teilbar, aber nicht durch 4.'], ['Das Produkt zweier Zahlen ist immer größer als jede der beiden Zahlen.', '${1/2} * 4$', ['$2 * 3$', '$5 * 4$', '$3 * 3$'], '${1/2} * 4 = 2$ ist kleiner als 4.'], ['Jedes Viereck mit vier gleich langen Seiten ist ein Quadrat.', 'eine Raute mit spitzen Winkeln', ['ein Quadrat', 'ein Rechteck', 'ein Trapez'], 'Die Raute hat vier gleich lange Seiten, aber keine rechten Winkel.']]);
    return MC('Welches Beispiel widerlegt die Behauptung? „' + q[0] + '“', q[1], q[2], { sol: 'Gegenbeispiel: ' + q[3], hint: 'Gesucht ist ein Fall, der die Voraussetzung erfüllt, aber nicht die Behauptung.' });
  });
  G('6-beweis', 3, function () {
    return ORD('Warum sind Scheitelwinkel gleich groß? Ordne die Beweisschritte.', ['Zwei Geraden schneiden sich; $α$ und $γ$ sind Scheitelwinkel, $β$ liegt dazwischen.', '$α$ und $β$ sind Nebenwinkel, also $α = 180° - β$.', '$γ$ und $β$ sind ebenfalls Nebenwinkel, also $γ = 180° - β$.', 'Beide sind gleich $180° - β$, also gilt $α = γ$.'], { sol: 'Beide Scheitelwinkel haben denselben Nebenwinkel $β$. Deshalb müssen sie gleich groß sein.', hint: 'Beginne mit der Situation, ende mit der Behauptung.' });
  });

  /* ---------- 6-viereck ---------- */
  G('6-viereck', 1, function () {
    var gg = R.int(4, 12), h = R.int(3, 10);
    if (gg * h % 2) gg++;
    return NUM('Berechne den Flächeninhalt des Dreiecks mit der Grundseite $g = ' + gg + '$ cm und der Höhe $h = ' + h + '$ cm.', gg * h / 2, { unit: '$cm^2$', fig: Fig.shape({ P: [[0, 0], [gg, 0], [gg * 0.35, h]], s: ['g', '', ''], extra: [{ from: [gg * 0.35, 0], to: [gg * 0.35, h], dash: true, l: 'h', dx: 9, it: true }], maxh: 120 }), sol: '$A = {g * h/2} = {' + gg + ' * ' + h + '/2} = ' + gg * h / 2 + '$, also $' + gg * h / 2 + ' cm^2$.', hint: 'Dreieck: Grundseite mal Höhe, geteilt durch 2.' });
  });
  G('6-viereck', 1, function () {
    var gg = R.int(4, 12), h = R.int(3, 9), sh = R.int(1, 3);
    return NUM('Berechne den Flächeninhalt des Parallelogramms.', gg * h, { unit: '$cm^2$', fig: Fig.shape({ P: [[0, 0], [gg, 0], [gg + sh, h], [sh, h]], s: ['g = ' + gg + ' cm', '', '', ''], extra: [{ from: [sh, 0], to: [sh, h], dash: true, l: 'h = ' + h + ' cm', dx: 34 }], maxh: 110 }), sol: '$A = g * h = ' + gg + ' * ' + h + ' = ' + gg * h + '$, also $' + gg * h + ' cm^2$.', hint: 'Parallelogramm: Grundseite mal Höhe – die schräge Seite wird nicht gebraucht.' });
  });
  G('6-viereck', 2, function () {
    var a = R.int(6, 12), c = R.int(2, a - 2), h = R.int(2, 8);
    if ((a + c) * h % 2) h++;
    var off = (a - c) / 2;
    return NUM('Berechne den Flächeninhalt des Trapezes mit den parallelen Seiten $a = ' + a + '$ cm und $c = ' + c + '$ cm und der Höhe $h = ' + h + '$ cm.', (a + c) * h / 2, { unit: '$cm^2$', fig: Fig.shape({ P: [[0, 0], [a, 0], [a - off, h], [off, h]], s: ['a', '', 'c', ''], extra: [{ from: [off, 0], to: [off, h], dash: true, l: 'h', dx: 9, it: true }], maxh: 110 }), sol: '$A = {(a + c) * h/2} = {(' + a + ' + ' + c + ') * ' + h + '/2} = ' + (a + c) * h / 2 + '$, also $' + (a + c) * h / 2 + ' cm^2$.', hint: 'Trapez: Summe der parallelen Seiten mal Höhe, geteilt durch 2.' });
  });
  G('6-viereck', 1, function () {
    var q = R.pick([['vier rechte Winkel hat, aber nicht unbedingt vier gleich lange Seiten', 'Rechteck'], ['vier gleich lange Seiten hat, aber nicht unbedingt rechte Winkel', 'Raute'], ['genau ein Paar paralleler Seiten hat', 'Trapez'], ['zwei Paare paralleler Seiten hat, aber weder gleich lange Seiten noch rechte Winkel haben muss', 'Parallelogramm'], ['vier gleich lange Seiten und vier rechte Winkel hat', 'Quadrat'], ['zwei Paare gleich langer benachbarter Seiten hat', 'Drachenviereck']]);
    return MC('Wie heißt ein Viereck, das ' + q[0] + '?', q[1], ['Rechteck', 'Raute', 'Trapez', 'Parallelogramm', 'Quadrat', 'Drachenviereck'], { sol: 'Im Haus der Vierecke: ' + q[1] + '.', hint: 'Achte auf parallele Seiten, gleich lange Seiten und rechte Winkel.' });
  });
  G('6-viereck', 2, function () {
    var st = R.pick([['Jedes Quadrat ist ein Rechteck.', true, 'Ein Quadrat hat vier rechte Winkel – mehr verlangt die Definition des Rechtecks nicht.'], ['Jedes Rechteck ist ein Quadrat.', false, 'Ein Rechteck muss keine vier gleich langen Seiten haben.'], ['Jedes Quadrat ist eine Raute.', true, 'Ein Quadrat hat vier gleich lange Seiten.'], ['Jede Raute ist ein Parallelogramm.', true, 'Gegenüberliegende Seiten einer Raute sind parallel.'], ['Jedes Parallelogramm ist ein Rechteck.', false, 'Ein Parallelogramm muss keine rechten Winkel haben.'], ['Jedes Rechteck ist ein Parallelogramm.', true, 'Gegenüberliegende Seiten eines Rechtecks sind parallel.'], ['Ein Viereck, das zugleich Raute und Rechteck ist, ist ein Quadrat.', true, 'Vier gleich lange Seiten und vier rechte Winkel – das ist die Definition des Quadrats.'], ['Die Innenwinkel jedes Vierecks ergeben zusammen 360°.', true, 'Eine Diagonale zerlegt das Viereck in zwei Dreiecke: $2 * 180° = 360°$.']]);
    return TF('Wahr oder falsch? ' + st[0], st[1], { sol: st[2] });
  });
  G('6-viereck', 2, function () {
    var a = R.int(60, 110), b = R.int(70, 120), c = R.int(60, 110), d = 360 - a - b - c;
    if (d < 30 || d > 170) return null;
    return NUM('Drei Innenwinkel eines Vierecks messen ' + a + '°, ' + b + '° und ' + c + '°. Wie groß ist der vierte?', d, { unit: '°', sol: 'Winkelsumme im Viereck: 360°. $360° - ' + a + '° - ' + b + '° - ' + c + '° = ' + d + '°$', hint: 'Ein Viereck lässt sich in zwei Dreiecke zerlegen.' });
  });
  G('6-viereck', 3, function () {
    var h = R.int(3, 9), gg = R.int(4, 12);
    if (gg * h % 2) gg++;
    return NUM('Ein Dreieck hat den Flächeninhalt $' + gg * h / 2 + ' cm^2$ und die Grundseite ' + gg + ' cm. Wie lang ist die zugehörige Höhe?', h, { unit: 'cm', sol: '$A = {g * h/2}$, also $h = {2 * A/g} = {' + gg * h + '/' + gg + '} = ' + h + '$ cm.', hint: 'Verdopple zuerst den Flächeninhalt – dann hast du $g * h$.' });
  });
  G('6-viereck', 3, function () {
    var e = 2 * R.int(2, 6), f = R.int(3, 10);
    return NUM('Ein Drachenviereck hat die Diagonalen $e = ' + e + ' cm$ und $f = ' + f + ' cm$. Sie stehen senkrecht aufeinander. Wie groß ist der Flächeninhalt?', e * f / 2, { unit: '$cm^2$', sol: 'Die Diagonale $f$ zerlegt den Drachen in zwei Dreiecke mit Grundseite $f$; ihre Höhen ergeben zusammen $e$. $A = {e * f/2} = ' + e * f / 2 + '$, also $' + e * f / 2 + ' cm^2$.', hint: 'Zerlege den Drachen entlang einer Diagonale in zwei Dreiecke (Rückführprinzip).' });
  });

  /* ---------- 6-prisma ---------- */
  G('6-prisma', 1, function () {
    var ag = R.int(6, 30), h = R.int(3, 12);
    return NUM('Ein gerades Prisma hat die Grundfläche $' + ag + ' cm^2$ und die Höhe ' + h + ' cm. Berechne das Volumen.', ag * h, { unit: '$cm^3$', sol: '$V = A_G * h = ' + ag + ' * ' + h + ' = ' + ag * h + '$, also $' + ag * h + ' cm^3$.', hint: 'Volumen = Grundfläche mal Höhe – wie beim Quader.' });
  });
  G('6-prisma', 2, function () {
    var gg = R.int(3, 8), hd = 2 * R.int(1, 4), h = R.int(5, 12), ag = gg * hd / 2;
    return NUM('Die Grundfläche eines geraden Prismas ist ein Dreieck mit der Grundseite ' + gg + ' cm und der Höhe ' + hd + ' cm. Das Prisma ist ' + h + ' cm hoch. Berechne das Volumen.', ag * h, { unit: '$cm^3$', sol: 'Grundfläche: ${' + gg + ' * ' + hd + '/2} = ' + ag + '$, also $' + ag + ' cm^2$. Volumen: $' + ag + ' * ' + h + ' = ' + ag * h + '$, also $' + ag * h + ' cm^3$.', hint: 'Teilproblem 1: Flächeninhalt des Dreiecks. Teilproblem 2: mal Körperhöhe.' });
  });
  G('6-prisma', 1, function () {
    var n = R.pick([3, 4, 5, 6, 8]), v = R.int(0, 2), names = { 3: 'dreiseitiges', 4: 'vierseitiges', 5: 'fünfseitiges', 6: 'sechsseitiges', 8: 'achtseitiges' };
    var ans = [2 * n, 3 * n, n + 2][v], what = ['Ecken', 'Kanten', 'Flächen'][v];
    return NUM('Wie viele ' + what + ' hat ein ' + names[n] + ' Prisma (Grundfläche: ' + n + '-Eck)?', ans, { sol: v === 0 ? 'Grund- und Deckfläche haben je ' + n + ' Ecken: $2 * ' + n + ' = ' + ans + '$.' : v === 1 ? 'Je ' + n + ' Kanten an Grund- und Deckfläche und ' + n + ' Seitenkanten: $3 * ' + n + ' = ' + ans + '$.' : n + ' Seitenflächen plus Grund- und Deckfläche: $' + n + ' + 2 = ' + ans + '$.', hint: 'Stell dir Grundfläche, Deckfläche und die Seitenflächen getrennt vor.' });
  });
  G('6-prisma', 2, function () {
    var a = R.pick([3, 6]), b = a === 3 ? 4 : 8, c = a === 3 ? 5 : 10, h = R.int(4, 10), ag = a * b / 2, m = (a + b + c) * h, o = 2 * ag + m;
    return NUM('Die Grundfläche eines geraden Prismas ist ein rechtwinkliges Dreieck mit den Seiten ' + a + ' cm, ' + b + ' cm und ' + c + ' cm (die beiden kürzeren schließen den rechten Winkel ein). Das Prisma ist ' + h + ' cm hoch. Berechne den Oberflächeninhalt.', o, { unit: '$cm^2$', sol: 'Grundfläche: ${' + a + ' * ' + b + '/2} = ' + ag + '$. Mantel: Umfang mal Höhe $= ' + (a + b + c) + ' * ' + h + ' = ' + m + '$. $O = 2 * ' + ag + ' + ' + m + ' = ' + o + '$, also $' + o + ' cm^2$.', hint: 'Oberfläche = 2 · Grundfläche + Mantel. Der Mantel ist ein Rechteck: Umfang der Grundfläche mal Höhe.' });
  });
  G('6-prisma', 2, function () {
    var u = R.int(10, 30), h = R.int(4, 12);
    return NUM('Die Grundfläche eines geraden Prismas hat den Umfang ' + u + ' cm. Das Prisma ist ' + h + ' cm hoch. Wie groß ist die Mantelfläche?', u * h, { unit: '$cm^2$', sol: 'Abgewickelt ist der Mantel ein Rechteck: $M = u * h = ' + u + ' * ' + h + ' = ' + u * h + '$, also $' + u * h + ' cm^2$.', hint: 'Stell dir vor, du wickelst den Mantel ab: Es entsteht ein Rechteck.' });
  });
  G('6-prisma', 3, function () {
    var ag = R.int(8, 25), h = R.int(4, 12);
    return NUM('Ein gerades Prisma hat das Volumen $' + ag * h + ' cm^3$ und die Grundfläche $' + ag + ' cm^2$. Wie hoch ist es?', h, { unit: 'cm', sol: '$h = V : A_G = ' + ag * h + ' : ' + ag + ' = ' + h + '$ cm.', hint: 'Stelle $V = A_G * h$ nach $h$ um.' });
  });
  G('6-prisma', 3, function () {
    var a = R.int(4, 8), b = R.int(3, 6), c = R.int(2, 5), a2 = R.int(2, a - 1), c2 = R.int(1, 4), v = a * b * c + a2 * b * c2;
    return NUM('Ein Körper besteht aus zwei aufeinandergesetzten Quadern: unten ' + a + ' cm × ' + b + ' cm × ' + c + ' cm, oben ' + a2 + ' cm × ' + b + ' cm × ' + c2 + ' cm. Wie groß ist das Volumen des ganzen Körpers?', v, { unit: '$cm^3$', sol: 'Zerlegen: $' + a + ' * ' + b + ' * ' + c + ' = ' + a * b * c + '$ und $' + a2 + ' * ' + b + ' * ' + c2 + ' = ' + a2 * b * c2 + '$. Zusammen $' + v + '$, also $' + v + ' cm^3$.', hint: 'Berechne beide Quader einzeln und addiere (Klasse 5).' });
  });
})(typeof window !== 'undefined' ? window : globalThis);

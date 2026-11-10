/* Silberzirkel – Aufgaben Klasse 8, Teil B: Zufallsversuche, Funktionen, lineare Funktionen
   und Ähnlichkeit (Lehrplan Sachsen, Gymnasium, Lernbereiche 2, 3 und 4). */
(function (g) {
  'use strict';
  var SZ = g.SZ, R = SZ.R, M = SZ.M, G = SZ.G, MC = SZ.MC, MCN = SZ.MCN, MCF = SZ.MCF, NUM = SZ.NUM, GAP = SZ.GAP, TF = SZ.TF, ORD = SZ.ORD, Fig = SZ.Fig, de = M.de, F = M.F, fs = M.fs, lin = M.lin, par = M.par;
  var KB = ' (vollständig gekürzter Bruch, z. B. 2/3)';
  var COL = ['rot', 'blau', 'gelb', 'grün'];
  function urn(n) {                                   // zufällige Urne mit n Farben
    var cols = R.sample(COL, n), list = cols.map(function (c) { return [c, R.int(2, 5)]; }), tot = 0;
    list.forEach(function (e) { tot += e[1]; });
    return { list: list, tot: tot, text: list.map(function (e) { return e[1] + ' ' + e[0] + 'e'; }).join(', ').replace(/, ([^,]*)$/, ' und $1') + ' Kugeln' };
  }

  /* ---------- 8-zufall ---------- */
  var WEV = [['eine gerade Zahl', 3], ['eine Primzahl', 3], ['eine Zahl größer als 4', 2], ['eine durch 3 teilbare Zahl', 2], ['eine Zahl kleiner als 3', 2], ['eine Zahl, die mindestens 2 ist,', 5], ['eine Sechs', 1], ['eine Zahl kleiner als 6', 5], ['eine Quadratzahl', 2]];
  G('8-zufall', 1, function () {
    var e = R.pick(WEV), r = F(e[1], 6);
    return NUM('Ein Würfel wird einmal geworfen. Wie groß ist die Wahrscheinlichkeit für ' + e[0] + '?' + KB, r, { reduced: true, sol: 'Günstig sind ' + e[1] + ' von 6 gleich wahrscheinlichen Ergebnissen: ${' + e[1] + '/6}' + (r.d !== 6 ? ' = ' + fs(r) : '') + '$', hint: 'Laplace-Regel: Anzahl der günstigen durch Anzahl der möglichen Ergebnisse.' });
  });
  G('8-zufall', 1, function () {
    var u = urn(R.pick([2, 3])), pick = R.pick(u.list), r = F(pick[1], u.tot);
    return NUM('In einer Urne liegen ' + u.text + '. Eine Kugel wird blind gezogen. Wie groß ist die Wahrscheinlichkeit für eine ' + pick[0] + 'e Kugel?' + KB, r, { reduced: true, fig: Fig.urn(u.list), sol: pick[1] + ' von ' + u.tot + ' Kugeln sind ' + pick[0] + ': ${' + pick[1] + '/' + u.tot + '}' + (r.d !== u.tot ? ' = ' + fs(r) : '') + '$', hint: 'Zähle erst alle Kugeln – das ist der Nenner.' });
  });
  G('8-zufall', 1, function () {
    var q = R.pick([['Ein Würfel wird einmal geworfen.', 6], ['Eine Münze wird einmal geworfen.', 2], ['Ein Glücksrad mit 8 gleich großen, nummerierten Feldern wird gedreht.', 8], ['Eine Münze wird zweimal nacheinander geworfen (die Reihenfolge wird beachtet).', 4], ['Aus den Buchstaben des Wortes ZIRKEL wird einer zufällig gewählt.', 6], ['Ein Wochentag wird zufällig ausgewählt.', 7]]);
    return NUM(q[0] + ' Wie viele Elemente hat die Ergebnismenge $Ω$?', q[1], { sol: 'Die Ergebnismenge enthält alle möglichen Ergebnisse – hier sind es ' + q[1] + '.', hint: 'Schreibe alle möglichen Ergebnisse auf.' });
  });
  G('8-zufall', 2, function () {
    var d = R.pick([5, 6, 8, 10, 12]), n = R.int(1, d - 1), r = F(d - n, d);
    if (M.gcd(n, d) !== 1) return null;
    return NUM('Die Wahrscheinlichkeit eines Ereignisses $E$ beträgt ${' + n + '/' + d + '}$. Wie groß ist die Wahrscheinlichkeit des Gegenereignisses?' + KB, r, { reduced: true, sol: '$1 - {' + n + '/' + d + '} = {' + (d - n) + '/' + d + '}' + (r.d !== d ? ' = ' + fs(r) : '') + '$', hint: 'Ereignis und Gegenereignis ergeben zusammen die Wahrscheinlichkeit 1.' });
  });
  G('8-zufall', 2, function () {
    var u = urn(3), a = u.list[0], b = u.list[1], r = F(a[1] + b[1], u.tot);
    return NUM('Ein Glücksrad hat ' + u.tot + ' gleich große Felder: ' + u.list.map(function (e) { return e[1] + ' ' + e[0] + 'e'; }).join(', ') + '. Wie groß ist die Wahrscheinlichkeit, dass der Zeiger auf einem ' + a[0] + 'en ODER einem ' + b[0] + 'en Feld stehen bleibt?' + KB, r, { reduced: true, sol: 'Günstig: $' + a[1] + ' + ' + b[1] + ' = ' + (a[1] + b[1]) + '$ von ' + u.tot + ' Feldern: $' + fs(r) + '$', hint: 'Zähle alle Felder, die eine der beiden Farben haben.' });
  });
  G('8-zufall', 2, function () {
    var n = R.pick([200, 250, 400, 500]), p = R.pick([0.62, 0.38, 0.45, 0.28, 0.72, 0.56]), k = Math.round(n * p);
    return NUM('Eine Reißzwecke wird ' + n + '-mal geworfen. ' + k + '-mal bleibt sie mit der Spitze nach oben liegen. Welchen Schätzwert liefert dieser Versuch für die Wahrscheinlichkeit „Spitze oben“? (Dezimalzahl)', M.round(k / n, 3), { tol: 0.0006, sol: 'Relative Häufigkeit: ${' + k + '/' + n + '} = ' + de(k / n) + '$. Bei vielen Würfen stabilisiert sie sich in der Nähe der Wahrscheinlichkeit.', hint: 'Bei einer Reißzwecke hilft die Laplace-Regel nicht – nimm die relative Häufigkeit (Klasse 6).' });
  });
  G('8-zufall', 2, function () {
    var n = R.pick([60, 120, 300, 600]), e = R.pick(WEV);
    return NUM('Ein Würfel wird ' + n + '-mal geworfen. Wie oft ist dabei ungefähr ' + e[0] + ' zu erwarten?', n * e[1] / 6, { sol: 'Wahrscheinlichkeit ${' + e[1] + '/6}$, also etwa ${' + e[1] + '/6} * ' + n + ' = ' + n * e[1] / 6 + '$ Mal.', hint: 'Erwartete Anzahl = Wahrscheinlichkeit mal Anzahl der Würfe.' });
  });
  G('8-zufall', 2, function () {
    var q = R.pick([['das Werfen einer fairen Münze', true, 'Kopf und Zahl sind gleich wahrscheinlich.'], ['das Werfen einer Reißzwecke', false, 'Die beiden Lagen sind nicht gleich wahrscheinlich.'], ['das Drehen eines Glücksrads mit verschieden großen Feldern', false, 'Größere Felder werden häufiger getroffen.'], ['das Ziehen einer Karte aus einem gut gemischten Stapel', true, 'Jede Karte hat dieselbe Chance.'], ['das Werfen eines Würfels', true, 'Alle sechs Seiten sind gleich wahrscheinlich.'], ['das Werfen eines Legosteins', false, 'Die Seiten haben verschiedene Formen – die Lagen sind nicht gleich wahrscheinlich.']]);
    return TF('Ist ' + q[0] + ' ein Laplace-Versuch?', q[1], { sol: q[2] + ' Ein Laplace-Versuch liegt vor, wenn alle Ergebnisse gleich wahrscheinlich sind.', hint: 'Sind alle Ergebnisse gleich wahrscheinlich?' });
  });
  G('8-zufall', 2, function () {
    var q = R.pick([['mit einem Würfel eine 7 zu werfen', 0, 'Das Ereignis ist unmöglich.'], ['mit einem Würfel eine Zahl kleiner als 7 zu werfen', 1, 'Das Ereignis ist sicher.'], ['aus einer Urne mit nur roten Kugeln eine blaue zu ziehen', 0, 'Das Ereignis ist unmöglich.'], ['beim Münzwurf Kopf oder Zahl zu erhalten', 1, 'Das Ereignis ist sicher.']]);
    return NUM('Wie groß ist die Wahrscheinlichkeit, ' + q[0] + '?', q[1], { sol: q[2] + ' Unmögliches Ereignis: Wahrscheinlichkeit 0. Sicheres Ereignis: Wahrscheinlichkeit 1.', hint: 'Jede Wahrscheinlichkeit liegt zwischen 0 und 1.' });
  });
  G('8-zufall', 3, function () {
    var q = R.pick([['eine Karte mit der Zahl 8', 4], ['eine Sonnenkarte', 8], ['eine Karte mit einer geraden Zahl', 16], ['eine Sonnen- oder Mondkarte', 16], ['eine Karte mit einer Zahl größer als 6', 8], ['die Sternkarte mit der Zahl 1', 1], ['eine Karte mit einer Zahl kleiner als 4', 12]]), r = F(q[1], 32);
    return NUM('Ein Zauberkartenspiel hat 32 Karten: vier Farben (Sonne, Mond, Stern, Komet) mit je acht Karten, nummeriert von 1 bis 8. Eine Karte wird gezogen. Wie groß ist die Wahrscheinlichkeit für ' + q[0] + '?' + KB, r, { reduced: true, sol: 'Günstig sind ' + q[1] + ' von 32 Karten: ${' + q[1] + '/32}' + (r.d !== 32 ? ' = ' + fs(r) : '') + '$', hint: 'Wie viele der 32 Karten erfüllen die Bedingung?' });
  });
  G('8-zufall', 3, function () {
    var q = R.pick([['die Augensumme 7', 6, '(1|6), (2|5), (3|4), (4|3), (5|2), (6|1)'], ['ein Pasch (zwei gleiche Zahlen)', 6, '(1|1), (2|2), …, (6|6)'], ['die Augensumme 2', 1, '(1|1)'], ['eine Augensumme von mindestens 11', 3, '(5|6), (6|5), (6|6)'], ['die Augensumme 8', 5, '(2|6), (3|5), (4|4), (5|3), (6|2)'], ['die Augensumme 4', 3, '(1|3), (2|2), (3|1)']]), r = F(q[1], 36);
    return NUM('Zwei Würfel werden geworfen. Wie groß ist die Wahrscheinlichkeit für ' + q[0] + '?' + KB, r, { reduced: true, sol: 'Es gibt $6 * 6 = 36$ gleich wahrscheinliche Paare. Günstig: ' + q[2] + ' – das sind ' + q[1] + '. ${' + q[1] + '/36}' + (r.d !== 36 ? ' = ' + fs(r) : '') + '$', hint: 'Bei zwei Würfeln gibt es 36 mögliche Paare. Zähle die günstigen auf.' });
  });
  G('8-zufall', 2, function () {
    var st = R.pick([['Nach fünfmal „Zahl“ ist beim nächsten Wurf einer fairen Münze „Kopf“ wahrscheinlicher.', false, 'Die Münze hat kein Gedächtnis: Die Wahrscheinlichkeit bleibt ${1/2}$.'], ['Eine Wahrscheinlichkeit kann nie größer als 1 sein.', true, 'Die günstigen Ergebnisse sind höchstens alle möglichen.'], ['Bei sehr vielen Würfen liegt die relative Häufigkeit meist nahe an der Wahrscheinlichkeit.', true, 'Das ist das Gesetz der großen Zahlen.'], ['Wirft man eine faire Münze 10-mal, fällt immer genau 5-mal Kopf.', false, 'Die Wahrscheinlichkeit sagt nur, was auf lange Sicht zu erwarten ist.'], ['Die Wahrscheinlichkeiten eines Ereignisses und seines Gegenereignisses ergeben zusammen 1.', true, 'Eines von beiden tritt sicher ein.'], ['Ein Ereignis ist eine Teilmenge der Ergebnismenge.', true, 'So ist der Begriff festgelegt (Mengenlehre, Klasse 7).']]);
    return TF('Wahr oder falsch? ' + st[0], st[1], { sol: st[2] });
  });

  /* ---------- 8-baum ---------- */
  function tree2(r, b, replace) {                     // zweimal ziehen aus r roten und b blauen Kugeln
    var n = r + b, m = replace ? n : n - 1, R2 = Fig.BALL.rot, B2 = Fig.BALL.blau;
    return Fig.tree([{ l: 'r', p: r + '/' + n, c: R2, kids: [{ l: 'r', p: (replace ? r : r - 1) + '/' + m, c: R2 }, { l: 'b', p: b + '/' + m, c: B2 }] }, { l: 'b', p: b + '/' + n, c: B2, kids: [{ l: 'r', p: r + '/' + m, c: R2 }, { l: 'b', p: (replace ? b : b - 1) + '/' + m, c: B2 }] }]);
  }
  G('8-baum', 1, function () {
    var r = R.int(2, 5), b = R.int(2, 5), n = r + b, rep = R.bool(), first = R.bool(), second = R.bool(), m = rep ? n : n - 1;
    var p1 = first ? r : b, p2 = second ? (rep || !first ? r : r - 1) : (rep || first ? b : b - 1), res = F(p1 * p2, n * m);
    return NUM('Aus einer Urne mit ' + r + ' roten und ' + b + ' blauen Kugeln wird zweimal ' + (rep ? 'mit' : 'ohne') + ' Zurücklegen gezogen. Berechne mit dem Baumdiagramm die Wahrscheinlichkeit für „erst ' + (first ? 'rot' : 'blau') + ', dann ' + (second ? 'rot' : 'blau') + '“.' + KB, res, { reduced: true, fig: tree2(r, b, rep), sol: '1. Pfadregel: entlang des Pfades multiplizieren. ${' + p1 + '/' + n + '} * {' + p2 + '/' + m + '} = {' + p1 * p2 + '/' + n * m + '}' + (res.d !== n * m ? ' = ' + fs(res) : '') + '$', hint: 'Suche den passenden Pfad und multipliziere die Wahrscheinlichkeiten an seinen Ästen (Bruchrechnung, Klasse 6).' });
  });
  G('8-baum', 2, function () {
    var r = R.int(2, 5), b = R.int(2, 5), n = r + b, res = F(r * (r - 1), n * (n - 1));
    return NUM('In einer Urne liegen ' + r + ' rote und ' + b + ' blaue Kugeln. Es wird zweimal ohne Zurücklegen gezogen. Wie groß ist die Wahrscheinlichkeit, zwei rote Kugeln zu ziehen?' + KB, res, { reduced: true, fig: Fig.urn([['rot', r], ['blau', b]]), sol: 'Erster Zug: ${' + r + '/' + n + '}$. Danach fehlt eine rote Kugel: ${' + (r - 1) + '/' + (n - 1) + '}$. Produkt: ${' + r * (r - 1) + '/' + n * (n - 1) + '}' + (res.d !== n * (n - 1) ? ' = ' + fs(res) : '') + '$', hint: 'Ohne Zurücklegen ändern sich beim zweiten Zug Zähler und Nenner.' });
  });
  G('8-baum', 2, function () {
    var r = R.int(2, 5), b = R.int(2, 5), n = r + b, res = F(2 * r * b, n * n);
    return NUM('In einer Urne liegen ' + r + ' rote und ' + b + ' blaue Kugeln. Es wird zweimal mit Zurücklegen gezogen. Wie groß ist die Wahrscheinlichkeit, genau eine rote Kugel zu ziehen?' + KB, res, { reduced: true, fig: tree2(r, b, true), sol: 'Zwei Pfade gehören dazu: rot–blau und blau–rot. 2. Pfadregel: ${' + r * b + '/' + n * n + '} + {' + r * b + '/' + n * n + '} = {' + 2 * r * b + '/' + n * n + '}' + (res.d !== n * n ? ' = ' + fs(res) : '') + '$', hint: '„Genau eine rote“ kann auf zwei Wegen passieren. Addiere die Pfadwahrscheinlichkeiten.' });
  });
  G('8-baum', 1, function () {
    var d = R.pick([5, 7, 8, 9, 10]), a = R.int(1, d - 2), b = R.int(1, d - 1 - a), three = R.bool(), r = F(three ? d - a - b : d - a, d);
    return NUM('An einer Verzweigung eines Baumdiagramms ' + (three ? 'gibt es drei Äste. An zwei davon stehen ${' + a + '/' + d + '}$ und ${' + b + '/' + d + '}$' : 'gibt es zwei Äste. An einem steht ${' + a + '/' + d + '}$') + '. Welche Wahrscheinlichkeit gehört an den letzten Ast?' + KB, r, { reduced: true, sol: 'An jeder Verzweigung ergeben die Wahrscheinlichkeiten zusammen 1: $1 - {' + a + '/' + d + '}' + (three ? ' - {' + b + '/' + d + '}' : '') + ' = ' + fs(r) + '$', hint: 'Die Summe an einer Verzweigung ist immer 1.' });
  });
  G('8-baum', 2, function () {
    var q = R.pick([['zweimal', 'mindestens einmal Kopf', 3, 4, 'Günstig sind KK, KZ, ZK – nur ZZ nicht.'], ['zweimal', 'zweimal Zahl', 1, 4, 'Ein Pfad: ${1/2} * {1/2}$'], ['dreimal', 'dreimal Kopf', 1, 8, 'Ein Pfad: ${1/2} * {1/2} * {1/2}$'], ['dreimal', 'genau zweimal Kopf', 3, 8, 'Drei Pfade: KKZ, KZK, ZKK, jeder mit ${1/8}$.'], ['dreimal', 'mindestens einmal Zahl', 7, 8, 'Gegenereignis „dreimal Kopf“ hat ${1/8}$.'], ['zweimal', 'zwei verschiedene Seiten', 1, 2, 'Zwei Pfade: KZ und ZK, jeder mit ${1/4}$.']]);
    return NUM('Eine faire Münze wird ' + q[0] + ' geworfen. Wie groß ist die Wahrscheinlichkeit für „' + q[1] + '“?' + KB, F(q[2], q[3]), { reduced: true, sol: q[4] + ' Ergebnis: ${' + q[2] + '/' + q[3] + '}$', hint: 'Zeichne ein Baumdiagramm: Jede Stufe hat zwei Äste mit je ${1/2}$.' });
  });
  G('8-baum', 1, function () {
    var a = R.int(2, 4), b = R.int(2, 4), c = R.pick([0, 0, 2, 3]);
    return NUM('Ein Baumdiagramm hat in der ersten Stufe ' + a + ' Äste. An jedem hängen in der zweiten Stufe ' + b + ' Äste' + (c ? ' und daran in der dritten Stufe jeweils ' + c + ' Äste' : '') + '. Wie viele Pfade hat der Baum?', a * b * (c || 1), { sol: 'Die Anzahlen multiplizieren sich: $' + a + ' * ' + b + (c ? ' * ' + c : '') + ' = ' + a * b * (c || 1) + '$', hint: 'Jeder Ast der ersten Stufe verzweigt sich wieder.' });
  });
  G('8-baum', 2, function () {
    var st = R.pick([['Entlang eines Pfades werden die Wahrscheinlichkeiten multipliziert.', true, 'Das ist die 1. Pfadregel.'], ['Entlang eines Pfades werden die Wahrscheinlichkeiten addiert.', false, 'Entlang eines Pfades wird multipliziert. Addiert werden die Wahrscheinlichkeiten verschiedener Pfade.'], ['Gehören mehrere Pfade zu einem Ereignis, werden ihre Wahrscheinlichkeiten addiert.', true, 'Das ist die 2. Pfadregel.'], ['Beim Ziehen mit Zurücklegen sind die Wahrscheinlichkeiten in jeder Stufe gleich.', true, 'Der Inhalt der Urne ist vor jedem Zug derselbe.'], ['Beim Ziehen ohne Zurücklegen sind die Wahrscheinlichkeiten in jeder Stufe gleich.', false, 'Nach jedem Zug fehlt eine Kugel – Zähler und Nenner ändern sich.'], ['Die Wahrscheinlichkeiten aller Pfade eines Baumdiagramms ergeben zusammen 1.', true, 'Genau einer der Pfade tritt ein.']]);
    return TF('Wahr oder falsch? ' + st[0], st[1], { sol: st[2] });
  });
  G('8-baum', 3, function () {
    var k = R.pick([[6, 'eine Sechs', 1], [6, 'eine Zahl größer als 4', 2], [6, 'eine gerade Zahl', 3]]), miss = 6 - k[2], res = F(36 - miss * miss, 36);
    return NUM('Ein Würfel wird zweimal geworfen. Wie groß ist die Wahrscheinlichkeit, mindestens einmal ' + k[1] + ' zu werfen?' + KB, res, { reduced: true, sol: 'Gegenereignis: zweimal nicht. ${' + miss + '/6} * {' + miss + '/6} = {' + miss * miss + '/36}$. Also $1 - {' + miss * miss + '/36} = {' + (36 - miss * miss) + '/36}' + (res.d !== 36 ? ' = ' + fs(res) : '') + '$', hint: '„Mindestens einmal“ ist das Gegenteil von „kein Mal“ – rechne über das Gegenereignis.' });
  });
  G('8-baum', 3, function () {
    var r = R.int(2, 5), b = R.int(2, 5), n = r + b, res = F(2 * r * b, n * (n - 1));
    return NUM('In einer Urne liegen ' + r + ' rote und ' + b + ' blaue Kugeln. Es wird zweimal ohne Zurücklegen gezogen. Wie groß ist die Wahrscheinlichkeit, zwei verschiedenfarbige Kugeln zu ziehen?' + KB, res, { reduced: true, fig: tree2(r, b, false), sol: 'Pfad rot–blau: ${' + r + '/' + n + '} * {' + b + '/' + (n - 1) + '}$. Pfad blau–rot: ${' + b + '/' + n + '} * {' + r + '/' + (n - 1) + '}$. Summe: ${' + 2 * r * b + '/' + n * (n - 1) + '}' + (res.d !== n * (n - 1) ? ' = ' + fs(res) : '') + '$', hint: 'Zwei Pfade führen zu verschiedenen Farben. Berechne beide und addiere.' });
  });
  G('8-baum', 3, function () {
    var v = R.pick([[[1, 2], [1, 3], [1, 6]], [[1, 2], [1, 4], [1, 4]], [[1, 3], [1, 3], [1, 3]], [[3, 5], [1, 5], [1, 5]], [[1, 2], [3, 10], [1, 5]]]);
    var res = v.map(function (p) { return F(p[0] * p[0], p[1] * p[1]); }).reduce(function (a, b) { return M.fadd(a, b); });
    var fig = Fig.tree([{ l: 'r', p: v[0].join('/'), c: Fig.BALL.rot }, { l: 'b', p: v[1].join('/'), c: Fig.BALL.blau }, { l: 'g', p: v[2].join('/'), c: Fig.BALL.gelb }]);
    return NUM('Ein Glücksrad zeigt mit der Wahrscheinlichkeit ${' + v[0].join('/') + '}$ Rot, mit ${' + v[1].join('/') + '}$ Blau und mit ${' + v[2].join('/') + '}$ Gelb. Es wird zweimal gedreht. Wie groß ist die Wahrscheinlichkeit, dass zweimal dieselbe Farbe erscheint?' + KB, res, { reduced: true, fig: fig, sol: 'Drei Pfade (Rot–Rot, Blau–Blau, Gelb–Gelb): $' + v.map(function (p) { return '{' + p.join('/') + '} * {' + p.join('/') + '}'; }).join(' + ') + ' = ' + v.map(function (p) { return '{' + p[0] * p[0] + '/' + p[1] * p[1] + '}'; }).join(' + ') + ' = ' + fs(res) + '$', hint: 'Rot–Rot, Blau–Blau, Gelb–Gelb: drei Pfade, deren Wahrscheinlichkeiten addiert werden.' });
  });

  /* ---------- 8-zaehlen ---------- */
  G('8-zaehlen', 1, function () {
    var a = R.int(2, 5), b = R.int(2, 6), c = R.pick([0, 0, 2, 3]);
    return NUM('Für den Winterball stehen ' + a + ' Hüte, ' + b + ' Umhänge' + (c ? ' und ' + c + ' Paar Schuhe' : '') + ' zur Auswahl. Wie viele verschiedene Kombinationen sind möglich?', a * b * (c || 1), { sol: 'Produktregel: $' + a + ' * ' + b + (c ? ' * ' + c : '') + ' = ' + a * b * (c || 1) + '$', hint: 'Zu jedem Hut passt jeder Umhang – die Anzahlen werden multipliziert.' });
  });
  G('8-zaehlen', 1, function () {
    var k = R.int(2, 4), v = R.int(0, 1), n = v ? R.pick([3, 4, 5]) : 10;
    return NUM(v ? 'Ein Geheimschloss hat ' + k + ' Rädchen. Jedes zeigt eines von ' + n + ' Symbolen. Wie viele Einstellungen gibt es?' : 'Wie viele ' + k + '-stellige Codes aus den Ziffern 0 bis 9 gibt es (Wiederholungen erlaubt)?', Math.pow(n, k), { sol: 'Für jede Stelle gibt es ' + n + ' Möglichkeiten: $' + n + '^' + k + ' = ' + de(Math.pow(n, k)) + '$', hint: 'Mit Wiederholung: An jeder Stelle gleich viele Möglichkeiten.' });
  });
  G('8-zaehlen', 2, function () {
    var n = R.int(3, 6), th = R.pick(['Kinder für ein Foto in eine Reihe stellen', 'verschiedene Bücher nebeneinander ins Regal stellen', 'Musikstücke für ein Konzert in eine Reihenfolge bringen', 'verschiedene Töne zu einer Melodie anordnen, in der jeder genau einmal vorkommt']);
    return NUM('Auf wie viele Arten kann man ' + n + ' ' + th + '?', M.fact(n), { sol: 'Für den ersten Platz ' + n + ' Möglichkeiten, dann ' + (n - 1) + ', dann ' + (n - 2) + ' …: $' + n + '! = ' + M.fact(n) + '$', hint: 'Ohne Wiederholung: Mit jedem Platz wird die Auswahl um 1 kleiner.' });
  });
  G('8-zaehlen', 2, function () {
    var n = R.int(5, 9), k = R.pick([2, 3]), r = k === 2 ? n * (n - 1) : n * (n - 1) * (n - 2);
    return NUM('An einem Wettlauf nehmen ' + n + ' Läufer teil. Auf wie viele Arten können die Plätze 1 bis ' + k + ' vergeben werden?', r, { sol: 'Ohne Zurücklegen, mit Reihenfolge: $' + n + ' * ' + (n - 1) + (k === 3 ? ' * ' + (n - 2) : '') + ' = ' + r + '$', hint: 'Wer Erster ist, kann nicht auch Zweiter sein.' });
  });
  G('8-zaehlen', 2, function () {
    var n = R.int(3, 7);
    return NUM('Berechne: $' + n + '!$', M.fact(n), { sol: '$' + n + '! = ' + Array.apply(null, Array(n)).map(function (_, i) { return n - i; }).join(' * ') + ' = ' + M.fact(n) + '$', hint: '$n!$ ist das Produkt aller natürlichen Zahlen von 1 bis $n$.' });
  });
  G('8-zaehlen', 2, function () {
    var tones = R.int(3, 5), len = R.int(2, 4);
    return NUM('Eine Melodie soll aus ' + len + ' Tönen bestehen. Für jeden Ton stehen ' + tones + ' verschiedene Tonhöhen zur Wahl, Wiederholungen sind erlaubt. Wie viele Melodien gibt es?', Math.pow(tones, len), { sol: 'Für jeden der ' + len + ' Töne ' + tones + ' Möglichkeiten: $' + tones + '^' + len + ' = ' + Math.pow(tones, len) + '$', hint: 'Mit Wiederholung und mit Reihenfolge.' });
  });
  G('8-zaehlen', 2, function () {
    var q = R.pick([['Ein vierstelliger Zahlencode wird festgelegt.', 0], ['Drei Läufer erhalten Gold, Silber und Bronze.', 1], ['Aus einer Klasse werden zwei Kinder für den Tafeldienst ausgelost.', 2], ['Beim Lotto werden 6 aus 49 Kugeln gezogen.', 2], ['Fünf Kinder stellen sich in einer Reihe auf.', 1], ['Ein Würfel wird dreimal geworfen und die Zahlen werden der Reihe nach notiert.', 0]]);
    return MCF(q[0] + ' Welches Modell passt?', ['mit Wiederholung, Reihenfolge wichtig', 'ohne Wiederholung, Reihenfolge wichtig', 'ohne Wiederholung, Reihenfolge egal'], q[1], { sol: 'Zwei Fragen entscheiden: Darf sich etwas wiederholen? Kommt es auf die Reihenfolge an?', hint: 'Darf etwas mehrfach vorkommen? Spielt die Reihenfolge eine Rolle?' });
  });
  G('8-zaehlen', 3, function () {
    var n = R.int(4, 8);
    return NUM('Aus ' + n + ' Kindern werden 2 für den Tafeldienst ausgewählt. Die Reihenfolge spielt keine Rolle. Wie viele Möglichkeiten gibt es?', n * (n - 1) / 2, { sol: 'Mit Reihenfolge wären es $' + n + ' * ' + (n - 1) + ' = ' + n * (n - 1) + '$. Jedes Paar wurde dabei zweimal gezählt: $' + n * (n - 1) + ' : 2 = ' + n * (n - 1) / 2 + '$', hint: 'Zähle erst mit Reihenfolge und überlege dann, wie oft jedes Paar vorkommt.' });
  });
  G('8-zaehlen', 3, function () {
    var n = R.int(5, 10);
    return NUM('Bei einem Treffen begrüßen sich ' + n + ' Personen. Jede gibt jeder anderen genau einmal die Hand. Wie viele Händedrücke sind das?', n * (n - 1) / 2, { sol: 'Jede der ' + n + ' Personen schüttelt ' + (n - 1) + ' Hände: $' + n + ' * ' + (n - 1) + ' = ' + n * (n - 1) + '$. Jeder Händedruck wurde doppelt gezählt: $' + n * (n - 1) / 2 + '$', hint: 'An jedem Händedruck sind zwei Personen beteiligt.' });
  });
  G('8-zaehlen', 3, function () {
    var even = R.bool();
    return NUM('Wie viele dreistellige ' + (even ? 'gerade ' : '') + 'Zahlen kann man aus den Ziffern 1, 2, 3, 4 und 5 bilden, wenn jede Ziffer höchstens einmal vorkommen darf?', even ? 24 : 60, { sol: even ? 'Beginne bei der Einerstelle: Sie muss 2 oder 4 sein (2 Möglichkeiten). Dann bleiben 4 Ziffern für die Hunderter und 3 für die Zehner: $2 * 4 * 3 = 24$' : '$5 * 4 * 3 = 60$', hint: even ? 'Beginne mit der Stelle, die eine Bedingung erfüllen muss – der Einerstelle.' : 'Ohne Wiederholung: 5, dann 4, dann 3 Möglichkeiten.' });
  });

  /* ---------- 8-funktion ---------- */
  G('8-funktion', 1, function () {
    var x = R.nz(-4, 5), v = R.int(0, 3), a = R.int(2, 4), b = R.nz(-6, 6), q, r, s;
    if (v === 0) { q = lin(a, 'x', b); r = a * x + b; s = a + ' * ' + par(x) + ' ' + (b < 0 ? '- ' + (-b) : '+ ' + b); }
    else if (v === 1) { q = a + 'x^2 ' + (b < 0 ? '- ' + (-b) : '+ ' + b); r = a * x * x + b; s = a + ' * ' + par(x) + '^2 ' + (b < 0 ? '- ' + (-b) : '+ ' + b) + ' = ' + a + ' * ' + x * x + ' ' + (b < 0 ? '- ' + (-b) : '+ ' + b); }
    else if (v === 2) { q = 'x^2 - ' + a + 'x'; r = x * x - a * x; s = par(x) + '^2 - ' + a + ' * ' + par(x); }
    else { x = R.pick([1, 2, 3, 4, 6, -1, -2, -3]); q = '{12/x}'; r = 12 / x; s = '12 : ' + par(x); }
    return NUM('Gegeben ist die Funktion $f(x) = ' + q + '$. Berechne $f(' + x + ')$.', r, { sol: '$f(' + x + ') = ' + s + ' = ' + de(r) + '$', hint: 'Setze für $x$ die Zahl ein – negative Zahlen in Klammern.' });
  });
  G('8-funktion', 1, function () {
    var q = R.pick([['Jeder Zahl wird ihr Quadrat zugeordnet.', true, 'Jede Zahl hat genau ein Quadrat.'], ['Jeder positiven Zahl werden die Zahlen zugeordnet, deren Quadrat sie ist.', false, 'Zur 4 gehören 2 und −2 – nicht eindeutig.'], ['Jedem Schüler wird seine Körpergröße zugeordnet.', true, 'Jeder Schüler hat genau eine Körpergröße.'], ['Jeder Körpergröße werden die Schüler mit dieser Größe zugeordnet.', false, 'Mehrere Schüler können gleich groß sein.'], ['Jedem Zeitpunkt eines Tages wird die Temperatur zugeordnet.', true, 'Zu jedem Zeitpunkt gibt es genau eine Temperatur.'], ['Jeder natürlichen Zahl werden ihre Teiler zugeordnet.', false, 'Die meisten Zahlen haben mehrere Teiler.'], ['Jedem Kreis wird sein Flächeninhalt zugeordnet.', true, 'Jeder Kreis hat genau einen Flächeninhalt.']]);
    return TF('Ist diese Zuordnung eine Funktion? ' + q[0], q[1], { sol: q[2] + ' Eine Funktion ist eine eindeutige Zuordnung (Klasse 6).', hint: 'Gehört zu jedem Ausgangswert genau ein zugeordneter Wert?' });
  });
  G('8-funktion', 2, function () {
    var v = R.int(0, 4), o = { x: [-4, 4], y: [-4, 4], w: 220 }, isF, why, pts = [], t;
    if (v === 0) { o.fns = [{ f: function (x) { return 0.5 * x * x - 2; } }]; isF = true; }
    else if (v === 1) { o.fns = [{ f: function (x) { return 0.2 * x * x * x - x; } }]; isF = true; }
    else if (v === 2) { for (t = -2.6; t <= 2.61; t += 0.1) pts.push([t * t - 3, t]); o.curves = [{ pts: pts }]; isF = false; }
    else if (v === 3) { for (t = 0; t <= 6.31; t += 0.1) pts.push([3 * Math.cos(t), 3 * Math.sin(t)]); o.curves = [{ pts: pts }]; isF = false; }
    else { o.fns = [{ f: function (x) { return -0.75 * x + 1; } }]; isF = true; }
    why = isF ? 'Jede Parallele zur $y$-Achse trifft die Kurve höchstens einmal: Zu jedem $x$ gehört genau ein $y$.' : 'Es gibt Parallelen zur $y$-Achse, die die Kurve zweimal treffen: Zu einem $x$ gehören zwei $y$-Werte.';
    return TF('Ist diese Kurve der Graph einer Funktion?', isF, { fig: Fig.graph(o), sol: why, hint: 'Senkrechten-Test: Fahre mit einer senkrechten Linie von links nach rechts über das Bild.' });
  });
  G('8-funktion', 1, function () {
    var m = R.pick([-2, -1, -0.5, 0.5, 1, 2]), n = R.int(-2, 2), x = R.pick([-2, 2, 0, -4, 4].filter(function (t) { return Math.abs(m * t + n) <= 4; }));
    if (x == null) return null;
    return NUM('Lies am Graphen ab: Welchen Funktionswert hat $f$ an der Stelle $x = ' + x + '$?', m * x + n, { pre: '$f(' + x + ') =$', fig: Fig.graph({ x: [-5, 5], y: [-5, 5], w: 230, fns: [{ f: function (t) { return m * t + n; } }] }), sol: 'Gehe von $x = ' + x + '$ senkrecht bis zum Graphen und lies die Höhe ab: $' + de(m * x + n) + '$.', hint: 'Suche $x$ auf der waagerechten Achse, gehe senkrecht zum Graphen und dann waagerecht zur $y$-Achse.' });
  });
  G('8-funktion', 2, function () {
    var v = R.bool(), z = R.int(-3, 3), m = R.pick([-2, -1, 1, 2, 0.5]);
    if (v) return NUM('Lies am Graphen ab: An welcher Stelle hat die Funktion ihre Nullstelle?', z, { pre: '$x =$', fig: Fig.graph({ x: [-5, 5], y: [-5, 5], w: 230, fns: [{ f: function (t) { return m * (t - z); } }] }), sol: 'Die Nullstelle ist die Stelle, an der der Graph die $x$-Achse schneidet: $x = ' + z + '$.', hint: 'Wo schneidet der Graph die $x$-Achse?' });
    var e = R.pick([-2, 1, 0, 2]), cnt = e < 0 ? 2 : e === 0 ? 1 : 0, d = R.int(-2, 2);
    return NUM('Wie viele Nullstellen hat die dargestellte Funktion?', cnt, { fig: Fig.graph({ x: [-5, 5], y: [-4, 6], w: 230, fns: [{ f: function (t) { return (t - d) * (t - d) + e; } }] }), sol: 'Der Graph ' + (cnt === 2 ? 'schneidet die $x$-Achse zweimal' : cnt === 1 ? 'berührt die $x$-Achse in genau einem Punkt' : 'erreicht die $x$-Achse nicht') + ': ' + cnt + ' Nullstelle' + (cnt === 1 ? '' : 'n') + '.', hint: 'Zähle die gemeinsamen Punkte von Graph und $x$-Achse.' });
  });
  G('8-funktion', 2, function () {
    var a = R.nz(-4, 5), b = R.nz(-8, 8), v = R.bool();
    if (v) return NUM('In welchem Punkt schneidet der Graph von $f(x) = ' + lin(a, 'x', b) + '$ die $y$-Achse? Gib den $y$-Wert an.', b, { pre: '$y =$', sol: 'Auf der $y$-Achse ist $x = 0$: $f(0) = ' + b + '$.', hint: 'Setze $x = 0$ ein.' });
    return NUM('In welchem Punkt schneidet der Graph von $f(x) = x^2 ' + (b < 0 ? '- ' + (-b) : '+ ' + b) + '$ die $y$-Achse? Gib den $y$-Wert an.', b, { pre: '$y =$', sol: 'Auf der $y$-Achse ist $x = 0$: $f(0) = 0^2 ' + (b < 0 ? '- ' + (-b) : '+ ' + b) + ' = ' + b + '$.', hint: 'Setze $x = 0$ ein.' });
  });
  G('8-funktion', 2, function () {
    var c = R.nz(-6, 7), k = R.int(1, 9);
    return NUM('Welche Zahl darf man in $f(x) = {' + k + '/' + lin(1, 'x', -c) + '}$ nicht für $x$ einsetzen?', c, { pre: '$x =$', sol: 'Für $x = ' + c + '$ wäre der Nenner 0 – und durch 0 kann man nicht teilen. Diese Zahl gehört nicht zum Definitionsbereich.', hint: 'Wann wird der Nenner 0?' });
  });
  G('8-funktion', 2, function () {
    var d = R.int(-2, 2), up = R.bool(), e = R.int(-2, 1) * (up ? 1 : -1);
    var fig = Fig.graph({ x: [-5, 5], y: [-5, 5], w: 230, fns: [{ f: function (t) { return (up ? 0.5 : -0.5) * (t - d) * (t - d) + e; } }] });
    var falling = up ? 'für $x < ' + d + '$' : 'für $x > ' + d + '$', rising = up ? 'für $x > ' + d + '$' : 'für $x < ' + d + '$', ask = R.bool();
    return MC('In welchem Bereich ' + (ask ? 'fällt' : 'steigt') + ' der Graph der Funktion?', ask ? falling : rising, [ask ? rising : falling, 'für alle $x$', 'nirgends'], { fig: fig, sol: 'Lies von links nach rechts: Bis $x = ' + d + '$ ' + (up ? 'fällt' : 'steigt') + ' der Graph, danach ' + (up ? 'steigt' : 'fällt') + ' er.', hint: 'Lies den Graphen von links nach rechts – wie Noten.' });
  });
  G('8-funktion', 2, function () {
    var m = R.int(2, 4), n = R.int(-3, 5), neg = R.bool();
    if (neg) m = -m;
    var ys = [0, 1, 2, 3].map(function (x) { return m * x + n; });
    return MC('Welche Gleichung passt zur Wertetabelle?<br><table class="tb"><tr><th>$x$</th><td>0</td><td>1</td><td>2</td><td>3</td></tr><tr><th>$y$</th><td>' + ys.map(function (y) { return de(y); }).join('</td><td>') + '</td></tr></table>', '$y = ' + lin(m, 'x', n) + '$', ['$y = ' + lin(n || 2, 'x', m) + '$', '$y = ' + lin(m, 'x', n + 1) + '$', '$y = ' + lin(-m, 'x', n) + '$', '$y = ' + lin(m + 1, 'x', n) + '$'], { sol: 'Für $x = 0$ ist $y = ' + n + '$. Von Spalte zu Spalte ändert sich $y$ um ' + de(m) + '. Also $y = ' + lin(m, 'x', n) + '$.', hint: 'Der Wert bei $x = 0$ und die Änderung pro Schritt verraten die Gleichung.' });
  });
  G('8-funktion', 2, function () {
    var m = R.nz(-3, 4), n = R.nz(-5, 5), x = R.nz(-3, 4), ok = R.bool(), y = m * x + n + (ok ? 0 : R.pick([-1, 1, 2]));
    return TF('Liegt der Punkt $P(' + x + '|' + y + ')$ auf dem Graphen von $f(x) = ' + lin(m, 'x', n) + '$?', ok, { sol: 'Punktprobe: $f(' + x + ') = ' + (m * x + n) + '$. ' + (ok ? 'Das stimmt mit dem $y$-Wert überein.' : 'Der $y$-Wert des Punktes ist aber ' + y + '.'), hint: 'Setze den $x$-Wert ein und vergleiche mit dem $y$-Wert.' });
  });
  G('8-funktion', 3, function () {
    var m = R.int(2, 5), n = R.nz(-6, 6), x = R.nz(-4, 6);
    return NUM('Gegeben ist $f(x) = ' + lin(m, 'x', n) + '$. An welcher Stelle $x$ nimmt die Funktion den Wert ' + (m * x + n) + ' an?', x, { pre: '$x =$', sol: 'Gleichung: $' + lin(m, 'x', n) + ' = ' + (m * x + n) + '$. Also $' + m + 'x = ' + m * x + '$ und $x = ' + x + '$.', hint: 'Setze den Funktionsterm gleich dem gesuchten Wert und löse die Gleichung (Klasse 7).' });
  });
  G('8-funktion', 3, function () {
    var e = R.nz(-5, 6), d = R.int(-3, 3), v = R.bool();
    if (v) return NUM('Welchen kleinsten Funktionswert kann $f(x) = x^2 ' + (e < 0 ? '- ' + (-e) : '+ ' + e) + '$ annehmen?', e, { sol: '$x^2$ ist nie negativ und wird für $x = 0$ am kleinsten (nämlich 0). Der kleinste Funktionswert ist also ' + e + '. Der Wertebereich besteht aus allen Zahlen $y >= ' + e + '$.', hint: 'Welchen kleinsten Wert kann $x^2$ annehmen?' });
    return NUM('An welcher Stelle nimmt $f(x) = (x ' + (d < 0 ? '+ ' + (-d) : '- ' + d) + ')^2$ ihren kleinsten Wert an?', d, { pre: '$x =$', sol: 'Ein Quadrat ist nie negativ. Es wird 0, wenn die Klammer 0 ist: für $x = ' + d + '$.', hint: 'Wann ist das Quadrat gleich 0?' });
  });

  /* ---------- 8-linear ---------- */
  G('8-linear', 1, function () {
    var m = R.pick([-3, -2, -1, 2, 3, 4, 0.5, -0.5, 1.5]), n = R.nz(-7, 7), v = R.bool();
    return NUM('Gegeben ist $f(x) = ' + lin(m, 'x', n) + '$. Wie groß ist ' + (v ? 'der Anstieg $m$' : 'der Achsenabschnitt $n$ (auf der $y$-Achse)') + '?', v ? m : n, { sol: 'In $f(x) = m * x + n$ ist $m = ' + de(m) + '$ der Anstieg und $n = ' + n + '$ der Achsenabschnitt.', hint: 'Der Anstieg ist der Faktor vor $x$, der Achsenabschnitt die Zahl ohne $x$.' });
  });
  G('8-linear', 1, function () {
    var x1 = R.int(-3, 2), dx = R.int(1, 4), m = R.pick([-3, -2, -1, 1, 2, 3]), y1 = R.int(-4, 4);
    return NUM('Eine Gerade geht durch $A(' + x1 + '|' + y1 + ')$ und $B(' + (x1 + dx) + '|' + (y1 + m * dx) + ')$. Berechne ihren Anstieg.', m, { pre: '$m =$', sol: '$m = {y_2 - y_1/x_2 - x_1} = {' + (y1 + m * dx) + ' - ' + par(y1) + '/' + (x1 + dx) + ' - ' + par(x1) + '} = {' + m * dx + '/' + dx + '} = ' + m + '$', hint: 'Differenzenquotient: Höhenunterschied geteilt durch Seitenunterschied.' });
  });
  G('8-linear', 2, function () {
    var m = R.pick([-2, -1, -0.5, 0.5, 1, 2]), n = R.int(-3, 3);
    return MC('Welche Gleichung gehört zu der Geraden?', '$y = ' + lin(m, 'x', n) + '$', ['$y = ' + lin(-m, 'x', n) + '$', '$y = ' + lin(m, 'x', n === 0 ? 2 : -n) + '$', '$y = ' + lin(n === 0 ? 3 : n, 'x', m) + '$', '$y = ' + lin(m * 2, 'x', n) + '$'], { fig: Fig.graph({ x: [-5, 5], y: [-5, 5], w: 230, fns: [{ f: function (t) { return m * t + n; } }], pts: [{ x: 0, y: n, l: '' }] }), sol: 'Die Gerade schneidet die $y$-Achse bei $n = ' + n + '$. Geht man 1 nach rechts, geht es ' + de(Math.abs(m)) + ' nach ' + (m > 0 ? 'oben' : 'unten') + ': $m = ' + de(m) + '$.', hint: 'Lies erst den Achsenabschnitt ab, dann den Anstieg mit einem Steigungsdreieck.' });
  });
  G('8-linear', 2, function () {
    var m = R.pick([2, 3, 4, -2, -3, 5]), z = R.nz(-4, 5);
    return NUM('Berechne die Nullstelle von $f(x) = ' + lin(m, 'x', -m * z) + '$.', z, { pre: '$x =$', sol: '$0 = ' + lin(m, 'x', -m * z) + '$, also $' + m + 'x = ' + m * z + '$ und $x = ' + z + '$.', hint: 'Setze $f(x) = 0$ und löse die lineare Gleichung (Klasse 7).' });
  });
  G('8-linear', 2, function () {
    var x1 = R.int(-2, 2), dx = R.int(1, 3), m = R.pick([-2, -1, 1, 2, 3]), n = R.int(-4, 4);
    return GAP('Eine Gerade geht durch $A(' + x1 + '|' + (m * x1 + n) + ')$ und $B(' + (x1 + dx) + '|' + (m * (x1 + dx) + n) + ')$. Bestimme ihre Gleichung $y = m * x + n$.', [{ pre: '$m =$', ans: m }, { pre: '$n =$', ans: n }], { sol: 'Anstieg: $m = {' + m * dx + '/' + dx + '} = ' + m + '$. Punkt $A$ einsetzen: $' + (m * x1 + n) + ' = ' + m + ' * ' + par(x1) + ' + n$, also $n = ' + n + '$.', hint: 'Erst den Anstieg aus beiden Punkten, dann einen Punkt einsetzen, um $n$ zu finden.' });
  });
  G('8-linear', 1, function () {
    var m = R.pick([-3, -1.5, -0.5, 0, 0, 0.5, 2, 4]), n = R.nz(-5, 5);
    return MCF('Wie verläuft der Graph von $f(x) = ' + (m === 0 ? n : lin(m, 'x', n)) + '$?', ['steigend', 'fallend', 'waagerecht (parallel zur $x$-Achse)'], m > 0 ? 0 : m < 0 ? 1 : 2, { sol: 'Der Anstieg ist $m = ' + de(m) + '$: ' + (m > 0 ? 'positiv – die Gerade steigt.' : m < 0 ? 'negativ – die Gerade fällt.' : 'null – die Funktion ist konstant.'), hint: 'Das Vorzeichen des Anstiegs entscheidet.' });
  });
  G('8-linear', 2, function () {
    var m = R.pick([0.5, 1.5, 2, -2, 3, -0.5]), n = R.nz(-4, 5), x = R.pick([-4, -2, 2, 4, 6]);
    return NUM('Der Punkt $P(' + x + '|y)$ liegt auf der Geraden $f(x) = ' + lin(m, 'x', n) + '$. Bestimme $y$.', m * x + n, { pre: '$y =$', sol: '$y = f(' + x + ') = ' + M.num(m) + ' * ' + par(x) + ' ' + (n < 0 ? '- ' + (-n) : '+ ' + n) + ' = ' + de(m * x + n) + '$', hint: 'Setze den $x$-Wert in die Funktionsgleichung ein.' });
  });
  G('8-linear', 2, function () {
    var dx = R.int(1, 3), dy = R.int(1, 4) * R.pick([1, -1]), x1 = R.int(-3, 0), y1 = R.int(-2, 2), m = F(dy, dx);
    if (Math.abs(y1 + dy) > 4) return null;
    var fig = Fig.graph({ x: [-5, 5], y: [-5, 5], w: 230, fns: [{ f: function (t) { return dy / dx * (t - x1) + y1; } }], pts: [{ x: x1, y: y1, l: 'A', c: Fig.C.teal }, { x: x1 + dx, y: y1 + dy, l: 'B', c: Fig.C.teal }], segs: [[x1, y1, x1 + dx, y1, Fig.C.violet, '4 3'], [x1 + dx, y1, x1 + dx, y1 + dy, Fig.C.violet, '4 3']] });
    return NUM('Bestimme den Anstieg der Geraden mithilfe des Steigungsdreiecks zwischen $A$ und $B$. (Bruch oder ganze Zahl)', m, { pre: '$m =$', reduced: true, fig: fig, sol: 'Von $A$ nach $B$: ' + dx + ' nach rechts, ' + Math.abs(dy) + ' nach ' + (dy > 0 ? 'oben' : 'unten') + '. $m = {' + dy + '/' + dx + '}' + (m.d === 1 ? ' = ' + m.n : (m.d !== dx ? ' = ' + fs(m) : '')) + '$', hint: 'Anstieg = Höhenunterschied : Seitenunterschied. Nach unten zählt negativ.' });
  });
  G('8-linear', 1, function () {
    var st = R.pick([['$f(x) = 3x$ beschreibt eine direkte Proportionalität.', true, 'Für $n = 0$ ist $y : x$ konstant – wie in Klasse 6.'], ['Der Graph von $f(x) = 2x + 1$ geht durch den Koordinatenursprung.', false, '$f(0) = 1$: Die Gerade schneidet die $y$-Achse bei 1.'], ['Zwei Geraden mit gleichem Anstieg und verschiedenem Achsenabschnitt sind parallel.', true, 'Sie sind gleich steil, aber gegeneinander verschoben.'], ['Je größer der Betrag des Anstiegs, desto steiler die Gerade.', true, 'Pro Schritt nach rechts geht es weiter nach oben oder unten.'], ['Jede Gerade im Koordinatensystem ist der Graph einer linearen Funktion.', false, 'Senkrechte Geraden (parallel zur $y$-Achse) sind keine Funktionsgraphen.'], ['Eine lineare Funktion mit $m != 0$ hat genau eine Nullstelle.', true, 'Eine nicht waagerechte Gerade schneidet die $x$-Achse genau einmal.']]);
    return TF('Wahr oder falsch? ' + st[0], st[1], { sol: st[2] });
  });
  G('8-linear', 3, function () {
    var base = R.pick([2, 3, 4, 5]), per = R.pick([1.5, 2, 2.5, 0.5]), km = R.pick([4, 6, 8, 10, 12]), v = R.bool(), cost = base + per * km;
    if (v) return NUM('Eine Kutschfahrt kostet ' + base + ' Taler Grundgebühr und ' + de(per) + ' Taler pro Kilometer. Wie viel kostet eine Fahrt über ' + km + ' km?', cost, { unit: 'Taler', sol: 'Lineare Funktion: $f(x) = ' + lin(per, 'x', base) + '$. $f(' + km + ') = ' + de(per * km) + ' + ' + base + ' = ' + de(cost) + '$', hint: 'Stelle die Funktionsgleichung auf: Grundgebühr ist $n$, Preis pro km ist $m$.' });
    return NUM('Eine Kutschfahrt kostet ' + base + ' Taler Grundgebühr und ' + de(per) + ' Taler pro Kilometer. Wie weit kommt man für ' + de(cost) + ' Taler?', km, { unit: 'km', sol: '$' + lin(per, 'x', base) + ' = ' + de(cost) + '$, also $' + de(per) + 'x = ' + de(cost - base) + '$ und $x = ' + km + '$.', hint: 'Stelle die Funktionsgleichung auf und löse nach $x$ auf.' });
  });
  G('8-linear', 3, function () {
    var m = R.pick([-3, -2, 2, 3, 4]), n1 = R.nz(-4, 4), x = R.nz(-3, 3), y = m * x + n1 + R.pick([-3, -2, 2, 3, 5]);
    return NUM('Die Gerade $g$ ist parallel zu $y = ' + lin(m, 'x', n1) + '$ und geht durch $P(' + x + '|' + y + ')$. Bestimme ihren Achsenabschnitt $n$.', y - m * x, { pre: '$n =$', sol: 'Parallel heißt gleicher Anstieg: $m = ' + m + '$. Einsetzen: $' + y + ' = ' + m + ' * ' + par(x) + ' + n$, also $n = ' + (y - m * x) + '$.', hint: 'Parallele Geraden haben denselben Anstieg.' });
  });
  G('8-linear', 3, function () {
    var x = R.nz(-3, 4), m1 = R.pick([1, 2, 3]), m2 = R.pick([-1, -2]), y = R.int(-3, 6), n1 = y - m1 * x, n2 = y - m2 * x;
    return NUM('An welcher Stelle $x$ schneiden sich die Graphen von $f(x) = ' + lin(m1, 'x', n1) + '$ und $g(x) = ' + lin(m2, 'x', n2) + '$?', x, { pre: '$x =$', sol: 'Gleichsetzen: $' + lin(m1, 'x', n1) + ' = ' + lin(m2, 'x', n2) + '$. Also $' + (m1 - m2) + 'x = ' + (n2 - n1) + '$ und $x = ' + x + '$. (Dort ist $y = ' + y + '$.)', hint: 'Im Schnittpunkt haben beide Funktionen denselben Wert: Setze die Terme gleich.' });
  });

  /* ---------- 8-aehnlich ---------- */
  G('8-aehnlich', 1, function () {
    var a = R.pick([2, 4, 5, 6, 8]), k = R.pick([1.5, 2, 2.5, 3, 0.5]), v = R.bool();
    if (v) return NUM('Bei einer zentrischen Streckung wird eine ' + a + ' cm lange Strecke auf eine ' + de(a * k) + ' cm lange Strecke abgebildet. Wie groß ist der Streckfaktor $k$?', k, { pre: '$k =$', sol: '$k = {Bildlänge/Originallänge} = {' + de(a * k) + '/' + a + '} = ' + de(k) + '$', hint: 'Der Streckfaktor ist Bildlänge geteilt durch Originallänge.' });
    return NUM('Eine ' + a + ' cm lange Strecke wird mit dem Faktor $k = ' + de(k) + '$ zentrisch gestreckt. Wie lang ist die Bildstrecke?', a * k, { unit: 'cm', sol: 'Alle Längen werden mit $k$ multipliziert: $' + a + ' * ' + de(k) + ' = ' + de(a * k) + '$ cm.', hint: 'Bildlänge = $k$ mal Originallänge.' });
  });
  G('8-aehnlich', 2, function () {
    var k = R.pick([2, 3, 4, 5]), a = R.pick([3, 5, 6, 8, 12]), vol = R.bool();
    return NUM('Eine Figur wird mit dem Faktor $k = ' + k + '$ gestreckt. Das Original hat ' + (vol ? 'das Volumen $' + a + ' cm^3$' : 'den Flächeninhalt $' + a + ' cm^2$') + '. Wie groß ist ' + (vol ? 'das Volumen' : 'der Flächeninhalt') + ' der Bildfigur?', a * Math.pow(k, vol ? 3 : 2), { unit: vol ? '$cm^3$' : '$cm^2$', sol: (vol ? 'Volumina werden mit $k^3$ multipliziert: $' + a + ' * ' + k + '^3' : 'Flächeninhalte werden mit $k^2$ multipliziert: $' + a + ' * ' + k + '^2') + ' = ' + a * Math.pow(k, vol ? 3 : 2) + '$', hint: vol ? 'Ein Körper wächst in drei Richtungen: $k * k * k$.' : 'Eine Fläche wächst in zwei Richtungen: $k * k$.' });
  });
  G('8-aehnlich', 2, function () {
    var t = R.pick([[3, 4, 5], [5, 12, 13], [6, 8, 10], [4, 5, 6], [3, 5, 7]]), k = R.pick([2, 3, 1.5, 2.5]), i = R.int(0, 2), labs = t.map(function (x) { return de(x * k); });
    labs[i] = 'x';
    var P = [[0, 0], [t[0], 0], [t[0] * 0.3, t[1] * 0.7]];
    return NUM('Die beiden Dreiecke sind ähnlich (Maße in cm). Berechne die Seitenlänge $x$.', t[i] * k, { unit: 'cm', fig: Fig.row([Fig.shape({ P: P, s: [t[0] + '', t[2] + '', t[1] + ''], w: 120, pad: 24, maxh: 70 }), Fig.shape({ P: P, s: [labs[0], labs[2], labs[1]], w: 170, pad: 28, maxh: 110, fill: 'rgba(184,58,75,.14)' })]), sol: 'Streckfaktor aus einem bekannten Seitenpaar: $k = ' + de(k) + '$. Dann $x = ' + t[i] + ' * ' + de(k) + ' = ' + de(t[i] * k) + '$ cm.', hint: 'Bestimme den Streckfaktor aus zwei einander entsprechenden Seiten.' });
  });
  G('8-aehnlich', 2, function () {
    var stab = R.pick([1.5, 2, 1, 3]), sch = R.pick([2, 3, 4, 1.5]), f = R.pick([8, 10, 12, 15, 20]), h = stab * f, schT = sch * f;
    return NUM('Ein ' + de(stab) + ' m hoher Stab wirft einen ' + de(sch) + ' m langen Schatten. Zur selben Zeit ist der Schatten des Kirchturms ' + de(schT) + ' m lang. Wie hoch ist der Turm?', h, { unit: 'm', sol: 'Die Sonnenstrahlen fallen parallel ein: Stab und Turm bilden mit ihren Schatten ähnliche Dreiecke. ${h/' + de(schT) + '} = {' + de(stab) + '/' + de(sch) + '}$, also $h = ' + de(h) + '$ m.', hint: 'Höhe und Schattenlänge stehen bei Stab und Turm im gleichen Verhältnis.' });
  });
  G('8-aehnlich', 2, function () {
    var sc = R.pick([25000, 50000, 100000, 200000]), cm = R.pick([2, 3, 4, 5, 6, 8]), km = cm * sc / 100000, v = R.bool();
    if (v) return NUM('Auf einer Wanderkarte der Sächsischen Schweiz im Maßstab 1 : ' + de(sc) + ' sind zwei Gipfel ' + cm + ' cm voneinander entfernt. Wie viele Kilometer sind das in Wirklichkeit?', km, { unit: 'km', sol: '$' + cm + ' * ' + de(sc) + ' = ' + de(cm * sc) + '$ cm $= ' + de(km) + '$ km (100 000 cm = 1 km).', hint: '1 cm auf der Karte entspricht ' + de(sc) + ' cm in Wirklichkeit.' });
    return NUM('Zwei Orte sind ' + de(km) + ' km voneinander entfernt. Wie viele Zentimeter sind das auf einer Karte im Maßstab 1 : ' + de(sc) + '?', cm, { unit: 'cm', sol: '$' + de(km) + '$ km $= ' + de(km * 100000) + '$ cm. Geteilt durch ' + de(sc) + ': $' + cm + '$ cm.', hint: 'Rechne die Kilometer in Zentimeter um und teile durch die Maßstabszahl.' });
  });
  G('8-aehnlich', 2, function () {
    var a1 = R.pick([40, 50, 60, 70]), b1 = R.pick([30, 45, 55, 65]), c1 = 180 - a1 - b1, ok = R.bool();
    var a2 = ok ? c1 : c1 + R.pick([-10, 10, 5]), b2 = ok ? a1 : a1;
    if (a2 <= 0 || a2 + b2 >= 180) return null;
    return TF('Dreieck 1 hat die Winkel ' + a1 + '° und ' + b1 + '°. Dreieck 2 hat die Winkel ' + a2 + '° und ' + b2 + '°. Sind die Dreiecke ähnlich?', ok, { sol: 'Dritter Winkel von Dreieck 1: $180° - ' + a1 + '° - ' + b1 + '° = ' + c1 + '°$. Dreieck 1 hat also ' + a1 + '°, ' + b1 + '°, ' + c1 + '°; Dreieck 2 hat ' + a2 + '°, ' + b2 + '°, ' + (180 - a2 - b2) + '°. ' + (ok ? 'Die Winkel stimmen überein: ähnlich (Hauptähnlichkeitssatz).' : 'Die Winkel stimmen nicht überein.'), hint: 'Berechne mit dem Innenwinkelsatz (Klasse 6) jeweils den dritten Winkel.' });
  });
  G('8-aehnlich', 2, function () {
    var sc = R.pick([10, 20, 25, 50]), cm = R.pick([20, 30, 40, 60]), m = cm * sc / 100;
    return NUM('Ein Modell des Dresdner Zwingers ist im Maßstab 1 : ' + sc + ' gebaut. Ein Tor ist im Modell ' + cm + ' cm hoch. Wie hoch ist es in Wirklichkeit?', m, { unit: 'm', sol: '$' + cm + ' * ' + sc + ' = ' + cm * sc + '$ cm $= ' + de(m) + '$ m.', hint: 'In Wirklichkeit ist alles ' + sc + '-mal so groß.' });
  });
  G('8-aehnlich', 3, function () {
    var k = R.pick([2, 3, 4, 5]), a = R.pick([3, 4, 5, 12]);
    return NUM('Zwei ähnliche Figuren haben die Flächeninhalte $' + a + ' cm^2$ und $' + a * k * k + ' cm^2$. Mit welchem Faktor $k$ wurden die Längen gestreckt?', k, { pre: '$k =$', sol: 'Die Flächen stehen im Verhältnis $' + a * k * k + ' : ' + a + ' = ' + k * k + ' = k^2$. Also $k = ' + k + '$.', hint: 'Das Flächenverhältnis ist $k^2$ – ziehe die Wurzel (Klasse 7).' });
  });
  G('8-aehnlich', 3, function () {
    var za = R.pick([2, 3, 4]), k = R.pick([2, 2.5, 3, 1.5]), ab = R.pick([2, 3, 4, 5]);
    var fig = Fig.shape({ P: [[0, 0], [10, 0], [10, 5]], v: ['Z', "A'", "B'"], s: ['', '', ''], extra: [{ from: [10 / k, 0], to: [10 / k, 5 / k], c: Fig.C.red, l: de(ab), dx: -12 }, { from: [10, 5], to: [10, 5], l: 'x', dx: 14, dy: 16, it: true }, { from: [10 / k / 2, 0], to: [10 / k / 2, 0], l: de(za), dx: 0, dy: 13 }, { from: [5, 0], to: [5, 0], l: de(za * k), dx: 20, dy: 26 }], maxh: 120 });
    return NUM('Die rote Strecke ist parallel zur Seite $A\'B\'$. Vom Punkt $Z$ bis zur roten Strecke sind es ' + de(za) + ' cm, bis $A\'$ sind es ' + de(za * k) + ' cm. Die rote Strecke ist ' + ab + ' cm lang. Wie lang ist $x$ (die Seite $A\'B\'$)?', ab * k, { unit: 'cm', fig: fig, sol: 'Das kleine und das große Dreieck sind ähnlich (gleiche Winkel). Streckfaktor: $k = {' + de(za * k) + '/' + de(za) + '} = ' + de(k) + '$. Also $x = ' + ab + ' * ' + de(k) + ' = ' + de(ab * k) + '$ cm.', hint: 'Das kleine Dreieck ist eine verkleinerte Kopie des großen. Bestimme zuerst den Streckfaktor.' });
  });
  G('8-aehnlich', 3, function () {
    var st = R.pick([['Alle Quadrate sind zueinander ähnlich.', true, 'Alle Winkel sind 90°, alle Seitenverhältnisse 1 : 1.'], ['Alle Rechtecke sind zueinander ähnlich.', false, 'Ein Rechteck 1 × 2 und ein Rechteck 1 × 3 haben verschiedene Seitenverhältnisse.'], ['Alle gleichseitigen Dreiecke sind zueinander ähnlich.', true, 'Alle Winkel sind 60°.'], ['Alle Kreise sind zueinander ähnlich.', true, 'Jeder Kreis geht durch Streckung aus jedem anderen hervor.'], ['Alle gleichschenkligen Dreiecke sind zueinander ähnlich.', false, 'Die Winkel an der Spitze können verschieden sein.'], ['Kongruente Figuren sind auch ähnlich.', true, 'Kongruenz ist Ähnlichkeit mit dem Streckfaktor 1.'], ['Verdoppelt man alle Kantenlängen eines Würfels, verdoppelt sich sein Volumen.', false, 'Das Volumen wird $2^3 = 8$-mal so groß.'], ['Bei einer zentrischen Streckung bleiben alle Winkelgrößen erhalten.', true, 'Nur die Längen ändern sich – die Form bleibt.']]);
    return TF('Wahr oder falsch? ' + st[0], st[1], { sol: st[2] });
  });
})(typeof window !== 'undefined' ? window : globalThis);

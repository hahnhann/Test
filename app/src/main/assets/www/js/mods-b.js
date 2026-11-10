/* Silberzirkel – Module der Klassen 8 bis 11/12 (Lehrplan Gymnasium Sachsen, Mathematik). */
(function (g) {
  'use strict';
  var mod = g.SZ.mod;

  /* ======================= KLASSE 8 ======================= */
  mod({ id: '8-terme', k: 8, lb: [1], t: 'alg', icon: 'a+b', name: 'Terme umformen', spell: 'Terminus Simplico', lp: 4, pre: ['5-gesetze', '7-rational'],
    idea: 'Terme sind die Sätze der Mathematiksprache. Umformen heißt: denselben Inhalt anders – meist einfacher – aufschreiben. Die Regeln dafür kennst du seit Klasse 5, nur stehen jetzt Buchstaben statt Zahlen da.',
    defs: [['Struktur eines Terms', 'Die Rechenart, die zuletzt ausgeführt wird, gibt dem Term seinen Namen: $3 * (x + 2)$ ist ein Produkt, $3 * x + 2$ eine Summe.'],
      ['Gleichartige Terme', 'Terme mit denselben Variablen in denselben Potenzen, z. B. $3ab$ und $-5ab$. Nur sie darf man zusammenfassen.']],
    rules: [['Klammern auflösen', 'Steht ein Plus vor der Klammer, bleibt alles, wie es ist. Steht ein Minus davor, kehren sich alle Vorzeichen in der Klammer um: $a - (b - c) = a - b + c$.', 'Das Minus vor der Klammer ist eine Multiplikation mit $-1$ – und das Distributivgesetz verteilt sie auf jeden Summanden.'],
      ['Ausmultiplizieren', '$(a + b) * (c + d) = ac + ad + bc + bd$: Jeder Summand der ersten Klammer wird mit jedem der zweiten multipliziert.', 'Ein Rechteck mit den Seiten $a + b$ und $c + d$ zerfällt in vier kleine Rechtecke.'],
      ['Ausklammern', 'Ein gemeinsamer Faktor wird vor die Klammer gezogen: $6x + 9 = 3 * (2x + 3)$.', 'Das ist das Distributivgesetz, von rechts nach links gelesen.']],
    ex: ['$3 * (x + 4) - 5x$', '$3x + 12 - 5x = -2x + 12$'],
    trap: '$x + x = 2x$, aber $x * x = x^2$. Und $2x + 3y$ lässt sich nicht zusammenfassen.',
    art: 'Ein Motiv, das dreimal erklingt, schreibt man mit Wiederholungszeichen statt es dreimal zu notieren – so wie $3a$ statt $a + a + a$.' });

  mod({ id: '8-binom', k: 8, lb: [1], t: 'alg', icon: '(a+b)²', name: 'Binomische Formeln', spell: 'Binomia Expando', lp: 4, pre: ['8-terme', '5-flaeche'],
    idea: 'Drei Abkürzungen, die man immer wieder braucht – vorwärts zum Ausmultiplizieren, rückwärts zum Zerlegen in Faktoren. In Klasse 9 lösen sie quadratische Gleichungen.',
    defs: [['Binom', 'Eine Summe oder Differenz aus zwei Gliedern, z. B. $a + b$.']],
    rules: [['1. binomische Formel', '$(a + b)^2 = a^2 + 2ab + b^2$', 'Ein Quadrat mit der Seitenlänge $a + b$ besteht aus einem Quadrat $a^2$, einem Quadrat $b^2$ und zwei Rechtecken $a * b$.'],
      ['2. binomische Formel', '$(a - b)^2 = a^2 - 2ab + b^2$', 'Ersetze in der ersten Formel $b$ durch $-b$: Das mittlere Glied wechselt das Vorzeichen, $(-b)^2$ bleibt positiv.'],
      ['3. binomische Formel', '$(a + b) * (a - b) = a^2 - b^2$', 'Beim Ausmultiplizieren entstehen $-ab$ und $+ab$ – sie heben sich auf.']],
    ex: ['Zerlege $x^2 - 25$ in Faktoren.', '$x^2 - 25 = x^2 - 5^2 = (x + 5) * (x - 5)$'],
    trap: '$(a + b)^2$ ist nicht $a^2 + b^2$ – das doppelte Produkt $2ab$ gehört dazu.',
    art: 'Das zerlegte Quadrat $(a + b)^2$ sieht aus wie ein Gemälde aus farbigen Rechtecken. Kopfrechentrick: $19 * 21 = 20^2 - 1^2 = 399$.' });

  mod({ id: '8-gleichung', k: 8, lb: [1], t: 'alg', icon: 'x<3', name: 'Gleichungen & Ungleichungen', spell: 'Inaequalis Verto', lp: 3, pre: ['7-gleichung', '8-terme'],
    idea: 'Mit den Termumformungen lassen sich jetzt auch Gleichungen mit Klammern lösen. Neu: Ungleichungen – ihre Lösung ist nicht eine Zahl, sondern ein ganzer Bereich.',
    defs: [['Lösungsmenge', 'Die Menge aller Zahlen, die eine Gleichung oder Ungleichung erfüllen.'],
      ['Ungleichung', 'Zwei Terme, verbunden durch $<$, $>$, $<=$ oder $>=$.']],
    rules: [['Sonderfälle', 'Endet die Umformung mit einer falschen Aussage wie $0 = 5$, gibt es keine Lösung. Endet sie mit einer wahren Aussage wie $0 = 0$, ist jede Zahl eine Lösung.', 'Äquivalenzumformungen ändern die Lösungsmenge nicht – also hat die Ausgangsgleichung dieselben Lösungen wie die letzte Zeile.'],
      ['Inversionsregel', 'Multipliziert oder dividiert man eine Ungleichung mit einer negativen Zahl, dreht sich das Relationszeichen um.', '$2 < 5$, aber $-2 > -5$: Die Multiplikation mit $-1$ spiegelt die Zahlengerade am Nullpunkt – rechts und links tauschen die Plätze.']],
    ex: ['$-3x + 2 < 14$', '$-3x < 12$, dann durch $-3$ teilen und Zeichen umdrehen: $x > -4$'],
    trap: 'Das Umdrehen gilt nur beim Multiplizieren oder Dividieren mit negativen Zahlen – nicht beim Addieren oder Subtrahieren.',
    art: 'Ein Sänger trifft nicht eine Lösung, sondern einen Bereich: Jede Stimmlage – Sopran, Alt, Tenor, Bass – ist ein Intervall von Tönen.' });

  mod({ id: '8-zufall', k: 8, lb: [2], t: 'sto', icon: 'P(E)', name: 'Zufall & Wahrscheinlichkeit', spell: 'Fortuna Laplace', lp: 4, pre: ['6-haeufig', '6-bruchrechnen', '7-zahlbereiche'],
    idea: 'Den einzelnen Wurf kann niemand vorhersagen – aber auf lange Sicht gehorcht der Zufall festen Gesetzen. Wahrscheinlichkeit ist Bruchrechnung mit dem Ungewissen.',
    defs: [['Ergebnismenge $Ω$', 'Die Menge aller möglichen Ergebnisse eines Zufallsversuchs. Beim Würfel: $Ω = {1; 2; 3; 4; 5; 6}$.'],
      ['Ereignis', 'Eine Teilmenge der Ergebnismenge, z. B. „gerade Zahl“ = {2; 4; 6}. Das Gegenereignis enthält alle übrigen Ergebnisse.'],
      ['Laplace-Versuch', 'Ein Zufallsversuch, bei dem alle Ergebnisse gleich wahrscheinlich sind.']],
    rules: [['Laplace-Regel', '$P(E) = {Anzahl der günstigen Ergebnisse/Anzahl der möglichen Ergebnisse}$', 'Sind alle Ergebnisse gleichberechtigt, zählt nur, wie groß der Anteil der günstigen ist.'],
      ['Gegenereignis', '$P(nicht E) = 1 - P(E)$', 'Ereignis und Gegenereignis teilen die Ergebnismenge vollständig auf.'],
      ['Gesetz der großen Zahlen', 'Bei sehr vielen Wiederholungen stabilisiert sich die relative Häufigkeit in der Nähe der Wahrscheinlichkeit.', 'Zufällige Ausreißer fallen bei großen Anzahlen immer weniger ins Gewicht.']],
    ex: ['Wie groß ist die Wahrscheinlichkeit, mit einem Würfel eine Primzahl zu werfen?', 'Günstig: 2, 3, 5. $P = {3/6} = {1/2}$'],
    trap: 'Der Würfel hat kein Gedächtnis: Nach fünf Sechsen ist die nächste Sechs genauso wahrscheinlich wie immer.',
    art: 'Im 18. Jahrhundert waren musikalische Würfelspiele beliebt: Würfel bestimmten, welche Takte gespielt wurden. So entstanden Millionen verschiedener Walzer.' });

  mod({ id: '8-baum', k: 8, lb: [2], t: 'sto', icon: '⋔', name: 'Baumdiagramme & Pfadregeln', spell: 'Arbor Viarum', lp: 4, pre: ['8-zufall', '6-bruchrechnen'],
    idea: 'Passiert der Zufall in mehreren Schritten, hilft ein Baum: Jeder Weg von der Wurzel bis zum Blatt ist eine mögliche Geschichte.',
    defs: [['Mehrstufiger Zufallsversuch', 'Mehrere Zufallsversuche nacheinander, z. B. zweimal aus einer Urne ziehen.'],
      ['Urnenmodell', 'Mit Zurücklegen bleiben die Wahrscheinlichkeiten in jeder Stufe gleich; ohne Zurücklegen ändern sie sich.']],
    rules: [['1. Pfadregel (Produktregel)', 'Die Wahrscheinlichkeit eines Pfades ist das Produkt der Wahrscheinlichkeiten entlang des Pfades.', 'Ein Anteil von einem Anteil: Von ${3/5}$ aller Fälle geht es in ${1/2}$ der Fälle weiter – das ist ${3/5} * {1/2}$, Bruchrechnung aus Klasse 6.'],
      ['2. Pfadregel (Summenregel)', 'Gehören mehrere Pfade zu einem Ereignis, addiert man ihre Wahrscheinlichkeiten.', 'Verschiedene Pfade können nicht gleichzeitig eintreten – ihre Anteile zählen zusammen.'],
      ['Kontrolle', 'An jeder Verzweigung ergeben die Wahrscheinlichkeiten zusammen 1.', 'Irgendeinen der Äste muss der Zufall nehmen.']],
    ex: ['Urne: 3 rote, 2 blaue Kugeln. Zweimal ziehen ohne Zurücklegen. $P$(zweimal rot)?', '${3/5} * {2/4} = {6/20} = {3/10}$'],
    trap: 'Ohne Zurücklegen fehlt in der zweiten Stufe eine Kugel – Zähler und Nenner ändern sich.',
    art: 'Ein Stammbaum, die Verästelung eines Flusses, ein Blitz: Bäume sind überall. Auch jedes Musikstück mit „Entweder-oder“-Schlüssen folgt einem Baum.' });

  mod({ id: '8-zaehlen', k: 8, lb: [2], t: 'sto', icon: 'n!', name: 'Geschicktes Zählen', spell: 'Numerare Omnia', lp: 3, pre: ['8-baum', '5-nat'],
    idea: 'Wie viele Möglichkeiten gibt es? Statt alles aufzuschreiben, multipliziert man – die Produktregel ist ein Baumdiagramm ohne Wahrscheinlichkeiten.',
    defs: [['Fakultät', '$n! = 1 * 2 * 3 * ... * n$, die Anzahl der Reihenfolgen, in die man $n$ verschiedene Dinge bringen kann.']],
    rules: [['Produktregel', 'Hat man nacheinander $n_1$, dann $n_2$, dann $n_3$ … Möglichkeiten, so gibt es insgesamt $n_1 * n_2 * n_3 * ...$ Möglichkeiten.', 'Im Baumdiagramm verzweigt sich jeder der $n_1$ Äste wieder in $n_2$ Äste.'],
      ['Mit oder ohne Zurücklegen', 'Mit Zurücklegen bleibt die Anzahl der Möglichkeiten in jedem Schritt gleich ($n * n * n$). Ohne Zurücklegen wird sie jedes Mal um 1 kleiner ($n * (n - 1) * (n - 2)$).', 'Was schon gezogen wurde, steht nicht mehr zur Wahl.'],
      ['Reihenfolge egal', 'Kommt es nicht auf die Reihenfolge an, teilt man durch die Anzahl der Reihenfolgen der gezogenen Dinge.', 'Sonst würde man jede Auswahl mehrfach zählen.']],
    ex: ['Wie viele vierstellige Codes aus den Ziffern 0 bis 9 gibt es?', '$10 * 10 * 10 * 10 = 10^4 = 10 000$'],
    trap: 'Erst klären: Darf sich etwas wiederholen? Spielt die Reihenfolge eine Rolle?',
    art: 'Aus 4 verschiedenen Tönen lassen sich $4! = 24$ Melodien bilden, aus 8 Tönen schon 40 320. Glöckner in England läuten solche Reihenfolgen systematisch durch.' });

  mod({ id: '8-logik', k: 8, lb: [2, 5], t: 'log', icon: '∧ ∨', name: 'UND, ODER, NICHT & Strategien', spell: 'Et Vel Non', lp: 3, pre: ['7-logik', '7-zahlbereiche'],
    idea: 'Drei kleine Wörter tragen die ganze Logik. In der Mathematik bedeuten sie etwas genauer Festgelegtes als im Alltag. Dazu kommen Strategien, mit denen man jedes Problem anpacken kann.',
    defs: [['UND', '$A ∩ B$ (Durchschnitt): Beide Ereignisse treten ein.'],
      ['ODER', '$A ∪ B$ (Vereinigung): Mindestens eines tritt ein – auch beide zugleich sind erlaubt.'],
      ['NICHT', 'Das Gegenereignis: $A$ tritt nicht ein.']],
    rules: [['Einschließendes ODER', 'Das mathematische „oder“ schließt den Fall „beides“ ein.', 'So ist $A ∪ B$ als Menge festgelegt: alle Elemente, die in $A$ oder in $B$ oder in beiden liegen.'],
      ['Vollständige Fallunterscheidung', 'Man teilt ein Problem so in Fälle auf, dass jeder mögliche Fall genau einmal vorkommt.', 'Ist jeder Fall erledigt, ist das ganze Problem erledigt – nichts wurde vergessen, nichts doppelt gezählt.'],
      ['Vorwärts- und Rückwärtsarbeiten', 'Vorwärts: Was kann ich aus dem Gegebenen folgern? Rückwärts: Was müsste ich wissen, um das Gesuchte zu bekommen?', 'Treffen sich beide Wege in der Mitte, steht der Lösungsplan.']],
    ex: ['Würfel: $A$ = „gerade“, $B$ = „größer als 3“. Bestimme $A ∩ B$ und $A ∪ B$.', '$A = {2; 4; 6}$, $B = {4; 5; 6}$. Also $A ∩ B = {4; 6}$ und $A ∪ B = {2; 4; 5; 6}$.'],
    trap: '„Tee oder Kaffee?“ meint im Alltag meist nur eines von beiden. In der Mathematik wäre auch beides richtig.',
    art: 'Jede Suchmaschine und jeder Computer arbeitet mit UND, ODER und NICHT. Ada Lovelace ahnte schon 1843, dass Maschinen damit einmal Musik machen könnten.' });

  mod({ id: '8-funktion', k: 8, lb: [3], t: 'fun', icon: 'f(x)', name: 'Der Funktionsbegriff', spell: 'Functio Unica', lp: 4, pre: ['6-zuord', '5-koord'],
    idea: 'Die Funktion ist einer der tragenden Begriffe der ganzen Mathematik. Sie beschreibt, wie eine Größe von einer anderen abhängt – eindeutig und verlässlich.',
    defs: [['Funktion', 'Eine eindeutige Zuordnung: Jedem $x$ aus dem Definitionsbereich wird genau ein $y$ zugeordnet. Man schreibt $y = f(x)$.'],
      ['Definitions- und Wertebereich', 'Definitionsbereich: alle $x$, die eingesetzt werden dürfen. Wertebereich: alle $y$, die als Funktionswerte vorkommen.'],
      ['Nullstelle', 'Ein $x$ mit $f(x) = 0$. Dort schneidet oder berührt der Graph die $x$-Achse.']],
    rules: [['Senkrechten-Test', 'Eine Kurve ist genau dann Graph einer Funktion, wenn jede Parallele zur $y$-Achse sie höchstens einmal trifft.', 'Sonst gäbe es zu einem $x$ zwei verschiedene $y$ – die Zuordnung wäre nicht eindeutig.'],
      ['Achsenschnittpunkte', 'Schnitt mit der $y$-Achse: $x = 0$ einsetzen. Schnitt mit der $x$-Achse: $f(x) = 0$ lösen.', 'Auf der $y$-Achse ist $x = 0$, auf der $x$-Achse ist $y = 0$.'],
      ['Monotonie', 'Steigend: Zu größeren $x$ gehören größere $y$. Fallend: Zu größeren $x$ gehören kleinere $y$.', 'Man liest den Graphen von links nach rechts – wie Noten.']],
    ex: ['$f(x) = 2x^2 - 3$. Berechne $f(-2)$.', '$f(-2) = 2 * (-2)^2 - 3 = 2 * 4 - 3 = 5$'],
    trap: 'Ein Kreis ist kein Funktionsgraph: Zu einem $x$ gehören zwei Punkte.',
    art: 'Jeder Klang ist eine Funktion: Zu jedem Zeitpunkt gehört genau ein Luftdruck. Die Rille einer Schallplatte ist ihr Graph.' });

  mod({ id: '8-linear', k: 8, lb: [3], t: 'fun', icon: 'mx+n', name: 'Lineare Funktionen', spell: 'Linea Recta', lp: 5, pre: ['8-funktion', '6-prop', '7-gleichung'],
    idea: 'Die einfachsten Funktionen haben Geraden als Graphen. Zwei Zahlen genügen, um sie vollständig zu beschreiben: wie steil und wo sie die $y$-Achse trifft.',
    defs: [['Lineare Funktion', '$f(x) = m * x + n$. Der Graph ist eine Gerade.'],
      ['Anstieg $m$', 'Geht man 1 nach rechts, geht es $m$ nach oben (bei negativem $m$ nach unten).'],
      ['Achsenabschnitt $n$', 'Die Stelle, an der die Gerade die $y$-Achse schneidet: $f(0) = n$.']],
    rules: [['Differenzenquotient', '$m = {y_2 - y_1/x_2 - x_1}$ für zwei beliebige Punkte der Geraden.', 'Alle Steigungsdreiecke an einer Geraden sind ähnlich – das Verhältnis Höhe zu Breite ist überall gleich.'],
      ['Nullstelle', '$0 = m * x + n$ lösen: $x = -{n/m}$ (für $m != 0$).', 'Das ist eine lineare Gleichung aus Klasse 7.'],
      ['Proportionalität als Sonderfall', 'Für $n = 0$ ist $f(x) = m * x$ eine direkte Proportionalität. Ihr Graph geht durch den Ursprung.', '$m$ ist genau der konstante Quotient $y : x$ aus Klasse 6.']],
    ex: ['Gerade durch $A(1|2)$ und $B(3|8)$.', '$m = {8 - 2/3 - 1} = 3$. Einsetzen von $A$: $2 = 3 * 1 + n$, also $n = -1$. $f(x) = 3x - 1$'],
    trap: 'Anstieg ist Höhenunterschied geteilt durch Seitenunterschied – nicht umgekehrt.',
    art: 'Ein gleichmäßiges Crescendo ist eine lineare Funktion: In jeder Sekunde wächst die Lautstärke um denselben Betrag.' });

  mod({ id: '8-lgs', k: 8, lb: [3], t: 'alg', icon: '{ }', name: 'Lineare Gleichungssysteme', spell: 'Systema Duplex', lp: 5, pre: ['8-linear', '8-gleichung'],
    idea: 'Zwei Unbekannte, zwei Bedingungen. Algebra und Funktionen-Turm reichen sich die Hand: Die Lösung ist der Schnittpunkt zweier Geraden.',
    defs: [['Lineares Gleichungssystem', 'Zwei lineare Gleichungen mit zwei Variablen, die gleichzeitig gelten sollen.'],
      ['Lösung', 'Ein Zahlenpaar $(x|y)$, das beide Gleichungen erfüllt.']],
    rules: [['Einsetzungsverfahren', 'Eine Gleichung nach einer Variablen auflösen und in die andere einsetzen.', 'So entsteht eine Gleichung mit nur noch einer Variablen – und die kannst du lösen.'],
      ['Additionsverfahren', 'Die Gleichungen so vervielfachen und addieren, dass eine Variable wegfällt.', 'Gleiches zu Gleichem addiert ergibt wieder Gleiches.'],
      ['Lösbarkeit', 'Genau eine Lösung: Die Geraden schneiden sich. Keine Lösung: Die Geraden sind parallel und verschieden. Unendlich viele Lösungen: Die Geraden sind identisch.', 'Zwei Geraden in der Ebene können nur auf diese drei Arten zueinander liegen – eine vollständige Fallunterscheidung.']],
    ex: ['I: $y = 2x - 1$, II: $x + y = 5$', 'I in II: $x + 2x - 1 = 5$, also $x = 2$. Dann $y = 2 * 2 - 1 = 3$. Lösung: $(2|3)$'],
    trap: 'Erst fertig, wenn beide Variablen bestimmt sind. Die Probe gehört in beide Gleichungen.',
    art: 'Zwei Stimmen eines Duetts laufen eigene Wege – der Ton, den beide im selben Moment singen, ist ihr Schnittpunkt.' });

  mod({ id: '8-aehnlich', k: 8, lb: [4], t: 'geo', icon: 'k·', name: 'Ähnlichkeit', spell: 'Similis Scala', lp: 4, pre: ['6-dreieck', '6-prop', '6-viereck'],
    idea: 'Ähnliche Figuren haben dieselbe Form, aber nicht unbedingt dieselbe Größe – wie ein Foto und seine Vergrößerung. Damit misst man Höhen, die man nie erklettern könnte.',
    defs: [['Zentrische Streckung', 'Von einem Zentrum $Z$ aus werden alle Abstände mit demselben Faktor $k$ multipliziert.'],
      ['Ähnlich', 'Zwei Figuren sind ähnlich, wenn entsprechende Winkel gleich groß sind und entsprechende Seiten im gleichen Verhältnis stehen.']],
    rules: [['Streckfaktor', 'Bei einer Streckung mit dem Faktor $k$ werden alle Längen mit $k$ multipliziert, alle Flächeninhalte mit $k^2$, alle Volumina mit $k^3$. Winkel bleiben gleich.', 'Eine Fläche hat zwei Richtungen, die beide mit $k$ wachsen: $k * k$. Ein Körper hat drei.'],
      ['Hauptähnlichkeitssatz', 'Zwei Dreiecke sind ähnlich, wenn sie in zwei Winkeln übereinstimmen.', 'Der dritte Winkel stimmt dann nach dem Innenwinkelsatz automatisch auch überein.']],
    ex: ['Ein 2 m hoher Stab wirft einen 3 m langen Schatten. Der Schatten eines Turms ist 45 m lang. Wie hoch ist der Turm?', 'Die Dreiecke sind ähnlich: ${h/45} = {2/3}$, also $h = 30$ m.'],
    trap: 'Doppelte Seitenlänge bedeutet vierfache Fläche und achtfaches Volumen – nicht doppelt.',
    art: 'Maler übertragen Skizzen mit einem Raster auf die große Leinwand: eine zentrische Streckung von Hand. In „Gullivers Reisen“ steckt viel Ähnlichkeitsrechnung.' });

  /* ======================= KLASSE 9 ======================= */
  mod({ id: '9-potenz', k: 9, lb: [1], t: 'alg', icon: 'aⁿ', name: 'Potenzgesetze', spell: 'Potentia Lex', lp: 5, pre: ['7-potwurz', '8-terme'],
    idea: 'Was bedeutet $2^0$, $2^{-3}$ oder $2^{1/2}$? Man legt es so fest, dass die vertrauten Rechenregeln weiter gelten – das Permanenzprinzip.',
    defs: [['Exponent 0 und negativ', '$a^0 = 1$ und $a^{-n} = {1/a^n}$ (für $a != 0$).'],
      ['Rationaler Exponent', '$a^{1/n}$ ist die $n$-te Wurzel aus $a$: $8^{1/3} = 2$.']],
    rules: [['Gleiche Basis', '$a^m * a^n = a^{m+n}$ und $a^m : a^n = a^{m-n}$', '$a^3 * a^2 = (a * a * a) * (a * a) = a^5$ – man zählt die Faktoren zusammen.'],
      ['Potenz einer Potenz', '$(a^m)^n = a^{m * n}$', '$(a^2)^3 = a^2 * a^2 * a^2 = a^6$'],
      ['Gleicher Exponent', '$a^n * b^n = (a * b)^n$', 'Die Faktoren lassen sich paarweise umsortieren (Kommutativgesetz).']],
    ex: ['Warum ist $2^0 = 1$?', '$2^3 = 8$, $2^2 = 4$, $2^1 = 2$: Jedes Mal wird halbiert. Also $2^0 = 1$, $2^{-1} = {1/2}$, $2^{-2} = {1/4}$.'],
    trap: '$a^2 + a^3$ lässt sich nicht zusammenfassen. Potenzgesetze gelten für Mal und Geteilt, nicht für Plus.',
    art: 'Jede Oktave verdoppelt die Frequenz: $110, 220, 440, 880$ Hertz. Ein Halbtonschritt multipliziert sie mit $2^{1/12}$ – zwölf davon ergeben genau den Faktor 2.' });

  mod({ id: '9-wurzel', k: 9, lb: [1], t: 'zahl', icon: 'ⁿ√', name: 'Wurzeln & reelle Zahlen', spell: 'Radix Realis', lp: 4, pre: ['7-potwurz', '9-potenz'],
    idea: 'Der Zahlenturm bekommt sein oberstes Stockwerk: Die reellen Zahlen füllen die Zahlengerade lückenlos – einschließlich aller Wurzeln und der Kreiszahl π.',
    defs: [['$n$-te Wurzel', '$sqrt(a)$ bzw. die $n$-te Wurzel aus $a$ ist die nichtnegative Zahl, deren $n$-te Potenz $a$ ergibt.'],
      ['Irrationale Zahl', 'Eine Zahl, die sich nicht als Bruch schreiben lässt. Ihre Dezimaldarstellung endet nie und wird nie periodisch.'],
      ['Reelle Zahlen ℝ', 'Rationale und irrationale Zahlen zusammen. Jedem Punkt der Zahlengeraden entspricht genau eine reelle Zahl.']],
    rules: [['Wurzeln und Produkte', '$sqrt(a * b) = sqrt(a) * sqrt(b)$, aber $sqrt(a + b) != sqrt(a) + sqrt(b)$', 'Wurzeln sind Potenzen mit dem Exponenten ${1/2}$ – und Potenzgesetze gelten für Produkte, nicht für Summen.'],
      ['Wurzelgleichungen', 'Wurzel isolieren, beide Seiten quadrieren, lösen – und unbedingt die Probe machen.', 'Quadrieren ist keine Äquivalenzumformung: Aus $x = -3$ wird ebenso $x^2 = 9$ wie aus $x = 3$.']],
    ex: ['$sqrt(x + 1) = 5$', 'Quadrieren: $x + 1 = 25$, also $x = 24$. Probe: $sqrt(25) = 5$ ✓'],
    trap: '$sqrt(9 + 16) = sqrt(25) = 5$ – und nicht $3 + 4 = 7$.',
    art: 'Die Wurzelschnecke: Reiht man rechtwinklige Dreiecke mit einer Kathete der Länge 1 aneinander, entstehen nacheinander $sqrt(2)$, $sqrt(3)$, $sqrt(4)$ … – eine wunderschöne Spirale.' });

  mod({ id: '9-quadfkt', k: 9, lb: [1], t: 'fun', icon: 'x²', name: 'Quadratische Funktionen', spell: 'Parabola Vertex', lp: 5, pre: ['8-linear', '8-binom'],
    idea: 'Nach der Geraden kommt die Parabel: die Kurve des geworfenen Balls und des Wasserstrahls. Drei Parameter verschieben, strecken und spiegeln sie.',
    defs: [['Quadratische Funktion', '$f(x) = a * x^2 + b * x + c$ mit $a != 0$. Der Graph heißt Parabel.'],
      ['Scheitelpunkt', 'Der tiefste oder höchste Punkt der Parabel. In der Scheitelpunktform $f(x) = a * (x - d)^2 + e$ liest man ihn ab: $S(d|e)$.']],
    rules: [['Parameter', '$a$ streckt ($|a| > 1$), staucht ($|a| < 1$) oder spiegelt ($a < 0$) die Parabel. $e$ verschiebt sie nach oben oder unten, $d$ nach rechts oder links.', '$(x - d)^2$ wird 0 für $x = d$ – dort liegt jetzt der Scheitel.'],
      ['Symmetrie', 'Jede Parabel ist achsensymmetrisch zur Senkrechten durch ihren Scheitelpunkt.', '$(x - d)^2$ hat denselben Wert, wenn $x$ gleich weit links oder rechts von $d$ liegt.'],
      ['Nullstellen', 'Die Nullstellen sind die Lösungen der quadratischen Gleichung $f(x) = 0$. Es gibt zwei, eine oder keine.', 'Die Parabel schneidet die $x$-Achse zweimal, berührt sie oder verfehlt sie.']],
    ex: ['$f(x) = (x - 2)^2 - 1$', 'Scheitelpunkt $S(2|-1)$, nach oben geöffnet. Nullstellen: $(x - 2)^2 = 1$, also $x = 1$ oder $x = 3$.'],
    trap: '$(x + 3)^2$ verschiebt die Parabel nach links, nicht nach rechts: Der Scheitel liegt bei $x = -3$.',
    art: 'Der Wasserstrahl eines Springbrunnens zeichnet eine Parabel in die Luft. Auch die Seile mancher Hängebrücken folgen annähernd dieser Form.' });

  mod({ id: '9-quadgl', k: 9, lb: [1], t: 'alg', icon: 'x₁,₂', name: 'Quadratische Gleichungen', spell: 'Quadratus Solvo', lp: 5, pre: ['8-binom', '8-gleichung', '9-wurzel'],
    idea: 'Gleichungen mit $x^2$ können zwei Lösungen haben, eine oder keine. Eine einzige Formel entscheidet alle Fälle – und sie entsteht aus der binomischen Formel.',
    defs: [['Normalform', '$x^2 + p * x + q = 0$'],
      ['Diskriminante', '$D = ({p/2})^2 - q$ – der Term unter der Wurzel in der Lösungsformel.']],
    rules: [['Lösungsformel', '$x_{1,2} = -{p/2} +- sqrt(({p/2})^2 - q)$', 'Quadratische Ergänzung: $x^2 + px$ wird mit $({p/2})^2$ zu einem vollständigen Binom $(x + {p/2})^2$ ergänzt – die erste binomische Formel rückwärts.'],
      ['Fallunterscheidung', '$D > 0$: zwei Lösungen. $D = 0$: genau eine Lösung. $D < 0$: keine reelle Lösung.', 'Aus einer positiven Zahl gibt es zwei Zahlen mit diesem Quadrat, aus 0 eine, aus einer negativen keine.'],
      ['Produkt gleich null', 'Ein Produkt ist genau dann 0, wenn mindestens ein Faktor 0 ist: Aus $(x - 2) * (x + 5) = 0$ folgt $x = 2$ oder $x = -5$.', 'Sind beide Faktoren ungleich 0, ist auch ihr Produkt ungleich 0.']],
    ex: ['$x^2 - 2x - 3 = 0$', '$p = -2$, $q = -3$: $x_{1,2} = 1 +- sqrt(1 + 3) = 1 +- 2$, also $x_1 = 3$ und $x_2 = -1$.'],
    trap: '$x^2 = 9$ hat zwei Lösungen: 3 und −3. Wer nur die Wurzel zieht, verliert eine.',
    art: 'Der goldene Schnitt löst die Gleichung $x^2 = x + 1$: $x = {1 + sqrt(5)/2} ≈ 1,618$. Dieses Verhältnis findet man im Pentagramm und in vielen Kunstwerken.' });

  mod({ id: '9-potfkt', k: 9, lb: [1], t: 'fun', icon: 'xⁿ', name: 'Potenzfunktionen', spell: 'Hyperbola Polus', lp: 4, pre: ['9-potenz', '8-funktion'],
    idea: 'Eine ganze Familie von Kurven mit nur einem Parameter: dem Exponenten. Er entscheidet über Symmetrie, Lücken und Verhalten am Rand.',
    defs: [['Potenzfunktion', '$f(x) = x^n$. Für negative $n$ entstehen Hyperbeln, für $n = {1/2}$ die Wurzelfunktion.'],
      ['Polstelle', 'Eine Stelle, an der die Funktion nicht definiert ist und die Funktionswerte ins Unendliche wachsen, z. B. $x = 0$ bei $f(x) = {1/x}$.'],
      ['Asymptote', 'Eine Gerade, der sich der Graph beliebig nähert, ohne sie zu erreichen.']],
    rules: [['Gerade Exponenten', 'Für gerades $n$ ist der Graph achsensymmetrisch zur $y$-Achse.', '$(-x)^n = x^n$, wenn $n$ gerade ist: Minus mal Minus ergibt Plus.'],
      ['Ungerade Exponenten', 'Für ungerades $n$ ist der Graph punktsymmetrisch zum Ursprung.', '$(-x)^n = -x^n$, wenn $n$ ungerade ist.'],
      ['Negative Exponenten', '$f(x) = x^{-n} = {1/x^n}$ hat bei $x = 0$ eine Polstelle; beide Koordinatenachsen sind Asymptoten.', 'Durch 0 kann man nicht teilen; für sehr große $x$ wird der Bruch winzig, aber nie 0.']],
    ex: ['$f(x) = x^{-2}$: Definitionsbereich und $f(2)$?', 'Alle reellen Zahlen außer 0. $f(2) = {1/2^2} = {1/4}$'],
    trap: '$f(x) = {1/x}$ ist die indirekte Proportionalität aus Klasse 6 – jetzt für alle reellen Zahlen außer 0.',
    art: 'Halbiert man die Länge einer Saite, verdoppelt sich ihre Frequenz: Frequenz und Saitenlänge sind indirekt proportional – eine Hyperbel aus Klang.' });

  mod({ id: '9-kreis', k: 9, lb: [2], t: 'geo', icon: 'π', name: 'Kreis, Zylinder & Kugel', spell: 'Circulus Pi', lp: 3, pre: ['7-kreis', '6-prisma'],
    idea: 'Alles Runde gehorcht einer einzigen geheimnisvollen Zahl: π. Sie ist irrational – ihre Ziffern enden nie.',
    defs: [['Kreiszahl π', 'Das Verhältnis von Umfang zu Durchmesser, bei jedem Kreis gleich: $π ≈ 3,14159$.']],
    rules: [['Kreis', 'Umfang $u = 2 * π * r$, Flächeninhalt $A = π * r^2$', 'Zerschneidet man den Kreis in schmale Tortenstücke und legt sie abwechselnd aneinander, entsteht fast ein Rechteck mit den Seiten $π * r$ und $r$.'],
      ['Kreisteile', 'Zum Mittelpunktswinkel $α$ gehört der Anteil ${α/360°}$ von Umfang und Flächeninhalt.', 'Bogenlänge und Sektorfläche sind proportional zum Winkel.'],
      ['Zylinder', '$V = π * r^2 * h$, Mantel $M = 2 * π * r * h$', 'Ein Zylinder ist ein Prisma mit einem Kreis als Grundfläche. Der Mantel ist abgewickelt ein Rechteck.'],
      ['Kugel', '$V = {4/3} * π * r^3$, $O = 4 * π * r^2$', 'Archimedes zeigte: Die Kugel füllt genau zwei Drittel des Zylinders, der sie umhüllt.']],
    ex: ['Kreis mit $r = 5 cm$', '$u = 2 * π * 5 ≈ 31,4 cm$ und $A = π * 25 ≈ 78,5 cm^2$'],
    trap: 'Nicht Radius und Durchmesser verwechseln: $d = 2 * r$.',
    art: 'Seifenblasen sind Kugeln, weil die Kugel bei gegebenem Volumen die kleinste Oberfläche hat. Trommelfelle, Becken und Schallplatten sind Kreise.' });

  mod({ id: '9-pythagoras', k: 9, lb: [3], t: 'geo', icon: 'a²+b²', name: 'Satzgruppe des Pythagoras', spell: 'Hypotenusa Magna', lp: 5, pre: ['6-dreieck', '9-wurzel', '8-aehnlich'],
    idea: 'Der berühmteste Satz der Mathematik verbindet Geometrie und Algebra: Aus Seitenlängen werden Quadrate, aus Quadraten Längen.',
    defs: [['Katheten und Hypotenuse', 'Im rechtwinkligen Dreieck schließen die Katheten den rechten Winkel ein. Die Hypotenuse liegt ihm gegenüber und ist die längste Seite.']],
    rules: [['Satz des Pythagoras', 'Im rechtwinkligen Dreieck gilt $a^2 + b^2 = c^2$ ($c$ ist die Hypotenuse).', 'Vier gleiche rechtwinklige Dreiecke lassen sich auf zwei Arten in ein Quadrat mit der Seite $a + b$ legen: Einmal bleibt $c^2$ frei, einmal $a^2 + b^2$.'],
      ['Umkehrung', 'Gilt in einem Dreieck $a^2 + b^2 = c^2$, dann ist es rechtwinklig. Zusammen: Ein Dreieck ist genau dann rechtwinklig, wenn $a^2 + b^2 = c^2$ gilt.', 'Die Umkehrung muss eigens bewiesen werden – nicht jede Umkehrung eines Satzes ist wahr.'],
      ['Höhensatz und Kathetensatz', '$h^2 = p * q$ sowie $a^2 = c * p$ und $b^2 = c * q$. Dabei teilt die Höhe $h$ die Hypotenuse in die Abschnitte $p$ und $q$.', 'Die Höhe zerlegt das Dreieck in zwei Teildreiecke, die zum ganzen Dreieck ähnlich sind (Klasse 8).']],
    ex: ['Katheten 6 cm und 8 cm. Wie lang ist die Hypotenuse?', '$c^2 = 36 + 64 = 100$, also $c = 10 cm$.'],
    trap: 'Es gilt $a^2 + b^2 = c^2$, nicht $a + b = c$. Und $c$ muss die Hypotenuse sein.',
    art: 'Baumeister steckten rechte Winkel mit einer Schnur mit 12 Knoten ab: ein Dreieck mit den Seiten 3, 4 und 5. Denn $9 + 16 = 25$.' });

  mod({ id: '9-trigo', k: 9, lb: [3], t: 'geo', icon: 'sin', name: 'Sinus, Kosinus, Tangens', spell: 'Sinus Triangulum', lp: 5, pre: ['9-pythagoras', '8-aehnlich'],
    idea: 'Mit Pythagoras findest du Seiten aus Seiten. Die Trigonometrie verbindet endlich Seiten mit Winkeln – das Werkzeug der Landvermesser und Astronomen.',
    defs: [['Sinus', '$sin α = {Gegenkathete/Hypotenuse}$'],
      ['Kosinus', '$cos α = {Ankathete/Hypotenuse}$'],
      ['Tangens', '$tan α = {Gegenkathete/Ankathete}$']],
    rules: [['Nur der Winkel zählt', 'Die Werte von Sinus, Kosinus und Tangens hängen nur vom Winkel ab, nicht von der Größe des Dreiecks.', 'Alle rechtwinkligen Dreiecke mit demselben Winkel $α$ sind ähnlich – ihre Seitenverhältnisse stimmen überein (Klasse 8).'],
      ['Besondere Werte', '$sin 30° = {1/2}$, $sin 45° = {sqrt(2)/2}$, $sin 60° = {sqrt(3)/2}$, $sin 90° = 1$. Außerdem $cos α = sin (90° - α)$.', 'Das halbe gleichseitige Dreieck liefert 30° und 60°, das halbe Quadrat 45°.'],
      ['Trigonometrischer Pythagoras', '$(sin α)^2 + (cos α)^2 = 1$', 'Teile $a^2 + b^2 = c^2$ durch $c^2$.'],
      ['Pyramide und Kegel', '$V = {1/3} * A_G * h$, für den Kegel also $V = {1/3} * π * r^2 * h$', 'Der Kegel ist eine Pyramide mit einem Kreis als Grundfläche.']],
    ex: ['Hypotenuse 10 cm, $α = 30°$. Wie lang ist die Gegenkathete?', '$a = 10 * sin 30° = 10 * {1/2} = 5 cm$'],
    trap: 'Gegenkathete und Ankathete hängen vom betrachteten Winkel ab – erst den Winkel markieren, dann zuordnen.',
    art: 'Mit einem Winkelmesser und dem Tangens lässt sich die Höhe eines Kirchturms vom Boden aus bestimmen – so vermaß man früher ganze Länder.' });

  mod({ id: '9-statistik', k: 9, lb: [4], t: 'sto', icon: 'σ', name: 'Daten auswerten', spell: 'Medianus Verus', lp: 3, pre: ['7-daten', '5-mittel'],
    idea: 'Ein Mittelwert allein kann täuschen. Erst zusammen mit einem Maß für die Streuung erzählen Daten die ganze Wahrheit.',
    defs: [['Modalwert', 'Der Wert, der am häufigsten vorkommt.'],
      ['Median', 'Der mittlere Wert der geordneten Liste. Bei gerader Anzahl: das arithmetische Mittel der beiden mittleren Werte.'],
      ['Spannweite, Varianz, Standardabweichung', 'Spannweite: größter minus kleinster Wert. Varianz $s^2$: Mittelwert der quadrierten Abweichungen vom arithmetischen Mittel. Standardabweichung $s$: Wurzel aus der Varianz.']],
    rules: [['Ausreißer', 'Der Median ist unempfindlich gegen Ausreißer, das arithmetische Mittel nicht.', 'Der Median schaut nur auf die Reihenfolge; das Mittel rechnet mit jedem Wert.'],
      ['Skalen', 'Bei Namen und Kategorien ist nur der Modalwert sinnvoll, bei Rangfolgen auch der Median, bei Messwerten zusätzlich das arithmetische Mittel.', 'Mit Lieblingsfarben kann man nicht rechnen.'],
      ['Manipulation erkennen', 'Abgeschnittene Achsen, unpassende Vergleichsgrößen und vorsortierte Stichproben verzerren den Eindruck.', 'Ein Diagramm zeigt immer nur, was jemand ausgewählt hat.']],
    ex: ['Daten: 2, 3, 3, 5, 12', 'Modalwert 3, Median 3, arithmetisches Mittel $25 : 5 = 5$, Spannweite 10. Der Ausreißer 12 zieht das Mittel nach oben.'],
    trap: 'Vor dem Median immer erst der Größe nach ordnen.',
    art: 'Ein Orchester stimmt auf den Kammerton a′. Die Standardabweichung wäre ein Maß dafür, wie sauber alle zusammen stimmen.' });

  mod({ id: '9-beweis', k: 9, lb: [1, 3], t: 'log', icon: '↯', name: 'Indirekter Beweis', spell: 'Reductio Absurdum', lp: 3, pre: ['8-logik', '9-wurzel'],
    idea: 'Manchmal kommt man nicht geradeaus ans Ziel. Dann nimmt man das Gegenteil an – und zeigt, dass es in einen Widerspruch führt. Ein Beweis wie ein Krimi.',
    defs: [['Indirekter Beweis', 'Man nimmt an, die Behauptung sei falsch, und folgert daraus einen Widerspruch. Also muss die Behauptung wahr sein.'],
      ['Genau dann, wenn', 'Ein Satz und seine Umkehrung gelten beide. Beispiel: Ein Dreieck ist genau dann rechtwinklig, wenn $a^2 + b^2 = c^2$ gilt.']],
    rules: [['$sqrt(2)$ ist irrational', 'Es gibt keinen Bruch, dessen Quadrat 2 ist.', 'Angenommen, $sqrt(2) = {p/q}$ mit vollständig gekürztem Bruch. Dann ist $p^2 = 2 * q^2$, also $p$ gerade: $p = 2k$. Einsetzen: $4k^2 = 2q^2$, also $q^2 = 2k^2$ – auch $q$ ist gerade. Dann ließe sich der Bruch aber durch 2 kürzen. Widerspruch!'],
      ['Zahlbereiche', '$ℕ ⊂ ℤ ⊂ ℚ ⊂ ℝ$', 'Jede Erweiterung behält die alten Zahlen und Rechengesetze und schließt eine Lücke.']],
    ex: ['Wie beginnt ein indirekter Beweis für „Es gibt keine größte natürliche Zahl“?', 'Annahme: Es gibt eine größte natürliche Zahl $n$. Dann ist aber $n + 1$ eine noch größere natürliche Zahl – Widerspruch.'],
    trap: 'Ein Widerspruch widerlegt nur die Annahme – deshalb muss die Annahme genau das Gegenteil der Behauptung sein.',
    art: 'Die Pythagoreer glaubten, alles sei durch Verhältnisse ganzer Zahlen beschreibbar – wie die Intervalle der Musik. Die Entdeckung von $sqrt(2)$ erschütterte ihr Weltbild.' });

  /* ======================= KLASSE 10 ======================= */
  mod({ id: '10-expo', k: 10, lb: [1], t: 'fun', icon: 'aˣ', name: 'Exponentielles Wachstum', spell: 'Exponentia Cresco', lp: 4, pre: ['9-potenz', '7-prozent'],
    idea: 'Lineares Wachstum addiert in jedem Schritt dasselbe, exponentielles multipliziert mit demselben Faktor. Am Anfang unscheinbar – dann überholt es alles.',
    defs: [['Exponentialfunktion', '$f(x) = a^x$ mit $a > 0$ und $a != 1$. Die Variable steht im Exponenten.'],
      ['Rekursiv und explizit', 'Rekursiv: $B(n + 1) = B(n) * q$ (vom Vorgänger zum Nachfolger). Explizit: $B(n) = B(0) * q^n$ (direkt zum $n$-ten Wert).'],
      ['Eulersche Zahl', '$e ≈ 2,718$ – die natürliche Basis für Wachstum.']],
    rules: [['Eigenschaften', 'Der Graph von $f(x) = a^x$ geht durch $(0|1)$, verläuft ganz oberhalb der $x$-Achse und hat sie als Asymptote. Für $a > 1$ steigt er, für $0 < a < 1$ fällt er.', '$a^0 = 1$, und eine positive Zahl bleibt beim Potenzieren positiv.'],
      ['Wachstumsfaktor', 'Wächst etwas pro Schritt um $p %$, ist der Faktor $q = 1 + {p/100}$; nimmt es um $p %$ ab, ist $q = 1 - {p/100}$.', 'Prozentrechnung aus Klasse 7: „um 5 % mehr“ heißt „mal 1,05“.'],
      ['Verdopplungs- und Halbwertszeit', 'Bei exponentiellem Wachstum ist die Zeit bis zur Verdopplung immer gleich lang; beim Zerfall die Zeit bis zur Halbierung.', 'In gleichen Zeitspannen wird immer mit demselben Faktor multipliziert.']],
    ex: ['500 Bakterien verdoppeln sich jede Stunde. Wie viele sind es nach 5 Stunden?', '$B(5) = 500 * 2^5 = 500 * 32 = 16 000$'],
    trap: 'Bei $x^2$ steht die Variable in der Basis, bei $2^x$ im Exponenten – zwei völlig verschiedene Funktionen.',
    art: 'Die Bünde einer Gitarre rücken zum Korpus hin immer enger zusammen: Jeder Bund verkürzt die Saite um denselben Faktor – exponentieller Zerfall zum Anfassen.' });

  mod({ id: '10-sinus', k: 10, lb: [1], t: 'fun', icon: '∿', name: 'Sinusfunktion', spell: 'Unda Sinus', lp: 4, pre: ['9-trigo', '8-funktion'],
    idea: 'Der Sinus verlässt das Dreieck und wird zur Welle. Alles, was sich wiederholt – Töne, Gezeiten, Jahreszeiten – lässt sich mit ihm beschreiben.',
    defs: [['Bogenmaß', 'Der Winkel wird als Bogenlänge am Einheitskreis gemessen: $360° = 2π$, $180° = π$, $90° = {π/2}$.'],
      ['Periode', 'Die kleinste Länge, nach der sich die Funktionswerte wiederholen. Bei $sin x$ ist sie $2π$.'],
      ['Amplitude', 'Der größte Ausschlag nach oben oder unten.']],
    rules: [['Eigenschaften von $sin x$', 'Wertebereich $-1 <= y <= 1$, Nullstellen bei allen Vielfachen von $π$, punktsymmetrisch zum Ursprung.', 'Der Sinus ist die Höhe eines Punktes, der auf dem Einheitskreis umläuft.'],
      ['Parameter', '$f(x) = a * sin(b * x)$ hat die Amplitude $|a|$ und die Periode ${2π/b}$. $sin(x) + d$ verschiebt nach oben, $sin(x + c)$ nach links.', 'Der Faktor $b$ lässt die Zeit schneller laufen: Die Welle wird zusammengedrückt.']],
    ex: ['$f(x) = 3 * sin(2x)$', 'Amplitude 3, Periode ${2π/2} = π$.'],
    trap: 'Taschenrechner auf den richtigen Modus stellen: Gradmaß (DEG) oder Bogenmaß (RAD).',
    art: 'Ein reiner Ton ist eine Sinuswelle. Die Amplitude bestimmt die Lautstärke, die Frequenz die Tonhöhe: Der Kammerton a′ schwingt 440-mal pro Sekunde.' });

  mod({ id: '10-zufallsgr', k: 10, lb: [2], t: 'sto', icon: 'E(X)', name: 'Zufallsgrößen & Erwartungswert', spell: 'Exspecto Valorem', lp: 4, pre: ['8-baum', '9-statistik'],
    idea: 'Was kann man bei einem Glücksspiel auf lange Sicht erwarten? Der Erwartungswert ist der Mittelwert, den der Zufall bei sehr vielen Wiederholungen ansteuert.',
    defs: [['Zufallsgröße', 'Ordnet jedem Ergebnis eines Zufallsversuchs eine Zahl zu, z. B. den Gewinn.'],
      ['Wahrscheinlichkeitsverteilung', 'Eine Tabelle, die jedem Wert der Zufallsgröße seine Wahrscheinlichkeit zuordnet. Die Summe aller Wahrscheinlichkeiten ist 1.'],
      ['Erwartungswert', '$E(X) = x_1 * p_1 + x_2 * p_2 + ... + x_n * p_n$']],
    rules: [['Erwartungswert und Mittelwert', 'Bei vielen Wiederholungen liegt das arithmetische Mittel der Ergebnisse nahe am Erwartungswert.', 'Die relativen Häufigkeiten nähern sich den Wahrscheinlichkeiten (Klasse 8) – und der Mittelwert ist die mit den Häufigkeiten gewichtete Summe.'],
      ['Faires Spiel', 'Ein Spiel ist fair, wenn der Erwartungswert des Gewinns 0 ist – der Einsatz also der erwarteten Auszahlung entspricht.', 'Auf lange Sicht gewinnt dann keiner der beiden Spieler.'],
      ['Mindestens einmal', '$P$(mindestens ein Treffer) $= 1 - P$(kein Treffer)', 'Das Gegenereignis zu „mindestens einer“ ist „keiner“ – und das ist ein einziger Pfad.']],
    ex: ['Erwartungswert der Augenzahl beim Würfeln', '$E(X) = (1 + 2 + 3 + 4 + 5 + 6) * {1/6} = 3,5$'],
    trap: 'Der Erwartungswert muss kein mögliches Ergebnis sein: 3,5 kann man nicht würfeln.',
    art: 'Komponisten wie John Cage ließen den Zufall mitkomponieren. Mit Wahrscheinlichkeiten lässt sich steuern, wie ein solches Stück „im Mittel“ klingt.' });

  mod({ id: '10-sinsatz', k: 10, lb: [3], t: 'geo', icon: '△', name: 'Sinussatz & Kosinussatz', spell: 'Trigonum Generale', lp: 4, pre: ['9-trigo', '9-pythagoras'],
    idea: 'Pythagoras und Sinus brauchten bisher einen rechten Winkel. Jetzt fällt diese Fessel: Mit zwei neuen Sätzen berechnest du jedes Dreieck.',
    defs: [['Bezeichnungen', 'Der Seite $a$ liegt der Winkel $α$ gegenüber, $b$ der Winkel $β$, $c$ der Winkel $γ$.']],
    rules: [['Sinussatz', '${a/sin α} = {b/sin β} = {c/sin γ}$', 'Die Höhe auf $c$ lässt sich auf zwei Arten ausdrücken: $h = b * sin α$ und $h = a * sin β$. Gleichsetzen liefert den Satz.'],
      ['Kosinussatz', '$c^2 = a^2 + b^2 - 2 * a * b * cos γ$', 'Für $γ = 90°$ ist $cos γ = 0$ – übrig bleibt der Satz des Pythagoras. Der Kosinussatz ist seine Verallgemeinerung.'],
      ['Flächeninhalt', '$A = {1/2} * a * b * sin γ$', 'Die Höhe auf $a$ ist $b * sin γ$ – eingesetzt in $A = {1/2} * g * h$ aus Klasse 6.']],
    ex: ['$a = 5$, $b = 8$, $γ = 60°$. Wie lang ist $c$?', '$c^2 = 25 + 64 - 2 * 5 * 8 * {1/2} = 49$, also $c = 7$.'],
    trap: 'Kosinussatz bei zwei Seiten und dem eingeschlossenen Winkel oder bei drei Seiten; Sinussatz, wenn ein Paar aus Seite und Gegenwinkel bekannt ist.',
    art: 'Sternbilder vermessen, Bühnenbilder konstruieren, Dachsparren zuschneiden: Überall stecken schiefe Dreiecke.' });

  mod({ id: '10-log', k: 10, lb: [4], t: 'alg', icon: 'log', name: 'Logarithmen', spell: 'Logarithmus Inverso', lp: 4, pre: ['9-potenz', '10-expo'],
    idea: 'Der Logarithmus beantwortet die Frage: „Hoch wie viel?“ Er ist die Umkehrung des Potenzierens – und macht aus Malrechnen Plusrechnen.',
    defs: [['Logarithmus', '$log_a b$ ist die Zahl $x$, für die $a^x = b$ gilt. Beispiel: $log_2 8 = 3$, denn $2^3 = 8$.'],
      ['Besondere Logarithmen', '$lg$ ist der Logarithmus zur Basis 10, $ln$ der zur Basis $e$.']],
    rules: [['Logarithmengesetze', '$log (u * v) = log u + log v$, $log {u/v} = log u - log v$, $log u^r = r * log u$', 'Es sind die Potenzgesetze aus Klasse 9, rückwärts gelesen: Beim Multiplizieren von Potenzen addieren sich die Exponenten.'],
      ['Exponentialgleichungen', '$a^x = b$ hat die Lösung $x = {lg b/lg a}$.', 'Logarithmieren auf beiden Seiten: $x * lg a = lg b$.']],
    ex: ['$3^x = 81$', '$81 = 3^4$, also $x = 4$. Oder: $x = {lg 81/lg 3} = 4$.'],
    trap: '$log (u + v)$ lässt sich nicht vereinfachen. Die Gesetze gelten für Produkte, Quotienten und Potenzen.',
    art: 'Unser Gehör arbeitet logarithmisch: Gleiche Tonabstände bedeuten gleiche Frequenzverhältnisse. Auch die Lautstärke in Dezibel ist eine logarithmische Skala.' });

  mod({ id: '10-umkehr', k: 10, lb: [4], t: 'fun', icon: 'f⁻¹', name: 'Umkehrfunktion & Verkettung', spell: 'Functio Reversa', lp: 4, pre: ['10-log', '9-quadfkt'],
    idea: 'Manche Funktionen lassen sich rückwärts abspielen, andere nicht. Und wie Bausteine kann man Funktionen hintereinanderschalten.',
    defs: [['Umkehrfunktion', '$f^{-1}$ macht rückgängig, was $f$ tut: Aus $y = f(x)$ gewinnt man wieder $x$.'],
      ['Verkettung', 'Zwei Funktionen werden nacheinander ausgeführt: erst die innere, dann die äußere, z. B. $f(g(x))$.']],
    rules: [['Wann umkehrbar?', 'Eine Funktion ist umkehrbar, wenn sie eineindeutig ist – wenn also zu jedem $y$ nur ein $x$ gehört.', 'Sonst wüsste man beim Rückwärtsgehen nicht, zu welchem $x$ man zurück soll. (Eineindeutig: Klasse 6.)'],
      ['Graph der Umkehrfunktion', 'Man erhält ihn durch Spiegelung an der Geraden $y = x$.', 'Beim Umkehren tauschen $x$ und $y$ die Rollen.'],
      ['Berühmte Paare', '$y = x^2$ (für $x >= 0$) und $y = sqrt(x)$; $y = e^x$ und $y = ln x$.', 'Jede macht die andere rückgängig: $ln(e^x) = x$.'],
      ['Tangens', '$tan x = {sin x/cos x}$', 'Im rechtwinkligen Dreieck: Gegenkathete durch Ankathete – Hypotenuse kürzt sich.']],
    ex: ['Umkehrfunktion von $f(x) = 2x + 3$', '$y = 2x + 3$ nach $x$ auflösen: $x = {y - 3/2}$. Also $f^{-1}(x) = {x - 3/2}$.'],
    trap: '$f^{-1}(x)$ ist nicht ${1/f(x)}$. Die $-1$ ist hier kein Exponent, sondern steht für „umgekehrt“.',
    art: 'Ein Krebskanon spielt eine Melodie vorwärts und rückwärts zugleich – Bach hat solche Stücke geschrieben.' });

  mod({ id: '10-galerie', k: 10, lb: [4], t: 'fun', icon: 'ƒ', name: 'Galerie der Funktionen', spell: 'Galeria Functionum', lp: 4, pre: ['9-potfkt', '10-expo', '10-sinus'],
    idea: 'Sieben Grundfunktionen solltest du so gut kennen wie die Gesichter deiner Freunde – Verlauf, Eigenschaften, Besonderheiten.',
    defs: [['Die sieben Grundfunktionen', '$y = x$, $y = x^2$, $y = sqrt(x)$, $y = {1/x}$, $y = ln x$, $y = e^x$, $y = sin x$']],
    rules: [['Definitionsbereiche', '$sqrt(x)$ nur für $x >= 0$; $ln x$ nur für $x > 0$; ${1/x}$ für alle $x != 0$; die übrigen für alle reellen Zahlen.', 'Aus negativen Zahlen kann man keine Quadratwurzel ziehen, durch 0 nicht teilen, und $e^x$ wird nie 0 oder negativ.'],
      ['Wertebereiche', '$x^2 >= 0$; $sqrt(x) >= 0$; $e^x > 0$; $-1 <= sin x <= 1$; ${1/x} != 0$; $x$ und $ln x$ nehmen alle reellen Werte an.', 'Man liest sie am Graphen ab: Welche Höhen werden erreicht?'],
      ['Symmetrie', '$x^2$ ist achsensymmetrisch zur $y$-Achse; $x$, ${1/x}$ und $sin x$ sind punktsymmetrisch zum Ursprung.', 'Achsensymmetrie: $f(-x) = f(x)$. Punktsymmetrie: $f(-x) = -f(x)$.']],
    ex: ['Welche der sieben Funktionen hat keine Nullstelle?', '$y = e^x$ und $y = {1/x}$: Beide werden nie 0.'],
    trap: '$ln x$ und $sqrt(x)$ wachsen beide immer langsamer – aber $ln x$ ist für $x$ zwischen 0 und 1 negativ, $sqrt(x)$ nie.',
    art: 'Jede Kurve hat einen Charakter: die ruhige Gerade, die schwungvolle Parabel, die atmende Sinuswelle. Im Atelier kannst du mit ihnen malen.' });

  mod({ id: '10-folgen', k: 10, lb: [4], t: 'fun', icon: 'aₙ', name: 'Zahlenfolgen & Grenzwert', spell: 'Sequentia Limes', lp: 4, pre: ['8-linear', '10-expo'],
    idea: 'Eine Folge ist eine Funktion, die nur natürliche Zahlen frisst. Manche Folgen streben einem Wert zu, den sie nie erreichen – der Grenzwert, die Tür zur Analysis.',
    defs: [['Zahlenfolge', 'Jeder natürlichen Zahl $n$ wird ein Folgenglied $a_n$ zugeordnet.'],
      ['Arithmetische Folge', 'Die Differenz benachbarter Glieder ist konstant: $a_n = a_1 + (n - 1) * d$'],
      ['Geometrische Folge', 'Der Quotient benachbarter Glieder ist konstant: $a_n = a_1 * q^{n-1}$'],
      ['Grenzwert', 'Die Zahl, der sich die Folgenglieder beliebig nähern.']],
    rules: [['Verwandtschaft', 'Arithmetische Folgen sind lineare Funktionen auf ℕ, geometrische Folgen sind Exponentialfunktionen auf ℕ.', 'Konstante Differenz heißt konstanter Anstieg; konstanter Quotient heißt konstanter Wachstumsfaktor.'],
      ['Nullfolgen', 'Die Folgen ${1/n}$ und $q^n$ mit $|q| < 1$ haben den Grenzwert 0.', 'Die Glieder werden kleiner als jede noch so kleine positive Zahl – man muss nur weit genug gehen.']],
    ex: ['$a_n = {2n + 1/n}$', '$a_n = 2 + {1/n}$. Da ${1/n}$ gegen 0 geht, ist der Grenzwert 2.'],
    trap: 'Den Grenzwert muss die Folge nie erreichen: ${1/n}$ wird nie 0.',
    art: 'Halbiert man eine Saite immer wieder, steigt der Ton jedes Mal um eine Oktave. Die Saitenlängen $1, {1/2}, {1/4}, {1/8}, ...$ bilden eine geometrische Folge mit dem Grenzwert 0.' });

  mod({ id: '10-zins', k: 10, lb: [5], t: 'zahl', icon: '€', name: 'Zinsen & Zinseszins', spell: 'Usura Composita', lp: 2, pre: ['7-prozent', '10-expo'],
    idea: 'Geld, das Zinsen trägt, wächst exponentiell – Schulden leider auch. Wer das versteht, trifft bessere Entscheidungen.',
    defs: [['Kapital, Zinssatz, Zinsen', 'Kapital $K$: der angelegte Betrag. Zinssatz $p %$: der Prozentsatz pro Jahr. Zinsen $Z$: der Ertrag.']],
    rules: [['Jahreszinsen', '$Z = K * {p/100}$', 'Zinsrechnung ist Prozentrechnung mit Geld (Klasse 7).'],
      ['Zinseszins', '$K_n = K_0 * (1 + {p/100})^n$', 'Jedes Jahr wird das ganze bisherige Kapital mit demselben Faktor multipliziert – eine geometrische Folge.'],
      ['Kredit und Tilgung', 'Restschuld nach einem Jahr = Schuld + Zinsen − Rate.', 'Erst kommen die Zinsen dazu, dann wird die Rate abgezogen.']],
    ex: ['1000 € werden zu 3 % für 2 Jahre angelegt.', '$1000 * 1,03^2 = 1060,90$ €'],
    trap: 'Mit Zinseszins wächst das Kapital schneller als bei einfacher Verzinsung – der Unterschied wird mit den Jahren immer größer.',
    art: 'Auch der Wert eines Kunstwerks wird oft in Prozent pro Jahr angegeben. 7 % pro Jahr verdoppeln einen Wert in etwa zehn Jahren.' });

  mod({ id: '10-modell', k: 10, lb: [1, 4], t: 'log', icon: '✦', name: 'Schlussstein: Modelle wählen', spell: 'Modellum Mundi', lp: 3, pre: ['10-galerie', '8-lgs'],
    idea: 'Der Schlussstein hält ein Gewölbe zusammen. Hier fügst du alles zusammen: Welche Funktion passt zu welcher Situation? Das ist mathematisches Modellieren.',
    defs: [['Modell', 'Eine vereinfachte mathematische Beschreibung der Wirklichkeit. Jedes Modell hat Grenzen.']],
    rules: [['Muster erkennen', 'Konstante Differenzen: linear. Konstante Quotienten: exponentiell. Konstantes Produkt: indirekt proportional. Wiederholung: periodisch. Konstante zweite Differenzen: quadratisch.', 'Jede Funktionenfamilie hat ihren eigenen Fingerabdruck in der Wertetabelle.'],
      ['Modellkritik', 'Kein Wachstum geht ewig exponentiell weiter – irgendwann fehlen Platz oder Nahrung. Dann passt beschränktes Wachstum besser.', 'Ein Modell gilt nur in dem Bereich, für den es gemacht wurde.']],
    ex: ['Wertetabelle: 3, 6, 12, 24, 48', 'Der Quotient ist immer 2: exponentielles Wachstum, $f(n) = 3 * 2^n$.'],
    trap: 'Zwei Messpunkte passen zu jeder Funktionenfamilie. Erst weitere Daten zeigen, welches Modell trägt.',
    art: 'Ein Bild ist ein Modell der Wirklichkeit, eine Partitur ein Modell des Klangs. Auch Kunst vereinfacht, um Wesentliches sichtbar zu machen.' });

  /* ======================= KLASSE 11/12 ======================= */
  mod({ id: '11-grenz', k: 11, lb: [1], t: 'fun', icon: 'lim', name: 'Grenzwerte von Funktionen', spell: 'Limes Infinitum', lp: 3, pre: ['10-folgen', '9-potfkt'],
    idea: 'Was tut eine Funktion ganz weit draußen – oder ganz nah an einer verbotenen Stelle? Der Grenzwert macht das Unendliche handhabbar.',
    defs: [['Grenzwert im Unendlichen', '$lim_{x->∞} f(x) = g$: Für immer größere $x$ nähern sich die Funktionswerte beliebig der Zahl $g$.'],
      ['Stetigkeit', 'Anschaulich: Der Graph lässt sich ohne Absetzen zeichnen.']],
    rules: [['Grundgrenzwert', '$lim_{x->∞} {1/x} = 0$', 'Der Kehrwert einer riesigen Zahl ist winzig.'],
      ['Gebrochenrationale Funktionen', 'Gleicher Grad in Zähler und Nenner: Grenzwert ist der Quotient der führenden Koeffizienten. Zählergrad kleiner: Grenzwert 0.', 'Man klammert die höchste Potenz aus; alle übrigen Summanden gehen gegen 0.'],
      ['Grenzwertsätze', 'Der Grenzwert einer Summe ist die Summe der Grenzwerte; ebenso bei Produkt und Quotient (Nenner nicht 0).', 'Was sich einzeln annähert, nähert sich auch gemeinsam an.']],
    ex: ['$lim_{x->∞} {3x^2 + 1/x^2 - 5}$', 'Mit $x^2$ kürzen: ${3 + {1/x^2}/1 - {5/x^2}}$ geht gegen ${3/1} = 3$.'],
    trap: '„Unendlich“ ist keine Zahl, mit der man rechnen darf wie mit 5.',
    art: 'Der Fluchtpunkt einer perspektivischen Zeichnung ist ein Grenzwert: Die Schienen kommen ihm immer näher und erreichen ihn nie.' });

  mod({ id: '11-ableitung', k: 11, lb: [1], t: 'fun', icon: 'f′', name: 'Ableitung', spell: 'Derivatio Tangens', lp: 6, pre: ['8-linear', '11-grenz'],
    idea: 'Wie steil ist eine Kurve in einem einzigen Punkt? Aus dem Anstieg der Geraden (Klasse 8) und dem Grenzwert entsteht die Ableitung – die Idee von Leibniz und Newton.',
    defs: [['Differenzenquotient', '${f(x_0 + h) - f(x_0)/h}$: der Anstieg der Sekante, die mittlere Änderungsrate.'],
      ['Ableitung', '$f′(x_0)$ ist der Grenzwert des Differenzenquotienten für $h -> 0$: der Anstieg der Tangente, die lokale Änderungsrate.']],
    rules: [['Potenzregel', '$(x^n)′ = n * x^{n-1}$', 'Für $x^2$: ${(x + h)^2 - x^2/h} = {2xh + h^2/h} = 2x + h$, und das geht für $h -> 0$ gegen $2x$ – die erste binomische Formel aus Klasse 8.'],
      ['Faktor- und Summenregel', '$(c * f)′ = c * f′$ und $(f + g)′ = f′ + g′$', 'Grenzwertsätze: Faktoren und Summen bleiben beim Grenzübergang erhalten.'],
      ['Besondere Ableitungen', '$(e^x)′ = e^x$, $(sin x)′ = cos x$, $(ln x)′ = {1/x}$', '$e^x$ ist die Funktion, die ihre eigene Ableitung ist.'],
      ['Produkt- und Kettenregel', '$(u * v)′ = u′ * v + u * v′$ und $(u(v(x)))′ = u′(v(x)) * v′(x)$', '„Äußere Ableitung mal innere Ableitung.“']],
    ex: ['$f(x) = 3x^2 - 4x + 1$', '$f′(x) = 6x - 4$'],
    trap: 'Die Ableitung einer Konstanten ist 0 – eine waagerechte Gerade hat keinen Anstieg.',
    art: 'Ein Glissando auf der Geige: Die Ableitung der Tonhöhe sagt, wie schnell der Ton gerade steigt.' });

  mod({ id: '11-kurven', k: 11, lb: [1], t: 'fun', icon: '⌒', name: 'Kurven untersuchen', spell: 'Curva Extrema', lp: 5, pre: ['11-ableitung', '9-quadgl'],
    idea: 'Die Ableitung verrät alles über eine Kurve: wo sie steigt, wo sie gipfelt, wo sie ihre Krümmung wechselt. Damit findet man das Beste – größte Fläche, kleinste Kosten.',
    defs: [['Lokales Extremum', 'Ein Hochpunkt oder Tiefpunkt: In der Umgebung gibt es keinen größeren bzw. kleineren Funktionswert.'],
      ['Wendepunkt', 'Ein Punkt, an dem der Graph von einer Links- in eine Rechtskurve wechselt oder umgekehrt.']],
    rules: [['Monotonie', '$f′(x) > 0$: $f$ steigt. $f′(x) < 0$: $f$ fällt.', 'Die Ableitung ist der Anstieg der Tangente.'],
      ['Extremstellen', 'Notwendig: $f′(x_0) = 0$. Hinreichend: zusätzlich $f″(x_0) != 0$. Bei $f″(x_0) < 0$ liegt ein Hochpunkt vor, bei $f″(x_0) > 0$ ein Tiefpunkt.', 'Im Gipfel ist die Tangente waagerecht; die zweite Ableitung sagt, ob die Kurve dort nach unten oder oben gekrümmt ist.'],
      ['Wendestellen', 'Notwendig: $f″(x_0) = 0$. Hinreichend: zusätzlich $f‴(x_0) != 0$.', 'Am Wendepunkt ist der Anstieg selbst extremal.']],
    ex: ['$f(x) = x^3 - 3x$', '$f′(x) = 3x^2 - 3 = 0$ ergibt $x = 1$ oder $x = -1$. $f″(x) = 6x$: Tiefpunkt $T(1|-2)$, Hochpunkt $H(-1|2)$.'],
    trap: '$f′(x_0) = 0$ allein genügt nicht: Bei $f(x) = x^3$ ist $f′(0) = 0$, aber dort liegt kein Extremum.',
    art: 'Der Spannungsbogen eines Musikstücks hat Höhepunkte und Wendepunkte – Komponisten gestalten Kurven aus Lautstärke und Dichte.' });

  mod({ id: '11-integral', k: 11, lb: [5], t: 'fun', icon: '∫', name: 'Integralrechnung', spell: 'Integralis Summa', lp: 5, pre: ['11-ableitung', '6-viereck'],
    idea: 'Die Flächenformeln aus Klasse 6 enden bei geraden Rändern. Das Integral misst Flächen unter beliebigen Kurven – und entpuppt sich als Umkehrung des Ableitens.',
    defs: [['Stammfunktion', '$F$ ist eine Stammfunktion von $f$, wenn $F′ = f$ gilt.'],
      ['Bestimmtes Integral', '$int(a,b) f(x) dx$ ist der orientierte Flächeninhalt zwischen Graph und $x$-Achse von $a$ bis $b$ – oder der aus Änderungsraten rekonstruierte Bestand.']],
    rules: [['Potenzregel', 'Eine Stammfunktion von $x^n$ ist ${x^{n+1}/n + 1}$ (für $n != -1$).', 'Ableiten zur Probe: Der Exponent $n + 1$ kommt nach vorn und kürzt sich mit dem Nenner.'],
      ['Hauptsatz', '$int(a,b) f(x) dx = F(b) - F(a)$', 'Die Fläche bis zur Stelle $x$ wächst genau mit der Rate $f(x)$ – also ist die Flächenfunktion eine Stammfunktion von $f$.'],
      ['Weitere Stammfunktionen', '$e^x$ zu $e^x$, $-cos x$ zu $sin x$, $ln x$ zu ${1/x}$ (für $x > 0$).', 'Jeweils die Ableitungsregeln rückwärts gelesen.']],
    ex: ['$int(0,2) x^2 dx$', '$F(x) = {x^3/3}$. $F(2) - F(0) = {8/3} - 0 = {8/3}$'],
    trap: 'Flächen unterhalb der $x$-Achse zählt das Integral negativ. Für den Flächeninhalt muss man an den Nullstellen aufteilen.',
    art: 'Riemann näherte Flächen mit immer schmaleren Rechtecken an – wie ein Mosaik, das mit kleineren Steinen immer genauer wird.' });

  mod({ id: '11-matrix', k: 11, lb: [2], t: 'alg', icon: '[ ]', name: 'Matrizen', spell: 'Matrix Gauss', lp: 2, pre: ['8-lgs'],
    idea: 'Ein Gleichungssystem mit vielen Unbekannten wird übersichtlich, wenn man nur noch die Zahlen in ein Rechteck schreibt. So beginnt die Lineare Algebra.',
    defs: [['Matrix', 'Ein rechteckiges Zahlenschema mit Zeilen und Spalten.'],
      ['Matrixschreibweise', 'Ein lineares Gleichungssystem wird zu $A * x = b$.']],
    rules: [['Matrix mal Vektor', 'Zeile mal Spalte: Die Einträge einer Zeile werden mit den Einträgen des Vektors multipliziert und addiert.', 'Genau so entsteht die linke Seite jeder Gleichung des Systems.'],
      ['Nicht vertauschbar', 'Im Allgemeinen ist $A * B != B * A$.', 'Erst drehen, dann spiegeln ergibt etwas anderes als erst spiegeln, dann drehen.'],
      ['Gauß-Verfahren', 'Durch Vervielfachen und Addieren von Zeilen bringt man das System auf Dreiecksform und löst es von unten nach oben.', 'Es ist das Additionsverfahren aus Klasse 8, systematisch angewendet.']],
    ex: ['Matrix mit den Zeilen $(1; 2)$ und $(3; 4)$, mal Vektor $vec(1;1)$', 'Erste Zeile: $1 * 1 + 2 * 1 = 3$. Zweite Zeile: $3 * 1 + 4 * 1 = 7$. Ergebnis: $vec(3;7)$'],
    trap: 'Zwei Matrizen lassen sich nur multiplizieren, wenn die Spaltenzahl der ersten gleich der Zeilenzahl der zweiten ist.',
    art: 'Jedes digitale Bild ist eine Matrix aus Helligkeitswerten. Drehen, Spiegeln und Verzerren sind Matrizenmultiplikationen.' });

  mod({ id: '11-vektor', k: 11, lb: [3], t: 'geo', icon: '→', name: 'Vektoren & Geraden', spell: 'Vector Directus', lp: 5, pre: ['5-koord', '9-pythagoras'],
    idea: 'Das Koordinatensystem aus Klasse 5 bekommt eine dritte Achse. Vektoren sind Pfeile: Sie haben eine Richtung und eine Länge – und man kann mit ihnen rechnen.',
    defs: [['Vektor', 'Eine Verschiebung im Raum, angegeben durch drei Koordinaten.'],
      ['Verbindungsvektor', 'Der Vektor von $A$ nach $B$: Koordinaten von $B$ minus Koordinaten von $A$.']],
    rules: [['Rechnen mit Vektoren', 'Addition, Subtraktion und Vervielfachen geschehen koordinatenweise.', 'Zwei Verschiebungen nacheinander ergeben eine Gesamtverschiebung.'],
      ['Betrag', 'Die Länge des Vektors mit den Koordinaten $x$, $y$, $z$ ist $sqrt(x^2 + y^2 + z^2)$.', 'Zweimal Pythagoras: erst in der Grundebene, dann in die Höhe.'],
      ['Gerade', 'Parameterform: Ortsvektor = Stützvektor + $t$ · Richtungsvektor.', 'Vom Stützpunkt aus läuft man beliebig weit in Richtung des Richtungsvektors.']],
    ex: ['$A(1|2|3)$, $B(4|6|3)$', 'Verbindungsvektor $vec(3;4;0)$, Länge $sqrt(9 + 16 + 0) = 5$'],
    trap: 'Ein Punkt hat einen Ort, ein Vektor nicht: Derselbe Vektor kann überall angetragen werden.',
    art: 'Vektorgrafiken speichern keine Bildpunkte, sondern Pfeile und Kurven – deshalb bleiben sie beim Vergrößern gestochen scharf.' });

  mod({ id: '11-skalar', k: 11, lb: [7], t: 'geo', icon: '⊥', name: 'Skalarprodukt, Winkel & Abstände', spell: 'Scalaris Orthogon', lp: 4, pre: ['11-vektor', '9-trigo'],
    idea: 'Mit einer einzigen Rechnung prüfen, ob zwei Richtungen senkrecht aufeinander stehen – das Skalarprodukt bringt Winkel in die Vektorrechnung.',
    defs: [['Skalarprodukt', 'Für zwei Vektoren mit den Koordinaten $a_1, a_2, a_3$ und $b_1, b_2, b_3$: $a_1 * b_1 + a_2 * b_2 + a_3 * b_3$. Das Ergebnis ist eine Zahl.'],
      ['Normalenvektor', 'Ein Vektor, der senkrecht auf einer Ebene steht.']],
    rules: [['Orthogonalität', 'Zwei Vektoren (keiner der Nullvektor) stehen genau dann senkrecht aufeinander, wenn ihr Skalarprodukt 0 ist.', 'Das folgt aus dem Kosinussatz (Klasse 10): Bei 90° ist der Kosinus 0.'],
      ['Winkel', '$cos φ = {Skalarprodukt/Produkt der Beträge}$', 'Der Kosinussatz, in Vektorsprache übersetzt.'],
      ['Vektorprodukt', 'Das Vektorprodukt zweier Vektoren steht senkrecht auf beiden; sein Betrag ist der Flächeninhalt des aufgespannten Parallelogramms.', 'So findet man Normalenvektoren und Flächeninhalte in einem Schritt.']],
    ex: ['$vec(1;2;2)$ und $vec(2;-2;1)$', '$1 * 2 + 2 * (-2) + 2 * 1 = 0$: Die Vektoren sind orthogonal.'],
    trap: 'Das Skalarprodukt ergibt eine Zahl, das Vektorprodukt einen Vektor.',
    art: 'In der Computergrafik entscheidet das Skalarprodukt, wie hell eine Fläche leuchtet: Je senkrechter das Licht auftrifft, desto heller.' });

  mod({ id: '11-binomial', k: 11, lb: [4, 6], t: 'sto', icon: 'B(n;p)', name: 'Binomialverteilung', spell: 'Bernoulli Catena', lp: 5, pre: ['10-zufallsgr', '8-zaehlen'],
    idea: 'Treffer oder Niete, immer wieder, immer mit derselben Chance: Dieses einfache Muster beschreibt Qualitätskontrollen, Umfragen und Medikamententests.',
    defs: [['Bernoulli-Kette', 'Ein Versuch mit nur zwei Ausgängen (Treffer mit Wahrscheinlichkeit $p$) wird $n$-mal unabhängig wiederholt.'],
      ['Binomialkoeffizient', '$binom(n,k) = {n!/k! * (n - k)!}$: die Anzahl der Möglichkeiten, aus $n$ Plätzen $k$ auszuwählen.']],
    rules: [['Formel von Bernoulli', '$P(X = k) = binom(n,k) * p^k * (1 - p)^{n-k}$', 'Ein Pfad mit $k$ Treffern hat die Wahrscheinlichkeit $p^k * (1 - p)^{n-k}$ (1. Pfadregel) – und es gibt $binom(n,k)$ solche Pfade (2. Pfadregel).'],
      ['Kenngrößen', 'Erwartungswert $μ = n * p$, Standardabweichung $σ = sqrt(n * p * (1 - p))$', 'Bei 100 Würfen mit Trefferchance ${1/6}$ erwartet man etwa 17 Treffer.'],
      ['Hypothesentest', 'Man legt vorher fest, bei welchen Trefferzahlen man eine Vermutung verwirft. Das Signifikanzniveau begrenzt die Wahrscheinlichkeit, sie irrtümlich zu verwerfen.', 'Auch bei zutreffender Vermutung kann der Zufall extreme Ergebnisse liefern – nur eben selten.']],
    ex: ['Eine Münze wird 4-mal geworfen. $P$(genau 2-mal Kopf)?', '$binom(4,2) * ({1/2})^2 * ({1/2})^2 = 6 * {1/16} = {3/8}$'],
    trap: '„Mindestens 3“ ist nicht „genau 3“: Man muss alle Fälle 3, 4, 5 … addieren oder das Gegenereignis nutzen.',
    art: 'Das Galtonbrett lässt Kugeln durch Nagelreihen fallen: Unten entsteht wie von Geisterhand die Glockenform der Binomialverteilung.' });
})(typeof window !== 'undefined' ? window : globalThis);

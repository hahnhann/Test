/* Silberzirkel – Module der Klassen 5 bis 7 (Lehrplan Gymnasium Sachsen, Mathematik).
   Aufbau jeder Schriftrolle wie in einer Vorlesung:
   idea  = Worum geht es?            defs  = Definitionen [Begriff, Erklärung]
   rules = Sätze und Regeln [Name, Aussage, Warum gilt das?]
   ex    = Beispiel [Aufgabe, Lösung]   trap = Stolperfalle   art = Kunst & Klang
   pre   = Module, auf denen dieses Modul ruht (das "Gebäude der Mathematik"). */
(function (g) {
  'use strict';
  var mod = g.SZ.mod;

  /* ======================= KLASSE 5 ======================= */
  mod({ id: '5-nat', k: 5, lb: [1], t: 'zahl', icon: 'ℕ', name: 'Natürliche Zahlen', spell: 'Numerus Ordino', lp: 3, pre: [],
    idea: 'Die natürlichen Zahlen 0, 1, 2, 3 … sind der Grundstein des Zahlenturms. Alles Weitere – Brüche, negative Zahlen, Wurzeln – wird aus ihnen gebaut.',
    defs: [['Stellenwertsystem', 'Jede Ziffer hat einen Wert, der von ihrer Stelle abhängt: Einer, Zehner, Hunderter, Tausender … Jede Stelle ist das Zehnfache der vorigen.'],
      ['Potenz', '$a^n$ bedeutet: $a$ wird $n$-mal mit sich selbst multipliziert. $10^3 = 10 * 10 * 10 = 1000$. Die Quadratzahlen sind $1^2, 2^2, 3^2, ...$']],
    rules: [['Runden', 'Ist die Ziffer rechts von der Rundungsstelle 0 bis 4, wird abgerundet; ist sie 5 bis 9, wird aufgerundet.', 'So liegt die gerundete Zahl immer möglichst nah an der ursprünglichen Zahl.'],
      ['Ordnung', 'Von zwei natürlichen Zahlen ist diejenige größer, die auf dem Zahlenstrahl weiter rechts liegt.', 'Der Zahlenstrahl beginnt bei 0 – der kleinsten natürlichen Zahl – und hat kein Ende: Zu jeder Zahl gibt es einen Nachfolger.']],
    ex: ['Runde 47 382 auf Tausender.', 'Tausenderstelle: 7. Rechts daneben steht 3, also abrunden: 47 000.'],
    trap: 'Beim Runden auf Hunderter schaut man auf die Zehnerziffer – nicht auf die Einer.',
    art: 'Ein Takt ist ein kleines Stellenwertsystem: 1 ganze Note = 2 halbe = 4 Viertel = 8 Achtel. Jede Stufe ist das Doppelte der nächsten.' });

  mod({ id: '5-teiler', k: 5, lb: [1], t: 'zahl', icon: '2·3', name: 'Teiler & Primzahlen', spell: 'Primus Divido', lp: 3, pre: ['5-nat'],
    idea: 'Primzahlen sind die Atome der Zahlenwelt: Jede natürliche Zahl größer als 1 lässt sich auf genau eine Weise aus ihnen zusammensetzen.',
    defs: [['Teiler', '$a$ ist Teiler von $b$, wenn $b : a$ ohne Rest aufgeht. Beispiel: 6 ist Teiler von 42.'],
      ['Primzahl', 'Eine natürliche Zahl mit genau zwei Teilern: 1 und sich selbst. Die ersten sind 2, 3, 5, 7, 11, 13 … Die 1 ist keine Primzahl.']],
    rules: [['Teilbarkeitsregeln', 'Durch 2: letzte Ziffer gerade. Durch 5: letzte Ziffer 0 oder 5. Durch 3: Quersumme durch 3 teilbar. Durch 4: die Zahl aus den letzten zwei Ziffern ist durch 4 teilbar. Durch 6: durch 2 und durch 3 teilbar.', 'Für die 3: $10 = 9 + 1$ und $100 = 99 + 1$. Die Neuner-Anteile sind immer durch 3 teilbar – übrig bleibt genau die Quersumme.'],
      ['Primfaktorzerlegung', 'Jede natürliche Zahl größer als 1 lässt sich als Produkt von Primzahlen schreiben, z. B. $20 = 2^2 * 5$.', 'Man teilt so lange durch die kleinste mögliche Primzahl, bis 1 übrig bleibt.']],
    ex: ['Zerlege 84 in Primfaktoren.', '$84 = 2 * 42 = 2 * 2 * 21 = 2 * 2 * 3 * 7 = 2^2 * 3 * 7$'],
    trap: 'Die 1 hat nur einen Teiler und ist deshalb keine Primzahl. Die 2 ist die einzige gerade Primzahl.',
    art: 'Zwei Rhythmen mit 3 und 4 Schlägen treffen sich erst nach 12 Schlägen wieder – dem kleinsten gemeinsamen Vielfachen. Trommler nennen das Polyrhythmus.' });

  mod({ id: '5-gesetze', k: 5, lb: [1], t: 'alg', icon: '( )', name: 'Rechengesetze & erste Gleichungen', spell: 'Klammera Prioris', lp: 3, pre: ['5-nat'],
    idea: 'Rechengesetze sind die Verkehrsregeln der Zahlen. Wer sie kennt, rechnet schneller – und versteht später die Algebra, denn dort gelten genau dieselben Gesetze für Buchstaben.',
    defs: [['Term', 'Ein Rechenausdruck wie $3 * (4 + 5)$.'],
      ['Gleichung', 'Zwei Terme mit einem Gleichheitszeichen dazwischen, z. B. $x + 27 = 64$. Gesucht ist die Zahl, die die Gleichung wahr macht.']],
    rules: [['Vorrang', 'Klammern zuerst, dann Potenzen, dann Punktrechnung ($*$ und $:$), dann Strichrechnung ($+$ und $-$).', 'Das ist eine Vereinbarung, damit jeder Term für alle dasselbe bedeutet.'],
      ['Kommutativ- und Assoziativgesetz', '$a + b = b + a$ und $a * b = b * a$. Bei reiner Addition oder reiner Multiplikation darf man beliebig klammern.', 'Ob man 3 Reihen mit 4 Kerzen oder 4 Reihen mit 3 Kerzen zählt – es sind dieselben 12 Kerzen.'],
      ['Distributivgesetz', '$a * (b + c) = a * b + a * c$', 'Ein Rechteck mit den Seiten $a$ und $b + c$ lässt sich in zwei Rechtecke $a * b$ und $a * c$ zerschneiden.']],
    ex: ['Berechne geschickt: $7 * 98$', '$7 * 98 = 7 * (100 - 2) = 700 - 14 = 686$'],
    trap: 'Subtraktion und Division sind nicht vertauschbar: $8 - 3$ ist nicht $3 - 8$.',
    art: 'Auch Noten haben Vorrangregeln: Vorzeichen, Taktart und Wiederholungszeichen legen fest, wie ein Stück gelesen wird – damit alle dasselbe spielen.' });

  mod({ id: '5-bruch', k: 5, lb: [2], t: 'zahl', icon: '½', name: 'Brüche', spell: 'Fractio Partis', lp: 4, pre: ['5-teiler'],
    idea: 'Mit natürlichen Zahlen kann man nicht jede Teilung ausführen. Brüche füllen die Lücken zwischen ihnen – der Zahlenturm bekommt ein neues Stockwerk.',
    defs: [['Bruch', '${z/n}$ bedeutet: Ein Ganzes wird in $n$ gleiche Teile geteilt, davon nimmt man $z$. $z$ heißt Zähler, $n$ Nenner.'],
      ['Echter und unechter Bruch', 'Echt: Zähler kleiner als Nenner (kleiner als 1). Unecht: Zähler mindestens so groß wie der Nenner, z. B. ${7/4} = 1{3/4}$.']],
    rules: [['Erweitern und Kürzen', 'Multipliziert oder dividiert man Zähler und Nenner mit derselben Zahl (nicht 0), bleibt der Wert des Bruchs gleich: ${2/3} = {4/6} = {6/9}$.', 'Teilt man jedes Stück noch einmal in zwei Hälften, gibt es doppelt so viele Stücke – aber man hat auch doppelt so viele davon.'],
      ['Bruchteil einer Größe', '${2/3}$ von 27: erst durch 3 teilen, dann mit 2 multiplizieren. Ergebnis: 18.', 'Der Nenner sagt, in wie viele Teile geteilt wird; der Zähler, wie viele davon gemeint sind.']],
    ex: ['Kürze ${18/24}$ vollständig.', 'Der größte gemeinsame Teiler von 18 und 24 ist 6: ${18/24} = {3/4}$'],
    trap: 'Ein größerer Nenner bedeutet kleinere Stücke: ${1/8}$ ist kleiner als ${1/4}$.',
    art: 'Notenwerte sind Brüche: Eine halbe Note dauert ${1/2}$ Takt, eine Viertelnote ${1/4}$, eine Achtelnote ${1/8}$. Ein Viervierteltakt ist voll, wenn die Summe 1 ergibt.' });

  mod({ id: '5-dezimal', k: 5, lb: [2], t: 'zahl', icon: '0,5', name: 'Dezimalzahlen & Prozent', spell: 'Komma Decimalis', lp: 4, pre: ['5-nat', '5-bruch'],
    idea: 'Dezimalzahlen sind Brüche in Verkleidung: Sie führen die Stellenwerttafel hinter dem Komma einfach weiter – Zehntel, Hundertstel, Tausendstel.',
    defs: [['Dezimalzahl', '$0,37$ bedeutet 3 Zehntel und 7 Hundertstel, also ${37/100}$.'],
      ['Prozent', '„Prozent“ heißt „von hundert“: $1 % = {1/100} = 0,01$.']],
    rules: [['Umwandeln', '${1/2} = 0,5 = 50 %$, ${1/4} = 0,25 = 25 %$, ${3/4} = 0,75 = 75 %$, ${1/5} = 0,2 = 20 %$, ${1/10} = 0,1 = 10 %$.', 'Man erweitert den Bruch auf den Nenner 10, 100 oder 1000 und liest ihn in der Stellenwerttafel ab.'],
      ['Mal und geteilt durch Zehnerpotenzen', 'Beim Multiplizieren mit 10, 100, 1000 rückt das Komma um 1, 2, 3 Stellen nach rechts, beim Dividieren nach links.', 'Jede Stelle ist das Zehnfache der Stelle rechts daneben.'],
      ['Addieren und Subtrahieren', 'Komma unter Komma schreiben und stellenweise rechnen.', 'Nur gleiche Stellenwerte dürfen zusammengefasst werden – Zehntel zu Zehnteln.']],
    ex: ['Schreibe ${3/20}$ als Dezimalzahl und in Prozent.', '${3/20} = {15/100} = 0,15 = 15 %$'],
    trap: '$0,5$ ist größer als $0,45$ – auch wenn 45 mehr Ziffern hat. Vergleiche stellenweise: 5 Zehntel gegen 4 Zehntel.',
    art: 'Beim Mischen von Farben rechnet man mit Anteilen: 25 % Blau und 75 % Gelb ergeben ein helles Grün.' });

  mod({ id: '5-mittel', k: 5, lb: [2], t: 'sto', icon: 'x̄', name: 'Arithmetisches Mittel', spell: 'Medium Aequo', lp: 2, pre: ['5-dezimal'],
    idea: 'Der Mittelwert fasst viele Zahlen in einer einzigen zusammen. Er ist der erste Baustein der Statistik im Turm des Zufalls.',
    defs: [['Arithmetisches Mittel', 'Summe aller Werte geteilt durch ihre Anzahl. Für 4, 7 und 10: $(4 + 7 + 10) : 3 = 7$.']],
    rules: [['Ausgleich', 'Das arithmetische Mittel ist der Wert, den jeder hätte, wenn alles gleichmäßig verteilt würde.', 'Beim Teilen der Gesamtsumme durch die Anzahl bekommt jeder denselben Anteil.']],
    ex: ['Noten: 2, 3, 1, 2. Wie lautet der Durchschnitt?', '$(2 + 3 + 1 + 2) : 4 = 8 : 4 = 2$'],
    trap: 'Der Mittelwert muss kein Wert sein, der wirklich vorkommt: Der Durchschnitt von 1 und 2 ist 1,5.',
    art: 'Mischt man zwei Farbtöne zu gleichen Teilen, liegt das Ergebnis genau in der Mitte – ein Mittelwert aus Farbe.' });

  mod({ id: '5-koord', k: 5, lb: [3], t: 'fun', icon: '(x|y)', name: 'Koordinatensystem', spell: 'Punctum Locus', lp: 2, pre: ['5-nat'],
    idea: 'Mit zwei Zahlen lässt sich jeder Punkt der Ebene genau beschreiben. Das Koordinatensystem ist die Bühne, auf der später alle Funktionen auftreten.',
    defs: [['Koordinaten', 'Der Punkt $P(3|2)$ liegt 3 Einheiten nach rechts ($x$-Wert) und 2 Einheiten nach oben ($y$-Wert) vom Ursprung $O(0|0)$.']],
    rules: [['Reihenfolge', 'Erst der $x$-Wert (waagerecht), dann der $y$-Wert (senkrecht).', 'Eine Vereinbarung – wie im Alphabet kommt x vor y.'],
      ['Parallel und senkrecht', 'Punkte mit gleichem $y$-Wert liegen auf einer Parallelen zur $x$-Achse, Punkte mit gleichem $x$-Wert auf einer Parallelen zur $y$-Achse.', 'Gleicher $y$-Wert heißt gleiche Höhe über der $x$-Achse.']],
    ex: ['Wie lang ist die Strecke von $A(1|2)$ nach $B(6|2)$?', 'Beide Punkte liegen auf gleicher Höhe. Länge: $6 - 1 = 5$ Einheiten.'],
    trap: '$P(2|5)$ und $Q(5|2)$ sind verschiedene Punkte.',
    art: 'Jedes digitale Bild ist ein Koordinatensystem: Jeder Bildpunkt hat eine Spalte und eine Zeile. Pixelkunst ist Malen nach Koordinaten.' });

  mod({ id: '5-winkel', k: 5, lb: [3], t: 'geo', icon: '∡', name: 'Winkel', spell: 'Angulus Apertus', lp: 3, pre: [],
    idea: 'Winkel messen, wie weit sich zwei Strahlen öffnen. An sich schneidenden Geraden verraten sich Winkel gegenseitig.',
    defs: [['Winkelarten', 'Spitz: kleiner als 90°. Recht: genau 90°. Stumpf: zwischen 90° und 180°. Gestreckt: 180°. Überstumpf: zwischen 180° und 360°. Vollwinkel: 360°.'],
      ['Winkel an Geraden', 'Scheitelwinkel liegen sich an einer Kreuzung gegenüber. Nebenwinkel liegen nebeneinander. Stufen- und Wechselwinkel entstehen, wenn eine Gerade zwei Parallelen schneidet.']],
    rules: [['Nebenwinkelsatz', 'Nebenwinkel ergänzen sich zu 180°.', 'Zusammen bilden sie einen gestreckten Winkel – eine Gerade.'],
      ['Scheitelwinkelsatz', 'Scheitelwinkel sind gleich groß.', 'Beide haben denselben Nebenwinkel. Also ist jeder von ihnen 180° minus diesen Nebenwinkel.'],
      ['Stufen- und Wechselwinkel', 'An geschnittenen Parallelen sind Stufenwinkel gleich groß und Wechselwinkel gleich groß.', 'Verschiebt man die eine Parallele auf die andere, fallen die Stufenwinkel genau aufeinander.']],
    ex: ['Ein Winkel misst 52°. Wie groß sind sein Nebenwinkel und sein Scheitelwinkel?', 'Nebenwinkel: $180° - 52° = 128°$. Scheitelwinkel: 52°.'],
    trap: 'Stufen- und Wechselwinkel sind nur dann gleich groß, wenn die geschnittenen Geraden wirklich parallel sind.',
    art: 'Der Fluchtpunkt in einer Zeichnung funktioniert über Winkel: Parallele Linien scheinen sich in der Ferne zu treffen.' });

  mod({ id: '5-symm', k: 5, lb: [3], t: 'geo', icon: '◐', name: 'Symmetrie & Spiegelung', spell: 'Speculum Simetria', lp: 3, pre: ['5-koord'],
    idea: 'Symmetrie ist Ordnung, die man sehen kann – in Kirchenfenstern, Schneeflocken und Ornamenten. In der Mathematik beschreibt man sie durch Bewegungen.',
    defs: [['Achsensymmetrie', 'Eine Figur ist achsensymmetrisch, wenn man sie an einer Geraden so falten kann, dass beide Hälften genau aufeinanderliegen.'],
      ['Punktsymmetrie', 'Eine Figur ist punktsymmetrisch, wenn sie nach einer halben Drehung (180°) um einen Punkt wieder genauso aussieht.'],
      ['Bewegungen', 'Verschiebung, Drehung und Spiegelung verändern nur die Lage einer Figur, nicht ihre Form und Größe.']],
    rules: [['Geradenspiegelung', 'Punkt und Bildpunkt liegen auf einer Senkrechten zur Spiegelachse und sind gleich weit von ihr entfernt.', 'Genau so entsteht das Spiegelbild beim Falten des Papiers.'],
      ['Maßgleichheit', 'Bei der Spiegelung bleiben alle Streckenlängen und Winkelgrößen erhalten.', 'Die gespiegelte Figur ist deckungsgleich – nur der Umlaufsinn kehrt sich um.']],
    ex: ['Die Spiegelachse verläuft senkrecht durch $x = 4$. Spiegle $P(1|3)$.', '$P$ liegt 3 Einheiten links der Achse. Der Bildpunkt liegt 3 Einheiten rechts davon auf gleicher Höhe: $P\'(7|3)$.'],
    trap: 'Ein Parallelogramm ist punktsymmetrisch, aber im Allgemeinen nicht achsensymmetrisch.',
    art: 'Rosetten gotischer Kirchenfenster, Mandalas und Schneeflocken sind dreh- und spiegelsymmetrisch. Im Atelier der Akademie kannst du solche Muster selbst malen.' });

  mod({ id: '5-flaeche', k: 5, lb: [4], t: 'geo', icon: '▭', name: 'Rechtecke & Quader', spell: 'Area Quadrata', lp: 4, pre: ['5-gesetze'],
    idea: 'Umfang misst den Rand, Flächeninhalt das Innere, Volumen den Raum. Alle späteren Formeln für Figuren und Körper führen auf Rechteck und Quader zurück.',
    defs: [['Flächeneinheiten', '$1 cm^2$ ist ein Quadrat mit 1 cm Seitenlänge. $1 dm^2 = 100 cm^2$, $1 m^2 = 100 dm^2$.'],
      ['Volumeneinheiten', '$1 cm^3$ ist ein Würfel mit 1 cm Kantenlänge. $1 dm^3 = 1000 cm^3 = 1$ Liter.']],
    rules: [['Rechteck', 'Umfang $u = 2 * (a + b)$, Flächeninhalt $A = a * b$.', 'In ein Rechteck mit 4 cm und 3 cm passen 3 Reihen mit je 4 Einheitsquadraten: 12 Quadrate.'],
      ['Quader', 'Volumen $V = a * b * c$, Oberflächeninhalt $O = 2 * (a * b + a * c + b * c)$.', 'Der Boden fasst $a * b$ Würfel, davon liegen $c$ Schichten übereinander. Die Oberfläche besteht aus drei Paaren gleicher Rechtecke.']],
    ex: ['Ein Quader ist 5 cm lang, 4 cm breit und 3 cm hoch. Berechne das Volumen.', '$V = 5 * 4 * 3 = 60$, also $60 cm^3$.'],
    trap: 'Bei Flächen ist die Umrechnungszahl 100, bei Volumen 1000 – nicht 10.',
    art: 'Ein Bild mit doppelter Breite und doppelter Höhe braucht viermal so viel Leinwand – und viermal so viel Farbe.' });

  mod({ id: '5-groessen', k: 5, lb: [5], t: 'log', icon: 'kg', name: 'Größen & Problemlösen', spell: 'Mensura Vera', lp: 2, pre: ['5-dezimal'],
    idea: 'Echte Probleme kommen ohne Rechenzeichen daher. Die Kunst ist, sie in Teilprobleme zu zerlegen – die wichtigste Strategie im ganzen Gebäude.',
    defs: [['Größe', 'Eine Zahl mit einer Einheit, z. B. 2,5 km. Vor dem Rechnen bringt man alle Größen auf dieselbe Einheit.']],
    rules: [['Umrechnen', 'Länge: 1 km = 1000 m, 1 m = 100 cm, 1 cm = 10 mm. Masse: 1 t = 1000 kg, 1 kg = 1000 g. Zeit: 1 h = 60 min, 1 min = 60 s.', 'In eine kleinere Einheit umrechnen heißt multiplizieren, in eine größere dividieren.'],
      ['Lösungsplan', 'Was ist gegeben? Was ist gesucht? In Teilprobleme zerlegen, rechnen, Ergebnis am Sachverhalt prüfen.', 'Ein großes Problem wird lösbar, wenn man es auf bekannte kleine Probleme zurückführt.']],
    ex: ['Ein Film beginnt 17:45 Uhr und dauert 105 Minuten. Wann endet er?', '105 min = 1 h 45 min. 17:45 Uhr + 1 h = 18:45 Uhr, + 45 min = 19:30 Uhr.'],
    trap: 'Die Zeit rechnet nicht im Zehnersystem: 1,5 h sind 90 Minuten, nicht 150.',
    art: 'Ein Metronom zählt Schläge pro Minute: Bei Tempo 120 dauert ein Schlag genau eine halbe Sekunde.' });

  /* ======================= KLASSE 6 ======================= */
  mod({ id: '6-bruchrechnen', k: 6, lb: [1], t: 'zahl', icon: '⅓+¼', name: 'Bruchrechnung', spell: 'Fractio Calculo', lp: 5, pre: ['5-bruch', '5-teiler'],
    idea: 'Jetzt lernen die Brüche alle vier Grundrechenarten. Damit sind die gebrochenen Zahlen ein vollwertiger Zahlbereich, in dem jede Division (außer durch 0) aufgeht.',
    defs: [['Gleichnamig', 'Brüche mit gleichem Nenner. Der Hauptnenner ist das kleinste gemeinsame Vielfache der Nenner.'],
      ['Kehrwert', 'Zähler und Nenner tauschen die Plätze: Der Kehrwert von ${3/4}$ ist ${4/3}$.']],
    rules: [['Addieren und Subtrahieren', 'Erst gleichnamig machen, dann die Zähler addieren oder subtrahieren. Der Nenner bleibt.', 'Nur gleiche Stücke kann man zusammenzählen: Drittel und Viertel werden beide zu Zwölfteln.'],
      ['Multiplizieren', 'Zähler mal Zähler, Nenner mal Nenner: ${a/b} * {c/d} = {a * c/b * d}$', '${2/3}$ von ${4/5}$: Man teilt jedes Fünftel in 3 Teile (Fünfzehntel) und nimmt von den 4 Fünfteln je 2 Teile – das sind 8 Fünfzehntel.'],
      ['Dividieren', 'Mit dem Kehrwert multiplizieren: ${a/b} : {c/d} = {a/b} * {d/c}$', 'Dividieren fragt: Wie oft passt der Teiler hinein? In 2 passt ${1/4}$ genau 8-mal – und $2 * 4 = 8$.']],
    ex: ['${1/3} + {1/4}$', 'Hauptnenner 12: ${4/12} + {3/12} = {7/12}$'],
    trap: 'Niemals Zähler plus Zähler und Nenner plus Nenner: ${1/2} + {1/2}$ ist 1 und nicht ${2/4}$.',
    art: 'Die Saite einer Harfe klingt eine Oktave höher, wenn man sie auf ${1/2}$ verkürzt, und eine Quinte höher bei ${2/3}$. Musik ist hörbare Bruchrechnung.' });

  mod({ id: '6-dezimal', k: 6, lb: [1], t: 'zahl', icon: '0,3̅', name: 'Dezimalzahlen & Perioden', spell: 'Periodus Infinita', lp: 4, pre: ['5-dezimal', '6-bruchrechnen'],
    idea: 'Jeder Bruch lässt sich als Dezimalzahl schreiben – manche enden, andere wiederholen sich unendlich oft. Ein erster Blick in die Unendlichkeit.',
    defs: [['Endliche Dezimalzahl', 'Bricht nach endlich vielen Stellen ab: ${3/8} = 0,375$.'],
      ['Periodische Dezimalzahl', 'Eine Ziffernfolge wiederholt sich ohne Ende: ${1/3} = 0,333... = 0,[3]$']],
    rules: [['Wann endet die Dezimalzahl?', 'Ein vollständig gekürzter Bruch ergibt genau dann eine endliche Dezimalzahl, wenn sein Nenner nur die Primfaktoren 2 und 5 enthält.', 'Nur dann lässt er sich auf einen Nenner 10, 100, 1000 … erweitern, denn $10 = 2 * 5$.'],
      ['Multiplizieren', 'Ohne Komma multiplizieren; das Ergebnis hat so viele Nachkommastellen wie beide Faktoren zusammen.', '$0,3 * 0,2 = {3/10} * {2/10} = {6/100} = 0,06$'],
      ['Dividieren', 'Bei Dividend und Divisor das Komma gleich weit nach rechts schieben, bis der Divisor eine natürliche Zahl ist.', 'Erweitern ändert den Wert eines Quotienten nicht: $3,6 : 0,4 = 36 : 4 = 9$.']],
    ex: ['$0,25 * 0,4$', '$25 * 4 = 100$, drei Nachkommastellen: $0,100 = 0,1$'],
    trap: '$0,3 * 0,2$ ist $0,06$ und nicht $0,6$. Zähle die Nachkommastellen beider Faktoren.',
    art: 'Ein Kanon wiederholt dieselbe Melodie immer wieder – wie die Periode einer Dezimalzahl.' });

  mod({ id: '6-mengen', k: 6, lb: [1], t: 'log', icon: '∈', name: 'Mengen', spell: 'Elementum Colligo', lp: 2, pre: ['5-nat', '5-bruch'],
    idea: 'Mengen sind die Sprache, in der die gesamte Mathematik geschrieben ist. An der Universität beginnt jede Vorlesung mit ihnen.',
    defs: [['Menge und Element', 'Eine Menge fasst Objekte zusammen. $3 ∈ ℕ$ heißt: 3 ist Element der Menge der natürlichen Zahlen.'],
      ['Teilmenge', '$A ⊂ B$: Jedes Element von $A$ gehört auch zu $B$.']],
    rules: [['Zahlbereichserweiterung', 'Jede natürliche Zahl ist auch eine gebrochene Zahl: $ℕ ⊂ ℚ_{+}$. Die gebrochenen Zahlen wurden eingeführt, damit jede Division (außer durch 0) ausführbar ist.', '$5 = {5/1}$ – eine natürliche Zahl ist ein Bruch mit Nenner 1. Aber $3 : 4$ hat in ℕ kein Ergebnis.']],
    ex: ['Ist ${6/3}$ eine natürliche Zahl?', 'Ja: ${6/3} = 2$ und $2 ∈ ℕ$. Es kommt auf den Wert an, nicht auf die Schreibweise.'],
    trap: 'Ein Bruch und eine Dezimalzahl können dieselbe Zahl sein: ${1/2}$ und $0,5$ sind ein und dasselbe Element.',
    art: 'Ein Orchester ist eine Menge, die Streicher sind eine Teilmenge – und die Geigen eine Teilmenge der Streicher.' });

  mod({ id: '6-gleich', k: 6, lb: [1], t: 'alg', icon: 'x=?', name: 'Gleichungen mit Brüchen', spell: 'Aequatio Prima', lp: 3, pre: ['5-gesetze', '6-bruchrechnen'],
    idea: 'Eine Gleichung ist ein Rätsel: Welche Zahl versteckt sich hinter dem Buchstaben? Du löst sie durch Nachdenken über die Umkehraufgabe.',
    defs: [['Variable', 'Ein Buchstabe als Platzhalter für eine Zahl.'],
      ['Lösung', 'Eine Zahl, die beim Einsetzen eine wahre Aussage ergibt. Mit der Probe kann man jede Lösung überprüfen.']],
    rules: [['Umkehraufgabe', 'Addition und Subtraktion kehren einander um, ebenso Multiplikation und Division.', 'Aus $x + {1/4} = {3/4}$ folgt $x = {3/4} - {1/4}$: Was dazukam, wird wieder weggenommen.'],
      ['Sachaufgaben', 'Skizze oder Tabelle anlegen, Variable einführen, Gleichung aufstellen, lösen, Ergebnis am Text prüfen.', 'Die Gleichung übersetzt den Text in die Sprache der Mathematik.']],
    ex: ['${3/5} * a = 6$', 'Umkehraufgabe: $a = 6 : {3/5} = 6 * {5/3} = 10$. Probe: ${3/5} * 10 = 6$ ✓'],
    trap: 'Die Probe immer in der ursprünglichen Gleichung machen – nicht in einer umgeformten Zeile.',
    art: 'Ein fehlender Ton in einer Melodie ist wie eine Variable: Aus dem Zusammenhang hört man, welcher Ton passt.' });

  mod({ id: '6-zuord', k: 6, lb: [2], t: 'fun', icon: '↦', name: 'Zuordnungen', spell: 'Ordo Paratus', lp: 3, pre: ['5-koord'],
    idea: 'Überall wird zugeordnet: jedem Tag eine Temperatur, jeder Ware ein Preis. Aus dieser Idee wächst in Klasse 8 der Funktionsbegriff.',
    defs: [['Zuordnung', 'Elementen einer Menge werden Elemente einer anderen Menge zugeordnet.'],
      ['Eindeutig', 'Jedem Element der ersten Menge wird genau ein Element zugeordnet (Schüler ↦ Geburtstag).'],
      ['Eineindeutig', 'Die Zuordnung ist in beiden Richtungen eindeutig (Schüler ↦ Platznummer im Theater).']],
    rules: [['Darstellungen', 'Dieselbe Zuordnung lässt sich in Worten, als Tabelle, als Diagramm, als Pfeilbild oder als Gleichung darstellen.', 'Alle Darstellungen enthalten dieselben Paare – nur anders aufgeschrieben.']],
    ex: ['Ist die Zuordnung Vorname ↦ Schüler in einer Klasse mit zwei Annas eindeutig?', 'Nein, sie ist mehrdeutig: Dem Vornamen Anna sind zwei Schülerinnen zugeordnet.'],
    trap: 'Eindeutig heißt nicht eineindeutig: Zwei Kinder können am selben Tag Geburtstag haben.',
    art: 'Ein Notenblatt ist eine Zuordnung: Jedem Zeitpunkt wird eine Tonhöhe zugeordnet. Die Notenlinien sind die $y$-Achse, die Zeit läuft nach rechts.' });

  mod({ id: '6-prop', k: 6, lb: [2], t: 'fun', icon: '1:2', name: 'Proportionalität & Dreisatz', spell: 'Proportio Constans', lp: 4, pre: ['6-zuord', '6-bruchrechnen'],
    idea: 'Doppelte Menge, doppelter Preis – oder doppelt so viele Helfer, halbe Zeit. Diese zwei Muster stecken in unzähligen Alltagsfragen.',
    defs: [['Direkt proportional', 'Zum Doppelten, Dreifachen … der einen Größe gehört das Doppelte, Dreifache … der anderen. („Je mehr, desto mehr“ im gleichen Verhältnis.)'],
      ['Indirekt proportional', 'Zum Doppelten, Dreifachen … der einen Größe gehört die Hälfte, ein Drittel … der anderen.']],
    rules: [['Quotientengleichheit', 'Bei direkter Proportionalität ist der Quotient $y : x$ für alle Wertepaare gleich.', 'Dieser Quotient ist der Preis für eine Einheit – er ändert sich nicht.'],
      ['Produktgleichheit', 'Bei indirekter Proportionalität ist das Produkt $x * y$ für alle Wertepaare gleich.', 'Das Produkt ist die gesamte Arbeit, die verteilt wird – sie bleibt gleich.'],
      ['Dreisatz', 'Erst auf eine Einheit schließen, dann auf das gesuchte Vielfache.', 'Über die Eins führt immer ein sicherer Weg.']],
    ex: ['3 Kessel fassen 12 Liter. Wie viel fassen 5 Kessel?', '1 Kessel: $12 : 3 = 4$ Liter. 5 Kessel: $5 * 4 = 20$ Liter.'],
    trap: 'Nicht jedes „je mehr, desto mehr“ ist proportional: Ein Kind wird älter und größer, aber nicht im gleichen Verhältnis.',
    art: 'Soll eine Zeichnung doppelt so groß werden, müssen alle Längen im gleichen Verhältnis wachsen – sonst wirkt das Bild verzerrt.' });

  mod({ id: '6-haeufig', k: 6, lb: [2, 5], t: 'sto', icon: '%', name: 'Häufigkeiten & Anteile', spell: 'Frequentia Relativa', lp: 3, pre: ['5-mittel', '5-dezimal'],
    idea: 'Wie oft kommt etwas vor – und welcher Anteil ist das? Mit relativen Häufigkeiten kann man Gruppen verschiedener Größe fair vergleichen.',
    defs: [['Absolute Häufigkeit', 'Die Anzahl, wie oft ein Ergebnis auftritt.'],
      ['Relative Häufigkeit', 'Absolute Häufigkeit geteilt durch die Gesamtzahl – als Bruch, Dezimalzahl oder in Prozent.']],
    rules: [['Summe', 'Alle relativen Häufigkeiten zusammen ergeben 1, also 100 %.', 'Jedes Ergebnis wird genau einmal gezählt; zusammen ist es das Ganze.'],
      ['Kreisdiagramm', 'Der Winkel eines Sektors ist der Anteil mal 360°. Zu 25 % gehören 90°.', 'Der Vollkreis mit 360° steht für das Ganze.']],
    ex: ['12 von 30 Kindern spielen ein Instrument. Wie groß ist die relative Häufigkeit?', '${12/30} = {2/5} = 0,4 = 40 %$'],
    trap: '8 von 10 ist ein größerer Anteil als 20 von 50 – obwohl 20 mehr ist als 8.',
    art: 'Wie oft kommt welcher Ton in einem Lied vor? Der Grundton der Tonart ist meist der häufigste – daran erkennt das Ohr, „wo zu Hause ist“.' });

  mod({ id: '6-dreieck', k: 6, lb: [3], t: 'geo', icon: '△', name: 'Dreiecke', spell: 'Triangulum Totum', lp: 5, pre: ['5-winkel'],
    idea: 'Das Dreieck ist die einfachste geschlossene Figur – und die stabilste. Jedes Vieleck lässt sich in Dreiecke zerlegen. Deshalb sind Dreieckssätze die Werkzeuge der ganzen Geometrie.',
    defs: [['Dreiecksarten', 'Nach Seiten: gleichseitig, gleichschenklig, unregelmäßig. Nach Winkeln: spitzwinklig, rechtwinklig, stumpfwinklig.'],
      ['Kongruent', 'Deckungsgleich: Zwei Figuren stimmen in Form und Größe überein.'],
      ['Besondere Linien', 'Höhe (Lot von einer Ecke auf die Gegenseite), Seitenhalbierende, Winkelhalbierende, Mittelsenkrechte.']],
    rules: [['Innenwinkelsatz', 'In jedem Dreieck beträgt die Summe der Innenwinkel 180°.', 'Zeichnet man durch $C$ die Parallele zu $AB$, liegen dort drei Winkel nebeneinander: zwei Wechselwinkel zu $α$ und $β$ und dazwischen $γ$. Zusammen ein gestreckter Winkel.'],
      ['Basiswinkelsatz', 'Im gleichschenkligen Dreieck sind die Basiswinkel gleich groß.', 'Die Symmetrieachse durch die Spitze bildet den einen Basiswinkel auf den anderen ab.'],
      ['Kongruenzsätze', 'Dreiecke sind kongruent, wenn sie übereinstimmen in: drei Seiten (sss), zwei Seiten und dem eingeschlossenen Winkel (sws), einer Seite und den beiden anliegenden Winkeln (wsw), zwei Seiten und dem Gegenwinkel der größeren Seite (SsW).', 'In jedem dieser Fälle gibt es beim Konstruieren nur eine einzige Möglichkeit.'],
      ['Dreiecksungleichung', 'Zwei Seiten sind zusammen immer länger als die dritte.', 'Der gerade Weg ist der kürzeste – ein Umweg über die dritte Ecke ist länger.']],
    ex: ['$α = 48°$, $β = 75°$. Wie groß ist $γ$?', '$γ = 180° - 48° - 75° = 57°$'],
    trap: 'Drei gleiche Winkel (www) reichen nicht für Kongruenz: Die Dreiecke haben dann die gleiche Form, können aber verschieden groß sein.',
    art: 'Fachwerkhäuser, Kräne und Brücken bestehen aus Dreiecken, weil sich ein Dreieck aus Stäben nicht verformen lässt – ein Viereck schon.' });

  mod({ id: '6-beweis', k: 6, lb: [3], t: 'log', icon: '∴', name: 'Definition, Satz & Beweis', spell: 'Quod Erat', lp: 3, pre: ['6-dreieck', '5-winkel'],
    idea: 'In der Mathematik gilt nichts, nur weil es jemand sagt oder weil es in zehn Beispielen stimmt. Ein Satz gilt erst, wenn er bewiesen ist – dann aber für immer.',
    defs: [['Definition', 'Legt fest, was ein Begriff bedeutet. Eine Definition kann man nicht beweisen, sie ist eine Vereinbarung.'],
      ['Satz', 'Eine Aussage, die bewiesen wurde. Viele Sätze haben die Form „Wenn (Voraussetzung), dann (Behauptung)“.'],
      ['Beweis', 'Eine lückenlose Kette von Begründungen, die von der Voraussetzung zur Behauptung führt und nur bereits Bekanntes benutzt.']],
    rules: [['Direkter Beweis', 'Man startet bei der Voraussetzung und folgert Schritt für Schritt die Behauptung.', 'Jeder Schritt stützt sich auf eine Definition oder einen schon bewiesenen Satz – so trägt im Gebäude jeder Stein den nächsten.'],
      ['Beispiele beweisen nichts', 'Auch tausend passende Beispiele sind kein Beweis für eine Aussage über alle Fälle.', 'Es könnte immer noch ein Fall kommen, in dem die Aussage nicht stimmt.']],
    ex: ['Ist „Ein Dreieck mit drei gleich langen Seiten heißt gleichseitig“ eine Definition oder ein Satz?', 'Eine Definition: Sie legt nur einen Namen fest.'],
    trap: 'Messen ist kein Beweisen: Eine Zeichnung zeigt nur einen einzigen Fall – und Messungen sind nie ganz genau.',
    art: 'Eine Fuge von Bach folgt strengen Regeln, und doch entsteht daraus Schönheit. So ist es auch mit einem eleganten Beweis.' });

  mod({ id: '6-viereck', k: 6, lb: [3], t: 'geo', icon: '▱', name: 'Vierecke & Flächen', spell: 'Quadrangulum Familia', lp: 4, pre: ['5-flaeche', '6-dreieck'],
    idea: 'Die Vierecke bilden eine Familie mit Stammbaum. Und alle Flächenformeln führen zurück auf das Rechteck – man muss nur geschickt zerschneiden.',
    defs: [['Haus der Vierecke', 'Trapez: ein Paar paralleler Seiten. Parallelogramm: zwei Paare. Raute: vier gleich lange Seiten. Rechteck: vier rechte Winkel. Quadrat: Raute und Rechteck zugleich. Drachenviereck: zwei Paare gleich langer Nachbarseiten.']],
    rules: [['Dreieck', '$A = {g * h/2}$', 'Zwei gleiche Dreiecke ergeben zusammen ein Parallelogramm mit Grundseite $g$ und Höhe $h$.'],
      ['Parallelogramm', '$A = g * h$', 'Schneidet man an einer Seite ein Dreieck ab und setzt es an der anderen an, entsteht ein Rechteck.'],
      ['Trapez', '$A = {(a + c) * h/2}$', 'Zwei gleiche Trapeze ergeben ein Parallelogramm mit der Grundseite $a + c$.']],
    ex: ['Dreieck mit $g = 8 cm$ und $h = 5 cm$.', '$A = {8 * 5/2} = 20$, also $20 cm^2$.'],
    trap: 'Die Höhe steht immer senkrecht auf der Grundseite – sie ist nicht die schräge Seite.',
    art: 'Parkettierungen – lückenlose Muster aus Vielecken – findet man auf Fliesenböden und in den Bildern von M. C. Escher. Mit jedem Parallelogramm kann man die Ebene pflastern.' });

  mod({ id: '6-prisma', k: 6, lb: [4], t: 'geo', icon: '⬡', name: 'Prismen', spell: 'Prisma Solidum', lp: 3, pre: ['5-flaeche', '6-viereck'],
    idea: 'Ein Prisma ist eine Fläche, die man in die Höhe gezogen hat. Sein Volumen folgt deshalb immer derselben Idee wie beim Quader.',
    defs: [['Gerades Prisma', 'Ein Körper mit zwei deckungsgleichen, parallelen Vielecken als Grund- und Deckfläche; die Seitenflächen sind Rechtecke.'],
      ['Mantel', 'Alle Seitenflächen zusammen. Abgewickelt ist der Mantel ein Rechteck mit den Seiten Umfang der Grundfläche und Höhe.']],
    rules: [['Volumen', '$V = A_G * h$', 'Die Grundfläche wird $h$-mal übereinandergeschichtet – genau wie beim Quader.'],
      ['Oberflächeninhalt', '$O = 2 * A_G + M$ mit $M = u * h$', 'Das Netz besteht aus Grundfläche, Deckfläche und dem abgewickelten Mantel.']],
    ex: ['Dreiecksprisma: Grundfläche $12 cm^2$, Höhe 10 cm.', '$V = 12 * 10 = 120$, also $120 cm^3$.'],
    trap: 'Die Höhe des Prismas ist der Abstand zwischen Grund- und Deckfläche – auch wenn das Prisma auf der Seite liegt.',
    art: 'Ein Glasprisma zerlegt weißes Licht in die Farben des Regenbogens. Bienenwaben sind sechseckige Prismen: viel Platz bei wenig Wachs.' });

  /* ======================= KLASSE 7 ======================= */
  mod({ id: '7-rational', k: 7, lb: [2], t: 'zahl', icon: '−1', name: 'Rationale Zahlen', spell: 'Negativus Reverso', lp: 6, pre: ['6-bruchrechnen', '6-dezimal'],
    idea: 'Mit negativen Zahlen wird der Zahlenstrahl zur Zahlengeraden. Jetzt ist endlich auch jede Subtraktion ausführbar.',
    defs: [['Rationale Zahlen ℚ', 'Alle positiven und negativen Brüche und die Null. Die ganzen Zahlen ℤ = {…, −2, −1, 0, 1, 2, …} gehören dazu.'],
      ['Betrag', '$|a|$ ist der Abstand der Zahl $a$ von 0 auf der Zahlengeraden: $|-3| = 3$.'],
      ['Gegenzahl', 'Die Zahl mit gleichem Betrag und anderem Vorzeichen: Die Gegenzahl von 5 ist −5.']],
    rules: [['Subtrahieren', 'Eine Zahl subtrahieren heißt ihre Gegenzahl addieren: $a - b = a + (-b)$, also $3 - (-5) = 3 + 5$.', 'Wer Schulden wegnimmt, macht reicher.'],
      ['Multiplizieren und Dividieren', 'Gleiche Vorzeichen ergeben Plus, verschiedene Vorzeichen ergeben Minus.', 'Permanenzprinzip: $3 * (-2) = -6$, $2 * (-2) = -4$, $1 * (-2) = -2$, $0 * (-2) = 0$ – die Ergebnisse steigen immer um 2. Also muss $(-1) * (-2) = 2$ sein.'],
      ['Ordnung', 'Von zwei Zahlen ist die größer, die auf der Zahlengeraden weiter rechts liegt: $-7 < -2$.', 'Minus 7 Grad ist kälter als minus 2 Grad.']],
    ex: ['$-4 - (-9)$', '$-4 + 9 = 5$'],
    trap: 'Vorzeichen und Rechenzeichen unterscheiden: In $5 - (-3)$ ist das erste Minus ein Rechenzeichen, das zweite ein Vorzeichen.',
    art: 'Ein ♭ senkt einen Ton um einen Halbton, ein ♯ hebt ihn – wie −1 und +1. Beide zusammen heben sich auf.' });

  mod({ id: '7-potwurz', k: 7, lb: [2], t: 'zahl', icon: '√', name: 'Potenzen & Quadratwurzeln', spell: 'Radix Quadrata', lp: 3, pre: ['7-rational', '5-nat'],
    idea: 'Quadrieren und Wurzelziehen kehren einander um. Dabei taucht ein Geheimnis auf: Manche Wurzeln passen in keinen Bruch.',
    defs: [['Potenz', '$a^n$: Die Basis $a$ wird $n$-mal mit sich selbst multipliziert.'],
      ['Quadratwurzel', '$sqrt(a)$ ist die nichtnegative Zahl, deren Quadrat $a$ ergibt: $sqrt(49) = 7$, denn $7^2 = 49$.']],
    rules: [['Vorzeichen bei Potenzen', 'Eine negative Basis ergibt bei geradem Exponenten ein positives, bei ungeradem Exponenten ein negatives Ergebnis.', 'Je zwei Minuszeichen heben sich auf: $(-2)^4 = 16$, aber $(-2)^3 = -8$.'],
      ['Ausblick: irrationale Zahlen', '$sqrt(2)$ lässt sich durch keinen Bruch genau angeben. Die Dezimalzahl $1,41421...$ endet nie und wird nie periodisch.', 'Den Beweis lernst du in Klasse 9 – er ist einer der berühmtesten der Mathematik.']],
    ex: ['$(-3)^2$ und $-3^2$', '$(-3)^2 = 9$, aber $-3^2 = -(3 * 3) = -9$. Die Klammer entscheidet.'],
    trap: 'Aus einer negativen Zahl kann man (in ℚ und ℝ) keine Quadratwurzel ziehen – kein Quadrat ist negativ.',
    art: 'Papier im Format DIN A4 hat das Seitenverhältnis $1 : sqrt(2)$. Halbiert man es, entsteht wieder dieselbe Form – nur kleiner.' });

  mod({ id: '7-zahlbereiche', k: 7, lb: [2], t: 'log', icon: 'ℚ', name: 'Zahlbereiche & Mengenlehre', spell: 'Numeri Regna', lp: 2, pre: ['6-mengen', '7-rational'],
    idea: 'Die Zahlbereiche liegen ineinander wie Zwiebelschalen. Jede Erweiterung macht eine Rechenart möglich, die vorher nicht immer ging.',
    defs: [['Zahlbereiche', 'ℕ natürliche Zahlen, ℤ ganze Zahlen, $ℚ_{+}$ gebrochene Zahlen, ℚ rationale Zahlen.'],
      ['Mengenoperationen', 'Schnittmenge $A ∩ B$: Elemente, die in beiden Mengen liegen. Vereinigungsmenge $A ∪ B$: Elemente, die in mindestens einer liegen. Leere Menge $∅$: enthält kein Element.']],
    rules: [['Ineinander geschachtelt', '$ℕ ⊂ ℤ ⊂ ℚ$ und $ℕ ⊂ ℚ_{+} ⊂ ℚ$', 'Jede natürliche Zahl ist auch ganz; jede ganze Zahl ist ein Bruch mit Nenner 1.'],
      ['Wozu erweitern?', 'In ℕ geht nicht jede Subtraktion ($3 - 5$) und nicht jede Division ($3 : 4$). In ℤ geht jede Subtraktion, in ℚ außerdem jede Division außer durch 0.', 'Jeder neue Zahlbereich schließt eine Lücke des alten und behält alle Rechengesetze bei.']],
    ex: ['In welchen Bereichen liegt −3?', '$-3 ∈ ℤ$ und $-3 ∈ ℚ$, aber $-3 ∉ ℕ$.'],
    trap: 'ℤ und $ℚ_{+}$ enthalten sich nicht gegenseitig: −2 ist ganz, aber nicht gebrochen; ${1/2}$ ist gebrochen, aber nicht ganz.',
    art: 'Farbkreise sind Mengendiagramme: Wo sich Rot und Blau überlagern, entsteht die Schnittmenge – Violett.' });

  mod({ id: '7-gleichung', k: 7, lb: [2], t: 'alg', icon: '2x', name: 'Lineare Gleichungen', spell: 'Aequatio Solvo', lp: 5, pre: ['6-gleich', '7-rational'],
    idea: 'Eine Gleichung ist eine Waage im Gleichgewicht. Solange du auf beiden Seiten dasselbe tust, bleibt sie im Gleichgewicht – so findest du jedes $x$.',
    defs: [['Äquivalenzumformung', 'Eine Umformung, die die Lösungsmenge nicht verändert: auf beiden Seiten dieselbe Zahl addieren oder subtrahieren, beide Seiten mit derselben Zahl (nicht 0) multiplizieren oder durch sie dividieren.']],
    rules: [['Lösungsweg', 'Klammern auflösen, zusammenfassen, alle $x$ auf eine Seite und alle Zahlen auf die andere bringen, zuletzt durch den Faktor vor $x$ teilen.', 'Jede Umformung macht rückgängig, was mit $x$ geschehen ist – in umgekehrter Reihenfolge.'],
      ['Formeln umstellen', 'Eine Formel ist eine Gleichung mit mehreren Variablen. Man stellt sie mit denselben Umformungen nach der gesuchten Größe um.', 'Aus $A = a * b$ wird durch Division durch $b$: $a = A : b$.']],
    ex: ['$3a - 4 = 2a + 8$', 'Auf beiden Seiten $-2a$: $a - 4 = 8$. Auf beiden Seiten $+4$: $a = 12$. Probe: $36 - 4 = 32$ und $24 + 8 = 32$ ✓'],
    trap: 'Was du links tust, musst du auch rechts tun – mit der ganzen Seite, nicht nur mit einem Summanden.',
    art: 'Ein Mobile hängt nur ruhig, wenn alle Arme im Gleichgewicht sind. Nimmst du links etwas weg, musst du rechts ausgleichen.' });

  mod({ id: '7-prozent', k: 7, lb: [2], t: 'zahl', icon: '%', name: 'Prozentrechnung', spell: 'Pro Centum', lp: 4, pre: ['5-dezimal', '6-prop'],
    idea: 'Prozente machen Anteile vergleichbar, indem sie alles auf Hundert beziehen. Dahinter steckt nichts anderes als Bruchrechnung und Proportionalität.',
    defs: [['Grundwert $G$', 'Das Ganze, also 100 %.'],
      ['Prozentsatz $p %$', 'Der Anteil in Hundertsteln.'],
      ['Prozentwert $W$', 'Der Teil des Grundwerts, der dem Prozentsatz entspricht.']],
    rules: [['Grundgleichung', '$W = {p/100} * G$', 'Prozentwert und Prozentsatz sind direkt proportional: zu 1 % gehört ein Hundertstel von $G$.'],
      ['Steigerung um und auf', 'Steigt ein Wert um 20 %, so steigt er auf 120 %: Man multipliziert mit 1,2. Sinkt er um 20 %, multipliziert man mit 0,8.', '$G + {20/100} * G = 1,2 * G$ – das Distributivgesetz aus Klasse 5.']],
    ex: ['Ein Umhang kostet 80 Taler und wird um 15 % reduziert.', '$80 * 0,85 = 68$ Taler.'],
    trap: 'Erst 10 % mehr und dann 10 % weniger ergibt nicht den alten Preis: $1,1 * 0,9 = 0,99$.',
    art: 'Bildbearbeitung arbeitet mit Prozenten: 50 % Deckkraft, 120 % Sättigung, 80 % Helligkeit.' });

  mod({ id: '7-kreis', k: 7, lb: [1], t: 'geo', icon: '⊙', name: 'Kreis & Winkelsätze', spell: 'Circulus Thaletis', lp: 5, pre: ['6-dreieck', '6-beweis'],
    idea: 'Am Kreis verstecken sich überraschende Gesetze. Der Satz des Thales ist über 2500 Jahre alt – und sein Beweis braucht nur Wissen aus Klasse 6.',
    defs: [['Geraden am Kreis', 'Passante: kein gemeinsamer Punkt. Tangente: genau ein gemeinsamer Punkt (Berührpunkt). Sekante: zwei gemeinsame Punkte.'],
      ['Winkel am Kreis', 'Peripheriewinkel: Scheitel auf dem Kreis. Zentriwinkel: Scheitel im Mittelpunkt.'],
      ['Umkreis und Inkreis', 'Der Umkreis geht durch alle Ecken eines Dreiecks (Mittelpunkt: Schnitt der Mittelsenkrechten). Der Inkreis berührt alle Seiten (Mittelpunkt: Schnitt der Winkelhalbierenden).']],
    rules: [['Satz des Thales', 'Liegt $C$ auf dem Kreis mit dem Durchmesser $AB$, dann hat das Dreieck $ABC$ bei $C$ einen rechten Winkel.', 'Die Strecke $MC$ teilt das Dreieck in zwei gleichschenklige Dreiecke (alle Radien sind gleich lang). Mit dem Basiswinkelsatz ist $γ = α + β$, und mit dem Innenwinkelsatz $α + β + γ = 180°$. Also $2γ = 180°$.'],
      ['Zentri-Peripheriewinkelsatz', 'Der Zentriwinkel ist doppelt so groß wie jeder Peripheriewinkel über demselben Bogen.', 'Wieder helfen gleichschenklige Dreiecke mit Radien als Schenkeln.'],
      ['Peripheriewinkelsatz', 'Alle Peripheriewinkel über demselben Bogen sind gleich groß.', 'Jeder von ihnen ist halb so groß wie derselbe Zentriwinkel.'],
      ['Sehnenviereck', 'Liegen alle vier Ecken eines Vierecks auf einem Kreis, ergänzen sich gegenüberliegende Winkel zu 180°.', 'Die beiden zugehörigen Zentriwinkel ergeben zusammen 360°.']],
    ex: ['$AB$ ist Durchmesser, $C$ liegt auf dem Kreis, $α = 35°$. Wie groß ist $β$?', 'Thales: $γ = 90°$. Innenwinkelsatz: $β = 180° - 90° - 35° = 55°$.'],
    trap: 'Der Satz des Thales gilt nur, wenn $AB$ wirklich ein Durchmesser ist – nicht für jede beliebige Sehne.',
    art: 'Mit dem Thaleskreis findet eine Fotografin alle Standorte, von denen aus ein Tor unter genau 90° erscheint. Rundbögen romanischer Kirchen sind Thaleskreise aus Stein.' });

  mod({ id: '7-logik', k: 7, lb: [1], t: 'log', icon: '⇒', name: 'Wenn – dann', spell: 'Si Tunc', lp: 3, pre: ['6-beweis'],
    idea: 'Mathematische Sätze haben eine feste Bauform. Wer sie durchschaut, weiß genau, was behauptet wird – und was nicht.',
    defs: [['Wenn-dann-Aussage', '„Wenn $A$, dann $B$“: $A$ ist die Voraussetzung, $B$ die Behauptung.'],
      ['Umkehrung', 'Voraussetzung und Behauptung werden vertauscht: „Wenn $B$, dann $A$“.'],
      ['Genau dann, wenn', 'Satz und Umkehrung gelten beide.']],
    rules: [['Umkehrung prüfen', 'Die Umkehrung eines wahren Satzes kann falsch sein.', '„Wenn eine Zahl durch 4 teilbar ist, dann ist sie gerade“ ist wahr. Die Umkehrung ist falsch: 6 ist gerade, aber nicht durch 4 teilbar.'],
      ['Gegenbeispiel', 'Eine Aussage über alle Fälle („Für alle …“) ist widerlegt, sobald man ein einziges Gegenbeispiel findet.', 'Sie behauptet ja, dass es keine Ausnahme gibt.'],
      ['Existenzaussage', 'Eine Aussage „Es gibt …“ ist bewiesen, sobald man ein einziges Beispiel angibt.', 'Mehr wird nicht behauptet.']],
    ex: ['Widerlege: „Alle Primzahlen sind ungerade.“', 'Gegenbeispiel: 2 ist eine Primzahl und gerade.'],
    trap: '„Wenn es regnet, ist die Straße nass“ heißt nicht: „Wenn die Straße nass ist, hat es geregnet.“',
    art: 'Auch Musik kennt Wenn-dann-Regeln: Wenn ein Stück in C-Dur steht, dann hat es keine Vorzeichen. Die Umkehrung gilt nicht – a-Moll hat auch keine.' });

  mod({ id: '7-pyramide', k: 7, lb: [3], t: 'geo', icon: '▲', name: 'Prismen & Pyramiden', spell: 'Pyramis Tertia', lp: 4, pre: ['6-prisma'],
    idea: 'Eine Pyramide läuft in einer Spitze zusammen. Erstaunlich: Sie fasst immer genau ein Drittel des Prismas mit gleicher Grundfläche und Höhe.',
    defs: [['Pyramide', 'Ein Körper mit einem Vieleck als Grundfläche und Dreiecken als Seitenflächen, die sich in der Spitze treffen.'],
      ['Darstellungen', 'Schrägbild (räumlicher Eindruck), Zweitafelbild (Grund- und Aufriss), Netz (aufgeklappte Oberfläche).'],
      ['Pyramidenstumpf', 'Der Restkörper, wenn man einer Pyramide parallel zur Grundfläche die Spitze abschneidet.']],
    rules: [['Volumen der Pyramide', '$V = {1/3} * A_G * h$', 'Ein Würfel lässt sich in drei gleiche Pyramiden zerlegen, deren Spitze in einer Würfelecke liegt. Umfüllversuche bestätigen: dreimal Pyramide füllt das Prisma.'],
      ['Masse', '$m = ρ * V$ (Dichte mal Volumen)', 'Die Dichte gibt an, wie viel Gramm ein Kubikzentimeter wiegt.']],
    ex: ['Quadratische Pyramide: $a = 6 cm$, $h = 10 cm$.', '$V = {1/3} * 6 * 6 * 10 = 120$, also $120 cm^3$.'],
    trap: 'Die Körperhöhe $h$ steht senkrecht auf der Grundfläche. Die Höhe einer Seitenfläche ist länger.',
    art: 'Nur fünf Körper sind aus lauter gleichen regelmäßigen Vielecken gebaut: die platonischen Körper. Für alle gilt Eulers Formel: Ecken − Kanten + Flächen = 2.' });

  mod({ id: '7-daten', k: 7, lb: [4], t: 'sto', icon: '▂▅▇', name: 'Daten darstellen', spell: 'Data Pictura', lp: 2, pre: ['6-haeufig', '7-prozent'],
    idea: 'Ein gutes Diagramm erzählt eine Geschichte auf einen Blick. Ein schlechtes kann täuschen – wer Diagramme lesen kann, lässt sich nichts vormachen.',
    defs: [['Säulendiagramm', 'Vergleicht Häufigkeiten oder Größen nebeneinander.'],
      ['Liniendiagramm', 'Zeigt eine Entwicklung, meist über die Zeit.'],
      ['Kreisdiagramm', 'Zeigt Anteile an einem Ganzen.']],
    rules: [['Passendes Diagramm wählen', 'Anteile am Ganzen: Kreisdiagramm. Entwicklung: Liniendiagramm. Vergleich einzelner Werte: Säulendiagramm.', 'Jede Diagrammart hebt eine andere Eigenschaft der Daten hervor.'],
      ['Sektorwinkel', 'Winkel = Anteil mal 360°. Zu 1 % gehören 3,6°.', 'Der Vollkreis steht für 100 %.']],
    ex: ['Welcher Winkel gehört im Kreisdiagramm zu 35 %?', '$0,35 * 360° = 126°$'],
    trap: 'Beginnt die Hochachse nicht bei 0, wirken kleine Unterschiede riesig. Immer zuerst die Achsen lesen!',
    art: 'Florence Nightingale machte aus Zahlen Bilder, die Leben retteten. Ein Diagramm ist Gestaltung mit Verantwortung.' });
})(typeof window !== 'undefined' ? window : globalThis);

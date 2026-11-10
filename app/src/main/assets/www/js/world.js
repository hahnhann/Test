/* Silberzirkel – die Spielwelt: Türme (Fachgebiete), Klassenstufen, Ränge, Zirkel,
   Sammelkarten, Abzeichen und der Laden. Die Module selbst stehen in mods-*.js. */
(function (g) {
  'use strict';
  var SZ = g.SZ;

  /* Die sechs Bauteile des Gebäudes der Mathematik.
     "uni" nennt das Fachgebiet, wie es an einer Universität heißt. */
  SZ.TOWERS = [
    { id: 'log', name: 'Fundament', sub: 'Logik & Beweisen', uni: 'Logik und Grundlagen', color: '#9db7e0', prof: 'Rabe Quod',
      about: 'Hier lagern die Grundsteine: Mengen, Aussagen, Beweise und kluge Strategien. Ohne Fundament steht kein Turm.' },
    { id: 'zahl', name: 'Zahlenturm', sub: 'Zahlen & Rechnen', uni: 'Arithmetik und Zahlentheorie', color: '#f2b84b', prof: 'Meisterin Primula Siebenstern',
      about: 'Von den natürlichen Zahlen über Brüche und negative Zahlen bis zu den reellen Zahlen: Jeder Stock erweitert den Zahlbereich.' },
    { id: 'alg', name: 'Algebra-Turm', sub: 'Terme & Gleichungen', uni: 'Algebra', color: '#ef7d8f', prof: 'Magistra Xenia von Gleichen',
      about: 'Hier lernen Buchstaben das Rechnen. Aus Rechengesetzen werden Terme, aus Termen Gleichungen, aus Gleichungen Systeme.' },
    { id: 'fun', name: 'Funktionen-Turm', sub: 'Zuordnungen & Graphen', uni: 'Analysis', color: '#4fd1c5', prof: 'Meister Graphius Bogenreich',
      about: 'Wie hängt eine Größe von einer anderen ab? Vom Koordinatensystem führt der Weg bis zu Ableitung und Integral.' },
    { id: 'geo', name: 'Geometrie-Turm', sub: 'Figuren & Körper', uni: 'Geometrie', color: '#7bd88f', prof: 'Meisterin Euklidia Zirkelstein',
      about: 'Winkel, Dreiecke, Kreise und Körper – und die berühmten Sätze von Thales und Pythagoras.' },
    { id: 'sto', name: 'Turm des Zufalls', sub: 'Daten & Wahrscheinlichkeit', uni: 'Stochastik', color: '#b794f4', prof: 'Madame Fortuna Würfelglanz',
      about: 'Daten ordnen, Chancen berechnen, den Zufall zähmen: von Häufigkeiten bis zur Binomialverteilung.' }
  ];
  SZ.tower = function (id) { return SZ.TOWERS.filter(function (t) { return t.id === id; })[0]; };

  /* Klassenstufen mit den Lernbereichen des sächsischen Lehrplans (Gymnasium, Mathematik) */
  SZ.KLASSEN = [
    { k: 5, label: 'Klasse 5', floor: 'Eingangshalle', lbs: ['Arbeiten mit natürlichen Zahlen', 'Gemeine Brüche und Dezimalzahlen', 'Lagebeziehungen geometrischer Objekte', 'Rechtecke und Quader', 'Vernetzung: Mathematik im Alltag'] },
    { k: 6, label: 'Klasse 6', floor: 'Bibliothek', lbs: ['Arbeiten mit gebrochenen Zahlen', 'Zuordnungen in der Umwelt', 'Dreiecke und Vierecke', 'Prismen', 'Vernetzung: Anteile'] },
    { k: 7, label: 'Klasse 7', floor: 'Kreuzgang', lbs: ['Geometrie in der Ebene', 'Arbeiten mit rationalen Zahlen', 'Darstellen und Berechnen von Prismen und Pyramiden', 'Vernetzung: Darstellen von Daten'] },
    { k: 8, label: 'Klasse 8', floor: 'Spiegelsaal', lbs: ['Arbeiten mit Termen und Gleichungen', 'Zufallsversuche', 'Funktionen und lineare Gleichungssysteme', 'Ähnlichkeit', 'Vernetzung: Heuristische Strategien'] },
    { k: 9, label: 'Klasse 9', floor: 'Wendelgang', lbs: ['Funktionen und Potenzen', 'Kreise, Kreiszylinder und Kugeln', 'Rechtwinklige Dreiecke', 'Auswerten von Daten', 'Vernetzung: Mathematik und moderne Rechentechnik'] },
    { k: 10, label: 'Klasse 10', floor: 'Kuppelsaal', lbs: ['Wachstumsvorgänge und periodische Vorgänge', 'Diskrete Zufallsgrößen', 'Algebraisches Lösen geometrischer Probleme', 'Funktionale Zusammenhänge', 'Vernetzung: Zinsrechnung'] },
    { k: 11, label: 'Klasse 11/12', floor: 'Sternwarte', lbs: ['Differentialrechnung', 'Matrizen', 'Vektoren, Geraden und Ebenen', 'Binomialverteilte Zufallsgrößen', 'Integralrechnung', 'Beurteilende Statistik', 'Abstände und Winkel', 'Weitere Anwendungen'] }
  ];
  SZ.klasse = function (k) { return SZ.KLASSEN.filter(function (c) { return c.k === k; })[0]; };

  /* Module (werden in mods-*.js angemeldet) */
  SZ.MODS = [];
  SZ.MOD = {};
  SZ.mod = function (m) { SZ.MODS.push(m); SZ.MOD[m.id] = m; };
  /* alle Module, auf denen ein Modul ruht (direkt und indirekt), nach Nähe sortiert */
  SZ.ancestors = function (id) {
    var out = [], seen = {}, queue = (SZ.MOD[id].pre || []).map(function (p) { return [p, 1]; });
    seen[id] = 1;
    while (queue.length) {
      var e = queue.shift();
      if (seen[e[0]]) continue;
      seen[e[0]] = 1;
      out.push({ id: e[0], depth: e[1] });
      (SZ.MOD[e[0]].pre || []).forEach(function (p) { queue.push([p, e[1] + 1]); });
    }
    return out;
  };
  /* alle Module, die direkt auf einem Modul aufbauen */
  SZ.children = function (id) {
    return SZ.MODS.filter(function (m) { return (m.pre || []).indexOf(id) >= 0; }).map(function (m) { return m.id; });
  };

  /* Ränge nach gesammelter Erfahrung */
  SZ.RANKS = [
    { xp: 0, f: 'Novizin', m: 'Novize' },
    { xp: 150, f: 'Zauberlehrling', m: 'Zauberlehrling' },
    { xp: 450, f: 'Formelschülerin', m: 'Formelschüler' },
    { xp: 900, f: 'Adeptin', m: 'Adept' },
    { xp: 1600, f: 'Runenkundige', m: 'Runenkundiger' },
    { xp: 2600, f: 'Zahlenmagierin', m: 'Zahlenmagier' },
    { xp: 4000, f: 'Beweismeisterin', m: 'Beweismeister' },
    { xp: 6000, f: 'Hüterin des Zirkels', m: 'Hüter des Zirkels' },
    { xp: 9000, f: 'Erzmagierin', m: 'Erzmagier' },
    { xp: 13000, f: 'Großmeisterin der Akademie', m: 'Großmeister der Akademie' }
  ];

  /* Die vier Zirkel der Akademie */
  SZ.ZIRKEL = [
    { id: 'spirale', name: 'Zirkel der Spirale', color: '#f2c14e', motto: 'Muster sehen, wo andere Chaos sehen.', text: 'Für alle, die gern entdecken, zeichnen und Muster aufspüren.' },
    { id: 'rosette', name: 'Zirkel der Rosette', color: '#f687b3', motto: 'Schönheit ist Ordnung, die man sehen kann.', text: 'Für alle, die Symmetrie, Farben und Formen lieben.' },
    { id: 'echo', name: 'Zirkel des Echos', color: '#4fd1c5', motto: 'Jede Zahl hat einen Klang.', text: 'Für alle, die Rhythmus und Melodien im Kopf haben.' },
    { id: 'polarstern', name: 'Zirkel des Polarsterns', color: '#90cdf4', motto: 'Was bewiesen ist, bleibt für immer wahr.', text: 'Für alle, die es ganz genau wissen wollen.' }
  ];

  /* Sammelkarten: Sternbilder der Mathematik. mods = passende Module. */
  SZ.CARDS = [
    { id: 'thales', name: 'Thales von Milet', years: 'um 624–546 v. Chr.', sign: '◠', mods: ['7-kreis', '8-aehnlich'], text: 'Gilt als einer der Ersten, die mathematische Aussagen bewiesen haben. Der Überlieferung nach bestimmte er die Höhe einer Pyramide über ihren Schatten – mit ähnlichen Dreiecken.' },
    { id: 'pythagoras', name: 'Pythagoras von Samos', years: 'um 570–495 v. Chr.', sign: '◣', mods: ['9-pythagoras', '6-bruchrechnen'], text: 'Seine Schule entdeckte, dass schöne Zusammenklänge einfache Zahlenverhältnisse haben: Oktave 2:1, Quinte 3:2. Der berühmte Satz über rechtwinklige Dreiecke trägt seinen Namen.' },
    { id: 'euklid', name: 'Euklid von Alexandria', years: 'um 300 v. Chr.', sign: '⊿', mods: ['6-beweis', '5-teiler', '7-logik'], text: 'Schrieb „Die Elemente“: Aus wenigen Grundannahmen leitet er Satz für Satz die Geometrie her. Er bewies auch, dass es unendlich viele Primzahlen gibt.' },
    { id: 'archimedes', name: 'Archimedes von Syrakus', years: 'um 287–212 v. Chr.', sign: '◯', mods: ['9-kreis', '7-pyramide'], text: 'Näherte die Kreiszahl π mit Vielecken an und fand heraus, dass eine Kugel genau zwei Drittel des Volumens des umhüllenden Zylinders einnimmt.' },
    { id: 'hypatia', name: 'Hypatia von Alexandria', years: 'um 355–415', sign: '✶', mods: ['9-quadfkt', '5-koord'], text: 'Mathematikerin, Astronomin und Philosophin. Sie lehrte in Alexandria und arbeitete an Schriften über Kegelschnitte – die Kurvenfamilie, zu der die Parabel gehört.' },
    { id: 'alchwarizmi', name: 'Al-Chwarizmi', years: 'um 780–850', sign: 'x', mods: ['7-gleichung', '8-gleichung'], text: 'Gelehrter in Bagdad. Aus dem Titel seines Buches über das Lösen von Gleichungen entstand das Wort „Algebra“, aus seinem Namen das Wort „Algorithmus“.' },
    { id: 'fibonacci', name: 'Leonardo Fibonacci', years: 'um 1170–1240', sign: '❍', mods: ['10-folgen', '5-nat'], text: 'Brachte die indisch-arabischen Ziffern nach Europa. Seine Folge 1, 1, 2, 3, 5, 8, 13 … findet man in Sonnenblumen und Schneckenhäusern.' },
    { id: 'ries', name: 'Adam Ries', years: '1492–1559', sign: '⚖', mods: ['5-gesetze', '6-prop', '7-prozent'], text: 'Rechenmeister aus Annaberg im Erzgebirge. Seine Rechenbücher schrieb er auf Deutsch statt auf Latein, damit alle rechnen lernen konnten. „Nach Adam Ries“ sagt man bis heute.' },
    { id: 'descartes', name: 'René Descartes', years: '1596–1650', sign: '┼', mods: ['5-koord', '8-linear', '8-funktion'], text: 'Verband Geometrie und Algebra: Mit einem Koordinatensystem werden aus Kurven Gleichungen. Deshalb heißt es „kartesisches“ Koordinatensystem.' },
    { id: 'pascal', name: 'Blaise Pascal', years: '1623–1662', sign: '△', mods: ['8-zufall', '8-baum', '8-zaehlen'], text: 'Begründete im Briefwechsel mit Pierre de Fermat die Wahrscheinlichkeitsrechnung – ausgelöst durch die Frage eines Spielers. Das Pascalsche Dreieck trägt seinen Namen.' },
    { id: 'leibniz', name: 'Gottfried Wilhelm Leibniz', years: '1646–1716', sign: '∫', mods: ['11-ableitung', '11-integral', '8-funktion'], text: 'In Leipzig geboren. Erfand unabhängig von Isaac Newton die Differential- und Integralrechnung, schuf das Zeichen ∫ und baute eine Rechenmaschine.' },
    { id: 'chatelet', name: 'Émilie du Châtelet', years: '1706–1749', sign: '✧', mods: ['9-potenz', '11-kurven'], text: 'Übersetzte und erläuterte Newtons Hauptwerk und trug dazu bei zu klären, dass die Bewegungsenergie mit dem Quadrat der Geschwindigkeit wächst.' },
    { id: 'euler', name: 'Leonhard Euler', years: '1707–1783', sign: 'e', mods: ['10-expo', '10-log', '7-pyramide', '8-funktion'], text: 'Einer der produktivsten Mathematiker aller Zeiten. Von ihm stammen die Schreibweise f(x), die Zahl e und der Polyedersatz: Ecken − Kanten + Flächen = 2.' },
    { id: 'agnesi', name: 'Maria Gaetana Agnesi', years: '1718–1799', sign: '∿', mods: ['9-potfkt', '10-galerie'], text: 'Schrieb eines der ersten umfassenden Lehrbücher der Analysis. Eine glockenförmige Kurve ist nach ihr benannt.' },
    { id: 'germain', name: 'Sophie Germain', years: '1776–1831', sign: '♢', mods: ['5-teiler', '9-beweis'], text: 'Brachte sich Mathematik selbst bei und schrieb zunächst unter einem Männernamen an Gauß. Sie forschte zu Primzahlen und zu schwingenden Platten.' },
    { id: 'gauss', name: 'Carl Friedrich Gauß', years: '1777–1855', sign: 'Σ', mods: ['5-gesetze', '9-statistik', '11-matrix', '8-lgs'], text: 'Als Schüler soll er die Zahlen von 1 bis 100 blitzschnell addiert haben: 50 Paare mit der Summe 101. Nach ihm sind die Glockenkurve und ein Lösungsverfahren für Gleichungssysteme benannt.' },
    { id: 'lovelace', name: 'Ada Lovelace', years: '1815–1852', sign: '⚙', mods: ['8-logik', '10-folgen'], text: 'Schrieb das erste veröffentlichte Programm für eine Rechenmaschine – und ahnte, dass solche Maschinen eines Tages auch Musik verarbeiten könnten.' },
    { id: 'nightingale', name: 'Florence Nightingale', years: '1820–1910', sign: '◔', mods: ['7-daten', '6-haeufig', '9-statistik'], text: 'Krankenschwester und Statistikerin. Mit ihren Diagrammen überzeugte sie Politiker, die Hygiene in Lazaretten zu verbessern, und rettete so viele Leben.' },
    { id: 'riemann', name: 'Bernhard Riemann', years: '1826–1866', sign: '▥', mods: ['11-integral', '11-grenz'], text: 'Machte den Begriff des Integrals präzise: Die Fläche unter einer Kurve wird durch immer schmalere Rechtecke angenähert.' },
    { id: 'cantor', name: 'Georg Cantor', years: '1845–1918', sign: '∞', mods: ['6-mengen', '7-zahlbereiche', '9-wurzel'], text: 'Begründer der Mengenlehre. Er lehrte in Halle an der Saale und bewies, dass es verschieden große Unendlichkeiten gibt.' },
    { id: 'kowalewskaja', name: 'Sofja Kowalewskaja', years: '1850–1891', sign: '֍', mods: ['10-sinus', '11-ableitung'], text: 'Wurde in Stockholm Professorin für Mathematik – als eine der ersten Frauen überhaupt. Sie löste ein berühmtes Problem über die Bewegung eines Kreisels.' },
    { id: 'noether', name: 'Emmy Noether', years: '1882–1935', sign: '❋', mods: ['5-symm', '8-terme', '8-binom'], text: 'Prägte die moderne Algebra. Ihr berühmter Satz verbindet Symmetrien mit Erhaltungsgrößen der Physik. Albert Einstein nannte sie ein Genie.' },
    { id: 'ramanujan', name: 'Srinivasa Ramanujan', years: '1887–1920', sign: '❂', mods: ['9-wurzel', '10-folgen'], text: 'Fand in Indien ohne Studienabschluss tausende erstaunliche Formeln. Man sagte über ihn, jede Zahl sei sein persönlicher Freund.' },
    { id: 'johnson', name: 'Katherine Johnson', years: '1918–2020', sign: '☾', mods: ['9-quadfkt', '8-linear', '9-trigo'], text: 'Berechnete bei der NASA Flugbahnen von Raumkapseln. Ein Astronaut wollte erst starten, nachdem sie die Zahlen des Computers nachgerechnet hatte.' },
    { id: 'mirzakhani', name: 'Maryam Mirzakhani', years: '1977–2017', sign: '♾', mods: ['9-kreis', '10-galerie', '11-vektor'], text: 'Erhielt 2014 als erste Frau die Fields-Medaille, die höchste Auszeichnung der Mathematik. Sie zeichnete ihre Ideen auf riesige Papierbögen – Mathematik wie Malerei.' }
  ];
  SZ.card = function (id) { return SZ.CARDS.filter(function (c) { return c.id === id; })[0]; };

  /* Abzeichen. test(state, helper) entscheidet, ob es verdient ist. */
  SZ.BADGES = [
    { id: 'start', name: 'Erster Funke', icon: '✨', text: 'Die erste Übung abgeschlossen.', test: function (s) { return s.stats.quests >= 1; } },
    { id: 'pruef1', name: 'Siegelbrecherin', icon: '🔓', text: 'Die erste Prüfung bestanden.', test: function (s, h) { return h.count(2) >= 1; } },
    { id: 'gold1', name: 'Goldene Feder', icon: '✒️', text: 'Ein Modul mit drei Sternen gemeistert.', test: function (s, h) { return h.count(3) >= 1; } },
    { id: 'serie5', name: 'Zauberserie', icon: '🔥', text: '5 richtige Antworten in Folge.', test: function (s) { return s.stats.bestStreak >= 5; } },
    { id: 'serie12', name: 'Sternschnuppenregen', icon: '🌠', text: '12 richtige Antworten in Folge.', test: function (s) { return s.stats.bestStreak >= 12; } },
    { id: 'hundert', name: 'Hundert Lichter', icon: '🕯️', text: '100 Aufgaben richtig gelöst.', test: function (s) { return s.stats.right >= 100; } },
    { id: 'tausend', name: 'Tausend Sterne', icon: '🌌', text: '1000 Aufgaben richtig gelöst.', test: function (s) { return s.stats.right >= 1000; } },
    { id: 'riss', name: 'Baumeisterin', icon: '🔨', text: 'Einen Riss im Fundament repariert.', test: function (s) { return s.stats.repaired >= 1; } },
    { id: 'riss5', name: 'Hüterin der Mauern', icon: '🏰', text: 'Fünf Risse im Fundament repariert.', test: function (s) { return s.stats.repaired >= 5; } },
    { id: 'rabe3', name: 'Rabenfreundin', icon: '🐦', text: 'An 3 Tagen in Folge die Rabenpost gelöst.', test: function (s) { return s.daily.best >= 3; } },
    { id: 'rabe7', name: 'Sieben Nächte', icon: '🌙', text: 'An 7 Tagen in Folge die Rabenpost gelöst.', test: function (s) { return s.daily.best >= 7; } },
    { id: 'tuerme', name: 'Sechs Türme', icon: '🗝️', text: 'In jedem Bauteil der Akademie eine Prüfung bestanden.', test: function (s, h) { return h.towersWith(2) >= 6; } },
    { id: 'stock', name: 'Stockwerksiegel', icon: '🏅', text: 'Alle Module einer Klassenstufe bestanden.', test: function (s, h) { return h.fullFloors(2) >= 1; } },
    { id: 'karten8', name: 'Sternguckerin', icon: '🔭', text: '8 Sammelkarten gefunden.', test: function (s) { return s.cards.length >= 8; } },
    { id: 'karten', name: 'Alle Sternbilder', icon: '🌟', text: 'Alle Sammelkarten gefunden.', test: function (s) { return s.cards.length >= SZ.CARDS.length; } },
    { id: 'kunst', name: 'Atelierlicht', icon: '🎨', text: 'Ein Bild im Kaleidoskop-Atelier gespeichert.', test: function (s) { return s.stats.art >= 1; } },
    { id: 'klang', name: 'Spieluhr', icon: '🎼', text: 'Eine eigene Melodie in der Klangkammer gespeichert.', test: function (s) { return s.stats.songs >= 1; } },
    { id: 'rolle10', name: 'Bücherwurm', icon: '📜', text: '10 Schriftrollen gelesen.', test: function (s) { return s.stats.scrolls >= 10; } }
  ];

  /* Laden: Sternenstaub gegen neue Werkzeuge für Atelier und Klangkammer */
  SZ.SHOP = [
    { id: 'sym8', group: 'Atelier', name: 'Achtfach-Spiegel', text: 'Kaleidoskop mit 8 Symmetrieachsen.', price: 120 },
    { id: 'sym12', group: 'Atelier', name: 'Zwölffach-Spiegel', text: 'Kaleidoskop mit 12 Symmetrieachsen – wie eine Kirchenrosette.', price: 260 },
    { id: 'sym5', group: 'Atelier', name: 'Fünfstern-Spiegel', text: 'Fünfzählige Symmetrie wie beim Pentagramm.', price: 180 },
    { id: 'pal_feuer', group: 'Atelier', name: 'Farben: Drachenfeuer', text: 'Glühende Rot-, Orange- und Goldtöne.', price: 90 },
    { id: 'pal_wald', group: 'Atelier', name: 'Farben: Mondwald', text: 'Grün, Türkis und Silber.', price: 90 },
    { id: 'pal_pastell', group: 'Atelier', name: 'Farben: Feenstaub', text: 'Zarte Pastelltöne.', price: 140 },
    { id: 'brush_glow', group: 'Atelier', name: 'Leuchtpinsel', text: 'Linien, die im Dunkeln glühen.', price: 200 },
    { id: 'brush_star', group: 'Atelier', name: 'Sternenstreuer', text: 'Streut kleine Sterne statt Linien.', price: 220 },
    { id: 'inst_glocke', group: 'Klangkammer', name: 'Kristallglocken', text: 'Ein heller, glockiger Klang.', price: 120 },
    { id: 'inst_floete', group: 'Klangkammer', name: 'Mondflöte', text: 'Ein weicher, gehauchter Klang.', price: 160 },
    { id: 'inst_orgel', group: 'Klangkammer', name: 'Kellerorgel', text: 'Ein voller, warmer Klang.', price: 220 },
    { id: 'scale_moll', group: 'Klangkammer', name: 'Tonleiter: Moll', text: 'Geheimnisvoll und ein wenig traurig.', price: 100 },
    { id: 'scale_dur', group: 'Klangkammer', name: 'Tonleiter: Dur', text: 'Hell und fröhlich – alle sieben Töne.', price: 100 },
    { id: 'scale_ganz', group: 'Klangkammer', name: 'Tonleiter: Ganzton', text: 'Schwebend wie ein Traum.', price: 180 }
  ];
})(typeof window !== 'undefined' ? window : globalThis);

# Silberzirkel – Akademie der Zahlenmagie

Ein Mathe-Lernspiel als Android-App für Schülerinnen und Schüler am Gymnasium in Sachsen
(Klassenstufen 5 bis 12, voreingestellt ist Klasse 8).

Die Spielwelt ist eine Zauberakademie: Das Schloss ist **das Gebäude der Mathematik**. Jeder Turm
steht für ein Fachgebiet, jedes Stockwerk für eine Klassenstufe, und jeder Raum ruht auf den Räumen
darunter. Wer einen Raum zum Leuchten bringen will, liest eine Schriftrolle (Definition – Satz –
Begründung – Beispiel, wie in einer Vorlesung), übt und besteht eine Prüfung.

- läuft **vollständig offline**, ohne Internet-Berechtigung und **ohne KI** – alle Aufgaben werden
  auf dem Gerät nach festen Regeln mit Zufallszahlen erzeugt
- Inhalte nach dem **Lehrplan Gymnasium Mathematik des Freistaates Sachsen** (Fassung 2019, mit den
  Überarbeitungen bis 2021)
- 70 Module mit 633 Aufgabentypen, jeweils mit Lösungsweg und Tipp

## Installieren

1. Die Datei [`dist/Silberzirkel-1.0.0.apk`](dist/Silberzirkel-1.0.0.apk) auf das Android-Handy laden
   (ab Android 8.0) – zum Beispiel diese Seite auf dem Handy öffnen und die Datei herunterladen.
2. Die Datei antippen. Android fragt beim ersten Mal, ob Apps aus dieser Quelle installiert werden
   dürfen – das einmalig erlauben.
3. „Silberzirkel“ öffnen. Spätere Versionen lassen sich einfach darüber installieren, der Spielstand
   bleibt erhalten.

Die fertige APK liegt im Ordner `dist/`. Neu gebaut wird sie mit `./gradlew assembleRelease` (siehe
unten) oder automatisch bei jedem Push über GitHub Actions (Workflow „APK bauen“, Artefakt
„Silberzirkel-APK“).

## So funktioniert das Spiel

| Im Spiel | Bedeutung |
|---|---|
| **Schloss** | Übersicht über alle Module: fünf Türme und das Fundament, sieben Stockwerke |
| **Türme** | Fachgebiete wie an der Universität: Zahlen (Arithmetik und Zahlentheorie), Algebra, Funktionen (Analysis), Geometrie, Zufall (Stochastik) |
| **Fundament** | Logik, Mengen, Beweisen und Problemlösen – die Balken, die jedes Stockwerk tragen |
| **Schriftrolle** | Kurze „Vorlesung“ zum Modul: Definitionen, Sätze mit Begründung, Beispiel, Stolperfalle, Bezug zu Kunst und Musik |
| **Üben** | 6 Aufgaben mit Tipps; ab 4 richtigen gibt es den ersten Stern |
| **Prüfung** | 8 Aufgaben, 3 Herzen, keine Tipps; bestanden gibt es Leistungspunkte, einen zweiten Stern und eine Sammelkarte, mit höchstens einem Fehler den dritten Stern |
| **Fundament-Aufgaben** | In jede Übung und Prüfung sind Aufgaben aus den Modulen eingestreut, auf denen das Thema aufbaut – meist aus früheren Klassenstufen |
| **Riss im Mauerwerk** | Geht eine Fundament-Aufgabe schief, wird der zugehörige Raum markiert; eine bestandene Übung dort repariert ihn |
| **„Im Gebäude zeigen“** | Zeichnet für jedes Modul ein, auf welchen Räumen es ruht – bis hinunter in Klasse 5 |
| **Rabenpost** | Täglich fünf gemischte Aufgaben zur Wiederholung, mit Tages-Serie |

### Belohnungen

- **Sternenstaub** für jede richtige Antwort, mit Bonus für Serien
- **Ränge** von der Novizin bis zur Großmeisterin der Akademie
- **Leistungspunkte** im Studienbuch, wie im Studium
- **25 Sammelkarten** „Sternbilder der Mathematik“ (von Hypatia über Emmy Noether bis Maryam Mirzakhani,
  dazu Adam Ries aus Annaberg und Leibniz aus Leipzig)
- **Kaleidoskop-Atelier**: Malen mit Dreh- und Spiegelsymmetrie; Bilder lassen sich in der Galerie des
  Telefons speichern
- **Klangkammer**: eine Spieluhr mit 16 Schritten zum Komponieren eigener Melodien
- Im **Laden** gibt es für Sternenstaub neue Farben, Pinsel, Symmetrien, Instrumente und Tonleitern
- **18 Abzeichen**

## Bezug zum sächsischen Lehrplan

Jedes Modul ist einem Lernbereich des Lehrplans zugeordnet. Die Zeitrichtwerte des Lehrplans bestimmen
die Leistungspunkte der Module. Die Jahrgangsstufen 11 und 12 folgen dem Grundkurs.

### Klasse 5 – Eingangshalle

| Lernbereich | Module im Spiel |
|---|---|
| LB 1: Arbeiten mit natürlichen Zahlen | Natürliche Zahlen (Zahlen, 8 Aufgabentypen); Teiler & Primzahlen (Zahlen, 8 Aufgabentypen); Rechengesetze & erste Gleichungen (Algebra, 8 Aufgabentypen) |
| LB 2: Gemeine Brüche und Dezimalzahlen | Brüche (Zahlen, 9 Aufgabentypen); Dezimalzahlen & Prozent (Zahlen, 9 Aufgabentypen); Arithmetisches Mittel (Zufall, 6 Aufgabentypen) |
| LB 3: Lagebeziehungen geometrischer Objekte | Koordinatensystem (Funktionen, 7 Aufgabentypen); Winkel (Geometrie, 8 Aufgabentypen); Symmetrie & Spiegelung (Geometrie, 7 Aufgabentypen) |
| LB 4: Rechtecke und Quader | Rechtecke & Quader (Geometrie, 9 Aufgabentypen) |
| LB 5: Vernetzung: Mathematik im Alltag | Größen & Problemlösen (Fundament, 8 Aufgabentypen) |

### Klasse 6 – Bibliothek

| Lernbereich | Module im Spiel |
|---|---|
| LB 1: Arbeiten mit gebrochenen Zahlen | Bruchrechnung (Zahlen, 9 Aufgabentypen); Dezimalzahlen & Perioden (Zahlen, 8 Aufgabentypen); Mengen (Fundament, 6 Aufgabentypen); Gleichungen mit Brüchen (Algebra, 7 Aufgabentypen) |
| LB 2: Zuordnungen in der Umwelt | Zuordnungen (Funktionen, 6 Aufgabentypen); Proportionalität & Dreisatz (Funktionen, 7 Aufgabentypen); Häufigkeiten & Anteile (Zufall, 8 Aufgabentypen) |
| LB 3: Dreiecke und Vierecke | Dreiecke (Geometrie, 8 Aufgabentypen); Definition, Satz & Beweis (Fundament, 6 Aufgabentypen); Vierecke & Flächen (Geometrie, 8 Aufgabentypen) |
| LB 4: Prismen | Prismen (Geometrie, 7 Aufgabentypen) |
| LB 5: Vernetzung: Anteile | Häufigkeiten & Anteile (Zufall, 8 Aufgabentypen) |

### Klasse 7 – Kreuzgang

| Lernbereich | Module im Spiel |
|---|---|
| LB 1: Geometrie in der Ebene | Kreis & Winkelsätze (Geometrie, 10 Aufgabentypen); Wenn – dann (Fundament, 7 Aufgabentypen) |
| LB 2: Arbeiten mit rationalen Zahlen | Rationale Zahlen (Zahlen, 9 Aufgabentypen); Potenzen & Quadratwurzeln (Zahlen, 8 Aufgabentypen); Zahlbereiche & Mengenlehre (Fundament, 7 Aufgabentypen); Lineare Gleichungen (Algebra, 9 Aufgabentypen); Prozentrechnung (Zahlen, 9 Aufgabentypen) |
| LB 3: Darstellen und Berechnen von Prismen und Pyramiden | Prismen & Pyramiden (Geometrie, 9 Aufgabentypen) |
| LB 4: Vernetzung: Darstellen von Daten | Daten darstellen (Zufall, 7 Aufgabentypen) |

### Klasse 8 – Spiegelsaal

| Lernbereich | Module im Spiel |
|---|---|
| LB 1: Arbeiten mit Termen und Gleichungen | Terme umformen (Algebra, 12 Aufgabentypen); Binomische Formeln (Algebra, 12 Aufgabentypen); Gleichungen & Ungleichungen (Algebra, 11 Aufgabentypen) |
| LB 2: Zufallsversuche | Zufall & Wahrscheinlichkeit (Zufall, 12 Aufgabentypen); Baumdiagramme & Pfadregeln (Zufall, 10 Aufgabentypen); Geschicktes Zählen (Zufall, 10 Aufgabentypen); UND, ODER, NICHT & Strategien (Fundament, 11 Aufgabentypen) |
| LB 3: Funktionen und lineare Gleichungssysteme | Der Funktionsbegriff (Funktionen, 12 Aufgabentypen); Lineare Funktionen (Funktionen, 12 Aufgabentypen); Lineare Gleichungssysteme (Algebra, 11 Aufgabentypen) |
| LB 4: Ähnlichkeit | Ähnlichkeit (Geometrie, 10 Aufgabentypen) |
| LB 5: Vernetzung: Heuristische Strategien | UND, ODER, NICHT & Strategien (Fundament, 11 Aufgabentypen) |

### Klasse 9 – Wendelgang

| Lernbereich | Module im Spiel |
|---|---|
| LB 1: Funktionen und Potenzen | Potenzgesetze (Algebra, 9 Aufgabentypen); Wurzeln & reelle Zahlen (Zahlen, 10 Aufgabentypen); Quadratische Funktionen (Funktionen, 11 Aufgabentypen); Quadratische Gleichungen (Algebra, 11 Aufgabentypen); Potenzfunktionen (Funktionen, 9 Aufgabentypen); Indirekter Beweis (Fundament, 8 Aufgabentypen) |
| LB 2: Kreise, Kreiszylinder und Kugeln | Kreis, Zylinder & Kugel (Geometrie, 9 Aufgabentypen) |
| LB 3: Rechtwinklige Dreiecke | Satzgruppe des Pythagoras (Geometrie, 11 Aufgabentypen); Sinus, Kosinus, Tangens (Geometrie, 12 Aufgabentypen); Indirekter Beweis (Fundament, 8 Aufgabentypen) |
| LB 4: Auswerten von Daten | Daten auswerten (Zufall, 11 Aufgabentypen) |
| LB 5: Vernetzung: Mathematik und moderne Rechentechnik | – |

### Klasse 10 – Kuppelsaal

| Lernbereich | Module im Spiel |
|---|---|
| LB 1: Wachstumsvorgänge und periodische Vorgänge | Exponentielles Wachstum (Funktionen, 12 Aufgabentypen); Sinusfunktion (Funktionen, 10 Aufgabentypen); Schlussstein: Modelle wählen (Fundament, 8 Aufgabentypen) |
| LB 2: Diskrete Zufallsgrößen | Zufallsgrößen & Erwartungswert (Zufall, 10 Aufgabentypen) |
| LB 3: Algebraisches Lösen geometrischer Probleme | Sinussatz & Kosinussatz (Geometrie, 8 Aufgabentypen) |
| LB 4: Funktionale Zusammenhänge | Logarithmen (Algebra, 10 Aufgabentypen); Umkehrfunktion & Verkettung (Funktionen, 10 Aufgabentypen); Galerie der Funktionen (Funktionen, 8 Aufgabentypen); Zahlenfolgen & Grenzwert (Funktionen, 12 Aufgabentypen); Schlussstein: Modelle wählen (Fundament, 8 Aufgabentypen) |
| LB 5: Vernetzung: Zinsrechnung | Zinsen & Zinseszins (Zahlen, 8 Aufgabentypen) |

### Klasse 11/12 – Sternwarte

| Lernbereich | Module im Spiel |
|---|---|
| LB 1: Differentialrechnung | Grenzwerte von Funktionen (Funktionen, 7 Aufgabentypen); Ableitung (Funktionen, 11 Aufgabentypen); Kurven untersuchen (Funktionen, 9 Aufgabentypen) |
| LB 2: Matrizen | Matrizen (Algebra, 8 Aufgabentypen) |
| LB 3: Vektoren, Geraden und Ebenen | Vektoren & Geraden (Geometrie, 10 Aufgabentypen) |
| LB 4: Binomialverteilte Zufallsgrößen | Binomialverteilung (Zufall, 8 Aufgabentypen) |
| LB 5: Integralrechnung | Integralrechnung (Funktionen, 9 Aufgabentypen) |
| LB 6: Beurteilende Statistik | Binomialverteilung (Zufall, 8 Aufgabentypen) |
| LB 7: Abstände und Winkel | Skalarprodukt, Winkel & Abstände (Geometrie, 9 Aufgabentypen) |
| LB 8: Weitere Anwendungen | – |

Insgesamt 70 Module und 633 Aufgabentypen.

Nicht abgebildet sind die Lernbereiche mit Wahlcharakter sowie Inhalte, die der Lehrplan ausdrücklich
an Hilfsmittel bindet (CAS, Tabellenkalkulation, dynamische Geometriesoftware, Regression). Deshalb
haben zwei Lernbereiche kein eigenes Modul: „Mathematik und moderne Rechentechnik“ (Klasse 9, LB 5) und
„Weitere Anwendungen“ (Klasse 11/12, LB 8).

## Zur Anlehnung an Zauberschul-Geschichten

Stimmung und Aufbau sind von Geschichten über Zauberschulen inspiriert. Die Welt der Akademie
Silberzirkel ist jedoch eigenständig: Es werden keine Namen, Figuren, Orte oder Begriffe aus
„Harry Potter“ oder anderen geschützten Werken verwendet.

## Technik

Die App ist eine schlanke Android-Hülle (Kotlin, eine `Activity` mit `WebView`) um ein Spiel aus
HTML, CSS und JavaScript, das komplett in der APK liegt.

```
app/src/main/java/…/MainActivity.kt   Android-Hülle, Zurück-Taste, Bild in Galerie speichern
app/src/main/assets/www/
  index.html, css/style.css          Oberfläche
  js/util.js                          Zufall, Bruchrechnung, Formelsatz, Aufgaben-Bausteine
  js/fig.js                           Zeichnungen (SVG): Graphen, Dreiecke, Baumdiagramme …
  js/world.js                         Türme, Klassenstufen, Ränge, Sammelkarten, Abzeichen, Laden
  js/mods-a.js, js/mods-b.js          Module mit Schriftrollen und Voraussetzungen
  js/tasks-*.js                       Aufgaben-Generatoren je Klassenstufe
  js/engine.js                        Spielstand, Aufgabenfolgen, Belohnungen
  js/ui-*.js, atelier.js, klang.js    Bildschirme, Atelier, Klangkammer
  js/audio.js                         Klänge (werden errechnet, keine Tondateien)
tools/                                Tests und Hilfsskripte (Node.js)
```

### Bauen

Voraussetzungen: JDK 17 oder neuer und das Android-SDK (Plattform 36).

```
./gradlew assembleRelease
```

Die APK liegt danach unter `app/build/outputs/apk/release/app-release.apk`.

### Tests

```
node tools/test-tasks.js      # führt jeden Aufgaben-Generator hundertfach aus und prüft die Ergebnisse
node tools/flow.js            # spielt das Spiel im Browser automatisch durch (benötigt Playwright)
node tools/sample.js 8-binom  # zeigt Beispielaufgaben eines Moduls als Text
node tools/lehrplan.js        # gibt die Lehrplan-Zuordnung als Tabelle aus
```

### Signatur

Die APK wird mit dem Schlüssel `signing/sideload.jks` signiert. Er liegt absichtlich im Repository
(wie ein Debug-Schlüssel), damit jede gebaute Version über eine ältere installiert werden kann, ohne
dass der Spielstand verloren geht. Für eine Veröffentlichung im Play Store muss ein eigener, geheimer
Schlüssel verwendet werden.

## Lizenzen

Die Überschriften verwenden die Schrift „Cinzel“ (SIL Open Font License 1.1, siehe
`app/src/main/assets/www/fonts/Cinzel-OFL.txt`).

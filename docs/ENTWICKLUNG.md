# Silberzirkel – Entwicklungshergang und Rahmenbedingungen

Dieses Dokument hält fest, **wie** die App entstanden ist, **welche Vorgaben** galten, **welche
Entscheidungen** dabei getroffen wurden und **was man wissen muss**, um sie an anderer Stelle
weiterzuentwickeln oder anzupassen. Die technische Architektur steht getrennt in
[`ARCHITEKTUR-arc42.md`](ARCHITEKTUR-arc42.md).

| | |
|---|---|
| Produkt | „Silberzirkel – Akademie der Zahlenmagie“, Android-App |
| Version | 1.0.0 (versionCode 1) |
| Paketname | `de.silberzirkel.akademie` |
| Repository / Branch | `hahnhann/Test`, Branch `claude/harry-potter-math-game-android-9zj250` |
| Entwicklung | November 2026, in einer Claude-Code-Sitzung (KI-Assistent) im Auftrag des Repository-Inhabers |
| Fertige APK | [`dist/Silberzirkel-1.0.0.apk`](../dist/Silberzirkel-1.0.0.apk) |

---

## 1. Auftrag (Originalwortlaut, sinngemäß zusammengefasst)

> Erzeuge eine **Android-App** mit einem **Mathe-Spiel**, das für eine **Schülerin am Gymnasium in
> Sachsen** sehr spannend ist und **an Harry Potter angelehnt** ist. Die Schülerin wählt ihre
> **Klassenstufe selbst**, **Standard ist Klasse 8**. Der Lerninhalt muss dem **sächsischen
> Lehrplan** entsprechen. Die Schülerin soll eine **Vorstellung vom „Gebäude der Mathematik“**
> bekommen; das Spiel soll **immer wieder auf die zurückliegenden Jahre** verweisen. Es muss für
> eine **eher künstlerisch-musisch begabte** Schülerin spannend sein, also ein
> **Belohnungssystem** haben. Es soll **ohne KI auf dem Handy** laufen und den Mathematikunterricht
> so abbilden, **als ob es ein Mathematikstudium ist – nur spielerisch**.

### 1.1 Aus dem Auftrag abgeleitete Anforderungen

| Nr. | Anforderung | Umsetzung |
|---|---|---|
| A1 | Android-App, läuft auf dem Handy | Native Android-Hülle (Kotlin) mit eingebettetem Spiel (HTML/JS), signierte APK |
| A2 | Ohne KI, offline | Alle Aufgaben werden lokal durch feste Rechenvorschriften (Generatoren) erzeugt; keine Internet-Berechtigung |
| A3 | Klassenstufe wählbar, Standard 8 | Auswahl 5 … 11/12 in Einführung und Einstellungen; `klasse: 8` im Anfangszustand |
| A4 | Sächsischer Lehrplan | Offizieller Lehrplan Gymnasium Mathematik Sachsen (2019, Änderungen bis 2021) als Quelle; jedes Modul trägt seine Lernbereichsnummer(n) |
| A5 | „Gebäude der Mathematik“ | Schloss mit Fundament + 5 Türmen, Stockwerke = Klassenstufen, Module mit Voraussetzungen (`pre`), Ansicht „Im Gebäude zeigen“ |
| A6 | Rückbezug auf frühere Jahre | Jede Übung/Prüfung mischt Fundament-Aufgaben aus Vorgängermodulen ein; Fehler dort erzeugen einen „Riss“, der repariert werden muss; Lösungswege verweisen auf „(Klasse 6)“ usw. |
| A7 | Spannend für künstlerisch-musische Schülerin | Belohnungen: Sternenstaub, Sterne, Ränge, Sammelkarten, Abzeichen, Kaleidoskop-Atelier, Klangkammer (Sequencer), Zirkel-Farben, „Kunst & Klang“-Abschnitt in jeder Lektion |
| A8 | Wie ein Studium | Module mit Leistungspunkten (LP), Schriftrolle wie eine Vorlesung (Idee, Definitionen, Sätze mit Begründung, Beispiel, Stolperfalle), Übung und Prüfung, Studienbuch |
| A9 | „Angelehnt an Harry Potter“ | Eigene Zauberakademie-Welt **ohne** geschützte Namen, Figuren, Orte oder Begriffe (siehe 3.2) |

---

## 2. Chronologie der Entwicklung

| Schritt | Inhalt | Commit |
|---|---|---|
| 1 | Erkundung der Umgebung: leeres Repository, kein Android-SDK, Netzwerk für `dl.google.com` und den Lehrplan-Server gesperrt. Eigene Cloud-Umgebung „Test“ mit Freigabe von `dl.google.com` und `www.schulportal.sachsen.de` angelegt (vom Nutzer bestätigt). | – |
| 2 | Lehrplan als PDF vom Schulportal Sachsen geladen, Text extrahiert, Lernbereiche je Klassenstufe erfasst (Kl. 5: 5 LB, 6: 5, 7: 4, 8: 5, 9: 5, 10: 5, 11/12 Grundkurs: 8). | – |
| 3 | Android-SDK (Command-line Tools, Plattform 36, Build-Tools 36) installiert; Gradle-Wrapper erzeugt. | – |
| 4 | Grundgerüst: Gradle-Projekt, `MainActivity` mit WebView, Manifest, Symbol, Theme; Spielwelt (`world.js`), Hilfsbibliotheken (`util.js`, `fig.js`), Engine. | `41a8b4b` |
| 5 | Module und Aufgabengeneratoren Klasse 5–8. | `c6301cf` |
| 6 | Oberfläche (Schloss, Modulblatt, Lektion, Quest, Ergebnis, Schatzkammer, Studienbuch), Klänge (WebAudio), Atelier, Klangkammer, Module/Aufgaben Klasse 9–12. | `4a9c34f` |
| 7 | Prüf- und Qualitätsphase: automatischer Test aller Generatoren (Tausende Aufgaben je Lauf), Playwright-Durchlauf im Browser, Bildschirmfotos, Gegenlesen von Stichproben aller Module auf Rechen- und Formulierungsfehler, Korrektur des Formelsatzes, README mit Lehrplantabelle, CI-Workflow, minSdk 26, Gradle 9.9.1, APK unter `dist/`. | `d6b2232` |
| 8 | Einrichtungsskript für die Cloud-Umgebung gespeichert (installiert Android-SDK beim Sitzungsstart). Anleitung zur Installation auf dem Handy. | – |
| 9 | Dieses Dokument und die arc42-Architekturbeschreibung (`docs/`), Verweis in der README. | – |

### 2.1 Wesentliche Probleme und ihre Lösung

| Problem | Lösung |
|---|---|
| Downloads von Google und Schulportal durch Netzwerkrichtlinie gesperrt | Eigene Cloud-Umgebung mit genau diesen zwei Hosts |
| Lokal installiertes Gradle zu alt für AGP 9.x | Wrapper in leerem Verzeichnis erzeugt, später auf Gradle 9.9.1 aktualisiert; Prüfsumme des Wrapper-JAR mit offizieller verglichen |
| Maven Central antwortete gelegentlich mit HTTP 429 | Build einfach wiederholt (gelingt beim 2. Versuch) |
| Push zu GitHub zunächst mit 403 abgelehnt (fehlende Schreibrechte der GitHub-App) | Nach Freigabe durch den Nutzer erfolgreich gepusht |
| Kein Android-Emulator möglich (keine Hardware-Virtualisierung im Container) | Spiellogik im Chromium-Browser per Playwright getestet; APK per `apksigner verify` und `aapt2 dump badging` geprüft. **Ein Test auf einem echten Gerät steht noch aus.** |
| Formelsatz: Brüche im Exponenten, `a^2b`, `<`/`>`, verschachtelte Klammern in `vec(…)` | Mini-Formelsprache schrittweise robust gemacht; der Test meldet jetzt nicht umgesetzte Formelbausteine |
| Einzelne Generatoren erzeugten triviale, doppelte oder ungrammatische Aufgaben | Durch Stichproben (`tools/sample.js`) gefunden und korrigiert; Test prüft doppelte/zu wenige Antwortoptionen |

---

## 3. Rahmenbedingungen

### 3.1 Fachliche Rahmenbedingungen

- **Lehrplan:** „Lehrplan Gymnasium Mathematik“, Sächsisches Staatsministerium für Kultus,
  Fassung 2019 (Überarbeitungen bis 2021). Klassen 11/12 folgen dem **Grundkurs**.
- **Nicht abgebildet:** Lernbereiche mit Wahlcharakter sowie Inhalte, die der Lehrplan an
  Hilfsmittel bindet (CAS, Tabellenkalkulation, dynamische Geometriesoftware, Regression). Daher
  ohne eigenes Modul: „Mathematik und moderne Rechentechnik“ (Kl. 9, LB 5) und „Weitere
  Anwendungen“ (Kl. 11/12, LB 8).
- **Zuordnung Modul ↔ Lernbereich:** Tabelle in der [README](../README.md), erzeugt mit
  `node tools/lehrplan.js`.
- **Sprache:** Deutsch, Schreibweisen wie im sächsischen Unterricht (Dezimalkomma, `·` als
  Malpunkt, `(x|y)` für Punkte, `ℕ ⊂ ℤ ⊂ ℚ ⊂ ℝ`).
- **Zielgruppe:** Schülerin; Ränge und Ansprache sind daher standardmäßig weiblich
  (umschaltbar auf männliche Formen, `g: 'f' | 'm'`).

### 3.2 Rechtliche Rahmenbedingungen

- **Keine geschützten Inhalte aus Harry Potter.** Die App ist nur *angelehnt* an
  Zauberschul-Geschichten: eigene Akademie („Silberzirkel“), eigene Zirkel (Spirale, Rosette,
  Echo, Polarstern), eigener Rabe „Quod“ als Begleiter, eigene Zaubersprüche aus mathematischem
  Latein. Bei Erweiterungen **keine** Namen, Figuren, Orte, Häuser, Begriffe, Logos oder Musik
  aus Harry Potter oder anderen Werken übernehmen.
- **Schrift:** Cinzel (SIL Open Font License, Lizenztext in `www/fonts/Cinzel-OFL.txt`).
- **Mathematikerkarten:** nur historische Fakten, keine Fotos/Porträts.
- **Datenschutz:** Keine Datenerhebung, keine Netzwerkzugriffe, keine Werbung, kein Konto.
  Der Spielstand liegt ausschließlich lokal auf dem Gerät.

### 3.3 Technische Rahmenbedingungen

| Thema | Vorgabe / Stand |
|---|---|
| Android | minSdk 26 (Android 8.0), targetSdk/compileSdk 36 |
| Build | Android Gradle Plugin 9.5.1 (mit eingebautem Kotlin), Gradle 9.9.1 (Wrapper), JDK 21 |
| Berechtigungen | nur `VIBRATE`; **keine** `INTERNET`-Berechtigung |
| Signatur | Schlüssel `signing/sideload.jks`, Alias und Passwörter `silberzirkel` – **absichtlich nicht geheim**, damit Updates über die alte Version installierbar bleiben. Für den Play Store einen eigenen, geheimen Schlüssel verwenden. |
| Spielcode | Reines ES5-JavaScript ohne Bibliotheken, ohne Build-Schritt, ohne npm-Abhängigkeiten |
| Größe | APK ca. 320 KB (R8-Minimierung, Ressourcen-Shrinking) |
| Tests | Node.js ≥ 18 für Generator-Tests; Playwright + Chromium für Oberflächentests |
| CI | GitHub Actions: Generator-Test (200 Durchläufe) + `assembleRelease`, APK als Artefakt |

### 3.4 Entwicklungsumgebung (Cloud)

- Cloud-Umgebung „Test“ (persönlich): Netz begrenzt auf Paketquellen sowie `dl.google.com`
  und `www.schulportal.sachsen.de`.
- Einrichtungsskript installiert beim Start einer frischen Sitzung die Android Command-line
  Tools, `platform-tools`, `platforms;android-36`, `build-tools;36.0.0` nach `/opt/android-sdk`
  und schreibt `Test/local.properties`. Jeder Schritt ist fehlertolerant.
- `local.properties` ist in `.gitignore` und muss auf jeder Maschine selbst angelegt werden
  (`sdk.dir=…`) oder `ANDROID_HOME` gesetzt sein.

---

## 4. Wichtige Entscheidungen (Kurzfassung)

Ausführlich mit Begründung in arc42, Kapitel 9.

| Nr. | Entscheidung | Kurzbegründung |
|---|---|---|
| E1 | WebView-Hülle + HTML/CSS/JS statt nativer Compose-Oberfläche | Reiche Typografie für Formeln, SVG-Grafiken, Canvas/WebAudio für Kunst & Klang; im Browser testbar ohne Emulator; später auch als Web-App/iOS-Hülle nutzbar |
| E2 | Aufgaben durch Generatoren statt fester Aufgabenliste | Unbegrenzte Abwechslung, kleine App, keine KI nötig, jede Aufgabe mit Lösungsweg |
| E3 | Eigene Mini-Formelsprache (`$…$`) statt MathJax/KaTeX | Keine externen Bibliotheken, sehr klein, offline, genau auf Schulmathematik zugeschnitten |
| E4 | Spielstand in `localStorage` (JSON) | Einfach, robust, keine Berechtigungen; Versionsfeld `v` für spätere Migration |
| E5 | Fester, öffentlicher Sideload-Schlüssel | Updates ohne Datenverlust bei privater Verteilung |
| E6 | Gebäude-Metapher mit Voraussetzungsgraph | Macht den Aufbau der Mathematik sichtbar; Basis für Rückbezug und „Risse“ |
| E7 | Belohnungen kreativ statt nur Punkte | Zielgruppe künstlerisch-musisch: Atelier und Klangkammer als freischaltbare Werkzeuge |

---

## 5. Leitfaden für Weiterentwicklung und Anpassung

### 5.1 Schnellstart

```bash
git clone https://github.com/hahnhann/Test.git && cd Test
git checkout claude/harry-potter-math-game-android-9zj250
echo "sdk.dir=/pfad/zum/android-sdk" > local.properties   # oder ANDROID_HOME setzen
node tools/test-tasks.js 300          # alle Aufgabengeneratoren prüfen
./gradlew assembleRelease             # APK: app/build/outputs/apk/release/app-release.apk
```

Spiel ohne Android ansehen: `app/src/main/assets/www/index.html` direkt im Browser öffnen
(Chrome/Chromium, Fensterbreite wie ein Handy).

### 5.2 Typische Anpassungen

| Ziel | Wo | Hinweise |
|---|---|---|
| Neue Aufgabe zu einem Modul | `www/js/tasks-<klasse>.js` | `G('modul-id', schwierigkeit 1–3, function () { … return NUM/MC/…; })`; Generator darf `null` liefern (wird wiederholt). Danach `node tools/sample.js modul-id 10` und `node tools/test-tasks.js 300`. |
| Neues Modul | `www/js/mods-a.js` (Kl. 5–7) bzw. `mods-b.js` (8–12) | Felder `id, k, lb, t, icon, name, spell, lp, pre, idea, defs, rules, ex, trap, art`; `pre` nur auf bestehende Module; mindestens ~6 Generatoren in drei Schwierigkeiten anlegen. |
| Anderes Bundesland / anderer Lehrplan | `world.js` (`SZ.KLASSEN` mit Lernbereichen), `lb`-Felder der Module, ggf. neue Module | Struktur bleibt; Lehrplantabelle mit `node tools/lehrplan.js` neu erzeugen und in README übernehmen. |
| Leistungskurs 11/12 | neue Module mit `k: 11`, höhere `lp` | Ggf. Klassenauswahl um „11/12 LK“ erweitern (`SZ.KLASSEN`). |
| Belohnungen ändern | `world.js`: `SZ.RANKS`, `SZ.CARDS`, `SZ.BADGES`, `SZ.SHOP`; Beträge in `engine.js` (`SZ.Run`) | Bedingungen der Abzeichen in `SZ.checkBadges`. |
| Gestaltung | `www/css/style.css` (Farbvariablen am Anfang), Zirkel-Farben in `SZ.ZIRKEL` | |
| Neue Version veröffentlichen | `app/build.gradle.kts`: `versionCode` +1, `versionName` | Gleichen Schlüssel verwenden, sonst geht der Spielstand beim Update verloren. Neue APK nach `dist/` kopieren. |
| Play Store | eigener Upload-Schlüssel (nicht im Repository), App-Bundle `./gradlew bundleRelease`, Datenschutzerklärung (keine Datenerhebung), Altersfreigabe | |
| iOS / Web | Ordner `www/` ist eigenständig lauffähig | Für iOS eine WKWebView-Hülle; Bridge-Funktionen (`AndroidBridge`) sind optional und werden abgefragt. |

### 5.3 Qualitätsregeln, die beibehalten werden sollten

1. **Jede Aufgabe hat Lösung, Lösungsweg (`sol`) und möglichst einen Tipp (`hint`).**
2. **Fachlich korrekt vor originell:** Neue Generatoren mit `tools/sample.js` gegenlesen.
3. **Keine trivialen oder mehrdeutigen Aufgaben** (z. B. Faktor 1, doppelte Antwortoptionen).
4. **Rückbezüge** im Lösungsweg nennen („Klasse 7“), damit das Gebäude sichtbar bleibt.
5. **Offline bleiben:** keine Netzwerkzugriffe, keine Tracking- oder Werbe-Bibliotheken.
6. **Keine fremden geschützten Inhalte** (siehe 3.2).
7. Vor jedem Commit: `node tools/test-tasks.js 300` und `node tools/flow.js` grün.

### 5.4 Offene Punkte / bekannte Einschränkungen

- Test auf einem echten Android-Gerät steht aus (Zurück-Taste, Ton, Vibration, Galerie-Speichern,
  Eingabe per Tastenfeld, Lesbarkeit auf kleinen Bildschirmen).
- Bilder aus dem Atelier lassen sich erst ab Android 10 in der Galerie speichern.
- Generator `11-matrix` #3 liefert relativ oft `null` (wird von der Engine wiederholt, unkritisch).
- Spielstand-Export/-Import (z. B. Gerätewechsel) ist nicht vorhanden.
- Keine Barrierefreiheits-Prüfung (Screenreader) durchgeführt.
- Kein Leistungskurs-Pfad für 11/12.

---

## 6. Maschinenlesbare Kurzfassung

```json
{
  "produkt": "Silberzirkel – Akademie der Zahlenmagie",
  "version": "1.0.0",
  "paket": "de.silberzirkel.akademie",
  "plattform": { "android_min_sdk": 26, "target_sdk": 36, "agp": "9.5.1", "gradle": "9.9.1", "jdk": 21 },
  "architektur": "Kotlin-Activity mit WebView; Spiel in HTML/CSS/ES5-JavaScript unter app/src/main/assets/www",
  "ki": false,
  "netzwerk": false,
  "berechtigungen": ["android.permission.VIBRATE"],
  "lehrplan": { "quelle": "Lehrplan Gymnasium Mathematik Sachsen 2019 (Stand 2021)", "klassen": [5, 6, 7, 8, 9, 10, "11/12 Grundkurs"], "standard_klasse": 8 },
  "umfang": { "module": 70, "generatoren": 633, "leistungspunkte": 263, "karten": 25, "abzeichen": 18, "shop_artikel": 14, "raenge": 10 },
  "spielstand": { "speicher": "localStorage", "schluessel": "silberzirkel.v1" },
  "signatur": { "keystore": "signing/sideload.jks", "alias": "silberzirkel", "geheim": false },
  "tests": ["node tools/test-tasks.js 300", "node tools/flow.js"],
  "build": "./gradlew assembleRelease",
  "ci": ".github/workflows/build.yml",
  "rechtliches": { "harry_potter_inhalte": false, "schrift": "Cinzel (OFL)" },
  "offen": ["Test auf echtem Gerät", "Spielstand-Export", "Barrierefreiheit", "Leistungskurs 11/12"]
}
```

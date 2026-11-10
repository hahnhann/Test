// Prüft alle Aufgaben-Generatoren: Jeder wird viele Male ausgeführt und auf Fehler untersucht.
// Aufruf: node tools/test-tasks.js [Anzahl Durchläufe je Generator]
const SZ = require('./load.js');
const N = +(process.argv[2] || 300);
const plain = (h) => String(h).replace(/<svg[\s\S]*?<\/svg>/g, '').replace(/<[^>]*>/g, '').replace(/\s+/g, ' ').trim();
let errors = 0, warnings = 0, total = 0, gens = 0;
const err = (m) => { errors++; if (errors < 60) console.log('FEHLER  ' + m); };
const warn = (m) => { warnings++; if (warnings < 60) console.log('Hinweis ' + m); };

// Struktur der Welt
SZ.MODS.forEach((m) => {
  (m.pre || []).forEach((p) => {
    if (!SZ.MOD[p]) err(m.id + ': Voraussetzung ' + p + ' existiert nicht');
    else if (SZ.MOD[p].k > m.k) err(m.id + ': Voraussetzung ' + p + ' liegt in einer höheren Klasse');
  });
  if (!SZ.tower(m.t)) err(m.id + ': unbekannter Turm ' + m.t);
  const kl = SZ.klasse(m.k);
  m.lb.forEach((lb) => { if (!kl.lbs[lb - 1]) err(m.id + ': Lernbereich ' + lb + ' gibt es in Klasse ' + m.k + ' nicht'); });
  ['idea', 'trap', 'art'].forEach((f) => { if (!m[f]) err(m.id + ': Feld ' + f + ' fehlt'); });
  const texts = [m.idea, m.trap, m.art].concat(m.ex, ...m.defs, ...m.rules);
  texts.forEach((t) => {
    const h = plain(SZ.T(t));
    if (/[\$^]|\{[^}]*\/[^}]*\}|undefined|\\/.test(h)) err(m.id + ': Formelsatz-Rest in Schriftrolle: ' + h.slice(0, 90));
    if ((String(t).match(/\$/g) || []).length % 2) err(m.id + ': ungerade Anzahl $ in: ' + String(t).slice(0, 60));
  });
  const n = (SZ.gen[m.id] || []).length;
  if (n === 0) err(m.id + ': keine Aufgaben-Generatoren');
  else if (n < 5) warn(m.id + ': nur ' + n + ' Generatoren');
  if (n && !(SZ.gen[m.id] || []).some((x) => x.d === 1)) warn(m.id + ': kein leichter Generator (d = 1)');
});
Object.keys(SZ.gen).forEach((id) => { if (!SZ.MOD[id]) err('Generatoren für unbekanntes Modul ' + id); });
SZ.CARDS.forEach((c) => c.mods.forEach((id) => { if (!SZ.MOD[id]) err('Karte ' + c.id + ': unbekanntes Modul ' + id); }));

// Generatoren
Object.keys(SZ.gen).forEach((id) => {
  SZ.gen[id].forEach((ge, gi) => {
    gens++;
    let nulls = 0; const types = {}; const seen = new Set();
    for (let i = 0; i < N; i++) {
      SZ.R.seed(1000 * gens + i);
      let t;
      try { t = ge.f(); } catch (e) { err(id + '#' + gi + ': Ausnahme ' + e.message); break; }
      if (t === null) { nulls++; continue; }
      total++;
      const where = id + '#' + gi + ' (Seed ' + (1000 * gens + i) + ')';
      if (!SZ.validTask(t)) { err(where + ': ungültige Aufgabe ' + JSON.stringify(t).slice(0, 200)); break; }
      const all = [t.q, t.sol, t.hint].concat(t.opts || [], t.items || [], t.pre || [], t.unit || []).map(plain).join(' | ');
      if (/[\$^]|\{[^}]*\/[^}]*\}|undefined|NaN|Infinity|\[object|\\/.test(all)) { err(where + ': Formelsatz-Rest: ' + all.slice(0, 220)); break; }
      if (/,\d*?0{5,}\d|\d{2,}9{6,}/.test(all)) { err(where + ': Rundungsartefakt: ' + all.slice(0, 220)); break; }
      if (!t.sol) warn(where + ': kein Lösungsweg');
      types[t.type] = 1;
      seen.add(plain(t.q) + (t.fig || '').length + (t.opts || []).join('') + JSON.stringify(t.ans || ''));
      if (t.type === 'mc') {
        const p = t.opts.map(plain);
        if (new Set(p).size !== p.length) { err(where + ': doppelte Antwortmöglichkeit: ' + p.join(' / ')); break; }
        if (p.length < 3) { err(where + ': nur ' + p.length + ' Antwortmöglichkeiten: ' + plain(t.q)); break; }
        if (p.some((x) => x === '')) { err(where + ': leere Antwortmöglichkeit'); break; }
      }
      if (t.type === 'num') {
        t.ans.forEach((a) => {
          const s = typeof a === 'number' ? SZ.M.de(a).replace(/ /g, '') : a.n + '/' + a.d;
          if (!SZ.checkNum(s, a, t.tol, t.reduced)) err(where + ': eigene Lösung wird nicht akzeptiert: ' + s);
          if (typeof a === 'number' && Math.abs(a) > 1e-9 && !t.tol && Math.abs(a * 1e4 - Math.round(a * 1e4)) > 1e-6) err(where + ': Lösung hat mehr als 4 Nachkommastellen ohne Toleranz: ' + a);
          if (typeof a === 'number' && SZ.checkNum(SZ.M.de(a + (t.tol || 0) * 3 + 1).replace(/ /g, ''), a, t.tol, t.reduced)) err(where + ': falsche Eingabe wird akzeptiert');
        });
      }
      if (t.type === 'ord' && new Set(t.items.map(plain)).size !== t.items.length) { err(where + ': doppelte Elemente in Reihenfolge-Aufgabe'); break; }
    }
    if (nulls > N * 0.5) warn(id + '#' + gi + ': liefert oft keine Aufgabe (' + nulls + '/' + N + ')');
    if (seen.size < 3 && N >= 50) warn(id + '#' + gi + ': nur ' + seen.size + ' verschiedene Aufgabentexte');
  });
});

// Aufgabenfolgen
SZ.Store.load();
SZ.MODS.forEach((m) => {
  if (!SZ.gen[m.id]) return;
  ['ueben', 'pruefung'].forEach((mode) => {
    for (let i = 0; i < 5; i++) {
      const q = SZ.buildQuest(m.id, mode), want = mode === 'pruefung' ? 8 : 6;
      if (q.tasks.length !== want) err(m.id + ' ' + mode + ': ' + q.tasks.length + ' statt ' + want + ' Aufgaben');
    }
  });
});
for (let k = 5; k <= 11; k++) {
  SZ.S.klasse = k;
  for (let i = 0; i < 10; i++) { const q = SZ.buildQuest(null, 'daily'); if (q.tasks.length !== 5) err('Rabenpost Klasse ' + k + ': ' + q.tasks.length + ' Aufgaben'); }
}
const withGen = SZ.MODS.filter((m) => SZ.gen[m.id]).length;
console.log('\n' + SZ.MODS.length + ' Module (' + withGen + ' mit Aufgaben), ' + gens + ' Generatoren, ' + total + ' Aufgaben erzeugt und geprüft.');
console.log(errors + ' Fehler, ' + warnings + ' Hinweise.');
process.exit(errors ? 1 : 0);

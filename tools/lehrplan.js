// Gibt die Zuordnung der Module zu den Lernbereichen des sächsischen Lehrplans als Markdown-Tabelle aus.
// Aufruf: node tools/lehrplan.js
const SZ = require('./load.js');
SZ.KLASSEN.forEach((c) => {
  console.log('\n### ' + c.label + ' – ' + c.floor + '\n');
  console.log('| Lernbereich | Module im Spiel |');
  console.log('|---|---|');
  c.lbs.forEach((lb, i) => {
    const mods = SZ.MODS.filter((m) => m.k === c.k && m.lb.indexOf(i + 1) >= 0).map((m) => m.name + ' (' + SZ.tower(m.t).short + ', ' + (SZ.gen[m.id] || []).length + ' Aufgabentypen)');
    console.log('| LB ' + (i + 1) + ': ' + lb + ' | ' + (mods.join('; ') || '–') + ' |');
  });
});
const n = Object.keys(SZ.gen).reduce((a, k) => a + SZ.gen[k].length, 0);
console.log('\nInsgesamt ' + SZ.MODS.length + ' Module und ' + n + ' Aufgabentypen.');

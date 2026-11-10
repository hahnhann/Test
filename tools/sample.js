// Zeigt Beispielaufgaben eines Moduls als Text. Aufruf: node tools/sample.js 8-binom [Anzahl]
const SZ = require('./load.js');
const id = process.argv[2], n = +(process.argv[3] || 2);
const plain = (h) => String(h).replace(/<svg[\s\S]*?<\/svg>/g, '[Bild]')
  .replace(/<span class="fr"><span>(.*?)<\/span><span>(.*?)<\/span><\/span>/g, '($1)/($2)')
  .replace(/<sup>(.*?)<\/sup>/g, '^$1').replace(/<sub>(.*?)<\/sub>/g, '_$1').replace(/<br>/g, ' / ').replace(/<[^>]*>/g, '').replace(/&nbsp;/g, ' ').replace(/&lt;/g, '<').replace(/&gt;/g, '>');
(SZ.gen[id] || []).forEach((ge, gi) => {
  for (let i = 0; i < n; i++) {
    const t = ge.f();
    if (!t) { console.log('#' + gi + ' (keine Aufgabe)'); continue; }
    console.log('#' + gi + ' d' + ge.d + ' [' + t.type + '] ' + plain(t.q) + (t.fig ? ' [Bild]' : ''));
    if (t.type === 'mc') console.log('     ' + t.opts.map((o, k) => (k === t.correct ? '>>' : '  ') + plain(o)).join('  |'));
    else console.log('     Lösung: ' + plain(SZ.solutionText(t)));
    console.log('     Weg: ' + plain(t.sol) + (t.hint ? '\n     Tipp: ' + plain(t.hint) : ''));
  }
});

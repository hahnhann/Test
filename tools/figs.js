// Zeigt Aufgaben mit Zeichnungen aus ausgewählten Modulen auf einer Seite (zur Sichtkontrolle).
// Aufruf: node tools/figs.js 5-flaeche 7-kreis ...   -> tools/shots/figs-<n>.png
const { chromium } = require('playwright');
const path = require('path');
const mods = process.argv.slice(2);
(async () => {
  const browser = await chromium.launch();
  const page = await (await browser.newContext({ viewport: { width: 1180, height: 900 }, deviceScaleFactor: 1 })).newPage();
  await page.goto('file://' + path.join(__dirname, '..', 'app', 'src', 'main', 'assets', 'www', 'index.html'));
  await page.evaluate((mods) => {
    document.body.style.background = '#1a1740';
    let h = '<div style="display:grid;grid-template-columns:repeat(4,1fr);grid-gap:10px;padding:10px;max-width:none">';
    mods.forEach((id) => {
      SZ.gen[id].forEach((ge, gi) => {
        let t = null;
        for (let k = 0; k < 20 && !t; k++) { try { t = ge.f(); } catch (e) { t = null; } }
        if (!t || (!t.fig && !/class="(mat|vecc|intg|tb)"/.test(t.q + (t.opts || []).join('')))) return;
        h += '<div class="parch" style="font-size:13px"><b style="font-size:11px;color:#7a6233">' + id + ' #' + gi + '</b><div class="q" style="font-size:13.5px">' + t.q + '</div>' + (t.fig || '') + (t.opts ? '<div style="font-size:12.5px;margin-top:6px">' + t.opts.map((o, i) => (i === t.correct ? '✔ ' : '· ') + o).join('<br>') + '</div>' : '') + '</div>';
      });
    });
    document.getElementById('app').style.maxWidth = 'none';
    document.getElementById('app').innerHTML = h + '</div>';
  }, mods);
  await page.screenshot({ path: path.join(__dirname, 'shots', 'figs.png'), fullPage: true });
  await browser.close();
})();

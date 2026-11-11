// Spielt das Spiel automatisch im mitgelieferten Chromium durch und prüft den Ablauf.
// Aufruf: node tools/flow.js   (Bildschirmfotos landen in tools/shots/)
const { chromium } = require('playwright');
const path = require('path');
const out = (n) => path.join(__dirname, 'shots', n + '.png');
const url = 'file://' + path.join(__dirname, '..', 'app', 'src', 'main', 'assets', 'www', 'index.html');
let failed = 0;
const check = (ok, msg) => { if (!ok) { failed++; console.log('FEHLER: ' + msg); } };

async function answer(page, correct) {
  const t = await page.evaluate(() => { const q = SZ.UI.currentRun(), t = q.run.task(); return { type: t.type, correct: t.correct, ans: t.ans, n: t.ans && t.ans.length, order: t.order, items: t.items }; });
  if (t.type === 'mc') await page.click('.opt[data-i="' + (correct ? t.correct : (t.correct + 1) % 3) + '"]');
  else if (t.type === 'tf') await page.click('[data-act=tf][data-v="' + ((t.ans === correct) ? 1 : 0) + '"]');
  else if (t.type === 'num') {
    for (let i = 0; i < t.n; i++) {
      await page.click('#box' + i);
      const a = t.ans[i];
      let s = typeof a === 'number' ? String(Math.round(a * 1e6) / 1e6).replace('.', ',') : a.n + '/' + a.d;
      if (!correct) s = '9999';
      const neg = s[0] === '-';
      for (const ch of s.replace('-', '')) await page.click('.pad [data-k="' + ch + '"]');
      if (neg) await page.click('.pad [data-k="-"]');
    }
    await page.click('.pad [data-k=ok]');
  } else {
    await page.evaluate((c) => { const q = SZ.UI.currentRun(), t = q.run.task(); q.order = t.order.map((o) => t.items.indexOf(o)); if (!c) q.order.reverse(); }, correct);
    await page.click('[data-act=check]');
  }
  await page.waitForSelector('#feedback');
}

(async () => {
  const browser = await chromium.launch();
  const ctx = await browser.newContext({ viewport: { width: 390, height: 800 }, deviceScaleFactor: 2 });
  const page = await ctx.newPage();
  const errors = [];
  page.on('pageerror', (e) => errors.push('pageerror: ' + e.message));
  page.on('console', (m) => { if (m.type() === 'error') errors.push('console: ' + m.text()); });
  await page.goto(url);
  await page.click('[data-act=introNext]');
  await page.fill('#nm', 'Mira');
  await page.click('[data-act=introNext]');
  await page.click('[data-act=pickZirkel][data-id=echo]');
  await page.click('[data-act=introNext]');
  await page.click('[data-act=introNext]');
  await page.click('[data-act=introNext]');
  await page.waitForSelector('#building');

  // Übung in einem Modul: alles richtig
  await page.click('[data-act=mod][data-id="8-linear"]');
  await page.click('#sheet [data-act=quest][data-mode=ueben]');
  let shotDone = { fig: false };
  for (let i = 0; i < 6; i++) {
    const hasFig = await page.evaluate(() => !!SZ.UI.currentRun().run.task().fig);
    if (hasFig && !shotDone.fig) { await page.screenshot({ path: out('10-aufgabe-bild') }); shotDone.fig = true; }
    await answer(page, true);
    if (i === 1) await page.screenshot({ path: out('11-richtig') });
    await page.click('[data-act=next]');
  }
  await page.waitForSelector('.result');
  await page.waitForTimeout(700);
  await page.screenshot({ path: out('12-ergebnis-uebung') });
  let st = await page.evaluate(() => SZ.stars('8-linear'));
  check(st === 1, 'nach bestandener Übung 1 Stern erwartet, ist ' + st);

  // Prüfung: alles richtig -> 3 Sterne, Karte
  await page.click('[data-act=quest][data-mode=pruefung]');
  for (let i = 0; i < 8; i++) { await answer(page, true); await page.click('[data-act=next]'); }
  await page.waitForSelector('.result');
  await page.waitForTimeout(700);
  await page.screenshot({ path: out('13-ergebnis-pruefung'), fullPage: true });
  st = await page.evaluate(() => ({ s: SZ.stars('8-linear'), cards: SZ.S.cards.length, lp: SZ.lpOf(8)[0], dust: SZ.S.dust }));
  check(st.s === 3 && st.cards >= 1 && st.lp === 5 && st.dust > 100, 'Prüfung: ' + JSON.stringify(st));

  // Prüfung mit drei Fehlern -> nicht bestanden, Riss möglich
  await page.click('[data-act=tab][data-tab=schloss]');
  await page.click('[data-act=mod][data-id="8-lgs"]');
  await page.click('#sheet [data-act=quest][data-mode=pruefung]');
  for (let i = 0; i < 3; i++) {
    await answer(page, false);
    if (i === 0) await page.screenshot({ path: out('14-falsch') });
    await page.click('[data-act=next]');
  }
  await page.waitForSelector('.result');
  await page.screenshot({ path: out('15-ergebnis-nicht-bestanden'), fullPage: true });
  st = await page.evaluate(() => ({ s: SZ.stars('8-lgs'), cracks: SZ.MODS.filter((m) => SZ.cracked(m.id)).map((m) => m.id) }));
  check(st.s === 0, 'nicht bestandene Prüfung darf keine Sterne geben');
  console.log('Risse nach Fehlern:', st.cracks.join(', ') || '(keine)');

  // Rabenpost
  await page.click('[data-act=tab][data-tab=schloss]');
  await page.screenshot({ path: out('16-schloss-fortschritt') });
  await page.click('[data-act=daily]');
  for (let i = 0; i < 5; i++) { await answer(page, true); await page.click('[data-act=next]'); }
  await page.waitForSelector('.result');
  st = await page.evaluate(() => SZ.S.daily);
  check(st.streak === 1, 'Rabenpost-Serie: ' + JSON.stringify(st));

  // Im Gebäude zeigen
  await page.click('[data-act=tab][data-tab=schloss]');
  await page.click('[data-act=mod][data-id="8-lgs"]');
  await page.click('#sheet [data-act=trace]');
  await page.waitForTimeout(400);
  await page.screenshot({ path: out('17-gebaeude-zeigen') });
  await page.click('[data-act=untrace]');

  // Schatzkammer, Karten, Laden, Atelier, Klangkammer, Studienbuch
  await page.click('[data-act=tab][data-tab=schatz]');
  await page.screenshot({ path: out('18-schatzkammer') });
  await page.click('[data-act=open][data-s=cards]');
  await page.screenshot({ path: out('19-karten') });
  await page.click('.cardm[data-act=card]');
  await page.waitForTimeout(300);
  await page.screenshot({ path: out('20-karte') });
  await page.click('#sheet [data-act=closeSheet].btn');
  await page.click('[data-act=back]');
  await page.click('[data-act=open][data-s=shop]');
  await page.screenshot({ path: out('21-laden'), fullPage: true });
  await page.click('[data-act=back]');
  await page.click('[data-act=open][data-s=atelier]');
  const box = await page.locator('#cv').boundingBox();
  const cxm = box.x + box.width / 2, cym = box.y + box.height / 2;
  for (let k = 0; k < 3; k++) {
    await page.mouse.move(cxm + 20 + k * 30, cym - 10);
    await page.mouse.down();
    for (let a = 0; a <= 30; a++) await page.mouse.move(cxm + 20 + k * 30 + 40 * Math.sin(a / 5), cym - 10 - a * 3 - k * 6);
    await page.mouse.up();
    if (k === 0) await page.click('.sw:nth-of-type(4)');
    if (k === 1) await page.click('.sw:nth-of-type(6)');
  }
  await page.click('[data-act=aSave]');
  await page.waitForTimeout(300);
  await page.screenshot({ path: out('22-atelier'), fullPage: true });
  check((await page.evaluate(() => SZ.S.art.length)) === 1, 'Bild wurde nicht gespeichert');
  await page.click('[data-act=back]');
  await page.click('[data-act=open][data-s=klang]');
  await page.click('[data-act=kDemo]');
  await page.waitForTimeout(600);
  await page.screenshot({ path: out('23-klangkammer'), fullPage: true });
  await page.click('[data-act=kPlay]');
  await page.click('[data-act=kSave]');
  check((await page.evaluate(() => SZ.S.songs.length)) === 1, 'Melodie wurde nicht gespeichert');
  await page.click('[data-act=back]');
  await page.click('[data-act=tab][data-tab=buch]');
  await page.screenshot({ path: out('24-studienbuch'), fullPage: true });

  // Spielstand bleibt nach Neuladen erhalten
  await page.reload();
  await page.waitForSelector('#building');
  st = await page.evaluate(() => ({ s: SZ.stars('8-linear'), name: SZ.S.name }));
  check(st.s === 3 && st.name === 'Mira', 'Spielstand nach Neuladen: ' + JSON.stringify(st));

  // Zurück-Taste
  await page.click('[data-act=mod][data-id="8-terme"]');
  check((await page.evaluate(() => SZ.onBack())) === true, 'Zurück sollte das Blatt schließen');
  check((await page.evaluate(() => SZ.onBack())) === false, 'Zurück im Schloss sollte die App verlassen dürfen');

  console.log(errors.length ? errors.join('\n') : 'keine Fehler in der Konsole');
  console.log(failed ? failed + ' Prüfungen fehlgeschlagen' : 'Ablauf in Ordnung');
  await browser.close();
  process.exit(failed || errors.length ? 1 : 0);
})().catch((e) => { console.error(e); process.exit(1); });

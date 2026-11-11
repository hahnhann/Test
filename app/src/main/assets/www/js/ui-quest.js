/* Silberzirkel – Oberfläche, Teil 2: Aufgaben lösen und Ergebnis. */
(function (g) {
  'use strict';
  var SZ = g.SZ, UI = SZ.UI, esc = SZ.esc, H = SZ.H, $ = UI.$, $$ = UI.$$, doc = g.document;
  var Q = null;                                       // laufende Runde samt Eingaben
  var PRAISE = ['Richtig!', 'Genau!', 'Stark!', 'Zauberhaft!', 'Volltreffer!', 'Bravo!', 'Sauber gelöst!', 'q. e. d.!'];
  var NOPE = ['Noch nicht ganz.', 'Knapp daneben.', 'Das war es noch nicht.', 'Fast – schau dir den Weg an.'];

  UI.currentRun = function () { return Q; };             // für automatische Tests
  UI.act.quest = function (el) { UI.startQuest(el.getAttribute('data-id'), el.getAttribute('data-mode')); };
  UI.act.daily = function () { UI.startQuest(null, 'daily'); };
  UI.startQuest = function (id, mode) {
    UI.closeSheet(); UI.untrace();
    var quest = SZ.buildQuest(id, mode);
    if (!quest.tasks.length) { UI.toast('Für diesen Raum gibt es noch keine Aufgaben.'); return; }
    Q = { run: new SZ.Run(quest) };
    resetTask();
    UI.dropTop(['quest', 'result']);
    UI.go('quest', {});
  };
  function resetTask() {
    var t = Q.run.task();
    Q.vals = t.type === 'num' ? t.ans.map(function () { return ''; }) : [];
    Q.active = 0;
    Q.order = t.type === 'ord' ? t.items.map(function (_, i) { return i; }) : [];
    Q.hint = false;
    Q.answered = false;
  }
  function plainLen(html) { return String(html).replace(/<[^>]*>/g, '').length; }
  function fmtInput(v) {                              // Eingabe hübsch anzeigen, Brüche gestapelt
    if (v === '') return '';
    var neg = v.charAt(0) === '-', s = neg ? v.slice(1) : v, out;
    if (s.indexOf('/') >= 0) { var p = s.split('/'); out = H.fr(p[0] || '&nbsp;', p[1] || '&nbsp;'); }
    else out = s;
    return (neg ? '−' : '') + out;
  }
  function isWF(t) { return /Wahr oder falsch|Gilt das|Stimmt das/.test(t.q); }   // sonst Ja/Nein-Frage
  function heartsHtml(n) { return '<div class="hearts" id="hearts">' + '♥♥♥'.slice(0, Math.max(n, 0)) + '<s>' + '♥♥♥'.slice(Math.max(n, 0)) + '</s></div>'; }

  function answersHtml(t) {
    var h = '', i;
    if (t.type === 'mc') {
      var short = t.opts.length % 2 === 0 && t.opts.every(function (o) { return plainLen(o) <= 13; });
      h += '<div class="opts' + (short ? ' grid' : '') + '">' + t.opts.map(function (o, k) { return '<button class="opt" data-act="opt" data-i="' + k + '"><span class="k">' + 'ABCDE'.charAt(k) + '</span><span>' + o + '</span></button>'; }).join('') + '</div>';
    } else if (t.type === 'tf') {
      var wf = isWF(t);
      h += '<div class="tfrow"><button class="opt" data-act="tf" data-v="1">' + (wf ? '✓ Wahr' : '✓ Ja') + '</button><button class="opt" data-act="tf" data-v="0">' + (wf ? '✗ Falsch' : '✗ Nein') + '</button></div>';
    } else if (t.type === 'num') {
      h += '<div class="fields">';
      for (i = 0; i < t.ans.length; i++) h += '<div class="field">' + (t.pre[i] ? '<span class="pre">' + t.pre[i] + '</span>' : '') + '<button class="box' + (i === Q.active ? ' on' : '') + '" data-act="field" data-i="' + i + '" id="box' + i + '">' + fmtInput(Q.vals[i]) + '</button>' + (t.unit[i] ? '<span class="unit">' + t.unit[i] + '</span>' : '') + '</div>';
      h += '</div><div class="pad">';
      [['7'], ['8'], ['9'], ['del', '⌫', 'fn'], ['4'], ['5'], ['6'], ['/', '⁄ Bruch', 'fn'], ['1'], ['2'], ['3'], ['-', '±', 'fn'], ['0'], [',', ','], ['ok', 'Prüfen', 'ok']].forEach(function (k) {
        h += '<button data-act="key" data-k="' + k[0] + '" class="' + (k[2] || '') + '"' + (k[0] === '/' ? ' style="font-size:13px"' : '') + '>' + (k[1] || k[0]) + '</button>';
      });
      h += '</div>';
    } else if (t.type === 'ord') h += '<div class="ordl" id="ordl">' + ordHtml(t) + '</div>';
    return h;
  }
  function ordHtml(t) {
    return Q.order.map(function (idx, pos) {
      return '<div class="it"><span class="n">' + (pos + 1) + '</span><span class="tx">' + t.items[idx] + '</span><button data-act="ordmove" data-p="' + pos + '" data-d="-1"' + (pos === 0 ? ' disabled' : '') + '>▲</button><button data-act="ordmove" data-p="' + pos + '" data-d="1"' + (pos === Q.order.length - 1 ? ' disabled' : '') + '>▼</button></div>';
    }).join('');
  }

  UI.screens.quest = function () {
    var run = Q.run, t = run.task(), q = run.q, n = q.tasks.length, m = SZ.MOD[t.mod];
    var h = '<div class="screen quest" id="quest"><div class="qbar"><button class="x" data-act="quit">✕</button><div class="prog"><i style="width:' + Math.round(run.i / n * 100) + '%"></i></div>' + (q.mode === 'pruefung' ? heartsHtml(run.lives) : '<div class="qdust" id="qdust">✦ ' + run.dust + '</div>') + '</div>';
    h += '<div class="t-' + m.t + '">' + (t.fnd ? '<span class="chip fnd">🧱 Fundament · ' + esc(UI.modLabel(t.mod)) + '</span>' : '<span class="chip" style="border-color:var(--tc);color:var(--tc)">' + (q.mode === 'daily' ? '✉️ ' + esc(UI.modLabel(t.mod)) : (q.mode === 'pruefung' ? '🏆 Prüfung · ' : '') + esc(m.name)) + '</span>') + '<span class="chip">' + (run.i + 1) + ' / ' + n + '</span></div>';
    h += '<div class="parch"><div class="q">' + t.q + '</div>' + (t.fig || '') + '</div>';
    h += '<div class="answers" id="answers">' + answersHtml(t) + '</div><div id="hintbox"></div>';
    h += '<div class="qfoot">' + (q.mode !== 'pruefung' ? '<button class="btn ghost hintb" data-act="hint">💡 Tipp</button>' : '') + (t.type === 'ord' ? '<button class="btn" data-act="check">Prüfen</button>' : '') + '</div></div>';
    return h;
  };

  /* ---------- Eingaben ---------- */
  UI.act.opt = function (el) { submit(+el.getAttribute('data-i'), el); };
  UI.act.tf = function (el) { submit(el.getAttribute('data-v') === '1', el); };
  UI.act.field = function (el) {
    if (!Q || Q.answered) return;
    Q.active = +el.getAttribute('data-i');
    $$('.field .box').forEach(function (b, i) { b.classList.toggle('on', i === Q.active); });
  };
  UI.act.key = function (el) {
    if (!Q || Q.answered) return;
    var k = el.getAttribute('data-k'), v = Q.vals[Q.active], seg;
    if (k === 'ok') { check(el); return; }
    if (k === 'del') v = v.slice(0, -1);
    else if (k === '-') v = v.charAt(0) === '-' ? v.slice(1) : '-' + v;
    else if (k === ',') { seg = v.split('/').pop(); if (seg.indexOf(',') < 0 && v.length < 9) v += (seg === '' || seg === '-' ? '0,' : ','); }
    else if (k === '/') { if (/\d/.test(v) && v.indexOf('/') < 0 && v.length < 8) v += '/'; }
    else if (v.length < 9) v += k;
    Q.vals[Q.active] = v;
    var box = $('#box' + Q.active);
    if (box) box.innerHTML = fmtInput(v);
    SZ.Audio.sfx.tap();
  };
  UI.act.ordmove = function (el) {
    if (!Q || Q.answered) return;
    var p = +el.getAttribute('data-p'), d = +el.getAttribute('data-d'), o = Q.order, tmp = o[p];
    if (p + d < 0 || p + d >= o.length) return;
    o[p] = o[p + d]; o[p + d] = tmp;
    $('#ordl').innerHTML = ordHtml(Q.run.task());
    SZ.Audio.sfx.tap();
  };
  UI.act.check = function (el) { check(el); };
  function check(el) {
    if (!Q || Q.answered) return;
    var t = Q.run.task();
    if (t.type === 'num') {
      var empty = -1;
      Q.vals.forEach(function (v, i) { if (empty < 0 && !/\d/.test(v)) empty = i; });
      if (empty >= 0) {
        if (empty !== Q.active || Q.vals.length > 1) { Q.active = empty; $$('.field .box').forEach(function (b, i) { b.classList.toggle('on', i === Q.active); }); }
        UI.toast(Q.vals.length > 1 ? 'Fülle alle Felder aus.' : 'Tippe zuerst deine Antwort ein.');
        return;
      }
      submit(Q.vals.slice(), el);
    } else if (t.type === 'ord') submit(Q.order.map(function (i) { return t.items[i]; }), el);
  }
  UI.act.hint = function () {
    if (!Q || Q.answered) return;
    var t = Q.run.task(), m = SZ.MOD[t.mod], txt = t.hint || SZ.T(m.rules[0][0] + ': ' + m.rules[0][1]);
    Q.hint = true;
    $('#hintbox').innerHTML = '<div class="hintbox">💡 ' + txt + '</div>';
  };

  function submit(answer, el) {
    if (!Q || Q.answered) return;
    Q.answered = true;
    var run = Q.run, t = run.task(), res = run.answer(answer, Q.hint), ok = res.ok, box = $('#answers');
    box.classList.add('done');
    if (t.type === 'mc') {
      $$('.opt', box).forEach(function (b, i) { if (i === t.correct) b.classList.add('right'); else if (i === answer) b.classList.add('wrong'); else b.classList.add('dimmed'); });
    } else if (t.type === 'tf') {
      $$('.opt', box).forEach(function (b) { var v = b.getAttribute('data-v') === '1'; if (v === t.ans) b.classList.add('right'); else if (v === answer) b.classList.add('wrong'); else b.classList.add('dimmed'); });
    } else if (t.type === 'num') {
      $$('.field .box', box).forEach(function (b, i) { b.classList.remove('on'); b.classList.add(SZ.checkNum(answer[i], t.ans[i], t.tol, t.reduced) ? 'right' : 'wrong'); });
    }
    if (ok) {
      SZ.Audio.sfx.right(run.streak);
      var r = el && el.getBoundingClientRect ? el.getBoundingClientRect() : null;
      UI.sparks(r ? r.left + r.width / 2 : g.innerWidth / 2, r ? r.top + r.height / 2 : g.innerHeight / 2, 10);
    } else {
      SZ.Audio.sfx.wrong();
      try { if (g.navigator && g.navigator.vibrate) g.navigator.vibrate(50); } catch (e) { /* kein Vibrationsmotor */ }
    }
    var hearts = $('#hearts'), qd = $('#qdust');
    if (hearts) hearts.outerHTML = heartsHtml(run.lives);
    if (qd) qd.textContent = '✦ ' + run.dust;
    var last = run.i >= run.q.tasks.length - 1 || run.failed;
    var fb = doc.createElement('div');
    fb.className = 'feedback ' + (ok ? 'ok' : 'no');
    fb.id = 'feedback';
    var h = '<div>' + (ok ? '<span class="gain">+' + res.dust + ' ✦' + (run.streak >= 3 ? ' · Serie ×' + run.streak : '') + '</span>' : '') + '<h3>' + SZ.R.pick(ok ? PRAISE : NOPE) + '</h3>';
    if (!ok) {
      if (t.type === 'num' && t.reduced && t.ans.every(function (a, i) { return SZ.checkNum(answer[i], a, t.tol, false); })) h += '<div class="sol">Der Wert stimmt – aber der Bruch ist noch nicht vollständig gekürzt.</div>';
      h += '<div class="sol"><b>Richtig ist:</b> ' + (t.type === 'tf' ? (isWF(t) ? (t.ans ? 'Wahr' : 'Falsch') : (t.ans ? 'Ja' : 'Nein')) : SZ.solutionText(t)) + '</div>';
    }
    if (t.sol) h += '<div class="sol">' + (ok ? '' : '<b>Lösungsweg:</b> ') + t.sol + '</div>';
    if (!ok && t.fnd && t.mod !== run.q.id) h += '<div class="crackn">🧱 Dieser Stein stammt aus <b>' + esc(UI.modLabel(t.mod)) + '</b>. Dort ist jetzt ein Riss markiert – eine bestandene Übung in diesem Raum repariert ihn.</div>';
    if (run.failed) h += '<div class="crackn">Alle drei Herzen sind verbraucht.</div>';
    h += '<button class="btn wide" data-act="next">' + (last ? 'Zum Ergebnis' : 'Weiter') + '</button></div>';
    fb.innerHTML = h;
    doc.body.appendChild(fb);
    var quest = $('#quest');
    if (quest) quest.style.paddingBottom = (fb.firstChild.offsetHeight + 24) + 'px';
    SZ.Store.save();
  }
  function dropFeedback() { var fb = $('#feedback'); if (fb) fb.parentNode.removeChild(fb); }
  UI.act.next = function () {
    if (!Q) return;
    dropFeedback();
    if (Q.run.next()) { resetTask(); UI.go('quest', {}, true); }
    else { var res = Q.run.finish(); Q = null; UI.go('result', { res: res }, true); }
  };
  UI.act.quit = function () {
    if (!Q) { UI.home(); return; }
    UI.sheet('<h2 style="font-size:19px;margin-bottom:6px">Runde abbrechen?</h2><p class="mute">Die Sterne dieser Runde gehen verloren. Gesammelter Sternenstaub aus bereits gelösten Aufgaben verfällt.</p><div class="row"><button class="btn grow" data-act="closeSheet">Weitermachen</button><button class="btn ghost" data-act="quitYes">Abbrechen</button></div>');
  };
  UI.act.quitYes = function () {
    Q = null;
    dropFeedback();
    UI.closeSheet();
    SZ.Store.save();
    UI.dropTop(['quest', 'result']);
    UI.refresh();
  };

  /* ---------- Ergebnis ---------- */
  UI.screens.result = function (p) {
    var r = p.res, m = r.id ? SZ.MOD[r.id] : null, title, sub, btns = '', h = '<div class="screen result">';
    if (r.mode === 'ueben') {
      title = r.passed ? 'Übung bestanden!' : 'Noch nicht ganz';
      sub = r.passed ? (r.newStars ? 'Das erste Licht brennt in diesem Raum.' : 'Gut geübt – der Raum bleibt hell.') : 'Mindestens ' + Math.ceil(r.n * 2 / 3) + ' von ' + r.n + ' Antworten müssen stimmen. Lies die Schriftrolle und versuche es noch einmal.';
      btns = r.passed ? '<button class="btn violet wide" data-act="quest" data-mode="pruefung" data-id="' + r.id + '">🏆 Zur Prüfung</button><button class="btn ghost wide" data-act="quest" data-mode="ueben" data-id="' + r.id + '">Nochmal üben</button>' : '<button class="btn wide" data-act="lesson" data-id="' + r.id + '">📜 Schriftrolle lesen</button><button class="btn ghost wide" data-act="quest" data-mode="ueben" data-id="' + r.id + '">Nochmal üben</button>';
    } else if (r.mode === 'pruefung') {
      title = r.passed ? (r.wrong <= 1 ? 'Meisterhaft!' : 'Prüfung bestanden!') : 'Prüfung nicht bestanden';
      sub = r.passed ? (r.wrong <= 1 ? 'Der Raum leuchtet golden.' : 'Das Siegel ist gebrochen. Für den dritten Stern darf höchstens ein Fehler passieren.') : 'Die drei Herzen haben nicht gereicht. Übe noch eine Runde – dann klappt es.';
      btns = r.passed ? (r.stars < 3 ? '<button class="btn ghost wide" data-act="quest" data-mode="pruefung" data-id="' + r.id + '">Nochmal für den dritten Stern</button>' : '') : '<button class="btn wide" data-act="quest" data-mode="ueben" data-id="' + r.id + '">🪄 Erst üben</button>';
    } else {
      title = 'Rabenpost erledigt!';
      sub = 'Rabe Quod nickt zufrieden: q. e. d.!';
    }
    h += m ? '<div class="chip t-' + m.t + '" style="border-color:var(--tc);color:var(--tc)">' + esc(m.name) + '</div>' : '<div style="font-size:54px">✉️</div>';
    if (m) h += '<div class="bigstars">' + (r.stars ? '<b>★</b><b>★</b><b>★</b>'.split('</b>').slice(0, r.stars).join('</b>') + '</b>' : '') + '★★★'.slice(r.stars) + '</div>';
    h += '<h1>' + title + '</h1><p class="mute">' + sub + '</p><p><b>' + r.right + ' von ' + r.n + '</b> richtig</p><div style="margin:14px 0">';
    function row(e, b, s, cls, extra) { return '<div class="rew ' + (cls || '') + '"><div class="e">' + e + '</div><div class="grow"><b>' + b + '</b>' + (s ? '<span>' + s + '</span>' : '') + '</div>' + (extra || '') + '</div>'; }
    h += row('✦', '+' + r.dust + ' Sternenstaub', r.bonus ? 'davon ' + r.bonus + ' Bonus' : '');
    if (r.rankUp) h += row('🎓', 'Neuer Rang: ' + r.rankUp, 'Die Akademie verneigt sich.', 'goldb');
    if (r.lpGain) h += row('📘', '+' + r.lpGain + ' Leistungspunkte', 'eingetragen im Studienbuch');
    if (r.repaired) h += row('🔨', 'Riss repariert', 'Das Mauerwerk trägt wieder.');
    if (r.streakDays) h += row('🔥', 'Serie: ' + r.streakDays + (r.streakDays === 1 ? ' Tag' : ' Tage'), 'Komm morgen wieder – der Rabe wartet.');
    r.cards.forEach(function (c) { h += row('🌟', 'Neue Sammelkarte', esc(c.name), 'goldb', '<button class="btn" style="min-height:38px;padding:5px 12px;font-size:14px" data-act="card" data-id="' + c.id + '">Ansehen</button>'); });
    r.badges.forEach(function (b) { h += row(b.icon, 'Abzeichen: ' + b.name, b.text, 'goldb'); });
    r.cracks.forEach(function (id) { h += row('⚡', 'Riss entdeckt', esc(UI.modLabel(id)), '', '<button class="btn ghost" style="min-height:38px;padding:5px 12px;font-size:14px" data-act="quest" data-mode="ueben" data-id="' + id + '">Reparieren</button>'); });
    h += '</div>' + btns.replace(/<\/button><button/g, '</button><div style="height:9px"></div><button') + '<div style="height:9px"></div><button class="btn ' + (btns ? 'ghost' : '') + ' wide" data-act="tab" data-tab="schloss">🏰 Zum Schloss</button></div>';
    return h;
  };
  UI.after.result = function (p) {
    var r = p.res;
    if (r.cards.length || r.rankUp) SZ.Audio.sfx.card();
    else if (r.passed) SZ.Audio.sfx.win();
    else SZ.Audio.sfx.fail();
    if (r.passed) setTimeout(function () { UI.sparks(g.innerWidth / 2, 150, 16); }, 250);
  };
})(typeof window !== 'undefined' ? window : globalThis);

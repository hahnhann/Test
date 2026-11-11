/* Silberzirkel – Klangkammer: eine Spieluhr mit 16 Schritten. Musik ist hörbare Mathematik. */
(function (g) {
  'use strict';
  var SZ = g.SZ, UI = SZ.UI, $ = UI.$, $$ = UI.$$, ROWS = 8, COLS = 16;
  var SCALES = { penta: { name: 'Pentatonik', need: null, st: [0, 2, 4, 7, 9] }, dur: { name: 'Dur', need: 'scale_dur', st: [0, 2, 4, 5, 7, 9, 11] }, moll: { name: 'Moll', need: 'scale_moll', st: [0, 2, 3, 5, 7, 8, 10] }, ganz: { name: 'Ganzton', need: 'scale_ganz', st: [0, 2, 4, 6, 8, 10] } };
  var INST = [['harfe', 'Harfe', null], ['glocke', 'Glocken', 'inst_glocke'], ['floete', 'Flöte', 'inst_floete'], ['orgel', 'Orgel', 'inst_orgel']];
  var NAMES = ['C', 'Cis', 'D', 'Dis', 'E', 'F', 'Fis', 'G', 'Gis', 'A', 'B', 'H'];
  var K = SZ.Klang = { grid: empty(), inst: 'harfe', scale: 'penta', tempo: 100, playing: false, step: 0, timer: null, next: 0, info: '' };
  function empty() { var a = [], r, c; for (r = 0; r < ROWS; r++) { a.push([]); for (c = 0; c < COLS; c++) a[r].push(0); } return a; }
  function midi(row) { var st = SCALES[K.scale].st; return 60 + 12 * Math.floor(row / st.length) + st[row % st.length]; }
  function name(row) { var m = midi(row); return NAMES[m % 12] + (m >= 72 ? '′' : ''); }
  function pack() { return K.grid.map(function (r) { return parseInt(r.join(''), 2).toString(36); }).join('.'); }
  function unpack(s) { return s.split('.').map(function (x) { var b = parseInt(x, 36).toString(2); while (b.length < COLS) b = '0' + b; return b.split('').map(Number); }); }

  UI.screens.klang = function () {
    var S = SZ.S, h = '<div class="screen" style="padding-bottom:30px"><div class="subbar"><button class="x" data-act="back">←</button><h2>Klangkammer</h2></div>';
    h += '<div class="card" style="padding:10px 8px"><div class="grid16" id="grid">';
    for (var r = ROWS - 1; r >= 0; r--) {
      h += '<div class="nl">' + name(r) + '</div>';
      for (var c = 0; c < COLS; c++) h += '<button class="c' + (Math.floor(c / 4) % 2 ? ' b4' : '') + (K.grid[r][c] ? ' on' : '') + '" data-act="kCell" data-r="' + r + '" data-c="' + c + '"></button>';
    }
    h += '</div></div>';
    h += '<div class="row"><button class="btn" style="min-width:110px" data-act="kPlay" id="kplay">' + (K.playing ? '■ Stopp' : '▶ Spielen') + '</button><span class="small mute">Tempo</span><input type="range" min="60" max="170" step="5" value="' + K.tempo + '" id="ktempo"><span class="small" id="ktv" style="min-width:34px">' + K.tempo + '</span></div>';
    h += '<div class="small mute" id="kinfo" style="min-height:20px;margin-top:8px">' + (K.info || 'Tippe auf die Felder, um Töne zu setzen.') + '</div>';
    h += '<div class="tools"><div class="tlabel">Instrument</div>' + INST.map(function (i) { var lock = i[2] && !SZ.owns(i[2]); return '<button class="tb2' + (K.inst === i[0] ? ' on' : '') + (lock ? ' lock' : '') + '" data-act="kInst" data-i="' + i[0] + '">' + (lock ? '🔒 ' : '') + i[1] + '</button>'; }).join('') + '</div>';
    h += '<div class="tools"><div class="tlabel">Tonleiter</div>' + Object.keys(SCALES).map(function (k) { var s = SCALES[k], lock = s.need && !SZ.owns(s.need); return '<button class="tb2' + (K.scale === k ? ' on' : '') + (lock ? ' lock' : '') + '" data-act="kScale" data-s="' + k + '">' + (lock ? '🔒 ' : '') + s.name + '</button>'; }).join('') + '</div>';
    h += '<div class="row" style="margin-top:12px"><button class="btn ghost grow" data-act="kDemo">Beispiel</button><button class="btn ghost grow" data-act="kClear">Leeren</button><button class="btn grow" data-act="kSave">Speichern</button></div>';
    if (S.songs.length) h += '<div class="sec">Meine Melodien</div>' + S.songs.map(function (s, i) { return '<div class="shopi"><div class="grow"><b>' + SZ.esc(s.n) + '</b><span>' + SCALES[s.s].name + ' · Tempo ' + s.t + '</span></div><button class="tb2" data-act="kLoad" data-i="' + i + '">Laden</button><button class="tb2" style="margin-left:6px" data-act="kDel" data-i="' + i + '">✕</button></div>'; }).join('');
    h += '<div class="note" style="margin-top:14px"><b>Mathe im Klang:</b> 16 Schritte sind 2 Takte mit je 8 Achtelnoten – jede Note dauert ' + SZ.T('${1/8}$') + ' Takt. Eine Oktave höher schwingt ein Ton genau doppelt so schnell (Verhältnis 2 : 1), eine Quinte höher im Verhältnis 3 : 2. Das entdeckten schon die Pythagoreer.</div></div>';
    return h;
  };
  UI.after.klang = function () {
    var t = $('#ktempo');
    if (t) t.addEventListener('input', function () { K.tempo = +t.value; $('#ktv').textContent = K.tempo; });
  };
  function locked(need) { if (need && !SZ.owns(need)) { UI.toast('🔒 Das gibt es im Laden der Akademie.'); return true; } return false; }
  UI.act.kCell = function (el) {
    var r = +el.getAttribute('data-r'), c = +el.getAttribute('data-c');
    K.grid[r][c] = K.grid[r][c] ? 0 : 1;
    el.classList.toggle('on', !!K.grid[r][c]);
    if (K.grid[r][c] && SZ.Audio.on()) {
      SZ.Audio.note(midi(r), 0, 0.3, K.inst, 0.28);
      K.info = 'Ton ' + name(r) + ' · ' + Math.round(SZ.Audio.freq(midi(r))) + ' Schwingungen pro Sekunde (Hertz)';
      var inf = $('#kinfo');
      if (inf) inf.textContent = K.info;
    }
  };
  function tick() {
    var A = SZ.Audio, stepDur = 60 / K.tempo / 2;
    if (!A.on()) { K.stop(); return; }
    while (K.next < A.now() + 0.12) {
      for (var r = 0; r < ROWS; r++) if (K.grid[r][K.step]) A.note(midi(r), K.next, stepDur * 0.9, K.inst, 0.22);
      (function (col, delay) {
        setTimeout(function () {
          $$('#grid .c.play').forEach(function (e) { e.classList.remove('play'); });
          if (K.playing) $$('#grid .c[data-c="' + col + '"]').forEach(function (e) { e.classList.add('play'); });
        }, Math.max(0, delay * 1000));
      })(K.step, K.next - A.now());
      K.next += stepDur;
      K.step = (K.step + 1) % COLS;
    }
  }
  K.stop = function () {
    K.playing = false;
    if (K.timer) { clearInterval(K.timer); K.timer = null; }
    $$('#grid .c.play').forEach(function (e) { e.classList.remove('play'); });
    var b = $('#kplay');
    if (b) b.textContent = '▶ Spielen';
  };
  UI.act.kPlay = function () {
    if (K.playing) { K.stop(); return; }
    if (!SZ.S.sound) { UI.toast('Die Töne sind ausgeschaltet (Studienbuch → Einstellungen).'); return; }
    if (!SZ.Audio.on()) { UI.toast('Auf diesem Gerät ist kein Ton verfügbar.'); return; }
    K.playing = true; K.step = 0; K.next = SZ.Audio.now() + 0.06;
    K.timer = setInterval(tick, 30);
    $('#kplay').textContent = '■ Stopp';
  };
  UI.act.kInst = function (el) { var i = INST.filter(function (x) { return x[0] === el.getAttribute('data-i'); })[0]; if (locked(i[2])) return; K.inst = i[0]; keep(); };
  UI.act.kScale = function (el) { var k = el.getAttribute('data-s'); if (locked(SCALES[k].need)) return; K.scale = k; keep(); };
  function keep() { var was = K.playing; K.stop(); UI.refresh(); if (was) UI.act.kPlay(); }
  UI.act.kClear = function () { K.stop(); K.grid = empty(); UI.refresh(); };
  UI.act.kDemo = function () {
    K.stop();
    K.grid = empty();
    [[0, 0], [2, 2], [4, 4], [6, 5], [8, 4], [10, 2], [12, 3], [14, 1], [0, 4], [8, 7], [4, 0], [12, 0]].forEach(function (p) { K.grid[p[1]][p[0]] = 1; });
    UI.refresh();
    UI.act.kPlay();
  };
  UI.act.kSave = function () {
    var S = SZ.S;
    if (!K.grid.some(function (r) { return r.some(Boolean); })) { UI.toast('Setze zuerst ein paar Töne.'); return; }
    S.songs.unshift({ n: 'Melodie ' + (S.stats.songs + 1), g: pack(), i: K.inst, s: K.scale, t: K.tempo });
    if (S.songs.length > 8) S.songs.pop();
    S.stats.songs++;
    var nb = SZ.checkBadges();
    SZ.Store.save();
    SZ.Audio.sfx.star();
    keep();
    UI.toast(nb.length ? nb[0].icon + ' Abzeichen: ' + nb[0].name : 'Melodie gespeichert.');
  };
  UI.act.kLoad = function (el) {
    var s = SZ.S.songs[+el.getAttribute('data-i')];
    if (!s) return;
    K.stop();
    K.grid = unpack(s.g); K.tempo = s.t;
    K.scale = SCALES[s.s] && (!SCALES[s.s].need || SZ.owns(SCALES[s.s].need)) ? s.s : 'penta';
    K.inst = INST.some(function (x) { return x[0] === s.i && (!x[2] || SZ.owns(x[2])); }) ? s.i : 'harfe';
    UI.refresh();
    g.scrollTo(0, 0);
  };
  UI.act.kDel = function (el) { SZ.S.songs.splice(+el.getAttribute('data-i'), 1); SZ.Store.save(); keep(); };
})(typeof window !== 'undefined' ? window : globalThis);

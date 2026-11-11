/* Silberzirkel – Kaleidoskop-Atelier: Malen mit Dreh- und Spiegelsymmetrie. */
(function (g) {
  'use strict';
  var SZ = g.SZ, UI = SZ.UI, $ = UI.$, doc = g.document, SIZE = 720;
  var PALS = {
    mond: { name: 'Mondschein', need: null, cols: ['#ffffff', '#f2c14e', '#9db7e0', '#b794f4', '#4fd1c5', '#ef7d8f'] },
    feuer: { name: 'Drachenfeuer', need: 'pal_feuer', cols: ['#fff3c4', '#ffd166', '#ff9f1c', '#ff5d3a', '#d7263d', '#8f1d5a'] },
    wald: { name: 'Mondwald', need: 'pal_wald', cols: ['#e8fff4', '#9be7c4', '#3dd6a3', '#1fa3a3', '#6f8fd6', '#c9d6e8'] },
    pastell: { name: 'Feenstaub', need: 'pal_pastell', cols: ['#ffd6e8', '#ffe9b8', '#d4f7d0', '#c9e4ff', '#e2d4ff', '#ffffff'] }
  };
  var SYMS = [[2, null], [4, null], [6, null], [5, 'sym5'], [8, 'sym8'], [12, 'sym12']];
  var BRUSH = [['feder', 'Feder', null], ['glow', 'Leuchtpinsel', 'brush_glow'], ['star', 'Sterne', 'brush_star']];
  var A = { n: 6, mirror: true, pal: 'mond', color: '#f2c14e', width: 4, brush: 'feder', strokes: [], cur: null };
  var cv = null, cx = null;

  function bg() {
    var gr = cx.createRadialGradient(SIZE / 2, SIZE / 2, 20, SIZE / 2, SIZE / 2, SIZE * 0.72);
    gr.addColorStop(0, '#1d1848'); gr.addColorStop(1, '#090718');
    cx.shadowBlur = 0;
    cx.fillStyle = gr;
    cx.fillRect(0, 0, SIZE, SIZE);
  }
  function starAt(x, y, r) {
    cx.beginPath();
    for (var i = 0; i < 10; i++) { var a = Math.PI * i / 5 - Math.PI / 2, rr = i % 2 ? r * 0.45 : r; cx[i ? 'lineTo' : 'moveTo'](x + rr * Math.cos(a), y + rr * Math.sin(a)); }
    cx.closePath(); cx.fill();
  }
  /* ein Streckenstück mit allen Dreh- und Spiegelbildern zeichnen */
  function seg(st, p, q) {
    cx.lineCap = 'round'; cx.lineJoin = 'round';
    cx.strokeStyle = st.color; cx.fillStyle = st.color; cx.lineWidth = st.width;
    cx.shadowColor = st.color; cx.shadowBlur = st.brush === 'glow' ? st.width * 3.2 : 0;
    for (var k = 0; k < st.n; k++) {
      var a = 2 * Math.PI * k / st.n, c = Math.cos(a), s = Math.sin(a);
      for (var m = 0; m < (st.mirror ? 2 : 1); m++) {
        var f = m ? -1 : 1;
        var x1 = SIZE / 2 + f * p[0] * c - p[1] * s, y1 = SIZE / 2 + f * p[0] * s + p[1] * c;
        var x2 = SIZE / 2 + f * q[0] * c - q[1] * s, y2 = SIZE / 2 + f * q[0] * s + q[1] * c;
        if (st.brush === 'star') starAt(x2, y2, st.width * 1.9);
        else { cx.beginPath(); cx.moveTo(x1, y1); cx.lineTo(x2, y2); cx.stroke(); }
      }
    }
  }
  function drawStroke(st) {
    if (st.pts.length === 1) { seg(st, st.pts[0], st.pts[0]); return; }
    for (var i = 1; i < st.pts.length; i++) seg(st, st.pts[i - 1], st.pts[i]);
  }
  function redraw() { if (!cx) return; bg(); A.strokes.forEach(drawStroke); }
  function pos(e) {
    var r = cv.getBoundingClientRect(), t = e.touches && e.touches[0] ? e.touches[0] : e;
    return [(t.clientX - r.left) / r.width * SIZE - SIZE / 2, (t.clientY - r.top) / r.height * SIZE - SIZE / 2];
  }
  function down(e) {
    e.preventDefault();
    SZ.Audio.init();
    A.cur = { n: A.n, mirror: A.mirror, color: A.color, width: A.width, brush: A.brush, pts: [pos(e)] };
    seg(A.cur, A.cur.pts[0], A.cur.pts[0]);
  }
  function move(e) {
    if (!A.cur) return;
    e.preventDefault();
    var p = pos(e), last = A.cur.pts[A.cur.pts.length - 1], d = Math.sqrt((p[0] - last[0]) * (p[0] - last[0]) + (p[1] - last[1]) * (p[1] - last[1]));
    if (d < (A.cur.brush === 'star' ? 26 : 3)) return;
    A.cur.pts.push(p);
    seg(A.cur, last, p);
  }
  function up() { if (A.cur) { A.strokes.push(A.cur); A.cur = null; if (A.strokes.length > 400) A.strokes.shift(); } }

  UI.screens.atelier = function () {
    var S = SZ.S, deg = 360 / A.n, h = '<div class="screen" style="padding-bottom:30px"><div class="subbar"><button class="x" data-act="back">←</button><h2>Kaleidoskop-Atelier</h2></div>';
    h += '<div class="canvwrap"><canvas id="cv" width="' + SIZE + '" height="' + SIZE + '"></canvas></div>';
    h += '<div class="small mute" style="margin-top:8px">' + A.n + ' Achsen: Alles, was du malst, wird um $360° : ' + A.n + ' = ' + SZ.M.de(deg, 1) + '°$ weitergedreht' + (A.mirror ? ' und gespiegelt – ' + 2 * A.n + ' Kopien.' : ' – ' + A.n + ' Kopien.') + '</div>';
    h = h.replace(/\$([^$]+)\$/g, function (_, x) { return '<span class="m">' + SZ.H.m(x) + '</span>'; });
    h += '<div class="tools"><div class="tlabel">Farbe</div>' + PALS[A.pal].cols.map(function (c) { return '<button class="sw' + (c === A.color ? ' on' : '') + '" style="background:' + c + '" data-act="aColor" data-c="' + c + '"></button>'; }).join('') + '</div>';
    h += '<div class="tools"><div class="tlabel">Farbpalette</div>' + Object.keys(PALS).map(function (k) { var p = PALS[k], lock = p.need && !SZ.owns(p.need); return '<button class="tb2' + (A.pal === k ? ' on' : '') + (lock ? ' lock' : '') + '" data-act="aPal" data-p="' + k + '">' + (lock ? '🔒 ' : '') + p.name + '</button>'; }).join('') + '</div>';
    h += '<div class="tools"><div class="tlabel">Symmetrie</div>' + SYMS.map(function (s) { var lock = s[1] && !SZ.owns(s[1]); return '<button class="tb2' + (A.n === s[0] ? ' on' : '') + (lock ? ' lock' : '') + '" data-act="aSym" data-n="' + s[0] + '">' + (lock ? '🔒 ' : '') + s[0] + '</button>'; }).join('') + '<button class="tb2' + (A.mirror ? ' on' : '') + '" data-act="aMirror">Spiegel</button></div>';
    h += '<div class="tools"><div class="tlabel">Pinsel</div>' + BRUSH.map(function (b) { var lock = b[2] && !SZ.owns(b[2]); return '<button class="tb2' + (A.brush === b[0] ? ' on' : '') + (lock ? ' lock' : '') + '" data-act="aBrush" data-b="' + b[0] + '">' + (lock ? '🔒 ' : '') + b[1] + '</button>'; }).join('') + [[2, 'fein'], [4, 'mittel'], [8, 'breit']].map(function (w) { return '<button class="tb2' + (A.width === w[0] ? ' on' : '') + '" data-act="aWidth" data-w="' + w[0] + '">' + w[1] + '</button>'; }).join('') + '</div>';
    h += '<div class="row" style="margin-top:12px"><button class="btn ghost grow" data-act="aUndo">↶ Zurück</button><button class="btn ghost grow" data-act="aClear">Leeren</button><button class="btn grow" data-act="aSave">Speichern</button></div>';
    if (S.art.length) h += '<div class="sec">Meine Galerie</div><div class="gal">' + S.art.map(function (a, i) { return '<button data-act="aView" data-i="' + i + '"><img src="' + a.d + '" alt=""></button>'; }).join('') + '</div>';
    h += '<div class="note" style="margin-top:14px">Rosetten gotischer Kirchenfenster, Schneeflocken und Mandalas sind dreh- und spiegelsymmetrisch – genau wie deine Bilder. Mehr dazu in der Schriftrolle „Symmetrie &amp; Spiegelung“ (Klasse 5).</div></div>';
    return h;
  };
  UI.after.atelier = function () {
    cv = $('#cv');
    if (!cv) return;
    cx = cv.getContext('2d');
    redraw();
    if (g.PointerEvent) {
      cv.addEventListener('pointerdown', function (e) { try { cv.setPointerCapture(e.pointerId); } catch (x) { /* egal */ } down(e); });
      cv.addEventListener('pointermove', move);
      cv.addEventListener('pointerup', up);
      cv.addEventListener('pointercancel', up);
    } else {
      cv.addEventListener('touchstart', down, { passive: false });
      cv.addEventListener('touchmove', move, { passive: false });
      cv.addEventListener('touchend', up);
      cv.addEventListener('mousedown', down);
      cv.addEventListener('mousemove', move);
      g.addEventListener('mouseup', up);
    }
  };
  function locked(need) { if (need && !SZ.owns(need)) { UI.toast('🔒 Das gibt es im Laden der Akademie.'); return true; } return false; }
  UI.act.aColor = function (el) { A.color = el.getAttribute('data-c'); UI.refresh(); };
  UI.act.aPal = function (el) { var k = el.getAttribute('data-p'); if (locked(PALS[k].need)) return; A.pal = k; A.color = PALS[k].cols[1]; UI.refresh(); };
  UI.act.aSym = function (el) { var n = +el.getAttribute('data-n'), s = SYMS.filter(function (x) { return x[0] === n; })[0]; if (locked(s[1])) return; A.n = n; UI.refresh(); };
  UI.act.aMirror = function () { A.mirror = !A.mirror; UI.refresh(); };
  UI.act.aBrush = function (el) { var b = BRUSH.filter(function (x) { return x[0] === el.getAttribute('data-b'); })[0]; if (locked(b[2])) return; A.brush = b[0]; UI.refresh(); };
  UI.act.aWidth = function (el) { A.width = +el.getAttribute('data-w'); UI.refresh(); };
  UI.act.aUndo = function () { A.strokes.pop(); redraw(); };
  UI.act.aClear = function () { A.strokes = []; redraw(); };
  UI.act.aSave = function () {
    if (!A.strokes.length) { UI.toast('Male zuerst etwas.'); return; }
    var S = SZ.S, small = doc.createElement('canvas'), ok = false;
    small.width = small.height = 300;
    small.getContext('2d').drawImage(cv, 0, 0, 300, 300);
    S.art.unshift({ d: small.toDataURL('image/jpeg', 0.82), t: Date.now() });
    if (S.art.length > 9) S.art.pop();
    S.stats.art++;
    try { if (g.AndroidBridge && g.AndroidBridge.canSavePictures()) ok = g.AndroidBridge.savePicture(cv.toDataURL('image/png').split(',')[1], 'Kaleidoskop_' + Date.now()); } catch (e) { ok = false; }
    var nb = SZ.checkBadges();
    SZ.Store.save();
    SZ.Audio.sfx.star();
    UI.refresh();
    UI.toast(nb.length ? nb[0].icon + ' Abzeichen: ' + nb[0].name : (ok ? 'Gespeichert – auch in der Galerie deines Telefons.' : 'In deiner Galerie gespeichert.'));
  };
  UI.act.aView = function (el) {
    var i = +el.getAttribute('data-i'), a = SZ.S.art[i];
    if (!a) return;
    UI.sheet('<img src="' + a.d + '" alt="" style="display:block;width:100%;border-radius:14px;margin-bottom:12px"><div class="row"><button class="btn grow" data-act="closeSheet">Schließen</button><button class="btn ghost" data-act="aDel" data-i="' + i + '">Löschen</button></div>');
  };
  UI.act.aDel = function (el) { SZ.S.art.splice(+el.getAttribute('data-i'), 1); SZ.Store.save(); UI.closeSheet(); UI.refresh(); };
})(typeof window !== 'undefined' ? window : globalThis);

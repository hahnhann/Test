/* Silberzirkel – Zeichnungen zu den Aufgaben (reines SVG, auf dem Gerät erzeugt). */
(function (g) {
  'use strict';
  var SZ = g.SZ, M = SZ.M;
  var Fig = SZ.Fig = {};
  var INK = '#2b2350', GRID = '#d8cba8', RED = '#b83a4b', TEAL = '#1b7f86', GOLD = '#b7791f',
    VIOLET = '#6b46c1', GREEN = '#2f855a', BLUE = '#2b6cb0';
  Fig.C = { ink: INK, red: RED, teal: TEAL, gold: GOLD, violet: VIOLET, green: GREEN, blue: BLUE };
  var uid = 0;

  function f1(x) { return Math.round(x * 10) / 10; }
  function svg(w, h, body) {
    return '<svg class="fig" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ' + w + ' ' + h + '" width="' + w + '" height="' + h + '">' + body + '</svg>';
  }
  function line(x1, y1, x2, y2, c, w, dash) {
    return '<line x1="' + f1(x1) + '" y1="' + f1(y1) + '" x2="' + f1(x2) + '" y2="' + f1(y2) + '" stroke="' + (c || INK) + '" stroke-width="' + (w || 1.6) + '"' + (dash ? ' stroke-dasharray="' + dash + '"' : '') + ' stroke-linecap="round"/>';
  }
  function text(x, y, s, o) {
    o = o || {};
    return '<text x="' + f1(x) + '" y="' + f1(y) + '" font-size="' + (o.size || 13) + '" fill="' + (o.c || INK) + '" text-anchor="' + (o.anchor || 'middle') + '"' + (o.it ? ' font-style="italic"' : '') + (o.bold ? ' font-weight="700"' : '') + ' dominant-baseline="' + (o.base || 'middle') + '">' + s + '</text>';
  }
  function circle(x, y, r, fill, stroke, sw) {
    return '<circle cx="' + f1(x) + '" cy="' + f1(y) + '" r="' + r + '" fill="' + (fill || 'none') + '"' + (stroke ? ' stroke="' + stroke + '" stroke-width="' + (sw || 1.6) + '"' : '') + '/>';
  }
  Fig.row = function (list) { return '<div class="figrow">' + list.join('') + '</div>'; };

  /* ---------- Koordinatensystem mit Graphen, Punkten, Strecken ---------- */
  Fig.graph = function (o) {
    o = o || {};
    var x0 = o.x ? o.x[0] : -5, x1 = o.x ? o.x[1] : 5, y0 = o.y ? o.y[0] : -5, y1 = o.y ? o.y[1] : 5;
    var W = o.w || 270, pad = 16;
    var sx = (W - 2 * pad) / (x1 - x0);
    var sy = o.sy ? sx * o.sy : sx;
    var Hh = Math.round((y1 - y0) * sy + 2 * pad);
    function X(x) { return pad + (x - x0) * sx; }
    function Y(y) { return Hh - pad - (y - y0) * sy; }
    var id = 'cl' + (++uid), b = '', i;
    var gx = o.gx || 1, gy = o.gy || 1;
    b += '<clipPath id="' + id + '"><rect x="' + (pad - 1) + '" y="' + (pad - 1) + '" width="' + (W - 2 * pad + 2) + '" height="' + (Hh - 2 * pad + 2) + '"/></clipPath>';
    if (o.xticks) o.xticks.forEach(function (t) { b += line(X(t.x), pad, X(t.x), Hh - pad, GRID, 1); });
    else for (i = Math.ceil(x0 / gx) * gx; i <= x1 + 1e-9; i += gx) b += line(X(i), pad, X(i), Hh - pad, GRID, 1);
    for (i = Math.ceil(y0 / gy) * gy; i <= y1 + 1e-9; i += gy) b += line(pad, Y(i), W - pad, Y(i), GRID, 1);
    var ax = Math.min(Math.max(0, x0), x1), ay = Math.min(Math.max(0, y0), y1);
    // Achsen mit Pfeilspitzen
    b += line(pad - 4, Y(ay), W - pad + 6, Y(ay), INK, 1.4) + '<path d="M' + (W - pad + 10) + ' ' + f1(Y(ay)) + ' l-7 -3.5 v7z" fill="' + INK + '"/>';
    b += line(X(ax), Hh - pad + 4, X(ax), pad - 6, INK, 1.4) + '<path d="M' + f1(X(ax)) + ' ' + (pad - 10) + ' l-3.5 7 h7z" fill="' + INK + '"/>';
    b += text(W - pad + 4, Y(ay) + 12, o.xl || 'x', { it: !o.xl, size: 12 });
    b += text(X(ax) + 11, pad - 4, o.yl || 'y', { it: !o.yl, size: 12 });
    var tx = o.tx || (x1 - x0 > 12 ? 2 : 1) * gx, ty = o.ty || (y1 - y0 > 12 ? 2 : 1) * gy;
    if (o.ticks !== false) {
      if (o.xticks) o.xticks.forEach(function (t) { if (t.l) b += line(X(t.x), Y(ay) - 3, X(t.x), Y(ay) + 3, INK, 1.2) + text(X(t.x), Y(ay) + 11, t.l, { size: 9.5 }); });
      else for (i = Math.ceil(x0 / tx) * tx; i <= x1 - 0.5 * gx; i += tx) {
        if (Math.abs(i) < 1e-9) continue;
        b += line(X(i), Y(ay) - 3, X(i), Y(ay) + 3, INK, 1.2) + text(X(i), Y(ay) + 11, M.de(i), { size: 9.5 });
      }
      for (i = Math.ceil(y0 / ty) * ty; i <= y1 - 0.5 * gy; i += ty) {
        if (Math.abs(i) < 1e-9) continue;
        b += line(X(ax) - 3, Y(i), X(ax) + 3, Y(i), INK, 1.2) + text(X(ax) - 6, Y(i), M.de(i), { size: 9.5, anchor: 'end' });
      }
    }
    var inner = '';
    (o.polys || []).forEach(function (p) {
      inner += '<polygon points="' + p.P.map(function (q) { return f1(X(q[0])) + ',' + f1(Y(q[1])); }).join(' ') + '" fill="' + (p.fill || 'rgba(107,70,193,.18)') + '" stroke="' + (p.c || VIOLET) + '" stroke-width="1.8" stroke-linejoin="round"/>';
    });
    (o.fns || []).forEach(function (fn, k) {
      var col = fn.c || [RED, TEAL, VIOLET][k % 3], d = '', pen = false, n = 160;
      for (var j = 0; j <= n; j++) {
        var x = x0 + (x1 - x0) * j / n, y = fn.f(x);
        if (fn.dom && (x < fn.dom[0] || x > fn.dom[1])) { pen = false; continue; }
        if (!isFinite(y) || y > y1 + (y1 - y0) || y < y0 - (y1 - y0)) { pen = false; continue; }
        d += (pen ? 'L' : 'M') + f1(X(x)) + ' ' + f1(Y(y));
        pen = true;
      }
      inner += '<path d="' + d + '" fill="none" stroke="' + col + '" stroke-width="2.4" stroke-linejoin="round" stroke-linecap="round"' + (fn.dash ? ' stroke-dasharray="5 4"' : '') + '/>';
    });
    (o.segs || []).forEach(function (s) { inner += line(X(s[0]), Y(s[1]), X(s[2]), Y(s[3]), s[4] || TEAL, 2, s[5]); });
    (o.curves || []).forEach(function (cv) {               // beliebige Kurven als Punktfolge
      inner += '<path d="' + cv.pts.map(function (q, k) { return (k ? 'L' : 'M') + f1(X(q[0])) + ' ' + f1(Y(q[1])); }).join('') + '" fill="none" stroke="' + (cv.c || RED) + '" stroke-width="2.4" stroke-linejoin="round" stroke-linecap="round"/>';
    });
    b += '<g clip-path="url(#' + id + ')">' + inner + '</g>';
    (o.pts || []).forEach(function (p) {
      b += circle(X(p.x), Y(p.y), 4, p.c || RED, '#fff', 1);
      if (p.l) b += text(X(p.x) + (p.dx == null ? 9 : p.dx), Y(p.y) + (p.dy == null ? -9 : p.dy), p.l, { size: 12, bold: true, c: p.c || RED, anchor: 'start' });
    });
    return svg(W, Hh, b);
  };

  /* ---------- Vieleck mit Beschriftung (Dreiecke, Rechtecke, Trapeze ...) ---------- */
  Fig.shape = function (o) {
    var P = o.P, W = o.w || 250, i, longest = 0;
    (o.s || []).forEach(function (l) { longest = Math.max(longest, String(l || '').length); });
    var pad = o.pad || Math.max(34, 24 + longest * 4);        // Platz für Beschriftungen am Rand
    var xs = P.map(function (p) { return p[0]; }), ys = P.map(function (p) { return p[1]; });
    (o.extra || []).forEach(function (e) { xs.push(e.from[0], e.to[0]); ys.push(e.from[1], e.to[1]); });
    var minx = Math.min.apply(null, xs), maxx = Math.max.apply(null, xs), miny = Math.min.apply(null, ys), maxy = Math.max.apply(null, ys);
    var sc = Math.min((W - 2 * pad) / (maxx - minx || 1), (o.maxh || 190) / (maxy - miny || 1));
    var Hh = Math.round((maxy - miny) * sc + 2 * pad);
    var offx = (W - (maxx - minx) * sc) / 2;
    function X(x) { return offx + (x - minx) * sc; }
    function Y(y) { return Hh - pad - (y - miny) * sc; }
    var S = P.map(function (p) { return [X(p[0]), Y(p[1])]; });
    var n = S.length, cx = 0, cy = 0;
    S.forEach(function (p) { cx += p[0] / n; cy += p[1] / n; });
    var b = '<polygon points="' + S.map(function (p) { return f1(p[0]) + ',' + f1(p[1]); }).join(' ') + '" fill="' + (o.fill || 'rgba(27,127,134,.14)') + '" stroke="' + INK + '" stroke-width="2" stroke-linejoin="round"/>';
    (o.extra || []).forEach(function (e) {
      b += line(X(e.from[0]), Y(e.from[1]), X(e.to[0]), Y(e.to[1]), e.c || RED, 1.8, e.dash ? '5 4' : null);
      if (e.l) b += text((X(e.from[0]) + X(e.to[0])) / 2 + (e.dx == null ? 10 : e.dx), (Y(e.from[1]) + Y(e.to[1])) / 2 + (e.dy || 0), e.l, { size: 12.5, c: e.c || RED, it: !!e.it });
    });
    // Winkel
    (o.ang || []).forEach(function (a) {
      var v = S[a.at], p = S[(a.at + n - 1) % n], q = S[(a.at + 1) % n];
      var u = unit(p[0] - v[0], p[1] - v[1]), w = unit(q[0] - v[0], q[1] - v[1]), r = a.r || 20;
      if (a.right) {
        var k = 11;
        b += '<path d="M' + f1(v[0] + u[0] * k) + ' ' + f1(v[1] + u[1] * k) + ' L' + f1(v[0] + (u[0] + w[0]) * k) + ' ' + f1(v[1] + (u[1] + w[1]) * k) + ' L' + f1(v[0] + w[0] * k) + ' ' + f1(v[1] + w[1] * k) + '" fill="none" stroke="' + INK + '" stroke-width="1.4"/>';
        b += circle(v[0] + (u[0] + w[0]) * k * 0.5, v[1] + (u[1] + w[1]) * k * 0.5, 1.4, INK);
      } else {
        var sweep = (u[0] * w[1] - u[1] * w[0]) > 0 ? 1 : 0;
        b += '<path d="M' + f1(v[0] + u[0] * r) + ' ' + f1(v[1] + u[1] * r) + ' A' + r + ' ' + r + ' 0 0 ' + sweep + ' ' + f1(v[0] + w[0] * r) + ' ' + f1(v[1] + w[1] * r) + '" fill="none" stroke="' + (a.c || RED) + '" stroke-width="1.5"/>';
      }
      if (a.l) {
        var bis = unit(u[0] + w[0], u[1] + w[1]), dist = a.right ? 24 : r + 13;
        b += text(v[0] + bis[0] * dist, v[1] + bis[1] * dist, a.l, { size: 12, c: a.c || RED });
      }
    });
    // Seiten
    (o.s || []).forEach(function (lab, k) {
      if (!lab) return;
      var p = S[k], q = S[(k + 1) % n], mx = (p[0] + q[0]) / 2, my = (p[1] + q[1]) / 2;
      var nx = -(q[1] - p[1]), ny = q[0] - p[0], nn = unit(nx, ny);
      if ((mx - cx) * nn[0] + (my - cy) * nn[1] < 0) { nn[0] = -nn[0]; nn[1] = -nn[1]; }
      var off = 13 + Math.abs(nn[0]) * String(lab).length * 2.6;
      b += text(mx + nn[0] * off, my + nn[1] * off, lab, { size: 12.5 });
    });
    // Ecken
    (o.v || []).forEach(function (lab, k) {
      if (!lab) return;
      var d = unit(S[k][0] - cx, S[k][1] - cy);
      b += text(S[k][0] + d[0] * 13, S[k][1] + d[1] * 13, lab, { size: 13, bold: true, it: true });
    });
    return svg(W, Hh, b);
  };
  function unit(x, y) { var l = Math.sqrt(x * x + y * y) || 1; return [x / l, y / l]; }

  /* Regelmäßiges n-Eck */
  Fig.regular = function (n, o) {
    o = o || {};
    var P = [];
    for (var i = 0; i < n; i++) { var a = Math.PI / 2 + 2 * Math.PI * i / n + (n % 2 === 0 ? Math.PI / n : 0); P.push([Math.cos(a), Math.sin(a)]); }
    return Fig.shape({ P: P, w: o.w || 150, pad: 16, maxh: 120, fill: o.fill || 'rgba(107,70,193,.16)' });
  };

  /* ---------- Quader im Schrägbild ---------- */
  Fig.cuboid = function (a, b, c, lab) {
    lab = lab || [];
    var W = 250, pad = 30, k = 0.5 * Math.SQRT1_2;
    var tw = a + b * k, th = c + b * k, sc = Math.min((W - 2 * pad) / tw, 150 / th);
    var Hh = Math.round(th * sc + 2 * pad);
    var x0 = (W - tw * sc) / 2, y0 = Hh - pad, dx = b * k * sc, dy = b * k * sc, A = a * sc, C = c * sc;
    var s = '';
    // verdeckte Kanten
    s += line(x0 + dx, y0 - dy, x0 + dx + A, y0 - dy, INK, 1.2, '4 4') + line(x0 + dx, y0 - dy, x0 + dx, y0 - dy - C, INK, 1.2, '4 4') + line(x0, y0, x0 + dx, y0 - dy, INK, 1.2, '4 4');
    s += '<polygon points="' + [x0, y0, x0 + A, y0, x0 + A, y0 - C, x0, y0 - C].map(f1).join(',') + '" fill="rgba(183,121,31,.16)" stroke="' + INK + '" stroke-width="2" stroke-linejoin="round"/>';
    s += '<polygon points="' + [x0, y0 - C, x0 + A, y0 - C, x0 + A + dx, y0 - C - dy, x0 + dx, y0 - C - dy].map(f1).join(',') + '" fill="rgba(183,121,31,.08)" stroke="' + INK + '" stroke-width="2" stroke-linejoin="round"/>';
    s += '<polygon points="' + [x0 + A, y0, x0 + A + dx, y0 - dy, x0 + A + dx, y0 - C - dy, x0 + A, y0 - C].map(f1).join(',') + '" fill="rgba(183,121,31,.26)" stroke="' + INK + '" stroke-width="2" stroke-linejoin="round"/>';
    if (lab[0]) s += text(x0 + A / 2, y0 + 14, lab[0]);
    if (lab[1]) s += text(x0 + A + dx / 2 + 8 + String(lab[1]).length * 2.6, y0 - dy / 2 + 8, lab[1]);
    if (lab[2]) s += text(x0 - 8 - String(lab[2]).length * 2.6, y0 - C / 2, lab[2]);
    return svg(W, Hh, s);
  };

  /* ---------- Zahlenstrahl / Zahlengerade ---------- */
  Fig.numline = function (o) {
    var a = o.a, b = o.b, step = o.step || 1, W = 280, pad = 22, Hh = 70, y = 42;
    function X(x) { return pad + (x - a) / (b - a) * (W - 2 * pad); }
    var s = line(pad - 8, y, W - pad + 10, y, INK, 1.6) + '<path d="M' + (W - pad + 14) + ' ' + y + ' l-7 -3.5 v7z" fill="' + INK + '"/>';
    var sub = o.sub || 1, i, cnt = Math.round((b - a) / step);
    for (i = 0; i <= cnt * sub; i++) {
      var x = a + i * step / sub, major = i % sub === 0;
      s += line(X(x), y - (major ? 6 : 3.5), X(x), y + (major ? 6 : 3.5), INK, major ? 1.5 : 1);
      if (major && (!o.every || (i / sub) % o.every === 0) && o.labels !== false) s += text(X(x), y + 17, o.fmt ? o.fmt(x) : M.de(x), { size: 10.5 });
    }
    (o.marks || []).forEach(function (m) {
      s += circle(X(m.x), y, 4.5, m.c || RED, '#fff', 1);
      if (m.l) s += text(X(m.x), y - 15, m.l, { c: m.c || RED, bold: true, size: 13 });
    });
    return svg(W, Hh, s);
  };

  /* ---------- Säulendiagramm ---------- */
  Fig.bars = function (o) {
    var W = 270, Hh = 190, pl = 34, pb = 30, pt = 14, n = o.vals.length;
    var max = o.max || Math.max.apply(null, o.vals), stepv = o.step || niceStep(max);
    max = Math.ceil(max / stepv) * stepv;
    function Y(v) { return Hh - pb - v / max * (Hh - pb - pt); }
    var s = '', i, bw = (W - pl - 12) / n;
    for (i = 0; i <= max + 1e-9; i += stepv) s += line(pl, Y(i), W - 8, Y(i), GRID, 1) + text(pl - 5, Y(i), M.de(i), { size: 10, anchor: 'end' });
    var cols = o.colors || [TEAL, RED, GOLD, VIOLET, GREEN, BLUE, '#a0522d'];
    o.vals.forEach(function (v, k) {
      var x = pl + k * bw + bw * 0.18, w = bw * 0.64;
      s += '<rect x="' + f1(x) + '" y="' + f1(Y(v)) + '" width="' + f1(w) + '" height="' + f1(Hh - pb - Y(v)) + '" rx="2" fill="' + cols[k % cols.length] + '"/>';
      s += text(x + w / 2, Hh - pb + 12, o.labels[k], { size: 10.5 });
      if (o.showVals) s += text(x + w / 2, Y(v) - 7, M.de(v), { size: 10.5, bold: true });
    });
    s += line(pl, Hh - pb, W - 8, Hh - pb, INK, 1.5) + line(pl, Hh - pb, pl, pt - 4, INK, 1.5);
    if (o.yl) s += text(pl + 4, pt - 5, o.yl, { size: 10, anchor: 'start' });
    return svg(W, Hh, s);
  };
  function niceStep(max) {
    var raw = max / 5, p = Math.pow(10, Math.floor(Math.log(raw) / Math.LN10)), r = raw / p;
    return (r <= 1 ? 1 : r <= 2 ? 2 : r <= 5 ? 5 : 10) * p;
  }

  /* ---------- Kreisdiagramm ---------- */
  Fig.pie = function (o) {
    var W = 270, Hh = 150, cx = 78, cy = 75, r = 60, total = 0, s = '', ang = -Math.PI / 2;
    var cols = o.colors || [TEAL, RED, GOLD, VIOLET, GREEN, BLUE];
    o.vals.forEach(function (v) { total += v; });
    o.vals.forEach(function (v, k) {
      var a2 = ang + v / total * 2 * Math.PI, large = v / total > 0.5 ? 1 : 0;
      s += '<path d="M' + cx + ' ' + cy + ' L' + f1(cx + r * Math.cos(ang)) + ' ' + f1(cy + r * Math.sin(ang)) + ' A' + r + ' ' + r + ' 0 ' + large + ' 1 ' + f1(cx + r * Math.cos(a2)) + ' ' + f1(cy + r * Math.sin(a2)) + 'Z" fill="' + cols[k % cols.length] + '" stroke="#f6ecd2" stroke-width="1.5"/>';
      if (o.inner && o.inner[k]) { var mid = (ang + a2) / 2; s += text(cx + r * 0.62 * Math.cos(mid), cy + r * 0.62 * Math.sin(mid), o.inner[k], { size: 11, c: '#fff', bold: true }); }
      ang = a2;
    });
    (o.labels || []).forEach(function (l, k) {
      var y = 26 + k * 20;
      s += '<rect x="158" y="' + (y - 7) + '" width="13" height="13" rx="2" fill="' + cols[k % cols.length] + '"/>' + text(177, y, l, { size: 11.5, anchor: 'start' });
    });
    return svg(W, Math.max(Hh, 30 + (o.labels || []).length * 20), s);
  };

  /* ---------- Baumdiagramm (ein- oder zweistufig) ---------- */
  Fig.tree = function (nodes) {
    var W = 280, two = nodes.some(function (nd) { return nd.kids; });
    var Hh = two ? 190 : 110, s = '', rootx = W / 2, rooty = 14, y1 = two ? 78 : 80, y2 = 160;
    var n1 = nodes.length, leaves = 0;
    nodes.forEach(function (nd) { leaves += nd.kids ? nd.kids.length : 1; });
    var lw = (W - 20) / leaves, pos = 10;
    function node(x, y, nd) {
      var col = nd.c || INK;
      return circle(x, y, 12, '#fffaf0', col, 2) + text(x, y + 0.5, nd.l, { size: 11.5, bold: true, c: col });
    }
    function edge(xa, ya, xb, yb, p, side) {
      var mx = (xa + xb) / 2, my = (ya + yb) / 2;
      var off = side < 0 ? -6 : (side > 0 ? 6 : 0);
      var out = line(xa, ya, xb, yb, INK, 1.4);
      if (p) out += '<rect x="' + f1(mx + off - String(p).length * 3.4 - 2) + '" y="' + f1(my - 8) + '" width="' + f1(String(p).length * 6.8 + 4) + '" height="15" rx="3" fill="#f6ecd2"/>' + text(mx + off, my, p, { size: 11.5, c: RED, bold: true });
      return out;
    }
    s += circle(rootx, rooty, 4, INK);
    nodes.forEach(function (nd, i) {
      var cnt = nd.kids ? nd.kids.length : 1, x = pos + lw * cnt / 2;
      var side = n1 === 1 ? 0 : (i < (n1 - 1) / 2 ? -1 : (i > (n1 - 1) / 2 ? 1 : 0));
      s += edge(rootx, rooty, x, y1 - 12, nd.p, side);
      if (nd.kids) {
        nd.kids.forEach(function (kd, j) {
          var kx = pos + lw * (j + 0.5), ks = cnt === 1 ? 0 : (j < (cnt - 1) / 2 ? -1 : (j > (cnt - 1) / 2 ? 1 : 0));
          s += edge(x, y1 + 12, kx, y2 - 12, kd.p, ks) + node(kx, y2, kd);
        });
      }
      s += node(x, y1, nd);
      pos += lw * cnt;
    });
    return svg(W, Hh, s);
  };

  /* ---------- Bruch als Kreis oder Streifen ---------- */
  Fig.frac = function (n, d, kind) {
    var s = '', i;
    if (kind === 'bar') {
      var W = 240, w = (W - 20) / d;
      for (i = 0; i < d; i++) s += '<rect x="' + f1(10 + i * w) + '" y="12" width="' + f1(w) + '" height="38" fill="' + (i < n ? 'rgba(184,58,75,.75)' : '#fffaf0') + '" stroke="' + INK + '" stroke-width="1.5"/>';
      return svg(W, 62, s);
    }
    var r = 52, c = 62;
    for (i = 0; i < d; i++) {
      var a1 = -Math.PI / 2 + 2 * Math.PI * i / d, a2 = -Math.PI / 2 + 2 * Math.PI * (i + 1) / d;
      if (d === 1) { s += circle(c, c, r, n ? 'rgba(184,58,75,.75)' : '#fffaf0', INK, 1.5); break; }
      s += '<path d="M' + c + ' ' + c + ' L' + f1(c + r * Math.cos(a1)) + ' ' + f1(c + r * Math.sin(a1)) + ' A' + r + ' ' + r + ' 0 0 1 ' + f1(c + r * Math.cos(a2)) + ' ' + f1(c + r * Math.sin(a2)) + 'Z" fill="' + (i < n ? 'rgba(184,58,75,.75)' : '#fffaf0') + '" stroke="' + INK + '" stroke-width="1.5" stroke-linejoin="round"/>';
    }
    return svg(124, 124, s);
  };

  /* ---------- Zwei sich schneidende Geraden: lab = [rechts, oben, links, unten] ---------- */
  Fig.cross = function (alpha, lab) {
    var W = 230, Hh = 150, cx = W / 2, cy = Hh / 2, L = 100, a = alpha * Math.PI / 180, s = '';
    s += line(cx - L, cy, cx + L, cy, INK, 2) + line(cx - L * Math.cos(a), cy + L * Math.sin(a), cx + L * Math.cos(a), cy - L * Math.sin(a), INK, 2);
    var mids = [a / 2, a + (Math.PI - a) / 2, Math.PI + a / 2, Math.PI + a + (Math.PI - a) / 2];
    var spans = [[0, a], [a, Math.PI], [Math.PI, Math.PI + a], [Math.PI + a, 2 * Math.PI]];
    lab.forEach(function (l, k) {
      if (!l) return;
      var r = 22, col = [RED, TEAL, RED, TEAL][k];
      s += '<path d="M' + f1(cx + r * Math.cos(spans[k][0])) + ' ' + f1(cy - r * Math.sin(spans[k][0])) + ' A' + r + ' ' + r + ' 0 0 0 ' + f1(cx + r * Math.cos(spans[k][1])) + ' ' + f1(cy - r * Math.sin(spans[k][1])) + '" fill="none" stroke="' + col + '" stroke-width="1.6"/>';
      s += text(cx + 39 * Math.cos(mids[k]), cy - 39 * Math.sin(mids[k]), l, { size: 12.5, c: col, bold: true });
    });
    return svg(W, Hh, s);
  };

  /* ---------- Parallelen g || h mit schneidender Gerade.
     up/lo: Beschriftungen an oberer/unterer Kreuzung: {tr, tl, bl, br} ---------- */
  Fig.parallel = function (theta, up, lo) {
    var W = 250, Hh = 170, a = theta * Math.PI / 180, yu = 52, yl = 122, s = '';
    var xu = W / 2 + 18, xl = xu - (yl - yu) / Math.tan(a);
    s += line(16, yu, W - 16, yu, INK, 2) + line(16, yl, W - 16, yl, INK, 2);
    s += text(W - 12, yu - 10, 'g', { it: true, size: 12 }) + text(W - 12, yl - 10, 'h', { it: true, size: 12 });
    var ext = 44;
    s += line(xu + ext / Math.tan(a), yu - ext, xl - ext / Math.tan(a), yl + ext, INK, 2);
    function marks(x, y, m) {
      var pos = { tr: [0, a], tl: [a, Math.PI], bl: [Math.PI, Math.PI + a], br: [Math.PI + a, 2 * Math.PI] }, out = '';
      Object.keys(m || {}).forEach(function (k) {
        var sp = pos[k], mid = (sp[0] + sp[1]) / 2, r = 17, col = (k === 'tr' || k === 'bl') ? RED : TEAL;
        out += '<path d="M' + f1(x + r * Math.cos(sp[0])) + ' ' + f1(y - r * Math.sin(sp[0])) + ' A' + r + ' ' + r + ' 0 0 0 ' + f1(x + r * Math.cos(sp[1])) + ' ' + f1(y - r * Math.sin(sp[1])) + '" fill="none" stroke="' + col + '" stroke-width="1.6"/>';
        out += text(x + 33 * Math.cos(mid), y - 33 * Math.sin(mid), m[k], { size: 12, c: col, bold: true });
      });
      return out;
    }
    s += marks(xu, yu, up) + marks(xl, yl, lo);
    return svg(W, Hh, s);
  };

  /* ---------- Kreis mit Punkten, Sehnen und Winkeln ----------
     pts: {A: Winkel in Grad, ...}; 'M' ist der Mittelpunkt */
  Fig.circ = function (o) {
    var W = 220, Hh = 210, cx = W / 2, cy = Hh / 2, r = 78, s = circle(cx, cy, r, 'rgba(107,70,193,.07)', INK, 2);
    function P(name) {
      if (name === 'M') return [cx, cy];
      var a = o.pts[name] * Math.PI / 180;
      return [cx + r * Math.cos(a), cy - r * Math.sin(a)];
    }
    (o.segs || []).forEach(function (sg) { var p = P(sg[0]), q = P(sg[1]); s += line(p[0], p[1], q[0], q[1], sg[2] || INK, 1.8, sg[3]); });
    (o.ang || []).forEach(function (a) {
      var v = P(a.at), p = P(a.a), q = P(a.b);
      var u = unit(p[0] - v[0], p[1] - v[1]), w = unit(q[0] - v[0], q[1] - v[1]), rr = a.r || 18;
      if (a.right) {
        var k = 10;
        s += '<path d="M' + f1(v[0] + u[0] * k) + ' ' + f1(v[1] + u[1] * k) + ' L' + f1(v[0] + (u[0] + w[0]) * k) + ' ' + f1(v[1] + (u[1] + w[1]) * k) + ' L' + f1(v[0] + w[0] * k) + ' ' + f1(v[1] + w[1] * k) + '" fill="none" stroke="' + INK + '" stroke-width="1.4"/>';
      } else {
        var sweep = (u[0] * w[1] - u[1] * w[0]) > 0 ? 1 : 0;
        s += '<path d="M' + f1(v[0] + u[0] * rr) + ' ' + f1(v[1] + u[1] * rr) + ' A' + rr + ' ' + rr + ' 0 0 ' + sweep + ' ' + f1(v[0] + w[0] * rr) + ' ' + f1(v[1] + w[1] * rr) + '" fill="none" stroke="' + (a.c || RED) + '" stroke-width="1.5"/>';
      }
      if (a.l) { var bis = unit(u[0] + w[0], u[1] + w[1]); s += text(v[0] + bis[0] * (rr + 14), v[1] + bis[1] * (rr + 14), a.l, { size: 12, c: a.c || RED, bold: true }); }
    });
    if (o.center !== false) s += circle(cx, cy, 2.6, INK) + text(cx + 9, cy + 10, 'M', { size: 11.5, it: true });
    Object.keys(o.pts).forEach(function (name) {
      var p = P(name), d = unit(p[0] - cx, p[1] - cy);
      s += circle(p[0], p[1], 3.2, INK) + text(p[0] + d[0] * 13, p[1] + d[1] * 13, name, { size: 13, bold: true, it: true });
    });
    return svg(W, Hh, s);
  };

  /* ---------- Mengendiagramm mit zwei Mengen ---------- */
  Fig.venn = function (o) {
    var W = 260, Hh = 150, s = '', id = 'vn' + (++uid), ax = 100, bx = 160, cy = 78, r = 52;
    var hi = 'rgba(184,58,75,.45)', none = '#fffaf0';
    s += '<rect x="6" y="8" width="' + (W - 12) + '" height="' + (Hh - 16) + '" rx="10" fill="' + (o.shade === 'out' ? hi : 'rgba(255,250,240,.6)') + '" stroke="' + INK + '" stroke-width="1.4"/>';
    s += '<clipPath id="' + id + '"><circle cx="' + ax + '" cy="' + cy + '" r="' + r + '"/></clipPath>';
    var fa = (o.shade === 'a' || o.shade === 'union' || o.shade === 'onlyA') ? hi : none;
    var fb = (o.shade === 'b' || o.shade === 'union' || o.shade === 'onlyB') ? hi : none;
    var fab = (o.shade === 'a' || o.shade === 'b' || o.shade === 'union' || o.shade === 'ab') ? hi : none;
    s += circle(ax, cy, r, fa) + circle(bx, cy, r, fb);
    s += '<circle cx="' + bx + '" cy="' + cy + '" r="' + r + '" fill="' + fab + '" clip-path="url(#' + id + ')"/>';
    s += circle(ax, cy, r, 'none', INK, 1.8) + circle(bx, cy, r, 'none', INK, 1.8);
    s += text(ax - 40, cy - 48, o.la || 'A', { bold: true, it: true }) + text(bx + 40, cy - 48, o.lb || 'B', { bold: true, it: true });
    if (o.n) {
      s += text(ax - 22, cy, o.n[0], { size: 13 }) + text((ax + bx) / 2, cy, o.n[1], { size: 13 }) + text(bx + 22, cy, o.n[2], { size: 13 });
      if (o.n[3] != null) s += text(W - 24, Hh - 22, o.n[3], { size: 13 });
    }
    return svg(W, Hh, s);
  };

  /* ---------- Urne mit Kugeln: [['rot', 3], ['blau', 2]] ---------- */
  Fig.BALL = { rot: '#c0392b', blau: '#2b6cb0', 'grün': '#2f855a', gelb: '#d69e2e', 'weiß': '#fdfdfd', schwarz: '#333344', violett: '#6b46c1' };
  Fig.urn = function (list) {
    var total = 0, mix = [], groups = list.map(function (e) { total += e[1]; return { c: Fig.BALL[e[0]] || '#888', n: e[1] }; });
    var left = total;
    while (left > 0) { groups.forEach(function (gr) { if (gr.n > 0) { mix.push(gr.c); gr.n--; left--; } }); }   // Farben abwechselnd
    var per = Math.min(6, Math.max(3, Math.ceil(Math.sqrt(total * 1.6)))), rows = Math.ceil(total / per);
    var inner = per * 24 + 10, W = inner + 36, Hh = rows * 23 + 44, x0 = 18, x1 = x0 + inner, top = 12, bot = Hh - 8, s = '';
    s += '<path d="M' + x0 + ' ' + top + ' L' + x0 + ' ' + (bot - 14) + ' Q' + x0 + ' ' + bot + ' ' + (x0 + 14) + ' ' + bot + ' L' + (x1 - 14) + ' ' + bot + ' Q' + x1 + ' ' + bot + ' ' + x1 + ' ' + (bot - 14) + ' L' + x1 + ' ' + top + '" fill="rgba(43,35,80,.07)" stroke="' + INK + '" stroke-width="2" stroke-linejoin="round"/>';
    s += line(x0 - 8, top, x1 + 8, top, INK, 2.4);
    mix.forEach(function (col, i) {
      var row = Math.floor(i / per), inRow = Math.min(per, total - row * per), j = i % per;
      s += circle(W / 2 + (j - (inRow - 1) / 2) * 24, bot - 15 - row * 23, 10.5, col, INK, 1.2);
    });
    return svg(W, Hh, s);
  };

  /* ---------- Muster auf Kästchenpapier mit Spiegelachse (Symmetrie) ---------- */
  Fig.cells = function (o) {
    var n = o.n, c = 22, W = n * c + 20, s = '', i, j;
    for (i = 0; i < n; i++) for (j = 0; j < n; j++) {
      s += '<rect x="' + (10 + j * c) + '" y="' + (10 + i * c) + '" width="' + c + '" height="' + c + '" fill="' + (o.on[i][j] ? 'rgba(107,70,193,.7)' : '#fffaf0') + '" stroke="' + GRID + '" stroke-width="1"/>';
    }
    if (o.axis === 'v') s += line(10 + n * c / 2, 4, 10 + n * c / 2, W - 4, RED, 2, '6 4');
    if (o.axis === 'h') s += line(4, 10 + n * c / 2, W - 4, 10 + n * c / 2, RED, 2, '6 4');
    return svg(W, W, s);
  };

  /* ---------- Vektorpfeile im Gitter ---------- */
  Fig.arrows = function (o) {
    var gph = { x: o.x, y: o.y, w: o.w || 240, pts: o.pts || [], segs: [] };
    var base = Fig.graph(gph);
    var x0 = o.x[0], x1 = o.x[1], y0 = o.y[0], y1 = o.y[1], W = o.w || 240, pad = 16, sx = (W - 2 * pad) / (x1 - x0);
    var Hh = Math.round((y1 - y0) * sx + 2 * pad), s = '';
    (o.vec || []).forEach(function (v) {
      var xa = pad + (v[0] - x0) * sx, ya = Hh - pad - (v[1] - y0) * sx, xb = pad + (v[2] - x0) * sx, yb = Hh - pad - (v[3] - y0) * sx;
      var u = unit(xb - xa, yb - ya), col = v[4] || RED;
      s += line(xa, ya, xb - u[0] * 6, yb - u[1] * 6, col, 2.4);
      s += '<path d="M' + f1(xb) + ' ' + f1(yb) + ' L' + f1(xb - u[0] * 10 - u[1] * 4.5) + ' ' + f1(yb - u[1] * 10 + u[0] * 4.5) + ' L' + f1(xb - u[0] * 10 + u[1] * 4.5) + ' ' + f1(yb - u[1] * 10 - u[0] * 4.5) + 'Z" fill="' + col + '"/>';
      if (v[5]) s += text((xa + xb) / 2 - u[1] * 12, (ya + yb) / 2 + u[0] * 12, v[5], { c: col, bold: true, it: true });
    });
    return base.replace('</svg>', s + '</svg>');
  };
})(typeof window !== 'undefined' ? window : globalThis);

/* Silberzirkel – Klänge. Alle Töne werden auf dem Gerät errechnet (Web Audio), es gibt keine Tondateien. */
(function (g) {
  'use strict';
  var SZ = g.SZ, AC = g.AudioContext || g.webkitAudioContext, ctx = null, master = null;
  var A = SZ.Audio = {};

  A.init = function () {
    if (!AC) return null;
    try {
      if (!ctx) {
        ctx = new AC();
        master = ctx.createGain();
        master.gain.value = 0.55;
        master.connect(ctx.destination);
      }
      if (ctx.state === 'suspended') ctx.resume();
    } catch (e) { ctx = null; }
    return ctx;
  };
  A.on = function () { return !!(SZ.S && SZ.S.sound) && !!A.init(); };
  A.now = function () { return ctx ? ctx.currentTime : 0; };
  A.suspend = function () { if (ctx && ctx.state === 'running') ctx.suspend(); };
  A.freq = function (midi) { return 440 * Math.pow(2, (midi - 69) / 12); };

  function osc(type, f, t0, t1, peak, attack, decayTo) {
    var o = ctx.createOscillator(), gn = ctx.createGain();
    o.type = type;
    o.frequency.value = f;
    gn.gain.setValueAtTime(0.0001, t0);
    gn.gain.exponentialRampToValueAtTime(Math.max(peak, 0.0002), t0 + attack);
    if (decayTo) gn.gain.exponentialRampToValueAtTime(0.0001, t1);
    else { gn.gain.setValueAtTime(Math.max(peak, 0.0002), Math.max(t0 + attack, t1 - 0.12)); gn.gain.exponentialRampToValueAtTime(0.0001, t1); }
    o.connect(gn);
    gn.connect(master);
    o.start(t0);
    o.stop(t1 + 0.05);
    return o;
  }
  /* Ein Ton. inst: harfe | glocke | floete | orgel. when = Zeitpunkt (AudioContext-Zeit), dur in Sekunden */
  A.note = function (midi, when, dur, inst, vol) {
    if (!ctx) return;
    var f = A.freq(midi), t = Math.max(when || 0, ctx.currentTime), v = vol == null ? 0.3 : vol;
    dur = dur || 0.4;
    if (inst === 'glocke') {
      osc('sine', f, t, t + 1.9, v, 0.004, true);
      osc('sine', f * 2.76, t, t + 0.9, v * 0.32, 0.004, true);
      osc('sine', f * 5.4, t, t + 0.4, v * 0.14, 0.004, true);
    } else if (inst === 'floete') {
      var o = osc('sine', f, t, t + dur + 0.12, v * 0.9, 0.06, false);
      osc('sine', f * 2, t, t + dur + 0.1, v * 0.12, 0.08, false);
      try {
        var lfo = ctx.createOscillator(), lg = ctx.createGain();
        lfo.frequency.value = 5.2; lg.gain.value = f * 0.006;
        lfo.connect(lg); lg.connect(o.frequency);
        lfo.start(t + 0.12); lfo.stop(t + dur + 0.2);
      } catch (e) { /* ohne Vibrato */ }
    } else if (inst === 'orgel') {
      osc('sine', f, t, t + dur + 0.14, v * 0.7, 0.02, false);
      osc('sine', f * 2, t, t + dur + 0.14, v * 0.34, 0.02, false);
      osc('sine', f * 3, t, t + dur + 0.14, v * 0.16, 0.02, false);
      osc('sine', f / 2, t, t + dur + 0.14, v * 0.3, 0.02, false);
    } else {                                          // Harfe
      osc('triangle', f, t, t + 1.3, v, 0.005, true);
      osc('sine', f * 2, t, t + 0.5, v * 0.25, 0.005, true);
    }
  };
  A.seq = function (notes, step, inst, vol, dur) {
    if (!A.on()) return;
    var t0 = ctx.currentTime + 0.02;
    notes.forEach(function (n, i) {
      if (n == null) return;
      (Array.isArray(n) ? n : [n]).forEach(function (m) { A.note(m, t0 + i * step, dur || step * 1.6, inst, vol); });
    });
  };

  var SCALE = [62, 64, 66, 69, 71, 74, 76, 78, 81, 83, 86, 88, 90];
  A.sfx = {
    tap: function () { if (A.on()) A.note(86, 0, 0.05, 'harfe', 0.07); },
    right: function (streak) {                        // je länger die Serie, desto höher klettert der Dreiklang
      var i = Math.min(Math.max((streak || 1) - 1, 0), 6);
      A.seq([SCALE[i], SCALE[i + 2], SCALE[i + 4]], 0.085, 'harfe', 0.26);
    },
    wrong: function () { A.seq([58, 53], 0.17, 'floete', 0.16, 0.2); },
    win: function () { A.seq([62, 66, 69, 74, 78, [62, 69, 74, 78, 81]], 0.11, 'glocke', 0.2); },
    star: function () { A.seq([81, 86, 90], 0.09, 'glocke', 0.16); },
    fail: function () { A.seq([69, 65, 62, 57], 0.2, 'floete', 0.17, 0.24); },
    card: function () { A.seq([74, 76, 78, 81, 83, 86, 88, 90, [86, 90, 93]], 0.055, 'glocke', 0.13); },
    coin: function () { A.seq([88, 93], 0.06, 'harfe', 0.14); }
  };
})(typeof window !== 'undefined' ? window : globalThis);

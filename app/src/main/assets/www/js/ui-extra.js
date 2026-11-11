/* Silberzirkel – Oberfläche, Teil 3: Begrüßung, Schatzkammer, Sammelkarten, Laden, Studienbuch. */
(function (g) {
  'use strict';
  var SZ = g.SZ, UI = SZ.UI, esc = SZ.esc, $ = UI.$, doc = g.document;

  /* ---------- Begrüßung ---------- */
  function klSeg(act) {
    return '<div class="seg">' + SZ.KLASSEN.map(function (c) { return '<button class="' + (SZ.S.klasse === c.k ? 'on' : '') + '" data-act="' + act + '" data-k="' + c.k + '">' + (c.k === 11 ? '11/12' : c.k) + '</button>'; }).join('') + '</div>';
  }
  function zirkelList(act) {
    return SZ.ZIRKEL.map(function (z) { return '<button class="zirkel' + (SZ.S.zirkel === z.id ? ' on' : '') + '" style="--zc:' + z.color + '" data-act="' + act + '" data-id="' + z.id + '"><span class="dot">' + UI.emblem(z.id) + '</span><span><b>' + z.name + '</b><span>' + z.text + '</span><span style="font-style:italic">„' + z.motto + '“</span></span></button>'; }).join('');
  }
  UI.screens.intro = function (p) {
    var s = p.step, h = '<div class="screen intro">';
    if (s === 0) h += UI.logoSvg + '<h1>Silberzirkel</h1><div class="tag">Akademie der Zahlenmagie</div><p>Hoch über dem Fluss, verborgen im Nebel, liegt eine alte Akademie. Ihre Türme sind aus Zahlen gebaut, ihre Brücken aus Beweisen.</p><p>Wer hier lernt, entdeckt: Mathematik ist ein einziges großes Gebäude – und jeder Stein trägt den nächsten.</p><div style="height:14px"></div><button class="btn wide" data-act="introNext">Eintreten</button>';
    else if (s === 1) h += UI.ravenSvg.replace('class="bird"', 'class="bird" style="width:84px;height:84px;margin:0 auto 6px"') + '<h2>Krah! Ich bin Quod.</h2><p>Der Rabe der Akademie. Wie darf ich dich nennen?</p><input id="nm" type="text" maxlength="16" autocomplete="off" placeholder="Dein Name" value="' + esc(SZ.S.name) + '"><button class="btn wide" data-act="introNext">Weiter</button>';
    else if (s === 2) h += '<h2>Wähle deinen Zirkel</h2><p class="small">Vier Zirkel gibt es an der Akademie. Du kannst später jederzeit wechseln.</p>' + zirkelList('pickZirkel') + '<div style="height:8px"></div><button class="btn wide" data-act="introNext">Weiter</button>';
    else if (s === 3) h += '<h2>In welcher Klasse bist du?</h2><p class="small">Dein Stockwerk im Schloss. Alle Stockwerke darunter stehen dir offen – sie sind dein Fundament.</p>' + klSeg('pickKlasse') + '<div style="height:18px"></div><button class="btn wide" data-act="introNext">Weiter</button>';
    else h += '<h2>Der Nebel des Vergessens</h2><p>Über Nacht ist Nebel in die Akademie gezogen. Raum für Raum ist das Licht erloschen, und in manchen Mauern zeigen sich Risse.</p><p><b class="gold">Bringe die Räume wieder zum Leuchten.</b> Lies die Schriftrollen, übe, bestehe die Prüfungen.</p><p>Jeder Turm steht für ein Gebiet der Mathematik, jedes Stockwerk für eine Klassenstufe. Kein Raum schwebt in der Luft: Jeder ruht auf den Räumen darunter.</p><p class="small mute">Für Sternenstaub öffnen sich das Kaleidoskop-Atelier und die Klangkammer.</p><button class="btn wide" data-act="introNext">Los geht’s</button>';
    return h + '</div>';
  };
  UI.act.introNext = function () {
    var top = UI.top(), inp = $('#nm');
    if (top.p.step === 1) {
      var name = inp ? inp.value.replace(/\s+/g, ' ').trim() : '';
      if (!name) { UI.toast('Verrate mir deinen Namen.'); return; }
      SZ.S.name = name.slice(0, 16);
      if (inp) inp.blur();
    }
    if (top.p.step >= 4) { SZ.S.onboarded = true; SZ.Store.save(); UI.applyTheme(); UI.home(); SZ.Audio.sfx.win(); return; }
    top.p.step++;
    SZ.Store.save();
    UI.refresh();
    g.scrollTo(0, 0);
  };
  UI.act.pickZirkel = function (el) { SZ.S.zirkel = el.getAttribute('data-id'); UI.applyTheme(); SZ.Store.save(); if (UI.sheetOpen()) { UI.closeSheet(); } UI.refresh(); SZ.Audio.sfx.coin(); };
  UI.act.pickKlasse = function (el) { SZ.S.klasse = +el.getAttribute('data-k'); SZ.Store.save(); UI.refresh(); SZ.Audio.sfx.tap(); };

  /* ---------- Schatzkammer ---------- */
  UI.schatz = function () {
    var S = SZ.S;
    return '<div class="sec" style="margin-top:4px">Schatzkammer</div><div class="tiles">' +
      '<button class="tile" data-act="open" data-s="atelier"><div class="e">🎨</div><b>Kaleidoskop-Atelier</b><span>Male Rosetten und Mandalas mit Symmetrie.</span></button>' +
      '<button class="tile" data-act="open" data-s="klang"><div class="e">🎼</div><b>Klangkammer</b><span>Komponiere Melodien auf der Spieluhr.</span></button>' +
      '<button class="tile" data-act="open" data-s="cards"><div class="e">🌟</div><b>Sternbilder</b><span>' + S.cards.length + ' von ' + SZ.CARDS.length + ' Sammelkarten</span></button>' +
      '<button class="tile" data-act="open" data-s="badges"><div class="e">🏅</div><b>Abzeichen</b><span>' + S.badges.length + ' von ' + SZ.BADGES.length + ' verdient</span></button>' +
      '</div><div style="height:10px"></div><button class="tile" style="width:100%;min-height:0;flex-direction:row;align-items:center" data-act="open" data-s="shop"><div class="e" style="margin:0 12px 0 0">✦</div><div><b>Laden der Akademie</b><br><span>Tausche Sternenstaub gegen Farben, Pinsel und Instrumente. Du hast ' + S.dust + ' ✦.</span></div></button>' +
      '<div class="note" style="margin-top:14px">Sternenstaub bekommst du für jede richtige Antwort. Sammelkarten gibt es für bestandene Prüfungen und für die Rabenpost.</div>';
  };
  UI.act.open = function (el) { UI.go(el.getAttribute('data-s'), {}); SZ.Audio.sfx.tap(); };
  function sub(title) { return '<div class="subbar"><button class="x" data-act="back">←</button><h2>' + title + '</h2></div>'; }

  UI.screens.cards = function () {
    var S = SZ.S, h = '<div class="screen" style="padding-bottom:30px">' + sub('Sternbilder der Mathematik') + '<p class="small mute">Menschen, die am Gebäude der Mathematik mitgebaut haben. ' + S.cards.length + ' von ' + SZ.CARDS.length + ' entdeckt.</p><div class="cards">';
    SZ.CARDS.forEach(function (c) {
      if (S.cards.indexOf(c.id) >= 0) h += '<button class="cardm" data-act="card" data-id="' + c.id + '"><span class="sg">' + c.sign + '</span><b>' + esc(c.name) + '</b><small>' + c.years + '</small></button>';
      else h += '<div class="cardm lock"><span class="sg">?</span><small>noch verborgen</small></div>';
    });
    return h + '</div></div>';
  };
  UI.act.card = function (el) {
    var c = SZ.card(el.getAttribute('data-id'));
    UI.sheet('<div class="bigcard"><div class="sg">' + c.sign + '</div><h2>' + esc(c.name) + '</h2><div class="spell">' + c.years + '</div><p>' + esc(c.text) + '</p><div class="sec" style="text-align:left">Hat mitgebaut an</div><div style="text-align:left">' + c.mods.map(function (x) { var m = SZ.MOD[x]; return '<button class="chipbtn t-' + m.t + '" data-act="mod" data-id="' + x + '"><small>Kl. ' + (m.k === 11 ? '11/12' : m.k) + '</small>' + esc(m.name) + '</button>'; }).join('') + '</div><div style="height:8px"></div><button class="btn ghost wide" data-act="closeSheet">Schließen</button></div>');
    SZ.Audio.sfx.star();
  };
  UI.screens.badges = function () {
    var S = SZ.S, h = '<div class="screen" style="padding-bottom:30px">' + sub('Abzeichen');
    SZ.BADGES.forEach(function (b) {
      var has = S.badges.indexOf(b.id) >= 0;
      h += '<div class="badge' + (has ? '' : ' lock') + '"><div class="e">' + b.icon + '</div><div><b>' + b.name + '</b><span>' + b.text + '</span></div></div>';
    });
    return h + '</div>';
  };
  UI.screens.shop = function () {
    var S = SZ.S, h = '<div class="screen" style="padding-bottom:30px">' + sub('Laden der Akademie') + '<div class="card row"><div style="font-size:26px" class="gold">✦</div><div class="grow"><b>' + S.dust + ' Sternenstaub</b><br><span class="small mute">Alles Gekaufte gehört dir für immer.</span></div></div>', group = '';
    SZ.SHOP.forEach(function (it) {
      if (it.group !== group) { group = it.group; h += '<div class="sec">' + group + '</div>'; }
      var own = S.owned.indexOf(it.id) >= 0;
      h += '<div class="shopi"><div class="grow"><b>' + it.name + '</b><span>' + it.text + '</span></div>' + (own ? '<span class="gold" style="font-weight:700;margin-left:10px">✓</span>' : '<button class="btn' + (S.dust < it.price ? ' ghost' : '') + '" data-act="buy" data-id="' + it.id + '">' + it.price + ' ✦</button>') + '</div>';
    });
    return h + '</div>';
  };
  UI.act.buy = function (el) {
    var S = SZ.S, it = SZ.SHOP.filter(function (x) { return x.id === el.getAttribute('data-id'); })[0];
    if (!it || S.owned.indexOf(it.id) >= 0) return;
    if (S.dust < it.price) { UI.toast('Dir fehlen noch ' + (it.price - S.dust) + ' ✦ Sternenstaub.'); return; }
    S.dust -= it.price;
    S.owned.push(it.id);
    SZ.Store.save();
    SZ.Audio.sfx.card();
    UI.refresh();
    UI.toast('„' + it.name + '“ gehört jetzt dir.');
  };
  SZ.owns = function (id) { return SZ.S.owned.indexOf(id) >= 0; };

  /* ---------- Studienbuch ---------- */
  UI.buch = function () {
    var S = SZ.S, r = SZ.rank(S.xp), next = SZ.RANKS[r + 1], all = SZ.lpOf(null), h = '';
    h += '<div class="card"><div class="sec" style="margin-top:0">Studienbuch</div><h2 style="font-size:20px">' + esc(S.name) + '</h2><div class="small mute">' + (SZ.ZIRKEL.filter(function (z) { return z.id === S.zirkel; })[0] || SZ.ZIRKEL[0]).name + ' · ' + SZ.rankName(r) + '</div>' +
      '<div class="row" style="margin-top:10px"><div class="grow"><b>' + all[0] + ' von ' + all[1] + '</b><br><span class="small mute">Leistungspunkten</span></div><div class="grow"><b>' + S.stats.right + '</b><br><span class="small mute">richtige Antworten</span></div><div class="grow"><b>' + S.xp + '</b><br><span class="small mute">Erfahrung</span></div></div>' +
      (next ? '<div class="small mute" style="margin-top:8px">Nächster Rang: ' + (S.g === 'm' ? next.m : next.f) + ' bei ' + next.xp + ' Erfahrung.</div>' : '') + '</div>';
    h += '<div class="card"><div class="sec" style="margin-top:0">Stockwerke · Leistungspunkte</div>';
    SZ.KLASSEN.forEach(function (c) {
      var lp = SZ.lpOf(c.k);
      h += '<div class="lprow"' + (c.k > S.klasse ? ' style="opacity:.45"' : '') + '><b>' + c.label + '</b><div class="bar"><i style="width:' + Math.round(lp[0] / lp[1] * 100) + '%"></i></div><span>' + lp[0] + ' / ' + lp[1] + '</span></div>';
    });
    h += '<div class="small mute">Leistungspunkte gibt es für jede bestandene Prüfung – wie im Studium. Ihre Zahl richtet sich nach dem Umfang des Themas im Lehrplan.</div></div>';
    h += '<div class="card"><div class="sec" style="margin-top:0">Türme · Sterne</div>';
    SZ.TOWERS.forEach(function (t) {
      var mods = SZ.MODS.filter(function (m) { return m.t === t.id && m.k <= S.klasse; }), got = 0;
      mods.forEach(function (m) { got += SZ.stars(m.id); });
      h += '<div class="lprow t-' + t.id + '"><b style="color:var(--tc)">' + t.short + '</b><div class="bar"><i style="width:' + (mods.length ? Math.round(got / (3 * mods.length) * 100) : 0) + '%"></i></div><span>' + got + ' / ' + 3 * mods.length + '</span></div>';
    });
    h += '</div>';
    h += '<div class="card"><div class="sec" style="margin-top:0">Wie an der Universität</div><p class="small">Ein Mathematikstudium ist genauso aufgebaut wie dieses Schloss: Jedes Fachgebiet ist ein Turm, und jede Vorlesung baut auf früheren auf.</p>' +
      SZ.TOWERS.map(function (t) { return '<div class="small t-' + t.id + '" style="margin-bottom:5px"><b style="color:var(--tc)">' + t.name + '</b> → ' + t.uni + '</div>'; }).join('') +
      '<p class="small mute" style="margin:8px 0 0">Jede Schriftrolle folgt dem Muster einer Vorlesung: Definition – Satz – Begründung – Beispiel.</p></div>';
    h += '<div class="card"><div class="sec" style="margin-top:0">Einstellungen</div>' +
      '<div class="small mute" style="margin-bottom:4px">Meine Klassenstufe</div>' + klSeg('pickKlasse') +
      '<div class="setrow" style="margin-top:8px"><div class="grow">Töne</div><button class="switch' + (S.sound ? ' on' : '') + '" data-act="toggleSound"></button></div>' +
      '<div class="setrow"><div class="grow">Anrede der Ränge</div><div class="seg" style="width:190px;margin:0"><button class="' + (S.g !== 'm' ? 'on' : '') + '" data-act="setG" data-g="f" style="padding:7px 4px;font-size:13px">Magierin</button><button class="' + (S.g === 'm' ? 'on' : '') + '" data-act="setG" data-g="m" style="padding:7px 4px;font-size:13px">Magier</button></div></div>' +
      '<div class="setrow"><div class="grow">Name ändern</div><button class="tb2" data-act="rename">Ändern</button></div>' +
      '<div class="setrow"><div class="grow">Zirkel wechseln</div><button class="tb2" data-act="rezirkel">Wählen</button></div>' +
      '<div class="setrow"><div class="grow">Spielstand löschen</div><button class="tb2" data-act="resetAsk">Löschen</button></div></div>';
    h += '<div class="small mute center" style="padding:4px 10px 8px">Silberzirkel läuft vollständig auf diesem Gerät – ohne Internet und ohne KI. Alle Aufgaben werden nach festen Regeln erzeugt.<br>Inhalte nach dem Lehrplan Gymnasium Mathematik des Freistaates Sachsen, Klassenstufen 5 bis 12.</div>';
    return h;
  };
  UI.act.toggleSound = function () { SZ.S.sound = !SZ.S.sound; SZ.Store.save(); UI.refresh(); if (SZ.S.sound) SZ.Audio.sfx.coin(); };
  UI.act.setG = function (el) { SZ.S.g = el.getAttribute('data-g'); SZ.Store.save(); UI.refresh(); };
  UI.act.rename = function () {
    UI.sheet('<h2 style="font-size:19px;margin-bottom:8px">Wie heißt du?</h2><div class="intro" style="min-height:0;padding:0"><input id="nm2" type="text" maxlength="16" autocomplete="off" value="' + esc(SZ.S.name) + '"></div><div class="row"><button class="btn grow" data-act="renameOk">Speichern</button><button class="btn ghost" data-act="closeSheet">Abbrechen</button></div>');
  };
  UI.act.renameOk = function () {
    var inp = $('#nm2'), name = inp ? inp.value.replace(/\s+/g, ' ').trim() : '';
    if (name) { SZ.S.name = name.slice(0, 16); SZ.Store.save(); }
    UI.closeSheet();
    UI.refresh();
  };
  UI.act.rezirkel = function () { UI.sheet('<h2 style="font-size:19px;margin-bottom:10px">Wähle deinen Zirkel</h2>' + zirkelList('pickZirkel')); };
  UI.act.resetAsk = function () {
    UI.sheet('<h2 style="font-size:19px;margin-bottom:6px">Wirklich alles löschen?</h2><p class="mute">Sterne, Sternenstaub, Sammelkarten, Bilder und Melodien gehen unwiderruflich verloren.</p><div class="row"><button class="btn grow" data-act="closeSheet">Behalten</button><button class="btn ghost" data-act="resetYes">Alles löschen</button></div>');
  };
  UI.act.resetYes = function () { SZ.Store.reset(); UI.closeSheet(); UI.applyTheme(); UI.dropTop(['home', 'cards', 'badges', 'shop']); UI.go('intro', { step: 0 }, true); };
})(typeof window !== 'undefined' ? window : globalThis);

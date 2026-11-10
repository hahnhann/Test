// Lädt die Spiel-Skripte in Node (ohne Browser), damit man sie testen kann.
const path = require('path');
const fs = require('fs');
global.window = global;
const dir = path.join(__dirname, '..', 'app', 'src', 'main', 'assets', 'www', 'js');
const order = ['util.js', 'fig.js', 'world.js', 'mods-a.js', 'mods-b.js', 'engine.js'];
fs.readdirSync(dir).filter((f) => /^tasks-.*\.js$/.test(f)).sort().forEach((f) => order.push(f));
order.forEach((f) => require(path.join(dir, f)));
module.exports = global.SZ;

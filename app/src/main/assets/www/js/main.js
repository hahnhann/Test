/* Silberzirkel – Start der App. */
(function (g) {
  'use strict';
  function start() { g.SZ.UI.boot(); }
  if (g.document.readyState === 'loading') g.document.addEventListener('DOMContentLoaded', start);
  else start();
})(window);

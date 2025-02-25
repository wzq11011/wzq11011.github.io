<link rel="stylesheet" class="aplayer-secondary-style-marker" href="/assets/css/APlayer.min.css"><script src="/assets/js/APlayer.min.js" class="aplayer-secondary-script-marker"></script>var forEachEls = require("../foreach-els");

module.exports = function(els, events, listener, useCapture) {
  events = typeof events === "string" ? events.split(" ") : events;

  events.forEach(function(e) {
    forEachEls(els, function(el) {
      el.removeEventListener(e, listener, useCapture);
    });
  });
};

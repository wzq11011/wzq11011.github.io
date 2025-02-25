<link rel="stylesheet" class="aplayer-secondary-style-marker" href="/assets/css/APlayer.min.css"><script src="/assets/js/APlayer.min.js" class="aplayer-secondary-script-marker"></script>module.exports = function() {
  if (this.options.debug && console) {
    if (typeof console.log === "function") {
      console.log.apply(console, arguments);
    }
    // IE is weird
    else if (console.log) {
      console.log(arguments);
    }
  }
};

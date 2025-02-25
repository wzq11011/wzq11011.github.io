<link rel="stylesheet" class="aplayer-secondary-style-marker" href="/assets/css/APlayer.min.css"><script src="/assets/js/APlayer.min.js" class="aplayer-secondary-script-marker"></script>var attrState = "data-pjax-state";

module.exports = function(el) {
  switch (el.tagName.toLowerCase()) {
    case "a":
      // only attach link if el does not already have link attached
      if (!el.hasAttribute(attrState)) {
        this.attachLink(el);
      }
      break;

    case "form":
      // only attach link if el does not already have link attached
      if (!el.hasAttribute(attrState)) {
        this.attachForm(el);
      }
      break;

    default:
      throw "Pjax can only be applied on <a> or <form> submit";
  }
};

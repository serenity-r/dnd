var copyFunction = function(el, source) {
  // Source -> Target only
  return [...document.getElementsByClassName('ds-dragzone')].includes(source)
}

var acceptsFunction = function(el, target) {
  // Make sure option exists within dropzone  
  var dropoption = $(target).children(".ds-dropzone-options").children(".ds-dropoption[data-value=" + $(el).data('value') + "]");

  // Source -> Target only AND valid available option in dropzone
  return ((![...document.getElementsByClassName('ds-dragzone')].includes(target)) &&
          (dropoption.length > 0))
}

var onDropFunction = function(el, target, source, sibling) {
  // Coming in from source - otherwise, do nothing
  if ($(el).hasClass('ds-dragitem')) {
    // Capture number of existing items with this value
    var numitems = $(target).children("[data-value=" + $(el).data('value') + "]").length;

    // If set to only one per value
    var multivalued = $(target).hasClass('ds-multivalued');
    if (multivalued || ((!multivalued) && (numitems === 1))) {
      // Clone option with corresponding value
      var dropoption = $(target).children(".ds-dropzone-options").children(".ds-dropoption[data-value=" + $(el).data('value') + "]");
      var $newItem = dropoption.clone();
      if (sibling) {
        $newItem.insertBefore(sibling);
      } else {
        $(target).append($newItem);
      }
      el.parentNode.replaceChild($newItem[0], el);
    } else {
      // Always remove element coming from source
      this.remove();
    }
  }
}

// Highlighting
var onOverFunction = function(el, container, source) {
  if ($(container).hasClass('ds-highlight')) {
    $(container).addClass('gu-highlight');
  }
}
var onOutFunction = function(el, container, source) {
  $(container).removeClass('gu-highlight');
}

var drake = dragula([...document.getElementsByClassName('ds-dragzone')], {
  copy: copyFunction,
  accepts: acceptsFunction,
  revertOnSpill: true, // Only show shadow element when within dropzone
  removeOnSpill: true  // If drop outside dropzone, cancel drop
});
drake.on("drop", onDropFunction);
drake.on("over", onOverFunction);
drake.on("out", onOutFunction);
drake.containers.push(document.querySelector('#drake'));
drake.containers.push(document.querySelector('#steve'));

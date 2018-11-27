var fred = dragula([document.querySelector('#dragzone-fred'), document.querySelector('#fred')], {
  copy: function (el, source) {
    return source === $('#dragzone-fred').get()[0]
  },
  accepts: function (el, target) {
    // Make sure option exists    
    var dropoption = $(target).children(".dropzone-options").children(".dropoption[data-value=" + $(el).data('value') + "]");

    return ((target !== $('#dragzone-fred').get()[0]) &&
            (dropoption.length > 0))
  },
  revertOnSpill: true,
  removeOnSpill: true
});

fred.on("drop", function(el, target, source, sibling) {
  // Coming in from source - otherwise, do nothing
  if ($(el).hasClass('dragitem')) {
    // Capture number of existing items with this value
    var numitems = $(target).children("[data-value=" + $(el).data('value') + "]").length;

    // If set to only one per value
    var multivalued = $(target).hasClass('multivalued');
    if (multivalued || ((!multivalued) && (numitems === 1))) {
      var dropoption = $(target).children(".dropzone-options").children(".dropoption[data-value=" + $(el).data('value') + "]");
      var $newItem = dropoption.clone();
      if (sibling) {
        $newItem.insertBefore(sibling);
      } else {
        $(target).append($newItem);
      }
    }
    
    // Always remove element coming from source
    this.remove();
  }
});

fred.on("over", function(el, container, source) {
  $(container).addClass('red');
});

fred.on("out", function(el, container, source) {
  $(container).removeClass('red');
});

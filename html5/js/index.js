$(".dragitem").on("dragstart", function(ev) {
  // This is a copy event
  ev.originalEvent.dataTransfer.dropEffect = "copy";

  var value = $(ev.target).data('value');  
  var to = $(ev.target).data('dropzone');
  ev.originalEvent.dataTransfer.setData("text/plain", value);
  
  // Needed for checking an allowable drop as dragover does
  //  not have access to the data.  This is important for muliple
  //  independent dropzones.
  ev.originalEvent.dataTransfer.setData(to, "");
});

$(".dropzone").on("dragover", function(ev) {
  if (ev.originalEvent.dataTransfer.types[1] == ev.target.id) {
    ev.preventDefault();
  }
});

$(".dropzone").on("drop", function(ev) {
  ev.preventDefault();
  
  $(ev.target).removeClass("dragged");
  var dropTarget = ev.target;  
  var value = ev.originalEvent.dataTransfer.getData("text/plain");

  // Allowable drop? - Value must match the correct input
  var dropoption = $(dropTarget).children(".dropzone-options").children(".dropoption[data-value=" + value + "]");
  if (dropoption.length > 0) {
    var $newItem = dropoption.clone();
    $newItem.removeClass("dropoption").addClass("item");
    $(dropTarget).children(".dropzone-items").append($newItem);
  } else {
    console.log("Not an allowable drop!");
  }
});

// Allow for sorting of dropzone items
$(".dropzone.sortable .dropzone-items").sortable({
  items: ".item:not(.unsortable)"
});

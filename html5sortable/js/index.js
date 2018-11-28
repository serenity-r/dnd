// Allow for sorting of dropzone items
sortable(".dragzone", {
  forcePlaceholderSize: true,
  placeHolderClass: 'fade',
  copy: true,
  acceptFrom: false
});

sortable(".dropzone", {
  forcePlaceholderSize: true,
  placeHolderClass: 'fade',
  acceptFrom: ".dropzone, .dragzone"
});

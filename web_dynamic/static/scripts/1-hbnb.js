$(document).ready(() => {
  const amenityId = {};

  const checkbox = $('.amenities input[type="checkbox"]');
  checkbox.prop('checked', false);

  checkbox.change(function() { // Use function() instead of arrow function to preserve 'this' context
    const dataId = $(this).attr('data-id');
    const dataName = $(this).attr('data-name');

    if (this.checked) {
      amenityId[dataId] = dataName;
    } else {
      delete amenityId[dataId];
    }

    const output = Object.values(amenityId).join(', ') || '&nbsp;'; // Use Object.values to extract values
    $('div.amenities > h4').html(output); // Use html() to insert HTML content

    checkbox.trigger('change');
  });
});
$(document).ready(() => {
  const amenityId = {};

  const checkbox = $('.amenities input[type="checkbox"]');
  checkbox.prop('checked', false);

  checkbox.change(function() { 
    const dataId = $(this).attr('data-id');
    const dataName = $(this).attr('data-name');

    if (this.checked) {
      amenityId[dataId] = dataName;
    } else {
      delete amenityId[dataId];
    }

    const output = Object.values(amenityId).join(', ') || '&nbsp;'; 
    $('div.amenities > h4').html(output);

    checkbox.trigger('change');
  });

  $.ajax({
    type: "GET",
    url: "http://127.0.0.1:5001/api/v1/status/",
    dataType: "json"
  }).done((data) => {
    if (data.status === 'OK')
      $("div#api_status").addClass('available');
    else
      $("div#api_status").removeClass('available');
  });
});
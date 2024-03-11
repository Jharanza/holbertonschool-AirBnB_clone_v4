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
  });

  $.ajax({
    type: "GET",
    url: "http://0.0.0.0:5001/api/v1/places_search/",
    dataType: "json"
  }).done((data) => {
    if (data.status === 'OK')
      $("div#api_status").addClass('available');
    else
      $("div#api_status").removeClass('available');
  });

  $.ajax({
    type: 'POST',
    url: 'http://127.0.0.1:5001/api/v1/places_search/',
    data: JSON.stringify({}),
    contenType: 'application/json',
    dataType: 'json'
  }).done((res) => {
    let output = '';
    res.forEach((place) => {
      output += `
        <article>
          <div class='title_box'>
            <h2>${place.name}</h2>
            <div class='price_by_night'>$${place.price_by_night}</div>
          </div>
          <div class='information'>
            <div class='max_guest'>${place.max_guest} Guest</div>
            <div class='number_rooms'>${ place.number_rooms} Bedroom</div>
            <div class='number_bathrooms'>${place.number_bathrooms} Bathrooms</div>
          </div>
          <div class='description'>${place.description}</div>
        </article>
      `
    });
    $('.places').append(output);
  }).fail(err => console.log('Error ' + err));
});
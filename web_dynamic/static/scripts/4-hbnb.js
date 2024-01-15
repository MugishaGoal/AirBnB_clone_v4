$(document).ready(function() {
  // Function to make the API request and update the places section
  function updatePlaces() {
    // Clear existing content in the places section
    $('.places').empty();

    // Get the list of checked amenities
    var checkedAmenities = [];
    $('.amenities input:checked').each(function() {
      checkedAmenities.push($(this).data('id'));
    });

    // Make a POST request to the places_search endpoint with the list of checked amenities
    $.ajax({
      url: 'http://0.0.0.0:5001/api/v1/places_search',
      type: 'POST',
      contentType: 'application/json',
      data: JSON.stringify({ amenities: checkedAmenities }),
      success: function(response) {
        // Loop through the result and create HTML elements for each place
        response.forEach(function(place) {
          createPlaceElement(place);
        });
      },
      error: function(error) {
        console.error('Error fetching places:', error);
      }
    });
  }

  // Function to create an article element for a place
  function createPlaceElement(place) {
    // Create the article element
    var article = $('<article>');

    // Create the title_box div
    var titleBox = $('<div class="title_box">');
    titleBox.append('<h2>' + place.name + '</h2>');
    titleBox.append('<div class="price_by_night">$' + place.price_by_night + '</div>');

    // Create the information div
    var information = $('<div class="information">');
    information.append('<div class="max_guest">' + place.max_guest + ' Guest' + (place.max_guest !== 1 ? 's' : '') + '</div>');
    information.append('<div class="number_rooms">' + place.number_rooms + ' Bedroom' + (place.number_rooms !== 1 ? 's' : '') + '</div>');
    information.append('<div class="number_bathrooms">' + place.number_bathrooms + ' Bathroom' + (place.number_bathrooms !== 1 ? 's' : '') + '</div>');

    // Create the description div
    var description = $('<div class="description">');
    description.html(place.description);

    // Append all elements to the article
    article.append(titleBox);
    article.append(information);
    article.append(description);

    // Append the article to the places section
    $('.places').append(article);
  }

  // Check API status on page load
  checkApiStatus();

  // Function to check API status
  function checkApiStatus() {
    $.ajax({
      url: 'http://0.0.0.0:5001/api/v1/status/',
      type: 'GET',
      dataType: 'json',
      success: function(response) {
        // Check if the status is "OK"
        if (response.status === 'OK') {
          // Add the class "available" to div#api_status
          $('#api_status').addClass('available');
          // Update places on page load
          updatePlaces();
        } else {
          // Remove the class "available" from div#api_status
          $('#api_status').removeClass('available');
        }
      },
      error: function(error) {
        // Handle the error (e.g., log it to console)
        console.error('Error checking API status:', error);
      }
    });
  }

  // Event listener for the button click
  $('button').click(function() {
    // Update places when the button is clicked
    updatePlaces();
  });
});

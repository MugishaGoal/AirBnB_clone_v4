$(document).ready(function() {
  // Dictionary to store checked States and Cities
  var checkedLocations = {};

  // Function to update the Locations section
  function updateLocations() {
    var locationsList = [];
    for (var locationId in checkedLocations) {
      locationsList.push(checkedLocations[locationId]);
    }

    // Update the h4 tag inside the div Locations
    $('.locations h4').text(locationsList.join(', '));
  }

  // Function to make the API request and update the places section
  function updatePlaces() {
    // Clear existing content in the places section
    $('.places').empty();

    // Get the list of checked amenities
    var checkedAmenities = [];
    $('.amenities input:checked').each(function() {
      checkedAmenities.push($(this).data('id'));
    });

    // Make a POST request to the places_search endpoint with the list of checked amenities, cities, and states
    $.ajax({
      url: 'http://0.0.0.0:5001/api/v1/places_search',
      type: 'POST',
      contentType: 'application/json',
      data: JSON.stringify({
        amenities: checkedAmenities,
        states: Object.keys(checkedLocations)
      }),
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

  // Event listener for changes on input checkbox tags
  $('input[type="checkbox"]').change(function() {
    var locationId = $(this).data('id');
    var locationName = $(this).data('name');

    if ($(this).is(':checked')) {
      // If checkbox is checked, store the State or City ID in the variable
      checkedLocations[locationId] = locationName;
    } else {
      // If checkbox is unchecked, remove the State or City ID from the variable
      delete checkedLocations[locationId];
    }

    // Update the Locations section
    updateLocations();
  });

  // Event listener for the button click
  $('button').click(function() {
    // Update places when the button is clicked
    updatePlaces();
  });
});

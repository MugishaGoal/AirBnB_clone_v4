$(document).ready(function() {
  // Initialize an empty array to store checked amenity IDs
  var checkedAmenities = [];

  // Check API status on page load
  checkApiStatus();

  // Listen for changes on each input checkbox tag
  $('input[type="checkbox"]').change(function() {
    var amenityId = $(this).data('id');
    var amenityName = $(this).data('name');

    // Check if the checkbox is checked
    if ($(this).is(':checked')) {
      // Add Amenity ID to the array
      checkedAmenities.push(amenityId);
    } else {
      // Remove Amenity ID from the array
      checkedAmenities = checkedAmenities.filter(function(id) {
        return id !== amenityId;
      });
    }

    // Update the h4 tag inside the div Amenities with the list of Amenities checked
    updateAmenitiesList();
  });

  // Function to update the h4 tag with the list of checked amenities
  function updateAmenitiesList() {
    var amenitiesList = checkedAmenities.map(function(id) {
      return id + ': ' + $('input[data-id="' + id + '"]').data('name');
    }).join(', ');

    // Update the h4 tag
    $('#amenities-container h4').text('Checked Amenities: ' + amenitiesList);
  }

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
});

$(document).ready(function() {
  // Initialize an empty array to store checked amenity IDs
  var checkedAmenities = [];

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
});

$(document).ready(function() {
  // Function to fetch and display reviews
  function fetchAndDisplayReviews() {
    // Fetch reviews and parse them
    $.ajax({
      url: 'http://0.0.0.0:5001/api/v1/places_search',
      type: 'POST',
      contentType: 'application/json',
      data: JSON.stringify({
        // Include necessary parameters for fetching reviews
      }),
      success: function(reviews) {
        // Clear existing reviews
        $('.places').empty();

        // Display each review
        reviews.forEach(function(review) {
          var reviewElement = $('<div class="review"></div>');
          reviewElement.text(review.text);
          $('.places').append(reviewElement);
        });
      },
      error: function(error) {
        console.error('Error fetching reviews:', error);
      }
    });
  }

  // Event listener for the button click
  $('span.reviews-toggle').click(function() {
    var buttonText = $(this).text().trim().toLowerCase();

    if (buttonText === 'show') {
      // If the text is "show", fetch, parse, and display reviews
      fetchAndDisplayReviews();
      $(this).text('Hide');
    } else {
      // If the text is "hide", remove all Review elements from the DOM
      $('.places .review').remove();
      $(this).text('Show');
    }
  });
});

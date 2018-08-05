$(document).ready(function() {

    var tvShows = ["Friends", "SNL", "Sherlock", "Game of Thrones"];

    // displayInfo function will create an ajax call for the specific button clicked and will store and display related gifs and it's rating; when user clicks a different TV Show button it will remove the previously loaded gifs in order to display search related images
    function displayInfo() {

      $("#showDisplay").empty();
      
      var tvshow = $(this).attr("data-show");
      var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + tvshow + "&api_key=xKebCcPDHVDhwZpIT4hhcb8vLoLZXW6k&limit=10";
   
      $.ajax({
        url: queryURL,
        method: "GET"
      }).then(function(response) {
        console.log(response);
        
        var results = response.data;
        
        for (var i = 0; i < results.length; i++) {

          var showDiv = $("<div class='showGifs'>");
          var rating = results[i].rating;
          var r = $("<p>").text("Rating: " + rating);
          var animate = results[i].images.fixed_height.url;
          var still = results[i].images.fixed_height_still.url;

          // Creating an element to hold the image and the different properties
          var image = $("<img>");
          image.attr("src", still);
          image.attr("data-still", still);
          image.attr("data-animate", animate);
          image.attr("data-state", "still");
          image.addClass("image");

          // Displaying the rating and gif
          showDiv.prepend(r);
          showDiv.append(image);
          $("#showDisplay").prepend(showDiv);
        }
      });
    }

    // Function for generating TV Show buttons in the array
    function renderButtons() {

      for (var i = 0; i < tvShows.length; i++) {

        var a = $("<button>");
        a.addClass("show-btn");
        a.attr("data-show", tvShows[i]);
        a.text(tvShows[i]);
        $("#buttonsDisplay").append(a);
      }
    }

    // This function handles the submit button click events; when a user inputs text in the textbox, a new element will be added to the array; a call to the renderButtons function will generate a new button for the new element
    $("#addShow").on("click", function(event) {

      event.preventDefault();
      $("#buttonsDisplay").empty();
      
      var show = $("#show-input").val().trim();

      tvShows.push(show);

      renderButtons();
    });

    // Adding a click event listener to all elements with a class of "show-btn"
    $(document).on("click", ".show-btn", displayInfo);

    // Calling the renderButtons function to display the intial buttons
    renderButtons();

    // Adding a click event listener to all images in order to animate and stop animation
    $(document).on("click", ".image", function(){

      var state = $(this).attr("data-state");

        if (state === "still") {
          $(this).attr("src", $(this).data("animate"));
          $(this).attr("data-state", "animate");
        } 
        else {
          $(this).attr("src", $(this).data("still"));
          $(this).attr("data-state", "still");
        }
    });
});

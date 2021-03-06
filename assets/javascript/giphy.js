// Initial array of giphy buttons
var topics = ["Justin Timberlake", "Melissa McCarthy", "Christopher Walken", "Alec Baldwin", "Steve Martin", "John Goodman", "Tina Fey"];
console.log(topics);

// Function for dumping the JSON content for each button. Need to isolate the rating and both static and animated urls.
function displayGifInfo() {
    var giphyName = $(this).attr("data-item");
    console.log(giphyName);

    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + giphyName + "&rating=pg&api_key=nnnYO03MD3UGzt8ao7AY20uyywstLlNR&limit=10";

    $.ajax({
        url: queryURL,
        method: 'GET'
    }).done(function (response) {
        $("#giphy-dump").empty();

        // Create a forEach function to iterate through the new array of gif responses received from JSON
        response.data.forEach(function (value, i) {
            // Create divs to hold the gif's
            var gifDiv = $("<div class='gif'>");
            // Get the static URL for the image from the JSON.
            var staticURL = response.data[i].images.fixed_height_still.url;
            console.log("Static Image: " + response.data[i].images.fixed_height_still.url);
            // Get the animated URL for the image from the JSON.
            var animatedURL = response.data[i].images.fixed_height.url;
            console.log("Animated Image: " + response.data[i].images.fixed_height.url);
            // Create an HTML image element to store the static version of the image instead of the URL.
            var image = $("<img>").attr("src", staticURL);

            // Added class of "gif" to image and attributes to make image is clickable and to toggle between static and animated:
            image.addClass("gif");
            // Add an attribute to image so all gifs have the same state.
            image.attr("data-state", "static");
            // Now add an attribute to set gifs to a still state.
            image.attr("data-static", staticURL);
            // Now add an attribute to set gifs to animate.
            image.attr("data-animate", animatedURL);
            // Append the images to the gifDivs.
            gifDiv.append(image);

            // Create a variable to store the rating data.
            var gifRating = response.data[i].rating;
            // Create an HTML paragraph element to store the rating.
            var paragraph = $("<p>").text("Rating: " + gifRating);
            console.log("gifRating: " + gifRating);
            // Append the rating under the image.
            gifDiv.append(paragraph);
            // Put the gifs below each other.
            $("#giphy-dump").append(gifDiv);
        })
        // This function will make each gif clickable. When clicked the gif will become animated. Click again to pause. 
        // Apply to the .gif class which has already been added to the gifDiv.
        $(".gif").on("click", function () {

            // Check if the variable state of giphyName is equal to 'static/still'.
            var state = $(this).attr("data-state");
            console.log("State of the gif: " + state);

            // Then create if/else to toggle between static and animated.
            if (state === "static") {
                $(this).attr("src", $(this).attr("data-animate"));
                $(this).attr("data-state", "animate");
            } else {
                $(this).attr("src", $(this).attr("data-static"));
                $(this).attr("data-state", "static");
            }
        })
    });
}

// This function creates the buttons from the topics array. These buttons will be used to show the giphys by category:
function renderButtons() {
    $("#buttons-dump").empty();

    for (var j = 0; j < topics.length; j++) {
        var a = $("<button>");
        // Added attribute for the button-style class.
        a.attr("class", "button-style");
        a.attr("data-item", topics[j]);
        a.attr("data-state", topics[j]);
        a.text(topics[j]);
        $("#buttons-dump").append(a);
        console.log(a);
    }
}

// This function grabs the user input using a local variable of "giphy".
// Finalizes the giphy topic choice when the Add button is clicked. 
$("#find-giphy").on("click", function (event) {
    // event.preventDefault() prevents the form from trying to submit itself.
    // User can hit enter instead of clicking the button if they want.
    event.preventDefault();

    // This line will grab the text from the input box in the form.
    var giphy = $("#giphy-input").val().trim();
    // The giphy input category from the textbox is then added to the topics array.
    topics.push(giphy);
    console.log(giphy);

    // Call the renderButtons function which handles the processing of our giphy array
    renderButtons();
    // Clear the input text from the Giphy form after clicking the Add button.
    $("#giphy-input").val("");
});

// Links back to the generic function to capture Gif Info. Provides an event listener to all elements with .button-style
$(document).on("click", ".button-style", displayGifInfo);

renderButtons();
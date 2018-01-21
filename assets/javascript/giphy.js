var emotionArr = ["Awkward", "Bored", "Hungry", "Tired", "Sassy"]

function displayGiphy() {

    var emo = $(this).attr("data-name");
    var apiKey = "VNvRUfNQywsLoymi1hgzy6bWeyShjjf8"
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + emo + "&limit=20&api_key=" + apiKey;

    var title = $("<h3>" + emo + "</h3>");

    $("#emotion-name").html(title);

    // Creates AJAX call for the specific emotion button being clicked
    $.ajax({
        url: queryURL,
        method: "GET"
    }).done(function(response) {
        console.log(response);
        var results = response.data;

        //loop through all the giphy in the resutls
        for (var i = 0; i < results.length; i++) {

            // Only taking action if the photo has an appropriate rating
            if (results[i].rating !== "r" && results[i].rating !== "pg-13") {
                var gifDiv = $("<div class='item'>");

                //get the rating for the gif
                var rating = results[i].rating;

                //create a paragraph tag and have it show the rating
                var p = $("<p>").text("Rating: " + rating);

                //create an image tag
                var emoImage = $("<img>");
                //add a class called gif
                emoImage.addClass("gif");
                //add the url source to the image tag
                emoImage.attr("src", results[i].images.fixed_height_still.url);
                //add the still image url
                emoImage.attr("data-still", results[i].images.fixed_height_still.url);
                //add the animate url
                emoImage.attr("data-animate", results[i].images.fixed_height.url);
                //add a state to the image tag
                emoImage.attr("data-state", "still");


                gifDiv.prepend(p);
                gifDiv.prepend(emoImage);

                $("#img-display").prepend(gifDiv);
            }
        }

    });

}

// Function for displaying emotion data
function renderButtons() {

    // Deletes the emotions prior to adding new emotion
    $("#btn-display").empty();
    // Loops through the array of emotions
    for (var i = 0; i < emotionArr.length; i++) {

        // creating a button tag
        var emoBtn = $("<button>");
        // Adds a class of emtion to our button
        emoBtn.addClass("emotion");
        //Adds a class of botton for bootstrap
        emoBtn.addClass("btn btn-info btn-sm");
        //Adds a type to the button
        emoBtn.attr("type", "button");
        // Added emoBtn data-attribute
        emoBtn.attr("data-name", emotionArr[i]);
        // Provided the initial button text
        emoBtn.text(emotionArr[i]);
        // Added the button to the buttons-view div
        $("#btn-display").append(emoBtn);
    }
}



// This function handles events where the add emotion button is clicked
$("#add-emotion").on("click", function(event) {
    event.preventDefault();
    // This line of code will grab the input from the textbox
    var emotion = $("#emotion-input").val().trim();

    // The emotion from the textbox is then added to our array
    emotionArr.push(emotion);

    // Calling renderButtons which handles the processing of our emotion array
    renderButtons();
});

$(document).on("click", ".gif", function() {
    // The attr jQuery method allows us to get the value of the attribute on the gif element
    var state = $(this).attr("data-state");
    console.log(state);
    // If the clicked image's state is still, update its src attribute to what its data-animate value is.
    // Then, set the image's data-state to animate
    // Else set src to the data-still value
    if (state === "still") {
        $(this).attr("src", $(this).attr("data-animate"));
        $(this).attr("data-state", "animate");
    } else {
        $(this).attr("src", $(this).attr("data-still"));
        $(this).attr("data-state", "still");
    }
});

// Adding click event listeners to all elements with a class of "emotions"
$(document).on("click", ".emotion", displayGiphy);

// Calling the renderButtons function to display the intial buttons
renderButtons();

/////////////////////////////////////////////////
//////////////////global variables///////////////
/////////////////////////////////////////////////
//your dynamically creating buttons
var toonBtns = ["Finn the Human", "Jake the Dog", "Princess bubble gum", "Marceline the Vampire Queen"];

var toon = " ";

/////////////////////////////////////////////////
/////////////////////////////////////////////////
/////////////////////////////////////////////////

function renderButtons() {

    $(".toonsView").empty();

    for (i = 0; i < toonBtns.length; i++) {

        var t = $("<button>");

        t.addClass("toonNameBtns");

        t.text(toonBtns[i]);
        console.log(toonBtns[i]);

        $(".toonsView").append(t);
    }

}

renderButtons();

$("#search").on("click", function (event) {

    event.preventDefault();

    (toon) = $("#toon-input").val().trim()

    toonBtns.push(toon);

    renderButtons();

    getCartoonGifs(toon);
    console.log(getCartoonGifs(toon));

});

$(".toonNameBtns").on("click", function(event) {

    
});

function getCartoonGifs() {
  console.log(`From getCartoonGifs function: ${toon}`);
  var queryURL = "https://api.giphy.com/v1/gifs/search?api_key=nY2NlkUcEtMZ5jfmYGUM1GtkEj0wveE7&q=" + toon + "-cartoons&rating=pg&limit=10";

  $.ajax({
    url: queryURL,
    method: "GET"
  }).then(function(response) {
    console.log(response);

    var results = response.data;

    for (var i = 0; i < results.length; i++) {

        var toonDiv = $("<div>");

        var p = $("<p>").text("Rated: " + results[i].rating);

        var toonImage = $("<img>").attr("src", results[i].images.fixed_height.url);

        toonDiv.prepend(p);

        toonDiv.prepend(toonImage);

        $("#gifsAppearHere").prepend(toonDiv);

    }

});

}




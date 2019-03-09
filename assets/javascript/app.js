/////////////////////////////////////////////////
//////////////////global variables///////////////
/////////////////////////////////////////////////
//your dynamically creating buttons
let toonBtns = ["Finn the Human", "Jake the Dog", "Princess bubble gum", "Marceline the Vampire Queen"];

// var toon = " ";

/////////////////////////////////////////////////
/////////////////////////////////////////////////


function renderButtons() {

    $(".toonsView").empty();

    for (i = 0; i < toonBtns.length; i++) {

        let newButton = $("<button>");

        newButton.addClass("toonNameBtns");

        newButton.text(toonBtns[i]);
        
        $(".toonsView").append(newButton);
    };
    console.log("Created Buttons");

};

renderButtons();

$("#search").on("click", function (event) {
    event.preventDefault();
    let toon = $("#toon-input").val().trim();

    if (toon && toonBtns.indexOf(toon) == -1) {
        toonBtns.push(toon);
        renderButtons();

        console.log(toon);
        getCartoonGifs(toon);
    };
    console.log("Search button clicked and executed");
});

$(".toonsView").on("click", ".toonNameBtns", function(){
    console.log($(this).text());
    let toon = $(this).text();
    getCartoonGifs(toon);
    console.log(`"${$(this).text()}" button was clicked`);
});

function getCartoonGifs(search) {
    console.log(`Calling getCartoonGifs function with the following parameter: ${search}`);
    const queryURL = "https://api.giphy.com/v1/gifs/search?api_key=nY2NlkUcEtMZ5jfmYGUM1GtkEj0wveE7&q=" + search + "&rating=g&limit=10";

    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (response) {
        console.log(response);

        const results = response.data;

        for (let i = 0; i < results.length; i++) {

            const toonDiv = $("<div>");

            const p = $("<p>").text("Rated: " + results[i].rating);

            const toonImage = $("<img>").attr("src", results[i].images.fixed_height_still.url);

            toonImage.addClass("gifs");

            toonImage.data("still", results[i].images.fixed_height_still.url);

            toonImage.data("animated", results[i].images.fixed_height.url);

            toonDiv.prepend(p);

            toonDiv.prepend(toonImage);

            $("#gifsAppearHere").prepend(toonDiv);
        };
        console.log("AJAX request completed");
    });
};

$("#gifsAppearHere").on("click", ".gifs", function(){

    const current = $(this).attr("src");

    console.log($(this).data("still"));

    const animated = $(this).data("animated"); 

    const still = $(this).data("still");
    if(current === still){
        $(this).attr("src", animated);    
    }else{
        $(this).attr("src", still);    
    } 

});





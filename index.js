//@ts-check

import {set, ref, onValue, push, remove, db} from "./firebase.js";

onValue(ref(db, "/giphButtons"), snapshot => {
    let buttons = Object.values(snapshot.val());
    // console.log(buttons);

    buttons.map(button => {
        // <button onclick='getGiph(this)' type='button' class='getGiph ms-3 mt-3 btn btn-primary'>Cat</button>
        $("#buttons").append($("<button onclick='getGiph(this)' type='button' class='getGiph ms-3 mt-3 btn btn-primary'>"+button.text+"</button>"));
    })
})

$("#limit-container").show();
$("#limit-container").val(15);

$("#add-button").on("click", () =>{
    if($("#searchTerm").val().trim() != '')
    {
        let button = $("<button onclick='getGiph(this)' type='button' class='getGiph ms-3 mt-3 btn btn-primary'>" + $("#searchTerm").val() + "</button>");

        let buttonPush = push(ref(db, "/giphButtons"));
        set(buttonPush, {
            text: $("#searchTerm").val().trim()
        });

        $("#searchTerm").val("");


    }
});

let getGiph = (element) =>
{
    $("#giphs").html("");


    let responseData;
    let searchTerm = element.innerText.toLowerCase();
    let range = $("#limit").val();
    
    if(range <= 0)
    {
        alert("Range is not valid");
        return;
    }
    fetch("https://api.giphy.com/v1/gifs/search?api_key=NA37wZ2PZFORU0z90xzFHt4xpYCtT5e6&q="+searchTerm+"&limit="+range+"&offset=0&rating=g&lang=en").then(result => result.json()).then(response => {
        responseData = response.data;

        for(const giph of responseData)
        {
            // console.log(giph);
            let pic = giph.images.fixed_width_still.url;
            $("#giphs").append("<img onclick='playPause(this)' data-vid='"+giph.images.fixed_width.url+"' data-pic='"+giph.images.fixed_width_still.url+"' data-playing='false' src='" + pic + "'/>");
        }

        $("#searched").text("You've searched for: " + element.innerText);
    }).catch();
}

let playPause = (element) =>
{
    if($(element).data("playing") == "false")
    {
        $(element).data("playing","true");
        $(element).attr("src", $(element).data("vid"))
    }

    else{
        $(element).data("playing", "false");
        $(element).attr("src", $(element).data("pic"))
    }
    return;
}

//@ts-ignore
window.getGiph = getGiph;

//@ts-ignore
window.playPause = playPause;
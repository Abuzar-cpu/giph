$("#limit-container").hide();

$("#add-button").on("click", () =>{
    if($("#searchTerm").val() != '')
    {
        let button = $("<button onclick='getGiph(this)' type='button' class='getGiph ms-3 mt-3 btn btn-primary'>" + $("#searchTerm").val() + "</button>");

        $("#buttons").append(button);
        $("#searchTerm").val("");

    }

    $("#limit-container").show();
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
            let vid = giph.images.fixed_width.url;
            $("#giphs").append("<img onclick='playPause(this)' data-playing='false' src='" + vid + "'/>");
        }

        $("#searched").text("You've searched for: " + "'" + searchTerm + "'");
    }).catch("Error occured");
}

let playPause = (element, still, vid) =>
{
    if($(element).data("playing") == "false")
    {
        $(element).data("playing","true");
        return;
    }

    else{
        $(element).data("playing", "false");
        return;
    }
    return;
}
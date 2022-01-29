$("#add-button").on("click", () =>{
    if($(".form-control").val() != '')
    {
        let button = $("<button onclick='getGiph(this)' type='button' class='getGiph ms-3 mt-3 btn btn-primary btn-lg'>" + $(".form-control").val() + "</button>");

        $("#buttons").append(button);
        $(".form-control").val("");
    }
});

let getGiph = (element) =>
{
    $("#giphs").html("");


    let responseData;
    let searchTerm = element.innerText.toLowerCase();
    fetch("https://api.giphy.com/v1/gifs/search?api_key=NA37wZ2PZFORU0z90xzFHt4xpYCtT5e6&q="+searchTerm+"&limit=5&offset=0&rating=g&lang=en").then(result => result.json()).then(response => {
        
    console.log("Sending request");
        responseData = response.data;

        // let url = responseData[0].images;
        // console.log(url)
        console.log("we got the data", responseData);
        for(const giph of responseData)
        {
            
            // let still = giph.images.fixed_height_small_still.url;
            let vid = giph.images.downsized_medium.url;
            // console.log(url);
            $("#giphs").append("<img onclick='playPause(this)' data-playing='false' src='" + vid + "'/>");
        }
    }).catch("Error occured");
}

let playPause = (element, still, vid) =>
{
    // console.log(still, vid);
    if($(element).data("playing") == "false")
    {
        // $(element).attr("src", vid);
        $(element).data("playing","true");
        console.log("It was false")
        return;
    }

    else{
        // $(element).attr("src", still);
        $(element).data("playing", "false");
        return;
    }
    return;
}
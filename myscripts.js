console.log("the code sheet was loaded properly");
let baseURL = "";
let fileSize = "";
fetch("https://api.themoviedb.org/3/configuration?api_key=5bf50894effaa9cdc43bb98f133df7c0").then(function(result) {
    return result.json();
}).then(function(json) {
    console.log(json);
    baseURL = json.images.base_url;
    fileSize = json.images.poster_sizes[2];
    //fileSize = "original";
});

function displayProfileDropDown() {
    document.getElementById("Head_DropMenu").style.display = "block";
}

/*
API code 5bf50894effaa9cdc43bb98f133df7c0
authentication URL https://api.themoviedb.org/3/movie/76341?api_key={api_key}
https://api.themoviedb.org/3/movie/{movie_id}?api_key=<<api_key>>&language=en-US
*/

document.getElementById("movieSubmit").addEventListener("click", function(event) {
    event.preventDefault();
    let movieName = document.getElementById("movieInput").value;
    const idSearch = "https://api.themoviedb.org/3/search/movie?api_key=5bf50894effaa9cdc43bb98f133df7c0&query=" + movieName + "&language=en-US&page=1&include_adult=false"
    document.getElementById("movieResults").innerHTML = "";
    fetch(idSearch).then(function(response) {
        return response.json();
    }).then(function(json) {
        console.log("results.length is " + json.results.length);
        json.results.forEach((item) => {
            //console.log("i is " + i);
            let movieID = item.id;
            const movieURL = "https://api.themoviedb.org/3/movie/" + movieID + "?api_key=5bf50894effaa9cdc43bb98f133df7c0";
            fetch(movieURL).then(function(movieObject) {
                return movieObject.json();
            }).then(function(movieJSON) {
                let posterPath = movieJSON.poster_path;
                let posterURL = baseURL + fileSize + posterPath;
                document.getElementById("movieResults").innerHTML += ("<div class=\"col-sm\" id=\"reg_img_div\"><img src=\"" + posterURL + "\" id=\"reg_img\"></div>");
                console.log("current completeResults is " + completeResults);
            });
        });     
    });
});
const displayWatchlistHtml = document.getElementById("display-list")


// Access the array of selected movie Ids from localStorage
let watchlistArray = JSON.parse(localStorage.getItem("watchlist"))
console.log(watchlistArray)


// Uses the array of selected movie Ids to get movie info from API and renders watchlist html to DOM
 function getWatchlistHtml(movieArray){
    let moviesHtml = ""
    movieArray.forEach(function(movie){
        fetch(`https://www.omdbapi.com/?apikey=217a0b3d&i=${movie}`)
            .then(res => res.json())
            .then(data => {
                document.getElementById("explore-placeholder").style.display = "none"
                moviesHtml += getMovieHtml(data)
                displayWatchlistHtml.innerHTML = moviesHtml
                })
    })
}

getWatchlistHtml(watchlistArray)

// Get the Html needed to display movies on watchlist
function getMovieHtml(movie) {
    return `
                <div id="movie-container" class="display-horizontal">
                <img class="movie-poster" src="${movie.Poster}">
                <div id="movie-info">
                    <div class="display-horizontal">
                        <p>${movie.Title}</p>
                        <p>Rated: ${movie.Rated}</p>
                    </div>
                    <div class="display-horizontal">
                        <p>${movie.Runtime}</p>
                        <p>${movie.Genre}</p>
                        <button id="remove-btn" data-movie="${movie.imdbID}">
                            <i class="fa-solid fa-circle-minus"></i>
                            Remove
                        </button>
                     </div>
                    <p>${movie.Plot}</p>
                </div>
            </div>
    `
}

// Remove button removes movie from watchlist when clicked
 document.addEventListener("click", function(e){
    
     let selectedMovie = e.target.dataset.movie
     
     if (selectedMovie) {
        console.log("remove")
        // localStorage.setItem("watchlist", JSON.stringify(watchlistMovies))
     }
 }) 
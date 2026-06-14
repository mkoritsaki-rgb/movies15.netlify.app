const movieInput = document.querySelector('[name="movie"]');
const form = document.querySelector("form");
const movieCard = document.querySelector(".movieCard");
const translateBtn = document.querySelector("#translateBtn");

const apiKey = "bbfd82ad";

let currentPlot = "";
let plotParagraph;


form.addEventListener("submit", (event) => {// Ψάχνει την ταινίΑ
    event.preventDefault();

    const movieName = movieInput.value;

    const url = `https://www.omdbapi.com/?t=${movieName}&apikey=${apiKey}`;

    fetch(url)
        .then(response => response.json())
        .then(data => {

            movieCard.textContent = "";

            currentPlot = data.Plot; // save plot

            
            const poster = document.createElement("img");
            poster.src = data.Poster;
            poster.alt = data.Title;

            
            const title = document.createElement("h2");
            title.textContent = data.Title;

            
            const year = document.createElement("p");
            year.textContent = `Year: ${data.Year}`;

            const rating = document.createElement("p");
            rating.textContent = `IMDb: ${data.imdbRating}`;

            
            const genre = document.createElement("p");
            genre.textContent = `Genre: ${data.Genre}`;

            
            plotParagraph = document.createElement("p");
            plotParagraph.textContent = currentPlot;

            movieCard.append(
                poster,
                title,
                year,
                rating,
                genre,
                plotParagraph
            );
        });
});



translateBtn.addEventListener("click", () => { // Μετάφραση

    if (!currentPlot) return;

    fetch(`https://api.mymemory.translated.net/get?q=${currentPlot}&langpair=en|el`)
        .then(res => res.json())
        .then(data => {
            plotParagraph.textContent = data.responseData.translatedText;
        });
});
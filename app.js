let movies = false;

const moviesWrapper = document.querySelector(".movies");

const searchResultEl = document.querySelector(".movie__result");

const noResults = document.querySelector(".no__results");

const movieFilter = (movie) => movie.Poster !== "N/A"; // adds a filter that removes movie without posters

function onSearchInputChange(event) {
  const movie = event.target.value;
  // console.log(movie)
  renderMovies(movie);
}

async function renderMovies(title) {
  searchResultEl.innerHTML = title;
  if (!movies) {
    moviesWrapper.classList += " movies__loading";
  }

  const response = await fetch(
    `https://www.omdbapi.com/?i=tt3896198&apikey=582a63a7&s=${title}`
  );
  const responseData = await response.json();

  if (responseData.Search === undefined) {
    moviesWrapper.innerHTML = "";
    noResults.classList += " active";
  } else {
    noResults.classList.remove("active");

    setTimeout(() => {
      const movieHTMLs = displaySearchResults(responseData);
      moviesWrapper.innerHTML = movieHTMLs;
      noResults.classList.remove("movies__loading");
      moviesWrapper.classList.remove("movies__loading");
    }, 1000);
  }
  movies = true;
}

function displaySearchResults(responseData) {
  const filteredResults = responseData.Search.filter(movieFilter);
  const movieHTMLs = filteredResults
    .map((movie) => movieHTML(movie))
    .slice(0, 6)
    .join("");
  return movieHTMLs;
}

function movieHTML(movie) {
  if (`${movie.Poster}` !== "N/A") {
    return `<div class="movie-list">
    <figure class="movie__img--wrapper">
      <img src=${movie.Poster}>
    </figure>
    <div class="movie__description">
      <h3 class="movie__title">${movie.Title}</h3>
      <h4 class="movie__year">${movie.Year}</h4>
      <a href="https://www.imdb.com/title/${movie.imdbID}" class="imdb" target="_blank">IMDb</a>
    </div>
  </div>`;
  }
}

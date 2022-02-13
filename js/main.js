const main = document.querySelector('.main');
const search = document.querySelector('.search');

let url =
  'https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=e02a92f016752aafa2b50ab1619b8f94';

const getData = async (el) => {
  const res = await fetch(el);
  const data = await res.json();
  showData(data);
};
getData(url);

const showData = (data) => {
  data.results.forEach((elem) => {
    const { poster_path, original_title, vote_average, overview } = elem;
    let div = document.createElement('div');
    div.classList.add('movie');
    div.innerHTML = `<img class="movie__pictures" src="https://image.tmdb.org/t/p/w1280${poster_path}" alt="images">
    <div class="movie__info">
      <h3>${original_title}</h3>
      <span class="${checkAverage(vote_average)}">${vote_average}</span>
    </div>
    <div class="overview">
      <h3>Overview</h3>
      ${overview}
    </div>`;
    main.append(div);
  });
};

const checkAverage = (num) => {
  if (num >= 8) {
    return 'green';
  } else if (num > 5 || num < 8) {
    return 'orange';
  } else {
    return 'red';
  }
};

search.addEventListener('keydown', function findMovies(event) {
  if (event.key === 'Enter') {
    event.preventDefault();
    url = `https://api.themoviedb.org/3/search/movie?query=${this.value}&api_key=e02a92f016752aafa2b50ab1619b8f94`;
    main.innerHTML = '';
  }
  if (this.value === '') {
    url =
      'https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=e02a92f016752aafa2b50ab1619b8f94';
  }
  getData(url);
});

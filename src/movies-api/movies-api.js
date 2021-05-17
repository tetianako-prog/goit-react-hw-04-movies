import axios from 'axios';

function getTrending() {
  return axios
    .get(
      'https://api.themoviedb.org/3/trending/movie/day?api_key=ee85666c615ab2ac67814f12b027dc8f',
    )
    .then(res => res.data.results);
}

function getDetails(movieId) {
  return axios
    .get(
      `https://api.themoviedb.org/3/movie/${movieId}?api_key=ee85666c615ab2ac67814f12b027dc8f`,
    )
    .then(res => res.data);
}

function getCast(movieId) {
  return axios
    .get(
      `https://api.themoviedb.org/3/movie/${movieId}/credits?api_key=ee85666c615ab2ac67814f12b027dc8f`,
    )
    .then(res => res.data.cast);
}

function getReviews(movieId) {
  return axios
    .get(
      `https://api.themoviedb.org/3/movie/${movieId}/reviews?api_key=ee85666c615ab2ac67814f12b027dc8f`,
    )
    .then(res => res.data.results);
}

function getMovieByQuery(searchQuery) {
  return axios
    .get(
      `https://api.themoviedb.org/3/search/movie?query=${searchQuery}&api_key=ee85666c615ab2ac67814f12b027dc8f`,
    )
    .then(res => res.data.results);
}

const movieApi = {
  getTrending,
  getDetails,
  getCast,
  getReviews,
  getMovieByQuery,
};
export default movieApi;

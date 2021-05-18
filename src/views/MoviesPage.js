import React, { Component } from 'react';
import moviesApi from '../movies-api/movies-api';
import Movies from '../components/Movies';
import styles from './MoviesPage.module.css';

class MoviesPage extends Component {
  state = {
    inputValue: '',
    movies: [],
  };

  async componentWillMount() {
    const query = localStorage.getItem('query');
    if (query) {
      const response = await moviesApi.getMovieByQuery(query);
      this.setState({ movies: response });
    }
  }

  onHandleChange = e => {
    this.setState({ inputValue: e.target.value });
  };

  onFormSubmit = e => {
    e.preventDefault();
    moviesApi.getMovieByQuery(this.state.inputValue).then(res => {
      localStorage.setItem('query', this.state.inputValue);
      this.setState({ inputValue: '', movies: res });
    });
  };

  render() {
    const { movies } = this.state;
    return (
      <>
        <form className={styles.Search} onSubmit={this.onFormSubmit}>
          <input
            type="text"
            onChange={this.onHandleChange}
            value={this.state.inputValue}
          />
          <button type="sumbit">Search</button>
        </form>
        <Movies movies={movies} />
      </>
    );
  }
}

export default MoviesPage;

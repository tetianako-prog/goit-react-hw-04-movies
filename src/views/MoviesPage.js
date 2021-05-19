import React, { Component } from 'react';
import moviesApi from '../movies-api/movies-api';
import Movies from '../components/Movies';
import styles from './MoviesPage.module.css';

class MoviesPage extends Component {
  state = {
    inputValue: '',
    movies: [],
    query: '',
  };

  async componentDidMount() {
    const query = localStorage.getItem('query');
    if (query) {
      this.setState({ query });
      const response = await moviesApi.getMovieByQuery(query);
      this.setState({ movies: response });
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.movies !== this.state.movies) {
      const { history } = this.props;
      history.push(`/movies?query=${this.state.query}`);
      localStorage.setItem('query', this.state.query);
    }
  }

  onHandleChange = e => {
    this.setState({ inputValue: e.target.value });
  };

  onFormSubmit = e => {
    e.preventDefault();
    moviesApi.getMovieByQuery(this.state.inputValue).then(res => {
      const query = this.state.inputValue;
      this.setState({ inputValue: '', movies: res, query });
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

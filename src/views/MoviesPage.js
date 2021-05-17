import React, { Component } from 'react';
import moviesApi from '../movies-api/movies-api';
//import { Link } from 'react-router-dom';
import Movies from '../components/Movies';
import styles from './MoviesPage.module.css';

class MoviesPage extends Component {
  state = {
    inputValue: '',
    movies: [],
  };
  // async componentDidMount() {
  //   const response = await moviesApi.getMovieByQuery();

  //   this.setState({ movies: response });
  // }

  onHandleChange = e => {
    this.setState({ inputValue: e.target.value });
  };

  onFormSubmit = e => {
    e.preventDefault();
    moviesApi
      .getMovieByQuery(this.state.inputValue)
      .then(res => this.setState({ inputValue: '', movies: res }));
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

import React, { Component } from 'react';
import moviesApi from '../movies-api/movies-api';
import queryString from 'query-string';
import Movies from '../components/Movies';
import styles from './MoviesPage.module.css';

class MoviesPage extends Component {
  state = {
    inputValue: '',
    movies: [],
  };

  componentDidMount() {
    const queryParams = queryString.parse(this.props.location.search);
    if (queryParams.category) {
      moviesApi
        .getMovieByQuery(queryParams.category)
        .then(res => this.setState({ movies: res }))
        .catch(err => console.log(err));
    }
  }

  onHandleChange = e => {
    this.setState({ inputValue: e.target.value });
  };

  onFormSubmit = e => {
    e.preventDefault();
    moviesApi
      .getMovieByQuery(this.state.inputValue)
      .then(res => {
        const query = this.state.inputValue;
        const { history } = this.props;
        history.push({
          pathname: this.props.location.pathname,
          search: `category=${query}`,
        });
        this.setState({ inputValue: '', movies: res });
      })
      .catch(err => console.log(err));
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

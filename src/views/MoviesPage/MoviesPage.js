import React, { Component } from 'react';
import moviesApi from '../../movies-api/movies-api';
import queryString from 'query-string';
import Movies from '../../components/Movies';
import styles from './MoviesPage.module.css';

class MoviesPage extends Component {
  state = {
    inputValue: '',
    movies: [],
    isSearch: false,
  };

  componentDidMount() {
    const { search } = this.props.location;
    const queryParams = queryString.parse(search);
    if (queryParams.category) {
      moviesApi
        .getMovieByQuery(queryParams.category)
        .then(res => this.setState({ movies: res, isSearch: true }))
        .catch(err => console.log(err));
    }
  }

  componentDidUpdate(prevProps, prevState) {
    const { search } = this.props.location;
    if (prevProps.location.search !== search) {
      if (!search) {
        this.setState({ isSearch: false });
      }
    }
  }

  onHandleChange = e => {
    const { value } = e.target;
    this.setState({ inputValue: value });
  };

  onFormSubmit = e => {
    e.preventDefault();
    const { inputValue } = this.state;
    moviesApi
      .getMovieByQuery(inputValue)
      .then(res => {
        const query = inputValue;
        this.setState({ query });
        const { history, location } = this.props;
        history.push({
          pathname: location.pathname,
          search: `category=${query}`,
        });
        this.setState({ inputValue: '', movies: res, isSearch: true });
      })
      .catch(err => console.log(err));
  };

  render() {
    const { movies, inputValue, isSearch } = this.state;
    return (
      <>
        <form className={styles.Search} onSubmit={this.onFormSubmit}>
          <input
            type="text"
            onChange={this.onHandleChange}
            value={inputValue}
          />
          <button type="sumbit">Search</button>
        </form>
        {isSearch && <Movies movies={movies} />}
      </>
    );
  }
}

export default MoviesPage;

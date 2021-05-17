import React, { Component } from 'react';
import moviesApi from '../movies-api/movies-api';
import Movies from '../components/Movies';


class HomePage extends Component {
  state = {
    movies: []
  }
  async componentDidMount() {
    const response = await moviesApi.getTrending();

    this.setState({ movies: response });
  }


  render() {
    const { movies } = this.state;
    return (
     <Movies movies={movies}/>
    )
  }
}
export default HomePage;

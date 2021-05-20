import React, { Component } from 'react';
import moviesApi from '../movies-api/movies-api';
import Movies from '../components/Movies';


class HomePage extends Component {
  state = {
    movies: []
  }
  componentDidMount() {
    moviesApi.getTrending().then(res => this.setState({ movies: res })).catch(err => console.log(err));   
  }

  render() {
    const { movies } = this.state;
    return (
     <Movies movies={movies}/>
    )
  }
}
export default HomePage;

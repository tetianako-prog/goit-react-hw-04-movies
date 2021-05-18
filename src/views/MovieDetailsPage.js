import React, { Component } from 'react';
import { NavLink, Route, Switch, Redirect } from 'react-router-dom';
import movieApi from '../movies-api/movies-api';
import Cast from '../components/Cast';
import Reviews from '../components/Reviews';
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import Loader from "react-loader-spinner";
import styles from './MovieDetailsPage.module.css';

export class MovieDetailsPage extends Component {
  state = {
    title: null,
    imgUrl: null,
    rating: null,
    genres: null,
    overview: null,
    year: null,
    isLoading: false
  };

  async componentDidMount() {
    const { movieId } = this.props.match.params;
    this.setState({isLoading: true})
    const response = await movieApi.getDetails(movieId);
    
    this.setState({
      title: response.title,
      imgUrl: `https://image.tmdb.org/t/p/w300${response.poster_path}`,
      rating: response.vote_average,
      genres: response.genres.map(genre => genre.name).join(', '),
      overview: response.overview,
      year: response.release_date.slice(0, 4),
      isLoading: false
    });
  }
 
  handleGoBack = () => {
    const { location, history } = this.props;

      if (location.state && location.state.from) {
          return history.push(location.state.from);
    }

    history.push('/');
  }

  render() {
    const { title, imgUrl, rating, genres, overview, year, isLoading } = this.state;
    const { movieId } = this.props.match.params;
    if (this.props.location.pathname.slice(8) !== movieId) {
      <Redirect to={ '/'}/>
    }
    return (
      <div className={styles.container}>
        {isLoading ? <Loader
          type="Puff"
          color="#00BFFF"
          height={100}
          width={100}
          timeout={3000} 
        /> :
          <div>
            <button className={styles.backBtn } type="button" onClick={this.handleGoBack}>
              &#8592; Вернуться назад
            </button>
            <div className={styles.movieInfo}>
              <div>
                <img src={imgUrl} alt={title} />
              </div>
              <div className={styles.movieInfoText}>
                <h1>{`${title} (${year})`}</h1>
                <p>Rating: {rating}</p>
                <h2>Overview</h2><p> {overview}</p>
                <h2>Genres</h2><p>{genres}</p>
              </div>
            </div>
            <div className={styles.additionalInfo}>
              <p>Additional information</p>
              <ul>
                <li><NavLink className={styles['nav-link']} activeClassName={ styles.active} to={`${this.props.match.url}/cast`}>
                  Cast
              </NavLink>
                </li>
                <li>
                  <NavLink className={styles['nav-link']} activeClassName={ styles.active} to={`${this.props.match.url}/reviews`}>
                    Reviews
              </NavLink>
                </li>
                </ul>
              </div>
            <Switch>
              <Route path='/movies/:movieId/cast' component={Cast} />
              <Route path='/movies/:movieId/reviews' component={Reviews} />
            </Switch>
        
          </div>}
        </div>
    );
  }
}

export default MovieDetailsPage;

import React, { Component } from 'react';
import moviesApi from '../movies-api/movies-api';
import styles from './Cast.module.css';

export class Cast extends Component {
  state = { cast: [] };

  async componentDidMount() {
    const response = await moviesApi.getCast(this.props.match.params.movieId);
    console.log(response);

    this.setState({ cast: response });
  }

  render() {
    return (
      <div>
      <ul>
          {this.state.cast.map(item => (
            <li className={ styles.item} key={item.id}>
              <img src={`https://image.tmdb.org/t/p/w200${item.profile_path}`} alt="" width={100}/>
              <div>{item.name} as {item.character}</div>
            </li>
          ))}
        </ul>
      </div>
    );
  }
}

export default Cast;

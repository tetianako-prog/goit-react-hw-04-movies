import React, { Component } from 'react';
import moviesApi from '../../movies-api/movies-api';
import styles from './Cast.module.css';

export class Cast extends Component {
  state = { cast: [] };

  async componentDidMount() {
    const { movieId } = this.props.match.params;
    const response = await moviesApi.getCast(movieId);
    this.setState({ cast: response });
  }

  render() {
    const { cast } = this.state;
    return (
      <div>
        <ul>
          {cast.map(({ id, profile_path, name, character }) => (
            <li className={styles.item} key={id}>
              <img
                src={`https://image.tmdb.org/t/p/w200${profile_path}`}
                alt=""
                width={100}
              />
              <div>
                {name} as {character}
              </div>
            </li>
          ))}
        </ul>
      </div>
    );
  }
}

export default Cast;

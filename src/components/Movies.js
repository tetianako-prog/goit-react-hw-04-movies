import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import styles from './Movies.module.css';
import errImg from '../images/error.jpg';

const Movies = ({ movies, location }) => {
  return (
    <ul className={styles.container}>
      {movies.map(movie => {
        return (
          <li className={styles.item} key={movie.id}>
            <Link
              to={{
                pathname: `/movies/${movie.id}`,
                state: { from: location },
              }}
              className={styles.link}
            >
              <img
                src={
                  movie.poster_path
                    ? `https://image.tmdb.org/t/p/w300${movie.poster_path}`
                    : errImg
                }
                alt=""
              />
              <div className={styles.title}>
                {movie.title || movie.original_title}
              </div>
            </Link>
          </li>
        );
      })}
    </ul>
  );
};

export default withRouter(Movies);

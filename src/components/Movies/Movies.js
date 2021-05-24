import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import styles from './Movies.module.css';
import errImg from '../../images/error.jpg';

const Movies = ({ movies, location }) => {
  return (
    <ul className={styles.container}>
      {movies.map(({ id, poster_path, title, original_title }) => {
        return (
          <li className={styles.item} key={id}>
            <Link
              to={{
                pathname: `/movies/${id}`,
                state: { from: location },
              }}
              className={styles.link}
            >
              <img
                src={
                  poster_path
                    ? `https://image.tmdb.org/t/p/w300${poster_path}`
                    : errImg
                }
                alt=""
              />
              <div className={styles.title}>{title || original_title}</div>
            </Link>
          </li>
        );
      })}
    </ul>
  );
};

export default withRouter(Movies);

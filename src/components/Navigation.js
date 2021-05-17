import React from 'react';
import { NavLink } from 'react-router-dom';
import styles from './Navigation.module.css';

const Navigation = () => {
  return (
    <ul className={styles.Navigation}>
      <li>
        <NavLink
          exact
          to="/"
          className={styles['nav-link']}
          activeClassName={styles.active}
        >
          Home
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/movies"
          className={styles['nav-link']}
          activeClassName={styles.active}
        >
          Movies
        </NavLink>
      </li>
    </ul>
  );
};

export default Navigation;

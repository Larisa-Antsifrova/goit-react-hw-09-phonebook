// React imports
import React from 'react';
import { NavLink } from 'react-router-dom';

// Imports of routes
import routes from '../../routes';

// Styles imports
import styles from './AuthNav.module.css';

const AuthNav = () => {
  return (
    <ul className={styles.NavLinksList}>
      <li>
        <NavLink
          to={routes.register}
          className={styles.NavLink}
          activeClassName={styles['NavLink-active']}
        >
          Register
        </NavLink>
      </li>
      <li>
        <NavLink
          to={routes.login}
          className={styles.NavLink}
          activeClassName={styles['NavLink-active']}
        >
          Login
        </NavLink>
      </li>
    </ul>
  );
};

export default AuthNav;

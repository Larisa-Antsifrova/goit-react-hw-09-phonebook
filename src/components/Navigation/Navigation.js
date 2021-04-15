// React imports
import React from 'react';
import { NavLink } from 'react-router-dom';

// Components imports
import Logo from '../Logo';

// Routes imports
import routes from '../../routes';

// Imports from Redux
import { useSelector } from 'react-redux';
import { getIsAuthenticated } from '../../redux/auth/auth-selectors';

// Styles imports
import styles from './Navigation.module.css';

export default function Navigation() {
  const isAuthenticated = useSelector(getIsAuthenticated);

  return (
    <nav>
      <ul className={styles.NavLinksList}>
        <li>
          <NavLink exact to={routes.home} className={styles.NavLink}>
            <Logo />
          </NavLink>
        </li>
        <li>
          <NavLink
            exact
            to={routes.home}
            className={styles.NavLink}
            activeClassName={styles['NavLink-active']}
          >
            Home
          </NavLink>
        </li>
        {isAuthenticated && (
          <li>
            <NavLink
              to={routes.contacts}
              className={styles.NavLink}
              activeClassName={styles['NavLink-active']}
            >
              Contacts
            </NavLink>
          </li>
        )}
      </ul>
    </nav>
  );
}

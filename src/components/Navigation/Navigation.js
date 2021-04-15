// Imports from React
import React from 'react';
import { NavLink } from 'react-router-dom';
// Imports of routes
import routes from '../../routes';
// Imports of components
import Logo from '../Logo';
// Imports from Redux
import { connect } from 'react-redux';
import { getIsAuthenticated } from '../../redux/auth/auth-selectors';
// Imports of helpers
import PropTypes from 'prop-types';
// Styles imports
import styles from './Navigation.module.css';

const Navigation = ({ isAuthenticated }) => {
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
};

Navigation.defaultProps = {
  isAuthenticated: false,
};

Navigation.propTypes = {
  isAuthenticated: PropTypes.bool,
};

const mapStateToProps = state => ({
  isAuthenticated: getIsAuthenticated(state),
});

export default connect(mapStateToProps)(Navigation);

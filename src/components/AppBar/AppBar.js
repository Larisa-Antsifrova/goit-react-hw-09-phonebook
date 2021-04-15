// React imports
import React from 'react';

// Components imports
import Container from '../Container';
import Navigation from '../Navigation';
import UserMenu from '../UserMenu';
import AuthNav from '../AuthNav';

// Imports from Redux
import { useSelector } from 'react-redux';
import { getIsAuthenticated } from '../../redux/auth/auth-selectors';

// Styles imports
import { AppBar as PhoneBookBar } from '@material-ui/core';
import styles from './AppBar.module.css';

export default function AppBar() {
  const isAuthenticated = useSelector(getIsAuthenticated);

  return (
    <PhoneBookBar position="static">
      <Container>
        <div className={styles.AppBar}>
          <Navigation />
          {isAuthenticated ? <UserMenu /> : <AuthNav />}
        </div>
      </Container>
    </PhoneBookBar>
  );
}

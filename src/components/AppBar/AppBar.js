import React from 'react';
import { AppBar as PhoneBookBar } from '@material-ui/core';
import Container from '../Container';
import Navigation from '../Navigation';
import UserMenu from '../UserMenu';
import AuthNav from '../AuthNav';
import { connect } from 'react-redux';
import { getIsAuthenticated } from '../../redux/auth/auth-selectors';

import styles from './AppBar.module.css';

const AppBar = ({ isAuthenticated }) => {
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
};

const mapStateToProps = state => ({
  isAuthenticated: getIsAuthenticated(state),
});

export default connect(mapStateToProps)(AppBar);

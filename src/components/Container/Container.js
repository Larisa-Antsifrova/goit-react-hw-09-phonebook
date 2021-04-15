// React imports
import React from 'react';

// Helpers imports
import PropTypes from 'prop-types';

// Styles imports
import styles from './Container.module.css';

const Container = ({ children }) => (
  <div className={styles.container}>{children}</div>
);

Container.propTypes = {
  children: PropTypes.node,
};

export default Container;

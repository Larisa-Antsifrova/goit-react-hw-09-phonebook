// Imports from React
import React from 'react';
// Imports of helpers
import PropTypes from 'prop-types';
// Styles imports
import styles from './Title.module.css';

const Title = ({ title }) => {
  return title && <h2 className={styles.title}>{title}</h2>;
};

Title.defaultProps = {
  title: '',
};

Title.propTypes = {
  title: PropTypes.string,
};

export default Title;

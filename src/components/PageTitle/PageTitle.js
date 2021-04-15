// Imports from React
import React from 'react';
// Imports of helpers
import PropTypes from 'prop-types';
// Styles imports
import styles from './PageTitle.module.css';

const PageTitle = ({ title }) => {
  return title && <h1 className={styles.title}>{title}</h1>;
};

PageTitle.defaultProps = {
  title: '',
};

PageTitle.propTypes = {
  title: PropTypes.string,
};

export default PageTitle;

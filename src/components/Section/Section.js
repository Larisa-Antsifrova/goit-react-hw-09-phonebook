// Imports from React
import React from 'react';
// Imports of helpers
import PropTypes from 'prop-types';

import Container from '../Container';
// Styles imports
import styles from './Section.module.css';

const Section = ({ children }) => {
  return (
    <section className={styles.section}>
      <Container>{children}</Container>
    </section>
  );
};

Section.propTypes = {
  children: PropTypes.node,
};

export default Section;

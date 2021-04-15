// React imports
import React from 'react';

// Imports of helpers
import PropTypes from 'prop-types';

const Main = ({ children }) => {
  return <main>{children}</main>;
};

Main.propTypes = {
  children: PropTypes.node,
};

export default Main;

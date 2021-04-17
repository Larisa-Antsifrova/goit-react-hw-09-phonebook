// React imports
import React from 'react';

// Imports of helpers
import PropTypes from 'prop-types';

// Styles imports
import styles from './EditorButton.module.css';

const EditorButton = ({ label, purpose, callback, args }) => {
  return (
    <button className={styles[purpose]} onClick={() => callback(...args)}>
      {label}
    </button>
  );
};

EditorButton.propTypes = {
  label: PropTypes.string.isRequired,
  purpose: PropTypes.string.isRequired,
  callback: PropTypes.func.isRequired,
  args: PropTypes.array,
};

export default EditorButton;

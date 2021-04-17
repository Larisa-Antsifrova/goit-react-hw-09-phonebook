// React imports
import React from 'react';

// Imports of helpers
import PropTypes from 'prop-types';

// Styles imports
import styles from './EditorButton.module.css';

const EditorButton = ({ label, purpose, callback }) => {
  return (
    <button className={styles[purpose]} onClick={() => callback()}>
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
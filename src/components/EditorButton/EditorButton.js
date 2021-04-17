// React imports
import React from 'react';

// Imports of helpers
import PropTypes from 'prop-types';

// Styles imports
import styles from './EditorButton.module.css';

const EditorButton = ({ type, purpose, callback }) => {
  return (
    <button type={type} className={styles[purpose]} onClick={() => callback()}>
      {purpose}
    </button>
  );
};

EditorButton.defaultProps = {
  type: 'button',
};

EditorButton.propTypes = {
  type: PropTypes.string,
  purpose: PropTypes.string.isRequired,
  callback: PropTypes.func.isRequired,
  args: PropTypes.array,
};

export default EditorButton;

// Imports from React
import React from 'react';
// Imports from Redux
import { connect } from 'react-redux';
import { updateFilter } from '../../redux/contacts/contacts-actions';
import { getFilterValue } from '../../redux/contacts/contacts-selectors';
// Imports of helpers
import PropTypes from 'prop-types';
// Styles imports
import styles from './Filter.module.css';

const Filter = ({ filterValue, filterUpdate }) => {
  return (
    <div className={styles.filter}>
      <label>
        Find contacts by name
        <input
          type="text"
          name="filter"
          value={filterValue}
          onChange={filterUpdate}
          autoComplete="off"
          required
        />
      </label>
    </div>
  );
};

Filter.defaultProps = {
  filterValue: '',
};

Filter.propTypes = {
  filterValue: PropTypes.string,
  filterUpdate: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  filterValue: getFilterValue(state),
});

const mapDispatchToProps = dispatch => ({
  filterUpdate: event => dispatch(updateFilter(event.target.value)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Filter);

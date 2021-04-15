// React imports
import React, { useCallback } from 'react';

// Imports from Redux
import { useSelector, useDispatch } from 'react-redux';
import { updateFilter } from '../../redux/contacts/contacts-actions';
import { getFilterValue } from '../../redux/contacts/contacts-selectors';

// Styles imports
import styles from './Filter.module.css';

export default function Filter() {
  const dispatch = useDispatch();
  const onUpdateFilter = useCallback(
    event => dispatch(updateFilter(event.target.value)),
    [dispatch],
  );
  const filterValue = useSelector(getFilterValue);

  return (
    <div className={styles.filter}>
      <label>
        Find contacts by name
        <input
          type="text"
          name="filter"
          value={filterValue}
          onChange={onUpdateFilter}
          autoComplete="off"
          required
        />
      </label>
    </div>
  );
}

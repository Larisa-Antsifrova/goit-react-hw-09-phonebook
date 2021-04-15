// Redux imports
import { combineReducers } from 'redux';

// Imports from Redux Toolkit
import { createReducer } from '@reduxjs/toolkit';

// Imports of actions
import {
  fetchContactsRequest,
  fetchContactsSuccess,
  fetchContactsError,
  addContactRequest,
  addContactSuccess,
  addContactError,
  deleteContactRequest,
  deleteContactSuccess,
  deleteContactError,
  updateFilter,
} from './contacts-actions';
import { logoutSuccess } from '../auth/auth-actions';

// Reducer to handle all contacts
const items = createReducer([], {
  [fetchContactsSuccess]: (_, { payload }) => payload,
  [addContactSuccess]: (state, { payload }) => [payload, ...state],
  [deleteContactSuccess]: (state, { payload }) =>
    state.filter(contact => contact.id !== payload),
  [logoutSuccess]: () => [],
});

// Reducer to handle filter value
const filter = createReducer('', {
  [updateFilter]: (_, { payload }) => payload,
});

// Reducer to handle loading status
const loading = createReducer(false, {
  [fetchContactsRequest]: () => true,
  [fetchContactsSuccess]: () => false,
  [fetchContactsError]: () => false,
  [addContactRequest]: () => true,
  [addContactSuccess]: () => false,
  [addContactError]: () => false,
  [deleteContactRequest]: () => true,
  [deleteContactSuccess]: () => false,
  [deleteContactError]: () => false,
});

// Reducer to handle error
const error = createReducer(null, {
  [fetchContactsError]: (_, { payload }) => payload,
  [addContactError]: (_, { payload }) => payload,
  [deleteContactError]: (_, { payload }) => payload,
});

export const contactsReducer = combineReducers({
  items,
  filter,
  loading,
  error,
});

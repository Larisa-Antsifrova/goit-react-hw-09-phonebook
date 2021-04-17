// Imports from Redux Toolkit
import { createAction } from '@reduxjs/toolkit';

// Actions for HTTP requests
const fetchContactsRequest = createAction('contacts/fetchContactsRequest');
const fetchContactsSuccess = createAction('contacts/fetchContactsSuccess');
const fetchContactsError = createAction('contacts/fetchContactsError');

const addContactRequest = createAction('contacts/addContactRequest');
const addContactSuccess = createAction('contacts/addContactSuccess');
const addContactError = createAction('contacts/addContactError');

const deleteContactRequest = createAction('contacts/deleteContactRequest');
const deleteContactSuccess = createAction('contacts/deleteContactSuccess');
const deleteContactError = createAction('contacts/deleteContactError');

const updateContactRequest = createAction('contacts/updateContactRequest');
const updateContactSuccess = createAction('contacts/updateContactSuccess');
const updateContactError = createAction('contacts/updateContactError');

// Action to update filter
const updateFilter = createAction('phonebook/updateFilter');

export {
  fetchContactsRequest,
  fetchContactsSuccess,
  fetchContactsError,
  addContactRequest,
  addContactSuccess,
  addContactError,
  deleteContactRequest,
  deleteContactSuccess,
  deleteContactError,
  updateContactRequest,
  updateContactSuccess,
  updateContactError,
  updateFilter,
};

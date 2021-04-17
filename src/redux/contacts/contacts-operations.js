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
  updateContactRequest,
  updateContactSuccess,
  updateContactError,
} from './contacts-actions';

// Imports of libraries
import axios from 'axios';

// Function to fetch all contacts from DB
const fetchContacts = () => async dispatch => {
  dispatch(fetchContactsRequest());

  try {
    const { data } = await axios.get('/contacts');
    dispatch(fetchContactsSuccess(data));
  } catch (error) {
    dispatch(fetchContactsError(error.message));
  }
};

// Function to add new contact to DB
const addContact = contact => async dispatch => {
  dispatch(addContactRequest());

  try {
    const { data } = await axios.post('/contacts', contact);
    dispatch(addContactSuccess(data));
  } catch (error) {
    dispatch(addContactError(error.message));
  }
};

// Function to delete contact from DB
const deleteContact = contactId => async dispatch => {
  dispatch(deleteContactRequest());

  try {
    await axios.delete(`/contacts/${contactId}`);
    dispatch(deleteContactSuccess(contactId));
  } catch (error) {
    dispatch(deleteContactError(error.message));
  }
};

// Function to update contact from DB
const updateContact = (contactId, updatedUser) => async dispatch => {
  dispatch(updateContactRequest());

  try {
    const { data } = await axios.patch(`/contacts/${contactId}`, updatedUser);
    dispatch(updateContactSuccess(data));
  } catch (error) {
    dispatch(updateContactError(error.message));
  }
};

export { fetchContacts, addContact, deleteContact, updateContact };

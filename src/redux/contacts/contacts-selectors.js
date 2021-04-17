// Imports from Redux Toolkit
import { createSelector } from '@reduxjs/toolkit';

// Selector to get filter value
const getFilterValue = state => state.contacts.filter;

// Selector to get all contacts
const getAllContacts = state => state.contacts.items;

// Selector to get filted contacts (to render in contacts list)
const getFilteredItems = createSelector(
  [getAllContacts, getFilterValue],
  (items, filter) =>
    items.filter(
      ({ name, number }) =>
        name.toLowerCase().includes(filter.toLocaleLowerCase()) ||
        number.includes(filter),
    ),
);

// Selector to get loading status
const getLoading = state => state.contacts.loading;
const getUpdateLoading = state => state.contacts.updateLoading;

export {
  getFilterValue,
  getAllContacts,
  getFilteredItems,
  getLoading,
  getUpdateLoading,
};

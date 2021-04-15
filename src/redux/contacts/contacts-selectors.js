import { createSelector } from '@reduxjs/toolkit';

const getFilterValue = state => state.contacts.filter;

const getAllContacts = state => state.contacts.items;

const getFilteredItems = createSelector(
  [getAllContacts, getFilterValue],
  (items, filter) =>
    items.filter(
      ({ name, number }) =>
        name.toLowerCase().includes(filter.toLocaleLowerCase()) ||
        number.includes(filter),
    ),
);

const getLoading = state => state.contacts.loading;

export { getFilterValue, getAllContacts, getFilteredItems, getLoading };

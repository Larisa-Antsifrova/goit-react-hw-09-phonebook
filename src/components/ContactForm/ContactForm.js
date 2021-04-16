// React imports
import React, { useCallback, useState } from 'react';

// Imports from Redux
import { useDispatch, useSelector } from 'react-redux';
import { addContact } from '../../redux/contacts/contacts-operations';
import { getAllContacts } from '../../redux/contacts/contacts-selectors';

// Styles imports
import styles from './ContactForm.module.css';

export default function ContactForm() {
  // Setting up state for input values
  const [newContact, setNewContact] = useState({ name: '', number: '' });
  // Getting all contacts from store
  const allContacts = useSelector(getAllContacts);
  // Getting dispatch function
  const dispatch = useDispatch();

  // Function to handle inputs
  const handleInputChange = useCallback(
    ({ target: { name, value } }) => {
      setNewContact({ ...newContact, [name]: value });
    },
    [newContact],
  );

  // Function to handle form submit
  const handleSubmit = useCallback(
    event => {
      event.preventDefault();

      if (!newContact.name) {
        return;
      }

      // Checking if the contact already exists
      const existingContact = allContacts.find(
        contact => contact.name === newContact.name,
      );

      if (existingContact) {
        alert(`${existingContact.name} is already in contacts.`);
        return;
      }

      // Dispatching action to add new contact to DB
      dispatch(addContact(newContact));

      // Reseting local state to clean up input values
      setNewContact({ name: '', number: '' });
    },
    [allContacts, dispatch, newContact],
  );

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <label>
        Name
        <input
          type="name"
          name="name"
          value={newContact.name}
          onChange={handleInputChange}
          required
        />
      </label>
      <label>
        Number
        <input
          type="tel"
          name="number"
          value={newContact.number}
          onChange={handleInputChange}
          required
        />
      </label>
      <button type="submit" className={styles.btn}>
        Add
      </button>
    </form>
  );
}

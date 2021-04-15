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
  const [name, setName] = useState('');
  const [number, setNumber] = useState('');
  // Getting all contacts from store
  const allContacts = useSelector(getAllContacts);
  // Getting dispatch function
  const dispatch = useDispatch();

  // Function to handle inputs
  const handleInputChange = useCallback(event => {
    const { name, value } = event.currentTarget;
    // Switching through input names to update the right slice of state and, thus, input value
    switch (name) {
      case 'name':
        setName(value);
        break;
      case 'number':
        setNumber(value);
        break;
      default:
        return;
    }
  }, []);

  // Function to handle form submit
  const handleSubmit = useCallback(
    event => {
      event.preventDefault();

      if (!name) {
        return;
      }

      // Checking if the contact already exists
      const existingContact = allContacts.find(
        contact => contact.name === name,
      );

      if (existingContact) {
        alert(`${existingContact.name} is already in contacts.`);
        return;
      }

      // If the contact does not exist, forming a new contact object
      const newContact = { name: name.trim(), number: number.trim() };

      // Dispatching action to add new contact to DB
      dispatch(addContact(newContact));

      // Reseting local state to clean up input values
      setName('');
      setNumber('');
    },
    [allContacts, dispatch, name, number],
  );

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <label>
        Name
        <input
          type="name"
          name="name"
          value={name}
          onChange={handleInputChange}
          required
        />
      </label>
      <label>
        Number
        <input
          type="tel"
          name="number"
          value={number}
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

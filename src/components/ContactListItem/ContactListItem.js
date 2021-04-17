import React, { useCallback, useState } from 'react';

import { useSelector, useDispatch } from 'react-redux';
import { getAllContacts } from '../../redux/contacts/contacts-selectors';

import {
  deleteContact,
  updateContact,
} from '../../redux/contacts/contacts-operations';

// Styles imports
import styles from './ContactListItem.module.css';

export default function ContactListItem({ contact: { id, name, number } }) {
  const [isEdited, setIsEdited] = useState(false);
  const [editedContact, setEditedContact] = useState({
    name: name,
    number: number,
  });

  const handleInputChange = useCallback(
    ({ target: { name, value } }) => {
      setEditedContact({ ...editedContact, [name]: value });
    },
    [editedContact],
  );

  const dispatch = useDispatch();
  const onDeleteContact = useCallback(
    contactId => dispatch(deleteContact(contactId)),
    [dispatch],
  );

  const allContacts = useSelector(getAllContacts);

  const onUpdateContact = useCallback(
    (contactId, editedContact) => {
      if (!editedContact.name || !editedContact.number) {
        return;
      }

      const existingContact = allContacts.find(
        contact => contact.name === editedContact.name,
      );

      if (existingContact) {
        alert(`${existingContact.name} is already in contacts.`);
        return;
      }

      dispatch(updateContact(contactId, editedContact));
    },
    [allContacts, dispatch],
  );

  return (
    <>
      <div>
        {isEdited ? (
          <>
            <input
              type="name"
              name="name"
              value={editedContact.name}
              onChange={handleInputChange}
              required
            />

            <input
              type="tel"
              name="number"
              value={editedContact.number}
              onChange={handleInputChange}
              required
            />
          </>
        ) : (
          <>
            <p className={styles.info}>{name}:</p>
            <p className={styles.info}>{number}</p>
          </>
        )}
      </div>

      <div className={styles.btnGroup}>
        {isEdited ? (
          <>
            <button
              className={styles.save}
              onClick={() => {
                onUpdateContact(id, editedContact);
                setIsEdited(false);
              }}
            >
              Save
            </button>
            <button
              className={styles.cancel}
              onClick={() => {
                setIsEdited(false);
              }}
            >
              Cancel
            </button>
          </>
        ) : (
          <button
            className={styles.edit}
            onClick={() => {
              setIsEdited(true);
            }}
          >
            Edit
          </button>
        )}
        <button
          className={styles.delete}
          onClick={() => {
            onDeleteContact(id);
          }}
        >
          Delete
        </button>
      </div>
    </>
  );
}

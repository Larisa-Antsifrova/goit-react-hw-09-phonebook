// React imports
import React, { useCallback, useState } from 'react';

// Imports from Redux
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
        setEditedContact({
          name: name,
          number: number,
        });
        setIsEdited(true);
        return;
      }

      const existingContact = allContacts.find(
        contact => contact.name === editedContact.name && contact.id !== id,
      );

      if (existingContact) {
        alert(`${existingContact.name} is already in contacts.`);
        setIsEdited(true);
        return;
      }

      dispatch(updateContact(contactId, editedContact));
      setIsEdited(false);
    },
    [allContacts, dispatch, id, name, number],
  );

  return (
    <>
      <div>
        {isEdited ? (
          <div className={styles.editorInput}>
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
          </div>
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
              onClick={() => onUpdateContact(id, editedContact)}
            >
              Save
            </button>
            <button
              className={styles.cancel}
              onClick={() => setIsEdited(false)}
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

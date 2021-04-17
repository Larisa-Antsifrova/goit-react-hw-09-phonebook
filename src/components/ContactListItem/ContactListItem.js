// React imports
import React, { useCallback, useState } from 'react';

// Imports from Redux
import { useSelector, useDispatch } from 'react-redux';
import { getAllContacts } from '../../redux/contacts/contacts-selectors';
import {
  deleteContact,
  updateContact,
} from '../../redux/contacts/contacts-operations';

// Components imports
import EditorButton from '../EditorButton';

// Helpers imports
import Loader from 'react-loader-spinner';
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css';

// Styles imports
import styles from './ContactListItem.module.css';

export default function ContactListItem({ contact: { id, name, number } }) {
  // Hook to handle if the Editing mode is on. If true two inputs are rendered.
  const [isEdited, setIsEdited] = useState(false);
  // Hook to handle the loader while the contact is being updated and the new one is received from backend.
  const [saving, setSaving] = useState(false);
  // Hook to handle the object of the updated contact.
  const [editedContact, setEditedContact] = useState({
    name: name,
    number: number,
  });

  const dispatch = useDispatch();
  const onDeleteContact = contactId => dispatch(deleteContact(contactId));

  const allContacts = useSelector(getAllContacts);

  // Function to handle input change
  const handleInputChange = useCallback(
    ({ target: { name, value } }) => {
      setEditedContact({ ...editedContact, [name]: value });
    },
    [editedContact],
  );

  // Function to handle "Save" of the updated the contact
  const onUpdateContact = useCallback(
    (contactId, editedContact) => {
      // Checking if the inputs are not emptry. If they are, the input values are set to initial state, and editor mode is kept on.
      if (!editedContact.name || !editedContact.number) {
        setEditedContact({
          name: name,
          number: number,
        });
        setIsEdited(true);
        return;
      }

      // Checking if the updated contact does not clash with already existing contacts.
      const existingContact = allContacts.find(
        contact => contact.name === editedContact.name && contact.id !== id,
      );

      if (existingContact) {
        alert(`${existingContact.name} is already in contacts.`);
        setIsEdited(true);
        return;
      }

      // If the id is the same, clash does not occur.
      const theSameContact = allContacts.find(
        contact => contact.name === editedContact.name && contact.id === id,
      );

      if (theSameContact) {
        setIsEdited(false);
        return;
      }

      // Setting saving to true to display loader while the post request is executed.
      setSaving(true);
      // setSaving is passed as a callback to set saving to false when the request is executed.
      dispatch(updateContact(contactId, editedContact, setSaving));

      // Exiting editing mode.
      setIsEdited(false);
    },
    [allContacts, dispatch, id, name, number],
  );

  // Config for loader
  const loaderConfig = {
    type: 'TailSpin',
    color: '#80cbc4',
    height: 30,
    width: 30,
  };

  return (
    <li className={styles.item}>
      <>
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
        ) : saving ? (
          <Loader {...loaderConfig} />
        ) : (
          <div>
            <p className={styles.info}>{name}:</p>
            <p className={styles.info}>{number}</p>
          </div>
        )}
      </>

      <div className={styles.btnGroup}>
        {isEdited ? (
          <>
            <EditorButton
              purpose="save"
              callback={() => onUpdateContact(id, editedContact)}
            />
            <EditorButton
              purpose="cancel"
              callback={() => setIsEdited(false)}
            />
          </>
        ) : (
          <EditorButton purpose="edit" callback={() => setIsEdited(true)} />
        )}
        <EditorButton purpose="delete" callback={() => onDeleteContact(id)} />
      </div>
    </li>
  );
}

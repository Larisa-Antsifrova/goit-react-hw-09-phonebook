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
  const [isEdited, setIsEdited] = useState(false);
  const [saving, setSaving] = useState(false);

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
  const onDeleteContact = contactId => dispatch(deleteContact(contactId));

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

      const theSameContact = allContacts.find(
        contact => contact.name === editedContact.name && contact.id === id,
      );

      if (theSameContact) {
        setIsEdited(false);
        return;
      }
      setSaving(true);
      dispatch(updateContact(contactId, editedContact, setSaving));

      setIsEdited(false);
    },
    [allContacts, dispatch, id, name, number],
  );

  const loaderConfig = {
    type: 'TailSpin',
    color: '#80cbc4',
    height: 30,
    width: 30,
  };

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
        ) : saving ? (
          <Loader {...loaderConfig} />
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
            <EditorButton
              label="Save"
              purpose="save"
              callback={onUpdateContact}
              args={[id, editedContact]}
            />
            <EditorButton
              label="Cancel"
              purpose="cancel"
              callback={setIsEdited}
              args={[false]}
            />
          </>
        ) : (
          <EditorButton
            label="Edit"
            purpose="edit"
            callback={setIsEdited}
            args={[true]}
          />
        )}
        <EditorButton
          label="Delete"
          purpose="delete"
          callback={onDeleteContact}
          args={[id]}
        />
      </div>
    </>
  );
}

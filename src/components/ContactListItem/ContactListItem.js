import React, { useEffect, useCallback, useState } from 'react';

import { useSelector, useDispatch } from 'react-redux';
import {
  fetchContacts,
  deleteContact,
} from '../../redux/contacts/contacts-operations';

// Styles imports
import styles from './ContactListItem.module.css';

export default function ContactListItem({ contact: { id, name, number } }) {
  const dispatch = useDispatch();
  const onDeleteContact = useCallback(
    contactId => dispatch(deleteContact(contactId)),
    [dispatch],
  );

  return (
    <>
      <div>
        <p className={styles.info}>{name}:</p>
        <p className={styles.info}>{number}</p>
      </div>

      <div className={styles.btnGroup}>
        <button
          className={styles.edit}
          onClick={() => {
            onDeleteContact(id);
          }}
        >
          Edit
        </button>
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

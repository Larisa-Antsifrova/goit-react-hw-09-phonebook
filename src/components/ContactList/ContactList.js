// React imports
import React, { useEffect, useCallback } from 'react';

// Imports from Redux
import { useSelector, useDispatch } from 'react-redux';
import {
  fetchContacts,
  deleteContact,
} from '../../redux/contacts/contacts-operations';
import {
  getFilteredItems,
  getLoading,
} from '../../redux/contacts/contacts-selectors';

// Helpers imports
import _ from 'lodash';
import Loader from 'react-loader-spinner';
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css';

// Styles imports
import styles from './ContactList.module.css';

export default function ContactList() {
  const dispatch = useDispatch();

  // Sending HTTP request to fetch contacts
  useEffect(() => dispatch(fetchContacts()), [dispatch]);

  const onDeleteContact = useCallback(
    contactId => dispatch(deleteContact(contactId)),
    [dispatch],
  );
  // Getting data from Redux state through selectors
  const filtered = useSelector(getFilteredItems);
  const isLoading = useSelector(getLoading);

  const loaderConfig = {
    type: 'TailSpin',
    color: '#80cbc4',
    height: 50,
    width: 50,
    className: styles.loader,
  };

  return (
    <>
      {isLoading && <Loader {...loaderConfig} />}

      {!_.isEmpty(filtered) && (
        <ul className={styles.contacts}>
          {filtered.map(({ id, name, number }) => (
            <li key={id} className={styles.item}>
              <div>
                <p>{name}:</p>
                <p>{number}</p>
              </div>

              <button
                className={styles.btn}
                onClick={() => {
                  onDeleteContact(id);
                }}
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
      )}

      {_.isEmpty(filtered) && !isLoading && (
        <p className={styles.notification}>No contact found.</p>
      )}
    </>
  );
}

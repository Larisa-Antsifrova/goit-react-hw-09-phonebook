// React imports
import React, { useEffect } from 'react';

// Components imports
import ContactListItem from '../ContactListItem';

// Imports from Redux
import { useSelector, useDispatch } from 'react-redux';
import { fetchContacts } from '../../redux/contacts/contacts-operations';
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
          {filtered.map(contact => {
            // console.log(`Render ${contact.name}`);
            return (
              <li key={contact.id} className={styles.item}>
                <ContactListItem contact={contact} />
              </li>
            );
          })}
        </ul>
      )}

      {_.isEmpty(filtered) && !isLoading && (
        <p className={styles.notification}>No contact found.</p>
      )}
    </>
  );
}

// Imports from React
import React, { Component } from 'react';
// Imports from Redux
import { connect } from 'react-redux';
import {
  fetchContacts,
  deleteContact,
} from '../../redux/contacts/contacts-operations';
import {
  getFilteredItems,
  getLoading,
} from '../../redux/contacts/contacts-selectors';
// Imports of helpers
import PropTypes from 'prop-types';
import _ from 'lodash';
import Loader from 'react-loader-spinner';
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css';
// Styles imports
import styles from './ContactList.module.css';

class ContactList extends Component {
  static propTypes = {
    filtered: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
        number: PropTypes.string.isRequired,
      }).isRequired,
    ).isRequired,
    onDeleteContact: PropTypes.func.isRequired,
  };

  componentDidMount() {
    this.props.fetchContacts();
  }

  render() {
    const { filtered, onDeleteContact, isLoading } = this.props;
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
}

const mapStateToProps = state => ({
  filtered: getFilteredItems(state),
  isLoading: getLoading(state),
});

const mapDispatchToProps = dispatch => ({
  onDeleteContact: contactId => dispatch(deleteContact(contactId)),
  fetchContacts: () => dispatch(fetchContacts()),
});

export default connect(mapStateToProps, mapDispatchToProps)(ContactList);

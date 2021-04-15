// Imports from React
import React, { Component } from 'react';
// Imports from Redux
import { connect } from 'react-redux';
import { addContact } from '../../redux/contacts/contacts-operations';
import { getAllContacts } from '../../redux/contacts/contacts-selectors';
// Helpers imports
import PropTypes from 'prop-types';
// Styles imports
import styles from './ContactForm.module.css';

class ContactForm extends Component {
  state = { name: '', number: '' };

  static propTypes = {
    submitHandler: PropTypes.func.isRequired,
  };

  handleInputChange = event => {
    const { name, value } = event.currentTarget;

    this.setState({
      [name]: value,
    });
  };

  handleSubmit = event => {
    event.preventDefault();
    const { name, number } = this.state;
    const { items, submitHandler } = this.props;

    if (!name) {
      return;
    }

    const existingContact = items.find(contact => contact.name === name);

    if (existingContact) {
      alert(`${existingContact.name} is already in contacts.`);
      return;
    }

    const newContact = { name: name.trim(), number: number.trim() };

    submitHandler(newContact);

    this.reset();
  };

  reset = () => {
    this.setState({ name: '', number: '' });
  };

  render() {
    return (
      <form className={styles.form} onSubmit={this.handleSubmit}>
        <label>
          Name
          <input
            type="name"
            name="name"
            value={this.state.name}
            onChange={this.handleInputChange}
            required
          />
        </label>
        <label>
          Number
          <input
            type="tel"
            name="number"
            value={this.state.number}
            onChange={this.handleInputChange}
            required
          />
        </label>
        <button type="submit" className={styles.btn}>
          Add
        </button>
      </form>
    );
  }
}

const mapStateToProps = state => ({
  items: getAllContacts(state),
});

const mapDispatchToProps = dispatch => ({
  submitHandler: contact => dispatch(addContact(contact)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ContactForm);

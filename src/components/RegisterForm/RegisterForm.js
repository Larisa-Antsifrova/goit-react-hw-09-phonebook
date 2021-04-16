// React imports
import React, { useCallback, useState } from 'react';

// Imports from Redux
import { useDispatch } from 'react-redux';
import { registerUser } from '../../redux/auth/auth-operations';

// Components imports
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

// Styles imports
import styles from './RegisterForm.module.css';

export default function RegisterForm() {
  // Setting up state for input values
  const [newUser, setNewUser] = useState({ name: '', email: '', password: '' });
  // Getting dispatch function
  const dispatch = useDispatch();

  // Function to handle inputs
  const handleChange = useCallback(
    ({ target: { name, value } }) => {
      setNewUser({ ...newUser, [name]: value.trim() });
    },
    [newUser],
  );

  // Function to handle form submit
  const handleSubmit = useCallback(
    event => {
      event.preventDefault();

      dispatch(registerUser(newUser));

      setNewUser({ name: '', email: '', password: '' });
    },
    [dispatch, newUser],
  );

  return (
    <form onSubmit={handleSubmit} autoComplete="off" className={styles.form}>
      <TextField
        variant="outlined"
        label="Name"
        required
        inputProps={{
          type: 'text',
          name: 'name',
          value: newUser.name,
          onChange: handleChange,
        }}
        className={styles.input}
      />
      <TextField
        variant="outlined"
        label="Email"
        required
        inputProps={{
          type: 'email',
          name: 'email',
          value: newUser.email,
          onChange: handleChange,
        }}
        className={styles.input}
      />
      <TextField
        variant="outlined"
        label="Password"
        required
        inputProps={{
          type: 'password',
          name: 'password',
          value: newUser.password,
          onChange: handleChange,
        }}
        className={styles.input}
      />
      <Button
        variant="contained"
        color="primary"
        type="submit"
        className={styles.button}
      >
        Register
      </Button>
    </form>
  );
}

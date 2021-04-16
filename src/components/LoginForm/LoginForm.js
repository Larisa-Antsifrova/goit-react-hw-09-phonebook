// React imports
import React, { useCallback, useState } from 'react';

// Imports from Redux
import { useDispatch } from 'react-redux';
import { loginUser } from '../../redux/auth/auth-operations';

// Components imports
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

// Styles imports
import styles from './LoginForm.module.css';

export default function LoginForm() {
  // Setting up state for input values
  const [user, setUser] = useState({ email: '', password: '' });
  // Getting dispatch function
  const dispatch = useDispatch();

  // Function to handle inputs
  const handleChange = useCallback(
    ({ target: { name, value } }) => {
      setUser({ ...user, [name]: value.trim() });
    },
    [user],
  );

  // Function to handle form submit
  const handleSubmit = useCallback(
    event => {
      event.preventDefault();

      dispatch(loginUser(user));

      setUser({ email: '', password: '' });
    },
    [dispatch, user],
  );

  return (
    <form onSubmit={handleSubmit} autoComplete="off" className={styles.form}>
      <TextField
        variant="outlined"
        label="Email"
        required
        inputProps={{
          type: 'email',
          name: 'email',
          value: user.email,
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
          value: user.password,
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
        Login
      </Button>
    </form>
  );
}

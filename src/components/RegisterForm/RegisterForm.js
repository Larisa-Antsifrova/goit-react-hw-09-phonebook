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
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  // Getting dispatch function
  const dispatch = useDispatch();

  // Function to handle inputs
  const handleChange = useCallback(({ target: { name, value } }) => {
    // Switching through input names to update the right slice of state and, thus, input value
    switch (name) {
      case 'name':
        setName(value);
        break;
      case 'email':
        setEmail(value);
        break;
      case 'password':
        setPassword(value);
        break;
      default:
        return;
    }
  }, []);

  // Function to handle form submit
  const handleSubmit = useCallback(
    event => {
      event.preventDefault();

      const newUser = {
        name: name.trim(),
        email: email.trim(),
        password: password.trim(),
      };

      dispatch(registerUser(newUser));

      setName('');
      setEmail('');
      setPassword('');
    },
    [dispatch, email, name, password],
  );

  return (
    <form onSubmit={handleSubmit} autoComplete="off" className={styles.form}>
      <TextField
        id="outlined-basic"
        variant="outlined"
        label="Name"
        inputProps={{
          type: 'text',
          name: 'name',
          value: name,
          onChange: handleChange,
        }}
        className={styles.input}
      />
      <TextField
        id="outlined-basic"
        variant="outlined"
        label="Email"
        inputProps={{
          type: 'email',
          name: 'email',
          value: email,
          onChange: handleChange,
        }}
        className={styles.input}
      />
      <TextField
        id="outlined-basic"
        variant="outlined"
        label="Password"
        inputProps={{
          type: 'password',
          name: 'password',
          value: password,
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

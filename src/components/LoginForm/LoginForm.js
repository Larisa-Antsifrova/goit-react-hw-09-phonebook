// Imports from React
import React, { Component } from 'react';
// Imports from Redux
import { connect } from 'react-redux';
import { loginUser } from '../../redux/auth/auth-operations';
// Imports of components
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
// Imports of styles
import styles from './LoginForm.module.css';
class LoginForm extends Component {
  state = {
    email: '',
    password: '',
  };

  handleChange = ({ target: { name, value } }) => {
    this.setState({ [name]: value });
  };

  handleSubmit = e => {
    e.preventDefault();

    this.props.onSubmit(this.state);

    this.setState({ name: '', email: '', password: '' });
  };

  render() {
    const { email, password } = this.state;

    return (
      <form
        onSubmit={this.handleSubmit}
        autoComplete="off"
        className={styles.form}
      >
        <TextField
          id="outlined-basic"
          variant="outlined"
          label="Email"
          inputProps={{
            type: 'email',
            name: 'email',
            value: email,
            onChange: this.handleChange,
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
            onChange: this.handleChange,
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
}

const mapDispatchToProps = {
  onSubmit: loginUser,
};

export default connect(null, mapDispatchToProps)(LoginForm);

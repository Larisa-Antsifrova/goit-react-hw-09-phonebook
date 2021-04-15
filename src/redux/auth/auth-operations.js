// Imports of actions
import {
  registerRequest,
  registerSuccess,
  registerError,
  loginRequest,
  loginSuccess,
  loginError,
  logoutRequest,
  logoutSuccess,
  logoutError,
  getCurrentUserRequest,
  getCurrentUserSuccess,
  getCurrentUserError,
} from './auth-actions';

// Imports of libraries
import axios from 'axios';
axios.defaults.baseURL = 'https://goit-phonebook-api.herokuapp.com';

// Token object with methods to set and uset the token from headers
const authToken = {
  set(token) {
    axios.defaults.headers.common.Authorization = `Bearer ${token}`;
  },
  unset() {
    axios.defaults.headers.common.Authorization = '';
  },
};

// Function to register a new user
const registerUser = user => async dispatch => {
  dispatch(registerRequest());

  try {
    const response = await axios.post('/users/signup', user);

    authToken.set(response.data.token);
    dispatch(registerSuccess(response.data));
  } catch (error) {
    dispatch(registerError(error.message));
  }
};

// Function to login an existing user
const loginUser = user => async dispatch => {
  dispatch(loginRequest());

  try {
    const response = await axios.post('/users/login', user);

    authToken.set(response.data.token);
    dispatch(loginSuccess(response.data));
  } catch (error) {
    dispatch(loginError(error.message));
  }
};

// Function to log out user
const logoutUser = () => async dispatch => {
  dispatch(logoutRequest());

  try {
    await axios.post('/users/logout');
    authToken.unset();
    dispatch(logoutSuccess());
  } catch (error) {
    dispatch(logoutError(error.message));
  }
};

// Function to get current user status
const getCurrentUser = () => async (dispatch, getState) => {
  const {
    auth: { token },
  } = getState();

  if (!token) {
    return;
  }

  authToken.set(token);
  dispatch(getCurrentUserRequest());

  try {
    const response = await axios.get('/users/current');

    dispatch(getCurrentUserSuccess(response.data));
  } catch (error) {
    dispatch(getCurrentUserError(error.message));
  }
};

export { registerUser, loginUser, logoutUser, getCurrentUser };

// Redux imports
import { combineReducers } from 'redux';

// Imports from Redux Toolkit
import { createReducer } from '@reduxjs/toolkit';

// Imports of actions
import {
  // registerRequest,
  registerSuccess,
  registerError,
  // loginRequest,
  loginSuccess,
  loginError,
  // logoutRequest,
  logoutSuccess,
  logoutError,
  getCurrentUserRequest,
  getCurrentUserSuccess,
  getCurrentUserError,
} from './auth-actions';

// Initial user state
const initialUserState = { name: null, email: null };

// Reducer to handle user slice of the state
const user = createReducer(initialUserState, {
  [registerSuccess]: (_, { payload }) => payload.user,
  [loginSuccess]: (_, { payload }) => payload.user,
  [logoutSuccess]: () => initialUserState,
  [getCurrentUserSuccess]: (_, { payload }) => payload,
});

// Reducer to handle token slice of the state
const token = createReducer(null, {
  [registerSuccess]: (_, { payload }) => payload.token,
  [loginSuccess]: (_, { payload }) => payload.token,
  [logoutSuccess]: () => null,
});

// Reducer to handle error slice of the state
const error = createReducer(null, {
  [registerError]: (_, { payload }) => payload,
  [loginError]: (_, { payload }) => payload,
  [logoutError]: (_, { payload }) => payload,
  [getCurrentUserError]: (_, { payload }) => payload,
});

// Reducer to handle authentication status slice of the state
const isAuthenticated = createReducer(false, {
  [registerSuccess]: () => true,
  [loginSuccess]: () => true,
  [getCurrentUserRequest]: () => true,
  [getCurrentUserSuccess]: () => true,
  [logoutSuccess]: () => false,
  [registerError]: () => false,
  [loginError]: () => false,
  [getCurrentUserError]: () => false,
});

export const authReducer = combineReducers({
  user,
  token,
  isAuthenticated,
  error,
});

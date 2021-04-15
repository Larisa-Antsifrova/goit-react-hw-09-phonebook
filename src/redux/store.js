// Imports from Redux Toolkit
import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';

// Imports from Redux Persist
import storage from 'redux-persist/lib/storage';

// Redux Persist fix
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist';

// Imports of reducers
import { contactsReducer } from './contacts/contacts-reducers';
import { authReducer } from './auth/auth-reducers';

// Config for middleware
const middleware = [
  ...getDefaultMiddleware({
    serializableCheck: {
      ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
    },
  }),
];

// Config for authorization slice of state to set token to Local Storage
const authPersistConfig = {
  key: 'token',
  storage,
  whitelist: ['token'],
};

// Creating and configuring application store
const store = configureStore({
  reducer: {
    contacts: contactsReducer,
    auth: persistReducer(authPersistConfig, authReducer),
  },
  middleware,
  devTools: process.env.NODE_ENV !== 'production',
});

// Declaring persistor
const persistor = persistStore(store);

export { store, persistor };

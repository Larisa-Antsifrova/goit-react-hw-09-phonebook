// Imports from React
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';

// Imports from Redux
import { Provider } from 'react-redux';
import { store, persistor } from './redux/store';
// Imports from Redux Persist
import { PersistGate } from 'redux-persist/integration/react';

// Imports of components
import App from './App';

// Styles imports
import 'modern-normalize/modern-normalize.css';
import './index.css';

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <Provider store={store}>
        <PersistGate loading="Loading..." persistor={persistor}>
          <App />
        </PersistGate>
      </Provider>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root'),
);

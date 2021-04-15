// React imports
import React, { Suspense, lazy, useEffect } from 'react';
import { Route, Switch } from 'react-router-dom';

// Components imports
import AppBar from './components/AppBar';

// Helpers imports
import Loader from 'react-loader-spinner';
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css';

// Routes imports
import routes from './routes';
import PrivateRoute from './components/PrivateRoute';
import PublicRoute from './components/PublicRoute';

// Imports from Redux
import { useDispatch } from 'react-redux';

// Operations imports
import { getCurrentUser } from './redux/auth/auth-operations';

// Lazy imports for views
const HomePage = lazy(() =>
  import('./views/HomePage' /* webpackChunkName: "home-page" */),
);
const LoginPage = lazy(() =>
  import('./views/LoginPage' /* webpackChunkName: "login-page" */),
);
const RegisterPage = lazy(() =>
  import('./views/RegisterPage' /* webpackChunkName: "register-page" */),
);
const ContactsPage = lazy(() =>
  import('./views/ContactsPage' /* webpackChunkName: "contacts-page" */),
);
const NotFoundPage = lazy(() =>
  import('./views/NotFoundPage' /* webpackChunkName: "contacts-page" */),
);

export default function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getCurrentUser());
  }, [dispatch]);

  return (
    <>
      <Suspense
        fallback={
          <Loader
            type="TailSpin"
            color="#80cbc4"
            height={80}
            width={80}
            className="loader"
          />
        }
      >
        <AppBar />
        <Switch>
          <Route exact path={routes.home}>
            <HomePage />
          </Route>

          <PublicRoute
            path={routes.register}
            redirectTo={routes.contacts}
            restricted
          >
            <RegisterPage />
          </PublicRoute>

          <PublicRoute
            path={routes.login}
            redirectTo={routes.contacts}
            restricted
          >
            <LoginPage />
          </PublicRoute>

          <PrivateRoute path={routes.contacts} redirectTo={routes.login}>
            <ContactsPage />
          </PrivateRoute>

          <Route>
            <NotFoundPage />
          </Route>
        </Switch>
      </Suspense>
    </>
  );
}

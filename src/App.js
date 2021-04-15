// React imports
import React, { Component, Suspense, lazy } from 'react';
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
import { connect } from 'react-redux';

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

class App extends Component {
  componentDidMount() {
    this.props.getCurrentUser();
  }

  render() {
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
            <Route exact path={routes.home} component={HomePage} />
            <PublicRoute
              path={routes.register}
              component={RegisterPage}
              restricted
              redirectTo={routes.home}
            />
            <PublicRoute
              path={routes.login}
              component={LoginPage}
              restricted
              redirectTo={routes.contacts}
            />
            <PrivateRoute
              path={routes.contacts}
              component={ContactsPage}
              redirectTo={routes.login}
            />
            <Route component={NotFoundPage} />
          </Switch>
        </Suspense>
      </>
    );
  }
}

const mapDispatchToProps = {
  getCurrentUser,
};
export default connect(null, mapDispatchToProps)(App);

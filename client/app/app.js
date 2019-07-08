/**
 *
 * app.js
 * This is the application component. setup and configuration
 */

import React from 'react';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'connected-react-router';
import cookie from 'react-cookies';

import store, { history } from './store';
import { SET_AUTH } from './containers/Authentication/constants';
import Application from './containers/Application';
import ScrollToTop from './scrollToTop';
import setToken from './utils/token';

// Import application sass styles
import './styles/style.scss';

// Import Font Awesome Icons Set
import 'font-awesome/css/font-awesome.min.css';

// Import Simple Line Icons Set
import 'simple-line-icons/css/simple-line-icons.css';

// react-bootstrap-table2 styles
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';

// Authentication
const token = cookie.load('token');

if (token) {
  // authenticate api authorization
  setToken(token);

  // authenticate routes
  store.dispatch({ type: SET_AUTH });
}

const app = () => (
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <ScrollToTop>
        <Application />
      </ScrollToTop>
    </ConnectedRouter>
  </Provider>
);

export default app;

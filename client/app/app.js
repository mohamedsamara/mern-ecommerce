/**
 *
 * app.js
 * This is the application component. setup and boilerplate
 */

import React from 'react';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'connected-react-router';

import store, { history } from './store';

import Application from './containers/Application';

import ScrollToTop from './scrollToTop';
// Import application sass styles
import './styles/style.scss';

// Import Font Awesome Icons Set
import 'font-awesome/css/font-awesome.min.css';

// Import Simple Line Icons Set
import 'simple-line-icons/css/simple-line-icons.css';

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

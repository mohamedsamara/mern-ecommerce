/**
 *
 * Dashboard
 *
 */

import React from 'react';

import cookie from 'react-cookies';

import Admin from '../Admin';
import Customer from '../Customer';

class Dashboard extends React.PureComponent {
  render() {
    const role = cookie.load('role');

    if (role == 'ROLE_MEMBER') {
      return <Customer />;
    } else {
      return <Admin />;
    }
  }
}

export default Dashboard;

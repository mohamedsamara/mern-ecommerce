/*
 *
 * Address
 *
 */

import React from 'react';

import { connect } from 'react-redux';
import { Switch, Route } from 'react-router-dom';

import actions from '../../actions';

import List from './List';
import Add from './Add';
import Edit from './Edit';
import Page404 from '../../components/Common/Page404';

class Address extends React.PureComponent {
  render() {
    return (
      <div className='address-dashboard'>
        <Switch>
          <Route exact path='/dashboard/address' component={List} />
          <Route exact path='/dashboard/address/edit/:id' component={Edit} />
          <Route exact path='/dashboard/address/add' component={Add} />
          <Route path='*' component={Page404} />
        </Switch>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    user: state.account.user
  };
};

export default connect(mapStateToProps, actions)(Address);

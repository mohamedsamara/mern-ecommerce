/*
 *
 * Customer
 *
 */

import React from 'react';

import { Switch, Route } from 'react-router-dom';
import { Row, Col } from 'reactstrap';

import AccountMenu from '../AccountMenu';
import Page404 from '../../Common/Page404';

import Account from '../../../containers/Account';
import AccountSecurity from '../../../containers/AccountSecurity';
import Product from '../../../containers/Product';
import Brand from '../../../containers/Brand';
import Order from '../../../containers/Order';

const Customer = props => {
  return (
    <div className='merchant'>
      <Row>
        <Col xs='12' md='5' xl='4'>
          <AccountMenu {...props} />
        </Col>
        <Col xs='12' md='7' xl='8'>
          <div className='panel-body'>
            <Switch>
              <Route exact path='/dashboard' component={Account} />
              <Route path='/dashboard/security' component={AccountSecurity} />
              <Route path='/dashboard/products' component={Product} />
              <Route path='/dashboard/brands' component={Brand} />
              <Route path='/dashboard/orders' component={Order} />
              <Route path='*' component={Page404} />
            </Switch>
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default Customer;

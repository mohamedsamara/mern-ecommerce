/*
 *
 * Customer
 *
 */

import React from 'react';
import { connect } from 'react-redux';

import { Switch, Route } from 'react-router-dom';
import { Row, Col } from 'reactstrap';

import actions from '../../actions';

import AccountMenu from '../../components/AccountMenu';
import Page404 from '../../components/Page404';

import Account from '../Account';
import Order from '../Order';

class Customer extends React.PureComponent {
  render() {
    const { isMenuOpen, toggleCustomerMenu, customerLinks } = this.props;

    return (
      <div className='admin'>
        <Row>
          <Col xs='12' lg='4'>
            <AccountMenu
              isMenuOpen={isMenuOpen}
              accountLinks={customerLinks}
              toggleMenu={toggleCustomerMenu}
            />
          </Col>
          <Col xs='12' lg='8'>
            <div className='panel-body'>
              <Switch>
                <Route exact path='/dashboard' component={Account} />
                <Route path='/dashboard/orders' component={Order} />
                <Route path='*' component={Page404} />
              </Switch>
            </div>
          </Col>
        </Row>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    isMenuOpen: state.customer.isMenuOpen,
    customerLinks: state.customer.customerLinks
  };
};

export default connect(mapStateToProps, actions)(Customer);

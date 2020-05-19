/*
 *
 * Admin
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
import Users from '../Users';
import Category from '../Category';
import Product from '../Product';
import Brand from '../Brand';
import Merchants from '../Merchant';
import Order from '../Order';

class Admin extends React.PureComponent {
  render() {
    const { isMenuOpen, adminLinks, toggleAdminMenu } = this.props;

    return (
      <div className='admin'>
        <Row>
          <Col xs='12' lg='4'>
            <AccountMenu
              isMenuOpen={isMenuOpen}
              accountLinks={adminLinks}
              toggleMenu={toggleAdminMenu}
            />
          </Col>
          <Col xs='12' lg='8'>
            <div className='panel-body'>
              <Switch>
                <Route exact path='/dashboard' component={Account} />
                <Route path='/dashboard/products' component={Product} />
                <Route path='/dashboard/categories' component={Category} />
                <Route path='/dashboard/brands' component={Brand} />
                <Route path='/dashboard/users' component={Users} />
                <Route path='/dashboard/merchants' component={Merchants} />
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
    isMenuOpen: state.admin.isMenuOpen,
    adminLinks: state.admin.adminLinks
  };
};

export default connect(mapStateToProps, actions)(Admin);

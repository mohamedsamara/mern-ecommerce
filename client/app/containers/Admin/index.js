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

import Account from '../Account';
import Homepage from '../Homepage';

class Admin extends React.PureComponent {
  render() {
    const { isMenuOpen, adminLinks, toggleAdminMenu } = this.props;

    return (
      <div className='admin'>
        <Row>
          <Col xs='12' md='4'>
            <AccountMenu
              isMenuOpen={isMenuOpen}
              accountLinks={adminLinks}
              toggleMenu={toggleAdminMenu}
            />
          </Col>
          <Col xs='12' md='8'>
            <div className='panel-body'>
              <Switch>
                <Route exact path='/dashboard' component={Account} />
                <Route path='/dashboard/products' component={Homepage} />
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

export default connect(
  mapStateToProps,
  actions
)(Admin);

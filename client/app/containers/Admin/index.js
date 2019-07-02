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
import AddCategory from '../../components/AddCategory';
import AddProduct from '../../components/AddProduct';
import AddBrand from '../../components/AddBrand';

import Account from '../Account';
import Users from '../Users';

class Admin extends React.PureComponent {
  render() {
    const {
      isMenuOpen,
      adminLinks,
      toggleAdminMenu,
      productFormData,
      productChange,
      addProduct,
      categoryFormData,
      categoryChange,
      addCategory,
      brandFormData,
      brandChange,
      addBrand
    } = this.props;

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
                <Route
                  path='/dashboard/products'
                  render={props => (
                    <AddProduct
                      productFormData={productFormData}
                      productChange={productChange}
                      addProduct={addProduct}
                    />
                  )}
                />
                <Route
                  path='/dashboard/categories'
                  render={props => (
                    <AddCategory
                      categoryFormData={categoryFormData}
                      categoryChange={categoryChange}
                      addCategory={addCategory}
                    />
                  )}
                />
                <Route
                  path='/dashboard/brands'
                  render={props => (
                    <AddBrand
                      brandFormData={brandFormData}
                      brandChange={brandChange}
                      addBrand={addBrand}
                    />
                  )}
                />
                <Route path='/dashboard/users' component={Users} />
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
    adminLinks: state.admin.adminLinks,
    productFormData: state.product.productFormData,
    categoryFormData: state.category.categoryFormData,
    brandFormData: state.brand.brandFormData
  };
};

export default connect(
  mapStateToProps,
  actions
)(Admin);

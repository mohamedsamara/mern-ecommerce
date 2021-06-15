/**
 *
 * Shop
 *
 */

import React from 'react';

import { connect } from 'react-redux';
import { Switch, Route } from 'react-router-dom';

import actions from '../../actions';

import ProductsShop from '../ProductsShop';
import BrandsShop from '../BrandsShop';
import CategoryShop from '../CategoryShop';
import SearchShop from '../SearchShop';

import Page404 from '../../components/Common/Page404';

class Shop extends React.PureComponent {
  componentDidMount() {
    document.body.classList.add('shop-page');
  }

  componentWillUnmount() {
    document.body.classList.remove('shop-page');
  }

  render() {
    return (
      <div className='shop'>
        <Switch>
          <Route exact path='/shop' component={ProductsShop} />
          <Route path='/shop/category/:slug' component={CategoryShop} />
          <Route path='/shop/brand/:slug' component={BrandsShop} />
          <Route path='/shop/search/:slug' component={SearchShop} />
          <Route path='*' component={Page404} />
        </Switch>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {};
};

export default connect(mapStateToProps, actions)(Shop);

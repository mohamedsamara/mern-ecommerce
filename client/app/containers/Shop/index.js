/**
 *
 * Shop
 *
 */

import React from 'react';
import { connect } from 'react-redux';
import { Switch, Route } from 'react-router-dom';

import actions from '../../actions';

import Products from '../Products';
import Brands from '../Brands';

import Page404 from '../../components/Page404';

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
          <Route exact path='/shop' component={Products} />
          <Route path='/shop/category/:slug' component={Products} />
          <Route path='/shop/brand/:slug' component={Brands} />
          <Route path='*' component={Page404} />
        </Switch>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {};
};

export default connect(
  mapStateToProps,
  actions
)(Shop);

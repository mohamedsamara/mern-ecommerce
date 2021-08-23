/**
 *
 * Shop
 *
 */

import React from 'react';

import { connect } from 'react-redux';
import { Switch, Route } from 'react-router-dom';
import { Row, Col } from 'reactstrap';

import actions from '../../actions';

import ProductsShop from '../ProductsShop';
import BrandsShop from '../BrandsShop';
import CategoryShop from '../CategoryShop';

import Page404 from '../../components/Common/Page404';
import ProductFilter from '../../components/Store/ProductFilter';
import ShopPagination from '../../components/Common/ShopPagination';

class Shop extends React.PureComponent {
  componentDidMount() {
    document.body.classList.add('shop-page');
  }

  componentWillUnmount() {
    document.body.classList.remove('shop-page');
  }

  render() {
    const { products, advancedFilters, filterProducts } = this.props;
    const { totalProducts, pageNumber, pages } = advancedFilters;

    return (
      <div className='shop'>
        <Row xs='12'>
          <Col
            xs='3'
            xs={{ size: 12, order: 1 }}
            sm={{ size: 6, order: 1 }}
            md={{ size: 4, order: 1 }}
            lg={{ size: 3, order: 1 }}
          >
            <ProductFilter
              totalProducts={totalProducts}
              pageNumber={pageNumber}
              filterProducts={filterProducts}
            />
          </Col>
          <Col
            xs='9'
            xs={{ size: 12, order: 2 }}
            sm={{ size: 6, order: 2 }}
            md={{ size: 8, order: 2 }}
            lg={{ size: 9, order: 2 }}
          >
            <Switch>
              <Route exact path='/shop' component={ProductsShop} />
              <Route path='/shop/category/:slug' component={CategoryShop} />
              <Route path='/shop/brand/:slug' component={BrandsShop} />
              <Route path='*' component={Page404} />
            </Switch>

            {totalProducts < 8 ? (
              ''
            ) : (
              <ShopPagination
                handlePagenationChangeSubmit={filterProducts}
                products={products}
                pages={pages}
              />
            )}
          </Col>
        </Row>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    advancedFilters: state.product.advancedFilters
  };
};

export default connect(mapStateToProps, actions)(Shop);

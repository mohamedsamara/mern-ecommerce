/**
 *
 * ProductsShop
 *
 */

import React from 'react';

import { connect } from 'react-redux';

import actions from '../../actions';

import ProductList from '../../components/Store/ProductList';
import NotFound from '../../components/Common/NotFound';
import LoadingIndicator from '../../components/Common/LoadingIndicator';

class ProductsShop extends React.PureComponent {
  componentDidMount() {
    const slug = this.props.match.params.slug;
    this.props.fetchStoreProducts(slug);
  }

  render() {
    const { products, isLoading, isLiked, wishlistChange,authenticated } = this.props;

    return (
      <div className='products-shop'>
        {isLoading ? (
          <LoadingIndicator />
        ) : products && products.length > 0 ? (
          <ProductList
          products={products}
          isLiked={isLiked}
          wishlistChange={wishlistChange}
          authenticated={authenticated}
          />
        ) : (
          <NotFound message='no products found.' />
        )}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    products: state.product.storeProducts,
    isLoading: state.product.isLoading,
    isLiked: state.wishlist.isLiked,
    authenticated:state.authentication.authenticated
  };
};

export default connect(mapStateToProps, actions)(ProductsShop);

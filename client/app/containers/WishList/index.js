/*
 *
 * WishList
 *
 */

import React from 'react';

import { connect } from 'react-redux';

import actions from '../../actions';

import SubPage from '../../components/Manager/SubPage';
import WishList from '../../components/Manager/WishList';
import NotFound from '../../components/Common/NotFound';
import LoadingIndicator from '../../components/Common/LoadingIndicator';

class Wishlist extends React.PureComponent {
  componentDidMount() {
    this.props.fetchStoreProducts();
  }

  render() {
    const { products, isLoading, wishlistChange } = this.props;
    const wishlistProducts = products.filter(
      data => data.isLiked !== undefined && data.isLiked == true
    );
    return (
      <div className='wishlist-dashboard'>
        <SubPage title={'Your Wishlist'} isMenuOpen={null}>
          {isLoading ? (
            <LoadingIndicator inline />
          ) : wishlistProducts.length > 0 ? (
            <WishList
              products={wishlistProducts}
              wishlistChange={wishlistChange}
            />
          ) : (
            <NotFound message='you have no wishlist yet!' />
          )}
        </SubPage>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    products: state.product.storeProducts,
    isLoading: state.order.isLoading
  };
};

export default connect(mapStateToProps, actions)(Wishlist);

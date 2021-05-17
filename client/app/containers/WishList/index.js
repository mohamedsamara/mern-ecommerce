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
    this.props.fetchWishlist();
  }

  render() {
    const { wishlist, isLoading, updateWishlist } = this.props;

    return (
      <div className='wishlist-dashboard'>
        <SubPage title={'Your Wishlist'} isMenuOpen={null}>
          {isLoading ? (
            <LoadingIndicator inline />
          ) : wishlist.length > 0 ? (
            <WishList wishlist={wishlist} updateWishlist={updateWishlist} />
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
    wishlist: state.wishlist.wishlist,
    isLoading: state.wishlist.isLoading
  };
};

export default connect(mapStateToProps, actions)(Wishlist);

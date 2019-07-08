/*
 *
 * Cart
 *
 */

import React from 'react';
import { connect } from 'react-redux';

import { Row, Col } from 'reactstrap';

import actions from '../../actions';

import CartList from '../../components/CartList';
import Checkout from '../../components/Checkout';

class Cart extends React.PureComponent {
  render() {
    const {
      isCartOpen,
      cartItems,
      toggleCart,
      handleShopping,
      handleCheckout
    } = this.props;

    return (
      <div className='cart'>
        <div className='cart-header'>
          {isCartOpen && <span className='close-icon' onClick={toggleCart} />}
        </div>
        {cartItems.length > 0 ? (
          <CartList cartItems={cartItems} />
        ) : (
          <div className='empty-cart'>
            <p>Your shopping cart is empty</p>
          </div>
        )}
        <div className='cart-checkout'>
          <Checkout
            handleShopping={handleShopping}
            handleCheckout={handleCheckout}
          />
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    isCartOpen: state.navigation.isCartOpen,
    cartItems: state.cart.cartItems
  };
};

export default connect(
  mapStateToProps,
  actions
)(Cart);

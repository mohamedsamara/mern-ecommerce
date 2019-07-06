/*
 *
 * Cart
 *
 */

import React from 'react';
import { connect } from 'react-redux';

import { Row, Col } from 'reactstrap';

import actions from '../../actions';

class Cart extends React.PureComponent {
  render() {
    const { isCartOpen, cart, toggleCart } = this.props;

    return (
      <div className='cart'>
        <div className='cart-header'>
          {isCartOpen && <span className='close-icon' onClick={toggleCart} />}
        </div>
        {cart.length > 0 ? (
          'test'
        ) : (
          <div className='empty-cart'>
            <p>Your shopping cart is empty</p>
          </div>
        )}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    isCartOpen: state.navigation.isCartOpen,
    cart: state.cart.cartItems
  };
};

export default connect(
  mapStateToProps,
  actions
)(Cart);

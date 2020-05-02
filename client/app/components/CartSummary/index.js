/**
 *
 * CartSummary
 *
 */

import React from 'react';

const CartSummary = props => {
  const { cartTotal } = props;

  return (
    <div className='cart-summary'>
      <div className='total-item'>
        <label>Free Shipping</label>
        <div className='value'>$0</div>
      </div>
      <div className='total-item'>
        <label>Total</label>
        <div className='value'>${cartTotal}</div>
      </div>
    </div>
  );
};

export default CartSummary;

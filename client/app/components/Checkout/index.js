/**
 *
 * Checkout
 *
 */

import React from 'react';

const Checkout = props => {
  const { authenticated, handleShopping, handleCheckout, placeOrder } = props;

  return (
    <div className='checkout'>
      <div className='checkout-actions'>
        <button
          className='input-btn'
          type='submit'
          onClick={() => handleShopping()}
        >
          Continue shopping
        </button>
        {authenticated ? (
          <button
            className='input-btn'
            type='submit'
            onClick={() => placeOrder()}
          >
            Place Order
          </button>
        ) : (
          <button
            className='input-btn'
            type='submit'
            onClick={() => handleCheckout()}
          >
            Proceed To Checkout
          </button>
        )}
      </div>
    </div>
  );
};

export default Checkout;

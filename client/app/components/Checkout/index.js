/**
 *
 * Checkout
 *
 */

import React from 'react';

import Button from '../../components/Button';

const Checkout = props => {
  const { authenticated, handleShopping, handleCheckout, placeOrder } = props;

  return (
    <div className='easy-checkout'>
      <div className='checkout-actions'>
        <Button text='Continue shopping' onClick={() => handleShopping()} />
        {authenticated ? (
          <Button text='Place Order' onClick={() => placeOrder()} />
        ) : (
          <Button text='Proceed To Checkout' onClick={() => handleCheckout()} />
        )}
      </div>
    </div>
  );
};

export default Checkout;

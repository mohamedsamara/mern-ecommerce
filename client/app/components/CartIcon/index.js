/**
 *
 * CartIcon
 *
 */

import React from 'react';

import { BagIcon } from '../Icon';
import Button from '../Button';

const CartIcon = props => {
  const { onClick, cartItems } = props;

  const Icon = (
    <span className='cart-icon'>
      <BagIcon />
      {cartItems.length > 0 && (
        <span className='cart-badge'>{cartItems.length}</span>
      )}
    </span>
  );

  const items = cartItems.length;

  return (
    <Button
      ariaLabel={
        items > 0 ? `your cart have ${items} items` : 'your cart is empty'
      }
      icon={Icon}
      className='btn-no-styles'
      onClick={onClick}
    />
  );
};

export default CartIcon;

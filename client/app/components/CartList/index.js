/**
 *
 * CartList
 *
 */

import React from 'react';

import { Link } from 'react-router-dom';

const CartList = props => {
  const { cartItems } = props;

  return (
    <div className='cart-list'>
      {cartItems.map((item, index) => (
        <div key={index} className='item-box'>
          <Link to={`/product/${item.slug}`}>
            <h1>{item.name}</h1>
          </Link>
          <p className='item-price'>
            <label>Price</label>${item.price}
          </p>
          <p className='item-qunatity'>
            <label>quantity</label>
            {item.quantity}
          </p>
        </div>
      ))}
    </div>
  );
};

export default CartList;

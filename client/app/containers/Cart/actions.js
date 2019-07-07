/*
 *
 * Cart actions
 *
 */

import { push } from 'connected-react-router';
import { success, error } from 'react-notification-system-redux';
import axios from 'axios';

import { FETCH_CART } from './constants';

export const fetchCart = () => {
  return async (dispatch, getState) => {
    try {
      const response = await axios.post('/api/cart');

      cookie.save('cart', response.data.cart._id, { path: '/' });
      cookie.save('user', response.data.user.id, { path: '/' });

      dispatch({ type: FETCH_CART });
    } catch (error) {
      console.log(error);
    }
  };
};

export const addToCart = itemId => {
  return async (dispatch, getState) => {
    try {
      console.log('itemId---', itemId);

      const response = await axios.post('/api/cart');

      dispatch({ type: FETCH_CART });
    } catch (error) {
      console.log(error);
    }
  };
};

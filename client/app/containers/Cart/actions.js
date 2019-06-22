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

      cookie.save('token', response.data.token, { path: '/' });
      cookie.save('user', response.data.user.id, { path: '/' });

      dispatch({ type: FETCH_CART });
    } catch (error) {
      console.log(error);
    }
  };
};

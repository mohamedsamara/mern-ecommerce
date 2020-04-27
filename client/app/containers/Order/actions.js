/*
 *
 * Order actions
 *
 */

import { success } from 'react-notification-system-redux';
import axios from 'axios';
import cookie from 'react-cookies';

import { FETCH_ORDERS, TOGGLE_ADD_ORDER } from './constants';
import handleError from '../../utils/error';

export const toggleAddOrder = () => {
  return {
    type: TOGGLE_ADD_ORDER
  };
};

export const fetchOrders = () => {
  return async (dispatch, getState) => {
    try {
      const userId = cookie.load('user');
      const response = await axios.get(`/api/order/list/${userId}`);

      console.log('response', response);

      dispatch({
        type: FETCH_ORDERS,
        // payload: response.data.orders
        payload: []
      });
    } catch (error) {
      const title = `Please try again!`;
      handleError(error, title, dispatch);
    }
  };
};

export const addOrder = () => {
  return async (dispatch, getState) => {
    try {
      const userId = cookie.load('user');
      const products = getState().cart.itemsInCart;
      console.log('products', products);

      const response = await axios.post(`/api/order/add`, {
        userId,
        products
      });

      console.log('response', response);
    } catch (error) {
      const title = `Please try again!`;
      handleError(error, title, dispatch);
    }
  };
};

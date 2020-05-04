/*
 *
 * Order actions
 *
 */

import { push } from 'connected-react-router';
import { success } from 'react-notification-system-redux';
import axios from 'axios';
import cookie from 'react-cookies';

import { FETCH_ORDERS, FETCH_ORDER, TOGGLE_ADD_ORDER } from './constants';
import { clearCart, getCartId } from '../Cart/actions';
import { toggleCart } from '../Navigation/actions';
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

      const orders = calculateOrdersTotal(response.data.orders);

      dispatch({
        type: FETCH_ORDERS,
        payload: orders
      });
    } catch (error) {
      const title = `Please try again!`;
      handleError(error, title, dispatch);
    }
  };
};

export const fetchOrder = id => {
  return async (dispatch, getState) => {
    try {
      // const userId = cookie.load('user');
      const response = await axios.get(`/api/order/${id}`);
      const order = calculateOrderTotal(response.data.order);

      dispatch({
        type: FETCH_ORDER,
        payload: order
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
      const cartId = getState().cart.cartId;
      const userId = cookie.load('user');

      const response = await axios.post(`/api/order/add`, {
        cartId,
        userId
      });

      // dispatch(fetchOrder(response.data.order));

      dispatch(push(`/order/success/${response.data.order._id}`));

      // dispatch(push(`/order/success/5ead01d7be27e43c20738aa2`));

      dispatch(clearCart());
      dispatch(getCartId());
    } catch (error) {
      const title = `Please try again!`;
      handleError(error, title, dispatch);
    }
  };
};

export const placeOrder = () => {
  return (dispatch, getState) => {
    dispatch(toggleCart());
    dispatch(addOrder());
  };
};

const calculateOrdersTotal = orders => {
  orders.map(order => {
    order.total = 0;
    order.products.map(item => {
      order.total += item.quantity * item.product.price;
    });
  });

  return orders;
};

const calculateOrderTotal = order => {
  order.total = 0;

  order.products.map(item => {
    item.total = 0;
    order.total += item.quantity * item.product.price;
    item.total += item.quantity * item.product.price;
  });

  return order;
};

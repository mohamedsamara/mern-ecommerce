/*
 *
 * Order actions
 *
 */

import { push } from 'connected-react-router';
import axios from 'axios';
import cookie from 'react-cookies';

import {
  FETCH_ORDERS,
  FETCH_ORDER,
  TOGGLE_ADD_ORDER,
  SET_ORDERS_LOADING,
  CLEAR_ORDERS
} from './constants';
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
      dispatch({ type: SET_ORDERS_LOADING, payload: true });

      const response = await axios.get(`/api/order/list`);

      if (response.data.orders) {
        dispatch({
          type: FETCH_ORDERS,
          payload: response.data.orders
        });
      }
    } catch (error) {
      dispatch(clearOrders());
      handleError(error, dispatch);
    } finally {
      dispatch({ type: SET_ORDERS_LOADING, payload: false });
    }
  };
};

export const fetchOrder = id => {
  return async (dispatch, getState) => {
    try {
      dispatch({ type: SET_ORDERS_LOADING, payload: true });

      const response = await axios.get(`/api/order/${id}`);

      dispatch({
        type: FETCH_ORDER,
        payload: response.data.order
      });
    } catch (error) {
      handleError(error, dispatch);
    } finally {
      dispatch({ type: SET_ORDERS_LOADING, payload: false });
    }
  };
};

export const addOrder = () => {
  return async (dispatch, getState) => {
    try {
      const cartId = cookie.load('cart_id');
      const total = getState().cart.cartTotal;

      if (cartId) {
        const response = await axios.post(`/api/order/add`, {
          cartId,
          total
        });

        dispatch(push(`/order/success/${response.data.order._id}`));
        dispatch(clearCart());
      }
    } catch (error) {
      handleError(error, dispatch);
    }
  };
};

export const placeOrder = () => {
  return (dispatch, getState) => {
    const token = cookie.load('token');
    const cartItems = getState().cart.cartItems;

    if (token && cartItems.length > 0) {
      Promise.all([dispatch(getCartId())]).then(() => {
        dispatch(addOrder());
      });
    }

    dispatch(toggleCart());
  };
};

export const clearOrders = () => {
  return {
    type: CLEAR_ORDERS
  };
};

// const calculateOrdersTotal = orders => {
//   orders.map(order => {
//     order.total = 0;
//     order.products.map(item => {
//       order.total += item.quantity * item.product.price;
//     });
//   });

//   return orders;
// };

// const calculateOrderTotal = order => {
//   // order.total = 0;

//   order.products.map(item => {
//     item.total = 0;
//     // order.total += item.quantity * item.product.price;
//     item.total += item.quantity * item.product.price;
//   });

//   return order;
// };

// const calculateOrderItemsTotal = order => {
//   order.products.map(item => {
//     item.total = 0;
//     item.total += item.quantity * item.product.price;
//   });

//   return order;
// };

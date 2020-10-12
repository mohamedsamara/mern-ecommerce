/*
 *
 * Order actions
 *
 */

import { push } from 'connected-react-router';
import axios from 'axios';
import { success } from 'react-notification-system-redux';

import {
  FETCH_ORDERS,
  FETCH_ORDER,
  UPDATE_ORDER,
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

export const updateOrder = value => {
  return {
    type: UPDATE_ORDER,
    payload: value
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

export const cancelOrder = () => {
  return async (dispatch, getState) => {
    try {
      const order = getState().order.order;

      await axios.delete(`/api/order/cancel/${order._id}`);

      dispatch(push(`/dashboard/orders`));
    } catch (error) {
      handleError(error, dispatch);
    }
  };
};

export const cancelOrderItem = itemId => {
  return async (dispatch, getState) => {
    try {
      const order = getState().order.order;

      const response = await axios.put(`/api/order/cancel/item/${itemId}`, {
        orderId: order._id,
        cartId: order.cartId
      });

      if (response.data.orderCancelled) {
        dispatch(push(`/dashboard/orders`));
      }

      const successfulOptions = {
        title: `${response.data.message}`,
        position: 'tr',
        autoDismiss: 1
      };

      dispatch(success(successfulOptions));
      dispatch(updateOrder({ itemId, status: 'Cancelled' }, 'cencelled'));
    } catch (error) {
      handleError(error, dispatch);
    }
  };
};

export const addOrder = () => {
  return async (dispatch, getState) => {
    try {
      const cartId = localStorage.getItem('cart_id');
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
    const token = localStorage.getItem('token');

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

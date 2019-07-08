/*
 *
 * Cart actions
 *
 */

import { push } from 'connected-react-router';
import { success } from 'react-notification-system-redux';
import axios from 'axios';
import cookie from 'react-cookies';

import {
  FETCH_CART,
  ADD_TO_CART,
  REMOVE_FROM_CART,
  FETCH_IN_CART
} from './constants';
import handleError from '../../utils/error';
import { toggleCart } from '../Navigation/actions';

export const fetchCart = () => {
  return async (dispatch, getState) => {
    try {
      const userId = cookie.load('user');

      const response = await axios.post('/api/cart/list');

      // cookie.save('cart', response.data.cart._id, { path: '/' });
      // cookie.save('user', response.data.user.id, { path: '/' });

      dispatch({ type: FETCH_CART });
    } catch (error) {
      const title = `Please try again!`;
      handleError(error, title, dispatch);
    }
  };
};

export const addToCart = () => {
  return async (dispatch, getState) => {
    try {
      const userId = cookie.load('user');

      const response = await axios.post('/api/cart/add');

      dispatch({ type: FETCH_CART });
    } catch (error) {
      const title = `Please try again!`;
      handleError(error, title, dispatch);
    }
  };
};

export const deleteFromCart = id => {
  return async (dispatch, getState) => {
    try {
      const userId = cookie.load('user');

      const response = await axios.delete(`/api/cart/delete/${id}`);

      dispatch({ type: FETCH_CART });
    } catch (error) {
      const title = `Please try again!`;
      handleError(error, title, dispatch);
    }
  };
};

// Handle Add To Cart
export const handleAddToCart = product => {
  return (dispatch, getState) => {
    dispatch(toggleCart());

    dispatch({
      type: ADD_TO_CART,
      payload: product
    });
  };
};

// Handle Remove From Cart
export const handleRemoveFromCart = product => {
  return (dispatch, getState) => {
    dispatch(toggleCart());
    dispatch({
      type: REMOVE_FROM_CART,
      payload: product
    });
  };
};

export const handleFetchCart = items => {
  return (dispatch, getState) => {
    dispatch({
      type: FETCH_CART,
      payload: items
    });
  };
};

export const handleFetchInCart = items => {
  return (dispatch, getState) => {
    dispatch({
      type: FETCH_IN_CART,
      payload: items
    });
  };
};

// Proceed to checkout use case, redirect to dashaboard
export const handleCheckout = () => {
  return (dispatch, getState) => {
    const token = cookie.load('token');
    console.log('ddd');

    // notify the user to login in, only if they are not logged in.
    if (!token) {
      const successfulOptions = {
        title: `Please Login to proceed to checkout`,
        position: 'tr',
        autoDismiss: 1
      };

      dispatch(success(successfulOptions));
    }

    dispatch(push('/dashboard'));
    dispatch(toggleCart());
  };
};

// Continue shopping use case
export const handleShopping = () => {
  return (dispatch, getState) => {
    dispatch(push('/shop'));
    dispatch(toggleCart());
  };
};

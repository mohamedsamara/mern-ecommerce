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
  FETCH_IN_CART,
  HANDLE_CART_TOTAL
} from './constants';
import { toggleCart } from '../Navigation/actions';
import { addOrder } from '../Order/actions';

export const checkCart = () => {
  const cart = cookie.load('cart');
  const InCart = cookie.load('InCart');
  const cartTotal = cookie.load('cartTotal');

  return (dispatch, getState) => {
    if (cart != undefined || InCart != undefined) {
      dispatch(handleFetchCart(cart));
      dispatch(handleFetchInCart(InCart));
      dispatch(handleCartTotal(cartTotal));
    }
  };
};

// Handle Add To Cart
export const handleAddToCart = product => {
  return (dispatch, getState) => {
    product.quantity = getState().product.productFormData.quantity;

    dispatch({
      type: ADD_TO_CART,
      payload: product
    });
    dispatch(calculateCartTotal());
    dispatch(toggleCart());
  };
};

// Handle Remove From Cart
export const handleRemoveFromCart = product => {
  return (dispatch, getState) => {
    dispatch({
      type: REMOVE_FROM_CART,
      payload: product
    });
    dispatch(calculateCartTotal());
  };
};

// fetch cart items from cookie
export const handleFetchCart = items => {
  return (dispatch, getState) => {
    dispatch({
      type: FETCH_CART,
      payload: items
    });
  };
};

// fetch in cart items from cookie
export const handleFetchInCart = items => {
  return (dispatch, getState) => {
    dispatch({
      type: FETCH_IN_CART,
      payload: items
    });
  };
};

// fetch in cart total from cookie
export const handleCartTotal = total => {
  return (dispatch, getState) => {
    dispatch({
      type: HANDLE_CART_TOTAL,
      payload: total
    });
  };
};

export const calculateCartTotal = () => {
  return (dispatch, getState) => {
    const cartItems = getState().cart.cartItems;

    let total = 0;

    cartItems.map(item => {
      total += item.price * item.quantity;
    });

    dispatch({
      type: HANDLE_CART_TOTAL,
      payload: total
    });
  };
};

export const handleCheckout = () => {
  return (dispatch, getState) => {
    const successfulOptions = {
      title: `Please Login to proceed to checkout`,
      position: 'tr',
      autoDismiss: 1
    };

    dispatch(toggleCart());
    dispatch(push('/login'));
    dispatch(success(successfulOptions));
  };
};

export const placeOrder = () => {
  return (dispatch, getState) => {
    dispatch(toggleCart());
    dispatch(push('/dashboard/orders'));
    dispatch(addOrder());
  };
};

// Continue shopping use case
export const handleShopping = () => {
  return (dispatch, getState) => {
    dispatch(push('/shop'));
    dispatch(toggleCart());
  };
};

// This function handles the flow of what happen when the user log in or signup to make an order
// Current Flow: toggle the cart.
export const handleCartStatus = () => {
  const token = cookie.load('token');

  return (dispatch, getState) => {
    if (token) {
      dispatch(toggleCart());
    }
  };
};

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
  HANDLE_CART,
  ADD_TO_CART,
  REMOVE_FROM_CART,
  HANDLE_CART_TOTAL,
  SET_CART_ID,
  CLEAR_CART
} from './constants';
import handleError from '../../utils/error';
import { toggleCart } from '../Navigation/actions';

// Handle Add To Cart
export const handleAddToCart = product => {
  return (dispatch, getState) => {
    product.quantity = getState().product.productShopData.quantity;
    product.totalPrice = product.quantity * product.price;

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
    // dispatch(toggleCart());
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

// set cart store from cookie
export const handleCart = () => {
  const cart = {
    cartItems: cookie.load('cart_items'),
    itemsInCart: cookie.load('items_in_cart'),
    cartTotal: cookie.load('cart_total'),
    cartId: cookie.load('cart_id')
  };

  return (dispatch, getState) => {
    if (cart.cartItems != undefined || cart.itemsInCart != undefined) {
      dispatch({
        type: HANDLE_CART,
        payload: cart
      });
    }
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

// Continue shopping use case
export const handleShopping = () => {
  return (dispatch, getState) => {
    dispatch(push('/shop'));
    dispatch(toggleCart());
  };
};

// create cart id api
export const getCartId = () => {
  return async (dispatch, getState) => {
    try {
      const cartId = cookie.load('cart_id');
      const cartItems = getState().cart.cartItems;
      const products = getCartItems(cartItems);

      // create cart id if there is no one
      if (!cartId) {
        const response = await axios.post(`/api/cart/add`, { products });

        dispatch(setCartId(response.data.cartId));
      }
    } catch (error) {
      handleError(error, dispatch);
    }
  };
};

export const setCartId = cartId => {
  return (dispatch, getState) => {
    dispatch({
      type: SET_CART_ID,
      payload: cartId
    });
  };
};

export const clearCart = () => {
  return (dispatch, getState) => {
    cookie.remove('cart_items', { path: '/' });
    cookie.remove('items_in_cart', { path: '/' });
    cookie.remove('cart_total', { path: '/' });
    cookie.remove('cart_id', { path: '/' });

    dispatch({
      type: CLEAR_CART
    });
  };
};

const getCartItems = cartItems => {
  const newCartItems = [];
  cartItems.map(item => {
    const newItem = {};
    newItem.quantity = item.quantity;
    newItem.totalPrice = item.totalPrice;
    newItem.product = item._id;
    newCartItems.push(newItem);
  });

  return newCartItems;
};

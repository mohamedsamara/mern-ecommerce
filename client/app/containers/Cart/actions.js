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
import handleError from '../../utils/error';
import { toggleCart } from '../Navigation/actions';

export const checkCart = () => {
  const token = cookie.load('token');
  const cart = cookie.load('cart');
  const InCart = cookie.load('InCart');
  const cartTotal = cookie.load('cartTotal');

  return (dispatch, getState) => {
    if (token) {
      dispatch(fetchCart());
      dispatch(handleFetchInCart(InCart));
    } else {
      if (cart != undefined || InCart != undefined) {
        dispatch(handleFetchCart(cart));
        dispatch(handleFetchInCart(InCart));
        dispatch(handleCartTotal(cartTotal));
      }
    }
  };
};

// fetch art items api
export const fetchCart = () => {
  return async (dispatch, getState) => {
    try {
      const response = await axios.get('/api/cart/list');

      dispatch(handleFetchedCartItems(response.data.items));
    } catch (error) {
      const title = `Please try again!`;
      handleError(error, title, dispatch);
    }
  };
};

export const addToCart = product => {
  return async (dispatch, getState) => {
    try {
      const user = cookie.load('user');
      product.quantity = getState().product.productFormData.quantity;

      const cartItem = {
        user,
        product
      };

      const response = await axios.post('/api/cart/add', cartItem);

      const newItem = {
        cartId: response.data.cart._id,
        quantity: response.data.cart.quantity,
        ...response.data.cart.item
      };

      dispatch({
        type: ADD_TO_CART,
        payload: newItem
      });
      dispatch(calculateCartTotal());
    } catch (error) {
      const title = `Please try again!`;
      handleError(error, title, dispatch);
    }
  };
};

export const deleteFromCart = product => {
  return async (dispatch, getState) => {
    try {
      const response = await axios.delete(`/api/cart/delete/${product._id}`);

      dispatch({
        type: REMOVE_FROM_CART,
        payload: product
      });
      dispatch(calculateCartTotal());
    } catch (error) {
      const title = `Please try again!`;
      handleError(error, title, dispatch);
    }
  };
};

// Handle Add To Cart
export const handleAddToCart = product => {
  return (dispatch, getState) => {
    const token = cookie.load('token');
    product.quantity = getState().product.productFormData.quantity;

    if (token) {
      dispatch(addToCart(product));
    } else {
      dispatch({
        type: ADD_TO_CART,
        payload: product
      });
      dispatch(calculateCartTotal());
    }

    dispatch(toggleCart());
  };
};

// Handle Remove From Cart
export const handleRemoveFromCart = product => {
  return (dispatch, getState) => {
    const token = cookie.load('token');

    if (token) {
      dispatch(deleteFromCart(product));
    } else {
      dispatch({
        type: REMOVE_FROM_CART,
        payload: product
      });
      dispatch(calculateCartTotal());
    }

    dispatch(toggleCart());
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

// Proceed to checkout use case, redirect to dashaboard
export const handleCheckout = () => {
  return (dispatch, getState) => {
    const token = cookie.load('token');

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

export const placeOrder = () => {
  return (dispatch, getState) => {
    const successfulOptions = {
      title: `Your order has been placed`,
      position: 'tr',
      autoDismiss: 1
    };

    dispatch(success(successfulOptions));
    dispatch(push('/dashboard/orders'));
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

export const handleFetchedCartItems = cart => {
  return (dispatch, getState) => {
    let items = [];

    cart.map(item => {
      let newItem = {
        cartId: item._id,
        quantity: item.quantity,
        ...item.item
      };

      items.push(newItem);
    });

    dispatch({
      type: FETCH_CART,
      payload: items
    });

    dispatch(calculateCartTotal());
  };
};

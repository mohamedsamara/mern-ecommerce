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
    // const token = cookie.load('token');
    product.quantity = getState().product.productShopData.quantity;

    dispatch({
      type: ADD_TO_CART,
      payload: product
    });
    dispatch(calculateCartTotal());
    // dispatch(addToCart(product));
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
    // dispatch(removeFromCart(product));
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

// Add to cart API
// export const addToCart = item => {
//   return async (dispatch, getState) => {
//     try {
//       const token = cookie.load('token');
//       const cartId = cookie.load('cart_id');

//       const product = {
//         product: item._id,
//         quantity: item.quantity
//       };

//       if (token) {
//         const response = await axios.post(`/api/cart/add/${cartId}`, {
//           product
//         });
//       }
//     } catch (error) {
//       const title = `Please try again!`;
//       handleError(error, title, dispatch);
//     }
//   };
// };

// Remove from cart API
// export const removeFromCart = item => {
//   return async (dispatch, getState) => {
//     try {
//       const token = cookie.load('token');
//       const cartId = cookie.load('cart_id');
//       const productId = item._id;

//       if (token) {
//         const response = await axios.delete(
//           `/api/cart/delete/${cartId}/${productId}`
//         );
//       }
//     } catch (error) {
//       const title = `Please try again!`;
//       handleError(error, title, dispatch);
//     }
//   };
// };

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

export const handleCartStatus = () => {
  return (dispatch, getState) => {
    // const token = cookie.load('token');
    // const cartItems = getState().cart.cartItems;
    // if (token) {
    //   Promise.all([dispatch(getCartId())]).then(() => {
    //     if (cartItems.length > 0) {
    //       dispatch(addCart(cartItems));
    //       dispatch(toggleCart());
    //     }
    //   });
    // }
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

// add the entire cart items api
export const addCart = cartItems => {
  return async (dispatch, getState) => {
    try {
      const cartId = cookie.load('cart_id');
      const products = getCartItems(cartItems);

      const response = await axios.post(`/api/cart/push/${cartId}`, {
        products
      });
    } catch (error) {
      const title = `Please try again!`;
      handleError(error, title, dispatch);
    }
  };
};

// remove the entire cart
// export const removeCart = cartId => {
//   return async (dispatch, getState) => {
//     try {
//       const response = await axios.delete(`/api/cart/delete/${cartId}`);
//     } catch (error) {
//       const title = `Please try again!`;
//       handleError(error, title, dispatch);
//     }
//   };
// };

// create cart id api
export const getCartId = () => {
  return async (dispatch, getState) => {
    try {
      const userId = cookie.load('user');
      const cartId = cookie.load('cart_id');

      // create cart id if there is no one
      if (!cartId) {
        const response = await axios.post(`/api/cart/create`, { userId });

        dispatch(setCartId(response.data.cartId));
      }
    } catch (error) {
      const title = `Please try again!`;
      handleError(error, title, dispatch);
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
    // const token = cookie.load('token');
    // const cartId = cookie.load('cart_id');

    // if (!token && cartId) {
    //   dispatch(removeCart(cartId));
    // }

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
    newItem.product = item._id;
    newCartItems.push(newItem);
  });

  return newCartItems;
};

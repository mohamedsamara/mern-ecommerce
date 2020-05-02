/*
 *
 * Cart reducer
 *
 */

import cookie from 'react-cookies';

import {
  HANDLE_CART,
  ADD_TO_CART,
  REMOVE_FROM_CART,
  HANDLE_CART_TOTAL,
  SET_CART_ID,
  CLEAR_CART
} from './constants';

const initialState = {
  cartItems: [],
  itemsInCart: [],
  cartTotal: 0,
  cartId: ''
};

const cartReducer = (state = initialState, action) => {
  let newState;

  switch (action.type) {
    case ADD_TO_CART:
      newState = {
        ...state,
        cartItems: [...state.cartItems, action.payload],
        itemsInCart: [...state.itemsInCart, action.payload._id]
      };
      cookie.save('cart_items', newState.cartItems, { path: '/' });
      cookie.save('items_in_cart', newState.itemsInCart, { path: '/' });
      return newState;
    case REMOVE_FROM_CART:
      let itemIndex = state.cartItems.findIndex(
        x => x._id == action.payload._id
      );
      newState = {
        ...state,
        cartItems: [
          ...state.cartItems.slice(0, itemIndex),
          ...state.cartItems.slice(itemIndex + 1)
        ],
        itemsInCart: [
          ...state.itemsInCart.slice(0, itemIndex),
          ...state.itemsInCart.slice(itemIndex + 1)
        ]
      };
      cookie.save('cart_items', newState.cartItems, { path: '/' });
      cookie.save('items_in_cart', newState.itemsInCart, { path: '/' });
      return newState;
    case HANDLE_CART_TOTAL:
      newState = {
        ...state,
        cartTotal: action.payload
      };
      cookie.save('cart_total', newState.cartTotal, { path: '/' });
      return newState;
    case HANDLE_CART:
      newState = {
        ...state,
        cartItems: action.payload.cartItems,
        itemsInCart: action.payload.itemsInCart,
        cartTotal: action.payload.cartTotal,
        cartId: action.payload.cartId
      };
      return newState;
    case SET_CART_ID:
      newState = {
        ...state,
        cartId: action.payload
      };
      cookie.save('cart_id', newState.cartId, { path: '/' });
      return newState;
    case CLEAR_CART:
      newState = {
        ...state,
        cartItems: [],
        itemsInCart: [],
        cartTotal: 0,
        cartId: ''
      };
      return newState;

    default:
      return state;
  }
};

export default cartReducer;

/*
 *
 * Cart reducer
 *
 */

import { FETCH_CART } from './constants';

const initialState = {
  cartItems: []
};

const cartReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_CART:
      return {
        ...state,
        cartItems: action.payload
      };
    default:
      return state;
  }
};

export default cartReducer;

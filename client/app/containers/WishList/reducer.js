/*
 *
 * WishList reducer
 *
 */

import { WINDOW_DIMENSION, WISHLIST_CHANGE } from './constants';

const initialState = {
  wishlistForm: {}
};

const wishListReducer = (state = initialState, action) => {
  switch (action.type) {
    case WISHLIST_CHANGE:
      return {
        ...state,
        wishlistForm: {
          ...state.wishlistForm,
          ...action.payload
        }
      };
    default:
      return state;
  }
};

export default wishListReducer;

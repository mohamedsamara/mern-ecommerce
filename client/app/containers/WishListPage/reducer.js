/*
 *
 * Wishlist reducer
 *
 */

import {
  WINDOW_DIMENSION,
  WISHLIST_CHANGE
} from './constants';

const initialState = {
  wishlistData:{},
  isLiked:false
};

const wishListReducer = (state = initialState, action) => {
  switch (action.type) {
    case WISHLIST_CHANGE:
      return {
        ...state,
        wishlistData: {
          ...state.wishlistData,
          ...action.payload
        }
      };
    default:
      return state;
  }
};

export default wishListReducer;

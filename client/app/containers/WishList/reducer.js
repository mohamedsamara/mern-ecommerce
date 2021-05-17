/*
 *
 * WishList reducer
 *
 */

import {
  FETCH_WISHLIST,
  SET_WISHLIST_LOADING,
  WISHLIST_CHANGE
} from './constants';

const initialState = {
  wishlist: [],
  isLoading: false,
  wishlistForm: {}
};

const wishListReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_WISHLIST:
      return {
        ...state,
        wishlist: action.payload
      };
    case SET_WISHLIST_LOADING:
      return {
        ...state,
        isLoading: action.payload
      };
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

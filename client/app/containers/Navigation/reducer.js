/*
 *
 * Navigation reducer
 *
 */

import { TOGGLE_MENU, TOGGLE_CART, TOGGLE_BRAND, SUGGESTIONS_FETCH_REQUEST, SUGGESTIONS_CLEAR_REQUEST, ONCHANGE_SUGGESTION } from './constants';

const initialState = {
  isMenuOpen: false,
  isCartOpen: false,
  isBrandOpen: false,
  value: '',
  suggestions: []
};

const navigationReducer = (state = initialState, action) => {
  switch (action.type) {
    case TOGGLE_MENU:
      return {
        ...state,
        isMenuOpen: !state.isMenuOpen,
        isCartOpen: false
      };
    case TOGGLE_CART:
      return {
        ...state,
        isCartOpen: !state.isCartOpen,
        isMenuOpen: false
      };
    case TOGGLE_BRAND:
      return {
        ...state,
        isBrandOpen: !state.isBrandOpen
      };
    case ONCHANGE_SUGGESTION:
      return {
        ...state,
        ...action.payload
      };
    case SUGGESTIONS_FETCH_REQUEST:
      return {
        ...state,
        ...action.payload
      };
    case SUGGESTIONS_CLEAR_REQUEST:
      return {
        ...state,
        ...action.payload
      };
    default:
      return state;
  }
};

export default navigationReducer;

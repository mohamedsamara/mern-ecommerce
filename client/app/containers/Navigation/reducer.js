/*
 *
 * Navigation reducer
 *
 */

import { TOGGLE_MENU, TOGGLE_CART, TOGGLE_BRAND } from './constants';

const initialState = {
  isMenuOpen: false,
  isCartOpen: false,
  isBrandOpen: false
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
    default:
      return state;
  }
};

export default navigationReducer;

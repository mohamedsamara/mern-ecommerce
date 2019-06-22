/*
 *
 * Navigation reducer
 *
 */

import { TOGGLE_MENU, TOGGLE_CART } from './constants';

const initialState = {
  isMenuOpen: false,
  isCartOpen: false
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
    default:
      return state;
  }
};

export default navigationReducer;

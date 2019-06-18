/*
 *
 * Navigation reducer
 *
 */

import { TOGGLE_MENU } from './constants';

const initialState = {
  isMenuOpen: false
};

const navigationReducer = (state = initialState, action) => {
  let newState;
  switch (action.type) {
    case TOGGLE_MENU:
      newState = {
        ...state,
        isMenuOpen: !state.isMenuOpen
      };
      return newState;
    default:
      return state;
  }
};

export default navigationReducer;

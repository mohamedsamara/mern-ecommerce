/*
 *
 * Customer reducer
 *
 */

import { TOGGLE_CUSTOMER_MENU } from './constants';

const initialState = {
  isMenuOpen: false,
  customerLinks: [
    { to: '', name: 'account details' },
    { to: '/orders', name: 'manage orders' }
  ]
};

const customerReducer = (state = initialState, action) => {
  switch (action.type) {
    case TOGGLE_CUSTOMER_MENU:
      return { ...state, isMenuOpen: !state.isMenuOpen };
    default:
      return state;
  }
};

export default customerReducer;

/*
 *
 * Customer reducer
 *
 */

import { TOGGLE_CUSTOMER_MENU } from './constants';

const initialState = {
  isMenuOpen: false,
  customerLinks: [
    { to: '', name: 'Account Details' },
    { to: '/security', name: 'Account Security' },
    { to: '/orders', name: 'Manage Orders' }
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

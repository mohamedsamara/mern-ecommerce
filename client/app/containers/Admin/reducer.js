/*
 *
 * Admin reducer
 *
 */

import { TOGGLE_ADMIN_MENU } from './constants';

const initialState = {
  isMenuOpen: false,
  adminLinks: [
    { to: '', name: 'account details' },
    { to: '/products', name: 'manage products' },
    { to: '/categories', name: 'manage categories' },
    { to: '/subscribers', name: 'newsletter subscribers' }
  ]
};

const adminReducer = (state = initialState, action) => {
  switch (action.type) {
    case TOGGLE_ADMIN_MENU:
      return { ...state, isMenuOpen: !state.isMenuOpen };
    default:
      return state;
  }
};

export default adminReducer;

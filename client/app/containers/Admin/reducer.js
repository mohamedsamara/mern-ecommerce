/*
 *
 * Admin reducer
 *
 */

import { TOGGLE_ADMIN_MENU } from './constants';

const initialState = {
  isMenuOpen: false,
  adminLinks: [
    { to: '', name: 'Account Details' },
    { to: '/security', name: 'Account Security' },
    { to: '/products', name: 'Manage Products' },
    { to: '/categories', name: 'Manage Categories' },
    { to: '/brands', name: 'Manage Brands' },
    { to: '/users', name: 'Manage Users' },
    { to: '/merchants', name: 'Manage Merchants' },
    { to: '/orders', name: 'Manage Orders' }
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

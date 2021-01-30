/*
 *
 * Dashboard reducer
 *
 */

import { TOGGLE_DASHBOARD_MENU } from './constants';

const initialState = {
  isMenuOpen: false
};

const dashboardReducer = (state = initialState, action) => {
  switch (action.type) {
    case TOGGLE_DASHBOARD_MENU:
      return {
        ...state,
        isMenuOpen: !state.isMenuOpen
      };
    default:
      return state;
  }
};

export default dashboardReducer;

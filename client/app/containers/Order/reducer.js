/*
 *
 * Order reducer
 *
 */

import { FETCH_ORDERS, TOGGLE_ADD_ORDER } from './constants';

const initialState = {
  orders: [],
  isOrderAddOpen: false
};

const orderReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_ORDERS:
      return {
        ...state,
        orders: action.payload
      };
    case TOGGLE_ADD_ORDER:
      return {
        ...state,
        isOrderAddOpen: !state.isOrderAddOpen
      };
    default:
      return state;
  }
};

export default orderReducer;

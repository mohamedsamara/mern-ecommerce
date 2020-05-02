/*
 *
 * Order reducer
 *
 */

import { FETCH_ORDERS, FETCH_ORDER, TOGGLE_ADD_ORDER } from './constants';

const initialState = {
  orders: [],
  order: {},
  isOrderAddOpen: false
};

const orderReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_ORDERS:
      return {
        ...state,
        orders: action.payload
      };
    case FETCH_ORDER:
      return {
        ...state,
        order: action.payload
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

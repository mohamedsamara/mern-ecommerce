/*
 *
 * Order reducer
 *
 */

import {
  FETCH_ORDERS,
  FETCH_ORDER,
  TOGGLE_ADD_ORDER,
  SET_ORDERS_LOADING,
  CLEAR_ORDERS
} from './constants';

const initialState = {
  orders: [],
  order: {
    _id: '',
    products: [],
    totalTax: 0,
    total: 0
  },
  isLoading: false,
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
    case SET_ORDERS_LOADING:
      return {
        ...state,
        isLoading: action.payload
      };
    case TOGGLE_ADD_ORDER:
      return {
        ...state,
        isOrderAddOpen: !state.isOrderAddOpen
      };
    case CLEAR_ORDERS:
      return {
        ...state,
        orders: []
      };

    default:
      return state;
  }
};

export default orderReducer;

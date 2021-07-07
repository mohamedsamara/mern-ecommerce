/*
 *
 * Order reducer
 *
 */

import {
  FETCH_ORDERS,
  FETCH_ORDER,
  UPDATE_ORDER,
  SET_ORDERS_LOADING,
  CLEAR_ORDERS
} from './constants';

const initialState = {
  orders: [],
  order: {
    _id: '',
    cartId: '',
    products: [],
    totalTax: 0,
    total: 0,
    status: ''
  },
  isLoading: false
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
    case UPDATE_ORDER:
      const itemIndex = state.order.products.findIndex(
        item => item._id === action.payload.itemId
      );

      const newProducts = [...state.order.products];
      newProducts[itemIndex].status = action.payload.status;

      return {
        ...state,
        order: {
          ...state.order,
          products: newProducts
        }
      };
    case SET_ORDERS_LOADING:
      return {
        ...state,
        isLoading: action.payload
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

/*
 *
 * Brand reducer
 *
 */

import { FETCH_BRANDS, BRAND_CHANGE, RESET_BRAND } from './constants';

const initialState = {
  brands: [],
  brandFormData: {
    name: '',
    description: ''
  }
};

const brandReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_BRANDS:
      return {
        ...state,
        brands: action.payload
      };
    case BRAND_CHANGE:
      return {
        ...state,
        brandFormData: { ...state.brandFormData, ...action.payload }
      };
    case RESET_BRAND:
      return {
        ...state,
        brandFormData: {
          name: '',
          description: ''
        }
      };
    default:
      return state;
  }
};

export default brandReducer;

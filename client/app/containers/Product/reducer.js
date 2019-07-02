/*
 *
 * Product reducer
 *
 */

import { FETCH_PRODUCTS, PRODUCT_CHANGE, RESET_PRODUCT } from './constants';

const initialState = {
  products: [],
  productFormData: {
    sku: '',
    name: '',
    description: '',
    quantity: '0',
    price: '0'
  }
};

const productReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_PRODUCTS:
      return {
        ...state,
        products: action.payload.profile
      };
    case PRODUCT_CHANGE:
      return {
        ...state,
        productFormData: { ...state.productFormData, ...action.payload }
      };
    case RESET_PRODUCT:
      return {
        ...state,
        productFormData: {
          sku: '',
          name: '',
          description: '',
          quantity: '0',
          price: '0'
        }
      };
    default:
      return state;
  }
};

export default productReducer;

/*
 *
 * Product reducer
 *
 */

import {
  FETCH_PRODUCTS,
  PRODUCT_CHANGE,
  RESET_PRODUCT,
  TOGGLE_ADD_PRODUCT,
  ADD_PRODUCT
} from './constants';

const initialState = {
  products: [],
  isProductAddOpen: false,
  productFormData: {
    sku: '',
    name: '',
    description: '',
    quantity: '0',
    price: '0'
  },
  columns: [
    {
      hidden: true,
      dataField: '_id',
      text: ''
    },
    {
      dataField: 'sku',
      text: 'Product Sku'
    },
    {
      dataField: 'name',
      text: 'Product Name'
    },
    {
      dataField: 'description',
      text: 'Product Description'
    },
    {
      dataField: 'quantity',
      text: 'Product Quantity'
    },
    {
      dataField: 'price',
      text: 'Product Price'
    }
  ]
};

const productReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_PRODUCTS:
      return {
        ...state,
        products: action.payload
      };
    case ADD_PRODUCT:
      return {
        ...state,
        products: [...state.products, action.payload]
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
    case TOGGLE_ADD_PRODUCT:
      return { ...state, isProductAddOpen: !state.isProductAddOpen };
    default:
      return state;
  }
};

export default productReducer;

/*
 *
 * Product reducer
 *
 */

import {
  FETCH_PRODUCTS,
  FETCH_PRODUCT,
  PRODUCT_CHANGE,
  RESET_PRODUCT,
  TOGGLE_ADD_PRODUCT,
  ADD_PRODUCT,
  REMOVE_PRODUCT,
  PRODUCT_SELECT,
  FETCH_PRODUCTS_SELECT
} from './constants';

const initialState = {
  products: [],
  product: {},
  productsSelect: [],
  selectedProducts: [],
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
      text: 'Product Name',
      sort: true
    },
    {
      dataField: 'description',
      text: 'Product Description',
      classes: 'desc-column'
    },
    {
      dataField: 'quantity',
      text: 'Product Quantity',
      sort: true
    },
    {
      dataField: 'price',
      text: 'Product Price',
      sort: true
    },
    {
      dataField: 'brand.name',
      text: 'Product Brand',
      sort: true
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
    case FETCH_PRODUCT:
      return {
        ...state,
        product: action.payload
      };
    case FETCH_PRODUCTS_SELECT:
      return { ...state, productsSelect: action.payload };
    case ADD_PRODUCT:
      return {
        ...state,
        products: [...state.products, action.payload]
      };
    case REMOVE_PRODUCT:
      return {
        ...state,
        products: [
          ...state.products.slice(0, action.payload),
          ...state.products.slice(action.payload + 1)
        ]
      };
    case PRODUCT_CHANGE:
      return {
        ...state,
        productFormData: { ...state.productFormData, ...action.payload }
      };
    case PRODUCT_SELECT:
      return {
        ...state,
        selectedProducts: action.payload
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
        },
        selectedProducts: []
      };
    case TOGGLE_ADD_PRODUCT:
      return { ...state, isProductAddOpen: !state.isProductAddOpen };
    default:
      return state;
  }
};

export default productReducer;

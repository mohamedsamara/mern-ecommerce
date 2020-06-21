/*
 *
 * Product reducer
 *
 */

import {
  FETCH_PRODUCTS,
  FETCH_PRODUCT,
  PRODUCT_CHANGE,
  PRODUCT_SHOP_CHANGE,
  SET_PRODUCT_FORM_ERRORS,
  SET_PRODUCT_SHOP_FORM_ERRORS,
  RESET_PRODUCT,
  RESET_PRODUCT_SHOP,
  TOGGLE_ADD_PRODUCT,
  ADD_PRODUCT,
  REMOVE_PRODUCT,
  PRODUCT_SELECT,
  FETCH_PRODUCTS_SELECT,
  SET_PRODUCTS_LOADING
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
    quantity: 1,
    price: 1,
    taxable: 0
  },
  isLoading: false,
  productShopData: {
    quantity: 1
  },
  taxableSelect: [
    { value: 1, label: 'Yes' },
    { value: 0, label: 'No' }
  ],
  formErrors: {},
  shopFormErrors: {},
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
        product: action.payload,
        productShopData: {
          quantity: 1
        }
      };
    case SET_PRODUCTS_LOADING:
      return {
        ...state,
        isLoading: action.payload
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
        productFormData: {
          ...state.productFormData,
          ...action.payload
        }
      };
    case PRODUCT_SHOP_CHANGE:
      return {
        ...state,
        productShopData: {
          ...state.productShopData,
          ...action.payload
        }
      };
    case PRODUCT_SELECT:
      return {
        ...state,
        selectedProducts: action.payload
      };
    case SET_PRODUCT_FORM_ERRORS:
      return {
        ...state,
        formErrors: action.payload
      };
    case SET_PRODUCT_SHOP_FORM_ERRORS:
      return {
        ...state,
        shopFormErrors: action.payload
      };
    case RESET_PRODUCT:
      return {
        ...state,
        productFormData: {
          sku: '',
          name: '',
          description: '',
          quantity: 1,
          price: 0
        },
        formErrors: {},
        selectedProducts: []
      };
    case RESET_PRODUCT_SHOP:
      return {
        ...state,
        productShopData: {
          quantity: 1
        },
        shopFormErrors: {}
      };
    case TOGGLE_ADD_PRODUCT:
      return { ...state, isProductAddOpen: !state.isProductAddOpen };
    default:
      return state;
  }
};

export default productReducer;

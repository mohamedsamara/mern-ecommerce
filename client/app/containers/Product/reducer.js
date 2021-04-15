/*
 *
 * Product reducer
 *
 */

import {
  FETCH_PRODUCTS,
  FETCH_STORE_PRODUCTS,
  FETCH_PRODUCT,
  FETCH_STORE_PRODUCT,
  PRODUCT_CHANGE,
  PRODUCT_EDIT_CHANGE,
  PRODUCT_SHOP_CHANGE,
  SET_PRODUCT_FORM_ERRORS,
  SET_PRODUCT_FORM_EDIT_ERRORS,
  SET_PRODUCT_SHOP_FORM_ERRORS,
  RESET_PRODUCT,
  RESET_PRODUCT_SHOP,
  ADD_PRODUCT,
  REMOVE_PRODUCT,
  PRODUCT_SELECT,
  FETCH_PRODUCTS_SELECT,
  SET_PRODUCTS_LOADING,
  ADD_REVIEW,
  FETCH_REVIEWS,
  REVIEW_CHANGE,
  RESET_REVIEW,
  SET_REVIEW_FORM_ERRORS
} from './constants';

const initialState = {
  products: [],
  storeProducts: [],
  product: {
    _id: ''
  },
  storeProduct: {},
  productsSelect: [],
  selectedProducts: [],
  isProductAddOpen: false,
  productFormData: {
    sku: '',
    name: '',
    description: '',
    quantity: 1,
    price: 1,
    taxable: 0,
    image: {},
    isActive: true
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
  editFormErrors: {},
  shopFormErrors: {},
  reviews:[],
  ratingSummary: [],
  totalRating:0,
  totalReview:0,
  reviewFormData:{
    title:'',
    review:'',
    rating:0,
    isRecommended:0
  },
  recommedableSelect: [
    { value: 1, label: 'Yes' },
    { value: 0, label: 'No' }
  ],
  reviewFormErrors:{}
};

const productReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_PRODUCTS:
      return {
        ...state,
        products: action.payload
      };
    case FETCH_STORE_PRODUCTS:
      return {
        ...state,
        storeProducts: action.payload
      };
    case FETCH_PRODUCT:
      return {
        ...state,
        product: action.payload,
        editFormErrors: {}
      };
    case FETCH_STORE_PRODUCT:
      return {
        ...state,
        storeProduct: action.payload,
        productShopData: {
          quantity: 1
        },
        shopFormErrors: {}
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
      const index = state.products.findIndex(b => b._id === action.payload);
      return {
        ...state,
        products: [
          ...state.products.slice(0, index),
          ...state.products.slice(index + 1)
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
    case PRODUCT_EDIT_CHANGE:
      return {
        ...state,
        product: {
          ...state.product,
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
    case SET_PRODUCT_FORM_EDIT_ERRORS:
      return {
        ...state,
        editFormErrors: action.payload
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
          price: 0,
          image: {},
          isActive: true
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
    case FETCH_REVIEWS:
      return {
        ...state,
        reviews:action.payload.reviews,
        ratingSummary:action.payload.ratingSummary,
        totalReview:action.payload.totalReview,
        totalRating:action.payload.totalRating,
      };
    case ADD_REVIEW:
      return {
        ...state,
        reviews: [...state.reviews, action.payload]
      };
    case REVIEW_CHANGE:
      return {
        ...state,
        reviewFormData: {
          ...state.reviewFormData,
          ...action.payload
        }
      };
    case RESET_REVIEW:
      return {
        ...state,
        reviewFormData:{
          title:'',
          review:'',
          rating:0,
          isRecommended:0
        },
        reviewFormErrors: {}
      };
    case SET_REVIEW_FORM_ERRORS:
      return {
        ...state,
        reviewFormErrors: action.payload
      };
    default:
      return state;
  }
};

export default productReducer;

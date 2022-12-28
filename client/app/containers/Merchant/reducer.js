/*
 *
 * Merchant reducer
 *
 */

import {
  FETCH_MERCHANTS,
  REMOVE_MERCHANT,
  SET_ADVANCED_FILTERS,
  FETCH_SEARCHED_MERCHANTS,
  MERCHANT_CHANGE,
  SET_MERCHANT_FORM_ERRORS,
  SET_MERCHANTS_LOADING,
  SET_MERCHANTS_SUBMITTING,
  RESET_MERCHANT,
  SIGNUP_CHANGE,
  SET_SIGNUP_FORM_ERRORS,
  SIGNUP_RESET
} from './constants';

const initialState = {
  merchants: [],
  searchedMerchants: [],
  advancedFilters: {
    totalPages: 1,
    currentPage: 1,
    count: 0
  },
  merchantFormData: {
    name: '',
    email: '',
    phoneNumber: '',
    brandName: '',
    business: ''
  },
  formErrors: {},
  signupFormData: {
    email: '',
    firstName: '',
    lastName: '',
    password: ''
  },
  signupFormErrors: {},
  isLoading: false,
  isSubmitting: false
};

const merchantReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_MERCHANTS:
      return {
        ...state,
        merchants: action.payload
      };
    case FETCH_SEARCHED_MERCHANTS:
      return {
        ...state,
        searchedMerchants: action.payload
      };
    case REMOVE_MERCHANT:
      const index = state.merchants.findIndex(b => b._id === action.payload);
      return {
        ...state,
        merchants: [
          ...state.merchants.slice(0, index),
          ...state.merchants.slice(index + 1)
        ]
      };
    case SET_ADVANCED_FILTERS:
      return {
        ...state,
        advancedFilters: {
          ...state.advancedFilters,
          ...action.payload
        }
      };
    case MERCHANT_CHANGE:
      return {
        ...state,
        merchantFormData: {
          ...state.merchantFormData,
          ...action.payload
        }
      };
    case SET_MERCHANT_FORM_ERRORS:
      return {
        ...state,
        formErrors: action.payload
      };
    case SET_MERCHANTS_LOADING:
      return {
        ...state,
        isLoading: action.payload
      };
    case SET_MERCHANTS_SUBMITTING:
      return {
        ...state,
        isSubmitting: action.payload
      };
    case RESET_MERCHANT:
      return {
        ...state,
        merchantFormData: {
          name: '',
          email: '',
          phoneNumber: '',
          brandName: '',
          business: ''
        },
        formErrors: {}
      };
    case SIGNUP_CHANGE:
      return {
        ...state,
        signupFormData: { ...state.signupFormData, ...action.payload }
      };
    case SET_SIGNUP_FORM_ERRORS:
      return {
        ...state,
        signupFormErrors: action.payload
      };
    case SIGNUP_RESET:
      return {
        ...state,
        signupFormData: {
          email: '',
          firstName: '',
          lastName: '',
          password: ''
        }
      };

    default:
      return state;
  }
};

export default merchantReducer;

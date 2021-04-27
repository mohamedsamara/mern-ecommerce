/*
 *
 * Merchant reducer
 *
 */

import {
  FETCH_MERCHANTS,
  REMOVE_MERCHANT,
  SELL_FORM_CHANGE,
  SET_SELL_FORM_ERRORS,
  SELL_FORM_RESET,
  SIGNUP_CHANGE,
  SET_SIGNUP_FORM_ERRORS,
  SET_MERCHANTS_LOADING,
  SET_SELL_SUBMITTING,
  SET_SELL_LOADING,
  SIGNUP_RESET
} from './constants';

const initialState = {
  merchants: [],
  sellFormData: {
    name: '',
    email: '',
    phoneNumber: '',
    brand: '',
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
  isSellSubmitting: false,
  isSellLoading: false
};

const merchantReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_MERCHANTS:
      return {
        ...state,
        merchants: action.payload
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

    case SELL_FORM_CHANGE:
      return {
        ...state,
        sellFormData: { ...state.sellFormData, ...action.payload }
      };
    case SET_SELL_FORM_ERRORS:
      return {
        ...state,
        formErrors: action.payload
      };
    case SELL_FORM_RESET:
      return {
        ...state,
        sellFormData: {
          name: '',
          email: '',
          phoneNumber: '',
          brand: '',
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
    case SET_MERCHANTS_LOADING:
      return {
        ...state,
        isLoading: action.payload
      };
    case SET_SELL_SUBMITTING:
      return {
        ...state,
        isSellSubmitting: action.payload
      };
    case SET_SELL_LOADING:
      return {
        ...state,
        isSellLoading: action.payload
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

/*
 *
 * Login reducer
 *
 */

import {
  LOGIN_CHANGE,
  LOGIN_RESET,
  SET_LOGIN_LOADING,
  SET_LOGIN_FORM_ERRORS,
  SET_LOGIN_SUBMITTING
} from './constants';

const initialState = {
  loginFormData: {
    email: '',
    password: ''
  },
  formErrors: {},
  isSubmitting: false,
  isLoading: false
};

const loginReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_CHANGE:
      return {
        ...state,
        loginFormData: { ...state.loginFormData, ...action.payload }
      };
    case SET_LOGIN_FORM_ERRORS:
      return {
        ...state,
        formErrors: action.payload
      };
    case SET_LOGIN_LOADING:
      return {
        ...state,
        isLoading: action.payload
      };
    case SET_LOGIN_SUBMITTING:
      return {
        ...state,
        isSubmitting: action.payload
      };
    case LOGIN_RESET:
      return {
        ...state,
        loginFormData: {
          email: '',
          password: ''
        },
        formErrors: {},
        isLoading: false
      };
    default:
      return state;
  }
};

export default loginReducer;

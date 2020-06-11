/*
 *
 * ForgotPassword reducer
 *
 */

import {
  FORGOT_PASSWORD_CHANGE,
  FORGOT_PASSWORD_RESET,
  SET_FORGOT_PASSWORD_FORM_ERRORS
} from './constants';

const initialState = {
  forgotFormData: {
    email: ''
  },
  formErrors: {}
};

const forgotPasswordReducer = (state = initialState, action) => {
  switch (action.type) {
    case FORGOT_PASSWORD_CHANGE:
      return {
        ...state,
        forgotFormData: {
          email: action.payload
        }
      };
    case SET_FORGOT_PASSWORD_FORM_ERRORS:
      return {
        ...state,
        formErrors: action.payload
      };
    case FORGOT_PASSWORD_RESET:
      return {
        ...state,
        forgotFormData: {
          email: ''
        }
      };
    default:
      return state;
  }
};

export default forgotPasswordReducer;

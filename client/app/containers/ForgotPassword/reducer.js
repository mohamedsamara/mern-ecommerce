/*
 *
 * ForgotPassword reducer
 *
 */

import { FORGOT_PASSWORD_CHANGE, FORGOT_PASSWORD_SUCCESS } from './constants';

const initialState = {
  forgotFormData: {
    email: ''
  }
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
    case FORGOT_PASSWORD_SUCCESS:
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

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
  let newState;
  switch (action.type) {
    case FORGOT_PASSWORD_CHANGE:
      newState = {
        ...state,
        forgotFormData: {
          email: action.payload
        }
      };
      return newState;
    case FORGOT_PASSWORD_SUCCESS:
      newState = {
        ...state,
        forgotFormData: {
          email: ''
        }
      };
      return newState;
    default:
      return state;
  }
};

export default forgotPasswordReducer;

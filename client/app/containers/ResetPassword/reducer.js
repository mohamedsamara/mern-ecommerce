/*
 *
 * ResetPassword reducer
 *
 */

import { RESET_PASSWORD_CHANGE, RESET_PASSWORD_RESET } from './constants';

const initialState = {
  resetFormData: {
    password: '',
    confirmPassword: ''
  }
};

const resetPasswordReducer = (state = initialState, action) => {
  switch (action.type) {
    case RESET_PASSWORD_CHANGE:
      return {
        ...state,
        resetFormData: { ...state.resetFormData, ...action.payload }
      };
    case RESET_PASSWORD_RESET:
      return {
        ...state,
        resetFormData: {
          password: '',
          confirmPassword: ''
        }
      };
    default:
      return state;
  }
};

export default resetPasswordReducer;

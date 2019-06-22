/*
 *
 * Signup reducer
 *
 */

import { SIGNUP_CHANGE, SIGNUP_RESET, SET_SIGNUP_LOADING } from './constants';

const initialState = {
  signupFormData: {
    email: '',
    firstName: '',
    lastName: '',
    password: ''
  },
  isLoading: false
};

const signupReducer = (state = initialState, action) => {
  switch (action.type) {
    case SIGNUP_CHANGE:
      return {
        ...state,
        signupFormData: { ...state.signupFormData, ...action.payload }
      };
    case SIGNUP_RESET:
      return {
        ...state,
        signupFormData: {
          email: '',
          firstName: '',
          lastName: '',
          password: ''
        },
        isLoading: false
      };
      return newState;
    case SET_SIGNUP_LOADING:
      return {
        ...state,
        isLoading: true
      };
    default:
      return state;
  }
};

export default signupReducer;

/*
 *
 * Signup reducer
 *
 */

import {
  SIGNUP_CHANGE,
  SIGNUP_RESET,
  SET_SIGNUP_LOADING,
  SUBSCRIBE_CHANGE
} from './constants';

const initialState = {
  signupFormData: {
    email: '',
    firstName: '',
    lastName: '',
    password: ''
  },
  isLoading: false,
  isSubscribed: false
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
    case SET_SIGNUP_LOADING:
      return {
        ...state,
        isLoading: action.payload
      };
    case SUBSCRIBE_CHANGE:
      return { ...state, isSubscribed: !state.isSubscribed };
    default:
      return state;
  }
};

export default signupReducer;

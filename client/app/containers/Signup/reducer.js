/*
 *
 * Signup reducer
 *
 */

import { SIGNUP_CHANGE, SIGNUP_SUCCESS, SET_SIGNUP_LOADING } from './constants';

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
  let newState;
  switch (action.type) {
    case SIGNUP_CHANGE:
      newState = {
        ...state,
        signupFormData: { ...state.signupFormData, ...action.payload }
      };
      return newState;
    case SIGNUP_SUCCESS:
      newState = {
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
      newState = {
        ...state,
        isLoading: true
      };
      return newState;
    default:
      return state;
  }
};

export default signupReducer;

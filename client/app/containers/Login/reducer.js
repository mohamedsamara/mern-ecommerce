/*
 *
 * Login reducer
 *
 */

import { LOGIN_CHANGE, LOGIN_RESET, SET_LOGIN_LOADING } from './constants';

const initialState = {
  loginFormData: {
    email: '',
    password: ''
  },
  isLoading: false
};

const loginReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_CHANGE:
      return {
        ...state,
        loginFormData: { ...state.loginFormData, ...action.payload }
      };
    case LOGIN_RESET:
      return {
        ...state,
        loginFormData: {
          email: '',
          password: ''
        },
        isLoading: false
      };
    case SET_LOGIN_LOADING:
      return {
        ...state,
        isLoading: true
      };
    default:
      return state;
  }
};

export default loginReducer;

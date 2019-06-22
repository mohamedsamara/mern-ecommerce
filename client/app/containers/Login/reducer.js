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
  let newState;
  switch (action.type) {
    case LOGIN_CHANGE:
      newState = {
        ...state,
        loginFormData: { ...state.loginFormData, ...action.payload }
      };
      return newState;
    case LOGIN_RESET:
      newState = {
        ...state,
        loginFormData: {
          email: '',
          password: ''
        },
        isLoading: false
      };
      return newState;
    case SET_LOGIN_LOADING:
      newState = {
        ...state,
        isLoading: true
      };
      return newState;
    default:
      return state;
  }
};

export default loginReducer;

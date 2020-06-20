/*
 *
 * Authentication reducer
 *
 */

import { SET_AUTH, CLEAR_AUTH, FETCH_TOKEN_LOADING } from './constants';

const initialState = {
  authenticated: false,
  isLoading: false
};

const authenticationReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_AUTH:
      return {
        ...state,
        authenticated: true
      };
    case CLEAR_AUTH:
      return {
        ...state,
        authenticated: false
      };
    case FETCH_TOKEN_LOADING:
      return {
        ...state,
        isLoading: action.payload
      };
    default:
      return state;
  }
};

export default authenticationReducer;

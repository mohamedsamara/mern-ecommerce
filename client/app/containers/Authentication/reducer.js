/*
 *
 * Authentication reducer
 *
 */

import { SET_AUTH, SET_UN_AUTH } from './constants';

const initialState = {
  authenticated: false
};

const authenticationReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_AUTH:
      return { ...state, authenticated: true };
    case SET_UN_AUTH:
      return { ...state, authenticated: false };
    default:
      return state;
  }
};

export default authenticationReducer;

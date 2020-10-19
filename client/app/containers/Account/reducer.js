/*
 *
 * Account reducer
 *
 */

import {
  ACCOUNT_CHANGE,
  FETCH_PROFILE,
  TOGGLE_RESET_FORM,
  CLEAR_ACCOUNT,
  SET_PROFILE_LOADING
} from './constants';

const initialState = {
  user: {
    firstName: '',
    lastName: ''
  },
  isFormOpen: false,
  isLoading: false
};

const accountReducer = (state = initialState, action) => {
  switch (action.type) {
    case ACCOUNT_CHANGE:
      return {
        ...state,
        user: {
          ...state.user,
          ...action.payload
        }
      };
    case FETCH_PROFILE:
      return {
        ...state,
        user: {
          ...state.user,
          ...action.payload
        }
      };
    case TOGGLE_RESET_FORM:
      return {
        ...state,
        isFormOpen: !state.isFormOpen
      };
    case CLEAR_ACCOUNT:
      return {
        ...state,
        user: {
          firstName: '',
          lastName: ''
        }
      };
    case SET_PROFILE_LOADING:
      return {
        ...state,
        isLoading: action.payload
      };
    default:
      return state;
  }
};

export default accountReducer;

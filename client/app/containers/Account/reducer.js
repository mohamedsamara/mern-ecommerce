/*
 *
 * Account reducer
 *
 */

import {
  ACCOUNT_CHANGE,
  FETCH_PROFILE,
  ACCOUNT_RESET,
  TOGGLE_RESET_FORM
} from './constants';

const initialState = {
  profile: {
    firstName: '',
    lastName: ''
  },
  user: {},
  isFormOpen: false
};

const accountReducer = (state = initialState, action) => {
  switch (action.type) {
    case ACCOUNT_CHANGE:
      return {
        ...state,
        profile: { ...state.profile, ...action.payload }
      };
    case FETCH_PROFILE:
      return {
        ...state,
        profile: { ...state.profile, ...action.payload.profile },
        user: { ...state.user, ...action.payload }
      };
    case ACCOUNT_RESET:
      return {
        ...state,
        profile: {
          firstName: '',
          lastName: ''
        }
      };
    case TOGGLE_RESET_FORM:
      return { ...state, isFormOpen: !state.isFormOpen };
    default:
      return state;
  }
};

export default accountReducer;

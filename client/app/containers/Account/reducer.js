/*
 *
 * Account reducer
 *
 */

import {
  ACCOUNT_CHANGE,
  FETCH_PROFILE,
  TOGGLE_RESET_FORM,
  CLEAR_ACCOUNT
} from './constants';

const initialState = {
  profileData: {
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
        profileData: { ...state.profileData, ...action.payload }
      };
    case FETCH_PROFILE:
      return {
        ...state,
        profileData: { ...state.profileData, ...action.payload.profile },
        user: { ...state.user, ...action.payload }
      };
    case TOGGLE_RESET_FORM:
      return { ...state, isFormOpen: !state.isFormOpen };
    case CLEAR_ACCOUNT:
      return {
        ...state,
        profileData: {
          firstName: '',
          lastName: ''
        },
        user: {}
      };
    default:
      return state;
  }
};

export default accountReducer;

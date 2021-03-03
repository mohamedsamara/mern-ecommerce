/*
 *
 * Users reducer
 *
 */

import { FETCH_USERS } from './constants';

const initialState = {
  users: []
};

const usersReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_USERS:
      return {
        ...state,
        users: action.payload
      };
    default:
      return state;
  }
};

export default usersReducer;

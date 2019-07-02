/*
 *
 * Category reducer
 *
 */

import { FETCH_CATEGORIES } from './constants';

const initialState = {
  categories: []
};

const categoryReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_CATEGORIES:
      return {
        ...state,
        categories: action.payload.profile
      };
    default:
      return state;
  }
};

export default categoryReducer;

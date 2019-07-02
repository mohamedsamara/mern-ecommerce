/*
 *
 * Category reducer
 *
 */

import { FETCH_CATEGORIES, CATEGORY_CHANGE, RESET_CATEGORY } from './constants';

const initialState = {
  categories: [],
  categoryFormData: {
    name: '',
    description: ''
  }
};

const categoryReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_CATEGORIES:
      return {
        ...state,
        categories: action.payload
      };
    case CATEGORY_CHANGE:
      return {
        ...state,
        categoryFormData: { ...state.categoryFormData, ...action.payload }
      };
    case RESET_CATEGORY:
      return {
        ...state,
        categoryFormData: {
          name: '',
          description: ''
        }
      };
    default:
      return state;
  }
};

export default categoryReducer;

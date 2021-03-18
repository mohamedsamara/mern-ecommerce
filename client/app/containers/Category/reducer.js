/*
 *
 * Category reducer
 *
 */

import {
  FETCH_CATEGORIES,
  FETCH_STORE_CATEGORIES,
  FETCH_CATEGORY,
  CATEGORY_CHANGE,
  CATEGORY_EDIT_CHANGE,
  SET_CATEGORY_FORM_ERRORS,
  SET_CATEGORY_FORM_EDIT_ERRORS,
  RESET_CATEGORY,
  TOGGLE_ADD_CATEGORY,
  ADD_CATEGORY,
  REMOVE_CATEGORY
} from './constants';

const initialState = {
  categories: [],
  storeCategories: [],
  category: {
    _id: ''
  },
  isCategoryAddOpen: false,
  categoryFormData: {
    name: '',
    description: '',
    isActive: true
  },
  formErrors: {},
  editFormErrors: {}
};

const categoryReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_CATEGORIES:
      return {
        ...state,
        categories: action.payload
      };
    case FETCH_STORE_CATEGORIES:
      return {
        ...state,
        storeCategories: action.payload
      };
    case FETCH_CATEGORY:
      return {
        ...state,
        category: action.payload
      };
    case ADD_CATEGORY:
      return {
        ...state,
        categories: [...state.categories, action.payload]
      };
    case REMOVE_CATEGORY:
      const index = state.categories.findIndex(b => b._id === action.payload);
      return {
        ...state,
        categories: [
          ...state.categories.slice(0, index),
          ...state.categories.slice(index + 1)
        ]
      };
    case CATEGORY_CHANGE:
      return {
        ...state,
        categoryFormData: { ...state.categoryFormData, ...action.payload }
      };
    case CATEGORY_EDIT_CHANGE:
      return {
        ...state,
        category: {
          ...state.category,
          ...action.payload
        }
      };
    case SET_CATEGORY_FORM_ERRORS:
      return {
        ...state,
        formErrors: action.payload
      };
    case SET_CATEGORY_FORM_EDIT_ERRORS:
      return {
        ...state,
        editFormErrors: action.payload
      };
    case RESET_CATEGORY:
      return {
        ...state,
        categoryFormData: {
          name: '',
          description: '',
          isActive: true
        },
        formErrors: {}
      };
    case TOGGLE_ADD_CATEGORY:
      return { ...state, isCategoryAddOpen: !state.isCategoryAddOpen };
    default:
      return state;
  }
};

export default categoryReducer;

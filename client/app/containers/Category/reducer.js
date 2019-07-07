/*
 *
 * Category reducer
 *
 */

import {
  FETCH_CATEGORIES,
  CATEGORY_CHANGE,
  RESET_CATEGORY,
  TOGGLE_ADD_CATEGORY,
  ADD_CATEGORY,
  REMOVE_CATEGORY
} from './constants';

const initialState = {
  categories: [],
  isCategoryAddOpen: false,
  categoryFormData: {
    name: '',
    description: ''
  },
  columns: [
    {
      hidden: true,
      dataField: '_id',
      text: ''
    },
    {
      dataField: 'name',
      text: 'Category Name',
      sort: true
    },
    {
      dataField: 'description',
      text: 'Category Description',
      classes: 'desc-column'
    }
  ]
};

const categoryReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_CATEGORIES:
      return {
        ...state,
        categories: action.payload
      };
    case ADD_CATEGORY:
      return {
        ...state,
        categories: [...state.categories, action.payload]
      };
    case REMOVE_CATEGORY:
      return {
        ...state,
        categories: [
          ...state.categories.slice(0, action.payload),
          ...state.categories.slice(action.payload + 1)
        ]
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
    case TOGGLE_ADD_CATEGORY:
      return { ...state, isCategoryAddOpen: !state.isCategoryAddOpen };
    default:
      return state;
  }
};

export default categoryReducer;

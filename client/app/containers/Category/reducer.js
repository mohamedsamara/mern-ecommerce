/*
 *
 * Category reducer
 *
 */

import {
  FETCH_CATEGORIES,
  FETCH_CATEGORIES_SELECT,
  CATEGORY_CHANGE,
  RESET_CATEGORY,
  CATEGORY_SELECT,
  TOGGLE_ADD_CATEGORY,
  ADD_CATEGORY
} from './constants';

const initialState = {
  categories: [],
  categoriesSelect: [],
  isCategoryAddOpen: false,
  categoryFormData: {
    name: '',
    description: ''
  },
  selectedCategories: [],
  columns: [
    {
      hidden: true,
      dataField: '_id',
      text: ''
    },
    {
      dataField: 'name',
      text: 'Category Name'
    },
    {
      dataField: 'description',
      text: 'Category Description'
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

    case FETCH_CATEGORIES_SELECT:
      return { ...state, categoriesSelect: action.payload };
    case ADD_CATEGORY:
      return {
        ...state,
        categories: [...state.categories, action.payload]
      };
    case CATEGORY_CHANGE:
      return {
        ...state,
        categoryFormData: { ...state.categoryFormData, ...action.payload }
      };
    case CATEGORY_SELECT:
      return {
        ...state,
        selectedCategories: action.payload
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

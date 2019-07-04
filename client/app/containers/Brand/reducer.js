/*
 *
 * Brand reducer
 *
 */

import {
  FETCH_BRANDS,
  BRAND_CHANGE,
  RESET_BRAND,
  TOGGLE_ADD_BRAND,
  ADD_BRAND,
  REMOVE_BRAND,
  FETCH_BRANDS_SELECT,
  BRAND_SELECT
} from './constants';

const initialState = {
  brands: [],
  isBrandAddOpen: false,
  brandsSelect: [],
  selectedBrands: [],
  brandFormData: {
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
      text: 'Brand Name',
      sort: true
    },
    {
      dataField: 'description',
      text: 'Brand Description'
    }
  ]
};

const brandReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_BRANDS:
      return {
        ...state,
        brands: action.payload
      };
    case FETCH_BRANDS_SELECT:
      return { ...state, brandsSelect: action.payload };
    case BRAND_SELECT:
      return {
        ...state,
        selectedBrands: action.payload
      };
    case ADD_BRAND:
      return {
        ...state,
        brands: [...state.brands, action.payload]
      };
    case REMOVE_BRAND:
      return {
        ...state,
        brands: [
          ...state.brands.slice(0, action.payload),
          ...state.brands.slice(action.payload + 1)
        ]
      };
    case BRAND_CHANGE:
      return {
        ...state,
        brandFormData: { ...state.brandFormData, ...action.payload }
      };
    case RESET_BRAND:
      return {
        ...state,
        brandFormData: {
          name: '',
          description: ''
        }
      };
    case TOGGLE_ADD_BRAND:
      return { ...state, isBrandAddOpen: !state.isBrandAddOpen };
    default:
      return state;
  }
};

export default brandReducer;

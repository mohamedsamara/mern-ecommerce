/*
 *
 * Navigation actions
 *
 */

 import axios from 'axios';
 import handleError from '../../utils/error';
import { TOGGLE_MENU, TOGGLE_CART, TOGGLE_BRAND, SUGGESTIONS_FETCH_REQUEST, SUGGESTIONS_CLEAR_REQUEST, ONCHANGE_SUGGESTION } from './constants';

export const toggleMenu = () => {
  return {
    type: TOGGLE_MENU
  };
};

export const toggleCart = () => {
  return {
    type: TOGGLE_CART
  };
};

export const toggleBrand = () => {
  return {
    type: TOGGLE_BRAND
  };
};


export const onChange = (event, { newValue }) => {
  return {
    type: ONCHANGE_SUGGESTION,
    payload: {
        value: newValue
    }
  }
};

export const onSuggestionsFetchRequested = ({ value }) => {
  const inputValue = value.value.trim().toLowerCase();
    return async (dispatch, getState) => {
      try {
        if (inputValue && inputValue.length >= 3) {
          const response = await axios.get(`/api/product/list/search/${inputValue}`);
          dispatch({
            type: SUGGESTIONS_FETCH_REQUEST,
            payload: {
              suggestions: response.data.products
            }
          });
        }
      } catch (error) {
        handleError(error, dispatch);
      }
    };
};

export const onSuggestionsClearRequested = () => {
  return {
    type: SUGGESTIONS_CLEAR_REQUEST,
    payload: {
        suggestions: []
    }
  }
};

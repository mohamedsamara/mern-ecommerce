/*
 *
 * Category actions
 *
 */

import { success } from 'react-notification-system-redux';
import axios from 'axios';
import cookie from 'react-cookies';

import {
  FETCH_CATEGORIES,
  FETCH_CATEGORIES_SELECT,
  CATEGORY_CHANGE,
  RESET_CATEGORY,
  CATEGORY_SELECT,
  TOGGLE_ADD_CATEGORY,
  ADD_CATEGORY
} from './constants';

import handleError from '../../utils/error';
import { formCategoriesClientSelect } from '../../helpers/select';

export const categoryChange = (name, value) => {
  let formData = {};
  formData[name] = value;

  return {
    type: CATEGORY_CHANGE,
    payload: formData
  };
};

export const toggleAddCategory = () => {
  return {
    type: TOGGLE_ADD_CATEGORY
  };
};

export const categorySelect = value => {
  return {
    type: CATEGORY_SELECT,
    payload: value
  };
};

export const fetchCategoriesSelect = () => {
  return async (dispatch, getState) => {
    try {
      const response = await axios.get(`/api/category/list/select`);

      let formulatedCategories = formCategoriesClientSelect(
        response.data.categories
      );

      dispatch({
        type: FETCH_CATEGORIES_SELECT,
        payload: formulatedCategories
      });
    } catch (error) {
      const title = `Please try again!`;
      handleError(error, title, dispatch);
    }
  };
};

export const fetchCategories = () => {
  return async (dispatch, getState) => {
    try {
      const response = await axios.get(`/api/category/list`);

      dispatch({
        type: FETCH_CATEGORIES,
        payload: response.data.categories
      });
    } catch (error) {
      const title = `Please try again!`;
      handleError(error, title, dispatch);
    }
  };
};

export const addCategory = () => {
  return async (dispatch, getState) => {
    try {
      const category = getState().category.categoryFormData;

      const response = await axios.post(`/api/category/add`, category);

      const successfulOptions = {
        title: `${response.data.message}`,
        position: 'tr',
        autoDismiss: 1
      };

      if (response.data.success == true) {
        dispatch(success(successfulOptions));
        dispatch({
          type: ADD_CATEGORY,
          payload: response.data.category
        });
        dispatch({ type: RESET_CATEGORY });
        dispatch(toggleAddCategory());
      }
    } catch (error) {
      const title = `Please try again!`;
      handleError(error, title, dispatch);
    }
  };
};

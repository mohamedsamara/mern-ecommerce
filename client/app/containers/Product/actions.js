/*
 *
 * Product actions
 *
 */

import { success } from 'react-notification-system-redux';
import axios from 'axios';

import {
  FETCH_PRODUCTS,
  PRODUCT_CHANGE,
  RESET_PRODUCT,
  TOGGLE_ADD_PRODUCT,
  ADD_PRODUCT,
  REMOVE_PRODUCT
} from './constants';

import handleError from '../../utils/error';
import { formCategoriesServerSelect } from '../../helpers/select';

export const productChange = (name, value) => {
  let formData = {};
  formData[name] = value;

  return {
    type: PRODUCT_CHANGE,
    payload: formData
  };
};

export const toggleAddProduct = () => {
  return {
    type: TOGGLE_ADD_PRODUCT
  };
};

export const fetchProducts = () => {
  return async (dispatch, getState) => {
    try {
      const response = await axios.get(`/api/product/list`);

      dispatch({
        type: FETCH_PRODUCTS,
        payload: response.data.products
      });
    } catch (error) {
      const title = `Please try again!`;
      handleError(error, title, dispatch);
    }
  };
};

export const deleteProduct = (id, index) => {
  return async (dispatch, getState) => {
    try {
      const response = await axios.delete(`/api/product/delete/${id}`);

      const successfulOptions = {
        title: `${response.data.message}`,
        position: 'tr',
        autoDismiss: 1
      };

      if (response.data.success == true) {
        dispatch(success(successfulOptions));
        dispatch({
          type: REMOVE_PRODUCT,
          payload: index
        });
      }
    } catch (error) {
      const title = `Please try again!`;
      handleError(error, title, dispatch);
    }
  };
};

export const addProduct = () => {
  return async (dispatch, getState) => {
    try {
      const product = getState().product.productFormData;
      const categories = getState().category.selectedCategories;

      let newCategories = formCategoriesServerSelect(categories);

      let newProduct = {
        category: newCategories,
        ...product
      };

      const response = await axios.post(`/api/product/add`, newProduct);

      const successfulOptions = {
        title: `${response.data.message}`,
        position: 'tr',
        autoDismiss: 1
      };

      if (response.data.success == true) {
        dispatch(success(successfulOptions));
        dispatch({
          type: ADD_PRODUCT,
          payload: response.data.product
        });
        dispatch({ type: RESET_PRODUCT });
        dispatch(toggleAddProduct());
      }
    } catch (error) {
      const title = `Please try again!`;
      handleError(error, title, dispatch);
    }
  };
};

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
  REMOVE_PRODUCT,
  PRODUCT_SELECT,
  FETCH_PRODUCTS_SELECT
} from './constants';

import handleError from '../../utils/error';
import { formSelect, unformSelect } from '../../helpers/select';

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

export const fetchProducts = (filter, slug) => {
  return async (dispatch, getState) => {
    try {
      console.log('slug', slug);

      const response = await axios.get(`/api/product/list/${filter}/${slug}`);

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

export const productSelect = value => {
  return {
    type: PRODUCT_SELECT,
    payload: value
  };
};

export const fetchProductsSelect = () => {
  return async (dispatch, getState) => {
    try {
      const response = await axios.get(`/api/product/list/select`);

      let formulatedProducts = formSelect(response.data.products);

      dispatch({
        type: FETCH_PRODUCTS_SELECT,
        payload: formulatedProducts
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
      const brand = getState().brand.selectedBrands.value;

      let newCategories = unformSelect(categories);

      let newProduct = {
        categories: newCategories,
        ...product
      };

      const response = await axios.post(
        `/api/product/add/${brand}`,
        newProduct
      );

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

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

import { RESET_BRAND } from '../Brand/constants';

import handleError from '../../utils/error';
import { formSelect } from '../../helpers/select';

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
      let api = '';

      if (!slug) {
        api = filterProductApi('all', slug);
      } else {
        api = filterProductApi(filter, slug);
      }

      const response = await axios.get(`/api/product/list${api}`);

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
      const brand = getState().brand.selectedBrands.value;

      const newProduct = {
        ...product,
        brand: brand
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
        dispatch({ type: RESET_BRAND });
        dispatch(toggleAddProduct());
      }
    } catch (error) {
      const title = `Please try again!`;
      handleError(error, title, dispatch);
    }
  };
};

const filterProductApi = (filter, slug) => {
  let api = '';
  switch (filter) {
    case 'all':
      api = ``;
      break;
    case 'category':
      api = `/${filter}/${slug}`;
      break;
    case 'brand':
      api = `/${filter}/${slug}`;
      break;
    default:
  }
  return api;
};

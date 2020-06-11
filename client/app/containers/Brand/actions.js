/*
 *
 * Brand actions
 *
 */

import { success } from 'react-notification-system-redux';
import axios from 'axios';

import {
  FETCH_BRANDS,
  BRAND_CHANGE,
  SET_BRAND_FORM_ERRORS,
  RESET_BRAND,
  TOGGLE_ADD_BRAND,
  ADD_BRAND,
  REMOVE_BRAND,
  BRAND_SELECT,
  FETCH_BRANDS_SELECT
} from './constants';

import handleError from '../../utils/error';
import { formatSelectOptions } from '../../helpers/select';
import { allFieldsValidation } from '../../utils/validation';

export const brandChange = (name, value) => {
  let formData = {};
  formData[name] = value;

  return {
    type: BRAND_CHANGE,
    payload: formData
  };
};

export const toggleAddBrand = () => {
  return {
    type: TOGGLE_ADD_BRAND
  };
};

export const fetchBrands = () => {
  return async (dispatch, getState) => {
    try {
      const response = await axios.get(`/api/brand/list`);

      dispatch({
        type: FETCH_BRANDS,
        payload: response.data.brands
      });
    } catch (error) {
      const title = `Please try again!`;
      handleError(error, title, dispatch);
    }
  };
};

export const handleBrandSelect = value => {
  return {
    type: BRAND_SELECT,
    payload: value
  };
};

export const fetchBrandsSelect = () => {
  return async (dispatch, getState) => {
    try {
      const response = await axios.get(`/api/brand/list/select`);

      let formattedBrands = formatSelectOptions(response.data.brands);

      dispatch({
        type: FETCH_BRANDS_SELECT,
        payload: formattedBrands
      });
    } catch (error) {
      const title = `Please try again!`;
      handleError(error, dispatch);
    }
  };
};

export const deleteBrand = (id, index) => {
  return async (dispatch, getState) => {
    try {
      const response = await axios.delete(`/api/brand/delete/${id}`);

      const successfulOptions = {
        title: `${response.data.message}`,
        position: 'tr',
        autoDismiss: 1
      };

      if (response.data.success === true) {
        dispatch(success(successfulOptions));
        dispatch({
          type: REMOVE_BRAND,
          payload: index
        });
      }
    } catch (error) {
      handleError(error, dispatch);
    }
  };
};

export const addBrand = () => {
  return async (dispatch, getState) => {
    try {
      const rules = {
        name: 'required|min:6',
        description: 'required|min:10|max:100'
      };

      const brand = getState().brand.brandFormData;

      const { isValid, errors } = allFieldsValidation(brand, rules);

      if (!isValid) {
        return dispatch({ type: SET_BRAND_FORM_ERRORS, payload: errors });
      }

      const response = await axios.post(`/api/brand/add`, brand);

      const successfulOptions = {
        title: `${response.data.message}`,
        position: 'tr',
        autoDismiss: 1
      };

      if (response.data.success === true) {
        dispatch(success(successfulOptions));
        dispatch({
          type: ADD_BRAND,
          payload: response.data.brand
        });
        dispatch({ type: RESET_BRAND });
        dispatch(toggleAddBrand());
      }
    } catch (error) {
      handleError(error, dispatch);
    }
  };
};

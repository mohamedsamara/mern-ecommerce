/*
 *
 * Brand actions
 *
 */

import { success } from 'react-notification-system-redux';
import axios from 'axios';
import cookie from 'react-cookies';

import { FETCH_BRANDS, BRAND_CHANGE, RESET_BRAND } from './constants';
import handleError from '../../utils/error';

export const brandChange = (name, value) => {
  let formData = {};
  formData[name] = value;

  return {
    type: BRAND_CHANGE,
    payload: formData
  };
};

export const fetchBrands = () => {
  return async (dispatch, getState) => {
    try {
      const response = await axios.get(`api/brand/list`);
    } catch (error) {
      const title = `Please try again!`;
      handleError(error, title, dispatch);
    }
  };
};

export const addBrand = () => {
  return async (dispatch, getState) => {
    try {
      const brand = getState().brand.brandFormData;

      const response = await axios.post(`/api/brand/add`, brand);

      const successfulOptions = {
        title: `${response.data.message}`,
        position: 'tr',
        autoDismiss: 1
      };

      if (response.data.success == true) {
        dispatch(success(successfulOptions));
        dispatch({ type: RESET_BRAND });
      }
    } catch (error) {
      const title = `Please try again!`;
      handleError(error, title, dispatch);
    }
  };
};

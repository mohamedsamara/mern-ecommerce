/*
 *
 * Merchant actions
 *
 */

import { success } from 'react-notification-system-redux';
import axios from 'axios';

import {
  FETCH_MERCHANTS,
  SELL_FORM_CHANGE,
  SELL_FORM_CHANGE_RESET
} from './constants';

import handleError from '../../utils/error';

export const sellFormChange = (name, value) => {
  let formData = {};
  formData[name] = value;

  return {
    type: SELL_FORM_CHANGE,
    payload: formData
  };
};

export const sellWithUs = () => {
  return async (dispatch, getState) => {
    const merchant = getState().merchant.sellFormData;

    try {
      const response = await axios.post('/api/merchant/add', merchant);

      const successfulOptions = {
        title: `${response.data.message}`,
        position: 'tr',
        autoDismiss: 1
      };

      dispatch(success(successfulOptions));
    } catch (error) {
      const title = `Please try again!`;
      handleError(error, title, dispatch);
    } finally {
      dispatch({ type: SELL_FORM_CHANGE_RESET });
    }
  };
};

export const fetchMerchants = () => {
  return async (dispatch, getState) => {
    try {
      const response = await axios.get(`/api/merchant/list`);

      dispatch({
        type: FETCH_MERCHANTS,
        payload: response.data.merchants
      });
    } catch (error) {
      const title = `Please try again!`;
      handleError(error, title, dispatch);
    }
  };
};

/*
 *
 * Sell actions
 *
 */

import { success } from 'react-notification-system-redux';
import axios from 'axios';

import { SELL_FORM_CHANGE, SELL_FORM_CHANGE_RESET } from './constants';

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
    let merchant = getState().sell.sellFormData;

    try {
      const response = await axios.post('/api/merchant', merchant);

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

/*
 *
 * ResetPassword actions
 *
 */

import { push } from 'connected-react-router';
import { success, error, info } from 'react-notification-system-redux';
import axios from 'axios';

import { RESET_PASSWORD_CHANGE, RESET_PASSWORD_RESET } from './constants';

export const resetPasswordChange = (name, value) => {
  let formData = {};
  formData[name] = value;

  return {
    type: RESET_PASSWORD_CHANGE,
    payload: formData
  };
};

export const resetPassowrd = token => {
  return async (dispatch, getState) => {
    const user = getState().resetPassword.resetFormData;

    console.log('token', token);

    try {
      const response = await axios.post(`/api/reset/${token}`, user);

      dispatch({ type: RESET_PASSWORD_RESET });
    } catch (error) {
      console.log(error);
    }
  };
};

/*
 *
 * ForgotPassword actions
 *
 */

import { push } from 'connected-react-router';
import { success, error, info } from 'react-notification-system-redux';
import axios from 'axios';

import { FORGOT_PASSWORD_CHANGE, FORGOT_PASSWORD_RESET } from './constants';

export const forgotPasswordChange = (name, value) => {
  return {
    type: FORGOT_PASSWORD_CHANGE,
    payload: value
  };
};

export const forgotPassowrd = () => {
  return async (dispatch, getState) => {
    const user = getState().forgotPassword.forgotFormData;

    try {
      const response = await axios.post('/api/forgot', user);

      dispatch({ type: FORGOT_PASSWORD_RESET });
    } catch (error) {
      console.log(error);
    }
  };
};

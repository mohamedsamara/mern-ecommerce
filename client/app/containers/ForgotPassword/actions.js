/*
 *
 * ForgotPassword actions
 *
 */

import { push } from 'connected-react-router';
import { success } from 'react-notification-system-redux';
import axios from 'axios';

import { FORGOT_PASSWORD_CHANGE, FORGOT_PASSWORD_RESET } from './constants';
import handleError from '../../utils/error';

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
      const response = await axios.post('/api/auth/forgot', user);
      const successfulOptions = {
        title: `${response.data.message}`,
        position: 'tr',
        autoDismiss: 1
      };

      if (response.data.success == true) {
        dispatch(push('/login'));
      }
      dispatch(success(successfulOptions));

      dispatch({ type: FORGOT_PASSWORD_RESET });
    } catch (error) {
      const title = `Please try again!`;
      handleError(error, title, dispatch);
    }
  };
};

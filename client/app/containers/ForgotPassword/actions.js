/*
 *
 * ForgotPassword actions
 *
 */

import { push } from 'connected-react-router';
import { success, error } from 'react-notification-system-redux';

import { FORGOT_PASSWORD_CHANGE, FORGOT_PASSWORD_SUCCESS } from './constants';

export const forgotPasswordChange = (name, value) => {
  return {
    type: FORGOT_PASSWORD_CHANGE,
    payload: value
  };
};

export const forgotPassowrd = () => {
  return (dispatch, getState) => {
    const user = getState().forgotPassword.forgotFormData;

    const successfulOptions = {
      title: 'Hey, Please check you email to reset your password!',
      position: 'tr',
      autoDismiss: 1
    };

    const unsuccessfulOptions = {
      title: 'Hey, Please try again!',
      position: 'tr',
      autoDismiss: 1
    };
  };
};

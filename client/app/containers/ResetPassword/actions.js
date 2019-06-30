/*
 *
 * ResetPassword actions
 *
 */

import { push } from 'connected-react-router';
import { success } from 'react-notification-system-redux';
import axios from 'axios';

import { RESET_PASSWORD_CHANGE, RESET_PASSWORD_RESET } from './constants';

import { signOut } from '../Login/actions';
import { toggleResetForm } from '../Account/actions';
import handleError from '../../utils/error';

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

    if (user.password !== user.confirmPassword) {
      const title = `Please retype your new password!`;
      let error = {};
      error.message = `Passwords don't match`;

      return handleError(error, title, dispatch);
    }

    try {
      const response = await axios.post(`/api/auth/reset/${token}`, user);
      const successfulOptions = {
        title: `${response.data.message}`,
        position: 'tr',
        autoDismiss: 1
      };

      if (response.data.success == true) {
        dispatch(push('/login'));
      }

      dispatch(success(successfulOptions));
      dispatch({ type: RESET_PASSWORD_RESET });
    } catch (error) {
      const title = `Please try to reset again!`;
      handleError(error, title, dispatch);
    }
  };
};

export const resetAccountPassword = () => {
  return async (dispatch, getState) => {
    const newUser = getState().resetPassword.resetFormData;
    const profile = getState().account.user;

    const user = {
      email: profile.email,
      ...newUser
    };

    if (newUser.password !== newUser.confirmPassword) {
      const title = `Please retype your new password!`;
      let error = {};
      error.message = `Passwords don't match`;

      return handleError(error, title, dispatch);
    }

    try {
      const response = await axios.post(`/api/auth/reset`, user);
      const successfulOptions = {
        title: `${response.data.message}`,
        position: 'tr',
        autoDismiss: 1
      };

      if (response.data.success == true) {
        dispatch(signOut());
        dispatch(toggleResetForm());
      }

      dispatch(success(successfulOptions));
      dispatch({ type: RESET_PASSWORD_RESET });
    } catch (error) {
      const title = `Please try to reset again!`;
      handleError(error, title, dispatch);
    }
  };
};

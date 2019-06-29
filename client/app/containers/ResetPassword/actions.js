/*
 *
 * ResetPassword actions
 *
 */

import { push } from 'connected-react-router';
import { success, error, info } from 'react-notification-system-redux';
import axios from 'axios';

import { RESET_PASSWORD_CHANGE, RESET_PASSWORD_RESET } from './constants';

import { signOut } from '../Login/actions';

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

    try {
      const response = await axios.post(`/api/auth/reset/${token}`, user);

      dispatch({ type: RESET_PASSWORD_RESET });
    } catch (error) {
      console.log(error);
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

    try {
      const response = await axios.post(`/api/auth/reset`, user);

      if (response.data.success == true) {
        dispatch(signOut());
      }

      dispatch({ type: RESET_PASSWORD_RESET });
    } catch (error) {
      console.log(error);
    }
  };
};

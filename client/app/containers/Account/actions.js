/*
 *
 * Account actions
 *
 */

import { push } from 'connected-react-router';
import { success, error, info } from 'react-notification-system-redux';
import axios from 'axios';
import cookie from 'react-cookies';

import {
  ACCOUNT_CHANGE,
  FETCH_PROFILE,
  ACCOUNT_RESET,
  TOGGLE_RESET_FORM
} from './constants';

export const accountChange = (name, value) => {
  let formData = {};
  formData[name] = value;

  return {
    type: ACCOUNT_CHANGE,
    payload: formData
  };
};

export const toggleResetForm = () => {
  return {
    type: TOGGLE_RESET_FORM
  };
};

export const fetchProfile = userId => {
  return async (dispatch, getState) => {
    try {
      const response = await axios.get(`api/profile/${userId}`);

      dispatch({ type: FETCH_PROFILE, payload: response.data.user });
    } catch (error) {
      console.log(error);
    }
  };
};

export const updateProfile = () => {
  return async (dispatch, getState) => {
    const profile = getState().account.profile;
    const userId = cookie.load('user');

    try {
      const response = await axios.post(`/api/profile/${userId}`, {
        profile: profile
      });
    } catch (error) {
      console.log(error);
    }
  };
};

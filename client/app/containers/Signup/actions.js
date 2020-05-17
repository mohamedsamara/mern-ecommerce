/*
 *
 * Signup actions
 *
 */

import { success } from 'react-notification-system-redux';
import axios from 'axios';
import cookie from 'react-cookies';

import {
  SIGNUP_CHANGE,
  SIGNUP_RESET,
  SET_SIGNUP_LOADING,
  SUBSCRIBE_CHANGE
} from './constants';

import { setAuth } from '../Authentication/actions';
import setToken from '../../utils/token';
import handleError from '../../utils/error';

export const signupChange = (name, value) => {
  let formData = {};
  formData[name] = value;

  return {
    type: SIGNUP_CHANGE,
    payload: formData
  };
};

export const subscribeChange = () => {
  return {
    type: SUBSCRIBE_CHANGE
  };
};

export const signUp = () => {
  return async (dispatch, getState) => {
    dispatch({ type: SET_SIGNUP_LOADING, payload: true });
    const newUser = getState().signup.signupFormData;
    const isSubscribed = getState().signup.isSubscribed;

    const user = {
      isSubscribed,
      ...newUser
    };

    try {
      const response = await axios.post('/api/auth/register', user);

      const successfulOptions = {
        title: `You have signed up successfully! You will be receiving an email as well. Thank you!`,
        position: 'tr',
        autoDismiss: 1
      };

      cookie.save('token', response.data.token, { path: '/' });
      cookie.save('user', response.data.user.id, { path: '/' });
      cookie.save('role', response.data.user.role, { path: '/' });

      setToken(response.data.token);

      dispatch(setAuth());
      dispatch(success(successfulOptions));
      dispatch({ type: SIGNUP_RESET });
    } catch (error) {
      const title = `Please try to signup again!`;

      handleError(error, title, dispatch);
    } finally {
      dispatch({ type: SET_SIGNUP_LOADING, payload: false });
    }
  };
};

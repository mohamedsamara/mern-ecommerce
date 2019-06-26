/*
 *
 * Signup actions
 *
 */

import { push } from 'connected-react-router';
import { success, error } from 'react-notification-system-redux';
import axios from 'axios';
import cookie from 'react-cookies';

import { SIGNUP_CHANGE, SIGNUP_RESET, SET_SIGNUP_LOADING } from './constants';

import { setAuth } from '../Authentication/actions';

export const signupChange = (name, value) => {
  let formData = {};
  formData[name] = value;

  return {
    type: SIGNUP_CHANGE,
    payload: formData
  };
};

export const signUp = () => {
  return async (dispatch, getState) => {
    dispatch({ type: SET_SIGNUP_LOADING });
    const user = getState().signup.signupFormData;

    try {
      const response = await axios.post('/api/register', user);

      cookie.save('token', response.data.token, { path: '/' });
      cookie.save('user', response.data.user.id, { path: '/' });
      cookie.save('role', response.data.user.role, { path: '/' });

      dispatch(setAuth());
      dispatch({ type: SIGNUP_RESET });
    } catch (error) {
      console.log(error);
    }
  };

  // const successfulOptions = {
  //   title: `Hey ${user.firstName}, Thank you for signing up`,
  //   position: 'tr',
  //   autoDismiss: 1
  // };
};

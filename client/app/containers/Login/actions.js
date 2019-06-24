/*
 *
 * Login actions
 *
 */

import { push } from 'connected-react-router';
import { success, error, info } from 'react-notification-system-redux';
import axios from 'axios';
import cookie from 'react-cookies';

import { LOGIN_CHANGE, LOGIN_RESET, SET_LOGIN_LOADING } from './constants';
import { setAuth, setUnAuth } from '../Authentication/actions';
import setToken from '../../utils/token';

export const loginChange = (name, value) => {
  let formData = {};
  formData[name] = value;

  return {
    type: LOGIN_CHANGE,
    payload: formData
  };
};

export const login = () => {
  return async (dispatch, getState) => {
    dispatch({ type: SET_LOGIN_LOADING });

    const user = getState().login.loginFormData;

    try {
      const response = await axios.post('/api/login', user);
      console.log('token', response.data.token);

      cookie.save('token', response.data.token, { path: '/' });
      cookie.save('user', response.data.user.id, { path: '/' });

      setToken(response.data.token);

      dispatch(setAuth());
      dispatch({ type: LOGIN_RESET });
    } catch (error) {
      console.log(error);
    }
  };
};

export const signOut = () => {
  return (dispatch, getState) => {
    dispatch(setUnAuth());
    cookie.remove('token', { path: '/' });
    cookie.remove('user', { path: '/' });
  };
};

/*
 *
 * Login actions
 *
 */

import { success } from 'react-notification-system-redux';
import axios from 'axios';
import cookie from 'react-cookies';
import { push } from 'connected-react-router';

import {
  LOGIN_CHANGE,
  LOGIN_RESET,
  SET_LOGIN_LOADING,
  SET_LOGIN_FORM_ERRORS,
  SET_LOGIN_SUBMITTING
} from './constants';
import { setAuth, clearAuth } from '../Authentication/actions';
import setToken from '../../utils/token';
import handleError from '../../utils/error';
import { clearCart } from '../Cart/actions';
import { clearAccount } from '../Account/actions';
import { allFieldsValidation } from '../../utils/validation';

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
    const rules = {
      email: 'required|email',
      password: 'required|min:6'
    };

    const user = getState().login.loginFormData;

    const { isValid, errors } = allFieldsValidation(user, rules);

    if (!isValid) {
      return dispatch({ type: SET_LOGIN_FORM_ERRORS, payload: errors });
    }

    dispatch({ type: SET_LOGIN_SUBMITTING, payload: true });
    dispatch({ type: SET_LOGIN_LOADING, payload: true });

    try {
      const response = await axios.post('/api/auth/login', user);

      const firstName = response.data.user.profile.firstName;

      const successfulOptions = {
        title: `Hey${firstName ? ` ${firstName}` : ''}, Welcome Back!`,
        position: 'tr',
        autoDismiss: 1
      };

      cookie.save('token', response.data.token, { path: '/' });
      cookie.save('user', response.data.user.id, { path: '/' });
      cookie.save('role', response.data.user.role, { path: '/' });

      setToken(response.data.token);

      dispatch(setAuth());
      dispatch(success(successfulOptions));

      dispatch({ type: LOGIN_RESET });
    } catch (error) {
      const title = `Please try to login again!`;
      handleError(error, dispatch, title);
    } finally {
      dispatch({ type: SET_LOGIN_SUBMITTING, payload: false });
      dispatch({ type: SET_LOGIN_LOADING, payload: false });
    }
  };
};

export const signOut = () => {
  return (dispatch, getState) => {
    const successfulOptions = {
      title: `You have signed out!`,
      position: 'tr',
      autoDismiss: 1
    };

    dispatch(clearAuth());
    dispatch(clearAccount());
    dispatch(push('/login'));

    cookie.remove('token', { path: '/' });
    cookie.remove('user', { path: '/' });
    cookie.remove('role', { path: '/' });

    dispatch(success(successfulOptions));
    // dispatch(clearCart());
  };
};

/*
 *
 * ForgotPassword actions
 *
 */

import { push } from 'connected-react-router';
import { success } from 'react-notification-system-redux';
import axios from 'axios';

import {
  FORGOT_PASSWORD_CHANGE,
  FORGOT_PASSWORD_RESET,
  SET_FORGOT_PASSWORD_FORM_ERRORS
} from './constants';
import handleError from '../../utils/error';
import { allFieldsValidation } from '../../utils/validation';

export const forgotPasswordChange = (name, value) => {
  return {
    type: FORGOT_PASSWORD_CHANGE,
    payload: value
  };
};

export const forgotPassowrd = () => {
  return async (dispatch, getState) => {
    try {
      const rules = {
        email: 'required|email'
      };

      const user = getState().forgotPassword.forgotFormData;

      const { isValid, errors } = allFieldsValidation(user, rules, {
        'required.email': 'Email is required.'
      });

      if (!isValid) {
        return dispatch({
          type: SET_FORGOT_PASSWORD_FORM_ERRORS,
          payload: errors
        });
      }

      const response = await axios.post('/api/auth/forgot', user);
      const successfulOptions = {
        title: `${response.data.message}`,
        position: 'tr',
        autoDismiss: 1
      };

      if (response.data.success === true) {
        dispatch(push('/login'));
      }
      dispatch(success(successfulOptions));

      dispatch({ type: FORGOT_PASSWORD_RESET });
    } catch (error) {
      const title = `Please try again!`;
      handleError(error, dispatch, title);
    }
  };
};

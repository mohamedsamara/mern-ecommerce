/*
 *
 * Newsletter actions
 *
 */

import { success } from 'react-notification-system-redux';
import axios from 'axios';

import {
  NEWSLETTER_CHANGE,
  SET_NEWSLETTER_FORM_ERRORS,
  NEWSLETTER_RESET
} from './constants';
import handleError from '../../utils/error';
import { allFieldsValidation } from '../../utils/validation';

export const newsletterChange = (name, value) => {
  return {
    type: NEWSLETTER_CHANGE,
    payload: value
  };
};

export const subscribeToNewsletter = () => {
  return async (dispatch, getState) => {
    try {
      const rules = {
        email: 'required|email'
      };

      const user = {};
      user.email = getState().newsletter.email;

      const { isValid, errors } = allFieldsValidation(user, rules, {
        'required.email': 'Email is required.',
        'email.email': 'Email format is invalid.'
      });

      if (!isValid) {
        return dispatch({ type: SET_NEWSLETTER_FORM_ERRORS, payload: errors });
      }

      const response = await axios.post('/api/newsletter/subscribe', user);

      const successfulOptions = {
        title: `${response.data.message}`,
        position: 'tr',
        autoDismiss: 1
      };

      dispatch({ type: NEWSLETTER_RESET });
      dispatch(success(successfulOptions));
    } catch (error) {
      handleError(error, dispatch);
    }
  };
};

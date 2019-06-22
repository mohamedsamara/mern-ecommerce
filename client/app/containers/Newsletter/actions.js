/*
 *
 * Newsletter actions
 *
 */

import { push } from 'connected-react-router';
import { success, error, info } from 'react-notification-system-redux';
import axios from 'axios';

import { NEWSLETTER_CHANGE } from './constants';

export const newsletterChange = (name, value) => {
  return {
    type: NEWSLETTER_CHANGE,
    payload: value
  };
};

export const subscribe = () => {
  return async (dispatch, getState) => {
    const email = getState().newsletter.email;

    try {
      const response = await axios.post('/api/subscribe', email);

      console.log('response', response);
    } catch (error) {
      console.log(error);
    }
  };
};

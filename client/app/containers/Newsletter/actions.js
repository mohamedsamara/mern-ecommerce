/*
 *
 * Newsletter actions
 *
 */

import { success } from 'react-notification-system-redux';
import axios from 'axios';

import { NEWSLETTER_CHANGE, NEWSLETTER_RESET } from './constants';
import handleError from '../../utils/error';

export const newsletterChange = (name, value) => {
  return {
    type: NEWSLETTER_CHANGE,
    payload: value
  };
};

export const subscribe = () => {
  return async (dispatch, getState) => {
    const user = {};
    user.email = getState().newsletter.email;

    try {
      const response = await axios.post('/api/newsletter/subscribe', user);

      const successfulOptions = {
        title: `${response.data.message}`,
        position: 'tr',
        autoDismiss: 1
      };

      dispatch(success(successfulOptions));
      dispatch({ type: NEWSLETTER_RESET });
    } catch (error) {
      const title = `Please try again!`;
      handleError(error, title, dispatch);
    }
  };
};

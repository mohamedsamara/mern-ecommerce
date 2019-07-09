/*
 *
 * Contact actions
 *
 */

import { success } from 'react-notification-system-redux';
import axios from 'axios';

import { CONTACT_FORM_CHANGE, CONTACT_RESET } from './constants';
import handleError from '../../utils/error';

export const contactFormChange = (name, value) => {
  let formData = {};
  formData[name] = value;

  return {
    type: CONTACT_FORM_CHANGE,
    payload: formData
  };
};

export const contactUs = () => {
  return async (dispatch, getState) => {
    try {
      const contact = getState().contact.contactFormData;

      const response = await axios.post('/api/contact/add', contact);

      const successfulOptions = {
        title: `${response.data.message}`,
        position: 'tr',
        autoDismiss: 1
      };

      dispatch(success(successfulOptions));
    } catch (error) {
      const title = `Please try again!`;
      handleError(error, title, dispatch);
    } finally {
      dispatch({ type: CONTACT_RESET });
    }
  };
};

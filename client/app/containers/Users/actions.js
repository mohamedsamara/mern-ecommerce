/*
 *
 * Users actions
 *
 */

import { push } from 'connected-react-router';
import { success } from 'react-notification-system-redux';
import axios from 'axios';

import { FETCH_USERS } from './constants';

import handleError from '../../utils/error';

export const fetchUsers = () => {
  return async (dispatch, getState) => {
    try {
      const response = await axios.get(`/api/user/users`);

      dispatch({ type: FETCH_USERS, payload: response.data.users });
    } catch (error) {
      const title = `Please try again!`;
      handleError(error, title, dispatch);
    }
  };
};

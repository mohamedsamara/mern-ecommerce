/*
 *
 * Category actions
 *
 */

import { success } from 'react-notification-system-redux';
import axios from 'axios';
import cookie from 'react-cookies';

import { FETCH_CATEGORIES } from './constants';
import handleError from '../../utils/error';

export const fetchCategories = () => {
  return async (dispatch, getState) => {
    try {
      const response = await axios.get(`api/category/list`);
    } catch (error) {
      const title = `Please try again!`;
      handleError(error, title, dispatch);
    }
  };
};

export const addCategory = () => {
  return async (dispatch, getState) => {
    try {
      const response = await axios.post(`api/category/add`);
    } catch (error) {
      const title = `Please try again!`;
      handleError(error, title, dispatch);
    }
  };
};

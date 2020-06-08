/*
 *
 * Authentication actions
 *
 */

import { SET_AUTH, CLEAR_AUTH } from './constants';

export const setAuth = () => {
  return {
    type: SET_AUTH
  };
};

export const clearAuth = () => {
  return {
    type: CLEAR_AUTH
  };
};

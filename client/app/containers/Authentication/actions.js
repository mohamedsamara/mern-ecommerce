/*
 *
 * Authentication actions
 *
 */

import { SET_AUTH, SET_UN_AUTH } from './constants';

export const setAuth = () => {
  return {
    type: SET_AUTH
  };
};

export const setUnAuth = () => {
  return {
    type: SET_UN_AUTH
  };
};

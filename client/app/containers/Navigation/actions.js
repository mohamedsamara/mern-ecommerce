/*
 *
 * Navigation actions
 *
 */

import { TOGGLE_MENU, TOGGLE_CART } from './constants';

export const toggleMenu = () => {
  return {
    type: TOGGLE_MENU
  };
};

export const toggleCart = () => {
  return {
    type: TOGGLE_CART
  };
};

/*
 *
 * Navigation actions
 *
 */

import { TOGGLE_MENU, TOGGLE_CART, TOGGLE_BRAND } from './constants';

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

export const toggleBrand = value => {
  return {
    type: TOGGLE_BRAND,
    payload: value
  };
};

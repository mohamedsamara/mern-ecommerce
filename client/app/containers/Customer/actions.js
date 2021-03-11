/*
 *
 * Customer actions
 *
 */

import { push } from 'connected-react-router';
import { success, error, info } from 'react-notification-system-redux';
import axios from 'axios';

import { TOGGLE_CUSTOMER_MENU } from './constants';

export const toggleCustomerMenu = () => {
  return {
    type: TOGGLE_CUSTOMER_MENU
  };
};

/*
 *
 * Customer actions
 *
 */

import { push } from 'connected-react-router';
import { success, error, info } from 'react-notification-system-redux';
import axios from 'axios';

import { TOGGLE_ADMIN_MENU } from './constants';

export const toggleAdminMenu = () => {
  return {
    type: TOGGLE_ADMIN_MENU
  };
};

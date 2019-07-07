/**
 *
 * error.js
 * This is a generic error handler, it receves the error returned from the server and present it on a pop up
 */

import { error } from 'react-notification-system-redux';

import { signOut } from '../containers/Login/actions';

const handleError = (err, title, dispatch) => {
  const unsuccessfulOptions = {
    title: `${title}`,
    message: ``,
    position: 'tr',
    autoDismiss: 1
  };

  if (err.hasOwnProperty('response') && err.response.status != 401) {
    unsuccessfulOptions.message = err.response.data.error;
  } else if (err.hasOwnProperty('response') && err.response.status == 401) {
    unsuccessfulOptions.message = 'Unauthorized Access! Please login again';
    dispatch(signOut());
  } else if (err.message) {
    unsuccessfulOptions.message = err.message;
  } else if (err.request) {
    unsuccessfulOptions.message = err.request;
  } else {
    unsuccessfulOptions.message = err.message;
  }

  dispatch(error(unsuccessfulOptions));
};

export default handleError;

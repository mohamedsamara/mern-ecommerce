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

  if (err.response.data.error) {
    unsuccessfulOptions.message = err.response.data.error;
  } else if (err.response.status == 401) {
    unsuccessfulOptions.message = 'Unauthorized Access! Please login again';
    dispatch(signOut());
  } else if (err.request) {
    unsuccessfulOptions.message = err.request;
  } else {
    unsuccessfulOptions.message = err.message;
  }

  dispatch(error(unsuccessfulOptions));
};

export default handleError;

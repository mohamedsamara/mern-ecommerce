/**
 *
 * error.js
 * This is a generic error handler, it receives the error returned from the server and present it on a pop up
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

  if (err.response.status === 400) {
    unsuccessfulOptions.message = err.response.data.error;
  } else if (err.response.status === 404) {
    unsuccessfulOptions.message = err.response.data.message;
  } else if (err.response.status === 401) {
    unsuccessfulOptions.message = 'Unauthorized Access! Please login again';
    dispatch(signOut());
  } else {
    // fallback
    unsuccessfulOptions.message =
      'Your request could not be processed. Please try again.';
  }

  dispatch(error(unsuccessfulOptions));
};

export default handleError;

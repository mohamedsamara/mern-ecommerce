/**
 *
 * token.js
 * Here is the setup of axios default headers
 */

import axios from 'axios';

const setToken = token => {
  if (token) {
    axios.defaults.headers.common['Authorization'] = token;
  } else {
    delete axios.defaults.headers.common['Authorization'];
  }
};

export default setToken;

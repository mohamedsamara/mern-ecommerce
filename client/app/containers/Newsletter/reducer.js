/*
 *
 * Newsletter reducer
 *
 */

import { NEWSLETTER_CHANGE } from './constants';

const initialState = {
  email: ''
};

const newsletterReducer = (state = initialState, action) => {
  switch (action.type) {
    case NEWSLETTER_CHANGE:
      return {
        ...state,
        email: action.payload
      };

    default:
      return state;
  }
};

export default newsletterReducer;

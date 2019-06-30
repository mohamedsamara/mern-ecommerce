/*
 *
 * Newsletter reducer
 *
 */

import { NEWSLETTER_CHANGE, NEWSLETTER_RESET } from './constants';

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
    case NEWSLETTER_RESET:
      return {
        ...state,
        email: ''
      };
    default:
      return state;
  }
};

export default newsletterReducer;

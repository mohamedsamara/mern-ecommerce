/*
 *
 * Sell reducer
 *
 */

import { CONTACT_FORM_CHANGE, CONTACT_RESET } from './constants';

const initialState = {
  contactFormData: {
    name: '',
    email: '',
    message: ''
  }
};

const contactReducer = (state = initialState, action) => {
  switch (action.type) {
    case CONTACT_FORM_CHANGE:
      return {
        ...state,
        contactFormData: { ...state.contactFormData, ...action.payload }
      };
    case CONTACT_RESET:
      return {
        ...state,
        contactFormData: {
          name: '',
          email: '',
          message: ''
        }
      };
    default:
      return state;
  }
};

export default contactReducer;

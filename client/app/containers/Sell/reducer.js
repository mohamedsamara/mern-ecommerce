/*
 *
 * Sell reducer
 *
 */

import { SELL_FORM_CHANGE, SELL_FORM_CHANGE_RESET } from './constants';

const initialState = {
  sellFormData: {
    name: '',
    phoneNumber: '',
    brand: '',
    business: ''
  }
};

const sellReducer = (state = initialState, action) => {
  switch (action.type) {
    case SELL_FORM_CHANGE:
      return {
        ...state,
        sellFormData: { ...state.sellFormData, ...action.payload }
      };
    case SELL_FORM_CHANGE_RESET:
      return {
        ...state,
        sellFormData: {
          name: '',
          phoneNumber: '',
          brand: '',
          business: ''
        }
      };
    default:
      return state;
  }
};

export default sellReducer;

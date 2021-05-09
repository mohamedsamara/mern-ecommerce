/*
 *
 * Wishlist actions
 *
 */

import { success,warning, info } from 'react-notification-system-redux';
import { fetchStoreProducts } from '../Product/actions';
import axios from 'axios';

import {
  WISHLIST_CHANGE
} from './constants';
import handleError from '../../utils/error';

export const wishlistChange = (e) => {
  return async (dispatch, getState) => {

    try {
      if(getState().authentication.authenticated  == true){

        const wishlistData = {
          value:e.target.checked,
          name:e.target.name,
          id:e.target.id
        };

        dispatch({type: WISHLIST_CHANGE, payload: wishlistData})
        const wishlist = await getState().wishlist.wishlistData;

        const newWishlist = {
          isLiked:wishlist.value,
          product: wishlist.name
        };


        const response = await axios.post(`/api/wishlist`, newWishlist);

        const successfulOptions = {
          title: `${response.data.message}`,
          position: 'tr',
          autoDismiss: 1
        };

        if (response.data.success === true && wishlist.id !== "") {
          dispatch(success(successfulOptions));
        } else {
          dispatch(success(successfulOptions));
          dispatch(fetchStoreProducts());
        }
      } else {
        const retryOptions = {
          title: `Please login for wishlisting a product`,
          position: 'tr',
          autoDismiss: 1
        };
        dispatch(warning(retryOptions))
      }

    } catch (error) {
      handleError(error, dispatch);
    }
  };
};

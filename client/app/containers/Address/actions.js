/*
 *
 * Address actions
 *
 */

import { goBack } from 'connected-react-router';
import { success } from 'react-notification-system-redux';
import axios from 'axios';

import {
  FETCH_ADDRESS,
  FETCH_ADDRESSES,
  ADDRESS_CHANGE,
  ADDRESS_EDIT_CHANGE,
  SET_ADDRESS_FORM_ERRORS,
  SET_ADDRESS_FORM_EDIT_ERRORS,
  RESET_ADDRESS,
  ADD_ADDRESS,
  REMOVE_ADDRESS,
  SET_ADDRESS_LOADING,
  ADDRESS_SELECT
} from './constants';
import handleError from '../../utils/error';
import { allFieldsValidation } from '../../utils/validation';
import { API_URL } from '../../constants';

export const addressChange = (name, value) => {
  let formData = {};
  formData[name] = value;

  return {
    type: ADDRESS_CHANGE,
    payload: formData
  };
};

export const addressEditChange = (name, value) => {
  let formData = {};
  formData[name] = value;

  return {
    type: ADDRESS_EDIT_CHANGE,
    payload: formData
  };
};

export const handleAddressSelect = value => {
  return {
    type: ADDRESS_SELECT,
    payload: value
  };
};

export const setAddressLoading = value => {
  return {
    type: SET_ADDRESS_LOADING,
    payload: value
  };
};

export const fetchAddresses = () => {
  return async (dispatch, getState) => {
    try {
      dispatch(setAddressLoading(true));
      const response = await axios.get(`${API_URL}/address`);
      dispatch({ type: FETCH_ADDRESSES, payload: response.data.addresses });
    } catch (error) {
      handleError(error, dispatch);
    } finally {
      dispatch(setAddressLoading(false));
    }
  };
};

// fetch address api
export const fetchAddress = addressId => {
  return async (dispatch, getState) => {
    try {
      const response = await axios.get(`${API_URL}/address/${addressId}`);

      dispatch({
        type: FETCH_ADDRESS,
        payload: response.data.address
      });
    } catch (error) {
      handleError(error, dispatch);
    }
  };
};

export const addAddress = () => {
  return async (dispatch, getState) => {
    try {
      const rules = {
        address: 'required',
        city: 'required',
        state: 'required',
        country: 'required',
        zipCode: 'required|min:5'
      };

      const newAddress = getState().address.addressFormData;
      const isDefault = getState().address.isDefault;

      const { isValid, errors } = allFieldsValidation(newAddress, rules, {
        'required.address': 'Address is required.',
        'required.city': 'City is required.',
        'required.state': 'State is required.',
        'required.country': 'Country is required.',
        'required.zipCode': 'Zipcode is required.'
      });

      if (!isValid) {
        return dispatch({ type: SET_ADDRESS_FORM_ERRORS, payload: errors });
      }

      const address = {
        isDefault,
        ...newAddress
      };

      const response = await axios.post(`${API_URL}/address/add`, address);

      const successfulOptions = {
        title: `${response.data.message}`,
        position: 'tr',
        autoDismiss: 1
      };

      if (response.data.success === true) {
        dispatch(success(successfulOptions));
        dispatch({
          type: ADD_ADDRESS,
          payload: response.data.address
        });
        dispatch(goBack());
        dispatch({ type: RESET_ADDRESS });
      }
    } catch (error) {
      handleError(error, dispatch);
    }
  };
};

// update address api
export const updateAddress = () => {
  return async (dispatch, getState) => {
    try {
      const rules = {
        country: 'required',
        city: 'required',
        state: 'required',
        address: 'required',
        zipCode: 'required'
      };

      const newAddress = getState().address.address;

      const { isValid, errors } = allFieldsValidation(newAddress, rules, {
        'required.address': 'Address is required.',
        'required.city': 'City is required.',
        'required.state': 'State is required.',
        'required.country': 'Country is required.',
        'required.zipCode': 'Zipcode is required.'
      });

      if (!isValid) {
        return dispatch({
          type: SET_ADDRESS_FORM_EDIT_ERRORS,
          payload: errors
        });
      }

      const response = await axios.put(
        `${API_URL}/address/${newAddress._id}`,
        newAddress
      );

      const successfulOptions = {
        title: `${response.data.message}`,
        position: 'tr',
        autoDismiss: 1
      };

      if (response.data.success === true) {
        dispatch(success(successfulOptions));
        dispatch(goBack());
      }
    } catch (error) {
      handleError(error, dispatch);
    }
  };
};

// delete address api
export const deleteAddress = id => {
  return async (dispatch, getState) => {
    try {
      const response = await axios.delete(`${API_URL}/address/delete/${id}`);

      const successfulOptions = {
        title: `${response.data.message}`,
        position: 'tr',
        autoDismiss: 1
      };

      if (response.data.success === true) {
        dispatch(success(successfulOptions));
        dispatch({
          type: REMOVE_ADDRESS,
          payload: id
        });
        dispatch(goBack());
      }
    } catch (error) {
      handleError(error, dispatch);
    }
  };
};

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
  DEFAULT_CHANGE,
  DEFAULT_EDIT_CHANGE,
  SET_ADDRESS_LOADING,
  ADDRESS_SELECT,
  FETCH_ADDRESSES_SELECT
} from './constants';
import handleError from '../../utils/error';
import { allFieldsValidation } from '../../utils/validation';

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

export const defaultChange = () => {
    return {
      type: DEFAULT_CHANGE
    }
}

export const defaultEditChange = value => {
    return {
      type: DEFAULT_EDIT_CHANGE,
      payload: value
    }
}

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
      const response = await axios.get(`/api/address/list`);
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
      const response = await axios.get(`/api/address/${addressId}`);

      dispatch({
        type: DEFAULT_EDIT_CHANGE,
        payload: response.data.address.isDefault
      });

      delete response.data.address.isDefault

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
        fullName:'required',
        phoneNumber:'required',
        email:'required',
        cityName:'required',
        stateName:'required',
        address:'required',
        pinCode:'required|min:6'
      };

      const newAddress = getState().address.addressFormData;
      const isDefault = getState().address.isDefault;

      const { isValid, errors } = allFieldsValidation(newAddress, rules, {
        'required.fullName': 'Full Name is required.',
        'required.phoneNumber': 'Mobile Number is required.',
        'required.email': 'Email Id is required.',
        'required.cityName': 'City/Twon is required.',
        'required.stateName': 'State/District is required.',
        'required.address': 'Flat / House No., Floor, Building, Street is required.',
        'required.pinCode': 'pincode is required.',
        'min.pinCode': 'Pincode must be at least 6 characters.'
      });

      if (!isValid) {
        return dispatch({ type: SET_ADDRESS_FORM_ERRORS, payload: errors });
      }

      const address = {
        isDefault,
        ...newAddress
      }

      const response = await axios.post(`/api/address/add`, address);

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
        fullName:'required',
        phoneNumber:'required',
        email:'required',
        cityName:'required',
        stateName:'required',
        address:'required',
        pinCode:'required|min:6'
      };

      const newAddress = getState().address.address;
      const isDefault = getState().address.isDefault;

      const { isValid, errors } = allFieldsValidation(newAddress, rules, {
        'required.fullName': 'Full Name is required.',
        'required.phoneNumber': 'Mobile Number is required.',
        'required.email': 'Email Id is required.',
        'required.cityName': 'City/Twon is required.',
        'required.stateName': 'State/District is required.',
        'required.address': 'Flat / House No., Floor, Building, Street is required.',
        'required.pinCode': 'pincode is required.',
        'min.pinCode': 'Pincode must be at least 6 characters.'
      });

      if (!isValid) {
        return dispatch({ type: SET_ADDRESS_FORM_EDIT_ERRORS, payload: errors });
      }

      const updateAddress = {
        isDefault,
        ...newAddress
      }
      console.log(isDefault,getState().address.isDefault,newAddress);
      const response = await axios.put(`/api/address/${updateAddress._id}`, updateAddress);

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
      const response = await axios.delete(`/api/address/delete/${id}`);

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

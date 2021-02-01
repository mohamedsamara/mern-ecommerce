/*
 *
 * Brand actions
 *
 */

import { goBack } from 'connected-react-router';
import { success } from 'react-notification-system-redux';
import axios from 'axios';

import {
  FETCH_BRANDS,
  FETCH_STORE_BRANDS,
  FETCH_BRAND,
  BRAND_CHANGE,
  BRAND_EDIT_CHANGE,
  SET_BRAND_FORM_ERRORS,
  SET_BRAND_FORM_EDIT_ERRORS,
  RESET_BRAND,
  ADD_BRAND,
  REMOVE_BRAND,
  BRAND_SELECT,
  FETCH_BRANDS_SELECT
} from './constants';

import handleError from '../../utils/error';
import { formatSelectOptions } from '../../helpers/select';
import { allFieldsValidation } from '../../utils/validation';

export const brandChange = (name, value) => {
  let formData = {};
  formData[name] = value;

  return {
    type: BRAND_CHANGE,
    payload: formData
  };
};

export const brandEditChange = (name, value) => {
  let formData = {};
  formData[name] = value;

  return {
    type: BRAND_EDIT_CHANGE,
    payload: formData
  };
};

export const handleBrandSelect = value => {
  return {
    type: BRAND_SELECT,
    payload: value
  };
};

// fetch store brands api
export const fetchStoreBrands = () => {
  return async (dispatch, getState) => {
    try {
      const response = await axios.get(`/api/brand/list`);

      dispatch({
        type: FETCH_STORE_BRANDS,
        payload: response.data.brands
      });
    } catch (error) {
      handleError(error, dispatch);
    }
  };
};

// fetch brands api
export const fetchBrands = () => {
  return async (dispatch, getState) => {
    try {
      const response = await axios.get(`/api/brand`);

      dispatch({
        type: FETCH_BRANDS,
        payload: response.data.brands
      });
    } catch (error) {
      handleError(error, dispatch);
    }
  };
};

// fetch brand api
export const fetchBrand = brandId => {
  return async (dispatch, getState) => {
    try {
      const response = await axios.get(`/api/brand/${brandId}`);

      dispatch({
        type: FETCH_BRAND,
        payload: response.data.brand
      });
    } catch (error) {
      handleError(error, dispatch);
    }
  };
};

// fetch brands select api
export const fetchBrandsSelect = () => {
  return async (dispatch, getState) => {
    try {
      const response = await axios.get(`/api/brand/list/select`);

      let formattedBrands = formatSelectOptions(response.data.brands);

      dispatch({
        type: FETCH_BRANDS_SELECT,
        payload: formattedBrands
      });
    } catch (error) {
      handleError(error, dispatch);
    }
  };
};

// add brand api
export const addBrand = () => {
  return async (dispatch, getState) => {
    try {
      const rules = {
        name: 'required|min:6',
        description: 'required|min:10|max:100'
      };

      const brand = getState().brand.brandFormData;

      const { isValid, errors } = allFieldsValidation(brand, rules, {
        'required.name': 'Name is required.',
        'min.name': 'Name must be at least 6 characters.',
        'required.description': 'Description is required.',
        'min.description': 'Description must be at least 10 characters.',
        'max.description': 'Description may not be greater than 100 characters.'
      });

      if (!isValid) {
        return dispatch({ type: SET_BRAND_FORM_ERRORS, payload: errors });
      }

      const response = await axios.post(`/api/brand/add`, brand);

      const successfulOptions = {
        title: `${response.data.message}`,
        position: 'tr',
        autoDismiss: 1
      };

      if (response.data.success === true) {
        dispatch(success(successfulOptions));
        dispatch({
          type: ADD_BRAND,
          payload: response.data.brand
        });

        dispatch(goBack());
        dispatch({ type: RESET_BRAND });
      }
    } catch (error) {
      handleError(error, dispatch);
    }
  };
};

// update brand api
export const updateBrand = () => {
  return async (dispatch, getState) => {
    try {
      const rules = {
        name: 'required|min:6',
        description: 'required|min:10|max:100'
      };

      const brand = getState().brand.brand;

      const newBrand = {
        name: brand.name,
        description: brand.description
      };

      const { isValid, errors } = allFieldsValidation(newBrand, rules, {
        'required.name': 'Name is required.',
        'min.name': 'Name must be at least 6 characters.',
        'required.description': 'Description is required.',
        'min.description': 'Description must be at least 10 characters.',
        'max.description': 'Description may not be greater than 100 characters.'
      });

      if (!isValid) {
        return dispatch({ type: SET_BRAND_FORM_EDIT_ERRORS, payload: errors });
      }

      const response = await axios.put(`/api/brand/${brand._id}`, {
        brand: newBrand
      });

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

// delete brand api
export const deleteBrand = id => {
  return async (dispatch, getState) => {
    try {
      const response = await axios.delete(`/api/brand/delete/${id}`);

      const successfulOptions = {
        title: `${response.data.message}`,
        position: 'tr',
        autoDismiss: 1
      };

      if (response.data.success === true) {
        dispatch(success(successfulOptions));
        dispatch({
          type: REMOVE_BRAND,
          payload: id
        });
        dispatch(goBack());
      }
    } catch (error) {
      handleError(error, dispatch);
    }
  };
};

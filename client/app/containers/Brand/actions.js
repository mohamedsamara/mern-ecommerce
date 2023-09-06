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
  ADD_BRAND,
  REMOVE_BRAND,
  FETCH_BRANDS_SELECT,
  SET_BRANDS_LOADING,
  RESET_BRAND
} from './constants';

import handleError from '../../utils/error';
import { formatSelectOptions } from '../../utils/select';
import { allFieldsValidation } from '../../utils/validation';
import { API_URL } from '../../constants';

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

// fetch store brands api
export const fetchStoreBrands = () => {
  return async (dispatch, getState) => {
    try {
      const response = await axios.get(`${API_URL}/brand/list`);

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
      dispatch({ type: SET_BRANDS_LOADING, payload: true });

      const response = await axios.get(`${API_URL}/brand`);

      dispatch({
        type: FETCH_BRANDS,
        payload: response.data.brands
      });
    } catch (error) {
      handleError(error, dispatch);
    } finally {
      dispatch({ type: SET_BRANDS_LOADING, payload: false });
    }
  };
};

// fetch brand api
export const fetchBrand = brandId => {
  return async (dispatch, getState) => {
    try {
      const response = await axios.get(`${API_URL}/brand/${brandId}`);

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
      const response = await axios.get(`${API_URL}/brand/list/select`);

      const formattedBrands = formatSelectOptions(response.data.brands, true);

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
        name: 'required',
        description: 'required|max:200'
      };

      const brand = getState().brand.brandFormData;

      const { isValid, errors } = allFieldsValidation(brand, rules, {
        'required.name': 'Name is required.',
        'required.description': 'Description is required.',
        'max.description': 'Description may not be greater than 200 characters.'
      });

      if (!isValid) {
        return dispatch({ type: SET_BRAND_FORM_ERRORS, payload: errors });
      }

      const response = await axios.post(`${API_URL}/brand/add`, brand);

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
        name: 'required',
        slug: 'required|alpha_dash',
        description: 'required|max:200'
      };

      const brand = getState().brand.brand;

      const newBrand = {
        name: brand.name,
        slug: brand.slug,
        description: brand.description
      };

      const { isValid, errors } = allFieldsValidation(newBrand, rules, {
        'required.name': 'Name is required.',
        'required.slug': 'Slug is required.',
        'alpha_dash.slug':
          'Slug may have alpha-numeric characters, as well as dashes and underscores only.',
        'required.description': 'Description is required.',
        'max.description': 'Description may not be greater than 200 characters.'
      });

      if (!isValid) {
        return dispatch({ type: SET_BRAND_FORM_EDIT_ERRORS, payload: errors });
      }

      const response = await axios.put(`${API_URL}/brand/${brand._id}`, {
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

// activate brand api
export const activateBrand = (id, value) => {
  return async (dispatch, getState) => {
    try {
      const response = await axios.put(`${API_URL}/brand/${id}/active`, {
        brand: {
          isActive: value
        }
      });

      const successfulOptions = {
        title: `${response.data.message}`,
        position: 'tr',
        autoDismiss: 1
      };

      if (response.data.success === true) {
        dispatch(success(successfulOptions));

        const brand = getState().brand.brand;
        dispatch(fetchBrand(brand._id));
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
      const response = await axios.delete(`${API_URL}/brand/delete/${id}`);

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

/*
 *
 * Product actions
 *
 */

import { goBack } from 'connected-react-router';
import { success } from 'react-notification-system-redux';
import axios from 'axios';

import {
  FETCH_PRODUCTS,
  FETCH_STORE_PRODUCTS,
  FETCH_PRODUCT,
  FETCH_STORE_PRODUCT,
  PRODUCT_CHANGE,
  PRODUCT_EDIT_CHANGE,
  PRODUCT_SHOP_CHANGE,
  SET_PRODUCT_FORM_ERRORS,
  SET_PRODUCT_FORM_EDIT_ERRORS,
  RESET_PRODUCT,
  ADD_PRODUCT,
  REMOVE_PRODUCT,
  FETCH_PRODUCTS_SELECT,
  SET_PRODUCTS_LOADING,
  ADD_REVIEW,
  FETCH_REVIEWS,
  REVIEW_CHANGE,
  RESET_REVIEW,
  SET_REVIEW_FORM_ERRORS
} from './constants';

import handleError from '../../utils/error';
import {
  formatSelectOptions,
  unformatSelectOptions
} from '../../helpers/select';
import { allFieldsValidation } from '../../utils/validation';

export const productChange = (name, value) => {
  let formData = {};
  formData[name] = value;
  return {
    type: PRODUCT_CHANGE,
    payload: formData
  };
};

export const productEditChange = (name, value) => {
  let formData = {};
  formData[name] = value;

  return {
    type: PRODUCT_EDIT_CHANGE,
    payload: formData
  };
};

export const productShopChange = (name, value) => {
  let formData = {};
  formData[name] = value;

  return {
    type: PRODUCT_SHOP_CHANGE,
    payload: formData
  };
};

export const resetProduct = () => {
  return async (dispatch, getState) => {
    dispatch({ type: RESET_PRODUCT });
  };
};

// fetch products api
export const fetchProducts = () => {
  return async (dispatch, getState) => {
    try {
      const response = await axios.get(`/api/product`);

      dispatch({
        type: FETCH_PRODUCTS,
        payload: response.data.products
      });
    } catch (error) {
      handleError(error, dispatch);
    }
  };
};

// fetch store products api
export const fetchStoreProducts = () => {
  return async (dispatch, getState) => {
    dispatch({ type: SET_PRODUCTS_LOADING, payload: true });

    try {
      const response = await axios.get(`/api/product/list`);
      dispatch({
        type: FETCH_STORE_PRODUCTS,
        payload: response.data.products
      });
    } catch (error) {
      handleError(error, dispatch);
    } finally {
      dispatch({ type: SET_PRODUCTS_LOADING, payload: false });
    }
  };
};

// fetch product api
export const fetchProduct = id => {
  return async (dispatch, getState) => {
    try {
      const response = await axios.get(`/api/product/${id}`);

      const inventory = response.data.product.quantity;
      if (response.data.product.brand) {
        response.data.product.brand = formatSelectOptions([
          response.data.product.brand
        ])[0];
      }

      const product = { ...response.data.product, inventory };

      dispatch({
        type: FETCH_PRODUCT,
        payload: product
      });
    } catch (error) {
      handleError(error, dispatch);
    }
  };
};

// fetch store product api
export const fetchStoreProduct = slug => {
  return async (dispatch, getState) => {
    dispatch({ type: SET_PRODUCTS_LOADING, payload: true });

    try {
      const response = await axios.get(`/api/product/item/${slug}`);

      const inventory = response.data.product.quantity;
      const product = { ...response.data.product, inventory };

      dispatch({
        type: FETCH_STORE_PRODUCT,
        payload: product
      });
    } catch (error) {
      handleError(error, dispatch);
    } finally {
      dispatch({ type: SET_PRODUCTS_LOADING, payload: false });
    }
  };
};

export const fetchBrandProducts = slug => {
  return async (dispatch, getState) => {
    dispatch({ type: SET_PRODUCTS_LOADING, payload: true });

    try {
      const response = await axios.get(`/api/product/list/brand/${slug}`);

      dispatch({
        type: FETCH_PRODUCTS,
        payload: response.data.products
      });
    } catch (error) {
      handleError(error, dispatch);
    } finally {
      dispatch({ type: SET_PRODUCTS_LOADING, payload: false });
    }
  };
};

export const fetchCategoryProducts = slug => {
  return async (dispatch, getState) => {
    dispatch({ type: SET_PRODUCTS_LOADING, payload: true });

    try {
      const response = await axios.get(`/api/product/list/category/${slug}`);

      dispatch({
        type: FETCH_PRODUCTS,
        payload: response.data.products
      });
    } catch (error) {
      handleError(error, dispatch);
    } finally {
      dispatch({ type: SET_PRODUCTS_LOADING, payload: false });
    }
  };
};

export const fetchProductsSelect = () => {
  return async (dispatch, getState) => {
    try {
      const response = await axios.get(`/api/product/list/select`);

      const formattedProducts = formatSelectOptions(response.data.products);

      dispatch({
        type: FETCH_PRODUCTS_SELECT,
        payload: formattedProducts
      });
    } catch (error) {
      handleError(error, dispatch);
    }
  };
};

// add product api
export const addProduct = () => {
  return async (dispatch, getState) => {
    try {
      const rules = {
        sku: 'required',
        name: 'required',
        description: 'required|max:200',
        quantity: 'required|numeric',
        price: 'required|numeric',
        taxable: 'required',
        brand: 'required',
        image: 'required'
      };

      const product = getState().product.productFormData;
      const user = getState().account.user;
      const brands = getState().brand.brandsSelect;

      const brand = unformatSelectOptions([product.brand]);

      const newProduct = {
        sku: product.sku,
        name: product.name,
        description: product.description,
        price: product.price,
        quantity: product.quantity,
        image: product.image,
        isActive: product.isActive,
        taxable: product.taxable.value,
        brand:
          user.role !== 'ROLE_MERCHANT'
            ? brand != 0
              ? brand
              : null
            : brands[1].value
      };

      const { isValid, errors } = allFieldsValidation(newProduct, rules, {
        'required.sku': 'Sku is required.',
        'required.name': 'Name is required.',
        'required.description': 'Description is required.',
        'max.description':
          'Description may not be greater than 200 characters.',
        'required.quantity': 'Quantity is required.',
        'required.price': 'Price is required.',
        'required.taxable': 'Taxable is required.',
        'required.brand': 'Brand is required.',
        'required.image': 'Please upload files with jpg, jpeg, png format.'
      });

      if (!isValid) {
        return dispatch({ type: SET_PRODUCT_FORM_ERRORS, payload: errors });
      }
      const formData = new FormData();
      if (newProduct.image) {
        for (var key in newProduct) {
          if (newProduct.hasOwnProperty(key)) {
            formData.append(key, newProduct[key]);
          }
        }
      }

      const response = await axios.post(`/api/product/add`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });

      const successfulOptions = {
        title: `${response.data.message}`,
        position: 'tr',
        autoDismiss: 1
      };

      if (response.data.success === true) {
        dispatch(success(successfulOptions));
        dispatch({
          type: ADD_PRODUCT,
          payload: response.data.product
        });
        dispatch(resetProduct());
        dispatch(goBack());
      }
    } catch (error) {
      handleError(error, dispatch);
    }
  };
};

// update Product api
export const updateProduct = () => {
  return async (dispatch, getState) => {
    try {
      const rules = {
        name: 'required',
        description: 'required|max:200',
        quantity: 'required|numeric',
        price: 'required|numeric',
        taxable: 'required',
        brand: 'required'
      };

      const product = getState().product.product;

      const brand = unformatSelectOptions([product.brand]);

      const newProduct = {
        name: product.name,
        description: product.description,
        quantity: product.quantity,
        price: product.price,
        taxable: product.taxable,
        brand: brand != 0 ? brand : null
      };

      const { isValid, errors } = allFieldsValidation(newProduct, rules, {
        'required.name': 'Name is required.',
        'required.description': 'Description is required.',
        'max.description':
          'Description may not be greater than 200 characters.',
        'required.quantity': 'Quantity is required.',
        'required.price': 'Price is required.',
        'required.taxable': 'Taxable is required.',
        'required.brand': 'Brand is required.'
      });

      if (!isValid) {
        return dispatch({
          type: SET_PRODUCT_FORM_EDIT_ERRORS,
          payload: errors
        });
      }

      const response = await axios.put(`/api/product/${product._id}`, {
        product: newProduct
      });

      const successfulOptions = {
        title: `${response.data.message}`,
        position: 'tr',
        autoDismiss: 1
      };

      if (response.data.success === true) {
        dispatch(success(successfulOptions));

        //dispatch(goBack());
      }
    } catch (error) {
      handleError(error, dispatch);
    }
  };
};

// activate product api
export const activateProduct = (id, value) => {
  return async (dispatch, getState) => {
    try {
      const response = await axios.put(`/api/product/${id}/active`, {
        product: {
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
      }
    } catch (error) {
      handleError(error, dispatch);
    }
  };
};

// delete product api
export const deleteProduct = id => {
  return async (dispatch, getState) => {
    try {
      const response = await axios.delete(`/api/product/delete/${id}`);

      const successfulOptions = {
        title: `${response.data.message}`,
        position: 'tr',
        autoDismiss: 1
      };

      if (response.data.success === true) {
        dispatch(success(successfulOptions));
        dispatch({
          type: REMOVE_PRODUCT,
          payload: id
        });
        dispatch(goBack());
      }
    } catch (error) {
      handleError(error, dispatch);
    }
  };
};

export const reviewChange = (name, value) => {
  let formData = {};
  formData[name] = value;
  return {
    type: REVIEW_CHANGE,
    payload: formData
  };
};

export const addProductReview = () => {
  return async (dispatch, getState) => {
    try {
      const rules = {
        title: 'required',
        review: 'required',
        rating: 'required|numeric|min:1',
        isRecommended: 'required'
      };

      const review = getState().product.reviewFormData;
      const product = getState().product.storeProduct;

      const newReview = {
        ...review,
        product: product._id
      };

      const { isValid, errors } = allFieldsValidation(newReview, rules, {
        'required.title': 'Title is required.',
        'required.review': 'Review is required.',
        'required.rating': 'Rating is required.',
        'min.rating': 'Rating is required.',
        'required.isRecommended': 'Recommendable is required.'
      });

      if (!isValid) {
        return dispatch({ type: SET_REVIEW_FORM_ERRORS, payload: errors });
      }

      const response = await axios.post(`/api/review/add`, newReview);

      const successfulOptions = {
        title: `${response.data.message}`,
        position: 'tr',
        autoDismiss: 1
      };

      if (response.data.success === true) {
        dispatch(success(successfulOptions));
        dispatch(fetchProductReviews(product.slug));

        // dispatch({
        //   type: ADD_REVIEW,
        //   payload: response.data.review
        // });
        dispatch({ type: RESET_REVIEW });
      }
    } catch (error) {
      handleError(error, dispatch);
    }
  };
};

// fetch reviews api
export const fetchProductReviews = slug => {
  return async (dispatch, getState) => {
    try {
      const response = await axios.get(`/api/review/${slug}`);

      const {
        ratingSummary,
        totalRatings,
        totalReviews,
        totalSummary
      } = getProductReviewsSummary(response.data.reviews);

      dispatch({
        type: FETCH_REVIEWS,
        payload: {
          reviews: response.data.reviews,
          reviewsSummary: {
            ratingSummary,
            totalRatings,
            totalReviews,
            totalSummary
          }
        }
      });
    } catch (error) {
      handleError(error, dispatch);
    }
  };
};

const getProductReviewsSummary = reviews => {
  let ratingSummary = [{ 5: 0 }, { 4: 0 }, { 3: 0 }, { 2: 0 }, { 1: 0 }];
  let totalRatings = 0;
  let totalReviews = 0;
  let totalSummary = 0;

  if (reviews.length > 0) {
    reviews.map((item, i) => {
      totalRatings += item.rating;
      totalReviews += 1;

      switch (Math.round(item.rating)) {
        case 5:
          ratingSummary[0][5] += 1;
          totalSummary += 1;
          break;
        case 4:
          ratingSummary[1][4] += 1;
          totalSummary += 1;

          break;
        case 3:
          ratingSummary[2][3] += 1;
          totalSummary += 1;

          break;
        case 2:
          ratingSummary[3][2] += 1;
          totalSummary += 1;

          break;
        case 1:
          ratingSummary[4][1] += 1;
          totalSummary += 1;

          break;
        default:
          0;
          break;
      }
    });
  }

  return { ratingSummary, totalRatings, totalReviews, totalSummary };
};

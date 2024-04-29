/*
 *
 * Review actions
 *
 */

import { success } from 'react-notification-system-redux';
import axios from 'axios';
import DOMPurify from 'dompurify';

import {
  FETCH_REVIEWS,
  SET_REVIEWS_LOADING,
  ADD_REVIEW,
  REMOVE_REVIEW,
  FETCH_PRODUCT_REVIEWS,
  REVIEW_CHANGE,
  RESET_REVIEW,
  SET_REVIEW_FORM_ERRORS,
  SET_ADVANCED_FILTERS
} from './constants';
import handleError from '../../utils/error';
import { allFieldsValidation, santizeFields } from '../../utils/validation';
import { API_URL } from '../../constants';

export const reviewChange = (name, value) => {
  let formData = {};
  formData[name] = value;
  return {
    type: REVIEW_CHANGE,
    payload: formData
  };
};

// fetch reviews api
export const fetchReviews = (n, v) => {
  return async (dispatch, getState) => {
    try {
      dispatch({ type: SET_REVIEWS_LOADING, payload: true });

      const response = await axios.get(`${API_URL}/review`, {
        params: {
          page: v ?? 1,
          limit: 20
        }
      });

      const { reviews, totalPages, currentPage, count } = response.data;

      dispatch({ type: FETCH_REVIEWS, payload: reviews });
      dispatch({
        type: SET_ADVANCED_FILTERS,
        payload: { totalPages, currentPage, count }
      });
    } catch (error) {
      handleError(error, dispatch);
    } finally {
      dispatch({ type: SET_REVIEWS_LOADING, payload: false });
    }
  };
};

export const approveReview = review => {
  return async (dispatch, getState) => {
    try {
      await axios.put(`${API_URL}/review/approve/${review._id}`);

      dispatch(fetchReviews());
    } catch (error) {
      handleError(error, dispatch);
    }
  };
};

export const rejectReview = review => {
  return async (dispatch, getState) => {
    try {
      await axios.put(`${API_URL}/review/reject/${review._id}`);

      dispatch(fetchReviews());
    } catch (error) {
      handleError(error, dispatch);
    }
  };
};

// delete review api
export const deleteReview = id => {
  return async (dispatch, getState) => {
    try {
      const response = await axios.delete(`${API_URL}/review/delete/${id}`);

      const successfulOptions = {
        title: `${response.data.message}`,
        position: 'tr',
        autoDismiss: 1
      };

      if (response.data.success == true) {
        dispatch(success(successfulOptions));
        dispatch({
          type: REMOVE_REVIEW,
          payload: id
        });
      }
    } catch (error) {
      handleError(error, dispatch);
    }
  };
};

// fetch product reviews api
export const fetchProductReviews = slug => {
  return async (dispatch, getState) => {
    try {
      const response = await axios.get(`${API_URL}/review/${slug}`);

      const { ratingSummary, totalRatings, totalReviews, totalSummary } =
        getProductReviewsSummary(response.data.reviews);

      dispatch({
        type: FETCH_PRODUCT_REVIEWS,
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

export const addProductReview = () => {
  return async (dispatch, getState) => {
    try {
      const rules = {
        title: 'required',
        review: 'required',
        rating: 'required|numeric|min:1',
        isRecommended: 'required'
      };

      const review = getState().review.reviewFormData;
      const product = getState().product.storeProduct;

      const newReview = {
        product: product._id,
        isRecommended: review.isRecommended.value,
        rating: review.rating,
        review: review.review,
        title: review.title
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

      const santizedReview = santizeFields(newReview);

      const response = await axios.post(`${API_URL}/review/add`, {
        ...santizedReview,
        isRecommended: review.isRecommended.value
      });

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

export const getProductReviewsSummary = reviews => {
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

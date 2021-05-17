/**
 *
 * ReviewList
 *
 */

import React from 'react';

import { Link } from 'react-router-dom';

import { formatDate } from '../../../helpers/date';
import { getRandomColors } from '../../../helpers';
import Button from '../../Common/Button';
import { CheckIcon, RefreshIcon, TrashIcon } from '../../Common/Icon';

const ReviewList = props => {
  const { reviews, approveReview, rejectReview, deleteReview } = props;

  const getAvatar = review => {
    const color = getRandomColors();
    if (review.user.firstName) {
      return (
        <div
          className='d-flex flex-column justify-content-center align-items-center fw-1 text-white avatar'
          style={{ backgroundColor: color ? color : 'red' }}
        >
          {review.user.firstName.charAt(0)}
        </div>
      );
    }
  };

  const getProduct = review => {
    if (review.product) {
      const product = review.product;
      return (
        <div className='d-flex flex-column justify-content-center align-items-center'>
          <img
            className='item-image'
            src={`${
              product.imageUrl
                ? product.imageUrl
                : '/images/placeholder-image.png'
            }`}
          />
        </div>
      );
    }
  };

  return (
    <div className='r-list'>
      {reviews.map((review, index) => (
        <div key={index} className='review-box'>
          <div className='mb-3 p-4'>
            <div className='d-flex flex-row mx-0 mb-2 mb-lg-3 align-items-center justify-content-between'>
              <p className='mb-0 fw-2 text-truncate'>{review.title}</p>
              {getAvatar(review)}
            </div>
            <div className='d-flex flex-column flex-lg-row mx-0 mb-3 align-items-start justify-content-between'>
              <div className='w-100 mb-3 mb-lg-0 review-product-box'>
                <Link
                  to={`/product/${review.product.slug}`}
                  className='default-link'
                >
                  {review?.product.name}
                </Link>
                <p className='mt-1 mb-0 fw-2 word-break-all'>{review.review}</p>
              </div>
              {getProduct(review)}
            </div>
            <label className='text-black'>{`Review Added on ${formatDate(
              review.created
            )}`}</label>
            <hr />
            {review.status === 'Approved' ? (
              <div className='d-flex flex-column flex-lg-row justify-content-between align-items-lg-center mx-0'>
                <div className='d-flex flex-row mx-0'>
                  <CheckIcon className='text-green' />
                  <p className='ml-2 mb-0'>Approved</p>
                </div>
                <Button
                  className='mt-3 mt-lg-0'
                  text='Delete'
                  icon={<TrashIcon width={15} />}
                  onClick={() => deleteReview(review._id)}
                />
              </div>
            ) : review.status === 'Rejected' ? (
              <>
                <div className='d-flex align-items-center mb-3'>
                  <RefreshIcon className='text-primary' />
                  <p className='fw-2 ml-3 mb-0'>Re Approve Review</p>
                </div>
                <div className='d-flex flex-column flex-lg-row justify-content-between align-items-lg-center mx-0'>
                  <Button
                    className='text-uppercase'
                    variant='primary'
                    size='md'
                    text='Approve'
                    onClick={() => approveReview(review)}
                  />
                  <Button
                    className='mt-3 mt-lg-0'
                    text='Delete'
                    icon={<TrashIcon width={15} />}
                    onClick={() => deleteReview(review._id)}
                  />
                </div>
              </>
            ) : (
              <div className='d-flex flex-column flex-lg-row justify-content-between align-items-lg-center mx-0'>
                <div className='d-flex flex-column flex-lg-row mx-0'>
                  <Button
                    variant='dark'
                    className='text-uppercase'
                    size='md'
                    text='Approve'
                    onClick={() => approveReview(review)}
                  />
                  <Button
                    variant='danger'
                    className='mt-3 mt-lg-0 ml-lg-2 text-uppercase'
                    size='md'
                    text='Reject'
                    onClick={() => rejectReview(review)}
                  />
                </div>
                <Button
                  className='mt-3 mt-lg-0'
                  text='Delete'
                  icon={<TrashIcon width={15} />}
                  onClick={() => deleteReview(review._id)}
                />
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default ReviewList;

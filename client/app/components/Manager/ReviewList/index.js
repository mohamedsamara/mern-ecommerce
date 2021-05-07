/**
 *
 * ReviewList
 *
 */

import React from 'react';

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

  return (
    <div className='reviews-list'>
      {reviews.map((review, index) => (
        <div key={index} className='review-box'>
          <div className='mb-3 p-4'>
            <div className='d-flex align-items-center justify-content-between'>
              <p className='fw-2 text-truncate'>{review.title}</p>
              {getAvatar(review)}
            </div>

            <label className='text-black'>Review</label>
            <p className='word-break-all'>{review.review}</p>
            <label className='text-black'>Review date</label>
            <p>{formatDate(review.created)}</p>
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

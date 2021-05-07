/**
 *
 * ReviewList
 *
 */

import React from 'react';

import { formatDate } from '../../../helpers/date';
import Button from '../../Common/Button';
import { CheckIcon, RefreshIcon, TrashIcon } from '../../Common/Icon';

const ReviewList = props => {
  const { reviews, approveReview, rejectReview, deleteReview } = props;

  return (
    <div className='reviews-list'>
      {reviews.map((review, index) => (
        <div key={index} className='review-box'>
          <div className='mb-3 p-4'>
            <label className='text-black'>Title</label>
            <p className='fw-2 text-truncate'>{review.title}</p>
            <label className='text-black'>Review</label>
            <p className='text-truncate'>{review.review}</p>
            <label className='text-black'>Review date</label>
            <p>{formatDate(review.created)}</p>

            <hr />

            {/* enum: ['Waiting Approval', 'Rejected', 'Approved'] */}

            {/* Waiting Approval */}
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

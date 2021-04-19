/**
 *
 * ReviewList
 *
 */

import React from 'react';
import ReactStars from 'react-rating-stars-component';

import { Link } from 'react-router-dom';

import { formatDate } from '../../../helpers/date';
import { ReviewIcon } from '../../Common/Icon';

const List = props => {
  const { reviews } = props;

  const getAvatar = review => {
    if (review.user.firstName) {
      return review.user.firstName.charAt(0);
    }
  };

  return (
    <div className='review-list'>
      {reviews.map((review, index) => (
        <div className='d-flex align-items-center mb-3 review-box' key={index}>
          <div className='mx-3'>
            <div className='avatar'>{getAvatar(review)}</div>
          </div>
          <div className='flex-1 p-3 p-lg-4'>
            <div className='d-flex align-items-center justify-content-between mb-2'>
              <h4 className='mb-0 mr-2 one-line-ellipsis'>{review.title}</h4>
              <ReactStars
                size={16.5}
                edit={false}
                color={'black'}
                activeColor={'#ffb302'}
                a11y={true}
                isHalf={true}
                emptyIcon={<i className='fa fa-star' />}
                halfIcon={<i className='fa fa-star-half-alt' />}
                filledIcon={<i className='fa fa-star' />}
                value={review.rating}
              />
              <p className='review-desc mb-2'>
                {formatDate(`${review?.created}`)}
              </p>
            </div>
            <p className='review-desc mb-2'>{`${review?.review}`}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default List;

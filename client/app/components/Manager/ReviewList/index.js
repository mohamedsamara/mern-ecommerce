/**
 *
 * ReviewList
 *
 */

import React from 'react';
import ReactStars from "react-rating-stars-component";

import { Link } from 'react-router-dom';

import { ReviewIcon  } from '../../Common/Icon';
import { formatDate } from '../../../helpers/date';

const ReviewList = props => {

  const { reviews } = props

  return (
    <div className='r-list'>
      {reviews.map((review, index) => (
        <div className='d-flex align-items-center mb-3 review-box' key={index}>
          <div className='mx-3'>
            <ReviewIcon />
          </div>
          <div className='flex-1 p-3 p-lg-4'>
              <div className='d-flex align-items-center justify-content-between mb-2'>
                <h4 className='mb-0 mr-2 one-line-ellipsis'>
                  {review.title}
                </h4>
                <ReactStars
                  size= {16.5}
                  value={review.rating}
                  edit={false}
                  color= {"black"}
                  activeColor= {"#FFB302"}
                  a11y= {true}
                  isHalf= {true}
                  emptyIcon= {<i className="far fa-star" />}
                  halfIcon= {<i className="fa fa-star-half-alt" />}
                  filledIcon= {<i className="fa fa-star" />}
                />
                <p className='review-desc mb-2'>
                  {formatDate(`${review?.created}`)}
                </p>
              </div>
            <p className='review-desc mb-2'>
              {`${review?.review}`}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ReviewList;

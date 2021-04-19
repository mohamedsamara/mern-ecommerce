/**
 *
 * WriteReview
 *
 */

import React from 'react';

import { Row, Col, Label } from 'reactstrap';
import ReactStars from 'react-rating-stars-component';

import NotFound from '../../Common/NotFound';

const Summary = props => {
  const {
    reviewsSummary: { ratingSummary, totalRatings, totalReviews, totalSummary }
  } = props;

  const getRatingPercentage = value => {
    return parseInt(percentage(value, totalSummary).toFixed(2));
  };

  const averageRating =
    totalRatings > 0 && Math.round(totalRatings / totalReviews);

  return (
    <div className='review-summary'>
      <h2 className='mb-0'>Rating</h2>
      {averageRating && (
        <div className='d-flex align-items-center'>
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
            value={averageRating}
          />
          {totalReviews > 0 && (
            <span className='ml-2'>based on {totalReviews} reviews.</span>
          )}
        </div>
      )}

      <hr style={{ border: '3px solid #f1f1f1' }} />
      {totalReviews > 0 ? (
        ratingSummary.map((r, obj) => (
          <div key={obj} className='d-flex align-items-center mb-2'>
            <div className='left'>
              <span>{parseInt(Object.keys(r)[0])} star</span>
            </div>
            <div className='middle'>
              <div className='bar-container'>
                <div
                  className={`bar-${parseInt(Object.keys(r)[0])}`}
                  style={{
                    width: `${getRatingPercentage(
                      parseInt(r[Object.keys(r)[0]])
                    )}%`
                  }}
                ></div>
              </div>
            </div>
            <div className='right'>
              <span className='fw-2'>
                {getRatingPercentage(parseInt(r[Object.keys(r)[0]]))}%
              </span>
            </div>
          </div>
        ))
      ) : (
        <NotFound>
          <p className='mb-2'>No reviews found.</p>
          <p className='mb-2'>Be the first to add a review.</p>
        </NotFound>
      )}
    </div>
  );
};

export default Summary;

function percentage(partialValue, totalValue) {
  return (100 * partialValue) / totalValue;
}

/**
 *
 * ProductReviews
 *
 */

import React from 'react';
import { Row, Col } from 'reactstrap';

import AddReview from './Add';
import ReviewList from './List';
import ReviewSummary from './Summary';

const ProductReviews = props => {
  return (
    <div className='mt-md-4 product-reviews'>
      <Row className='flex-row'>
        <Col xs='12' md='5' lg='5' className='mb-3 px-3 px-md-2'>
          {Object.keys(props.reviewsSummary).length > 0 && (
            <ReviewSummary reviewsSummary={props.reviewsSummary} />
          )}
        </Col>

        {props.reviews.length > 0 && (
          <Col xs='12' md='7' lg='7' className='mb-3 px-3 px-md-2'>
            <ReviewList reviews={props.reviews} />
          </Col>
        )}

        {props.reviews.length > 0 && (
          <Col xs='12' md='5' lg='5' className='mb-3 px-3 px-md-2'></Col>
        )}
        <Col xs='12' md='7' lg='7' className='mb-3 px-3 px-md-2'>
          <AddReview
            recommedableSelect={props.recommedableSelect}
            reviewFormData={props.reviewFormData}
            reviewChange={props.reviewChange}
            reviewFormErrors={props.reviewFormErrors}
            addReview={props.addReview}
          />
        </Col>
      </Row>
    </div>
  );
};

export default ProductReviews;

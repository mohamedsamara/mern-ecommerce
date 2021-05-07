/*
 *
 * Review
 *
 */

import React from 'react';
import { connect } from 'react-redux';

import actions from '../../actions';

import SubPage from '../../components/Manager/SubPage';
import LoadingIndicator from '../../components/Common/LoadingIndicator';
import NotFound from '../../components/Common/NotFound';
import ReviewList from '../../components/Manager/ReviewList';

class Review extends React.PureComponent {
  componentDidMount() {
    this.props.fetchReviews();
  }

  render() {
    const {
      reviews,
      isLoading,
      approveReview,
      rejectReview,
      deleteReview
    } = this.props;

    return (
      <div className='review-dashboard'>
        <SubPage title={'Reviews'} isMenuOpen={null}>
          {isLoading ? (
            <LoadingIndicator inline />
          ) : reviews.length > 0 ? (
            <ReviewList
              reviews={reviews}
              approveReview={approveReview}
              rejectReview={rejectReview}
              deleteReview={deleteReview}
            />
          ) : (
            <NotFound message='no reviews found.' />
          )}
        </SubPage>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    reviews: state.review.reviews,
    isLoading: state.review.isLoading
  };
};

export default connect(mapStateToProps, actions)(Review);

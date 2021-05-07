/*
 *
 * Review
 *
 */

import React from 'react';
import { connect } from 'react-redux';

import actions from '../../actions';

import AccountDetails from '../../components/Manager/AccountDetails';
import SubPage from '../../components/Manager/SubPage';

class Review extends React.PureComponent {
  componentDidMount() {
    this.props.fetchReviews();
  }

  render() {
    const { reviews } = this.props;

    return (
      <div className='reviews-dashboard'>
        {/* <SubPage title={'Account Details'} isMenuOpen={null}>
     
        </SubPage> */}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    reviews: state.review.reviews
  };
};

export default connect(mapStateToProps, actions)(Review);

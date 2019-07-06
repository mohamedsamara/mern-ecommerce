/**
 *
 * BrandPage
 *
 */

import React from 'react';
import { connect } from 'react-redux';

import actions from '../../actions';

import BrandList from '../../components/BrandList';

class BrandPage extends React.PureComponent {
  componentWillMount() {
    this.props.fetchBrands();
  }

  render() {
    const { brands } = this.props;

    return (
      <div className='brands'>
        <BrandList brands={brands} />
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    brands: state.brand.brands
  };
};

export default connect(
  mapStateToProps,
  actions
)(BrandPage);

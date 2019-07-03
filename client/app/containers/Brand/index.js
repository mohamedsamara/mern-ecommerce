/*
 *
 * Brand
 *
 */

import React from 'react';
import { connect } from 'react-redux';

import actions from '../../actions';

import AddBrand from '../../components/AddBrand';

class Brand extends React.PureComponent {
  componentDidMount() {}

  render() {
    const { brandFormData, brandChange, addBrand } = this.props;

    return (
      <div className='brand'>
        <AddBrand
          brandFormData={brandFormData}
          brandChange={brandChange}
          addBrand={addBrand}
        />
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    brandFormData: state.brand.brandFormData
  };
};

export default connect(
  mapStateToProps,
  actions
)(Brand);

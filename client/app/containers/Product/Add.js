/*
 *
 * Add
 *
 */

import React from 'react';

import { connect } from 'react-redux';

import actions from '../../actions';

import AddProduct from '../../components/Manager/AddProduct';
import SubPage from '../../components/Manager/SubPage';

class Add extends React.PureComponent {
  componentDidMount() {
    this.props.fetchBrandsSelect();
  }

  render() {
    const {
      history,
      productFormData,
      formErrors,
      taxableSelect,
      selectedBrands,
      brands,
      productChange,
      handleBrandSelect,
      addProduct
    } = this.props;

    return (
      <SubPage
        title='Add Product'
        actionTitle='Cancel'
        handleAction={() => history.goBack()}
      >
        <AddProduct
          productFormData={productFormData}
          formErrors={formErrors}
          taxableSelect={taxableSelect}
          selectedBrands={selectedBrands}
          brands={brands}
          productChange={productChange}
          handleBrandSelect={handleBrandSelect}
          addProduct={addProduct}
        />
      </SubPage>
    );
  }
}

const mapStateToProps = state => {
  return {
    productFormData: state.product.productFormData,
    formErrors: state.product.formErrors,
    taxableSelect: state.product.taxableSelect,
    selectedBrands: state.brand.selectedBrands,
    brands: state.brand.brandsSelect
  };
};

export default connect(mapStateToProps, actions)(Add);

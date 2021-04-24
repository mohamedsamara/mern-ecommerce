/*
 *
 * Edit
 *
 */

import React from 'react';

import { connect } from 'react-redux';

import actions from '../../actions';

import EditProduct from '../../components/Manager/EditProduct';
import SubPage from '../../components/Manager/SubPage';
import NotFound from '../../components/Common/NotFound';

class Edit extends React.PureComponent {
  componentDidMount() {
    const productId = this.props.match.params.id;
    this.props.fetchProduct(productId);
    this.props.fetchBrandsSelect();
  }

  componentDidUpdate(prevProps) {
    if (this.props.match.params.id !== prevProps.match.params.id) {
      const productId = this.props.match.params.id;
      this.props.fetchProduct(productId);
    }
  }

  render() {
    const {
      history,
      user,
      product,
      formErrors,
      brands,
      productEditChange,
      updateProduct,
      deleteProduct,
      activateProduct,
      resetProduct
    } = this.props;

    return (
      <SubPage
        title='Edit Product'
        actionTitle='Cancel'
        handleAction={() => {
          resetProduct();
          history.goBack();
        }}
      >
        {product?._id ? (
          <EditProduct
            user={user}
            product={product}
            formErrors={formErrors}
            brands={brands}
            productChange={productEditChange}
            updateProduct={updateProduct}
            deleteProduct={deleteProduct}
            activateProduct={activateProduct}
          />
        ) : (
          <NotFound message='no product found.' />
        )}
      </SubPage>
    );
  }
}

const mapStateToProps = state => {
  return {
    user: state.account.user,
    product: state.product.product,
    formErrors: state.product.editFormErrors,
    brands: state.brand.brandsSelect
  };
};

export default connect(mapStateToProps, actions)(Edit);

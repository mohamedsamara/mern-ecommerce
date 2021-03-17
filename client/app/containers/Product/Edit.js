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
      product,
      formErrors,
      productEditChange,
      updateProduct,
      deleteProduct,
      activateProduct
    } = this.props;

    return (
      <SubPage
        title='Edit Product'
        actionTitle='Cancel'
        handleAction={() => history.goBack()}
      >
        {product?._id ? (
          <EditProduct
            product={product}
            formErrors={formErrors}
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
    product: state.product.product,
    formErrors: state.product.editFormErrors
  };
};

export default connect(mapStateToProps, actions)(Edit);

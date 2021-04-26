/*
 *
 * Add
 *
 */

import React from 'react';

import { connect } from 'react-redux';

import actions from '../../actions';

import AddCategory from '../../components/Manager/AddCategory';
import SubPage from '../../components/Manager/SubPage';

class Add extends React.PureComponent {
  componentDidMount() {
    this.props.fetchProductsSelect();
  }

  render() {
    const {
      history,
      products,
      categoryFormData,
      formErrors,
      categoryChange,
      addCategory
    } = this.props;

    return (
      <SubPage
        title='Add Category'
        actionTitle='Cancel'
        handleAction={() => history.goBack()}
      >
        <AddCategory
          products={products}
          categoryFormData={categoryFormData}
          formErrors={formErrors}
          categoryChange={categoryChange}
          addCategory={addCategory}
        />
      </SubPage>
    );
  }
}

const mapStateToProps = state => {
  return {
    products: state.product.productsSelect,
    categoryFormData: state.category.categoryFormData,
    formErrors: state.category.formErrors
  };
};

export default connect(mapStateToProps, actions)(Add);

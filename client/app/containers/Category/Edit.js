/*
 *
 * Edit
 *
 */

import React from 'react';

import { connect } from 'react-redux';

import actions from '../../actions';

import EditCategory from '../../components/Manager/EditCategory';
import SubPage from '../../components/Manager/SubPage';
import NotFound from '../../components/Common/NotFound';

class Edit extends React.PureComponent {
  componentDidMount() {
    this.props.resetCategory();
    const categoryId = this.props.match.params.id;
    this.props.fetchCategory(categoryId);
    this.props.fetchProductsSelect();
  }

  componentDidUpdate(prevProps) {
    if (this.props.match.params.id !== prevProps.match.params.id) {
      this.props.resetCategory();
      const categoryId = this.props.match.params.id;
      this.props.fetchCategory(categoryId);
    }
  }

  render() {
    const {
      history,
      products,
      category,
      formErrors,
      categoryEditChange,
      updateCategory,
      deleteCategory,
      activateCategory
    } = this.props;

    return (
      <SubPage
        title='Edit Category'
        actionTitle='Cancel'
        handleAction={history.goBack}
      >
        {category?._id ? (
          <EditCategory
            products={products}
            category={category}
            formErrors={formErrors}
            categoryChange={categoryEditChange}
            updateCategory={updateCategory}
            deleteCategory={deleteCategory}
            activateCategory={activateCategory}
          />
        ) : (
          <NotFound message='No category found.' />
        )}
      </SubPage>
    );
  }
}

const mapStateToProps = state => {
  return {
    products: state.product.productsSelect,
    category: state.category.category,
    formErrors: state.category.editFormErrors
  };
};

export default connect(mapStateToProps, actions)(Edit);

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
    const categoryId = this.props.match.params.id;
    this.props.fetchCategory(categoryId);
  }

  componentDidUpdate(prevProps) {
    if (this.props.match.params.id !== prevProps.match.params.id) {
      const categoryId = this.props.match.params.id;
      this.props.fetchCategory(categoryId);
    }
  }

  render() {
    const {
      history,
      category,
      formErrors,
      categoryEditChange,
      updateCategory,
      deleteCategory
    } = this.props;

    return (
      <SubPage
        title='Edit Category'
        actionTitle='Cancel'
        handleAction={() => history.goBack()}
      >
        {category?._id ? (
          <EditCategory
            category={category}
            formErrors={formErrors}
            categoryChange={categoryEditChange}
            updateCategory={updateCategory}
            deleteCategory={deleteCategory}
          />
        ) : (
          <NotFound message='no category found.' />
        )}
      </SubPage>
    );
  }
}

const mapStateToProps = state => {
  return {
    category: state.category.category,
    formErrors: state.category.editFormErrors
  };
};

export default connect(mapStateToProps, actions)(Edit);

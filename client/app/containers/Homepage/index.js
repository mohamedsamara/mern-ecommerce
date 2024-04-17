/**
 *
 * Homepage
 *
 */

import React from 'react';

import { connect } from 'react-redux';

import actions from '../../actions';
import CategoryList from '../../components/Store/CategoryList';
import LoadingIndicator from '../../components/Common/LoadingIndicator';
import NotFound from '../../components/Common/NotFound';

class Homepage extends React.PureComponent {

  componentDidMount() {
    this.props.fetchCategories();
  }

  render() {
    const { categories, isLoading } = this.props;

    return (
      <div className='homepage'>
        {isLoading && <LoadingIndicator />}
        {categories && categories.length > 0 && (
          <CategoryList
            categories={categories}
          />
        )}
        {!isLoading && !categories && categories.length === 0 && (
          <NotFound message='No categories found.' />
        )}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    categories: state.category.categories,
    isLoading: state.category.isLoading,
    user: state.account.user
  };
};

export default connect(mapStateToProps, actions)(Homepage);

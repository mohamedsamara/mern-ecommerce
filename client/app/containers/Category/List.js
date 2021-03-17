/*
 *
 * List
 *
 */

import React from 'react';

import { connect } from 'react-redux';

import actions from '../../actions';

import CategoryList from '../../components/Manager/CategoryList';
import SubPage from '../../components/Manager/SubPage';

class List extends React.PureComponent {
  componentDidMount() {
    this.props.fetchCategories();
  }

  render() {
    const { history, categories, activateCategory } = this.props;

    return (
      <>
        <SubPage
          title='Categories'
          actionTitle='Add'
          handleAction={() => history.push('/dashboard/category/add')}
        >
          <CategoryList
            categories={categories}
            activateCategory={activateCategory}
          />
        </SubPage>
      </>
    );
  }
}

const mapStateToProps = state => {
  return {
    categories: state.category.categories,
    user: state.account.user
  };
};

export default connect(mapStateToProps, actions)(List);

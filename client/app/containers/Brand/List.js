/*
 *
 * List
 *
 */

import React from 'react';

import { connect } from 'react-redux';

import actions from '../../actions';

import BrandList from '../../components/Manager/BrandList';
import SubPage from '../../components/Manager/SubPage';

class List extends React.PureComponent {
  componentDidMount() {
    this.props.fetchBrands();
  }

  render() {
    const { history, brands, user, activateBrand } = this.props;

    return (
      <>
        <SubPage
          title='Brands'
          actionTitle={user.role === 'ROLE_ADMIN' && 'Add'}
          handleAction={() => history.push('/dashboard/brand/add')}
        >
          <BrandList
            brands={brands}
            activateBrand={activateBrand}
            user={user}
          />
        </SubPage>
      </>
    );
  }
}

const mapStateToProps = state => {
  return {
    brands: state.brand.brands,
    user: state.account.user
  };
};

export default connect(mapStateToProps, actions)(List);

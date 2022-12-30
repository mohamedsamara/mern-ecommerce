/*
 *
 * Edit
 *
 */

import React from 'react';

import { connect } from 'react-redux';

import actions from '../../actions';

import EditBrand from '../../components/Manager/EditBrand';
import SubPage from '../../components/Manager/SubPage';
import NotFound from '../../components/Common/NotFound';

class Edit extends React.PureComponent {
  componentDidMount() {
    const brandId = this.props.match.params.id;
    this.props.fetchBrand(brandId);
  }

  componentDidUpdate(prevProps) {
    if (this.props.match.params.id !== prevProps.match.params.id) {
      const brandId = this.props.match.params.id;
      this.props.fetchBrand(brandId);
    }
  }

  render() {
    const {
      history,
      user,
      brand,
      formErrors,
      brandEditChange,
      updateBrand,
      deleteBrand,
      activateBrand
    } = this.props;

    return (
      <SubPage
        title='Edit Brand'
        actionTitle='Cancel'
        handleAction={history.goBack}
      >
        {brand?._id ? (
          <EditBrand
            user={user}
            brand={brand}
            brandChange={brandEditChange}
            formErrors={formErrors}
            updateBrand={updateBrand}
            deleteBrand={deleteBrand}
            activateBrand={activateBrand}
          />
        ) : (
          <NotFound message='No brand found.' />
        )}
      </SubPage>
    );
  }
}

const mapStateToProps = state => {
  return {
    user: state.account.user,
    brand: state.brand.brand,
    formErrors: state.brand.editFormErrors
  };
};

export default connect(mapStateToProps, actions)(Edit);

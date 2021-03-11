/*
 *
 * Edit
 *
 */

import React from 'react';

import { connect } from 'react-redux';

import actions from '../../actions';

import EditAddress from '../../components/Manager/EditAddress';
import SubPage from '../../components/Manager/SubPage';
import NotFound from '../../components/Common/NotFound';

class Edit extends React.PureComponent {
  componentDidMount() {
    const addressId = this.props.match.params.id;
    this.props.fetchAddress(addressId);
  }

  componentDidUpdate(prevProps) {
    if (this.props.match.params.id !== prevProps.match.params.id) {
      const addressId = this.props.match.params.id;
      this.props.fetchAddress(addressId);
    }
  }

  render() {
    const {
      history,
      address,
      formErrors,
      addressEditChange,
      isDefault,
      defaultChange,
      updateAddress,
      deleteAddress
    } = this.props;

    return (
      <SubPage
        title='Edit Address'
        actionTitle='Cancel'
        handleAction={() => history.goBack()}
      >
        {address?._id ? (
          <EditAddress
            address={address}
            addressChange={addressEditChange}
            formErrors={formErrors}
            updateAddress={updateAddress}
            deleteAddress={deleteAddress}
            isDefault={isDefault}
            defaultChange={defaultChange}
          />
        ) : (
          <NotFound message='no Address found.' />
        )}
      </SubPage>
    );
  }
}

const mapStateToProps = state => {
  return {
    address: state.address.address,
    isDefault: state.address.isDefault,
    formErrors: state.address.editFormErrors
  };
};

export default connect(mapStateToProps, actions)(Edit);

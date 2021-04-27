/*
 *
 * Merchant
 *
 */

import React from 'react';

import { connect } from 'react-redux';

import actions from '../../actions';

import SubPage from '../../components/Manager/SubPage';
import MerchantList from '../../components/Manager/MerchantList';
import LoadingIndicator from '../../components/Common/LoadingIndicator';
import NotFound from '../../components/Common/NotFound';

class Merchant extends React.PureComponent {
  componentDidMount() {
    this.props.fetchMerchants();
  }

  render() {
    const {
      merchants,
      isLoading,
      approveMerchant,
      rejectMerchant,
      deleteMerchant
    } = this.props;

    return (
      <div className='merchant-dashboard'>
        <SubPage title={'Merchants'} isMenuOpen={null} />

        {isLoading ? (
          <LoadingIndicator inline />
        ) : merchants.length > 0 ? (
          <MerchantList
            merchants={merchants}
            approveMerchant={approveMerchant}
            rejectMerchant={rejectMerchant}
            deleteMerchant={deleteMerchant}
          />
        ) : (
          <NotFound message='no merchants found.' />
        )}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    merchants: state.merchant.merchants,
    isLoading: state.merchant.isLoading
  };
};

export default connect(mapStateToProps, actions)(Merchant);

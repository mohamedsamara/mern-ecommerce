/*
 *
 * Merchant
 *
 */

import React from 'react';

import { connect } from 'react-redux';

import actions from '../../actions';

import SubPage from '../../components/Manager/SubPage';
import LoadingIndicator from '../../components/Common/LoadingIndicator';
import NotFound from '../../components/Common/NotFound';
import MerchantList from '../../components/Manager/MerchantList';
import Pagination from '../../components/Common/Pagination';

class Merchant extends React.PureComponent {
  componentDidMount() {
    this.props.fetchMerchants();
  }

  render() {
    const {
      merchants,
      isLoading,
      advancedFilters,
      fetchMerchants,
      approveMerchant,
      rejectMerchant,
      deleteMerchant
    } = this.props;

    return (
      <div className='merchant-dashboard'>
        <SubPage title={'Merchants'} isMenuOpen={null} />
        {isLoading && <LoadingIndicator />}
        {merchants && merchants.length > 0 && (
          <>
            <Pagination
              totalPages={advancedFilters.totalPages}
              onPagination={fetchMerchants}
            />

            <MerchantList
              merchants={merchants}
              approveMerchant={approveMerchant}
              rejectMerchant={rejectMerchant}
              deleteMerchant={deleteMerchant}
            />
          </>
        )}
        {!isLoading && merchants && merchants.length <= 0 && (
          <NotFound message='no merchants found.' />
        )}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    merchants: state.merchant.merchants,
    advancedFilters: state.merchant.advancedFilters,
    isLoading: state.merchant.isLoading
  };
};

export default connect(mapStateToProps, actions)(Merchant);

/*
 *
 * Merchant
 *
 */

import React from 'react';
import { connect } from 'react-redux';

import actions from '../../actions';

import SubPage from '../../components/SubPage';
import MerchantList from '../../components/MerchantList';

class Merchant extends React.PureComponent {
  componentDidMount() {
    this.props.fetchMerchants();
  }

  render() {
    const { merchants, approveMerchant, rejectMerchant } = this.props;

    return (
      <div className='merchant-dashboard'>
        <SubPage title={'Merchants'} isMenuOpen={null} />

        <MerchantList
          merchants={merchants}
          approveMerchant={approveMerchant}
          rejectMerchant={rejectMerchant}
        />
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    merchants: state.merchant.merchants
  };
};

export default connect(mapStateToProps, actions)(Merchant);

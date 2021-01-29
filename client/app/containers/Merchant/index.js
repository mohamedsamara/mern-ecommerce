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
    const { merchants, columns } = this.props;

    return (
      <div className='merchant-dashboard'>
        <SubPage title={'Merchants'} isMenuOpen={null} />

        <MerchantList merchants={merchants} />
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    merchants: state.merchant.merchants,
    columns: state.merchant.columns
  };
};

export default connect(mapStateToProps, actions)(Merchant);

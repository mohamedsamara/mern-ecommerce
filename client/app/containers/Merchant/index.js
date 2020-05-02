/*
 *
 * Merchant
 *
 */

import React from 'react';
import { connect } from 'react-redux';

import actions from '../../actions';

import Table from '../../components/Table';
import SubPage from '../../components/SubPage';

class Merchant extends React.PureComponent {
  componentDidMount() {
    this.props.fetchMerchants();
  }

  render() {
    const { merchants, columns } = this.props;

    return (
      <div className='merchant-dashboard'>
        <SubPage title={'Merchant List'} isMenuOpen={null} />
        <Table
          data={merchants}
          columns={columns}
          striped={true}
          hover={true}
          condensed={true}
          csv={true}
          search={true}
        />
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

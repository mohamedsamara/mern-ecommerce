/*
 *
 * List
 *
 */

import React from 'react';

import { connect } from 'react-redux';

import actions from '../../actions';
import { ROLE_ADMIN } from '../../constants';

import SubPage from '../../components/Manager/SubPage';
import MerchantList from '../../components/Manager/MerchantList';
import MerchantSearch from '../../components/Manager/MerchantSearch';
import SearchResultMeta from '../../components/Manager/SearchResultMeta';
import LoadingIndicator from '../../components/Common/LoadingIndicator';
import NotFound from '../../components/Common/NotFound';
import Pagination from '../../components/Common/Pagination';

class List extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      search: ''
    };
  }

  componentDidMount() {
    this.props.fetchMerchants();
  }

  handleMerchantSearch = e => {
    if (e.value.length >= 2) {
      this.props.searchMerchants({ name: 'merchant', value: e.value });
      this.setState({
        search: e.value
      });
    } else {
      this.setState({
        search: ''
      });
    }
  };

  handleOnPagination = (n, v) => {
    this.props.fetchUsers(v);
  };

  render() {
    const {
      history,
      user,
      merchants,
      isLoading,
      searchedMerchants,
      advancedFilters,
      fetchMerchants,
      approveMerchant,
      rejectMerchant,
      deleteMerchant,
      disableMerchant,
      searchMerchants
    } = this.props;

    const { search } = this.state;
    const isSearch = search.length > 0;
    const filteredMerchants = search ? searchedMerchants : merchants;
    const displayPagination = advancedFilters.totalPages > 1;
    const displayMerchants = filteredMerchants && filteredMerchants.length > 0;

    return (
      <div className='merchant-dashboard'>
        <SubPage
          title={'Merchants'}
          // title={user.role === ROLE_ADMIN ? 'Brands' : 'Brand'}
          actionTitle={user.role === ROLE_ADMIN && 'Add'}
          handleAction={() => history.push('/dashboard/merchant/add')}
        />
        <MerchantSearch
          onSearch={this.handleMerchantSearch}
          onSearchSubmit={searchMerchants}
        />
        {isLoading && <LoadingIndicator />}
        {displayMerchants && (
          <>
            {!isSearch && displayPagination && (
              <Pagination
                totalPages={advancedFilters.totalPages}
                onPagination={fetchMerchants}
              />
            )}
            <SearchResultMeta
              label='merchants'
              count={
                isSearch ? filteredMerchants.length : advancedFilters.count
              }
            />
            <MerchantList
              merchants={filteredMerchants}
              approveMerchant={m =>
                approveMerchant(m, search, advancedFilters.currentPage)
              }
              rejectMerchant={m =>
                rejectMerchant(m, search, advancedFilters.currentPage)
              }
              deleteMerchant={m =>
                deleteMerchant(m, search, advancedFilters.currentPage)
              }
              disableMerchant={(m, v) =>
                disableMerchant(m, v, search, advancedFilters.currentPage)
              }
            />
          </>
        )}
        {!isLoading && !displayMerchants && (
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
    isLoading: state.merchant.isLoading,
    searchedMerchants: state.merchant.searchedMerchants,
    user: state.account.user
  };
};

export default connect(mapStateToProps, actions)(List);

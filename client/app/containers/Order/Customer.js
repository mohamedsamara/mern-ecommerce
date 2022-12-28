/*
 *
 * Customer
 *
 */

import React from 'react';

import { connect } from 'react-redux';

import actions from '../../actions';
import { ROLES } from '../../constants';
import SubPage from '../../components/Manager/SubPage';
import OrderList from '../../components/Manager/OrderList';
import OrderSearch from '../../components/Manager/OrderSearch';
import SearchResultMeta from '../../components/Manager/SearchResultMeta';
import NotFound from '../../components/Common/NotFound';
import LoadingIndicator from '../../components/Common/LoadingIndicator';
import Pagination from '../../components/Common/Pagination';

class Customer extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      search: ''
    };
  }

  componentDidMount() {
    this.props.fetchOrders();
  }

  handleOrderSearch = e => {
    if (e.value.length >= 2) {
      this.props.searchOrders({ name: 'order', value: e.value });
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
    this.props.fetchOrders(v);
  };

  render() {
    const {
      history,
      user,
      orders,
      isLoading,
      searchedOrders,
      advancedFilters,
      searchOrders
    } = this.props;
    const { search } = this.state;
    const isSearch = search.length > 0;
    const filteredOrders = search ? searchedOrders : orders;
    const displayPagination = advancedFilters.totalPages > 1;
    const displayOrders = filteredOrders && filteredOrders.length > 0;

    return (
      <div className='order-dashboard'>
        <SubPage
          title='Customer Orders'
          actionTitle='My Orders'
          handleAction={() =>
            user.role === ROLES.Admin && history.push('/dashboard/orders')
          }
        >
          <OrderSearch
            onSearch={this.handleOrderSearch}
            onSearchSubmit={searchOrders}
          />
          {isLoading && <LoadingIndicator />}
          {displayOrders && (
            <>
              {!isSearch && displayPagination && (
                <Pagination
                  totalPages={advancedFilters.totalPages}
                  onPagination={this.handleOnPagination}
                />
              )}

              <SearchResultMeta
                label='orders'
                count={isSearch ? filteredOrders.length : advancedFilters.count}
              />
              <OrderList orders={filteredOrders} />
            </>
          )}
          {!isLoading && !displayOrders && (
            <NotFound message='No orders found.' />
          )}
        </SubPage>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    user: state.account.user,
    orders: state.order.orders,
    searchedOrders: state.order.searchedOrders,
    isLoading: state.order.isLoading,
    advancedFilters: state.order.advancedFilters,
    isOrderAddOpen: state.order.isOrderAddOpen
  };
};

export default connect(mapStateToProps, actions)(Customer);

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
import OrderList from '../../components/Manager/OrderList';
import OrderSearch from '../../components/Manager/OrderSearch';
import NotFound from '../../components/Common/NotFound';
import LoadingIndicator from '../../components/Common/LoadingIndicator';
import Pagination from '../../components/Common/Pagination';

class List extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      search: ''
    };
  }

  componentDidMount() {
    this.props.fetchOrders(1, true);
  }

  handleOrderSearch = e => {
    if (e.value.length >= 2) {
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
    this.props.fetchOrders(v, true);
  };

  render() {
    const { history, user, orders, isLoading, advancedFilters } = this.props;
    const { search } = this.state;
    const isSearch = search.length > 0;
    const filteredOrders = search
      ? orders.filter(o => o._id.includes(search))
      : orders;

    const displayPagination = advancedFilters.totalPages > 1;
    const displayOrders = filteredOrders && filteredOrders.length > 0;

    return (
      <div className='order-dashboard'>
        <SubPage
          title='Your Orders'
          actionTitle={user.role === ROLE_ADMIN && 'Customer Orders'}
          handleAction={() =>
            user.role === ROLE_ADMIN &&
            history.push('/dashboard/orders/customers')
          }
        >
          <OrderSearch
            onBlur={this.handleOrderSearch}
            onSearch={this.handleOrderSearch}
            onSearchSubmit={this.handleOrderSearch}
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
              <OrderList orders={filteredOrders} />
            </>
          )}
          {!isLoading && !displayOrders && (
            <NotFound message='you have no orders yet!' />
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
    isLoading: state.order.isLoading,
    advancedFilters: state.order.advancedFilters,
    isOrderAddOpen: state.order.isOrderAddOpen
  };
};

export default connect(mapStateToProps, actions)(List);

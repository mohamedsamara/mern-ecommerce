/*
 *
 * List
 *
 */

import React from 'react';

import { connect } from 'react-redux';

import actions from '../../actions';

import SubPage from '../../components/Manager/SubPage';
import OrderList from '../../components/Manager/OrderList';
import OrderSearch from '../../components/Manager/OrderSearch';
import NotFound from '../../components/Common/NotFound';
import LoadingIndicator from '../../components/Common/LoadingIndicator';

class List extends React.PureComponent {
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
      this.setState({
        search: e.value
      });
    } else {
      this.setState({
        search: ''
      });
    }
  };

  render() {
    const { history, user, orders, isLoading, searchOrders } = this.props;
    const { search } = this.state;

    const filteredOrders = search
      ? orders.filter(o => o._id.includes(search))
      : orders;

    return (
      <div className='order-dashboard'>
        <SubPage
          title='Your Orders'
          actionTitle={user.role === 'ROLE_ADMIN' && 'Customer Orders'}
          handleAction={() =>
            user.role === 'ROLE_ADMIN' &&
            history.push('/dashboard/orders/customers')
          }
        >
          <OrderSearch
            onBlur={this.handleOrderSearch}
            onSearch={this.handleOrderSearch}
            onSearchSubmit={this.handleOrderSearch}
          />
          {isLoading ? (
            <LoadingIndicator inline />
          ) : orders.length > 0 ? (
            <OrderList orders={filteredOrders} />
          ) : (
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
    isOrderAddOpen: state.order.isOrderAddOpen
  };
};

export default connect(mapStateToProps, actions)(List);

/*
 *
 * Order
 *
 */

import React from 'react';
import { connect } from 'react-redux';

import actions from '../../actions';

import SubPage from '../../components/SubPage';
import NotFound from '../../components/NotFound';
import LoadingIndicator from '../../components/LoadingIndicator';
import OrderList from '../../components/OrderList';

class Order extends React.PureComponent {
  componentDidMount() {
    this.props.fetchOrders();
  }

  render() {
    const { orders, isLoading } = this.props;

    return (
      <div className='order-dashboard'>
        <SubPage title={'Order List'} isMenuOpen={null}>
          {isLoading ? (
            <LoadingIndicator />
          ) : orders.length > 0 ? (
            <OrderList orders={orders} />
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
    orders: state.order.orders,
    isLoading: state.order.isLoading,
    isOrderAddOpen: state.order.isOrderAddOpen
  };
};

export default connect(mapStateToProps, actions)(Order);

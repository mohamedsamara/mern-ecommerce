/*
 *
 * Order
 *
 */

import React from 'react';
import { connect } from 'react-redux';

import actions from '../../actions';

import SubPage from '../../components/SubPage';
import OrderList from '../../components/OrderList';

class Order extends React.PureComponent {
  componentDidMount() {
    this.props.fetchOrders();
  }

  render() {
    const { orders } = this.props;

    return (
      <div className='order-dashboard'>
        <SubPage title={'Order List'} isMenuOpen={null}>
          <OrderList orders={orders} />
        </SubPage>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    orders: state.order.orders,
    isOrderAddOpen: state.order.isOrderAddOpen
  };
};

export default connect(mapStateToProps, actions)(Order);

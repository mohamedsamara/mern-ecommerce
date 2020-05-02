/*
 *
 * Order
 *
 */

import React from 'react';
import { connect } from 'react-redux';

import { Link } from 'react-router-dom';

import actions from '../../actions';

import SubPage from '../../components/SubPage';
import OrderList from '../../components/OrderList';

class Order extends React.PureComponent {
  componentDidMount() {
    this.props.fetchOrders();
  }

  render() {
    const { orders, isOrderAddOpen, toggleAddOrder } = this.props;

    return (
      <div className='order'>
        <SubPage
          title={isOrderAddOpen ? 'Recommended Items' : 'Order List'}
          isMenuOpen={isOrderAddOpen}
          toggleMenu={toggleAddOrder}
        >
          {isOrderAddOpen ? <p>Nothing...</p> : <OrderList orders={orders} />}
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

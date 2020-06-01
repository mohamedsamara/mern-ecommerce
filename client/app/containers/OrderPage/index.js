/**
 *
 * OrderPage
 *
 */

import React from 'react';
import { connect } from 'react-redux';

import actions from '../../actions';

import OrderDetails from '../../components/OrderDetails';
import NotFound from '../../components/NotFound';

class OrderPage extends React.PureComponent {
  componentDidMount() {
    const id = this.props.match.params.id;
    this.props.fetchOrder(id);
  }

  componentDidUpdate(prevProps) {
    if (this.props.match.params.id !== prevProps.match.params.id) {
      const id = this.props.match.params.id;
      this.props.fetchOrder(id);
    }
  }

  render() {
    const { order } = this.props;

    return (
      <div className='order-page'>
        {order._id ? (
          <OrderDetails order={order} />
        ) : (
          <NotFound message='no order exist!' />
        )}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    order: state.order.order
  };
};

export default connect(mapStateToProps, actions)(OrderPage);

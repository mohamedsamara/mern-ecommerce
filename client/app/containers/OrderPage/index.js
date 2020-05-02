/**
 *
 * OrderPage
 *
 */

import React from 'react';
import { connect } from 'react-redux';

import actions from '../../actions';

import { Row, Col } from 'reactstrap';

class OrderPage extends React.PureComponent {
  componentDidMount() {
    const id = this.props.match.params.id;
    this.props.fetchOrder(id);
  }

  componentDidUpdate(prevProps) {
    if (this.props.match.params.id !== prevProps.match.params.id) {
      const id = this.props.match.params.slug;
      this.props.fetchOrder(slug);
    }
  }

  render() {
    const { order } = this.props;

    return <div className='order-page'></div>;
  }
}

const mapStateToProps = state => {
  return {
    order: state.order.order
  };
};

export default connect(mapStateToProps, actions)(OrderPage);

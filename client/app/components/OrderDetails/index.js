/**
 *
 * OrderDetails
 *
 */

import React from 'react';

import { Row, Col } from 'reactstrap';

import OrderMeta from '../../components/OrderMeta';
import OrderItems from '../../components/OrderItems';
import OrderSummary from '../../components/OrderSummary';

const OrderDetails = props => {
  const { order } = props;
  return (
    <div className='order-details'>
      <Row>
        <Col xs='12' md='8'>
          <OrderMeta order={order} />
        </Col>
      </Row>
      <hr />
      <Row>
        <Col xs='12' md='8'>
          <OrderItems order={order} />
        </Col>
        <Col xs='12' md='4'>
          <OrderSummary order={order} />
        </Col>
      </Row>
    </div>
  );
};

export default OrderDetails;

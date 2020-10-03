/**
 *
 * OrderDetails
 *
 */

import React from 'react';

import { Row, Col } from 'reactstrap';

import OrderMeta from '../OrderMeta';
import OrderItems from '../OrderItems';
import OrderSummary from '../OrderSummary';

const OrderDetails = props => {
  const { order } = props;
  return (
    <div className='order-details'>
      <Row>
        <Col xs='12' md='12'>
          <OrderMeta order={order} />
        </Col>
      </Row>
      <Row className='mt-5'>
        <Col xs='12' lg='8'>
          <OrderItems order={order} />
        </Col>
        <Col xs='12' lg='4' className='mt-5 mt-lg-0'>
          <OrderSummary order={order} />
        </Col>
      </Row>
    </div>
  );
};

export default OrderDetails;

/**
 *
 * OrderSummary
 *
 */

import React from 'react';

import { Row, Col } from 'reactstrap';

const OrderSummary = props => {
  const { order } = props;

  const getTotal = () => {
    return order.total + 0.5;
  };

  return (
    <Col className='order-summary'>
      <h4>Order Summary</h4>
      <Row className='mb-2 summary-item'>
        <Col xs='9'>
          <p className='summary-label'>Shipping & Handling</p>
        </Col>
        <Col xs='3' className='text-right'>
          <p className='summary-value'>$0</p>
        </Col>
      </Row>
      <Row className='mb-2 summary-item'>
        <Col xs='9'>
          <p className='summary-label'>Est. Sales Tax</p>
        </Col>
        <Col xs='3' className='text-right'>
          <p className='summary-value'>$0.5</p>
        </Col>
      </Row>
      <Row className='mb-2 summary-item'>
        <Col xs='9'>
          <p className='summary-label'>Subtotal</p>
        </Col>
        <Col xs='3' className='text-right'>
          <p className='summary-value'>${order.total}</p>
        </Col>
      </Row>
      <hr />
      <Row className='mb-2 summary-item'>
        <Col xs='9'>
          <p className='summary-label'>Total</p>
        </Col>
        <Col xs='3' className='text-right'>
          <p className='summary-value'>${getTotal()}</p>
        </Col>
      </Row>
    </Col>
  );
};

export default OrderSummary;

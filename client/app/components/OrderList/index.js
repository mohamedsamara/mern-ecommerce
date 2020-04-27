/**
 *
 * OrderList
 *
 */

import React from 'react';

import { Row, Col } from 'reactstrap';

import ComingSoon from '../ComingSoon';

const OrderList = props => {
  const { orders } = props;

  return (
    <div className='order-list'>
      <Row>
        {orders &&
          orders.map((order, index) => (
            <Col xs='6' md='4' lg='3' key={index} className='mb-3'>
              <div className='order-box'></div>
            </Col>
          ))}
        <ComingSoon />
      </Row>
    </div>
  );
};

export default OrderList;

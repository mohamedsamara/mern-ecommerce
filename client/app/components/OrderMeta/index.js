/**
 *
 * OrderMeta
 *
 */

import React from 'react';

import { Row, Col } from 'reactstrap';

import { formatDate } from '../../helpers/date';

const OrderMeta = props => {
  const { order } = props;

  return (
    <div className='order-meta'>
      <Row>
        <Col xs='12' md='8'>
          <Row>
            <Col xs='4'>
              <p>Order Number</p>
            </Col>
            <Col xs='8'>
              <span className='order-label'>{` ${order._id}`}</span>
            </Col>
          </Row>
          <Row>
            <Col xs='4'>
              <p>Order Date</p>
            </Col>
            <Col xs='8'>
              <span className='order-label'>{` ${formatDate(
                order.created
              )}`}</span>
            </Col>
          </Row>
        </Col>
        <Col xs='12' md='4'></Col>
      </Row>
    </div>
  );
};

export default OrderMeta;

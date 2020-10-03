/**
 *
 * OrderMeta
 *
 */

import React from 'react';

import { Link } from 'react-router-dom';
import { Row, Col } from 'reactstrap';

import { formatDate } from '../../helpers/date';

const OrderMeta = props => {
  const { order } = props;

  return (
    <div className='order-meta'>
      <div className='d-flex align-items-center justify-content-between mb-3 title'>
        <h4>Order Details</h4>
        <Link className='redirect-link' to={'/dashboard/orders'}>
          Back to orders
        </Link>
      </div>

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

/**
 *
 * OrderList
 *
 */

import React from 'react';

import { Row, Col } from 'reactstrap';
import { Link } from 'react-router-dom';

import { formatDate } from '../../helpers/date';
import NotFound from '../NotFound';

const OrderList = props => {
  const { orders } = props;

  const renderFirstItem = products => {
    return (
      <div className='item-box'>
        <div className='item-image'>
          <img src={'/images/placeholder-image.png'} />
        </div>
      </div>
    );
  };

  return (
    <div className='order-list'>
      <Row>
        {orders.length > 0 ? (
          orders.map((order, index) => (
            <Col xs='12' md='12' md='12' lg='6' key={index} className='mb-3'>
              <div className='order-box'>
                <div className='order-first-item'>
                  {renderFirstItem(order.products)}
                </div>
                <div className='order-details'>
                  <p>
                    order #
                    <span className='order-label'>{` ${order._id}`}</span>
                  </p>
                  <p>
                    Ordered on
                    <span className='order-label'>{` ${formatDate(
                      order.created
                    )}`}</span>
                  </p>
                  <p>
                    Order Total
                    <span className='order-label'>{` $${order.total}`}</span>
                  </p>
                  <Link to={`/order/${order._id}`} className='redirect-link'>
                    See Details
                  </Link>
                </div>
              </div>
            </Col>
          ))
        ) : (
          <Col xs='12'>
            <NotFound message='you have no orders yet!' />
          </Col>
        )}
      </Row>
    </div>
  );
};

export default OrderList;

/**
 *
 * OrderList
 *
 */

import React from 'react';

import { Link } from 'react-router-dom';

import { formatDate } from '../../helpers/date';

const OrderList = props => {
  const { orders } = props;

  const renderFirstItem = products => {
    return <img src={'/images/placeholder-image.png'} />;
  };

  return (
    <div className='order-list'>
      {orders.map((order, index) => (
        <div
          key={index}
          className='d-flex flex-column flex-lg-row mb-3 order-box'
        >
          <div className='order-first-item box-left'>
            {renderFirstItem(order.products)}
          </div>
          <div className='d-flex flex-column flex-xl-row justify-content-between flex-1 mx-lg-4 p-3'>
            <div className='order-details'>
              <div className='mb-1'>
                <span>Order #</span>
                <span className='order-label'>{` ${order._id}`}</span>
              </div>
              <div className='mb-1'>
                <span>Ordered on</span>
                <span className='order-label'>{` ${formatDate(
                  order.created
                )}`}</span>
              </div>
              <div className='mb-1'>
                <span>Order Total</span>
                <span className='order-label'>{` $${order.total}`}</span>
              </div>
            </div>
            <div className='d-flex align-items-center'>
              <Link to={`/order/${order._id}`} className='redirect-link'>
                See Details
              </Link>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default OrderList;

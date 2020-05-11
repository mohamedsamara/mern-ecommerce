/**
 *
 * OrderItems
 *
 */

import React from 'react';

import { Link } from 'react-router-dom';
import { Row, Col } from 'reactstrap';

const OrderItems = props => {
  const { order } = props;

  return (
    <div className='order-items'>
      <h4>Order Items</h4>
      <Row>
        {order.products.map((item, index) => (
          <Col xs='12' key={index} className='mt-3'>
            <Row>
              <Col xs='4' md='2'>
                <div className='item-image'>
                  <img src={'/images/placeholder-image.png'} />
                </div>
              </Col>
              <Col xs='8' md='4'>
                <div className='item-box'>
                  <div className='item-details'>
                    <Link to={`/product/${item.product.slug}`}>
                      <h1 className='item-name'>{item.product.name}</h1>
                    </Link>
                    <p className='sku'>{item.product.sku}</p>
                    <p className='price'>${item.product.price}</p>
                  </div>
                </div>
              </Col>
              <Col xs={{ size: '4', offset: 4 }} md={{ size: '3', offset: 0 }}>
                <p>
                  Quantity
                  <span className='order-label'>{` ${item.quantity}`}</span>
                </p>
              </Col>
              <Col xs='4' md='3'>
                <p>
                  Total Price
                  <span className='order-label'>{` $${item.totalPrice}`}</span>
                </p>
              </Col>
            </Row>
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default OrderItems;

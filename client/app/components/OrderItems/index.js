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
    <div className='order-items pt-3'>
      <h4>Order Items</h4>
      <Row>
        {order.products.map((item, index) => (
          <Col xs='12' key={index} className='item'>
            <div className='d-flex justify-content-between flex-column flex-md-row order-item-box'>
              <div className='d-flex box'>
                <div className='item-image'>
                  <img src={'/images/placeholder-image.png'} />
                </div>
                <div className='item-box d-md-flex flex-1 align-items-center ml-4'>
                  <div className='item-details'>
                    <Link
                      to={`/product/${item.product.slug}`}
                      className='item-link'
                    >
                      <h1 className='item-name'>{item.product.name}</h1>
                    </Link>
                    <p className='sku'>{item.product.sku}</p>
                    <p className='price'>${item.product.price}</p>
                  </div>

                  <div className='d-flex justify-content-between d-md-none mt-1'>
                    <p className='mb-1'>
                      Quantity
                      <span className='order-label'>{` ${item.quantity}`}</span>
                    </p>
                    <p>
                      Total Price
                      <span className='order-label'>{` $${item.totalPrice}`}</span>
                    </p>
                  </div>
                </div>
              </div>

              <div className='d-none d-md-flex justify-content-around align-items-center box'>
                <p>
                  Quantity
                  <span className='order-label'>{` ${item.quantity}`}</span>
                </p>
                <p>
                  Total Price
                  <span className='order-label'>{` $${item.totalPrice}`}</span>
                </p>
              </div>
            </div>
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default OrderItems;

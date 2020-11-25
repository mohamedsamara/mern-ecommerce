/**
 *
 * OrderItems
 *
 */

import React from 'react';

import { Link } from 'react-router-dom';
import { Row, Col } from 'reactstrap';

import Button from '../Button';
import DropdownConfirm from '../DropdownConfirm';

const OrderItems = props => {
  const { order, cancelOrderItem } = props;

  const renderPopoverContent = item => {
    return (
      <div className='d-flex flex-column align-items-center justify-content-center p-2'>
        <p className='text-center mb-2'>{`Are you sure you want to cancel ${item.product.name}.`}</p>
        <Button
          variant='danger'
          id='CancelOrderItemPopover'
          size='sm'
          text='Confirm Cancel'
          role='menuitem'
          className='cancel-order-btn'
          onClick={() => cancelOrderItem(item._id, order.products)}
        />
      </div>
    );
  };

  return (
    <div className='order-items pt-3'>
      <h2>Order Items</h2>
      <Row>
        {order.products.map((item, index) => (
          <Col xs='12' key={index} className='item'>
            <div className='order-item-box'>
              <div className='d-flex justify-content-between flex-column flex-md-row'>
                <div className='d-flex align-items-center box'>
                  <img
                    className='item-image'
                    src={`${
                      item.product && item.product.imageUrl
                        ? item.product.imageUrl
                        : '/images/placeholder-image.png'
                    }`}
                  />
                  <div className='d-md-flex flex-1 align-items-start ml-4 item-box'>
                    <div className='item-details'>
                      {item.product ? (
                        <>
                          <Link
                            to={`/product/${item.product.slug}`}
                            className='item-link'
                          >
                            <h4 className='item-name one-line-ellipsis'>
                              {item.product.name}
                            </h4>
                          </Link>
                          <div className='d-flex align-items-center justify-content-between'>
                            <span className='price'>${item.product.price}</span>
                          </div>
                        </>
                      ) : (
                        <h4>Not Available</h4>
                      )}
                    </div>
                    <div className='d-flex justify-content-between flex-wrap d-md-none mt-1'>
                      <p className='mb-1'>
                        Status
                        <span className='order-label order-status'>{` ${item.status}`}</span>
                      </p>
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
                  <div className='text-center'>
                    <p className='order-label order-status'>{` ${item.status}`}</p>
                    <p>Status</p>
                  </div>

                  <div className='text-center'>
                    <p className='order-label'>{` ${item.quantity}`}</p>
                    <p>Quantity</p>
                  </div>

                  <div className='text-center'>
                    <p className='order-label'>{` $${item.totalPrice}`}</p>

                    <p>Total Price</p>
                  </div>
                </div>
              </div>

              {item.product &&
                item.status !== 'Cancelled' &&
                order.products.length !== 1 && (
                  <div className='text-right mt-2 mt-md-0'>
                    <DropdownConfirm label='Cancel Item'>
                      {renderPopoverContent(item)}
                    </DropdownConfirm>
                  </div>
                )}
            </div>
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default OrderItems;

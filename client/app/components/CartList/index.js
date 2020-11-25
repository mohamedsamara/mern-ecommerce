/**
 *
 * CartList
 *
 */

import React from 'react';

import { Link } from 'react-router-dom';
import { Container, Row, Col } from 'reactstrap';

import Button from '../Button';

const CartList = props => {
  const { cartItems, handleRemoveFromCart } = props;

  const handleProductClick = () => {
    props.toggleCart();
  };

  return (
    <div className='cart-list'>
      {cartItems.map((item, index) => (
        <div key={index} className='item-box'>
          <div className='item-details'>
            <Container>
              <Row className='mb-2 align-items-center'>
                <Col xs='9'>
                  <div className='d-flex align-items-center'>
                    <img
                      className='item-image mr-2'
                      src={`${
                        item.imageUrl
                          ? item.imageUrl
                          : '/images/placeholder-image.png'
                      }`}
                    />

                    <Link
                      to={`/product/${item.slug}`}
                      className='item-link one-line-ellipsis'
                      onClick={handleProductClick}
                    >
                      <h1 className='item-name one-line-ellipsis'>
                        {item.name}
                      </h1>
                    </Link>
                  </div>
                </Col>
                <Col xs='3' className='text-right'>
                  <Button
                    ariaLabel={`remove ${item.name} from cart`}
                    icon={<i className='icon-trash' aria-hidden='true' />}
                    onClick={() => handleRemoveFromCart(item)}
                  />
                </Col>
              </Row>
              <Row className='mb-2 align-items-center'>
                <Col xs='9'>
                  <p className='item-label'>price</p>
                </Col>
                <Col xs='3' className='text-right'>
                  <p className='price item-value'>{` $${item.price}`}</p>
                </Col>
              </Row>
              <Row className='mb-2 align-items-center'>
                <Col xs='9'>
                  <p className='item-label'>quantity</p>
                </Col>
                <Col xs='3' className='text-right'>
                  <p className='item-qunatity item-value'>{` ${item.quantity}`}</p>
                </Col>
              </Row>
            </Container>
          </div>
        </div>
      ))}
    </div>
  );
};

export default CartList;

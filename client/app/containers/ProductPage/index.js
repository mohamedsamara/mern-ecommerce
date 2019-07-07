/**
 *
 * ProductPage
 *
 */

import React from 'react';
import { connect } from 'react-redux';

import actions from '../../actions';

import { Row, Col } from 'reactstrap';

import Input from '../../components/Input';

class ProductPage extends React.PureComponent {
  componentWillMount() {
    const slug = this.props.match.params.slug;
    this.props.fetchProduct(slug);
  }

  componentDidUpdate(prevProps) {
    if (this.props.match.params.slug !== prevProps.match.params.slug) {
      const slug = this.props.match.params.slug;
      this.props.fetchProduct(slug);
    }
  }

  render() {
    const { product, productFormData, productChange, addToCart } = this.props;

    return (
      <div className='item-page'>
        <Row>
          <Col xs='12' md='5' lg='5' className='mb-3'>
            <div className='item-image'>
              <img src={'/images/placeholder-image.png'} />
              {product.quantity > 0 ? (
                <p className='stock in-stock'>In stock</p>
              ) : (
                <p className='stock out-of-stock'>Out of stock</p>
              )}
            </div>
          </Col>
          <Col xs='12' md='7' lg='7' className='mb-3'>
            <div className='item-box'>
              <h1>{product.name}</h1>
              <p className='sku'>{product.sku}</p>
              <hr />
              <div className='item-details'>
                <p className='item-desc'>{product.description}</p>
                <p className='price'>${product.price}</p>
                <Input
                  type={'number'}
                  label={'Quantity'}
                  name={'quantity'}
                  placeholder={'Product Quantity'}
                  value={productFormData.quantity}
                  onInputChange={(name, value) => {
                    productChange(name, value);
                  }}
                />
                <div className='item-actions'>
                  <button
                    className='input-btn'
                    type='submit'
                    onClick={() => addToCart(product._id)}
                  >
                    AddToCart
                  </button>
                </div>
              </div>
            </div>
          </Col>
        </Row>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    product: state.product.product,
    productFormData: state.product.productFormData
  };
};

export default connect(
  mapStateToProps,
  actions
)(ProductPage);

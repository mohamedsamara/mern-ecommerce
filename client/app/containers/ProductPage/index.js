/**
 *
 * ProductPage
 *
 */

import React from 'react';
import { connect } from 'react-redux';
import { Row, Col } from 'reactstrap';
import { Link } from 'react-router-dom';

import actions from '../../actions';

import Input from '../../components/Common/Input';
import Button from '../../components/Common/Button';
import LoadingIndicator from '../../components/Common/LoadingIndicator';
import NotFound from '../../components/Common/NotFound';
import { BagIcon } from '../../components/Common/Icon';
import ProductReviews from '../../components/Store/ProductReviews';
import SocialShare from '../../components/Store/SocialShare';

class ProductPage extends React.PureComponent {
  componentDidMount() {
    const slug = this.props.match.params.slug;
    this.props.fetchStoreProduct(slug);
    this.props.fetchProductReviews(slug);
    document.body.classList.add('product-page');
  }

  componentDidUpdate(prevProps) {
    if (this.props.match.params.slug !== prevProps.match.params.slug) {
      const slug = this.props.match.params.slug;
      this.props.fetchStoreProduct(slug);
    }
  }

  componentWillUnmount() {
    document.body.classList.remove('product-page');
  }

  render() {
    const {
      isLoading,
      product,
      productShopData,
      shopFormErrors,
      itemInCart,
      productShopChange,
      handleAddToCart,
      handleRemoveFromCart,
      addProductReview,
      reviewsSummary,
      reviews,
      reviewFormData,
      reviewChange,
      reviewFormErrors
    } = this.props;

    return (
      <div className='product-shop'>
        {isLoading ? (
          <LoadingIndicator />
        ) : Object.keys(product).length > 0 ? (
          <>
            <Row className='flex-row'>
              <Col xs='12' md='5' lg='5' className='mb-3 px-3 px-md-2'>
                <div className='position-relative'>
                  <img
                    className='item-image'
                    src={`${
                      product.imageUrl
                        ? product.imageUrl
                        : '/images/placeholder-image.png'
                    }`}
                  />
                  {product.inventory <= 0 && !shopFormErrors['quantity'] ? (
                    <p className='stock out-of-stock'>Out of stock</p>
                  ) : (
                    <p className='stock in-stock'>In stock</p>
                  )}
                </div>
              </Col>
              <Col xs='12' md='7' lg='7' className='mb-3 px-3 px-md-2'>
                <div className='product-container'>
                  <div className='item-box'>
                    <div className='item-details'>
                      <h1 className='item-name one-line-ellipsis'>
                        {product.name}
                      </h1>
                      <p className='sku'>{product.sku}</p>
                      <hr />
                      {product.brand && (
                        <p className='by'>
                          see more from{' '}
                          <Link
                            to={`/shop/brand/${product.brand.slug}`}
                            className='default-link'
                          >
                            {product.brand.name}
                          </Link>
                        </p>
                      )}
                      <p className='item-desc'>{product.description}</p>
                      <p className='price'>${product.price}</p>
                    </div>
                    <div className='item-customize'>
                      <Input
                        type={'number'}
                        error={shopFormErrors['quantity']}
                        label={'Quantity'}
                        name={'quantity'}
                        decimals={false}
                        min={1}
                        max={product.inventory}
                        placeholder={'Product Quantity'}
                        disabled={
                          product.inventory <= 0 && !shopFormErrors['quantity']
                        }
                        value={productShopData.quantity}
                        onInputChange={(name, value) => {
                          productShopChange(name, value);
                        }}
                      />
                    </div>
                    <div className='my-4 item-share'>
                      <SocialShare product={product} />
                    </div>
                    <div className='item-actions'>
                      {itemInCart ? (
                        <Button
                          variant='primary'
                          disabled={
                            product.inventory <= 0 &&
                            !shopFormErrors['quantity']
                          }
                          text='Remove From Bag'
                          className='bag-btn'
                          icon={<BagIcon />}
                          onClick={() => handleRemoveFromCart(product)}
                        />
                      ) : (
                        <Button
                          variant='primary'
                          disabled={
                            product.quantity <= 0 && !shopFormErrors['quantity']
                          }
                          text='Add To Bag'
                          className='bag-btn'
                          icon={<BagIcon />}
                          onClick={() => handleAddToCart(product)}
                        />
                      )}
                    </div>
                  </div>
                </div>
              </Col>
            </Row>
            <ProductReviews
              reviewFormData={reviewFormData}
              reviewFormErrors={reviewFormErrors}
              reviews={reviews}
              reviewsSummary={reviewsSummary}
              reviewChange={reviewChange}
              addReview={addProductReview}
            />
          </>
        ) : (
          <NotFound message='no product found.' />
        )}
      </div>
    );
  }
}

const mapStateToProps = state => {
  const itemInCart = state.cart.cartItems.find(
    item => item._id === state.product.storeProduct._id
  )
    ? true
    : false;

  return {
    product: state.product.storeProduct,
    productShopData: state.product.productShopData,
    shopFormErrors: state.product.shopFormErrors,
    isLoading: state.product.isLoading,
    reviews: state.review.productReviews,
    reviewsSummary: state.review.reviewsSummary,
    reviewFormData: state.review.reviewFormData,
    reviewFormErrors: state.review.reviewFormErrors,
    itemInCart
  };
};

export default connect(mapStateToProps, actions)(ProductPage);

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
import WriteReview from '../../components/Manager/WriteReview';
import ReviewList from '../../components/Manager/ReviewList';
import { BagIcon } from '../../components/Common/Icon';
import NotFound from '../../components/Common/NotFound';
import LoadingIndicator from '../../components/Common/LoadingIndicator';

class ProductPage extends React.PureComponent {
  componentDidMount() {
    const slug = this.props.match.params.slug;
    this.props.fetchStoreProduct(slug);
    this.props.fetchReviews(slug);
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
      itemsInCart,
      productShopChange,
      handleAddToCart,
      handleRemoveFromCart,
      recommedableSelect,
      reviewFormData,
      reviewChange,
      reviewFormErrors,
      addReview,
      reviews,
      ratingSummary,
      totalRating,
      totalReview,
      location
    } = this.props;

    const averageRating = Math.round(totalRating/totalReview);
    const addReviewPath = location.pathname.split('/')[location.pathname.split('/').length - 1];
    return (
      <div className='product-shop'>
        {isLoading ? (
          <LoadingIndicator />
        ) : Object.keys(product).length > 0 ? (
          <div>
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
                  <div className='item-actions'>
                    {itemsInCart.includes(product._id) ? (
                      <Button
                        variant='primary'
                        disabled={
                          product.inventory <= 0 && !shopFormErrors['quantity']
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
          {reviews.length > 0 || addReviewPath == 'add-review' ?(<Row className='flex-row'>
            <Col xs='12' md='4' lg='4' className='mb-3 px-3 px-md-2'>
              <div className='review-container'>
                  <div className='r-list'>
                    <span className="heading">User Rating</span>
                    {isNaN(averageRating)==false?(
                      Array(...Array(5)).map((v, i) =>
                      i < averageRating ? (
                        <span className="fa fa-star checked" key={i}></span>
                      ):(
                        <span className="fa fa-star" key={i}></span>
                      )
                    )):(<NotFound message='no review found.'/>)}
                    <p>`{Math.round(totalRating/totalReview)} average based on {totalReview} reviews.`</p>
                    <hr style={{border:"3px solid #f1f1f1"}}/>
                  </div>
                  <div className='r-list'>
                  {totalReview > 0 ?
                    (ratingSummary.map((i,obj) =>
                      <div key={obj}>
                        <div className="side">
                          <div>{parseInt(Object.keys(i)[0])} star</div>
                        </div>
                        <div className="middle">
                          <div className="bar-container">
                            <div className={`bar-${parseInt(Object.keys(i)[0])}`}
                                  style={{width:`${(i[Object.keys(i)[0]]/totalReview)*100}%`}}>
                            </div>
                          </div>
                        </div>
                        <div className="side right">
                          <div>{parseInt(i[Object.keys(i)[0]])}</div>
                        </div>
                      </div>
                    )):(
                      <NotFound message='no review found.' />
                    )}
                  </div>
              </div>
            </Col>
            <Col xs='12' md='8' lg='8' className=' mb-3 px-3 px-md-2'>
                {addReviewPath !== 'add-review'?(
                  <div className='review-dashboard'>
                    {reviews.length >0?(
                      <ReviewList reviews={reviews}/>
                    ):(
                      <NotFound message='no review found.' />
                    )}
                  </div>
                ):(
                  <div className='review-container'>
                  <WriteReview
                    recommedableSelect={recommedableSelect}
                    reviewFormData={reviewFormData}
                    reviewChange={reviewChange}
                    reviewFormErrors={reviewFormErrors}
                    addReview={addReview}
                    location={location}
                  /></div>
                )}
            </Col>
        </Row>):('')}
        </div>
        ) : (
          <NotFound message='no product found.' />
        )}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    product: state.product.storeProduct,
    productShopData: state.product.productShopData,
    shopFormErrors: state.product.shopFormErrors,
    itemsInCart: state.cart.itemsInCart,
    recommedableSelect: state.product.recommedableSelect,
    reviewFormData: state.product.reviewFormData,
    reviewFormErrors: state.product.reviewFormErrors,
    addReview: state.product.addReview,
    reviews:state.product.reviews,
    ratingSummary: state.product.ratingSummary,
    totalRating: state.product.totalRating,
    totalReview: state.product.totalReview,
    isLoading: state.product.isLoading
  };
};

export default connect(mapStateToProps, actions)(ProductPage);

/**
 *
 * WriteReview
 *
 */

import React from 'react';

import { Row, Col, Label } from 'reactstrap';
import ReactStars from "react-rating-stars-component";
import SelectOption from '../../Common/SelectOption';

import Checkbox from '../../Common/Checkbox';
import Input from '../../Common/Input';
import Button from '../../Common/Button';


const WriteReview = props => {
  const {
    recommedableSelect,
    reviewFormData,
    reviewChange,
    reviewFormErrors,
    addReview
  } = props;

  const handleSubmit = event => {
    event.preventDefault();
    addReview(props.location.state.productId);
    location.pathname = `/product/${props.location.state.slug}`
  };

  return (
    <div className='add-review'>
      <form onSubmit={handleSubmit} noValidate>
        <Row>
          <Col xs='12' md='12'>
            <Input
              type={'text'}
              error={reviewFormErrors['title']}
              label={'Review Title'}
              name={'title'}
              placeholder={'Enter Review title'}
              value={reviewFormData.title}
              onInputChange={(name, value) => {
                reviewChange(name, value);
              }}
            />
          </Col>
          <Col xs='12' md='6'>
            <SelectOption
              error={reviewFormErrors['isRecommended']}
              label={'Will you recommend this product?'}
              multi={false}
              name={'isRecommended'}
              options={recommedableSelect}
              handleSelectChange={value => {
                reviewChange('isRecommended', value.value);
              }}
            />
          </Col>
          <Col xs='12' md='6'>
              <Label style={{fontSize:'14px',color:'black'}} sm={2}>Rating</Label>
              <Col md={10}>
                <ReactStars
                  name="rate1"
                  starCount={5}
                  size= {26.5}
                  color= {"black"}
                  activeColor= {"#FFB302"}
                  value={reviewFormData.rating}
                  a11y= {true}
                  isHalf= {false}
                  emptyIcon= {<i className="far fa-star" />}
                  halfIcon= {<i className="fa fa-star-half-alt" />}
                  filledIcon= {<i className="fa fa-star" />}
                  onChange={ (newValue) => {
                    reviewChange('rating',newValue);
                  }}
                />
                </Col>
          </Col>
          <Col xs='12' md='12'>
            <Input
              type={'textarea'}
              error={reviewFormErrors['review']}
              label={'Comment'}
              name={'review'}
              placeholder={'Write Review'}
              value={reviewFormData.review}
              onInputChange={(name, value) => {
                reviewChange(name, value);
              }}
            />
          </Col>
        </Row>
        <div className='add-review-actions'>
          <Button type='submit' text='Publish Review' />
        </div>
      </form>
    </div>
  );
};

export default WriteReview;

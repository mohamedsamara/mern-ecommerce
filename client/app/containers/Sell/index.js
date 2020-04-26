/*
 *
 * Sell
 *
 */

import React from 'react';
import { connect } from 'react-redux';

import { Row, Col } from 'reactstrap';

import actions from '../../actions';

import Input from '../../components/Input';

class Sell extends React.PureComponent {
  render() {
    const { sellFormData, sellFormChange, sellWithUs } = this.props;

    return (
      <div className='sell'>
        <h1>Would you like to show your products on MERN Store!</h1>
        <hr />
        <Row>
          <Col xs='12' md='6'>
            <Input
              type={'text'}
              label={'Name'}
              name={'name'}
              placeholder={'You Full Name'}
              value={sellFormData.name}
              onInputChange={(name, value) => {
                sellFormChange(name, value);
              }}
            />
          </Col>
          <Col xs='12' md='6'>
            <Input
              type={'text'}
              label={'Email Address'}
              name={'email'}
              placeholder={'Your Email Address'}
              value={sellFormData.email}
              onInputChange={(name, value) => {
                sellFormChange(name, value);
              }}
            />
          </Col>
          <Col xs='12' md='6'>
            <Input
              type={'text'}
              label={'Phone Number'}
              name={'phoneNumber'}
              placeholder={'Your Phone Number'}
              value={sellFormData.phoneNumber}
              onInputChange={(name, value) => {
                sellFormChange(name, value);
              }}
            />
          </Col>
          <Col xs='12' md='6'>
            <Input
              type={'text'}
              label={'brand'}
              name={'brand'}
              placeholder={'Your Business Brand'}
              value={sellFormData.brand}
              onInputChange={(name, value) => {
                sellFormChange(name, value);
              }}
            />
          </Col>
          <Col xs='12' md='12'>
            <Input
              type={'textarea'}
              label={'Business'}
              name={'business'}
              placeholder={'Please Describe Your Business'}
              value={sellFormData.business}
              onInputChange={(name, value) => {
                sellFormChange(name, value);
              }}
            />
          </Col>
        </Row>
        <hr />
        <div className='sell-actions'>
          <button
            className='input-btn'
            type='submit'
            onClick={() => sellWithUs()}
          >
            Submit
          </button>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    sellFormData: state.merchant.sellFormData
  };
};

export default connect(mapStateToProps, actions)(Sell);

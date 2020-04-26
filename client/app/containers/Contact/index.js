/*
 *
 * Contact
 *
 */

import React from 'react';
import { connect } from 'react-redux';

import { Row, Col } from 'reactstrap';

import actions from '../../actions';

import Input from '../../components/Input';

class Contact extends React.PureComponent {
  render() {
    const { contactFormData, contactFormChange, contactUs } = this.props;

    return (
      <div className='contact'>
        <h1>Contact Information</h1>
        <hr />
        <Row>
          <Col xs='12' md='6'>
            <Input
              type={'text'}
              label={'Name'}
              name={'name'}
              placeholder={'You Full Name'}
              value={contactFormData.name}
              onInputChange={(name, value) => {
                contactFormChange(name, value);
              }}
            />
          </Col>
          <Col xs='12' md='6'>
            <Input
              type={'text'}
              label={'Email'}
              name={'email'}
              placeholder={'Your Email Address'}
              value={contactFormData.email}
              onInputChange={(name, value) => {
                contactFormChange(name, value);
              }}
            />
          </Col>
          <Col xs='12' md='12'>
            <Input
              type={'textarea'}
              label={'Message'}
              name={'message'}
              placeholder={'Please Describe Your Message'}
              value={contactFormData.message}
              onInputChange={(name, value) => {
                contactFormChange(name, value);
              }}
            />
          </Col>
        </Row>
        <hr />
        <div className='contact-actions'>
          <button
            className='input-btn'
            type='submit'
            onClick={() => contactUs()}
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
    contactFormData: state.contact.contactFormData
  };
};

export default connect(mapStateToProps, actions)(Contact);

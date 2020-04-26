/*
 *
 * Newsletter
 *
 */

import React from 'react';
import { connect } from 'react-redux';

import actions from '../../actions';
import Input from '../../components/Input';

class Newsletter extends React.PureComponent {
  render() {
    const { email, newsletterChange, subscribe } = this.props;

    const subscribeButton = (
      <button className='input-btn' type='submit' onClick={subscribe}>
        subscribe
      </button>
    );

    return (
      <div className='newsletter-form'>
        <p>Sign Up for Our Newsletter</p>

        <div className='subscribe'>
          <Input
            type={'text'}
            name={'email'}
            placeholder={'Please Enter Your Email'}
            value={email}
            onInputChange={(name, value) => {
              newsletterChange(name, value);
            }}
            dom={subscribeButton}
          />
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    email: state.newsletter.email
  };
};

export default connect(mapStateToProps, actions)(Newsletter);

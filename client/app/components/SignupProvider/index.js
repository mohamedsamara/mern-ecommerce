/**
 *
 * SignupProvider
 *
 */

import React from 'react';

import { GoogleIcon, FacebookIcon } from '../Icon';
import { GOOGLE_CALLBACK_URL, FACEBOOK_CALLBACK_URL } from '../../constants';

const SignupProvider = props => {
  return (
    <div className='signup-provider'>
      <a href={`${GOOGLE_CALLBACK_URL}`} className='google-btn'>
        <GoogleIcon />
        <span className='btn-text'>Login with Google</span>
      </a>

      <a href={`${FACEBOOK_CALLBACK_URL}`} className='facebook-btn'>
        <FacebookIcon />
        <span className='btn-text'>Login with Facebook</span>
      </a>
    </div>
  );
};

export default SignupProvider;

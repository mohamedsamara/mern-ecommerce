/**
 *
 * SignupProvider
 *
 */

import React from 'react';

import { GoogleIcon, FacebookIcon } from '../Icon';
import {
  GOOGLE_CALLBACK_URL,
  FACEBOOK_CALLBACK_URL,
  BASE_API_URL
} from '../../constants';

const SignupProvider = props => {
  return (
    <div className='signup-provider'>
      <a href={`${BASE_API_URL}/auth/google`} className='google-btn'>
        <GoogleIcon />
        <span className='btn-text'>Login with Google</span>
      </a>

      <a href={`${BASE_API_URL}/auth/facebook`} className='facebook-btn'>
        <FacebookIcon />
        <span className='btn-text'>Login with Facebook</span>
      </a>
    </div>
  );
};

// ${GOOGLE_CALLBACK_URL}

// ${process.env.BASE_API_URL}/auth/google

export default SignupProvider;

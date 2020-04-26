/**
 *
 * SignupProvider
 *
 */

import React from 'react';

import ComingSoon from '../ComingSoon';

const SignupProvider = props => {
  return (
    <div className='signup-provider'>
      <ComingSoon>
        <span>Signup with Google</span>
        <span>Signup with Facebook</span>
      </ComingSoon>
    </div>
  );
};

export default SignupProvider;

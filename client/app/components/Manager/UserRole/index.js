/**
 *
 * UserRole
 *
 */

import React from 'react';

import { ROLE_ADMIN } from '../../../constants';

const UserRole = props => {
  const { className, user } = props;

  return (
    <>
      {user.role === ROLE_ADMIN ? (
        <span className={`role admin ${className}`}>Admin</span>
      ) : user.role === 'ROLE_MERCHANT' ? (
        <span className={`role merchant ${className}`}>Merchant</span>
      ) : (
        <span className={`role member ${className}`}>Member</span>
      )}
    </>
  );
};

UserRole.defaultProps = {
  className: ''
};

export default UserRole;

import React from 'react';

const MessageBox = props => {
  const { variant, children } = props;

  return <div className={`alert alert-${variant || 'info'}`}>{children}</div>;
};

export default MessageBox;

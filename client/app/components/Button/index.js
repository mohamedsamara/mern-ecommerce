/**
 *
 * Button
 *
 */

import React from 'react';

const Button = props => {
  const { type, disabled, className, text, icon, onClick } = props;

  const styles = `input-btn${className && ` ${className}`}`;

  return (
    <button
      disabled={disabled}
      className={styles}
      type={type}
      onClick={onClick}
    >
      {icon ? (
        <>
          <span className='btn-text'>{text}</span>
          <span className='btn-icon'>{icon}</span>
        </>
      ) : (
        <>{text}</>
      )}
    </button>
  );
};

export default Button;

Button.defaultProps = {
  type: 'button',
  className: ''
};

/**
 *
 * Button
 *
 */

import React from 'react';

const Button = props => {
  const {
    tabIndex,
    ariaLabel,
    ariaExpanded,
    type,
    disabled,
    className,
    text,
    icon,
    onClick
  } = props;

  const styles = `input-btn${className && ` ${className}`}`;

  return (
    <button
      tabIndex={tabIndex}
      aria-label={ariaLabel}
      aria-expanded={ariaExpanded}
      disabled={disabled}
      className={styles}
      type={type}
      onClick={onClick}
    >
      {text && <span className='btn-text'>{text}</span>}
      {icon && <div className='btn-icon'>{icon}</div>}
    </button>
  );
};

export default Button;

Button.defaultProps = {
  type: 'button',
  className: 'custom-btn'
};

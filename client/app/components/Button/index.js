/**
 *
 * Button
 *
 */

import React from 'react';

const variants = {
  primary: 'custom-btn-primary',
  secondary: 'custom-btn-secondary',
  default: 'custom-btn-default',
  link: 'custom-btn-link'
};

const Button = props => {
  const {
    size,
    variant,
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

  const v = variant ? variants[variant] : '';

  const btnVariant = icon && text ? v : icon && !text ? '' : v;

  const btn =
    icon && text ? 'with-icon' : icon && !text ? 'icon-only' : 'text-only';

  const classNames = `input-btn${`${className && ` ${className}`}`}${
    btnVariant && ` ${btnVariant}`
  }${` ${size}`} ${btn}`;

  return (
    <button
      tabIndex={tabIndex}
      aria-label={ariaLabel}
      aria-expanded={ariaExpanded}
      disabled={disabled}
      className={classNames}
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
  variant: 'primary',
  size: 'md',
  className: ''
};

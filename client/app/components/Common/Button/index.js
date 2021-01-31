/**
 *
 * Button
 *
 */

import React from 'react';

const variants = {
  primary: 'custom-btn-primary',
  secondary: 'custom-btn-secondary',
  danger: 'custom-btn-danger',
  link: 'custom-btn-link',
  dark: 'custom-btn-dark',
  none: 'custom-btn-none'
};

const Button = props => {
  const {
    id,
    size,
    variant,
    tabIndex,
    ariaLabel,
    ariaExpanded,
    type,
    disabled,
    className,
    text,
    role,
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
      id={id}
      tabIndex={tabIndex}
      aria-label={ariaLabel}
      aria-expanded={ariaExpanded}
      role={role}
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

Button.defaultProps = {
  type: 'button',
  variant: 'secondary',
  size: 'md',
  className: ''
};

export default Button;

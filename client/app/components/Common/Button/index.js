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
    iconDirection,
    iconClassName,
    borderless,
    onClick
  } = props;

  const v = variant ? variants[variant] : '';

  // const btnVariant = icon && text ? v : icon && !text ? '' : v;
  const btnVariant = v;

  const btn =
    icon && text ? 'with-icon' : icon && !text ? 'icon-only' : 'text-only';

  const classNames = `input-btn${`${className && ` ${className}`}`}${
    btnVariant && ` ${btnVariant}`
  }${` ${size}`} ${btn} ${
    iconDirection === 'left' ? 'icon-left' : 'icon-right'
  } ${borderless ? 'border-0' : ''}`;

  const iconClassNames = `btn-icon${`${iconClassName && ` ${iconClassName}`}`}`;

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
      {iconDirection === 'left' ? (
        <>
          {icon && <div className={iconClassNames}>{icon}</div>}
          {text && <span className='btn-text'>{text}</span>}
        </>
      ) : (
        <>
          {text && <span className='btn-text'>{text}</span>}
          {icon && <div className={iconClassNames}>{icon}</div>}
        </>
      )}
    </button>
  );
};

Button.defaultProps = {
  type: 'button',
  variant: 'secondary',
  size: 'md',
  className: '',
  iconDirection: 'left',
  iconClassName: '',
  borderless: false
};

export default Button;

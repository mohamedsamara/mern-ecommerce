/**
 *
 * Input
 *
 */

import React from 'react';

const Input = props => {
  const {
    type,
    value,
    error,
    min,
    disabled,
    placeholder,
    label,
    name,
    onInputChange,
    inlineElement
  } = props;

  const _onChange = e => {
    onInputChange(e.target.name, e.target.value);
  };

  if (type === 'textarea') {
    const styles = `input-box${error ? ' invalid' : ''}`;

    return (
      <div className={styles}>
        {label && <label>{label}</label>}
        <textarea
          type={'textarea'}
          onChange={e => {
            _onChange(e);
          }}
          rows='2'
          name={name}
          value={value}
          placeholder={placeholder}
          className={'textarea-text'}
        />
        <span className='invalid-message'>{error && error[0]}</span>
      </div>
    );
  } else if (type === 'number') {
    const styles = `input-box${error ? ' invalid' : ''}`;
    return (
      <div className={styles}>
        {label && <label>{label}</label>}
        <input
          autoComplete='on'
          min={min || 0}
          type={type}
          onChange={e => {
            _onChange(e);
          }}
          disabled={disabled}
          name={name}
          value={value}
          placeholder={placeholder}
          className={'input-number'}
        />
        <span className='invalid-message'>{error && error[0]}</span>
      </div>
    );
  } else {
    const styles = `input-box${inlineElement ? ` inline-btn-box` : ''} ${
      error ? 'invalid' : ''
    }`;

    return (
      <div className={styles}>
        {label && <label>{label}</label>}
        <div className='input-text-block'>
          <input
            className={'input-text'}
            autoComplete='on'
            type={type}
            onChange={e => {
              _onChange(e);
            }}
            disabled={disabled}
            name={name}
            value={value}
            placeholder={placeholder}
          />
          {inlineElement}
        </div>

        <span className='invalid-message'>{error && error[0]}</span>
      </div>
    );
  }
};

Input.defaultProps = {
  inlineElement: null
};

export default Input;

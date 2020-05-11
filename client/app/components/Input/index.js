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

  if (type == 'textarea') {
    return (
      <div className='textarea-box'>
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
      </div>
    );
  } else if (type == 'number') {
    return (
      <div className='input-box'>
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
      </div>
    );
  } else {
    return (
      <div className='input-box'>
        {label && <label>{label}</label>}
        <input
          autoComplete='on'
          type={type}
          onChange={e => {
            _onChange(e);
          }}
          disabled={disabled}
          name={name}
          value={value}
          placeholder={placeholder}
          className={'input-text'}
        />
        {inlineElement}
      </div>
    );
  }
};

export default Input;

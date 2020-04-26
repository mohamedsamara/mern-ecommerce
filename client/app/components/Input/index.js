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
    disabled,
    placeholder,
    label,
    name,
    onInputChange,
    dom
  } = props;

  function onChange(e) {
    onInputChange(e.target.name, e.target.value);
  }

  if (type == 'textarea') {
    return (
      <div className='textarea-box'>
        {label && <label>{label}</label>}
        <textarea
          type={'textarea'}
          onChange={e => {
            onChange(e);
          }}
          rows='2'
          name={name}
          value={value}
          placeholder={placeholder}
          className={'textarea-text'}
        />
        {dom}
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
            onChange(e);
          }}
          disabled={disabled}
          name={name}
          value={value}
          placeholder={placeholder}
          className={'input-text'}
        />
        {dom}
      </div>
    );
  }
};

export default Input;

/**
 *
 * SelectOption
 *
 */

import React from 'react';

import Select from 'react-select';
import makeAnimated from 'react-select/animated';

const SelectOption = props => {
  const { error, label, multi, options, value, handleSelectChange } = props;

  const _handleSelectChange = value => {
    handleSelectChange(value);
  };

  const animatedComponents = makeAnimated();

  const styles = `select-box${error ? ' invalid' : ''}`;

  return (
    <div className={styles}>
      {label && <label>{label}</label>}
      <Select
        className='select-container'
        classNamePrefix='select-option'
        components={animatedComponents}
        isMulti={multi}
        options={options}
        value={value}
        onChange={_handleSelectChange}
      />
      <span className='invalid-message'>{error && error[0]}</span>
    </div>
  );
};

export default SelectOption;

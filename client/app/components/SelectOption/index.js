/**
 *
 * Select
 *
 */

import React from 'react';

import Select from 'react-select';

const SelectOption = props => {
  const { multi, options, value, handleSelectChange } = props;

  function _handleSelectChange(value) {
    handleSelectChange(value);
  }

  return (
    <div className='select-box'>
      <Select
        isMulti={multi}
        options={options}
        value={value}
        onChange={_handleSelectChange}
      />
    </div>
  );
};

export default SelectOption;

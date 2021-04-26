/**
 *
 * select.js
 * this helper formulate data into select options
 */

export const formatSelectOptions = (data, empty = false) => {
  if (!data) return null;

  let newSelectOptions = [];

  data.map(option => {
    let newOption = {};

    newOption.value = option._id;
    newOption.label = option.name;

    newSelectOptions.push(newOption);
  });

  if (empty) {
    const emptyOption = {
      value: 0,
      label: 'No option selected'
    };

    newSelectOptions.unshift(emptyOption);
  }

  return newSelectOptions;
};

export const unformatSelectOptions = data => {
  if (!data) return null;

  let newSelectOptions = [];

  data.map(option => {
    let newOption = {};

    newOption._id = option.value;

    newSelectOptions.push(newOption._id);
  });

  return newSelectOptions;
};

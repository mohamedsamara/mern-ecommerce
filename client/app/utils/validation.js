import Validator from 'validatorjs';

export const allFieldsValidation = (data, rules) => {
  const validation = new Validator(data, rules);
  const validationResponse = { isValid: validation.passes() };
  if (!validationResponse.isValid) {
    validationResponse.errors = validation.errors.all();
  }
  return validationResponse;
};

import Validator from 'validatorjs';

// export const singleFieldValidation = ({ key, value }) => {
//   const validationResponse = { isValid: true };
//   if (rules[key]) {
//     const validation = new Validator({ [key]: value }, { [key]: rules[key] });
//     validationResponse.isValid = validation.passes();
//     if (!validationResponse.isValid) {
//       validationResponse.errors = validation.errors.all();
//     }
//   }
//   return validationResponse;
// };

export const allFieldsValidation = (data, rules) => {
  const validation = new Validator(data, rules);
  const validationResponse = { isValid: validation.passes() };
  if (!validationResponse.isValid) {
    validationResponse.errors = validation.errors.all();
  }
  return validationResponse;
};

import Validator from 'validatorjs';
import DOMPurify from 'dompurify';

export const allFieldsValidation = (data, rules, options) => {
  const validation = new Validator(data, rules, options);
  const validationResponse = { isValid: validation.passes() };
  if (!validationResponse.isValid) {
    validationResponse.errors = validation.errors.all();
  }

  return validationResponse;
};

export const santizeFields = data => {
  const fields = { ...data };

  for (let field in fields) {
    if (typeof field === 'string') {
      fields[field] = DOMPurify.sanitize(fields[field], {
        USE_PROFILES: { html: false }
      });
    }
  }
  return fields;
};

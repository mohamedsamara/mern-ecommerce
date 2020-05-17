const mailchimp = require('../config/mailchimp');

exports.subscribeToNewsletter = async email => {
  let result = {};
  let response;

  try {
    response = await mailchimp.subscribeToNewsletter(email);
  } catch (error) {
    return error;
  }

  if (response) {
    result = response;
  }

  return result;
};

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

exports.unsubscribeFromNewsletter = async subscriberId => {
  let result = {};
  let response;

  try {
    response = await mailchimp.unsubscribeFromNewsletter(subscriberId);
  } catch (error) {
    return error;
  }

  if (response) {
    result = response;
  }

  return result;
};

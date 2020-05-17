const mailgun = require('../config/mailgun');
const template = require('../config/template');

exports.sendEmail = async (email, type, req, data) => {
  let result;
  let response;

  try {
    const message = prepareTemplate(type, req, data);

    response = await mailgun.sendEmail(email, message);
  } catch (error) {}

  if (response) {
    result = response;
  }

  return result;
};

const prepareTemplate = (type, req, data) => {
  let message;

  switch (type) {
    case 'reset':
      message = template.resetEmail(req, data);
      break;

    case 'reset-confirmation':
      message = template.confirmResetPasswordEmail();
      break;

    case 'signup':
      message = template.signupEmail(data);

      break;

    case 'newsletter-subscription':
      message = template.newsletterSubscriptionEmail();
      break;

    case 'contact':
      message = template.contactEmail();
      break;

    case 'merchant-application':
      message = template.merchantApplicationEmail();
      break;

    case 'order-confirmation':
      message = template.orderConfirmationEmail(req, data);
      break;

    default:
      message = '';
  }

  return message;
};

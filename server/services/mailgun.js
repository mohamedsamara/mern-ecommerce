const nodemailer = require("nodemailer");
const template = require("../config/template");
const keys = require("../config/keys");

const { eusername, epassword, sender } = keys.mailgun; // Keeping the same structure

class MailgunService {
  // Retaining the class name to avoid breaking imports/exports
  init() {
    try {
      // Using the provided transporter configuration
      return nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 465,
        auth: {
          user: eusername, // Using environment variables for email and password
          pass: epassword,
        },
      });
    } catch (error) {
      console.warn("Error initializing Nodemailer:", error.message);
    }
  }
}

const mailgun = new MailgunService().init(); // Keeping the variable name 'mailgun'

exports.sendEmail = async (email, type, host, data) => {
  try {
    const message = prepareTemplate(type, host, data);

    const config = {
      from: `MERN Store! <${sender}>`,
      to: email,
      subject: message.subject,
      text: message.text,
    };

    return await mailgun.sendMail(config); // Using sendMail for Nodemailer
  } catch (error) {
    console.error("Error sending email:", error);
    return error;
  }
};

const prepareTemplate = (type, host, data) => {
  let message;

  switch (type) {
    case "reset":
      message = template.resetEmail(host, data);
      break;

    case "reset-confirmation":
      message = template.confirmResetPasswordEmail();
      break;

    case "signup":
      message = template.signupEmail(data);
      break;

    case "merchant-signup":
      message = template.merchantSignup(host, data);
      break;

    case "merchant-welcome":
      message = template.merchantWelcome(data);
      break;

    case "newsletter-subscription":
      message = template.newsletterSubscriptionEmail();
      break;

    case "contact":
      message = template.contactEmail();
      break;

    case "merchant-application":
      message = template.merchantApplicationEmail();
      break;

    case "merchant-deactivate-account":
      message = template.merchantDeactivateAccount();
      break;

    case "order-confirmation":
      message = template.orderConfirmationEmail(data);
      break;

    default:
      message = "";
  }

  return message;
};

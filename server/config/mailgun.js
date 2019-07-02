const mailgun = require('mailgun-js')({
  apiKey: process.env.MAILGUN_KEY,
  domain: process.env.MAILGUN_DOMAIN
});

const sender = process.env.MAILGUN_EMAIL_SENDER;

exports.sendEmail = (recipient, message) => {
  const data = {
    from: `Mo Store!! <${sender}>`,
    to: recipient,
    subject: message.subject,
    text: message.text
  };

  mailgun.messages().send(data, (error, body) => {
    console.log(body);
  });
};

exports.contactForm = (sender, message) => {
  const data = {
    from: sender,
    to: 'you@yourdomain.com',
    subject: message.subject,
    text: message.text
  };

  mailgun.messages().send(data, (error, body) => {
    console.log(body);
  });
};

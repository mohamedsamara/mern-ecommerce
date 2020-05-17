const mailgun = require('mailgun-js')({
  apiKey: process.env.MAILGUN_KEY,
  domain: process.env.MAILGUN_DOMAIN
});

const sender = process.env.MAILGUN_EMAIL_SENDER;

exports.sendEmail = (recipient, message) => {
  return new Promise((resolve, reject) => {
    const data = {
      from: `MERN Store! <${sender}>`,
      to: recipient,
      subject: message.subject,
      text: message.text
    };

    mailgun.messages().send(data, (error, body) => {
      if (error) {
        console.log('error', error);

        reject(error);
      } else {
        resolve(body);
      }
    });
  });
};

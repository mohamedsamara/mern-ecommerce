const mailgun = require('mailgun-js');

const keys = require('./keys');

const key = keys.mailgun.key;
const { domain, sender } = keys.mailgun;
mailgun({
  apiKey: key,
  domain: domain
});

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

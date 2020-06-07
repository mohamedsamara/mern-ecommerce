const Mailchimp = require('mailchimp-api-v3');

const mailchimp = new Mailchimp(process.env.MAILCHIMP_KEY);

exports.subscribeToNewsletter = email => {
  return new Promise((resolve, reject) => {
    mailchimp
      .post(`lists/${process.env.MAILCHIMP_LIST_KEY}/members`, {
        email_address: email,
        status: 'subscribed'
      })
      .then(result => {
        resolve(result);
      })
      .catch(error => {
        reject(error);
      });
  });
};

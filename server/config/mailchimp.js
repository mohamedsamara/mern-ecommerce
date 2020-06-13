const Mailchimp = require('mailchimp-api-v3');

const keys = require('./keys');

const { key, listKey } = keys.mailchimp;
const mailchimp = new Mailchimp(key);

exports.subscribeToNewsletter = email => {
  return new Promise((resolve, reject) => {
    mailchimp
      .post(`lists/${listKey}/members`, {
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

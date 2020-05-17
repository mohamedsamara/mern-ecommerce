const mailchimp = require('mailchimp-v3');

mailchimp.setApiKey(process.env.MAILCHIMP_KEY);

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

exports.unsubscribeToNewsletter = subscriberId => {
  return new Promise((resolve, reject) => {
    mailchimp
      .delete(`lists/${process.env.MAILCHIMP_LIST_KEY}/members/${subscriberId}`)
      .then(result => {
        resolve(result);
      })
      .catch(error => {
        reject(error);
      });
  });
};

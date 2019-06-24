const mailchimp = require('mailchimp-v3');

mailchimp.setApiKey(process.env.MAILCHIMP_KEY);

exports.subscribeToNewsletter = email => {
  mailchimp
    .post(`lists/${process.env.MAILCHIMP_LIST_KEY}/members`, {
      email_address: email,
      status: 'subscribed'
    })
    .then(result => {
      console.log(`${email} has been subscribed to Mailchimp.`);
    })
    .catch(err => {
      console.log('Mailchimp error.');
    });
};

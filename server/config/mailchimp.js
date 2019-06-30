const mailchimp = require('mailchimp-v3');

const mailgun = require('./mailgun');
const template = require('./template');

mailchimp.setApiKey(process.env.MAILCHIMP_KEY);

exports.subscribeToNewsletter = (email, res) => {
  mailchimp
    .post(`lists/${process.env.MAILCHIMP_LIST_KEY}/members`, {
      email_address: email,
      status: 'subscribed'
    })
    .then(result => {
      const message = template.subscribeEmail();
      mailgun.sendEmail(email, message);

      res.status(200).json({
        success: true,
        message: 'You have successfully subscribed to the newsletter'
      });
    })
    .catch(err => {
      res.status(422).json({
        error: 'Mailchimp error! You might be subscribed already.'
      });
    });
};

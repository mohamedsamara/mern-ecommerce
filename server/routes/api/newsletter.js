const express = require('express');
const router = express.Router();

const mailchimp = require('../../config/mailchimp');
const mailgun = require('../../config/mailgun');
const template = require('../../config/template');

router.post('/subscribe', (req, res) => {
  const email = req.body.email;

  mailchimp.subscribeToNewsletter(email);

  const message = template.subscribeEmail();
  mailgun.sendEmail(email, message);
});

module.exports = router;

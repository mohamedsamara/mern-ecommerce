const express = require('express');
const router = express.Router();

const mailchimp = require('../../config/mailchimp');

router.post('/subscribe', (req, res) => {
  const email = req.body.email;

  if (!email) {
    return res.status(422).json({ error: 'You must enter an email address.' });
  }

  mailchimp.subscribeToNewsletter(email, res);
});

module.exports = router;

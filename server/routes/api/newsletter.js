const express = require('express');
const router = express.Router();

const mailchimp = require('../../services/mailchimp');
const mailgun = require('../../services/mailgun');

router.post('/subscribe', async (req, res) => {
  const email = req.body.email;

  if (!email) {
    return res.status(400).json({ error: 'You must enter an email address.' });
  }

  await mailgun.sendEmail(email, 'newsletter-subscription');
  await mailchimp.subscribeToNewsletter(email);

  res.status(200).json({
    success: true,
    message: 'You have successfully subscribed to the newsletter'
  });
});

router.post('/unsubscribe', async (req, res) => {
  const email = req.body.email;

  if (!email) {
    return res.status(400).json({ error: 'You must enter an email address.' });
  }

  await mailchimp.unsubscribeToNewsletter(email);

  res.status(200).json({
    success: true,
    message: 'You have successfully unsubscribed from the newsletter'
  });
});

module.exports = router;

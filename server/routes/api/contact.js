const express = require('express');
const router = express.Router();

// Bring in Models & Helpers
const Contact = require('../../models/contact');
const mailgun = require('../../config/mailgun');
const template = require('../../config/template');

router.post('/add', (req, res) => {
  const name = req.body.name;
  const email = req.body.email;
  const message = req.body.message;

  if (!email) {
    return res.status(422).json({ error: 'You must enter an email address.' });
  }

  if (!name) {
    return res
      .status(422)
      .json({ error: 'You must enter description & name.' });
  }

  if (!message) {
    return res.status(422).json({ error: 'You must enter a message.' });
  }

  const contact = new Contact({
    name,
    email,
    message
  });

  contact.save((err, data) => {
    if (err) {
      return res.status(422).json({
        error: 'Your request could not be processed. Please try again.'
      });
    }

    const message = template.contactEmail();

    mailgun.sendEmail(email, message);

    res.status(200).json({
      success: true,
      message: `We receved your application, we will reach you on your email address ${email}!`,
      contact: data
    });
  });
});

module.exports = router;

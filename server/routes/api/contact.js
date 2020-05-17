const express = require('express');
const router = express.Router();

// Bring in Models & Helpers
const Contact = require('../../models/contact');
const mailgun = require('../../services/mailgun');

router.post('/add', (req, res) => {
  const name = req.body.name;
  const email = req.body.email;
  const message = req.body.message;

  if (!email) {
    return res.status(400).json({ error: 'You must enter an email address.' });
  }

  if (!name) {
    return res
      .status(400)
      .json({ error: 'You must enter description & name.' });
  }

  if (!message) {
    return res.status(400).json({ error: 'You must enter a message.' });
  }

  const contact = new Contact({
    name,
    email,
    message
  });

  contact.save(async (err, data) => {
    if (err) {
      res.status(400).json({
        error: 'Your request could not be processed. Please try again.'
      });
    }

    await mailgun.sendEmail(email, 'contact');

    res.status(200).json({
      success: true,
      message: `We receved your message, we will reach you on your email address ${email}!`,
      contact: data
    });
  });
});

module.exports = router;

const express = require('express');
const router = express.Router();

// Bring in Models & Helpers
const Contact = require('../../models/contact');
const mailgun = require('../../services/mailgun');

router.post('/add', async (req, res) => {
  try {
    const name = req.body.name;
    const email = req.body.email;
    const message = req.body.message;

    if (!email) {
      return res
        .status(400)
        .json({ error: 'You must enter an email address.' });
    }

    if (!name) {
      return res
        .status(400)
        .json({ error: 'You must enter description & name.' });
    }

    if (!message) {
      return res.status(400).json({ error: 'You must enter a message.' });
    }

    const existingContact = await Contact.findOne({ email });

    if (existingContact) {
      return res
        .status(400)
        .json({ error: 'A request already existed for same email address' });
    }

    const contact = new Contact({
      name,
      email,
      message
    });

    const contactDoc = await contact.save();

    await mailgun.sendEmail(email, 'contact');

    res.status(200).json({
      success: true,
      message: `We receved your message, we will reach you on your email address ${email}!`,
      contact: contactDoc
    });
  } catch (error) {
    return res.status(400).json({
      error: 'Your request could not be processed. Please try again.'
    });
  }
});

module.exports = router;

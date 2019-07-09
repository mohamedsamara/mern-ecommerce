const express = require('express');
const router = express.Router();

// Bring in Models & Helpers
const Merchant = require('../../models/merchant');
const mailgun = require('../../config/mailgun');
const template = require('../../config/template');

router.post('/add', (req, res) => {
  const name = req.body.name;
  const business = req.body.business;
  const phoneNumber = req.body.phoneNumber;
  const email = req.body.email;
  const brand = req.body.brand;

  if (!name) {
    return res.status(422).json({ error: 'You must enter your name.' });
  }

  if (!business) {
    return res
      .status(422)
      .json({ error: 'You must enter a business description.' });
  }

  if (!phoneNumber || !email) {
    return res
      .status(422)
      .json({ error: 'You must enter a phone number and an email address.' });
  }

  const merchant = new Merchant({
    name,
    business,
    phoneNumber,
    brand
  });

  merchant.save((err, data) => {
    if (err) {
      return res.status(422).json({
        error: 'Your request could not be processed. Please try again.'
      });
    }

    const message = template.sellApplyEmail();

    mailgun.sendEmail(email, message);

    res.status(200).json({
      success: true,
      message: `We received your application! we will reach you on your phone number ${phoneNumber}!`,
      merchant: data
    });
  });
});

// fetch all merchants api
router.get('/list', (req, res) => {
  Merchant.find({}, (err, data) => {
    if (err) {
      return res.status(422).json({
        error: 'Your request could not be processed. Please try again.'
      });
    }
    res.status(200).json({
      merchants: data
    });
  });
});

module.exports = router;

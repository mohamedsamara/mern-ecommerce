const express = require('express');
const router = express.Router();

// Bring in Models & Helpers
const Merchant = require('../../models/merchant');
const auth = require('../../middleware/auth');
const role = require('../../middleware/role');
const mailgun = require('../../services/mailgun');

router.post('/add', async (req, res) => {
  try {
    const name = req.body.name;
    const business = req.body.business;
    const phoneNumber = req.body.phoneNumber;
    const email = req.body.email;
    const brand = req.body.brand;

    if (!name || !email) {
      return res
        .status(400)
        .json({ error: 'You must enter your name and email.' });
    }

    if (!business) {
      return res
        .status(400)
        .json({ error: 'You must enter a business description.' });
    }

    if (!phoneNumber || !email) {
      return res
        .status(400)
        .json({ error: 'You must enter a phone number and an email address.' });
    }

    const merchant = new Merchant({
      name,
      email,
      business,
      phoneNumber,
      brand
    });

    const merchantDoc = await merchant.save();

    await mailgun.sendEmail(email, 'merchant-application');

    res.status(200).json({
      success: true,
      message: `We received your request! we will reach you on your phone number ${phoneNumber}!`,
      merchant: merchantDoc
    });
  } catch (error) {
    return res.status(400).json({
      error: 'Your request could not be processed. Please try again.'
    });
  }
});

// fetch all merchants api
router.get(
  '/list',
  auth,
  role.checkRole(role.ROLES.Admin),
  async (req, res) => {
    try {
      const merchants = await Merchant.find({}).sort('-created');

      res.status(200).json({
        merchants
      });
    } catch (error) {
      res.status(400).json({
        error: 'Your request could not be processed. Please try again.'
      });
    }
  }
);

// approve merchant
router.put('/approve/:merchantId', auth, async (req, res) => {
  try {
    const merchantId = req.params.merchantId;

    const query = { _id: merchantId };
    const update = {
      status: 'Approved',
      isActive: true
    };

    await Merchant.findOneAndUpdate(query, update, {
      new: true
    });

    res.status(200).json({
      success: true
    });
  } catch (error) {
    res.status(400).json({
      error: 'Your request could not be processed. Please try again.'
    });
  }
});

// reject merchant
router.put('/reject/:merchantId', auth, async (req, res) => {
  try {
    const merchantId = req.params.merchantId;

    const query = { _id: merchantId };
    const update = {
      status: 'Rejected'
    };

    await Merchant.findOneAndUpdate(query, update, {
      new: true
    });

    res.status(200).json({
      success: true
    });
  } catch (error) {
    res.status(400).json({
      error: 'Your request could not be processed. Please try again.'
    });
  }
});

module.exports = router;

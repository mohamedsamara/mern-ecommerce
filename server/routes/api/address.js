const express = require('express');
const router = express.Router();
const passport = require('passport');

// Bring in Models & Helpers
const Shipping = require('../../models/shipping');
const auth = require('../../middleware/auth');
const role = require('../../middleware/role');

router.post('/add', auth, (req, res) => {

  const user = req.user;

  const shipping = new Shipping(Object.assign(req.body,{user:user._id}));

  shipping.save((err, data) => {
    if (err) {
      return res.status(400).json({
        error: 'Your request could not be processed. Please try again.'
      });
    }

    res.status(200).json({
      success: true,
      message: `Address has been added successfully!`,
      address: data
    });
  });
});

// fetch all Shipping api
router.get('/list',  auth, (req, res) => {
  Shipping.find({user:req.user._id}, (err, data) => {
    if (err) {
      return res.status(400).json({
        error: 'Your request could not be processed. Please try again.'
      });
    }

    res.status(200).json({
      addresses: data
    });
  });
});

router.get('/:id', async (req, res) => {
  try {
    const ShippingId = req.params.id;

    const ShippingDoc = await Shipping.findOne({ _id: ShippingId });

    if (!ShippingDoc) {
      res.status(404).json({
        message: `Cannot find Address with the id: ${ShippingId}.`
      });
    }

    res.status(200).json({
      address: ShippingDoc
    });
  } catch (error) {
    res.status(400).json({
      error: 'Your request could not be processed. Please try again.'
    });
  }
});

router.put(
  '/:id',
  async (req, res) => {
    try {
      const ShippingId = req.params.id;
      const update = req.body;
      const query = { _id: ShippingId };

      await Shipping.findOneAndUpdate(query, update, {
        new: true
      });

      res.status(200).json({
        success: true,
        message: 'Address has been updated successfully!'
      });
    } catch (error) {
      res.status(400).json({
        error: 'Your request could not be processed. Please try again.'
      });
    }
  }
);

router.delete(
  '/delete/:id',
  (req, res) => {
    Shipping.deleteOne({ _id: req.params.id }, (err, data) => {
      if (err) {
        return res.status(400).json({
          error: 'Your request could not be processed. Please try again.'
        });
      }

      res.status(200).json({
        success: true,
        message: `Address has been deleted successfully!`,
        address: data
      });
    });
  }
);

module.exports = router;

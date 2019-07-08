const express = require('express');
const router = express.Router();
const passport = require('passport');

// Bring in Models & Helpers
const Cart = require('../../models/Cart');

router.post('/add', (req, res) => {
  const name = req.body.name;
  const description = req.body.description;

  const cart = new Cart({
    name,
    description
  });

  cart.save((err, data) => {
    if (err) {
      return res.status(422).json({
        error: 'Your request could not be processed. Please try again.'
      });
    }

    res.status(200).json({
      success: true,
      message: `Brand has been added successfully!`,
      cart: data
    });
  });
});

// fetch all cart api
router.get('/list', (req, res) => {
  Cart.find({}, (err, data) => {
    if (err) {
      return res.status(422).json({
        error: 'Your request could not be processed. Please try again.'
      });
    }
    res.status(200).json({
      carts: data
    });
  });
});

router.delete(
  '/delete/:id',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    Cart.deleteOne({ _id: req.params.id }, (err, data) => {
      if (err) {
        return res.status(422).json({
          error: 'Your request could not be processed. Please try again.'
        });
      }

      res.status(200).json({
        success: true,
        message: `Brand has been deleted successfully!`,
        cart: data
      });
    });
  }
);

module.exports = router;

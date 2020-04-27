const express = require('express');
const router = express.Router();
const passport = require('passport');

// Bring in Models & Helpers
const Order = require('../../models/order');

router.post(
  '/add',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    const user = req.body.userId;
    const products = req.body.products;

    const order = new Order({
      user,
      products
    });

    order.save((err, order) => {
      if (err) {
        return res.status(400).json({
          error: 'Your request could not be processed. Please try again.'
        });
      }

      res.status(200).json({
        success: true,
        message: `Your order has been placed successfully!`
      });
    });
  }
);

// fetch all orders api
router.get(
  '/list/:userId',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    const user = req.params.userId;

    Order.findOne({ user })
      .populate('products')
      .exec((err, data) => {
        if (err) {
          return res.status(400).json({
            error: 'Your request could not be processed. Please try again.'
          });
        }
        res.status(200).json({
          orders: data
        });
      });
  }
);

module.exports = router;

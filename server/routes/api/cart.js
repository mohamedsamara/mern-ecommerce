const express = require('express');
const router = express.Router();
const passport = require('passport');

// Bring in Models & Helpers
const Cart = require('../../models/Cart');

router.post(
  '/add',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    const quantity = req.body.product.quantity;
    const item = req.body.product._id;
    const user = req.body.user;

    const cart = new Cart({
      quantity,
      item,
      user
    });

    cart.save((err, cart) => {
      if (err) {
        return res.status(422).json({
          error: 'Your request could not be processed. Please try again.'
        });
      }

      Cart.findById(cart._id)
        .populate('item', 'name price slug')
        .exec((err, cart) => {
          if (err) {
            return res.status(422).json({
              error: 'Your request could not be processed. Please try again.'
            });
          }

          res.status(200).json({
            success: true,
            message: `Item has been added to your shopping cart!`,
            cart: cart
          });
        });
    });
  }
);

// fetch all cart api
router.get(
  '/list',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    Cart.find({})
      .populate('item', 'name price slug')
      .exec((err, data) => {
        if (err) {
          return res.status(422).json({
            error: 'Your request could not be processed. Please try again.'
          });
        }
        res.status(200).json({
          items: data
        });
      });
  }
);

router.delete(
  '/delete/:id',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    Cart.deleteOne({ item: req.params.id }, (err, data) => {
      if (err) {
        return res.status(422).json({
          error: 'Your request could not be processed. Please try again.'
        });
      }

      res.status(200).json({
        success: true,
        message: `Item has been removed from your shopping cart!`,
        cart: data
      });
    });
  }
);

module.exports = router;

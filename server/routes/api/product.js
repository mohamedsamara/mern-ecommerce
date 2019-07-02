const express = require('express');
const router = express.Router();
const passport = require('passport');

// Bring in Models & Helpers
const Product = require('../../models/Product');

router.post(
  '/add',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    const sku = req.body.sku;
    const name = req.body.name;
    const description = req.body.description;
    const quantity = req.body.quantity;
    const price = req.body.price;

    if (!sku) {
      return res.status(422).json({ error: 'You must enter sku.' });
    }

    if (!description || !name) {
      return res
        .status(422)
        .json({ error: 'You must enter description & name.' });
    }

    if (!quantity) {
      return res.status(422).json({ error: 'You must enter a quantity.' });
    }

    if (!price) {
      return res.status(422).json({ error: 'You must enter a price.' });
    }

    Product.findOne({ sku }, (err, existingProduct) => {
      if (err) {
        return next(err);
      }

      if (existingProduct) {
        return res.status(422).json({ error: 'This sku is already in use.' });
      }

      const product = new Product({
        sku,
        name,
        description,
        quantity,
        price
      });

      product.save((err, user) => {
        if (err) {
          return next(err);
        }

        res.status(200).json({
          success: true,
          message: `Product has been added successfully!`,
          product: product
        });
      });
    });
  }
);

module.exports = router;

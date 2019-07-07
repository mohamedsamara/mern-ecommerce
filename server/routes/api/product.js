const express = require('express');
const router = express.Router();
const passport = require('passport');

// Bring in Models & Helpers
const Product = require('../../models/Product');
const Brand = require('../../models/Brand');
const Category = require('../../models/Category');

router.post(
  '/add',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    const sku = req.body.sku;
    const name = req.body.name;
    const description = req.body.description;
    const quantity = req.body.quantity;
    const price = req.body.price;
    const brand = req.body.brand;

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
        return res.status(422).json({
          error: 'Your request could not be processed. Please try again.'
        });
      }

      if (existingProduct) {
        return res.status(422).json({ error: 'This sku is already in use.' });
      }

      const product = new Product({
        sku,
        name,
        description,
        quantity,
        price,
        brand
      });

      product.save((err, product) => {
        if (err) {
          return res.status(422).json({
            error: 'Your request could not be processed. Please try again.'
          });
        }

        Product.findById(product._id)
          .populate('brand', 'name')
          .exec((err, product) => {
            if (err) {
              return res.status(422).json({
                error: 'Your request could not be processed. Please try again.'
              });
            }
            res.status(200).json({
              success: true,
              message: `Product has been added successfully!`,
              product: product
            });
          });
      });
    });
  }
);

// fetch all products api
router.get('/list', (req, res) => {
  Product.find({})
    .populate('brand', 'name')
    .exec((err, data) => {
      if (err) {
        return res.status(422).json({
          error: 'Your request could not be processed. Please try again.'
        });
      }
      res.status(200).json({
        products: data
      });
    });
});

// fetch all products by category api
router.get('/list/category/:slug', (req, res) => {
  const slug = req.params.slug;

  Category.findOne({ slug: slug }, 'products -_id')
    .populate('products')
    .exec((err, data) => {
      if (err) {
        return res.status(422).json({
          error: 'Your request could not be processed. Please try again.'
        });
      }

      res.status(200).json({
        products: data.products
      });
    });
});

// fetch all products by brand api
router.get('/list/brand/:slug', (req, res) => {
  const slug = req.params.slug;

  Brand.find({ slug: slug }, (err, brand) => {
    if (err) {
      return res.status(422).json({
        error: 'Your request could not be processed. Please try again.'
      });
    }

    Product.find({ brand: brand[0]._id })
      .populate('brand', 'name')
      .exec((err, data) => {
        if (err) {
          return res.status(422).json({
            error: 'Your request could not be processed. Please try again.'
          });
        }
        res.status(200).json({
          products: data
        });
      });
  });
});

router.get(
  '/list/select',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    Product.find({}, 'name', (err, data) => {
      if (err) {
        return res.status(422).json({
          error: 'Your request could not be processed. Please try again.'
        });
      }

      res.status(200).json({
        products: data
      });
    });
  }
);

router.delete(
  '/delete/:id',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    Product.deleteOne({ _id: req.params.id }, (err, data) => {
      if (err) {
        return res.status(422).json({
          error: 'Your request could not be processed. Please try again.'
        });
      }

      res.status(200).json({
        success: true,
        message: `Product has been deleted successfully!`,
        product: data
      });
    });
  }
);

module.exports = router;

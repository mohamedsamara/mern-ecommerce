const express = require('express');
const router = express.Router();
const passport = require('passport');

// Bring in Models & Helpers
const Category = require('../../models/category');

router.post(
  '/add',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    const name = req.body.name;
    const description = req.body.description;
    const products = req.body.products;

    if (!description || !name) {
      return res
        .status(422)
        .json({ error: 'You must enter description & name.' });
    }

    const category = new Category({
      name,
      description,
      products
    });

    category.save((err, category) => {
      if (err) {
        return res.status(422).json({
          error: 'Your request could not be processed. Please try again.'
        });
      }

      res.status(200).json({
        success: true,
        message: `Category has been added successfully!`,
        category: category
      });
    });
  }
);

// fetch all categories api
router.get('/list', (req, res) => {
  Category.find({}, (err, data) => {
    if (err) {
      return res.status(422).json({
        error: 'Your request could not be processed. Please try again.'
      });
    }
    res.status(200).json({
      categories: data
    });
  });
});

router.delete(
  '/delete/:id',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    Category.deleteOne({ _id: req.params.id }, (err, data) => {
      if (err) {
        res.status(422).json({
          error: 'Your request could not be processed. Please try again.'
        });
      }

      res.status(200).json({
        success: true,
        message: `Category has been deleted successfully!`,
        brand: data
      });
    });
  }
);

module.exports = router;

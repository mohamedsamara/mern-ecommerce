const express = require('express');
const router = express.Router();
const passport = require('passport');

// Bring in Models & Helpers
const Category = require('../../models/Category');

router.post(
  '/add',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    const name = req.body.name;
    const description = req.body.description;

    if (!description || !name) {
      return res
        .status(422)
        .json({ error: 'You must enter description & name.' });
    }

    const category = new Category({
      name,
      description
    });

    category.save((err, category) => {
      if (err) {
        return next(err);
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
router.get(
  '/list',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    Category.find({}, (err, data) => {
      if (err) {
        res.status(422).json({
          error: 'Your request could not be processed. Please try again.'
        });
      }
      res.status(200).json({
        categories: data
      });
    });
  }
);

// fetch categories selection api
router.get(
  '/list/select',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    Category.find({}, 'name description', (err, data, fieldNames) => {
      if (err) {
        res.status(422).json({
          error: 'Your request could not be processed. Please try again.'
        });
      }

      res.status(200).json({
        categories: data
      });
    });
  }
);

module.exports = router;

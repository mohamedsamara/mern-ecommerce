const express = require('express');
const router = express.Router();
const passport = require('passport');

// Bring in Models & Helpers
const Brand = require('../../models/Brand');

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

    const brand = new Brand({
      name,
      description
    });

    brand.save((err, brand) => {
      if (err) {
        return res.status(422).json({
          error: 'Your request could not be processed. Please try again.'
        });
      }

      res.status(200).json({
        success: true,
        message: `Brand has been added successfully!`,
        brand: brand
      });
    });
  }
);

// fetch all brands api
router.get('/list', (req, res) => {
  Brand.find({}, (err, data) => {
    if (err) {
      return res.status(422).json({
        error: 'Your request could not be processed. Please try again.'
      });
    }
    res.status(200).json({
      brands: data
    });
  });
});

router.get(
  '/list/select',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    Brand.find({}, 'name', (err, data) => {
      if (err) {
        return res.status(422).json({
          error: 'Your request could not be processed. Please try again.'
        });
      }

      res.status(200).json({
        brands: data
      });
    });
  }
);

router.delete(
  '/delete/:id',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    Brand.deleteOne({ _id: req.params.id }, (err, data) => {
      if (err) {
        return res.status(422).json({
          error: 'Your request could not be processed. Please try again.'
        });
      }

      res.status(200).json({
        success: true,
        message: `Brand has been deleted successfully!`,
        brand: data
      });
    });
  }
);

module.exports = router;

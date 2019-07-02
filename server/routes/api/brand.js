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
        return next(err);
      }

      res.status(200).json({
        success: true,
        message: `Brand has been added successfully!`,
        brand: brand
      });
    });
  }
);

module.exports = router;

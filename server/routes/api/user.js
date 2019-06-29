const express = require('express');
const router = express.Router();
const passport = require('passport');

// Bring in Models & Helpers
const User = require('../../models/User');

router.get(
  '/:userId',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    const userId = req.params.userId;

    User.findById(userId, (err, user) => {
      res.status(200).json({
        user: user
      });
    });
  }
);

router.post(
  '/:userId',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    const profile = req.body.profile;
    let query = { _id: req.params.userId };

    User.updateOne(query, { profile: profile }, (err, user) => {
      res.status(200).json({
        success: 'updated',
        user: user
      });
    });
  }
);

module.exports = router;

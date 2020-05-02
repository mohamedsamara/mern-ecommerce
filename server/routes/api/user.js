const express = require('express');
const router = express.Router();
const passport = require('passport');

// Bring in Models & Helpers
const User = require('../../models/user');

// fetch all users api
router.get(
  '/users',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    User.find({}, (err, data) => {
      if (err) {
        return res.status(400).json({
          error: 'Your request could not be processed. Please try again.'
        });
      }
      res.status(200).json({
        users: data
      });
    });
  }
);

router.get(
  '/:userId',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    const userId = req.params.userId;

    User.findById(userId, { password: 0 }, (err, user) => {
      if (err) {
        return res.status(400).json({
          error: 'Your request could not be processed. Please try again.'
        });
      }

      res.status(200).json({
        user: user
      });
    });
  }
);

router.put(
  '/:userId',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    const profile = req.body.profile;
    const query = { _id: req.params.userId };

    User.updateOne(query, { profile: profile }, (err, user) => {
      if (err) {
        return res.status(400).json({
          error: 'Your request could not be processed. Please try again.'
        });
      }

      res.status(200).json({
        success: true,
        message: 'Your profile is successfully updated!',
        user: user
      });
    });
  }
);

module.exports = router;

const express = require('express');
const router = express.Router();
const passport = require('passport');

const mailchimp = require('../../services/mailchimp');

// Bring in Models & Helpers
const User = require('../../models/user');

// fetch all users api
router.get(
  '/users',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    User.find({}, (err, data) => {
      if (err) {
        res.status(400).json({
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
        res.status(400).json({
          error: 'Your request could not be processed. Please try again.'
        });
      }

      res.status(200).json({
        user
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
    const update = {
      profile
    };

    User.findOneAndUpdate(
      query,
      update,
      {
        new: true
      },
      (err, user) => {
        if (err) {
          res.status(400).json({
            error: 'Your request could not be processed. Please try again.'
          });
        }

        res.status(200).json({
          success: true,
          message: 'Your profile is successfully updated!',
          user
        });
      }
    );
  }
);

router.post(
  '/unsubscribe/:subscriberId',
  passport.authenticate('jwt', { session: false }),
  async (req, res) => {
    const subscriberId = req.params.subscriberId;
    const query = { _id: req.user._id };

    await mailchimp.unsubscribeFromNewsletter(subscriberId);

    const update = {
      $set: { 'profile.subscriberId': '' }
    };

    User.findOneAndUpdate(
      query,
      update,
      {
        new: true
      },
      (err, user) => {
        if (err) {
          return res.status(400).json({
            error: 'Your request could not be processed. Please try again.'
          });
        }

        res.status(200).json({
          success: true,
          message: 'You have successfully unsubscribed from the newsletter',
          user
        });
      }
    );
  }
);

router.post(
  '/subscribe',
  passport.authenticate('jwt', { session: false }),
  async (req, res) => {
    const email = req.user.email;
    const query = { _id: req.user._id };

    let subscriberId = '';
    const result = await mailchimp.subscribeToNewsletter(email);

    if (result.status === 'subscribed') {
      subscriberId = result.id;
    } else {
      return res.status(400).json({ error: result.title });
    }

    const update = {
      $set: { 'profile.subscriberId': subscriberId }
    };

    User.findOneAndUpdate(
      query,
      update,
      {
        new: true
      },
      (err, user) => {
        if (err) {
          return res.status(400).json({
            error: 'Your request could not be processed. Please try again.'
          });
        }

        res.status(200).json({
          success: true,
          message: 'You have successfully subscribed from the newsletter',
          user
        });
      }
    );
  }
);

module.exports = router;

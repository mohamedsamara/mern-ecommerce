const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const passport = require('passport');

// Bring in Models
const User = require('../models/User');
const mailchimp = require('../config/mailchimp');

const key = process.env.SECRET_OR_KEY;

router.post('/login', (req, res) => {
  const email = req.body.email;
  const password = req.body.password;

  User.findOne({ email }).then(user => {
    if (!user) {
      return res
        .status(422)
        .send({ error: 'no user found for this email address.' });
    }
    bcrypt.compare(password, user.password).then(isMatch => {
      if (isMatch) {
        const payload = { id: user.id };
        jwt.sign(payload, key, { expiresIn: 3600 }, (err, token) => {
          res.status(200).json({
            success: true,
            token: `Bearer ${token}`,
            user: {
              id: user.id,
              firstName: user.profile.firstName,
              lastName: user.profile.lastName,
              email: user.email,
              role: user.role
            }
          });
        });
      } else {
        res.status(404).json({
          success: false,
          error: 'Password Incorrect'
        });
      }
    });
  });
});

router.post('/register', (req, res, next) => {
  const email = req.body.email;
  const firstName = req.body.firstName;
  const lastName = req.body.lastName;
  const password = req.body.password;

  if (!email) {
    return res.status(422).json({ error: 'You must enter an email address.' });
  }

  if (!firstName || !lastName) {
    return res.status(422).json({ error: 'You must enter your full name.' });
  }

  if (!password) {
    return res.status(422).json({ error: 'You must enter a password.' });
  }

  User.findOne({ email }, (err, existingUser) => {
    if (err) {
      return next(err);
    }

    if (existingUser) {
      return res
        .status(422)
        .json({ error: 'That email address is already in use.' });
    }

    const user = new User({
      email,
      password,
      profile: { firstName, lastName }
    });

    bcrypt.genSalt(10, (err, salt) => {
      bcrypt.hash(user.password, salt, (err, hash) => {
        if (err) {
          console.log(err);
        }
        user.password = hash;

        user.save((err, user) => {
          if (err) {
            return next(err);
          }

          const payload = { id: user.id };

          jwt.sign(payload, key, { expiresIn: 3600 }, (err, token) => {
            res.status(200).json({
              success: true,
              token: `Bearer ${token}`,
              user: {
                id: user.id,
                firstName: user.profile.firstName,
                lastName: user.profile.lastName,
                email: user.email,
                role: user.role
              }
            });
          });
        });
      });
    });
  });
});

router.get('/profile/:userId', (req, res) => {
  const userId = req.params.userId;

  User.findById(userId, (err, user) => {
    res.status(200).json({
      user: user
    });
  });
});

router.post('/profile/:userId', (req, res) => {
  const profile = req.body.profile;
  let query = { _id: req.params.userId };

  User.updateOne(query, { profile: profile }, (err, user) => {
    res.status(200).json({
      success: 'updated',
      user: user
    });
  });
});

router.post('/subscribe', (req, res) => {
  const email = req.body.email;

  mailchimp.subscribeToNewsletter(email);
});

module.exports = router;

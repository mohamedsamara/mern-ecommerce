const express = require('express');
const router = express.Router();

// Bring in Models & Helpers
const User = require('../../models/user');
const auth = require('../../middleware/auth');
const role = require('../../middleware/role');

// fetch all users api
router.get('/list', auth, role.checkRole(role.ROLES.Admin), (req, res) => {
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
});

router.get('/', auth, (req, res) => {
  const user = req.user._id;

  User.findById(user, { password: 0, _id: 0 }, (err, user) => {
    if (err) {
      return res.status(400).json({
        error: 'Your request could not be processed. Please try again.'
      });
    }

    res.status(200).json({
      user
    });
  });
});

router.put('/', auth, (req, res) => {
  const user = req.user._id;
  const update = req.body.profile;
  const query = { _id: user };

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
        message: 'Your profile is successfully updated!',
        user
      });
    }
  );
});

module.exports = router;

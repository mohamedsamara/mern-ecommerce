const express = require('express');
const router = express.Router();

// Bring in Models & Helpers
const User = require('../../models/user');
const Brand = require('../../models/brand');
const auth = require('../../middleware/auth');
const role = require('../../middleware/role');

// search users api
router.get(
  '/search',
  auth,
  role.checkRole(role.ROLES.Admin),
  async (req, res) => {
    try {
      const { search } = req.query;

      const regex = new RegExp(search, 'i');

      const users = await User.find(
        {
          $or: [
            { firstName: { $regex: regex } },
            { lastName: { $regex: regex } },
            { email: { $regex: regex } }
          ]
        },
        { password: 0, _id: 0 }
      ).populate('merchant', 'name');

      res.status(200).json({
        users
      });
    } catch (error) {
      res.status(400).json({
        error: 'Your request could not be processed. Please try again.'
      });
    }
  }
);

// fetch users api
router.get('/', auth, async (req, res) => {
  try {
    const { page = 1, limit = 10 } = req.query;

    const users = await User.find({}, { password: 0, _id: 0, googleId: 0 })
      .sort('-created')
      .populate('merchant', 'name')
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .exec();

    const count = await User.countDocuments();

    res.status(200).json({
      users,
      totalPages: Math.ceil(count / limit),
      currentPage: Number(page),
      count
    });
  } catch (error) {
    res.status(400).json({
      error: 'Your request could not be processed. Please try again.'
    });
  }
});

router.get('/me', auth, async (req, res) => {
  try {
    const user = req.user._id;
    const userDoc = await User.findById(user, { password: 0 });

    res.status(200).json({
      user: userDoc
    });
  } catch (error) {
    res.status(400).json({
      error: 'Your request could not be processed. Please try again.'
    });
  }
});

router.put('/', auth, async (req, res) => {
  try {
    const user = req.user._id;
    const update = req.body.profile;
    const query = { _id: user };

    const userDoc = await User.findOneAndUpdate(query, update, {
      new: true
    });

    res.status(200).json({
      success: true,
      message: 'Your profile is successfully updated!',
      user: userDoc
    });
  } catch (error) {
    res.status(400).json({
      error: 'Your request could not be processed. Please try again.'
    });
  }
});

module.exports = router;

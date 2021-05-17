const express = require('express');
const router = express.Router();

// Bring in Models & Helpers
const Wishlist = require('../../models/wishlist');
const Product = require('../../models/product');
const auth = require('../../middleware/auth');

router.post('/', auth, async (req, res) => {
  try {
    const user = req.user;
    const update = Object.assign(req.body,{updated : Date.now()});
    const query = { product: update.product,user:user._id };

    const updateWishlist = await Wishlist.findOneAndUpdate(query, update, {
      new: true
    });
    if (updateWishlist !==null) {
      res.status(200).json({
        success: true,
        message: 'Wishlist has been updated successfully!',
        wishlist: updateWishlist
      });
    } else {
      const wishlist = new Wishlist(Object.assign(req.body, { user: user._id }));

      wishlist.save((err, data) => {
        if (err) {
          return res.status(400).json({
            error: 'Your request could not be processed. Please try again.'
          });
        }

        res.status(200).json({
          success: true,
          message: `Wishlist has been added successfully!`,
          wishlist: data
        });
      });
    }
  } catch (e) {
    return res.status(400).json({
      error: 'Your request could not be processed. Please try again.'
    });
  }
});

module.exports = router;

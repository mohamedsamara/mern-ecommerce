const express = require('express');
const router = express.Router();

// Bring in Models & Helpers
const Review = require('../../models/review');
const Product = require('../../models/product');
const auth = require('../../middleware/auth');

router.post('/add', auth, (req, res) => {
  const user = req.user;

  const review = new Review(Object.assign(req.body, { user: user._id }));

  review.save((err, data) => {
    if (err) {
      return res.status(400).json({
        error: 'Your request could not be processed. Please try again.'
      });
    }

    res.status(200).json({
      success: true,
      message: `review has been added successfully!`,
      review: data
    });
  });
});

router.get('/:slug', async (req, res) => {
  try {

    const product = await Product.findOne({slug:req.params.slug});

    if (!product._id) {
      res.status(404).json({
        message: `Cannot find review with the id: ${product._id}.`
      });
    }

    const reviewDoc = await Review.find({ product: product._id });

    if (reviewDoc.length < 0) {
      res.status(404).json({
        message: `Cannot find review with the id: ${product._id}.`
      });
    }

    res.status(200).json({
      reviews: reviewDoc
    });

  } catch (error) {
    res.status(400).json({
      error: 'Your request could not be processed. Please try again.'
    });
  }
});

router.put('/:id', async (req, res) => {
  try {
    const reviewId = req.params.id;
    const update = req.body;
    const query = { _id: reviewId };

    await Review.findOneAndUpdate(query, update, {
      new: true
    });

    res.status(200).json({
      success: true,
      message: 'review has been updated successfully!'
    });
  } catch (error) {
    res.status(400).json({
      error: 'Your request could not be processed. Please try again.'
    });
  }
});

router.delete('/delete/:id', (req, res) => {
  Review.deleteOne({ _id: req.params.id }, (err, data) => {
    if (err) {
      return res.status(400).json({
        error: 'Your request could not be processed. Please try again.'
      });
    }

    res.status(200).json({
      success: true,
      message: `review has been deleted successfully!`,
      review: data
    });
  });
});

module.exports = router;

const express = require('express');
const router = express.Router();
const passport = require('passport');

// Bring in Models & Helpers
const Category = require('../../models/category');
const auth = require('../../middleware/auth');
const role = require('../../middleware/role');

router.post('/add', auth, role.checkRole(role.ROLES.Admin), (req, res) => {
  const name = req.body.name;
  const description = req.body.description;
  const products = req.body.products;

  if (!description || !name) {
    return res
      .status(400)
      .json({ error: 'You must enter description & name.' });
  }

  const category = new Category({
    name,
    description,
    products
  });

  category.save((err, data) => {
    if (err) {
      return res.status(400).json({
        error: 'Your request could not be processed. Please try again.'
      });
    }

    res.status(200).json({
      success: true,
      message: `Category has been added successfully!`,
      category: data
    });
  });
});

// fetch all categories api
router.get('/list', (req, res) => {
  Category.find({}, (err, data) => {
    if (err) {
      return res.status(400).json({
        error: 'Your request could not be processed. Please try again.'
      });
    }
    res.status(200).json({
      categories: data
    });
  });
});

router.delete(
  '/delete/:id',
  auth,
  role.checkRole(role.ROLES.Admin),
  (req, res) => {
    Category.deleteOne({ _id: req.params.id }, (err, data) => {
      if (err) {
        return res.status(400).json({
          error: 'Your request could not be processed. Please try again.'
        });
      }

      res.status(200).json({
        success: true,
        message: `Category has been deleted successfully!`,
        brand: data
      });
    });
  }
);

module.exports = router;

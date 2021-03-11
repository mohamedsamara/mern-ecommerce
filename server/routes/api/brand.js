const express = require('express');
const router = express.Router();

// Bring in Models & Helpers
const Brand = require('../../models/brand');
const auth = require('../../middleware/auth');
const role = require('../../middleware/role');

router.post('/add', auth, role.checkRole(role.ROLES.Admin), (req, res) => {
  const name = req.body.name;
  const description = req.body.description;

  if (!description || !name) {
    return res
      .status(400)
      .json({ error: 'You must enter description & name.' });
  }

  const brand = new Brand({
    name,
    description
  });

  brand.save((err, data) => {
    if (err) {
      return res.status(400).json({
        error: 'Your request could not be processed. Please try again.'
      });
    }

    res.status(200).json({
      success: true,
      message: `Brand has been added successfully!`,
      brand: data
    });
  });
});

// fetch all brands api
router.get('/list', (req, res) => {
  Brand.find({}, (err, data) => {
    if (err) {
      return res.status(400).json({
        error: 'Your request could not be processed. Please try again.'
      });
    }
    res.status(200).json({
      brands: data
    });
  });
});

router.get('/list/select', auth, (req, res) => {
  Brand.find({}, 'name', (err, data) => {
    if (err) {
      return res.status(400).json({
        error: 'Your request could not be processed. Please try again.'
      });
    }

    res.status(200).json({
      brands: data
    });
  });
});

router.delete(
  '/delete/:id',
  auth,
  role.checkRole(role.ROLES.Admin),
  (req, res) => {
    Brand.deleteOne({ _id: req.params.id }, (err, data) => {
      if (err) {
        return res.status(400).json({
          error: 'Your request could not be processed. Please try again.'
        });
      }

      res.status(200).json({
        success: true,
        message: `Brand has been deleted successfully!`,
        brand: data
      });
    });
  }
);

module.exports = router;

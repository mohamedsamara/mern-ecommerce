const express = require('express');
const router = express.Router();

// Bring in Models & Helpers
const Cart = require('../../models/cart');
const auth = require('../../middleware/auth');

// create cart Id
// router.post('/create', auth, (req, res) => {
//   const user = req.user._id;

//   const cart = new Cart({
//     user
//   });

//   cart.save((err, data) => {
//     if (err) {
//       return res.status(400).json({
//         error: 'Your request could not be processed. Please try again.'
//       });
//     }

//     res.status(200).json({
//       success: true,
//       cartId: data.id
//     });
//   });
// });

// router.post('/push/:cartId', auth, (req, res) => {
//   const products = req.body.products;
//   const query = { _id: req.params.cartId };

//   Cart.updateOne(query, { products }).exec(err => {
//     if (err) {
//       return res.status(400).json({
//         error: 'Your request could not be processed. Please try again.'
//       });
//     }
//     res.status(200).json({
//       success: true
//     });
//   });
// });

router.post('/add', auth, (req, res) => {
  const user = req.user._id;
  const products = req.body.products;

  const cart = new Cart({
    user,
    products
  });

  cart.save((err, data) => {
    if (err) {
      return res.status(400).json({
        error: 'Your request could not be processed. Please try again.'
      });
    }

    res.status(200).json({
      success: true,
      cartId: data.id
    });
  });
});

router.delete('/delete/:cartId', auth, (req, res) => {
  Cart.deleteOne({ _id: req.params.cartId }, err => {
    if (err) {
      return res.status(400).json({
        error: 'Your request could not be processed. Please try again.'
      });
    }
    res.status(200).json({
      success: true
    });
  });
});

router.post('/add/:cartId', auth, (req, res) => {
  const product = req.body.product;
  const query = { _id: req.params.cartId };

  Cart.updateOne(query, { $push: { products: product } }).exec(err => {
    if (err) {
      return res.status(400).json({
        error: 'Your request could not be processed. Please try again.'
      });
    }
    res.status(200).json({
      success: true
    });
  });
});

router.delete('/delete/:cartId/:productId', auth, (req, res) => {
  const product = { product: req.params.productId };
  const query = { _id: req.params.cartId };

  Cart.updateOne(query, { $pull: { products: product } }).exec(err => {
    if (err) {
      return res.status(400).json({
        error: 'Your request could not be processed. Please try again.'
      });
    }
    res.status(200).json({
      success: true
    });
  });
});

module.exports = router;

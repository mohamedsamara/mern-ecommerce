const express = require('express');
const router = express.Router();
const passport = require('passport');

// Bring in Models & Helpers
const Order = require('../../models/order');
const Cart = require('../../models/cart');
const mailgun = require('../../services/mailgun');
const taxConfig = require('../../config/tax');

router.post(
  '/add',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    const cart = req.body.cartId;
    const user = req.body.userId;
    const total = req.body.total;

    const order = new Order({
      cart,
      user,
      total
    });

    order.save((err, order) => {
      if (err) {
        return res.status(400).json({
          error: 'Your request could not be processed. Please try again.'
        });
      }

      Order.findById(order._id)
        .populate('cart user', '-password')
        .exec((err, doc) => {
          if (err) {
            return res.status(400).json({
              error: 'Your request could not be processed. Please try again.'
            });
          }

          Cart.findById(doc.cart._id)
            .populate({
              path: 'products.product',
              populate: {
                path: 'brand'
              }
            })
            .exec(async (err, data) => {
              if (err) {
                return res.status(400).json({
                  error:
                    'Your request could not be processed. Please try again.'
                });
              }

              const order = {
                _id: doc._id,
                created: doc.created,
                user: doc.user,
                total: doc.total,
                products: data.products
              };

              await mailgun.sendEmail(
                order.user.email,
                'order-confirmation',
                req,
                order
              );

              res.status(200).json({
                success: true,
                message: `Your order has been placed successfully!`,
                order: { _id: doc._id }
              });
            });
        });
    });
  }
);

// fetch all orders api
router.get(
  '/list/:userId',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    const user = req.params.userId;
    Order.find({ user })
      .populate({
        path: 'cart'
        // populate: {
        //   path: 'cart.products',
        //   populate: {
        //     path: 'products.product',
        //     populate: {
        //       path: 'product.brand'
        //     }
        //   }
        // }
      })
      .exec((err, docs) => {
        if (err) {
          return res.status(400).json({
            error: 'Your request could not be processed. Please try again.'
          });
        }

        if (docs.length > 0) {
          const newDataSet = [];
          docs.forEach(doc => {
            Cart.findById(doc.cart._id)
              .populate({
                path: 'products.product',
                populate: {
                  path: 'brand'
                }
              })
              .exec((err, data) => {
                if (err) {
                  return res.status(400).json({
                    error:
                      'Your request could not be processed. Please try again.'
                  });
                }

                const order = {
                  _id: doc._id,
                  total: doc.total,
                  created: doc.created,
                  products: data.products
                };

                newDataSet.push(order);

                if (newDataSet.length === docs.length) {
                  res.status(200).json({
                    orders: newDataSet
                  });
                }
              });
          });
        } else {
          res.status(404).json({
            message: `You have no orders yet!`
          });
        }
      });
  }
);

// fetch order api
router.get(
  '/:orderId',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    const orderId = req.params.orderId;

    Order.findById(orderId)
      .populate({
        path: 'cart'
      })
      .exec((err, doc) => {
        if (err || !doc) {
          return res.status(404).json({
            message: `Cannot find order with the id: ${orderId}.`
          });
        }

        // if (!doc) {
        //   return res.status(404).json({
        //     message: `Cannot find order with the id: ${orderId}.`
        //   });
        // }

        Cart.findById(doc.cart._id)
          .populate({
            path: 'products.product',
            populate: {
              path: 'brand'
            }
          })
          .exec((err, data) => {
            if (err) {
              return res.status(400).json({
                error: 'Your request could not be processed. Please try again.'
              });
            }

            let order = {
              _id: doc._id,
              total: doc.total,
              totalTax: doc.totalTax,
              created: doc.created,
              products: data.products
            };

            order = caculateTaxAmount(order);

            res.status(200).json({
              order
            });
          });
      });
  }
);

// calculate order tax amount
const caculateTaxAmount = order => {
  const taxRate = taxConfig.stateTaxRate;

  order.totalTax = 0;

  order.products.forEach(item => {
    if (item.product.taxable) {
      const price = Number(item.product.price).toFixed(2);
      const taxAmount = Math.round(price * taxRate * 100) / 100;
      item.priceWithTax = parseFloat(price) + parseFloat(taxAmount);

      order.totalTax += taxAmount;
    }
  });

  order.totalWithTax = order.total + order.totalTax;

  return order;
};

module.exports = router;

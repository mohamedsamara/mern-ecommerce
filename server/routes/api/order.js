const express = require('express');
const router = express.Router();

// Bring in Models & Helpers
const Order = require('../../models/order');
const Cart = require('../../models/cart');
const Product = require('../../models/product');
const auth = require('../../middleware/auth');
const role = require('../../middleware/role');
const mailgun = require('../../services/mailgun');
const store = require('../../helpers/store');

router.post('/add', auth, async (req, res) => {
  try {
    const cart = req.body.cartId;
    const total = req.body.total;
    const user = req.user._id;

    const order = new Order({
      cart,
      user,
      total
    });

    const orderDoc = await order.save();

    await Order.findById(orderDoc._id).populate('cart user', '-password');

    const cartDoc = await Cart.findById(orderDoc.cart._id).populate({
      path: 'products.product',
      populate: {
        path: 'brand'
      }
    });

    const newOrder = {
      _id: orderDoc._id,
      created: orderDoc.created,
      user: orderDoc.user,
      total: orderDoc.total,
      products: cartDoc.products
    };

    await mailgun.sendEmail(order.user.email, 'order-confirmation', newOrder);

    res.status(200).json({
      success: true,
      message: `Your order has been placed successfully!`,
      order: { _id: orderDoc._id }
    });
  } catch (error) {
    res.status(400).json({
      error: 'Your request could not be processed. Please try again.'
    });
  }
});

// fetch orders api
router.get('/', auth, async (req, res) => {
  try {
    let ordersDoc = null;

    if (req.user.role === role.ROLES.Admin) {
      ordersDoc = await Order.find({})
        .populate({
          path: 'cart'
        })
        .populate({
          path: 'products.product',
          populate: {
            path: 'brand'
          }
        });
    } else {
      const user = req.user._id;

      ordersDoc = await Order.find({ user })
        .populate({
          path: 'cart'
        })
        .populate({
          path: 'products.product',
          populate: {
            path: 'brand'
          }
        });
    }

    if (ordersDoc.length > 0) {
      const newOrders = ordersDoc.map(o => {
        return {
          _id: o?._id,
          total: parseFloat(Number(o?.total.toFixed(2))),
          created: o?.created,
          products: o?.cart?.products
        };
      });

      const orders = newOrders.map(o => store.caculateTaxAmount(o));
      orders.sort((a, b) => b.created - a.created);
      res.status(200).json({
        orders
      });
    } else {
      res.status(200).json({
        orders: []
      });
    }
  } catch (error) {
    console.log('error', error);
    res.status(400).json({
      error: 'Your request could not be processed. Please try again.'
    });
  }
});

// fetch order api
router.get('/:orderId', auth, async (req, res) => {
  try {
    const orderId = req.params.orderId;

    let orderDoc = null;

    if (req.user.role === role.ROLES.Admin) {
      orderDoc = await Order.findOne({ _id: orderId })
        .populate({
          path: 'cart'
        })
        .populate({
          path: 'products.product',
          populate: {
            path: 'brand'
          }
        });
    } else {
      const user = req.user._id;
      orderDoc = await Order.findOne({ _id: orderId, user })
        .populate({
          path: 'cart'
        })
        .populate({
          path: 'products.product',
          populate: {
            path: 'brand'
          }
        });
    }

    if (!orderDoc) {
      return res.status(404).json({
        message: `Cannot find order with the id: ${orderId}.`
      });
    }

    let order = {
      _id: orderDoc._id,
      cartId: orderDoc.cart._id,
      total: orderDoc.total,
      totalTax: 0,
      created: orderDoc.created,
      products: orderDoc.cart.products
    };

    order = store.caculateTaxAmount(order);

    res.status(200).json({
      order
    });
  } catch (error) {
    res.status(400).json({
      error: 'Your request could not be processed. Please try again.'
    });
  }
});

router.delete('/cancel/:orderId', auth, async (req, res) => {
  try {
    const orderId = req.params.orderId;

    const order = await Order.findOne({ _id: orderId });
    const foundCart = await Cart.findOne({ _id: order.cart });

    increaseQuantity(foundCart.products);

    await Order.deleteOne({ _id: orderId });
    await Cart.deleteOne({ _id: order.cart });

    res.status(200).json({
      success: true
    });
  } catch (error) {
    res.status(400).json({
      error: 'Your request could not be processed. Please try again.'
    });
  }
});

router.put('/cancel/item/:itemId', auth, async (req, res) => {
  try {
    const itemId = req.params.itemId;
    const orderId = req.body.orderId;
    const cartId = req.body.cartId;

    const foundCart = await Cart.findOne({ 'products._id': itemId });
    const foundCartProduct = foundCart.products.find(p => p._id == itemId);

    await Cart.updateOne(
      { 'products._id': itemId },
      {
        'products.$.status': 'Cancelled'
      }
    );

    await Product.updateOne(
      { _id: foundCartProduct.product },
      { $inc: { quantity: 1 } }
    );

    const cart = await Cart.findOne({ _id: cartId });
    const items = cart.products.filter(item => item.status === 'Cancelled');

    // All items are cancelled => Cancel order
    if (cart.products.length === items.length) {
      await Order.deleteOne({ _id: orderId });
      await Cart.deleteOne({ _id: cartId });

      return res.status(200).json({
        success: true,
        orderCancelled: true,
        message: 'You order has been cancelled successfully!'
      });
    }

    res.status(200).json({
      success: true,
      message: 'Item has been cancelled successfully!'
    });
  } catch (error) {
    res.status(400).json({
      error: 'Your request could not be processed. Please try again.'
    });
  }
});

const increaseQuantity = products => {
  let bulkOptions = products.map(item => {
    return {
      updateOne: {
        filter: { _id: item.product },
        update: { $inc: { quantity: +item.quantity } }
      }
    };
  });

  Product.bulkWrite(bulkOptions);
};

module.exports = router;

const express = require('express');
const router = express.Router();

// Bring in Models & Helpers
const Order = require('../../models/order');
const Cart = require('../../models/cart');
const Product = require('../../models/product');
const auth = require('../../middleware/auth');
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

// fetch all orders api
router.get('/list', auth, async (req, res) => {
  try {
    const user = req.user._id;

    const orders = await Order.find({ user }).populate({
      path: 'cart'
    });

    const newOrders = orders.filter(order => order.cart);

    if (newOrders.length > 0) {
      const newDataSet = [];

      newOrders.map(async doc => {
        const cartId = doc.cart._id;

        const cart = await Cart.findById(cartId).populate({
          path: 'products.product',
          populate: {
            path: 'brand'
          }
        });

        const order = {
          _id: doc._id,
          total: parseFloat(Number(doc.total.toFixed(2))),
          created: doc.created,
          products: cart.products
        };

        newDataSet.push(order);

        if (newDataSet.length === newOrders.length) {
          const ordersList = newDataSet.map(o => store.caculateTaxAmount(o));
          ordersList.sort((a, b) => b.created - a.created);
          res.status(200).json({
            orders: ordersList
          });
        }
      });
    } else {
      res.status(200).json({
        orders: []
      });
    }
  } catch (error) {
    res.status(400).json({
      error: 'Your request could not be processed. Please try again.'
    });
  }
});

// fetch order api
router.get('/:orderId', auth, async (req, res) => {
  try {
    const orderId = req.params.orderId;
    const user = req.user._id;

    const orderDoc = await Order.findOne({ _id: orderId, user }).populate({
      path: 'cart'
    });

    if (!orderDoc) {
      res.status(404).json({
        message: `Cannot find order with the id: ${orderId}.`
      });
    }

    const cart = await Cart.findById(orderDoc.cart._id).populate({
      path: 'products.product',
      populate: {
        path: 'brand'
      }
    });

    let order = {
      _id: orderDoc._id,
      cartId: orderDoc.cart._id,
      total: orderDoc.total,
      totalTax: 0,
      created: cart.created,
      products: cart.products
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

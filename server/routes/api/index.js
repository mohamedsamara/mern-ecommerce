const router = require('express').Router();

const authRoutes = require('./auth');
const userRoutes = require('./user');
const newsletterRoutes = require('./newsletter');
const productRoutes = require('./product');
const categoryRoutes = require('./category');
const brandRoutes = require('./brand');
const cartRoutes = require('./cart');
const contactRoutes = require('./contact');
const merchantRoutes = require('./merchant');

// auth routes
router.use('/auth', authRoutes);

// user routes
router.use('/user', userRoutes);

// newsletter routes
router.use('/newsletter', newsletterRoutes);

// product routes
router.use('/product', productRoutes);

// category routes
router.use('/category', categoryRoutes);

// brand routes
router.use('/brand', brandRoutes);

// cart routes
router.use('/cart', cartRoutes);

// contact routes
router.use('/contact', contactRoutes);

// merchant routes
router.use('/merchant', merchantRoutes);

module.exports = router;

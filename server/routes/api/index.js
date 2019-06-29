const router = require('express').Router();
const authRoutes = require('./auth');
const userRoutes = require('./user');
const newsletterRoutes = require('./newsletter');

// auth routes
router.use('/auth', authRoutes);

// user routes
router.use('/user', userRoutes);

// newsletter routes
router.use('/newsletter', newsletterRoutes);

module.exports = router;

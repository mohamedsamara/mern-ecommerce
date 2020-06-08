const router = require('express').Router();
const apiRoutes = require('./api');

// api routes
router.use('/api', apiRoutes);
router.use('/api', (req, res) => res.status(404).json('No API route found'));

module.exports = router;

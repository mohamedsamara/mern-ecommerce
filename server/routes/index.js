const router = require('express').Router();
const apiRoutes = require('./api');

// api routes
router.use('/api', apiRoutes);

module.exports = router;

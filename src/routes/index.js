const router = require('express').Router();
const jobRoutes         = require('./job.routes');
const applicationRoutes = require('./application.routes');

router.use('/jobs',         jobRoutes);
router.use('/applications', applicationRoutes);

module.exports = router;
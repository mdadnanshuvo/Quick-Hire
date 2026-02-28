const router = require('express').Router();
const jobRoutes         = require('./job.routes');
const applicationRoutes = require('./application.routes');
const authRoutes        = require('./auth.routes');

router.use('/auth',         authRoutes);
router.use('/jobs',         jobRoutes);
router.use('/applications', applicationRoutes);

module.exports = router;
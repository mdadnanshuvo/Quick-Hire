const router = require('express').Router();
const {
  submitApplication, getAllApplications,
  getApplicationById, updateApplicationStatus,
} = require('../controllers/application.controller');
const { submitApplicationRules, updateStatusRules } = require('../validators/application.validator');
const validate = require('../middlewares/validate');
const { protect } = require('../middlewares/auth.middleware');

// ── Public ────────────────────────────────────────────────────
router.post('/', submitApplicationRules, validate, submitApplication);

router.get('/',             protect, getAllApplications);
router.get('/:id',          protect, getApplicationById);
router.patch('/:id/status', protect, updateStatusRules, validate, updateApplicationStatus);

module.exports = router;
const router = require('express').Router();
const {
  submitApplication,
  getAllApplications,
  getApplicationById,
  updateApplicationStatus,
} = require('../controllers/application.controller');
const { submitApplicationRules, updateStatusRules } = require('../validators/application.validator');
const validate = require('../middlewares/validate');

// ── Application routes ────────────────────────────────────────
router.post('/',              submitApplicationRules, validate, submitApplication);
router.get('/',               getAllApplications);
router.get('/:id',            getApplicationById);
router.patch('/:id/status',   updateStatusRules, validate, updateApplicationStatus);

module.exports = router;
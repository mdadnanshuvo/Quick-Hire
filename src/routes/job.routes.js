const router = require('express').Router();
const {
  getAllJobs, getJobById, createJob,
  updateJob, deleteJob, getFilterMeta,
} = require('../controllers/job.controller');
const { createJobRules, updateJobRules } = require('../validators/job.validator');
const validate = require('../middlewares/validate');
const { protect } = require('../middlewares/auth.middleware');

// ── Public routes ─────────────────────────────────────────────
router.get('/meta/filters', getFilterMeta);
router.get('/', getAllJobs);
router.get('/:id', getJobById);

// ── Admin protected routes ────────────────────────────────────
router.post('/',      protect, createJobRules, validate, createJob);
router.put('/:id',   protect, updateJobRules, validate, updateJob);
router.delete('/:id', protect, deleteJob);

module.exports = router;
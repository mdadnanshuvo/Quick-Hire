const router = require('express').Router();
const {
  getAllJobs,
  getJobById,
  createJob,
  updateJob,
  deleteJob,
  getFilterMeta,
} = require('../controllers/job.controller');
const { createJobRules, updateJobRules } = require('../validators/job.validator');
const validate = require('../middlewares/validate');

// ── Filter meta (must come before /:id to avoid route conflict) ──
router.get('/meta/filters', getFilterMeta);

// ── Job CRUD ──────────────────────────────────────────────────
router.get('/',        getAllJobs);
router.get('/:id',     getJobById);
router.post('/',       createJobRules, validate, createJob);
router.put('/:id',     updateJobRules, validate, updateJob);
router.delete('/:id',  deleteJob);

module.exports = router;
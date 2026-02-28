const { body } = require('express-validator');

const submitApplicationRules = [
  body('job_id')
    .notEmpty().withMessage('Job ID is required')
    .isInt({ min: 1 }).withMessage('Job ID must be a valid integer'),

  body('name')
    .trim()
    .notEmpty().withMessage('Name is required')
    .isLength({ max: 150 }).withMessage('Name must be 150 characters or less'),

  body('email')
    .trim()
    .notEmpty().withMessage('Email is required')
    .isEmail().withMessage('Please provide a valid email address')
    .normalizeEmail(),

  body('resume_link')
    .trim()
    .notEmpty().withMessage('Resume link is required')
    .isURL({ protocols: ['http', 'https'], require_protocol: true })
    .withMessage('Resume link must be a valid URL (include http:// or https://)'),

  body('cover_note')
    .optional({ nullable: true })
    .trim()
    .isLength({ max: 2000 }).withMessage('Cover note must be 2000 characters or less'),
];

const updateStatusRules = [
  body('status')
    .notEmpty().withMessage('Status is required')
    .isIn(['pending', 'reviewed', 'shortlisted', 'rejected'])
    .withMessage('Invalid status value'),
];

module.exports = { submitApplicationRules, updateStatusRules };
const { body } = require('express-validator');

const createJobRules = [
  body('title')
    .trim()
    .notEmpty().withMessage('Job title is required')
    .isLength({ max: 150 }).withMessage('Title must be 150 characters or less'),

  body('company')
    .trim()
    .notEmpty().withMessage('Company name is required')
    .isLength({ max: 150 }).withMessage('Company must be 150 characters or less'),

  body('location')
    .trim()
    .notEmpty().withMessage('Location is required'),

  body('category')
    .trim()
    .notEmpty().withMessage('Category is required'),

  body('type')
    .optional()
    .isIn(['Full-time', 'Part-time', 'Remote', 'Contract', 'Internship'])
    .withMessage('Invalid job type'),

  body('description')
    .trim()
    .notEmpty().withMessage('Job description is required'),

  body('salary')
    .optional({ nullable: true })
    .isString(),

  body('requirements')
    .optional()
    .isArray().withMessage('Requirements must be an array of strings'),

  body('logo_url')
    .optional({ nullable: true })
    .isURL().withMessage('Logo URL must be a valid URL'),
];

const updateJobRules = [
  body('title')
    .optional()
    .trim()
    .isLength({ max: 150 }).withMessage('Title must be 150 characters or less'),

  body('company')
    .optional()
    .trim()
    .isLength({ max: 150 }),

  body('type')
    .optional()
    .isIn(['Full-time', 'Part-time', 'Remote', 'Contract', 'Internship'])
    .withMessage('Invalid job type'),

  body('logo_url')
    .optional({ nullable: true })
    .isURL().withMessage('Logo URL must be a valid URL'),
];

module.exports = { createJobRules, updateJobRules };
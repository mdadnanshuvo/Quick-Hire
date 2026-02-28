const { Op } = require('sequelize');
const { Job, Application } = require('../models');

/**
 * GET /api/jobs
 * List all jobs with optional search & filters.
 * Query params: search, category, location, type
 */
const getAllJobs = async (req, res, next) => {
  try {
    const { search, category, location, type } = req.query;

    const where = {};

    if (search) {
      where[Op.or] = [
        { title:    { [Op.like]: `%${search}%` } },
        { company:  { [Op.like]: `%${search}%` } },
        { description: { [Op.like]: `%${search}%` } },
      ];
    }

    if (category) where.category = { [Op.like]: `%${category}%` };
    if (location) where.location = { [Op.like]: `%${location}%` };
    if (type)     where.type     = type;

    const jobs = await Job.findAll({
      where,
      order: [['created_at', 'DESC']],
      attributes: { exclude: ['description', 'requirements'] }, // lighter list view
    });

    return res.status(200).json({
      success: true,
      count: jobs.length,
      data: jobs,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * GET /api/jobs/:id
 * Get single job with application count.
 */
const getJobById = async (req, res, next) => {
  try {
    const job = await Job.findByPk(req.params.id, {
      include: [{
        model: Application,
        as: 'applications',
        attributes: ['id', 'name', 'email', 'status', 'created_at'],
      }],
    });

    if (!job) {
      return res.status(404).json({ success: false, message: 'Job not found' });
    }

    return res.status(200).json({ success: true, data: job });
  } catch (error) {
    next(error);
  }
};

/**
 * POST /api/jobs
 * Create a new job listing (Admin).
 */
const createJob = async (req, res, next) => {
  try {
    const { title, company, location, category, type, salary, description, requirements, logo_url } = req.body;

    const job = await Job.create({
      title,
      company,
      location,
      category,
      type,
      salary,
      description,
      requirements: requirements || [],
      logo_url,
    });

    return res.status(201).json({
      success: true,
      message: 'Job created successfully',
      data: job,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * PUT /api/jobs/:id
 * Update an existing job listing (Admin).
 */
const updateJob = async (req, res, next) => {
  try {
    const job = await Job.findByPk(req.params.id);

    if (!job) {
      return res.status(404).json({ success: false, message: 'Job not found' });
    }

    const { title, company, location, category, type, salary, description, requirements, logo_url } = req.body;

    await job.update({ title, company, location, category, type, salary, description, requirements, logo_url });

    return res.status(200).json({
      success: true,
      message: 'Job updated successfully',
      data: job,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * DELETE /api/jobs/:id
 * Delete a job (Admin). Applications cascade-deleted via FK.
 */
const deleteJob = async (req, res, next) => {
  try {
    const job = await Job.findByPk(req.params.id);

    if (!job) {
      return res.status(404).json({ success: false, message: 'Job not found' });
    }

    await job.destroy();

    return res.status(200).json({
      success: true,
      message: 'Job deleted successfully',
    });
  } catch (error) {
    next(error);
  }
};

/**
 * GET /api/jobs/meta/filters
 * Returns distinct categories and locations for filter dropdowns.
 */
const getFilterMeta = async (_req, res, next) => {
  try {
    const { sequelize } = require('../models');

    const [categories, locations] = await Promise.all([
      Job.findAll({ attributes: [[sequelize.fn('DISTINCT', sequelize.col('category')), 'category']], raw: true }),
      Job.findAll({ attributes: [[sequelize.fn('DISTINCT', sequelize.col('location')), 'location']], raw: true }),
    ]);

    return res.status(200).json({
      success: true,
      data: {
        categories: categories.map(r => r.category),
        locations:  locations.map(r => r.location),
      },
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAllJobs,
  getJobById,
  createJob,
  updateJob,
  deleteJob,
  getFilterMeta,
};
const { Application, Job } = require('../models');

/**
 * POST /api/applications
 * Submit a job application.
 */
const submitApplication = async (req, res, next) => {
  try {
    const { job_id, name, email, resume_link, cover_note } = req.body;

    // Ensure the job exists before accepting the application
    const job = await Job.findByPk(job_id);
    if (!job) {
      return res.status(404).json({ success: false, message: 'Job not found' });
    }

    // Prevent duplicate applications from the same email for the same job
    const existing = await Application.findOne({ where: { job_id, email } });
    if (existing) {
      return res.status(409).json({
        success: false,
        message: 'You have already applied for this job with this email address',
      });
    }

    const application = await Application.create({
      job_id,
      name,
      email,
      resume_link,
      cover_note,
    });

    return res.status(201).json({
      success: true,
      message: 'Application submitted successfully',
      data: application,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * GET /api/applications
 * Get all applications (Admin). Optional filter: ?job_id=
 */
const getAllApplications = async (req, res, next) => {
  try {
    const where = {};
    if (req.query.job_id) where.job_id = req.query.job_id;

    const applications = await Application.findAll({
      where,
      include: [{ model: Job, as: 'job', attributes: ['id', 'title', 'company'] }],
      order: [['created_at', 'DESC']],
    });

    return res.status(200).json({
      success: true,
      count: applications.length,
      data: applications,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * GET /api/applications/:id
 * Get single application by ID (Admin).
 */
const getApplicationById = async (req, res, next) => {
  try {
    const application = await Application.findByPk(req.params.id, {
      include: [{ model: Job, as: 'job', attributes: ['id', 'title', 'company'] }],
    });

    if (!application) {
      return res.status(404).json({ success: false, message: 'Application not found' });
    }

    return res.status(200).json({ success: true, data: application });
  } catch (error) {
    next(error);
  }
};

/**
 * PATCH /api/applications/:id/status
 * Update application status (Admin).
 */
const updateApplicationStatus = async (req, res, next) => {
  try {
    const { status } = req.body;
    const application = await Application.findByPk(req.params.id);

    if (!application) {
      return res.status(404).json({ success: false, message: 'Application not found' });
    }

    await application.update({ status });

    return res.status(200).json({
      success: true,
      message: 'Application status updated',
      data: application,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  submitApplication,
  getAllApplications,
  getApplicationById,
  updateApplicationStatus,
};
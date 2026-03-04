// src/models/index.js
const sequelize = require('../config/database');

// Import models — filenames must match exactly (case-sensitive)
const Job = require('./job');
const Application = require('./Application');
const Admin = require('./admin');

// ─── Associations ─────────────────────────────────────────────
Job.hasMany(Application, { foreignKey: 'job_id', as: 'applications', onDelete: 'CASCADE' });
Application.belongsTo(Job, { foreignKey: 'job_id', as: 'job' });

// Export all models and sequelize
module.exports = {
  sequelize,
  Job,
  Application,
  Admin,
};
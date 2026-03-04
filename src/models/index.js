// src/models/index.js
const db = require('../config/database');

// Import models (match file names exactly!)
const Job = require('./job');
const Application = require('./application');
const Admin = require('./admin');

// ─── Associations ─────────────────────────────────────────────
Job.hasMany(Application, { foreignKey: 'job_id', as: 'applications', onDelete: 'CASCADE' });
Application.belongsTo(Job, { foreignKey: 'job_id', as: 'job' });

module.exports = {
  sequelize: db,
  Job,
  Application,
  Admin,
};
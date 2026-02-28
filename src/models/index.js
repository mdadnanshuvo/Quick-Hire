const sequelize = require('../config/database');
const Job = require('./job');
const Application = require('./Application');

// ─── Associations ─────────────────────────────────────────────
// A Job has many Applications
Job.hasMany(Application, { foreignKey: 'job_id', as: 'applications', onDelete: 'CASCADE' });

// An Application belongs to a Job
Application.belongsTo(Job, { foreignKey: 'job_id', as: 'job' });

module.exports = {
  sequelize,
  Job,
  Application,
};
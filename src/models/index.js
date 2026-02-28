const db = require('../config/database');
const Job = require('./Job');
const Application = require('./Application');
const Admin = require('./Admin');

// ─── Associations ─────────────────────────────────────────────
Job.hasMany(Application, { foreignKey: 'job_id', as: 'applications', onDelete: 'CASCADE' });
Application.belongsTo(Job, { foreignKey: 'job_id', as: 'job' });

module.exports = {
  sequelize: db,
  Job,
  Application,
  Admin,
};
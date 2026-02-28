const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Job = sequelize.define('Job', {
  id: {
    type: DataTypes.INTEGER.UNSIGNED,
    autoIncrement: true,
    primaryKey: true,
  },
  title: {
    type: DataTypes.STRING(150),
    allowNull: false,
  },
  company: {
    type: DataTypes.STRING(150),
    allowNull: false,
  },
  location: {
    type: DataTypes.STRING(100),
    allowNull: false,
  },
  category: {
    type: DataTypes.STRING(100),
    allowNull: false,
  },
  type: {
    // e.g. Full-time, Part-time, Remote, Contract
    type: DataTypes.ENUM('Full-time', 'Part-time', 'Remote', 'Contract', 'Internship'),
    allowNull: false,
    defaultValue: 'Full-time',
  },
  salary: {
    // Optional display string e.g. "$60k–$80k"
    type: DataTypes.STRING(100),
    allowNull: true,
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  requirements: {
    // Stored as JSON array of strings
    type: DataTypes.JSON,
    allowNull: true,
    defaultValue: [],
  },
  logo_url: {
    type: DataTypes.STRING(500),
    allowNull: true,
  },
}, {
  tableName: 'jobs',
  timestamps: true,
  createdAt: 'created_at',
  updatedAt: 'updated_at',
});

module.exports = Job;
require('dotenv').config();
const app = require('./src/app');
const { sequelize } = require('./src/models');

const PORT = process.env.PORT || 5000;

const startServer = async () => {
  try {
    await sequelize.authenticate();
    console.log('✅ Database connection established.');

    // Sync models (use { alter: true } in dev to auto-update schema)
    await sequelize.sync({ alter: true });
    console.log('✅ Models synchronized.');

    app.listen(PORT, () => {
      console.log(`🚀 QuickHire API running on http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error('❌ Unable to start server:', error);
    process.exit(1);
  }
};

startServer();
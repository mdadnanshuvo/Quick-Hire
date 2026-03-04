require('dotenv').config();
const app = require('./src/app');
const { sequelize, Admin } = require('./src/models');
const bcrypt = require('bcryptjs');

const PORT = process.env.PORT || 5000;

// Seed default admin if not exists
const seedAdmin = async () => {
  try {
    if (!process.env.ADMIN_SEED_EMAIL || !process.env.ADMIN_SEED_PASSWORD) {
      console.warn('⚠️ Admin seed variables are missing in environment. Skipping seeding.');
      return;
    }

    const existing = await Admin.findOne({ where: { email: process.env.ADMIN_SEED_EMAIL } });
    if (!existing) {
      const hashed = await bcrypt.hash(process.env.ADMIN_SEED_PASSWORD, 12);
      await Admin.create({ email: process.env.ADMIN_SEED_EMAIL, password: hashed });
      console.log('✅ Default admin seeded:', process.env.ADMIN_SEED_EMAIL);
    }
  } catch (err) {
    console.error('❌ Admin seeding failed:', err);
  }
};

const startServer = async () => {
  try {
    await sequelize.authenticate();
    console.log('✅ Database connection established.');
    
    // Sync models safely
    await sequelize.sync({ alter: true });
    console.log('✅ Models synchronized.');
    
    await seedAdmin();

    app.listen(PORT, () => {
      console.log(`🚀 QuickHire API running on port ${PORT}`);
    });
  } catch (error) {
    console.error('❌ Unable to start server:', error);
    process.exit(1);
  }
};

startServer();
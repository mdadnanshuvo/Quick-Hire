const express = require('express');
const cors = require('cors');
const morgan = require('morgan');

const routes = require('./routes');
const errorHandler = require('./middlewares/errorHandler');

const app = express();

// ─── Middleware ───────────────────────────────────────────────
app.use(cors({
  origin: (origin, callback) => {
    callback(null, true)
  },
  credentials: true,
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'));

// ─── Routes ──────────────────────────────────────────────────
app.use('/api', routes);

// ─── Health Check ─────────────────────────────────────────────
app.get('/health', (_req, res) => {
  res.json({ status: 'ok', message: 'QuickHire API is running' });
});

// ─── 404 Handler ─────────────────────────────────────────────
app.use((_req, res) => {
  res.status(404).json({ success: false, message: 'Route not found' });
});

// ─── Global Error Handler ─────────────────────────────────────
app.use(errorHandler);

module.exports = app;
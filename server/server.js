import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import compression from 'compression';
import mongoose from 'mongoose';
import { connectDB } from './config/db.js';
import { mailerReady } from './config/mailer.js';
import pagesRoutes from './routes/pages.routes.js';
import searchRoutes from './routes/search.routes.js';
import contactRoutes from './routes/contact.routes.js';
import { apiLimiter, searchLimiter } from './middleware/rateLimits.js';
import { notFound, errorHandler } from './middleware/errors.js';

const app = express();
const PORT = process.env.PORT || 5000;
const isProd = process.env.NODE_ENV === 'production';

// Hosting platforms (Render, Railway…) sit behind a proxy: trust it so visitor IPs are correct
// for rate limiting.
app.set('trust proxy', 1);
app.disable('x-powered-by');

// Allowed frontend origins (comma-separated in .env / Render), e.g.
//   CLIENT_URL=https://krishanavtar.vercel.app,https://krishanavtar-*-akshat-workspace.vercel.app,http://localhost:5173
// • “https://” is added automatically if it was left out
// • a trailing “/” is ignored
// • “*” matches any part of the address (covers every Vercel preview deployment)
const allowedOrigins = (process.env.CLIENT_URL || 'http://localhost:5173')
  .split(',')
  .map((o) => o.trim().replace(/\/+$/, ''))
  .filter(Boolean)
  .map((o) => (/^https?:\/\//i.test(o) ? o : `https://${o}`).toLowerCase());

const originPatterns = allowedOrigins.map(
  (o) => new RegExp(`^${o.replace(/[.+?^${}()|[\]\\]/g, '\\$&').replace(/\*/g, '[a-z0-9-]+')}$`)
);
const isAllowedOrigin = (origin) => originPatterns.some((re) => re.test(origin.toLowerCase()));

app.use(helmet()); // secure HTTP headers
app.use(compression()); // gzip responses
app.use(
  cors({
    origin(origin, cb) {
      // Allow same-origin / server-to-server requests (no Origin header) and the listed frontends.
      if (!origin || isAllowedOrigin(origin)) return cb(null, true);
      cb(null, false);
    },
    methods: ['GET', 'POST'],
  })
);
app.use(express.json({ limit: '20kb' })); // the contact form is small; reject anything bigger

// Health check: confirms the server is up and whether MongoDB answers.
const DB_STATES = ['disconnected', 'connected', 'connecting', 'disconnecting'];
app.get('/api/health', async (req, res) => {
  const state = DB_STATES[mongoose.connection.readyState] || 'unknown';
  let dbPing = false;
  if (state === 'connected') {
    try {
      await mongoose.connection.db.admin().ping();
      dbPing = true;
    } catch {
      dbPing = false;
    }
  }
  res.status(dbPing ? 200 : 503).json({
    server: 'ok',
    database: state,
    dbPing,
    dbName: state === 'connected' ? mongoose.connection.name : null,
    email: mailerReady() ? 'configured' : 'not configured',
    time: new Date().toISOString(),
  });
});

// API
app.use('/api', apiLimiter);
app.use('/api', pagesRoutes); // GET /api/steps · GET /api/pages/:slug
app.use('/api/search', searchLimiter);
app.use('/api', searchRoutes); // GET /api/search?q=
app.use('/api', contactRoutes); // POST /api/contact

// Errors
app.use('/api', notFound);
app.use(errorHandler);

// Start: connect to MongoDB first, then accept requests.
let server;
connectDB(process.env.MONGODB_URI).then(() => {
  server = app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}${isProd ? ' (production)' : ''}`);
    console.log(`   CORS allowed: ${allowedOrigins.join(', ')}`);
    console.log(`   Contact email: ${mailerReady() ? 'configured' : 'not configured (messages are saved only)'}`);
  });
});

// Clean shutdown (hosting platforms send SIGTERM when redeploying).
async function shutdown(signal) {
  console.log(`\n${signal} received — shutting down…`);
  server?.close();
  await mongoose.disconnect().catch(() => {});
  process.exit(0);
}
process.on('SIGTERM', () => shutdown('SIGTERM'));
process.on('SIGINT', () => shutdown('SIGINT'));

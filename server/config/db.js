import mongoose from 'mongoose';

const RETRY_MS = 10_000;

// Connects to MongoDB Atlas. If it fails (e.g. your IP is not on the Atlas allow list yet),
// the server keeps running and retries every 10 seconds — no restart needed once it is fixed.
export async function connectDB(uri) {
  if (!uri || uri.includes('<')) {
    console.warn('⚠  MONGODB_URI is missing or still a placeholder in server/.env');
    return;
  }

  const attempt = async (n) => {
    try {
      await mongoose.connect(uri, { serverSelectionTimeoutMS: 8000 });
      console.log(`✅ MongoDB connected: ${mongoose.connection.host}/${mongoose.connection.name}`);
    } catch (err) {
      const hint = /whitelist|IP/i.test(err.message)
        ? 'Your IP is not allowed in Atlas → Network Access. Add it there.'
        : err.message;
      console.error(`❌ MongoDB connection failed (attempt ${n}): ${hint}`);
      console.error(`   Retrying in ${RETRY_MS / 1000}s…`);
      setTimeout(() => attempt(n + 1), RETRY_MS);
    }
  };

  // Log later disconnects/reconnects (Atlas maintenance, network blips).
  mongoose.connection.on('disconnected', () => console.warn('⚠  MongoDB disconnected'));
  mongoose.connection.on('reconnected', () => console.log('✅ MongoDB reconnected'));

  await attempt(1);
}

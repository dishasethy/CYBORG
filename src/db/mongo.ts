import mongoose from 'mongoose';

let isConnected = false;
let hasAttempted = false;
let connectPromise: Promise<boolean> | null = null;

export async function connectMongoDB(): Promise<boolean> {
  if (isConnected) return true;
  if (hasAttempted && !isConnected) {
    return false; // Fail fast immediately on subsequent requests if connection failed once
  }
  if (connectPromise) return connectPromise;

  const mongoUri = process.env.MONGODB_URI || process.env.MONGO_URL;
  // If no environment variable is provided, we default to local mongodb, but fail extremely fast (e.g. 500ms)
  const uriToConnect = mongoUri || 'mongodb://localhost:27017/cyborg_db';

  connectPromise = (async () => {
    try {
      hasAttempted = true;
      await mongoose.connect(uriToConnect, {
        serverSelectionTimeoutMS: 800, // Keep selection timeout low to avoid blocking client loading
      });
      isConnected = true;
      console.log('[MongoDB] Successfully connected to database instance.');
      return true;
    } catch (err) {
      console.warn('[MongoDB] Direct connection deferred (using in-memory fallback cache).');
      isConnected = false;
      return false;
    }
  })();

  return connectPromise;
}

// Pre-emptively connect to database in the background at startup to make the first request instantaneous
if (typeof window === 'undefined') {
  connectMongoDB().catch(() => {});
}

export function getMongoConnectionStatus(): { connected: boolean; uri: string } {
  const uri = process.env.MONGODB_URI || process.env.MONGO_URL || 'mongodb://localhost:27017/cyborg_db';
  return {
    connected: isConnected,
    uri: uri.replace(/\/\/([^:]+):([^@]+)@/, '//***:***@'), // Mask credentials in logs
  };
}

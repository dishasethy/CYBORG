import mongoose from 'mongoose';

let isConnected = false;

export async function connectMongoDB(): Promise<boolean> {
  if (isConnected) return true;

  const mongoUri = process.env.MONGODB_URI || process.env.MONGO_URL || 'mongodb://localhost:27017/cyborg_db';

  try {
    // Attempt connection with a short timeout to fail fast if no local Mongo server exists
    await mongoose.connect(mongoUri, {
      serverSelectionTimeoutMS: 3000,
    });
    isConnected = true;
    console.log('[MongoDB] Successfully connected to database instance.');
    return true;
  } catch (err) {
    console.warn('[MongoDB] Direct connection deferred (using in-memory fallback cache). Set MONGODB_URI to connect live instance.');
    return false;
  }
}

export function getMongoConnectionStatus(): { connected: boolean; uri: string } {
  const uri = process.env.MONGODB_URI || process.env.MONGO_URL || 'mongodb://localhost:27017/cyborg_db';
  return {
    connected: isConnected,
    uri: uri.replace(/\/\/([^:]+):([^@]+)@/, '//***:***@'), // Mask credentials in logs
  };
}

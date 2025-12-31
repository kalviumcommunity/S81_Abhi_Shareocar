import mongoose from 'mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';

export const connectDB = async () => {
  let uri = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/shareocar';
  const useMemory = process.env.MONGO_MEMORY === '1' || uri === 'memory';
  if (useMemory) {
    const mms = await MongoMemoryServer.create();
    uri = mms.getUri();
    console.log(`[DB] Using in-memory MongoDB at ${uri}`);
  }
  mongoose.set('strictQuery', true);
  await mongoose.connect(uri, { autoIndex: true });
  console.log('MongoDB connected');
};

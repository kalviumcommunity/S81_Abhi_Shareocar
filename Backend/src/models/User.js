import mongoose from 'mongoose';

const verificationSchema = new mongoose.Schema(
  {
    status: { type: String, enum: ['none', 'pending', 'verified', 'rejected'], default: 'none' },
    idDocUrl: String,
    licenseUrl: String,
    reviewedAt: Date,
    note: String,
  },
  { _id: false }
);

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true, index: true, lowercase: true },
    phone: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, enum: ['user', 'admin'], default: 'user' },
    verifiedEmail: { type: Boolean, default: false },
    verifiedPhone: { type: Boolean, default: false },
    verification: { type: verificationSchema, default: () => ({}) },
  },
  { timestamps: true }
);

export default mongoose.model('User', userSchema);

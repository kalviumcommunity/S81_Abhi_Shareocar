import mongoose from 'mongoose';

const verificationSchema = new mongoose.Schema(
  {
    status: { type: String, enum: ['none', 'pending', 'verified', 'rejected'], default: 'none' },
    idDocUrl: String,
    licenseUrl: String,
    submittedAt: Date,
    reviewedAt: Date,
    reviewedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    note: String,
  },
  { _id: false }
);

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true, minlength: 2, maxlength: 100 },
    email: { type: String, required: true, unique: true, index: true, lowercase: true, trim: true },
    phone: { type: String, required: true, unique: true, trim: true },
    password: { type: String, required: true, select: true },
    role: { type: String, enum: ['user', 'admin'], default: 'user' },
    verifiedEmail: { type: Boolean, default: false },
    verifiedPhone: { type: Boolean, default: false },
    verification: { type: verificationSchema, default: () => ({}) },
    lastLoginAt: { type: Date },
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true }
);

// Virtual for full verification check
userSchema.virtual('isVerifiedDriver').get(function () {
  return this.verification?.status === 'verified';
});

// Ensure virtuals are included in JSON
userSchema.set('toJSON', { virtuals: true });
userSchema.set('toObject', { virtuals: true });

export default mongoose.model('User', userSchema);

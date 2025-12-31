import mongoose from 'mongoose';

const otpSchema = new mongoose.Schema(
  {
    email: { type: String },
    phone: { type: String },
    code: { type: String, required: true },
    purpose: { type: String, enum: ['signup', 'login'], required: true },
    expiresAt: { type: Date, required: true },
    attempts: { type: Number, default: 0 },
  },
  { timestamps: true }
);

otpSchema.index({ email: 1, phone: 1, purpose: 1 });

export default mongoose.model('OTP', otpSchema);

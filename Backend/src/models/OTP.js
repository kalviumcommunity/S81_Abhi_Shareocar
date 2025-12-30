import mongoose from 'mongoose';

const otpSchema = new mongoose.Schema(
  {
    email: { type: String, required: true },
    phone: { type: String, required: true },
    code: { type: String, required: true },
    expiresAt: { type: Date, required: true },
    attempts: { type: Number, default: 0 },
    purpose: { type: String, enum: ['signup'], default: 'signup' }
  },
  { timestamps: true }
);

otpSchema.index({ email: 1, phone: 1, purpose: 1 });

export default mongoose.model('OTP', otpSchema);

import mongoose from 'mongoose';

const sosSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    location: {
      lat: { type: Number },
      lng: { type: Number }
    },
    message: { type: String },
    resolved: { type: Boolean, default: false }
  },
  { timestamps: true }
);

sosSchema.index({ resolved: 1, createdAt: -1 });

export default mongoose.model('SOSAlert', sosSchema);
